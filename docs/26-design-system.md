# 26 — Design System

Documento principal del Design System (addendum de UX/UI). Complementa a `27`–`31`. Objetivo: que ORZAR se sienta como una herramienta inteligente para tomar decisiones de compra — no como una tienda online ni como un dashboard financiero.

## Color — tokens semánticos

```text
color.background.primary
color.surface.default
color.surface.elevated
color.border.default
color.text.primary
color.text.secondary
color.text.muted
color.accent
color.status.success
color.status.warning
color.status.danger
color.status.info
```

El color nunca es decorativo: `success` (verde) significa concretamente "buen precio / ahorro / estado positivo", no "bonito". Justificar cada color por contraste, accesibilidad y significado antes de fijarlo — no elegir arbitrariamente.

## Tipografía

Definir family, weights, sizes y line-heights separados para: headings, body, labels, **precios** (jerarquía visual propia y especialmente clara — el precio es el dato más escaneado de la interfaz) y captions.

## Espaciado

Escala de spacing consistente (p. ej. base 4px: 4/8/12/16/24/32/48/64) — ningún componente con valores arbitrarios sueltos.

## Border radius

Escala: `small` / `medium` / `large` / `pill`. Evitar el clásico "todo tiene `border-radius: 16px`" — es una de las señales más reconocibles de UI genérica generada por IA (ver `27-ux-guidelines.md`, checklist anti-AI-slop).

## Sombras

Definir cuándo usar `none` / `subtle` / `elevated` / `modal`. Preferir profundidad mediante contraste, superficies y bordes antes que sombras genéricas.

## Mapeo a implementación

Los tokens de arriba deben ser mapeables 1:1 a CSS variables o a la configuración de Tailwind sin renombrar conceptos — quien implemente el token `color.status.success` en código debe poder encontrarlo con ese mismo nombre semántico.
