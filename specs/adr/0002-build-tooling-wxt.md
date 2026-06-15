# ADR-0002 — Build tooling: WXT

## Estado
Aceptada.

## Contexto
Se necesita una sola base de codigo MV3 para Chrome, Brave y Firefox, con TypeScript,
HMR y generacion de manifest por navegador.

## Decision
Usar **WXT** (Vite-based, framework-agnostic, cross-browser) como meta-framework.

## Consecuencias
- (+) Build Chrome/Firefox desde un codebase; maneja diferencias de manifest.
- (+) API `browser` unificada (sin polyfill manual), HMR, entrypoints por convencion.
- (+) Mantenimiento activo y comunidad, frente a alternativas estancadas.
- (-) Convenciones propias de WXT que hay que respetar (carpeta `entrypoints`).

## Alternativas descartadas
- CRXJS: solo Chromium, mantenimiento incierto.
- Plasmo: React-first, dudas de mantenimiento.
- Vite + esbuild manual: mas control, mucho mas boilerplate cross-browser.
