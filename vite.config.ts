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
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':    ['react', 'react-dom', 'react-router-dom'],
          'vendor-firebase': ['firebase/app', 'firebase/firestore', 'firebase/storage', 'firebase/auth'],
          'vendor-redux':    ['@reduxjs/toolkit', 'react-redux'],
          'vendor-i18n':     ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          'vendor-forms':    ['react-hook-form', '@hookform/resolvers', 'yup'],
        },
      },
    },
  },
})
