import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { pathResolve } from './src/utils/node/pathResolve'
import { viteMockServe } from 'vite-plugin-mock'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteMockServe()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: pathResolve('src') + '/'
      }
    ]
  }
})
