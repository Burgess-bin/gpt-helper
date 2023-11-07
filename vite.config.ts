import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import crx from './vite-plugin/dist'
import commonjsExternals from 'vite-plugin-commonjs-externals';

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      crx({
        manifest: './src/manifest.json',
      }),
      commonjsExternals({
        externals: ['fs', 'canvas', 'zlib', 'http', 'https', 'url', 'promisify'] //这里
      }),
    ],
    build: {
      emptyOutDir: mode == 'production',
    },
  }
})
