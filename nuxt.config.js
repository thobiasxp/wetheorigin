
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://js.stripe.com/v3' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.or
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
  ],
  axios: {
    // proxyHeaders: false
  },
  /*
  ** Build configuration
  */
  buildDir: '_nuxt',
  build: {
    // publicPath: '/_nuxt/',
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  server: {
    port: process.env.PORT ? process.env.PORT : 3000, // default: 3000
    host: process.env.HOST ? process.env.HOST : '0.0.0.0', // default: localhost
  },
  serverMiddleware: ['~/api/calls']
}
