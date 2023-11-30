import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import postcssPresetEnv from 'postcss-preset-env'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    postcssPresetEnv({
      /* pluginOptions */
      features: {
        'nesting-rules': true
      },
    })
  ],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src/")
    }
  }
})
