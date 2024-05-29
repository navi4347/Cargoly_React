import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const ReactCompilerConfig = { /* ... */ };

export default defineConfig({
  plugins: [
    react(),
    ["babel-plugin-react-compiler", ReactCompilerConfig],
  ],
  server: {
    host: '0.0.0.0',
  },
})
