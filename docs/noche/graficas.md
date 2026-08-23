# Gráficas del registro: canvas propio vs uPlot

**Decisión: mantener el canvas propio (dibujado a mano). Coste 0 €.**

## Contexto

El registro de precios dibuja la evolución de un producto en `src/pages/p/[id].astro`.
Hoy ya existe un `<canvas>` con dibujo 2D propio: línea, puntos, guías de mín/máx,
etiquetas de fecha y redibujo al cambiar tema o tamaño.

## Opciones

### uPlot (~48 KB min, ~14 KB gzip)

- Pros: ejes, zoom, cursores, leyendas y touch listos; rendimiento brutal para series largas.
- Contras: dependencia nueva que mantener; estética por defecto ajena al sistema (habría que pelearla);
  pesa más que TODO el JS actual del sitio junto; y nuestras series son diminutas.

### Canvas propio (lo que ya hay)

- Pros: 0 dependencias, 0 bytes extra, control total del look (variables CSS del tema),
  redibujo con `MutationObserver` ya resuelto. Suficiente para decenas de puntos.
- Contras: hay que escribir y mantener el código de ejes/scale (ya escrito);
  si algún día hay series de miles de puntos, se queda corto.

## Por qué canvas propio

1. **El dato real manda.** Con 0 o 1 snapshot no hay gráfica. Nuestras series son
   de 2 a ~50 puntos: manual, fechado, a mano. uPlot resuelve un problema que no tenemos.
2. **0 €.** No es solo dinero: es peso. El sitio hoy no carga ni un KB de JS de librería.
3. **El tema dual ya funciona** con `var(--accent)`/`var(--muted)` releyendo el computed style
   al cambiar `data-theme`. Con una librería habría que re-mapear sus estilos a nuestras variables.

## Umbral de revisión

Si algún día un producto supera ~200 snapshots o queremos zoom/scrub, reabrir esta
decisión (uPlot sería el candidato natural). Hasta entonces, canvas propio.

## Reglas que la gráfica ya cumple y debe seguir cumpliendo

- 0 o 1 punto → **no hay gráfica** (ni línea plana decorativa con datos falsos).
- Etiqueta «visto el {fecha}», nunca «precio actual».
- Mín/máx solo con 2+ puntos, calculados de snapshots reales.
