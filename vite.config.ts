import { fileURLToPath, URL } from 'node:url'

import ui from '@nuxt/ui/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ui({
      components: {
        dirs: [],
      },
      autoImport: {
        dts: false,
      },
      ui: {
        colors: {
          primary: 'green',
          neutral: 'zinc',
        },
      },
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
