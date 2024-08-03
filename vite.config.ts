import vue from '@vitejs/plugin-vue'
// import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'

// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import DefineOptions from 'unplugin-vue-define-options/vite';
export default defineConfig({
  plugins: [
    // vueJsx(),
    vue(),
    UnoCSS(),
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
})
