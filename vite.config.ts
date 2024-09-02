import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import DefineOptions from 'unplugin-vue-define-options/vite';
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),

    // AutoImport({
    //   resolvers: [ElementPlusResolver({
    //     importStyle: 'sass',
    //   })],
    // }),

    // Components({
    //   resolvers: [ElementPlusResolver({
    //     importStyle: 'sass',
    //   })],
    // })
  ],
  resolve: {
    alias: {
      '@yhclt/ui': path.resolve(__dirname, 'packages/ui/src'),
      '@yhclt/utils': path.resolve(__dirname, 'packages/utils/src'),
    },
  },
})
