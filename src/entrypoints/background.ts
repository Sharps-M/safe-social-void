// Background (service worker en Chrome / event page en Firefox).
// El wiring real (storage, mensajeria popup<->content) se agrega en pasos posteriores.
export default defineBackground(() => {
  console.debug('[SSV] background listo');
});
