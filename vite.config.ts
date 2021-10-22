import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { pathResolve } from './src/utils/node/pathResolve'
import { viteMockServe } from 'vite-plugin-mock'
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteMockServe(), vueJsx()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: pathResolve('src') + '/'
      }
    ]
  }
})
