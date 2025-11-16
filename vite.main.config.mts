import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config
export default defineConfig({
  build: {
    lib: {
      entry: './src/main.ts',
      formats: ['es'],
      // ...
    }
  },
  plugins: [tsconfigPaths()]
});
