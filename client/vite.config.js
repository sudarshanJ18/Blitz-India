import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          react: ['react', 'react-dom'],
          // React Router
          'react-router': ['react-router-dom'],
          // UI Animation libraries
          animations: ['framer-motion', 'gsap'],
          // Icon libraries
          icons: [
            '@fortawesome/react-fontawesome',
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-solid-svg-icons',
            '@fortawesome/free-brands-svg-icons',
            '@tabler/icons-react',
            'lucide-react'
          ],
          // Editor libraries (for admin)
          editor: [
            '@tiptap/react',
            '@tiptap/starter-kit',
            '@tiptap/extension-color',
            '@tiptap/extension-image',
            '@tiptap/extension-link',
            '@tiptap/extension-text-align',
            '@tiptap/extension-text-style',
            '@tiptap/extension-underline'
          ],
          // 3D and canvas libraries
          graphics: ['three', 'cobe'],
          // Utility libraries
          utils: ['axios', 'clsx', 'tailwind-merge']
        },
      },
    },
  },
  server: {
    historyApiFallback: true,
  },
});
