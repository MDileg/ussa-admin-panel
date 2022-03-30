const changeLoaderOptions = loaders => {
  if (loaders) {
    for (const loader of loaders) {
      if (loader.loader === "sass-loader") {
        Object.assign(loader.options, {
          includePaths: ["./assets"]
        });
      }
    }
  }
};

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "Ussa_Admin_Panel",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Unofficial Nuxt + CoreUI project, free to use boilerplate for every need."
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  /*
   ** Set the link active classes
   */
  router: {
    linkActiveClass: "active open"
  },

  /*
   ** Customize the progress bar color
   */
  loading: { color: "#42A5CC" },

  /**
   * Import CSS
   */
  css: [
    /* Import Font Awesome Icons Set */
    "~/node_modules/flag-icon-css/css/flag-icon.min.css",
    /* Import Font Awesome Icons Set */
    "~/node_modules/font-awesome/css/font-awesome.min.css",
    /* Import Simple Line Icons Set */
    "~/node_modules/simple-line-icons/css/simple-line-icons.css",
    /* Import Bootstrap Vue Styles */
    "~/node_modules/bootstrap-vue/dist/bootstrap-vue.css",
    /* Import Core SCSS */
    { src: "~/assets/scss/style.scss", lang: "scss" }
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: "~/plugins/vue-session.client.js" }],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    "@nuxtjs/axios",
    // Doc: https://github.com/bootstrap-vue/bootstrap-vue
    "bootstrap-vue/nuxt",

    //sweat alert
    "vue-sweetalert2/nuxt",
    "vue-sweetalert2/nuxt/no-css",
    "cookie-universal-nuxt"
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: "http://95.85.125.197:1101/",
    // proxy: true,
    common: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json"
    }
  },

  proxy: {
    "/admin/": {
      //  target: 'http://10.15.0.53:1101',
      target: "http://95.85.125.197:1101/",
      pathRewrite: { "^/admin/": "" },
      changeOrign: false
    }
  },

  /*
   ** Style resources configuration
   */
  styleResources: {
    scss: "./assets/scss/style.scss"
  },

  /*
   ** Build configuration
   */
  build: {
    vendor: ["vue-session"],
    /*
     ** You can extend webpack config here
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });

        const vueLoader = config.module.rules.find(
          ({ loader }) => loader === "vue-loader"
        );
        const {
          options: { loaders }
        } = vueLoader || { options: {} };

        if (loaders) {
          for (const loader of Object.values(loaders)) {
            changeLoaderOptions(Array.isArray(loader) ? loader : [loader]);
          }
        }

        config.module.rules.forEach(rule => changeLoaderOptions(rule.use));
      }
    }
  }
};
