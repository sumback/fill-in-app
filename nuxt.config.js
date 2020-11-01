export default {
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  },
  css: [
    'vue-material/dist/vue-material.min.css',
    'vue-material/dist/theme/default.css',
    '@/assets/scss/main.scss'
  ],
  styleResources: {
    scss: ['assets/scss/main.scss']
  },
  modules: ['@nuxtjs/style-resources'],
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/dotenv'],
  plugins: [{ src: '~/plugins/vue-material' }],
  serverMiddleware: [{ path: '/api', handler: '~/api/index' }],
  dotenv: {
    systemvars: true,
    path: './api/config/'
  }
};
