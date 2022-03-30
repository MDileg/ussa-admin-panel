<template>
  <div>
    <b-dropdown
      id="ddown1"
      text="Status Orders"
      variant="primary"
      class=" m-2 subDropMain"
    >
      <button class="buttonPro">
        <span @click="getPanel()" class="pruductsGet">All Orders </span>
      </button>
      <button class="buttonPro">
        <span @click="getDel()" class="pruductsGet">Delivered Orders</span>
      </button>
      <button class="buttonPro">
        <span @click="getPen()" class="pruductsGet">Pending Orders</span>
      </button>
    </b-dropdown>

    <NewLoading v-if="$fetchState.pending" />

    <div class="card" v-else>
      <div class="table-title">
        <h2>Table users order</h2>
      </div>
      <div class="button-container">
        <span>You can control table from here ></span>

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

        <div class="table-display">
          <h6>Orders {{ panel.length }}</h6>
        </div>
        <table>
          <thead>
            <tr>
              <th>user name</th>
              <th>user phone</th>
              <th>user address</th>
              <th>User note</th>
              <th>Total price</th>
              <th>status</th>
              <th>edit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(panels, index) in panel" :key="index">
              <td>
                {{ panels.user_name }}
                <span
                  class="countProduct"
                  v-if="panels.num_of_prod != null && panels.num_of_prod != 0"
                  >{{ panels.num_of_prod }}</span
                >
              </td>
              <td>{{ panels.user_phone }}</td>
              <td>{{ panels.user_address }}</td>
              <td>{{ panels.note }}</td>
              <td>{{ panels.total_price }}</td>
              <td v-if="panels.status === true">delivered</td>
              <td v-else>pending</td>
              <td>
                <NuxtLink :to="`orderProduct/${panels.uuid}`">
                  <b-btn variant="primary">Order product</b-btn>
                </NuxtLink>
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
  import NewLoading from "@/components/NewLoading";

  import axios from "axios";

  export default {
    computed: {
      token() {
        return this.$store.getters["user/getUserToken"];
      }
    },
    data() {
      return {
        category: [],
        panel: [],

        getDelPanel: [],
        getPenPanel: [],

        searchedInput: [],
        inputSearch: "",
        del: null,
        userProductOrder: 0
      };
    },
    components: {
      NewLoading: NewLoading
    },
    async fetch() {
      if (this.getDelPanel !== [] && this.getPenPanel === []) {
        await this.getDel();
        return;
      }
      if (this.getDelPanel === [] && this.getPenPanel !== []) {
        await this.getPen();
        return;
      }

      if (this.getDelPanel === [] && this.getDelPanel === []) {
        await this.getPanel();
        return;
      }
      await this.getPanel();
 
    },
    methods: {
      async getPanel() {
        const { data } = await axios.get(
          `http://95.85.125.197:1101/admin/orders`,
          {
            headers: {
              Authorization: "Bearer " + this.token
            }
          }
        );
        this.panel = [];
        this.getDelPanel = [];
        this.getPenPanel = [];
        data.forEach(pan => {
          this.panel.push(pan);
        
        });
      },

      async getDel() {
        const { data } = await axios.get(
          `http://95.85.125.197:1101/admin/orders`,
          {
            headers: {
              Authorization: "Bearer " + this.token
            }
          }
        );
        this.getDelPanel = [];
        data.forEach(pan => {
          if (pan.status) {
            this.getPenPanel = [];
            this.getDelPanel.push(pan);
            this.panel = [];
            this.panel = this.getDelPanel;

            
          }
        });
      },

      async getPen() {
        const { data } = await axios.get(
          `http://95.85.125.197:1101/admin/orders`,
          {
            headers: {
              Authorization: "Bearer " + this.token
            }
          }
        );
        this.getPenPanel = [];
        data.forEach(pan => {
          if (!pan.status) {
            this.getDelPanel = [];
            this.getPenPanel.push(pan);
            this.panel = [];
            this.panel = this.getPenPanel;
 
          }
        });
      },

      async orderUser(a) {
        const data = await this.$axios.$get(
          `http://95.85.125.197:1101/admin/orders/order-products/${a}`,
          {
            headers: {
              Authorization: "Bearer " + this.token
            }
          }
        );

        this.userProductOrder = data.length;
  
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
.countProduct {
  background-color: #64768d;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  height: 18px;
  width: 18px;
  font-size: 12px;
  line-height: 18px;
  position: relative;
  top: -4px;
  right: -3px;
  font-family: Lato, sans-serif;
  padding: 2px 4px;
}
.buttonPro {
  width: 100%;
  border: none;
  span {
    font-weight: 600;
    font-size: 15px;
  }
  &:hover {
    background: #147eff;
  }
}
</style>