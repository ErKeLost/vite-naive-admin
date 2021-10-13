import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { pathResolve } from './src/utils/node/pathResolve'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: pathResolve('src') + '/'
      }
    ]
  }
})
