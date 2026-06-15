# Domain — Modelo (Paso 2)

Capa `src/domain/`. Es el nucleo: reglas puras, sin DOM, sin `browser`, sin frameworks.
Testeable en Node. La Dependency Rule (enforced por ESLint) impide que importe hacia afuera.

## Value Objects

- **`PlatformId`** — union de literales (`'whatsapp-web'`). Se agrega uno por adapter.
- **`HideMode`** — `'hidden' | 'placeholder' | 'blurred'`. Como se renderiza lo filtrado.
- **`AuthorId` / `ConversationId` / `MessageId`** — *branded types* sobre `string`. Opacos:
  el dominio compara identidades por igualdad y no sabe que hay adentro (numero, JID, hash).
  El valor real lo deriva cada adapter. Regla dura: nunca selectores CSS ofuscados.

## Entidades

- **`Message`** `{ id, authorId, conversationId }` — representacion de dominio de un mensaje.
- **`FilterRule`** `{ platformId, authorId, mode, until, createdAt }` — el corazon:
  "ocultar al autor X en la plataforma P con modo M hasta T". `until = null` => permanente;
  un timestamp => filtro temporal que se auto-expira. Esto cubre *reversible* y *temporal*
  con un solo campo.
  - `isRuleActive(rule, now)` — permanente o aun no vencida.
  - `createFilterRule(input)` — fabrica con `createdAt` seteado.

## Logica pura

- **`evaluate(message, rules, now): FilterDecision`** — decide `show` u `hide` + modo.
  Pura y deterministica: `now` se inyecta, no usa `Date.now()`. Se asume `rules` ya acotado
  a la plataforma activa. Primera regla activa que matchea el autor gana.
  - `FilterDecision = { action: 'show' } | { action: 'hide', mode: HideMode }`.

## Ports (interfaces que infraestructura implementa)

- **`FilterRepository`** — persistencia (`load`/`save` por plataforma). La impl usara
  `browser.storage.local` en `infrastructure`.
- **`PlatformAdapter<TNode = unknown>`** — integracion con cada plataforma:
  `observe`, `resolveAuthor`, `applyDecision`, `getConversationContext`. `TNode` es opaco
  (sera `HTMLElement` en infraestructura) para que el dominio no toque el DOM.

## Invariante read-only (clave del producto)

El `PlatformAdapter` expone SOLO leer + renderizar local. No tiene `send`, `delete` ni
`revoke`. Por construccion, el codebase no puede actuar sobre el servicio: el mensaje sigue
existiendo en el servidor y para todos los demas; SSV simplemente no lo dibuja en tu vista.
Esto es lo que pidio el producto ("que el otro no se entere"): nada sale del cliente.

> Si en el futuro se evalua una feature de moderacion (escribir en el servicio), seria un
> port nuevo y separado, write-capable, como decision arquitectonica explicita y revisable.

## Como mapea al requisito

| Requisito | Pieza |
| --- | --- |
| Dejar de ver a la persona | `evaluate` => `hide` => `adapter.applyDecision` |
| Que el otro no se entere | Invariante read-only del `PlatformAdapter` |
| Reversible / temporal | `FilterRule.until` + `isRuleActive` |

## Tests

`evaluate.test.ts`: sin reglas, regla permanente, otro autor, temporal vigente, temporal
vencida, limite exacto de vencimiento, y modo respetado. 7/7 en verde.
