export default {
  items: [
    {
      name: "Ussa Admin Panel",
      url: "/",
      icon: "icon-speedometer"
      // badge: {
      //   variant: 'primary',
      //   text: 'NEW'
      // }
    },
    // {
    //   title: true,
    //   name: 'Theme',
    //   class: '',
    //   wrapper: {
    //     element: '',
    //     attributes: {}
    //   }
    // },

    {
      name: "Product",
      url: "/base",
      icon: "icon-social-dropbox",
      children: [
        {
          name: "Product Table",
          url: "/",
          icon: "icon-cursor"
        },

        {
          name: "Create Product",
          url: "/createProduct",
          icon: "icon-plus"
        }
      ]
    },
    {
      name: "Categories...",
      url: "/base",
      icon: "fa fa-indent",
      children: [
        {
          name: "Category Table",
          url: "/category",
          icon: "icon-puzzle"
        },
        {
          name: "Create Categories",
          url: "/createCategory",
          icon: "icon-plus"
        }
      ]
    },
    {
      name: "Notifications",
      url: "/base",
      icon: "fa fa-envelope-o",
      children: [
        {
          name: "Notifications Table",
          url: "/natifigation",
          icon: "fa fa-envelope-open-o"
        },

        {
          name: "Create Notifications",
          url: "/createNat",
          icon: "icon-plus"
        }
      ]
    },
    {
      name: "City",
      url: "/base",
      icon: "fa fa-map",
      children: [
        {
          name: "City Table",
          url: "/city",
          icon: "icon-globe"
        },

        {
          name: "Create City",
          url: "/createCity",
          icon: "icon-plus"
        }
      ]
    },

    // {
    //         name: "Create Product",
    //         url: "createProduct",
    //         icon: "icon-plus"
    // },

    // {
    //   name: "Product...",
    //   url: "/base",
    //   icon: "icon-puzzle",
    //   children: [
    //     {
    //       name: "Product Table",
    //       url: "productTable",
    //       icon: "icon-grid"
    //     },

    //     {
    //       name: "Create Product",
    //       url: "createProduct",
    //       icon: "icon-plus"
    //     }
    //   ]
    // },

    {
      name: "User Table",
      url: "/userTable",
      icon: "icon-people"
    },
    {
      name: "Orders",
      url: "/order",
      icon: "icon-basket "
    },

    // {
    //   name: "City",
    //   url: "city",
    //   icon: "icon-globe"
    // },
    // {
    //   name: "Create city",
    //   url: "createCity",
    //   icon: "icon-plus"
    // },
    {
      name: "Banner Table",
      url: "/banners",
      icon: "icon-grid"
    },
    {
      name: "About us",
      url: "/about",
      icon: "fa fa-exclamation-circle"
    },
    {
      name: "Terms",
      url: "/terms",
      icon: "fa fa-info-circle"
    }
    // {
    //   name: "Add Banner",
    //   url: "bannerImage",
    //   icon: "icon-plus"
    // }

    // {
    //   title: true,
    //   name: 'Components',
    //   class: '',
    //   wrapper: {
    //     element: '',
    //     attributes: {}
    //   }
    // },
    // {
    //   name: 'Base',
    //   url: '/base',
    //   icon: 'icon-puzzle',
    //   children: [
    //     {
    //       name: 'Breadcrumbs',
    //       url: '/base/breadcrumbs',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Cards',
    //       url: '/base/cards',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Carousels',
    //       url: '/base/carousels',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Collapses',
    //       url: '/base/collapses',
    //       icon: 'icon-puzzle'
    //     },] }
    //     {
    //       name: 'Forms',
    //       url: '/base/forms',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Jumbotrons',
    //       url: '/base/jumbotrons',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'List Groups',
    //       url: '/base/list-groups',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Navs',
    //       url: '/base/navs',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Paginations',
    //       url: '/base/paginations',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Popovers',
    //       url: '/base/popovers',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Progress Bars',
    //       url: '/base/progress-bars',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Switches',
    //       url: '/base/switches',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Tables',
    //       url: '/base/tables',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Tooltips',
    //       url: '/base/tooltips',
    //       icon: 'icon-puzzle'
    //     }
    //   ]
    // },

    // {
    //   name: 'Buttons',
    //   url: '/buttons',
    //   icon: 'icon-cursor',
    //   children: [
    //     {
    //       name: 'Standard Buttons',
    //       url: '/buttons/standard-buttons',
    //       icon: 'icon-cursor'
    //     },
    //     {
    //       name: 'Button Groups',
    //       url: '/buttons/button-groups',
    //       icon: 'icon-cursor'
    //     },
    //     {
    //       name: 'Dropdowns',
    //       url: '/buttons/dropdowns',
    //       icon: 'icon-cursor'
    //     },
    //     {
    //       name: 'Social Buttons',
    //       url: '/buttons/social-buttons',
    //       icon: 'icon-cursor'
    //     }
    //   ]
    // },

    // {
    //   name: 'Icons',
    //   url: '/icons',
    //   icon: 'icon-star',
    //   children: [
    //     {
    //       name: 'Flags',
    //       url: '/icons/flags',
    //       icon: 'icon-star',
    //       badge: {
    //         variant: 'success',
    //         text: 'NEW'
    //       }
    //     },
    //     {
    //       name: 'Font Awesome',
    //       url: '/icons/font-awesome',
    //       icon: 'icon-star',
    //       badge: {
    //         variant: 'secondary',
    //         text: '4.7'
    //       }
    //     },
    //     {
    //       name: 'Simple Line Icons',
    //       url: '/icons/simple-line-icons',
    //       icon: 'icon-star'
    //     }
    //   ]
    // },
    // {
    //   name: 'Charts',
    //   url: '/charts',
    //   icon: 'icon-pie-chart'
    // },
    // {
    //   name: 'Notifications',
    //   url: '/notifications',
    //   icon: 'icon-bell',
    //   children: [
    //     {
    //       name: 'Alerts',
    //       url: '/notifications/alerts',
    //       icon: 'icon-bell'
    //     },
    //     {
    //       name: 'Badges',
    //       url: '/notifications/badges',
    //       icon: 'icon-bell'
    //     },
    //     {
    //       name: 'Modals',
    //       url: '/notifications/modals',
    //       icon: 'icon-bell'
    //     }
    //   ]
    // },
    // {
    //   name: 'Widgets',
    //   url: '/widgets',
    //   icon: 'icon-calculator',
    //   badge: {
    //     variant: 'primary',
    //     text: 'NEW'
    //   }
    // },
    // {
    //   divider: true
    // },
    // {
    //   title: true,
    //   name: 'Extras'
    // },
    // {
    //   name: 'Pages',
    //   url: '/pages',
    //   icon: 'icon-star',
    //   children: [
    //     {
    //       name: 'Login',
    //       url: '/pages/login',
    //       icon: 'icon-star'
    //     },
    //     {
    //       name: 'Register',
    //       url: '/pages/register',
    //       icon: 'icon-star'
    //     },
    //     {
    //       name: 'Error 404',
    //       url: '/pages/404',
    //       icon: 'icon-star'
    //     },
    //     {
    //       name: 'Error 500',
    //       url: '/pages/500',
    //       icon: 'icon-star'
    //     }
    //   ]
    // },
    // {
    //   name: 'Download CoreUI',
    //   url: 'http://coreui.io/vue/',
    //   icon: 'icon-cloud-download',
    //   class: 'mt-auto',
    //   variant: 'success'
    // },
    // {
    //   name: 'Try CoreUI PRO',
    //   url: 'http://coreui.io/pro/vue/',
    //   icon: 'icon-layers',
    //   variant: 'danger'
    // }
  ]
};
