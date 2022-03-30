<template>
  <div>
    <div style="display:flex">
      <div class="search-container">
        <input
          type="text"
          placeholder="Search..."
          class="search-input"
          v-model.lazy="inputSearch"
          @keyup.enter="$fetch"
        />

        <i class="fa fa-search"></i>
            <i v-if="inputSearch != ''"  class="fa fa-close fa-lg" @click="clearShearch"></i>
      </div>

      <!-- <b-dropdown id="ddown1" text="Catagory" class="m-2">
        <b-dropdown-item v-for="(categories, index) in category" :key="index">{{
          categories.name_ru
        }}</b-dropdown-item>
      </b-dropdown> -->
    </div>

    <NewLoading v-if="$fetchState.pending" />

    <div class="card" v-else>
      <div class="table-title">
        <h2>User Table</h2>
      </div>
      <div class="button-container">
        <span>You can control table from here ></span>

        <NuxtLink :to="'updateAccount'">
          <button class="primary" title="Add New Data">
            <i class="fa fa-user fa-lg " dark></i>
          </button>
        </NuxtLink>
      </div>

      <div class="table-concept" v-if="inputSearch == ''">
        <input
          class="table-radio"
          type="radio"
          name="table_radio"
          id="table_radio_0"
          checked="checked"
        />
        <div class="table-display">
           <h6>Users: {{ panel.length }}</h6>
        </div>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>phone number</th>
              <th>adress</th>
              <th>city</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(panels, index) in panel" :key="index">
              <td>{{ panels.full_name }}</td>
              <td>{{ panels.password }}</td>
              <td>{{ panels.phone_number }}</td>
              <td>{{ panels.address }}</td>
              <td>{{ panels.city }}</td>
              <td>
                {{ panels.createdAt.slice(0, 10) }}
                <span v-if="panels.createdAt.length > 2">...</span>
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination
          :goToPage="goToPage"
          :count="count"
          :elementsPerPage="elementsPerPage"
        />
      </div>

      <!-- --------------------------------- -->
      <div class="table-concept" v-else>
        <input
          class="table-radio"
          type="radio"
          name="table_radio"
          id="table_radio_0"
          checked="checked"
        />
        <div class="table-display">
             <h6>{{ inputSearch }}: {{ searchList.length }}</h6>
        </div>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>phone number</th>
              <th>adress</th>
              <th>city</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(panels, index) in searchList" :key="index">
              <td>{{ panels.full_name }}</td>
              <td>{{ panels.password }}</td>
              <td>{{ panels.phone_number }}</td>
              <td>{{ panels.address }}</td>
              <td>{{ panels.city }}</td>
              <td>
                {{ panels.createdAt }}
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination
          :goToPage="goToPage"
          :count="count"
          :elementsPerPage="elementsPerPage"
        />
      </div>
      <!-- end  -->
    </div>
  </div>
</template>

<script>
  // import axios from "axios";
  import Swal from "sweetalert2";

  import Pagination from "@/components/pagination/Pagination";
  import NewLoading from "@/components/NewLoading";

  export default {
    components: {
      Pagination: Pagination,
      NewLoading: NewLoading
    },
    computed: {
      token() {
        return this.$store.getters["user/getUserToken"];
      }
    },
    data() {
      return {
        category: [],
        panel: [],
        searchList: [],
        inputSearch: "",
        del: null,

        currentPage: 1,
        elementsPerPage: 15,
        count: 0,
        input: ""
        // ______________________________---
      };
    },
    async fetch() {
      if (this.inputSearch === "") {
        await this.getPanel();
        return;
      }

      await this.SearchProduct();
    },
    methods: {
      async getPanel() {
        let elementsPerPage = this.elementsPerPage;
        const res = await this.$axios.$get(
          `http://95.85.125.197:1101/admin/users?limit=${elementsPerPage}&offset=${(this
            .currentPage -
            1) *
            elementsPerPage}`,
          {
            headers: {
              Authorization: "Bearer " + this.token
            }
          }
        );
        this.count = res.all;
        this.panel = res.data;
        this.count = Number(this.count);

        console.log(res.all);
      },

      //search here
      async SearchProduct() {
        try {
          let elementsPerPage = this.elementsPerPage;
          const res = await this.$axios.$get(
            `http://95.85.125.197:1101/admin/users?limit=${elementsPerPage}&offset=${(this
              .currentPage -
              1) *
              elementsPerPage}&keyword=${this.inputSearch}`,
            {
              headers: {
                Authorization: "Bearer " + this.token
              }
            }
          );
          this.count = res.all;
          this.searchList = res.data;
          this.count = Number(this.count);
          // this.searchList = []
        } catch (e) {}
      },

      //search end

      async categoryFunc() {
        // const token = this.$store.getters["user/getUserToken"];

        const data = await this.$axios.$get("admin/categories/", {
          headers: {
            Authorization: "Bearer " + this.token
          }
        });
        data.forEach(element => {
          this.category.push(element);
        });
        console.log("ineeee", this.category);
      },
      clearSearch() {
        (this.searchList = []), (this.inputSearch = ""), this.getPanel();
      },

      //delete section

      //delete section

      // Paginations
      async goToPage(page) {
        // pagination function
        this.currentPage = page;
        this.getPanel();
      },

      async goTo() {
        let num = Number(this.input);
        if (num && num > 0 && num <= this.count) {
          this.currentPage = num;
          this.getPanel();
        }
      },
       clearShearch() {
        this.inputSearch = "";
      }
    }
  };
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
body {
  margin: 0px;
  padding: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #130f40;
  font-family: "Lato" !important;
}

