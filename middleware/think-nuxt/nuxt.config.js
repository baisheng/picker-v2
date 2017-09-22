/* eslint-disable comma-dangle */
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const apiConfig = require('./api.config')
module.exports = {
  srcDir: 'client/',
  buildDir: '.build/',
  dev: process.env.NODE_ENV !== 'production',
  cache: {
    max: 20,
    maxAge: 600000
  },
  /**
   * Using Phusion Passenger with Nginx on Plesk - That will gzip
   */
  performance: {
    gzip: false
  },
  router: {
    linkActiveClass: 'selected',
    middleware: 'check-auth'
    // extendRoutes (routes, resolve) {
    //   routes.push({
    //     name: 'start',
    //     path: '/start',
    //     component: resolve(__dirname, 'pages/signup/')
    //   })
    // }
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Picker Beta',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Picker manager ssr version'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  // loading: {
  //   name: 'pulse',
  //   color: '#3B8070',
  //   background: 'white'
  // },
  loading: '~/components/loading',
  /*
  ** Build configuration
  */
  build: {
    // analyze: true,
    // publicPath: '/picker-ssr/',
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      config.resolve.alias['class-component'] = '~plugins/class-component'
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/\.(?!(?:js|json)$).{1,5}$/i, /^vue-awesome/, /^vue-upload-component/]
          })
        ]
      }
    },
    vendor: [
      'negotiator',
      'vue-class-component',
      'vuex-class',
      'moment',
      'vue-awesome',
      'vee-validate'
    ],
    extractCSS: true,
    filenames: {
      vendor: 'vendor.[hash:12].js',
      app: 'picker.[chunkhash:12].js',
      css: 'picker.[contenthash:12].css'
    },
    plugins: [
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh|en/)
    ]
  },
  // 为JS和Vue文件定制babel配置。https://nuxtjs.org/api/configuration-build/#analyze
  babel: {
    presets: ['es2015', 'stage-2'],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-async-to-generator',
      'transform-runtime'
    ],
    comments: true
  },
  env: {
    // API_URL_BROWSER: apiConfig.baseURL,
    // browserBaseURL: apiConfig.baseURL,
    baseURL: apiConfig.baseURL,
    'socket': apiConfig.socketHost
  },
  modules: [
    // Simple usage
    '@nuxtjs/axios',
    // With options
    // ['@nuxtjs/axios', { credentials: false }],
    '@nuxtjs/proxy',
    // Simple usage
    '@nuxtjs/component-cache'
    // With options
    // ['@nuxtjs/component-cache', { maxAge: 1000 * 60 * 60 }],
  ],
  proxy: [
    ['/api',
      {
        target: apiConfig.baseURL
        // pathRewrite: { '^/api': '/rest/orgs/' }
      }]
  ],
  // You can optionally use global options instead of inline form
  axios: {
    baseURL: apiConfig.baseURL,
    // options: {
    //   baseURL: apiConfig.baseURL,
    //   API_URL_BROWSER: apiConfig.baseURL,
    //   browserBaseURL: apiConfig.baseURL,
    // },
    credentials: false,
    redirectError: {
      401: '/login'
    },
    requestInterceptor: (config, {store}) => {
      if (store.state.token) {
        config.headers.common.Authorization = 'Bearer ' + store.state.token
      }
      return config
    }
  },
  plugins: [
    {src: '~/plugins/moment.js'},
    // '~plugins/axios.js',
    '~plugins/vue-awesome.js',
    '~plugins/vee-validate.js',
    '~plugins/vue-dnd.js',
    {src: '~plugins/a-player.js', ssr: true},
    {src: '~plugins/popover.js', ssr: false},
    {src: '~plugins/error-handler', ssr: false}
  ],
  css: [
    {src: '~assets/stylesheets/style.scss', lang: 'scss'}
  ]
}
