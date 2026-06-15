# ADR-0001 — Nucleo hexagonal con port `PlatformAdapter`

## Estado
Aceptada.

## Contexto
SSV debe soportar multiples plataformas (WhatsApp primero, luego Telegram/Discord)
sin reescribir la logica de filtrado, y mantener el nucleo testeable sin browser.

## Decision
Arquitectura Hexagonal. El dominio define un port `PlatformAdapter`; cada plataforma
es una implementacion en `infrastructure`. La logica de filtrado depende solo del port.

## Consecuencias
- (+) Nucleo testeable en Node, alta cobertura sin DOM.
- (+) Nueva plataforma = nuevo adapter, nucleo intacto.
- (+) La Dependency Rule se puede enforcar por lint.
- (-) Mas ceremonia inicial (interfaces, wiring) que un content script monolitico.

## Alternativas descartadas
- Content script monolitico acoplado a WhatsApp: rapido pero no escalable ni testeable.
- Interceptar modulos internos de la plataforma (Store/webpack): fragil ante updates y
  fuera del principio read-only.
