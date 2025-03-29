import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

import { loadEnv } from 'vite'
import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  // import.meta.env.VITE_API_BASE_URL
  // import.meta.env.VITE_APP_NAME
  // eslint-disable-next-line no-undef
  const root = process.cwd();
  const Env = loadEnv(mode, root);

  return {
    plugins: [
      mockDevServerPlugin(),
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      port: 3000,
      proxy: {
        [Env.VITE_API_BASE_URL]: {
          target: "http://192.168.1.2:8000",
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp(`^${Env.VITE_API_BASE_URL}`), '')
        }
      }
    }
  }
})
