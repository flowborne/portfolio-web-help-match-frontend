import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    server: {
      port: Number(env.VITE_SERWERPORT),
      open: true,
      host: true,
      proxy: {
        '/help': {
          target: env.VITE_PROXY,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/help/, '')
        }
      }
    },
    resolve: {
      alias: {
        '~components': '/src/components',
        '~containers': '/src/containers',
        '~services': '/src/services',
        '~types': '/src/types',
        '~contexts': '/src/contexts',
        '~hooks': '/src/hooks',
        '~layouts': '/src/layouts',
        '~pages': '/src/pages',
        '~assets': '/src/assets',
        '~themes': '/src/themes',
        '~data': '/src/providers',
        '~translations': '/src/translations'
      }
    }
  }
})
