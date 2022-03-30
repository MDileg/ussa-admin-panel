<template>
  <div>
    <nav id="pagination">
     
      <b-pagination
        @input="goToPage(currentPage)"  
        class="mt-2"  
        size="md"
        align="center"
        pills
        :total-rows="Number(count)"
        v-model="currentPage"
        :per-page="elementsPerPage"
      />

  <form class="goTo">
        <input type="number" class="goTo_input" v-model="input" placeholder="pagination" />
        <b-button
        type="submit"
        class="link goTo_btn"
        @click.prevent="goToPageByInput"
        >Go</b-button
        >
    </form>
    </nav>
  </div>
</template>
<script>
  export default {
    name: "Pagination",

    props: {
      count: { type: Number, default: 0, required: true },
      goToPage: { type: Function, required: true },
      defaultPage: { type: Number, default: 1, required: false },
      elementsPerPage: { type: Number, default: 5 }
    },

    data() {
      return {
        input: null,

        currentPage: 1
      };
    },

    methods: {
      goToPageByInput() {
        let num = Number(this.input);
        if (num && num > 0 && num <= this.count) {
          this.currentPage = num;
          this.goToPage(num);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: space-between;
  background: #8f8f8f;
  .goTo {
    display: flex;
    justify-content: right;
    .goTo_input {
      outline: none;
      border: 1px solid #8f8f8f !important;
      border-radius: 5px;
      color: #8f8f8f;
      padding: 2px !important;
    }
    .goTo_btn {
      background-color: #fff;
      border-radius: 5px;
      margin-left: 10px;
      border: 1px solid #8f8f8f !important;
      color: #8f8f8f;
      padding: 5px 10px;
    }
  }
}
</style>
