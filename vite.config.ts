import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import vue from '@vitejs/plugin-vue';
import viteI18n from '@intlify/vite-plugin-vue-i18n';
import viteYaml from '@rollup/plugin-yaml';
import viteSvgLoader from 'vite-svg-loader';

export default (ctx: any) => {
  Object.assign(process.env, loadEnv(ctx.mode, process.cwd()));

  // https://vitejs.dev/config/
  return defineConfig({
    server: {
      cors: true,
      proxy: {
        '/api/mongo': {
          target: process.env.VITE_API_MONGO_URL,
          secure: false,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api\/mongo/, String(process.env.VITE_API_MONGO_ENDPOINT)),
        },
      },
    },
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
      viteSvgLoader(),
    ],
  });
};
