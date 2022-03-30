<template>
  <div>
    <NewLoading v-if="$fetchState.pending" />

    <div class="card" v-else>
      <div class="table-title">
        <h2>{{ name_tm }}</h2>
      </div>
      <div class="button-container">
        <span>You can control table from here ></span>

        <NuxtLink :to="'createCategory'">
          <button class="primary" title="Create new category">
            <svg viewBox="0 0 512 512" width="16" title="plus-circle">
              <path
                d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"
              ></path>
            </svg>
          </button>
        </NuxtLink>
        <NuxtLink :to="'updateAccount'">
          <button class="primary" title="Add New Data">
            <i class="fa fa-user fa-lg " dark></i>
          </button>
        </NuxtLink>
      </div>

      <div class="table-concept" v-if="inputSearch === ''">
        <input
          class="table-radio"
          type="radio"
          name="table_radio"
          id="table_radio_0"
          checked="checked"
        />
        <div class="table-display"></div>
        <table class="table table-hover" id="myTable">
          <thead>
            <tr>
              <th>title</th>
              <th>Subcategory</th>

              <th>edit</th>
              <th>delete</th>
              <th>sort</th>
            </tr>
          </thead>

          <draggable
            :options="{ animation: 200, handle: '.my-handle' }"
            :element="'tbody'"
            v-model="subcategory"
            @change="onChangeCategory"
          >
            <tr
              v-for="(panels, index) in subcategory"
              :key="index"
              id="1"
              :value="subcategory.indexOf(panels)"
            >
              <td class="index">
                <div>
                  {{ panels.name_tm }}
                </div>
              </td>
              <td>
                <button
                  v-if="panels.subcategories && panels.subcategories.length"
                  class="btn btn-primary"
                  @click="goPage(panels.uuid)"
                >
                  sub
                </button>
              </td>
              <td>
                <NuxtLink :to="`/editSubs/${panels.uuid}`">
                  <b-button class="d-sm-down-none" variant="primary"
                    >Edit</b-button
                  ></NuxtLink
                >
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

              <td><i class="fa fa-arrows my-handle"></i></td>
            </tr>
          </draggable>
        </table>
      </div>

      <!-- --------------------------------- -->

      <!-- end  -->
    </div>
  </div>
</template>

<script>
  import draggable from "vuedraggable";
  import NewLoading from "@/components/NewLoading";
  import Swal from "sweetalert2";
  export default {
    components: {
      draggable,
      NewLoading: NewLoading
    },
    computed: {
      token() {
        return this.$store.getters["user/getUserToken"];
      }
    },
    data() {
      return {
        name_tm: null,
        subcategory: [],
        category: [],
        subCat: [],
        subInSub: [],
        panel: [],
        searchedInput: [],
        inputSearch: "",
        del: null,
        categoryNew: [],

        indexCategory: null
      };
    },
    async fetch() {
      await this.categoryFunc();
    },
    methods: {
      async categoryFunc() {
        // const token = this.$store.getters["user/getUserToken"];

        const data = await this.$axios.$get(
          "http://95.85.125.197:1101/admin/categories/",
          {
            headers: {
              Authorization: "Bearer " + this.token
            }
          }
        );

        data.filter(el =>
          this.$route.params.id === el.uuid ? (this.name_tm = el.name_tm) : ""
        );

        // Structureing data start
        let all_cats = [];

        const push_cats = c => {
          if (c.subcategories && c.subcategories.length) {
            all_cats = [...all_cats, ...c.subcategories];

            for (let cc of c.subcategories) {
              if (cc.subcategories && cc.subcategories.length) {
                push_cats(cc);
              }
            }
          }
          return;
        };
        push_cats({ subcategories: data });

        // Structureing data end

        const cat = all_cats.find(e => e.uuid == this.$route.params.id);
        console.log(all_cats);

        const result = all_cats.filter(e => cat.id == e.parentId);
        result.sort((a, b) => {
          return a.order_number - b.order_number;
        });

        this.subcategory = result;

        console.log(this.subcategory);
      },
      clearSearch() {
        (this.searchedInput = []), (this.inputSearch = ""), this.getPanel();
      },

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
              `http://95.85.125.197:1101/admin/categories/delete/${a}`,
              {
                headers: {
                  Authorization: "Bearer " + this.token
                }
              }
            );

            this.subcategory = this.subcategory.filter(p => a !== p.uuid);
          }
        });
      },
      drop() {
        const dropArrow = document.querySelector(".subInSub");
        dropArrow.classList.toggle("activeDrop");
      },

      onChangeCategory() {
        const data = this.subcategory.map((e, i) => ({
          id: e.uuid,
          order: i
        }));
        console.log("index");
        this.$axios.$patch(
          "http://95.85.125.197:1101/admin/categories/order",
          data,
          {
            headers: {
              Authorization: "Bearer " + this.token
            }
          }
        );
      },

      goPage(id) {
        this.$router.push("/category/" + id);
      }
    },

    mounted() {
      this.categoryNew = this.category;
    }
  };
