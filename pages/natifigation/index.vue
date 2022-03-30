<template>
  <div>
    <NewLoading v-if="$fetchState.pending" />

    <div class="card" v-else>
      <div class="table-title">
        <h2>Table notifications</h2>
      </div>
      <div class="button-container">
        <span>You can add notifications in here ></span>

        <NuxtLink :to="'createNat'">
          <button class="primary" title="Add New Data">
            <svg viewBox="0 0 512 512" width="16" title="plus-circle">
              <path
                d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"
              ></path>
            </svg>
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
        <div class="table-display">

                          <h6>Natifigation: {{panel.length}}</h6>
        </div>
        <table>
          <thead>
            <tr>
              <th>title</th>
              <th>text</th>
              <th>image</th>
              <th>edit</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(panels, index) in panel" :key="index">
             
              <td>{{ panels.title_tm }}</td>
              <td>{{ panels.text_tm }}</td>
              <td>
                <img :src="`http://95.85.125.197:1101/./public/notifications/big/${panels.uuid}.webp`" alt="">
              </td>
          
              <td>
                <NuxtLink :to="`editNat/${panels.uuid}`"><b-btn variant="primary">Edit</b-btn></NuxtLink>
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
    
      </div>

      <!-- --------------------------------- -->
      <div class="table-concept" v-else>
      
      </div>
      <!-- end  -->
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import Swal from "sweetalert2";
  import NewLoading from "@/components/NewLoading";

  export default {
    components: {
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
        searchedInput: [],
        inputSearch: "",
        del: null
      };
    },
    async fetch() {
      await this.getPanel();
    
    },
    methods: {
      async getPanel() {
        const { data } = await axios.get(
          `http://95.85.125.197:1101/admin/notifications/`,
          {
            headers: {
              Authorization: "Bearer " + this.token
            }
          }
        );
        data.forEach(pan => {
          this.panel.push(pan);
        });
       
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
              `http://95.85.125.197:1101/admin/notifications/delete/${a}`,
              {
                headers: {
                  Authorization: "Bearer " + this.token
                }
              }
            );
            this.panel = this.panel.filter(p=> a !== p.uuid)
          }
        });
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
  width: 40px;
}
</style>