import path from 'path';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import vue from '@vitejs/plugin-vue';
import viteI18n from '@intlify/vite-plugin-vue-i18n';
import viteYaml from '@rollup/plugin-yaml';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  //FIXME eslintPlugin() fail on loading '.vue' in router/index.ts
  plugins: [
    vue(),
    viteI18n({
      include: [path.resolve(__dirname, 'locales/**')],
      runtimeOnly: false,
    }),
    viteYaml(),
  ],
});
