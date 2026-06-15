# SafeSocialVoid (SSV)

> Control your social space.

Extension de navegador (Manifest V3, cross-browser) que aplica un **filtro visual
local, privado y reversible** sobre plataformas de mensajeria. Permite ocultar de
*tu propia* interfaz el contenido de usuarios seleccionados, sin abandonar el grupo
y sin afectar la experiencia de nadie mas.

- **Local-only**: todo el procesamiento y la configuracion viven en tu dispositivo.
- **Read-only**: solo lee el DOM y oculta nodos en tu vista. No envia, borra ni modifica nada en el servicio.
- **Reversible**: cada filtro se activa, pausa o quita cuando quieras.

WhatsApp Web es la **primera** plataforma. La arquitectura es agnostica: nuevas
plataformas se suman como adapters sin tocar el nucleo.

## Estado

`Pre-Development` — Paso 1: scaffold + arquitectura.

## Stack

WXT + TypeScript (strict) + Vite + Vitest + ESLint + Prettier.

## Comandos

| Comando | Que hace |
| --- | --- |
| `npm run dev` | Dev en Chrome con HMR |
| `npm run dev:firefox` | Dev en Firefox |
| `npm run build` / `build:firefox` | Build de produccion por navegador |
| `npm run zip` / `zip:firefox` | Empaqueta para la store |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` / `test:cov` | Tests (con cobertura) |
| `npm run lint` / `lint:fix` | ESLint |
| `npm run format` | Prettier |

## Arquitectura

Hexagonal (Ports & Adapters) con cuatro capas. La **Dependency Rule** apunta siempre
hacia adentro: `entrypoints/ui -> application -> domain`; infraestructura implementa
los ports que define el dominio. Detalle en `specs/01-architecture.md`.

```
src/
  domain/          Nucleo puro. Sin DOM, sin browser, sin frameworks.
  application/     Casos de uso. Orquesta dominio + ports.
  infrastructure/  Implementaciones de ports (adapters de plataforma, storage).
  ui/              Presentacion del popup/options.
  shared/          Tipos y utilidades transversales.
  entrypoints/     Edge WXT (background, popup, content scripts). Composicion.
```

## Scope

Ver `specs/00-vision-scope.md` para el limite explicito de lo que entra y lo que NO
entra en el MVP.

## Licencia

TBD.
