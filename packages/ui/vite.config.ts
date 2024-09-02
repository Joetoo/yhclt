import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import ElementPlus from 'unplugin-element-plus/vite'

// import { ErabbitUIResolver } from '@erabbit-dev/auto-import'

// 2. 在编写我们组件库的组件时，需要使用按需加载的方式引入element-plus组件库

export default defineConfig({
  build: {
    // 压缩
    minify: false,
    // 打包文件目录
    outDir: 'dist',
    // css分离
    // cssCodeSplit: true,
    rollupOptions: {
      // 排除依赖的库,css
      external: ['vue', '@vueuse/core', 'element-plus', '@element-plus/icons-vue', /\.scss/],
      // 入口地址
      input: ['src/index.ts'],
      output: [
        // {
        // format: 'es',
        //           entryFileNames: '[name].mjs',
        //           preserveModules: true,
        //           dir: 'dist/es',
        //           inlineDynamicImports: false
        // },
        //         {
        //           format: 'iife',
        //           entryFileNames: 'erabbit.min.js',
        //           dir: 'dist',
        //           name: 'ErabbitUI',
        //           globals: {
        //             vue: 'Vue',
        //             '@vueuse/core': 'VueUse'
        //           },
        //           inlineDynamicImports: false
        //         },
        {
          format: 'es',
          // 不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: '[name].js', // erabbit.esm-browser.js
          dir: 'dist',
          inlineDynamicImports: false,
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          // 让打包目录和我们目录对应
          preserveModules: true,
          dir: 'dist/lib',
          inlineDynamicImports: false,
        },
      ],
    },
    lib: {
      entry: './src/index.ts',
      name: 'yh-ui',
      formats: ['es', 'cjs'],
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    // 打包后支持ts
    dts({
      entryRoot: './src',
      outDir: ['dist/es', 'dist/lib'],
      tsconfigPath: './tsconfig.json',
    }),
    // AutoImport({
    //   // 自动导入 Vue 相关函数，如:ref, reactive, toRef 等
    //   imports: ['vue'],
    //   // 生成自动导入声明文件
    //   dts: './auto-imports.d.ts',
    //   resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    //   // 不开起自动生成声明文件 dts: false
    //   dts: false,
    //   // 原因：Toast Confirm 这类组件的样式还是需要单独引入，样式全局引入了，关闭自动引入
    //   resolvers: [ElementPlusResolver({ importStyle: false })],
    // }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  // test: {
  //   globals: true,
  //   environment: 'jsdom',
  //   testTransformMode: {
  //     // web: [/.[tj]sx$/],
  //   },
  // },
})
