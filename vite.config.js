import vue from '@vitejs/plugin-vue2'
const path = require('path')

export default {
  /** allow hosting in subfolders like gh-pages */
  base: './',
  build: {
    rollupOptions: {
      input: {
        // the default entry point
        app: './index.html',

        // 1️⃣
        'service-worker': './src/service-worker.js',
      },
      output: {
        // 2️⃣
        entryFileNames: assetInfo => {
          return assetInfo.name === 'service-worker'
             ? '[name].js'                  // put service worker in root
             : 'assets/[name].js' 
        },
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      },
    },
  },
  plugins: [
    vue({})
  ],
  resolve:{
    alias:{
      '~' : path.resolve(__dirname, './src'),
      '~vue-material' : path.resolve(__dirname, 'node_modules/vue-material'),
    },
  },
}