// const axios = require("axios");

export default {
  // mode: "universal",

  // target: 'static',
  /*
   ** Headers of the page
   */

  server: {
    port: 8000, // default: 3000
    host: "0.0.0.0" // default: localhost
  },

  head: {
    title: "Nuxt Ecommerce" || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;700"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#42b682",
    height: "3px",
    throttle: 0
  },

  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'white'
  },
  /*
   ** Global CSS
   */
  // css: [
  //   '~assets/scss/theme.scss'
  // ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: "~/plugins/vuex-persist", ssr: false }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/fontawesome", "@nuxtjs/vuetify"],

  fontawesome: {
    icons: {
      solid: [
        "faBars",
        "faSort",
        "faBusinessTime",
        "faSmile",
        "faTruck",
        "faInfoCircle",
        "faHome",
        "faShoppingCart",
        "faUser",
        "faEnvelope",
        "faPhone",
        "faGlobe",
        "faLaptopCode",
        "faGem",
        "faHeart",
        "faStar",
        "faSearch"
      ],
      regular: [
        "faStar"
      ],
      brands: [
        "faApple",
        "faFacebook",
        "faInstagram",
        "faYoutube",
        "faLinkedin",
        "faTwitter",
        "faHtml5",
        "faCss3",
        "faJs",
        "faPhp",
        "faWordpress",
        "faReact",
        "faVuejs",
        "faSass",
        "faGithub",
        "faBootstrap"
      ]
    }
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/axios",
    // "@nuxtjs/pwa",
    "@nuxtjs/dotenv",
    "@nuxtjs/style-resources"
  ],

  styleResources: {
    scss: ["~assets/scss/theme.scss"]
  },

  auth: {},

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
    extend(config, ctx) {}
  }
};
