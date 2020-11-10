export default {
  ssr: false,
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
  modules: ['@nuxtjs/axios', '@nuxtjs/style-resources', 'nuxt-i18n'],
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/dotenv',
    '@nuxtjs/router-extras'
  ],
  plugins: [
    { src: '~/plugins/vue-material' },
    { src: '~/plugins/axios-accessor' },
    { src: '~/plugins/vee-validate' }
  ],
  serverMiddleware: [{ path: '/api', handler: '~/api/index' }],
  i18n: {
    locales: [{ code: 'fr', file: 'fr.js' }],
    defaultLocale: 'fr',
    lazy: true,
    langDir: 'assets/lang/',
    strategy: 'no_prefix',
    cookieCrossOrigin: false,
    detectBrowserLanguage: false
  },
  dotenv: {
    systemvars: true,
    path: './api/config/'
  }
};
