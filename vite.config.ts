import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fileDirName from './config/utils/file_dir_name'

const { __dirname } = fileDirName(import.meta.url)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src/'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "~/styles/_global.scss";`,
      },
    },
  },
})
