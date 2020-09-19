
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */

  // router: {
  //   middleware: 'cart'
  // },
  
  head: {
    title: "Nuxt Ecommerce" || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;700'
      }
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#ff360e' },
  /*
  ** Global CSS
  */
  css: [
    '~assets/scss/theme.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vuex-persist', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/fontawesome',
    '@nuxtjs/vuetify',
  ],

  fontawesome: {
    icons: {
      solid: ['faSort', 'faBusinessTime', 'faSmile', 'faTruck', 'faInfoCircle', 'faHome', 'faShoppingCart', 'faUser', 'faEnvelope', 'faPhone', 'faGlobe', 'faLaptopCode', 'faGem', 'faHeart'],
      brands: ['faApple', 'faFacebook', 'faInstagram', 'faYoutube', 'faLinkedin', 'faTwitter', 'faHtml5', 'faCss3', 'faJs', 'faPhp', 'faWordpress', 'faReact', 'faVuejs', 'faSass', 'faGithub', 'faBootstrap',],
    }
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    // '@nuxtjs/auth',
    // ['cookie-universal-nuxt', { alias: 'cookies' }],
  ],

  styleResources: {
    scss: ['~assets/scss/*.scss']
  },


  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // baseURL: 'http://localhost:3000/api'
  },

  auth: {
    
  },

  env: {
    title: process.env.npm_package_name
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
