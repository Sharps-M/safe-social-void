// Content script de WhatsApp Web. Por ahora placeholder.
// En el Paso 4 se monta aca el WhatsAppWebAdapter (infrastructure).
export default defineContentScript({
  matches: ['https://web.whatsapp.com/*'],
  runAt: 'document_idle',
  main() {
    console.debug('[SSV] content script cargado en WhatsApp Web');
  },
});
