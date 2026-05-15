import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      // Use regex so 'redux/store' etc. resolves to src/redux, but bare 'redux' (npm package) does not
      { find: /^redux\/(.+)$/, replacement: path.resolve(__dirname, 'src/redux/$1') },
      { find: 'components', replacement: path.resolve(__dirname, 'src/components') },
      { find: 'constants', replacement: path.resolve(__dirname, 'src/constants') },
      { find: 'contexts', replacement: path.resolve(__dirname, 'src/contexts') },
      { find: 'data', replacement: path.resolve(__dirname, 'src/data') },
      { find: 'guards', replacement: path.resolve(__dirname, 'src/guards') },
      { find: 'hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: 'pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: 'router', replacement: path.resolve(__dirname, 'src/router') },
      { find: 'styles', replacement: path.resolve(__dirname, 'src/styles') },
      { find: 'utils', replacement: path.resolve(__dirname, 'src/utils') },
    ],
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    globals: true,
  },
});
