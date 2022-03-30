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
        <i
          v-if="inputSearch != ''"
          class="fa fa-close fa-lg"
          @click="clearShearch"
        ></i>
      </div>

      <b-dropdown
        id="ddown1"
        text="Category"
        variant="primary"
        class=" m-2 subDropMain"
        title="Each page should be filter"
      >
        <!-- <button class="buttonPro">
          <span @click="getPanel()" class="pruductsGet">All Products</span>
        </button> -->
        <b-dropdown-item
          class="catDrop musk-text-secondary"
          v-for="(categories, index) in category"
          :key="index"
          @click="getPanel(categories.uuid)"
          >{{ categories.name_tm }}

          <span
            v-if="categories.subcategories.length > 0"
            class="fa fa-chevron-right md pos"
          ></span>
          <span v-else class="fa fa-check"></span>
        </b-dropdown-item>
      </b-dropdown>

      <b-dropdown
        id="ddown1"
        text="Subcategory"
        variant="primary"
        class=" m-2 subDropMain"
        title="Each page should be filter"
        v-if="showSub && sub.length > 0"
      >
        <button class="buttonPro">
          <span @click="getPanel()" class="pruductsGet">All Products</span>
        </button>
        <b-dropdown-item
          class="catDrop musk-text-secondary"
          v-for="(categories, index) in sub"
          :key="index"
          @click="getPanel(categories.uuid)"
        >
          {{ categories.name_tm }}

          <span
            v-if="categories.subcategories.length > 0"
            class="fa fa-chevron-right md pos"
          ></span>
          <span v-else class="fa fa-check"></span>
        </b-dropdown-item>
      </b-dropdown>
      <!-- :style="categories.subcategories.length == 0 ? '' : 'display:none'" -->

      <b-dropdown
        id="ddown1"
        text="sub_in_sub"
        variant="primary"
        class="m-2 subDropMain"
        title="Each page should be filter"
        v-if="showSubs && subs.length > 0"
      >
        <button class="buttonPro">
          <span @click="getPanel()" class="pruductsGet">All Products</span>
        </button>
        <b-dropdown-item
          class="catDrop musk-text-secondary"
          v-for="(categories, index) in subs"
          :key="index"
          @click="getPanel(categories.uuid)"
          >{{ categories.name_tm }}
        </b-dropdown-item>
      </b-dropdown>
    </div>

    <NewLoading v-if="$fetchState.pending" />

    <div class="card" v-else>
      <div class="table-title">
        <h3 v-if="subcategorName_TM != null && showTitle != null">
          {{ subcategorName_TM }}
        </h3>
        <h3 v-else>Product table</h3>
      </div>
      <div class="button-container">
        <span>You can control table from here ></span>

        <NuxtLink :to="'createProduct'">
          <button class="primary" title="create product">
            <svg viewBox="0 0 512 512" width="16" title="plus-circle">
              <path
                d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"
              ></path>
            </svg>
          </button>
        </NuxtLink>
        <NuxtLink :to="'currency'">
          <button class="primary" title="/currency">
            <i class="fa fa-dollar " dark></i>
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
          <h6>All Products: {{ count }}</h6>
        </div>
        <table>
          <thead>
            <tr>
              <th>title</th>
              <th>image</th>
              <th>Stock</th>
              <th>price</th>
              <th>status</th>
              <th>code</th>
              <th>edit</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(panels, index) in panel" :key="index">
              <td>{{ panels.name_tm }}</td>
              <td>
                <img
                  :src="`http://95.85.125.197:1101/${panels.preview_image}`"
                  :alt="panels.name_tm"
                />
              </td>
              <td>{{ panels.stock_quantity }}</td>
              <td>{{ panels.price }}</td>

              <td v-if="panels.isActive === true">active</td>

              <td v-else>non active</td>
              <td>{{ panels.code }}</td>
              <!-- <td><NuxtLink  :to="{name: 'productTable-editAdmin-id', params:{adminRoute: panels.id}}">Edit</NuxtLink></td> -->
              <td>
                <NuxtLink :to="`editProduct/${panels.uuid}`"
                  ><b-button variant="primary">Edit</b-button></NuxtLink
                >
              </td>
              <td>
                <button
                  class="danger"
                  title="Delete Selected"
                  @click="deleteProduct(panels.uuid)"
                >
                  <svg viewBox="0 0 448 512" width="22px" title="trash-alt">
                    <path
                      d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
                    ></path>
                  </svg>
                </button>
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
              <th>title</th>
              <th>image</th>
              <th>Stock</th>
              <th>price</th>
              <th>status</th>
              <th>code</th>
              <th>edit</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(panels, index) in searchList" :key="index">
              <td>{{ panels.name_tm }}</td>
              <td>
                <img
                  :src="`http://95.85.125.197:1101/${panels.preview_image}`"
                  :alt="panels.name_ru"
                />
              </td>
              <td>{{ panels.stock_quantity }}</td>
              <td>{{ panels.price }}</td>
              <td v-if="panels.isActive === true">active</td>

              <td v-else>non active</td>

              <td>{{ panels.code }}</td>
              <td>
                <NuxtLink :to="`editProduct/${panels.uuid}`">
                  <b-btn variant="primary">Edit</b-btn>
                </NuxtLink>
              </td>
              <td>
                <button
                  class="danger"
                  title="Delete Selected"
                  @click="deleteProduct(panels.uuid)"
                >
                  <svg viewBox="0 0 448 512" width="16" title="trash-alt">
                    <path
                      d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
                    ></path>
                  </svg>
                </button>
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

      <!-- -------------------------------------------- -->
    </div>
  </div>
</template>

