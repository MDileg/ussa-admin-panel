<template>
  <div class="app">
    <!-- <Login/> -->
    <AppHeader />
    <div class="app-body">
      <Sidebar :navItems="nav" />
      <main class="main">
        <breadcrumb :list="list" />
        <div class="container-fluid">
          <nuxt />
        </div>
      </main>
      <!-- <AppAside/> -->
    </div>
    <!-- <AppFooter/> -->
    <div class="post-alert-cart">
      <b-alert
        :show="dismissCountDown"
        dismissible
        :variant="alert.type"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
        class="fadeIn"
      >
        {{ alert.text }}
        <b-progress
          :variant="alert.type"
          :max="dismissSecs"
          :value="dismissCountDown"
          height="4px"
        >
        </b-progress>
      </b-alert>
    </div>
  </div>
</template>

<script>
  import nav from "./menu";
  import {
    Header as AppHeader,
    Sidebar,
    Aside as AppAside,
    Footer as AppFooter,
    Breadcrumb
  } from "~/components/";

  export default {
    name: "full",
    components: {
      AppHeader,
      Sidebar,
      AppAside,
      AppFooter,
      Breadcrumb
    },
    data() {
      return {
        nav: nav.items,

        dismissSecs: 5,
        dismissCountDown: 0,
        showDismissibleAlert: false,
        alert: {
          type: null,
          text: null
        }
      };
    },
    created() {
      this.$nuxt.$on("alert", data => {
        this.alert.type = data.type;
        this.alert.text = data.text;
        this.dismissCountDown = this.dismissSecs;
      });
    },
    methods: {
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown;
      }
    },
    computed: {
      name() {
        return this.$route.name;
      },
      list() {
        return this.$route.matched;
      }
    },
    middleware: "auth",
  };
</script>


<style lang="scss" scoped>
.post-alert-cart {
  position: fixed;
  top: 20px;
  right: 20px;
}
.alert-danger {
  color: red;
}

.alert-success {
  margin-bottom: 0;
  color: blue;
}
</style>