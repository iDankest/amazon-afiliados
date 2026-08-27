# 27 — UX Guidelines

## Jerarquía "data first"

No esconder información importante detrás de demasiados clics, pero tampoco saturar. Cinco niveles, en este orden:

1. ¿Qué producto es?
2. ¿Cuánto cuesta?
3. ¿Es buen precio?
4. ¿Por qué?
5. Detalles técnicos.

## Densidad de información

ORZAR maneja mucha información — no se busca una estética minimalista vacía. Se busca **alta densidad informativa + jerarquía excelente**: un usuario avanzado debe poder escanear información rápido; un usuario normal debe poder entenderla sin conocimientos técnicos previos.

## Checklist anti-AI-slop

El diseño no debe parecer una plantilla generada automáticamente. Evitar:
- Exceso de cards y de badges.
- Gradientes o glassmorphism sin función.
- Sombras genéricas repetidas en todo.
- Iconos decorativos sin propósito.
- `border-radius` idéntico en absolutamente todo.
- Columnas de 3 "porque sí".
- Componentes visualmente idénticos para cosas conceptualmente distintas (p. ej. que un anuncio se vea igual que una recomendación — ver regla de trust abajo).
- Color usado como decoración sin significado.

## Regla de trust (crítica)

El usuario debe poder distinguir siempre: resultado orgánico, recomendación de ORZAR, oferta, contenido patrocinado, publicidad, y enlace afiliado. Ningún dark pattern: la publicidad nunca debe parecer una recomendación de ORZAR, nunca debe confundirse con una oferta, nunca debe manipular el ranking ni ocultar información importante (ver `29-advertising-layout.md`).
