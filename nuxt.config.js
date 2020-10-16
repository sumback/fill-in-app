export default {
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  },
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/dotenv'],
  serverMiddleware: [{ path: '/api', handler: '~/api/index' }],
  dotenv: {
    systemvars: true,
    path: './api/config/'
  }
};
