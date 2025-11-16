import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config
export default defineConfig({
  build: {
    lib: {
      entry: './src/preload.ts',
      formats: ['cjs'],
      // ...
    }
  },
  plugins: [tsconfigPaths()]
});
