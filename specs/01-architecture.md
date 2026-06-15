# 01 — Arquitectura (borrador)

Estilo: **Hexagonal / Ports & Adapters** con cuatro capas y una **Dependency Rule**
estricta: las dependencias apuntan hacia el nucleo. El dominio no conoce el mundo
exterior; el mundo exterior implementa las interfaces que el dominio define.

```
entrypoints / ui  ->  application  ->  domain  <-  infrastructure
                                         ^                 |
                                         |_____ports_______|
```

## Capas

- **domain**: entidades, value objects y *ports* (interfaces). Cero dependencias de
  DOM, browser o frameworks. Testeable en Node puro.
- **application**: casos de uso (`HideUser`, `RestoreUser`, `EvaluateMessage`,
  `ListHiddenUsers`...). Orquesta dominio contra ports.
- **infrastructure**: implementaciones concretas de los ports — adapters de plataforma
  (`WhatsAppWebAdapter`) y storage (`browser.storage`).
- **ui**: presentacion del popup/options. Solo habla con casos de uso.
- **entrypoints**: edge de WXT (background, popup, content scripts). Composicion y
  wiring (inyeccion de dependencias).

## Port central: `PlatformAdapter`

Toda la logica de filtrado depende de esta interfaz, no del DOM. WhatsApp es solo la
primera implementacion.

Responsabilidades (a detallar en Paso 2):
- observar mensajes nuevos,
- resolver el autor de un nodo,
- aplicar el ocultamiento segun `HideMode`,
- obtener contexto de conversacion (para citas/menciones).

## Deteccion (resumen, detalle en Paso 4)

`MutationObserver` acotado al contenedor de mensajes + `WeakSet<Node>` para no
reprocesar. Marcado por atributo `data-ssv-hidden` + hoja de estilos estatica que
aplica la regla. Sin interceptar modulos internos de la plataforma.

## Reglas duras

- `domain` y `application` no importan `infrastructure`, `ui`, `entrypoints` ni `wxt`
  (enforced por ESLint).
- Nada de selectores CSS ofuscados en la logica: el autor se resuelve via identificador
  estable expuesto por el adapter, no por clases tipo `.x1y2z3`.
