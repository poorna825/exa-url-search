import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { webcrypto } from 'crypto' // ✅ Fixed import

// Patch for Vite expecting globalThis.crypto.subtle
if (!globalThis.crypto || !globalThis.crypto.subtle) {
  globalThis.crypto = webcrypto
}

export default defineConfig({
  plugins: [react()],
})
