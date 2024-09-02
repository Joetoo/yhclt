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
      '@': path.resolve(__dirname, 'packages'),
      '#': path.resolve(__dirname, 'src/types'),
      '~public': path.resolve(__dirname, 'public'),
    },
  },
})
