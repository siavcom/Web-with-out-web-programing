/*import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  
})
*/

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  server: {				// ← ← ← ← ← ←
    host: '0.0.0.0',	// ← new content ←
    port: 38000
  },			
  resolve: {
    alias: {
    '@': path.resolve(__dirname, './src'), 
    //  '@/': `${path.resolve(__dirname, 'src')}/`
    },
  },
  define: {
    'process.env': process.env
  },
  chainWebpack: config => config.resolve.set('symlinks', false),  // Permite simbolic Links
  logLevel : 'info', //'error' 'warm' 'silent'
  clearScreen : 'false',
  build:{
    sourcemap: false  //Ocultar el sorce map
  }
})