<script>
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
    //  middleware: "auth",
    data() {
      return {
        valueUUID: null,
        panelLength: null,
        showTitle: null,
        showSub: false,
        showSubs: false,
        subcategorName_TM: null,

        selected_category: null,

        category: [],
        subs: [],
        sub: [],
        panel: [],
        searchList: [],

        filterQuery: [],

        inputSearch: "",
        del: null,
        url: this.$axios.defaults.baseURL,

        currentPage: 1,
        elementsPerPage: 15,
        count: 0,
        input: ""
        // ______________________________---
      };
    },
    async fetch() {
      await this.getPanel();
      return;
    },

    async mounted() {
      await this.categoryFunc();

    },

    methods: {
      //all Product
      async getPanel(a) {
        //filter category
        if (a) {
          this.selected_category = a;
          const resFilter = await this.$axios.$get(
            `http://95.85.125.197:1101/admin/categories/products/${a}?limit=${
              this.elementsPerPage
            }&offset=${(this.currentPage - 1) * this.elementsPerPage}`,
            {
              headers: {
                Authorization: "Bearer " + this.token
              }
            }
          );
          console.log("category: ", resFilter);

          this.panel = [];
          this.filterQuery = resFilter.data;
          this.panel = this.filterQuery;

          this.count = resFilter.all;
          this.count = Number(this.count);

          this.panel.reverse();
          const filterSub = await this.category.find(e => {
            if (e.uuid === a) {
              this.subcategorName_TM = null;
              this.subcategorName_TM = `${e.name_tm} - category`;
              this.sub = [];
              e.subcategories.filter(el => {
                this.sub.push(el);

                if (this.sub != 0) {
                  this.showSub = true;
                }
              });
            }
          });

          const filterSubs = await this.sub.find(e => {
            if (e.uuid === a) {
              this.subcategorName_TM = null;
              this.subcategorName_TM = `${e.name_tm} - sub`;
              this.subs = [];
              e.subcategories.filter(el => {
                this.subs.push(el);

                if (this.subs != 0) {
                  this.showSubs = true;
                }
              });
            }
          });
          this.showTitle = !null;
          return filterSub, filterSubs;
        }
        //search product
        else if (this.inputSearch !== "") {
          this.selected_category = null;
          try {
            const res = await this.$axios.$get(
              `http://95.85.125.197:1101/admin/products?limit=${
                this.elementsPerPage
              }&offset=${(this.currentPage - 1) * this.elementsPerPage}&keyword=${
                this.inputSearch
              }`,
              {
                headers: {
                  Authorization: "Bearer " + this.token
                }
              }
            );
            this.count = res.all;
            this.searchList = res.data;
            this.count = Number(this.count);
            this.searchList.reverse();
          } catch (e) {
            console.log(e, "erorlar");
          }
        }
        //all product
        else {
          this.selected_category = null;
          const res = await this.$axios.$get(
            `http://95.85.125.197:1101/admin/products?limit=${
              this.elementsPerPage
            }&offset=${(this.currentPage - 1) * this.elementsPerPage}`,
            {
              headers: {
                Authorization: "Bearer " + this.token
              }
            }
          );

          console.log("res: ", res);

          this.count = 0;
          this.count = res.all;
          this.panel = res.data;
          this.count = Number(this.count);
        }
      },

      //categories
      async categoryFunc() {
        try {
          const data = await this.$axios.$get(
            "http://95.85.125.197:1101/admin/categories/",
            {
              headers: {
                Authorization: "Bearer " + this.token
              }
            }
          );
          data.forEach(element => {
            this.category.push(element);
          });
          this.category.unshift({
            name_tm: "All products",
            name_ru: "All products",
            subcategories: []
          });
        } catch (er) {}
      },
      //clear product
      clearSearch() {
        (this.searchList = []), (this.inputSearch = ""), this.getPanel();
      },
      //delete section

      async deleteProduct(a) {
        Swal.fire({
          title: "Are you sure?",
          text: "After the delete refresh the page",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then(result => {
          if (result.isConfirmed) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");

            const data = this.$axios.$delete(
              `http://95.85.125.197:1101/admin/products/delete/${a}`,
              {
                headers: {
                  Authorization: "Bearer " + this.token
                }
              }
            );
            this.panel = this.panel.filter(p => a !== p.uuid);
            this.count -= 1;
            this.searchList = this.panel.filter(p => a !== p.uuid);
          }
        });
      },

      //delete section

      // Paginations
      async goToPage(page) {
        // pagination function
        this.currentPage = page;

        this.getPanel(this.selected_category);
      },

      async goTo() {
        let num = Number(this.input);
        if (num && num > 0 && num <= this.count) {
          this.currentPage = num;
          this.getPanel();

          // if(this.panelLength !== panel.length){
          //   this.filter();
          //   return
          // }
          // this.getPanel();
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
/* @import url("https://fonts.googls.com/css?family=Open+Sans:400,400i,700"); */
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
.catDrop {
  &:hover {
    background: #147eff;
    color: white;
  }
}
.buttonPro {
  width: 100%;
  border: none;
  &:hover {
    background: #147eff;
  }
}
.subDropMain {
  border-radius: 30px;
  font-weight: 800;
}
.pruductsGet {
  font-size: 15px !important;
}

/* -----search */

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
  margin: 0 10px 10px 0;
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

/* .search-container:hover {
  animation: hoverShake 0.15s linear 3;
} */
.fa-close {
  color: #147eff;
  margin-left: 6px;
  cursor: pointer;
}
.pruductsGet {
  width: 100%;
  display: inline-block;
}
.pos {
  position: absolute;
  right: 3px;
}
</style>
