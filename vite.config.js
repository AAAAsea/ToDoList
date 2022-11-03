import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus({
      useSource: true,
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')    // 配置别名；将 @ 指向'src'目录
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/style.scss" as *;`,
      },
    },
  },

  server: {
    port: 4000,       // 设置服务启动的端口号；如果端口已经被使用，Vite 会自动尝试下一个可用的端口
    open: true,       // 服务启动后自动打开浏览器
    proxy: {          // 代理
      '/list': {
        target: 'http://124.221.154.52:4000',
        // target: 'https://todo.asea.fun',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/list/, '')     // 注意代理地址的重写
      },
      // 可配置多个... 
    }
  }
})
