# 16 — Monetization

Se distingue explícitamente entre hipótesis, datos y suposiciones — no hay proyecciones de ingresos en este documento porque todavía no hay tráfico real que las sustente; inventar cifras aquí violaría el principio de transparencia del proyecto (`00-project-vision.md`).

## La restricción central: Amazon Associates / PA-API

Ver el detalle completo en `09-data-ingestion.md`. En resumen: el acceso a la Product Advertising API requiere ventas cualificadas (mínimo 3 en 180 días para el alta; reportes no confirmados oficialmente por Amazon apuntan a un requisito de ventas recurrentes para mantenerlo), lo que condiciona cómo puede arrancar cualquier escenario de monetización que dependa de afiliación con Amazon. Esta restricción es la razón por la que ningún escenario de abajo se puede dar por garantizado desde el día uno.

**Requisitos de disclosure de Amazon Associates (obligatorios, no opcionales):** declarar explícitamente la participación en el programa de afiliados, no ocultar ni acortar los enlaces de afiliado de forma que oculten su naturaleza, y tener una política de privacidad publicada antes de la aprobación de la cuenta.

## Escenarios (a decidir cuál se activa primero — `25-open-questions.md` #7)

| Escenario | Contenido | Riesgo/dependencia principal |
|---|---|---|
| A — Afiliación | Solo comisión por venta referida | Depende enteramente de la restricción de arriba |
| B — Afiliación + publicidad | Añade ad slots (`29-advertising-layout.md`) | Requiere tráfico mínimo para que un proveedor de ads acepte el sitio |
| C — A + B + premium | Añade alertas avanzadas, sin publicidad | Requiere base de usuarios registrados suficiente |
| D — A + B + Telegram premium | Añade suscripción vía Telegram | Requiere bot/canal ya funcionando (V1) |
| E — Datos/API como producto | Vender acceso a los datos agregados de ORZAR | Requiere volumen y calidad de catálogo demostrados; el más a largo plazo |

## Publicidad

Un proveedor estándar (p. ej. Google AdSense/Ad Manager) impone sus propias políticas de contenido, que son compatibles con el principio de "no contenido fino" ya adoptado por el proyecto — no exige nada adicional a lo que ORZAR ya se propone hacer bien. Ver reglas de diseño de anuncios y de confianza en `29-advertising-layout.md`.

## Nota

Esto no es asesoría legal ni fiscal. Antes de activar cualquier escenario de monetización real conviene una revisión con un abogado (términos de afiliación, LSSI/GDPR) y un asesor fiscal (tributación de estos ingresos operando desde Canarias, régimen IGIC) — ver `18-compliance.md` y `25-open-questions.md` #6.
