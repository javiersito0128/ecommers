import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // Polyfills específicos para Firebase (crypto, process, etc.)
      include: ['crypto', 'process', 'buffer', 'util', 'stream'],
      // Polyfill para imports con 'node:' prefix
      protocolImports: true,
    }),
  ],
})