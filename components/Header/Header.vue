<template>
  <header class="app-header navbar">
    <button
      class="navbar-toggler mobile-sidebar-toggler d-lg-none"
      type="button"
      @click="mobileSidebarToggle"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-link class="navbar-brand" to="#"></b-link>
    <button
      class="navbar-toggler sidebar-toggler d-md-down-none hamburger"
      type="button"
      @click="sidebarToggle"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-navbar-nav exact class="d-md-down-none navii">
      <b-nav-item class="nav px-3">
        <NuxtLink :to="'/'">PRODUCT TABLE</NuxtLink>
      </b-nav-item>

      <b-nav-item class="nav px-3">
        <NuxtLink :to="'/category'">CATEGORIES</NuxtLink>
      </b-nav-item>

      <b-nav-item class="nav px-3">
        <NuxtLink :to="'/userTable'">USER TABLE</NuxtLink>
      </b-nav-item>

      <b-nav-item class="nav px-3">
        <NuxtLink :to="'/order'"
          >ORDER <span class="small prod">{{ all_prod }}</span></NuxtLink
        >
      </b-nav-item>
      <a href="/loginAdmin" class="icon-logout" @click="logout"></a>
    </b-navbar-nav>
  </header>
</template>

<script>
  import HeaderDropdown from "./HeaderDropdown.vue";

  export default {
    data() {
      return {
        all_prod: 0
      };
    },

    computed: {
      token() {
        return this.$store.getters["user/getUserToken"];
      }
    },
    async fetch() {
      await this.get_order_product();
    },
    name: "c-header",
    components: {
      HeaderDropdown
    },
    methods: {
      sidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle("sidebar-hidden");
      },
      sidebarMinimize(e) {
        e.preventDefault();
        document.body.classList.toggle("sidebar-minimized");
      },
      mobileSidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle("sidebar-mobile-show");
      },
      asideToggle(e) {
        e.preventDefault();
        document.body.classList.toggle("aside-menu-hidden");
      },
      logout() {
        this.$store.dispatch("user/logOut");
         location.reload();
      },

      async get_order_product() {
        const data = await this.$axios.$get(
          `http://95.85.125.197:1101/admin/orders`,
          {
            headers: {
              Authorization: "Bearer " + this.token
            }
          }
        );

        for (let order_count of data) {
          this.all_prod += order_count.num_of_prod;
        }

        console.log(this.all_prod, "asda");
      }
    }
  };
</script>


<style lang="scss"  scoped>
.hamburger {
  /* justify-content: flex-start; */
  position: absolute;
  left: 150px;
}
.navii a {
  font-weight: 700;
  font-size: 1rem;
  &:hover {
    text-decoration: none;
    background: none !important;
  }
}
.logOut {
  font-size: 20px;
  margin-right: 10px;
  &:hover {
    font-weight: 600;
    color: blue;
  }
}
.prod {
}
</style>>