</script>

<style lang="scss" scoped>
.my-handle:hover {
  cursor: move;
}
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
.search-box {
  width: fit-content;
  height: fit-content;
  position: relative;
}
.input-search {
  height: 50px;
  width: 50px;
  border-style: none;
  padding: 10px;
  font-size: 18px;
  letter-spacing: 2px;
  outline: none;
  border-radius: 25px;
  transition: all 0.5s ease-in-out;
  background-color: #22a6b3;
  padding-right: 40px;
  color: white;
}
.input-search::placeholder {
  color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
  letter-spacing: 2px;
  font-weight: 100;
}
.btn-search {
  width: 50px;
  height: 50px;
  border-style: none;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  right: 0px;
  color: #ffffff;
  background-color: transparent;
  pointer-events: painted;
}
.btn-search:focus ~ .input-search {
  width: 300px;
  border-radius: 10px;
  background-color: rgb(46, 44, 44);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
}
.input-search:focus {
  width: 300px;
  border-radius: 0px;
  background-color: black;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
}

/* ------------------------------------------------------ */
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
/* table{
  position: relative;
   z-index:-2;
} */
.table-concept {
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: auto;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
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
.button-container button.danger {
  background-color: #d11800;
}
.button-container button.danger:hover {
  background-color: #ff2205;
}
.button-container button.danger:active {
  background-color: #9e1200;
}
.button-container button svg {
  fill: #ffffff;
  vertical-align: middle;
  padding: 0;
  margin: 0;
}

/* ---------------------------------------------------------------------------- */
.img {
  width: 100px !important;
  height: 100px !important;
}
.drop {
  width: 100%;
  a {
    font-size: 15px;
    padding: 2px 2px;
    width: 100%;
    font-weight: 500;
    &:hover {
      text-decoration: none;
      /* background: red; */
    }
  }
  i {
    color: rgb(43, 37, 37);
    font-size: 15px;
  }
}
.backDrop {
  div {
    /* overflow: scroll; */
    display: flex;

    margin: 0;
    width: 100%;
    /* background-color: black; */
    a {
      display: block;
      margin-top: -20px;
      &:hover {
        color: black;
      }
    }
  }
}
.dropsDown {
  position: relative;
  z-index: 4;
  /* overflow: scroll; */
  width: 100%;
  height: 100%;
}

.flexOver {
  display: flex;
}

.dropDiv {
  position: relative;
  z-index: 5;
  .subInSub {
    display: none; //here
  }
  .activeDrop {
    display: block;
  }
  .dropInDrop {
    /* border: 1px solid black;
  padding: 3px 5px; */
    padding-right: 10px;
    margin-left: 5px;
    &:hover {
      color: rgb(21, 170, 170);
    }
  }
  .fa-th-list:hover .ulDrop {
    display: block;
  }
  .ulDrop {
    background: white;
    letter-spacing: 0.4px;
    line-height: 28px;
    display: none; //here
    padding-bottom: 10x;
    border-radius: 10px;
    a {
      text-decoration: none;
      color: black;
      font-size: 13px;
      &:hover {
        color: rgb(50, 177, 177);
      }
    }

    li {
      /* padding: 10px 10px 0 5px ; */
      text-decoration: none;
      list-style: none;
      font-weight: 600;
    }
  }
}
</style>