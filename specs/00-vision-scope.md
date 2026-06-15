# 00 — Vision y Scope

## Vision

Que cada persona controle su propia experiencia de lectura en comunidades digitales:
poder dejar de ver a alguien sin abandonar el grupo, sin generar conflicto y sin que
esa persona lo note. El filtro es **visual, local y reversible**.

## Premisa

> No quiero abandonar una comunidad. No quiero generar conflicto.
> Simplemente no quiero ver a una persona determinada.

## Casos de uso

- Antibullying: reducir exposicion a usuarios hostiles.
- Conflictos personales: evitar la lectura constante de alguien con quien hay roce.
- Bienestar emocional: bajar estres/ansiedad provocados por ciertas interacciones.
- Comunidades grandes: personalizar la experiencia sin irse de espacios valiosos.

## Principios de producto

- **Privacidad**: configuracion y procesamiento 100% en el dispositivo. Cero backend.
- **Read-only**: la extension lee el DOM y oculta nodos en la vista local. No borra ni
  envia ni modifica nada del lado del servicio.
- **Reversible**: todo filtro se puede activar, pausar (temporal) o quitar.
- **Invisibilidad**: el usuario filtrado no recibe ninguna senal (es consecuencia natural
  de un filtro local: nada sale del cliente).
- **No intrusivo**: solo se altera la interfaz local del usuario que instala SSV.

## Dentro del MVP

- Gestion de usuarios ocultados: ocultar / restaurar / listar.
- Filtrado automatico de mensajes futuros del usuario ocultado.
- Modos de ocultamiento: `hidden`, `placeholder` (mostrar bajo demanda), `blurred`.
- Modo temporal (1h / 1d / 1sem / permanente).
- Persistencia entre sesiones (storage local, schema versionado).
- Compatibilidad Chrome / Brave / Firefox.
- Plataforma inicial: WhatsApp Web.

## Fuera del MVP (explicito)

- **Moderacion activa / borrado de mensajes / mensajes automatizados**: queda como
  exploracion futura, NO se implementa en el MVP. SSV es read-only por diseno.
- Cualquier accion que actue sobre cuentas o mensajes de terceros.
- App movil / Android.
- Backend, sync en la nube o cuentas de usuario.

## Definicion de exito del MVP

1. El usuario selecciona una persona dentro de un grupo.
2. Los mensajes futuros de esa persona dejan de aparecer en su vista.
3. La experiencia del resto del grupo permanece intacta.
4. La configuracion persiste entre sesiones.
5. Funciona estable durante varios dias de uso continuo.
