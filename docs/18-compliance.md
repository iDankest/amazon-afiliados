# 18 — Compliance

Este documento no es asesoría legal ni fiscal — es un mapa de qué hay que revisar con un profesional antes de lanzar, con el contexto ya investigado para que esa revisión sea más rápida.

## GDPR

Base legal para tratar datos de cuenta, alertas de precio y analítica; consentimiento explícito para cookies no esenciales (publicidad, analítica); minimización de datos; derecho de acceso/rectificación/supresión sobre la cuenta y las alertas guardadas.

## Directiva Ómnibus — (UE) 2019/2161

En vigor en España desde mayo de 2022. Obliga a mostrar el precio más bajo de los últimos 30 días como referencia al anunciar una rebaja — obligación que recae directamente sobre el comercio que vende (Amazon u otra tienda), no necesariamente sobre ORZAR como comparador. Aun así, ORZAR aplica internamente el mismo criterio de 30 días para su propio Deal Score (`10-pricing-engine.md`) tanto por coherencia de producto como para reducir ambigüedad sobre sus propias afirmaciones de "descuento". El alcance exacto de esta directiva sobre un agregador/comparador (no vendedor directo) es un punto a confirmar con asesoría legal — `25-open-questions.md` #6.

## Disclosure de afiliación

Amazon exige declarar explícitamente la participación en su programa y no ocultar la naturaleza de los enlaces de afiliado (ver `16-monetization.md`). Además de ese requisito específico de Amazon, la normativa general de protección al consumidor en la UE/España exige que el contenido patrocinado, la publicidad y los enlaces de afiliado sean identificables como tales, de forma clara y no solo en un pie de página — ver la regla de trust en `27-ux-guidelines.md`.

## Fiscalidad — nota específica de Canarias

El proyecto se opera desde Canarias, donde aplica el IGIC (7%) en lugar del IVA peninsular. La tributación de ingresos de afiliación/publicidad/premium bajo ese régimen debe revisarse con un asesor fiscal local antes de facturar cualquier ingreso real — no se asume aquí ningún tratamiento concreto.

## Imágenes de producto

Las imágenes obtenidas de una fuente (feed, API o scraping) suelen llevar restricciones de uso propias de cada tienda/proveedor — hotlink directo vs copia propia tiene implicaciones legales distintas y depende de los términos de cada fuente. Revisar por proveedor antes de decidir la política — `25-open-questions.md` #9.