/* ------------------------------------------------------ */
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700");
body {
  font-family: "Open Sans", sans-serif;
  background-color: #e4e4e4;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.card {
  background-color: #ffffff;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
}

.table-concept {
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.table-concept .table-radio {
  display: none;
}
.table-concept .table-radio:checked + .table-display {
  display: block;
}
.table-concept .table-radio:checked + .table-display + table {
  width: 100%;
  display: table;
}
.table-concept .table-radio:checked + .table-display + table + .pagination {
  display: flex;
}
.table-concept
  .table-radio:checked
  + .table-display
  + table
  + .pagination
  > label.active {
  color: #ffffff;
  background-color: dimgray;
  cursor: default;
}
.table-concept
  .table-radio:checked
  + .table-display
  + table
  + .pagination
  > label.disabled {
  color: #ffffff;
  background-color: #b5b5b5;
  cursor: default;
}
.table-concept .table-display {
  background-color: #e2e2e2;
  text-align: right;
  padding: 10px;
  display: none;
  position: sticky;
  left: 0;
}
.table-concept table {
  background-color: #ffffff;
  font-size: 16px;
  border-collapse: collapse;
  display: none;
}
.table-concept table tr:last-child td {
  border-bottom: 0;
}
.table-concept table tr th,
.table-concept table tr td {
  text-align: left;
  padding: 15px;
  box-sizing: border-box;
}
.table-concept table tr th {
  color: #ffffff;
  font-weight: normal;
  background-color: #8f8f8f;
  border-bottom: solid 2px #d8d8d8;
  position: sticky;
  top: 0;
}
.table-concept table tr td {
  border: solid 1px #d8d8d8;
  border-left: 0;
  border-right: 0;
  white-space: nowrap;
}
.table-concept table tbody tr {
  transition: background-color 150ms ease-out;
}
.table-concept table tbody tr:nth-child(2n) {
  background-color: whitesmoke;
}
.table-concept table tbody tr:hover {
  background-color: #ebebeb;
}
.table-concept .pagination {
  background-color: #8f8f8f;
  width: 100%;
  display: none;
  position: sticky;
  bottom: 0;
  left: 0;
}
.table-concept .pagination > label {
  background-color: #8f8f8f;
  color: #ffffff;
  padding: 10px;
  cursor: pointer;
}
.table-concept .pagination > label:hover {
  background-color: darkgray;
}
.table-concept .pagination > label:active {
  background-color: #767676;
}

.table-title {
  color: #ffffff;
  background-color: #2f2f2f;
  padding: 15px;
}
.table-title h2 {
  margin: 0;
  padding: 0;
}

.button-container {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
}
.button-container span {
  color: #8f8f8f;
  text-align: right;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  margin-right: 10px;
}
.button-container button {
  font-family: inherit;
  font-size: inherit;
  color: #ffffff;
  padding: 10px 15px;
  border: 0;
  margin: 0;
  outline: 0;
  border-radius: 0;
  transition: background-color 225ms ease-out;
}
.button-container button.primary {
  background-color: #147eff;
}
.button-container button.primary:hover {
  background-color: #479aff;
}
.button-container button.primary:active {
  background-color: #0065e0;
}
.button-container button.primary {
  background-color: #147eff;
}
.button-container button.primary:hover {
  background-color: #479aff;
}
.button-container button.primary:active {
  background-color: #0065e0;
}
button.danger {
  background-color: #d11800;
}
button.danger:hover {
  background-color: #ff2205;
}
button.danger:active {
  background-color: #9e1200;
}
button svg {
  fill: #ffffff;
  vertical-align: middle;
  padding: 0;
  margin: 0;
}

/* ---------------------------------------------------------------------------- */
.img {
  width: 40px;
}

/* searching */

body {
  margin: 0;
  padding: 0;
  background-color: #b2e0df;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-container {
  background: #fff;
  height: 30px;
  border-radius: 30px;
  padding: 22px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.8s;
  width: 400px;
   box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin-bottom:20px;
}

/* .search-container:hover > .search-input {
} */

.search-container .search-input {
  /*   background: transparent; */
  border: none;
  outline: none;
  width: 100%;
  font-weight: 500;
  font-size: 16px;
}

.fa-close{
  color:#147eff;
  margin-left:6px;
  cursor: pointer;
}
</style>