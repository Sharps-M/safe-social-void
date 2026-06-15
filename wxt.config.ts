import { defineConfig } from 'wxt';

// Manifest V3. WXT genera el manifest por navegador y unifica la API `browser`
// (paridad Chrome/Brave/Firefox) sin necesidad de webextension-polyfill manual.
export default defineConfig({
  srcDir: 'src',
  manifest: {
    name: 'SafeSocialVoid',
    description:
      'Filtro visual local, privado y reversible para plataformas de mensajeria. Control your social space.',
    permissions: ['storage'],
    // host_permissions se agregan por-plataforma a medida que se habilita cada adapter.
    host_permissions: ['https://web.whatsapp.com/*'],
  },
});
