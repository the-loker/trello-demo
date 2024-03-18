import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Unfonts from 'unplugin-fonts/vite';

export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? '/trello-demo/' : '/',
    plugins: [
      vue(),
      Unfonts({
        google: {
          families: ['Montserrat'],
        },
      }),
    ],

    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@views': resolve(__dirname, 'src', 'views'),
        '@store': resolve(__dirname, 'src', 'store'),
        '@routes': resolve(__dirname, 'src', 'routes'),
        '@layouts': resolve(__dirname, 'src', 'layouts'),
        '@services': resolve(__dirname, 'src', 'services'),
        '@components': resolve(__dirname, 'src', 'components'),
        '@composables': resolve(__dirname, 'src', 'composables'),
      },
    },
  };
});
