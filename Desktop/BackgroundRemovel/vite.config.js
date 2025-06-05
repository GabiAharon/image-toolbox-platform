import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
    port: 3001,
    host: true
  },
  build: {
    // Handle large chunks for AI libraries
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split AI libraries into separate chunks
          'background-removal': ['@imgly/background-removal'],
          'gpu': ['gpu.js'],
          'image-processing': ['fabric', 'konva', 'react-konva'],
          'vendor': ['react', 'react-dom', 'react-router-dom']
        }
      }
    },
    // Increase memory for build process
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  optimizeDeps: {
    exclude: ['@imgly/background-removal'],
    include: ['react', 'react-dom']
  },
  // Ensure proper WASM handling
  assetsInclude: ['**/*.wasm']
}) 