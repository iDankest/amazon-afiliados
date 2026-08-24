#!/usr/bin/env node
/**
 * ORZA Price Tracker Engine
 * Scrapes or verifies price snapshots for Amazon.es ASINs.
 * Usage:
 *   node scripts/track-prices.mjs [--dry-run] [--product=<id>]
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogFile = path.resolve(repoRoot, "data/catalog.json");
const snapshotsDir = path.resolve(repoRoot, "data/snapshots");

const isDryRun = process.argv.includes("--dry-run");
const filterProduct = process.argv.find((a) => a.startsWith("--product="))?.split("=")[1];

async function fetchAmazonPrice(asin) {
  const url = "https://www.amazon.es/dp/" + asin;
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
    "Accept":
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache"
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, { headers, signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) {
      return { ok: false, error: "HTTP " + res.status };
    }

    const html = await res.text();

    if (html.includes("Robot Check") || html.includes("captchacharacters")) {
      return { ok: false, error: "Amazon anti-bot challenge detected" };
    }

    const wholeMatch = html.match(/class="a-price-whole">([0-9.,]+)/);
    const fracMatch = html.match(/class="a-price-fraction">([0-9]+)/);

    if (wholeMatch) {
      const whole = wholeMatch[1].replace(/[^0-9]/g, "");
      const frac = fracMatch ? fracMatch[1] : "00";
      const price = parseFloat(whole + "." + frac);
      if (!isNaN(price) && price > 0) {
        return { ok: true, price };
      }
    }

    const offscreenMatch = html.match(/class="a-offscreen">([0-9.,]+)\s*€/);
    if (offscreenMatch) {
      const clean = offscreenMatch[1].replace(".", "").replace(",", ".");
      const price = parseFloat(clean);
      if (!isNaN(price) && price > 0) {
        return { ok: true, price };
      }
    }

    return { ok: false, error: "Price not found in page DOM" };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function run() {
  console.log("=== ORZA Price Tracker Engine ===");
  if (isDryRun) {
    console.log("[DRY RUN MODE] No changes will be written to disk.");
  }

  const catalog = JSON.parse(readFileSync(catalogFile, "utf8"));
  const today = new Date().toISOString().split("T")[0];
  let totalTracked = 0;
  let updatedCount = 0;

  for (const p of catalog) {
    if (filterProduct && p.id !== filterProduct) continue;
    if (!p.asin) continue;

    totalTracked++;
    console.log("\nChecking [" + p.id + "] (ASIN: " + p.asin + ")...");
    const snapFile = path.join(snapshotsDir, p.id + ".json");
    let snapshots = [];
    if (existsSync(snapFile)) {
      snapshots = JSON.parse(readFileSync(snapFile, "utf8"));
    }

    const lastSnap = snapshots[snapshots.length - 1];
    const result = await fetchAmazonPrice(p.asin);

    if (result.ok) {
      console.log("  ✓ Current price fetched: " + result.price.toFixed(2) + " €");
      const isNewPrice = !lastSnap || lastSnap.price !== result.price;
      const isNewDay = !lastSnap || lastSnap.date !== today;

      if (isNewPrice || isNewDay) {
        const newEntry = {
          date: today,
          price: result.price,
          currency: "EUR",
          source: "tracker"
        };

        if (!isDryRun) {
          if (lastSnap && lastSnap.date === today) {
            snapshots[snapshots.length - 1] = newEntry;
          } else {
            snapshots.push(newEntry);
          }
          writeFileSync(snapFile, JSON.stringify(snapshots, null, 2) + "\n", "utf8");
          console.log("  ✓ Saved new snapshot for " + p.id);
        } else {
          console.log("  [Dry-run] Would record: " + JSON.stringify(newEntry));
        }
        updatedCount++;
      } else {
        console.log("  - Price unchanged from today snapshot (" + result.price + " €).");
      }
    } else {
      console.log("  ⚠ Failed to fetch: " + result.error + " (keeping last snapshot: " + (lastSnap ? lastSnap.price : "none") + " €)");
    }

    await new Promise((r) => setTimeout(r, 1200));
  }

  console.log("\n=== Tracker finished: " + totalTracked + " products checked, " + updatedCount + " updated ===");
}

run().catch((err) => {
  console.error("Tracker failed with fatal error:", err);
  process.exit(1);
});
