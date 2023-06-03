import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fileDirName from './config/utils/file_dir_name'
import svgr from 'vite-plugin-svgr'
import pluginChecker from 'vite-plugin-checker'

const { __dirname } = fileDirName(import.meta.url)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({ exportAsDefault: true }), pluginChecker({ typescript: true })],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: [`@use "@/styles/_global.scss" as *; @use "@/styles/_mixin.scss" as *;`],
      },
    },
  },
})
