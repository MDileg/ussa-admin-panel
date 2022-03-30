<template>
  <div class="containerUssa m-4">
    <div class="headerUssa d-flex">
      <NuxtLink :to="`../order`">
        <img src="@/assets/img/secImg.png" class="img" alt="" />
      </NuxtLink>
      <h3 class="mt-3">USSA</h3>
    </div>

    <div class="contentUssa mt-3">
      <h4>Telefon: +993 65 72 55 42</h4>
    </div>
    <h3 class="text-center">Sargyt No: {{ userId }}</h3>
    <hr />
    <div class="d-flex justify-content-around parag">
      <div>
        <p><b>Ady</b>: {{ userName }}</p>
        <p><b>Telefon nomer</b>: {{ userPhone }}</p>
      </div>
      <div>
        <p><b>Salgy</b>: {{ user_city + ' ' + user_address  }}</p>
        <p><b>Jemi</b>: {{ total_price }} m.</p>
      </div>
    </div>

    <div class="mx-5">
      <table class="table">
        <thead class="">
          <tr>
            <th class="adySec">Ady</th>
            <th>Mukdar</th>
            <th>Kody</th>
            <th>Baha</th>
            <th>Jemi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(panels, index) in order" :key="index">
            <td>{{ panels.name_ru }}</td>
            <td>{{ panels.quantity }}</td>
            <td>{{ panels.code }}</td>
            <td>{{ panels.price }}</td>
            <td>{{ panels.total_price }}</td>
          </tr>
        </tbody>
      </table>
      <h4 class="text-right mr-5">Eltip bermek: {{ total_price-order_price }}TMT</h4>
      <h4 class="text-right mr-5">Jemi: {{ total_price }}TMT</h4>
    </div>
  </div>
</template>

<script>
  import Swal from "sweetalert2";

  export default {
    computed: {
      token() {
        return this.$store.getters["user/getUserToken"];
      }
    },
    layout: "empty",
    data() {
      return {
        getUserDetail: [],
        userPhone: null,
        userId: null,
        userName: null,
        user_city: null,
        user_address:null,
        total_price: null,
        order_price: null,

        order: null,
        status: false,
        countOrder: null,

        name_ru: null
      };
    },
    async mounted() {
      await this.getOrder();
      await this.getOldStatus();
      await this.getUser();
    },
    methods: {
      async getOrder() {
        try {
          const token = this.$store.getters["user/getUserToken"];

          const data = await this.$axios.$get(
            `http://95.85.125.197:1101/admin/orders/order-products/${this.$route.params.id}`,
            {
              headers: {
                Authorization: "Bearer " + token
              }
            }
          );
          this.order = data;
          this.order.forEach(el => {
            this.name_ru = el.name_ru;
           
          });
          // this.countOrder = this.order.length;
        } catch (e) {}
      },

      async getUser() {
        try {
          const token = this.$store.getters["user/getUserToken"];

          const data = await this.$axios.$get(
            `http://95.85.125.197:1101/admin/orders/${this.$route.params.id}`,
            {
              headers: {
                Authorization: "Bearer " + token
              }
            }
          );
          this.getUserDetail.push(data);
          this.getUserDetail.forEach(el => {

                this.userPhone = el.user_phone;
                this.userId = el.id;
                this.userName = el.user_name;
                this.user_city = el.user_city;
                this.total_price = el.total_price;
                this.order_price = el.order_price;
                this.user_address = el.user_address;

                
          })
        } catch (e) {}
      },

      async submit() {
        const statusData = {
          status: this.status
        };

        const token = this.$store.getters["user/getUserToken"];
        try {
          await this.$axios.$post(
            `http://95.85.125.197:1101/admin/orders/change-order-status/${this.$route.params.id}`,
            statusData,
            {
              headers: {
                Authorization: "Bearer " + token
              }
            }
          );

       
        } catch (er) {
          Swal.fire({
            title: "Product not found",
            icon: "warning"
          });
        }
      },

      async getOldStatus() {
        const token = this.$store.getters["user/getUserToken"];

        const res = await this.$axios.$get(
          `http://95.85.125.197:1101/admin/orders/${this.$route.params.id}`,
          {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        );
        this.status = res.status;
      },

      async deleteProduct(a) {
        Swal.fire({
          title: "Are you sure?",
          text: "successfully deleted",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then(result => {
          if (result.isConfirmed) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");

            const data = this.$axios.$delete(
              `http://95.85.125.197:1101/admin/orders/order-products/delete/${a}`,
              {
                headers: {
                  Authorization: "Bearer " + this.token
                }
              }
            );
            this.order = this.order.filter(p => a !== p.uuid);
            this.countOrder -= 1;
          }
        });
      }
      //---------------------------------category--------------------------------
    }
  };
</script>

<style lang="scss" scoped>
/* Style inputs with type="text", select elements and textareas */
input[type="text"],
select,
textarea {
  width: 100%; /* Full width */
  padding: 12px; /* Some padding */
  border: 1px solid #ccc; /* Gray border */
  border-radius: 4px; /* Rounded borders */
  box-sizing: border-box; /* Make sure that padding and width stays in place */
  margin-top: 6px; /* Add a top margin  */
  margin-bottom: 16px; /* Bottom margin */
  resize: vertical; /* Allow the user to vertically resize the textarea (not horizontally) */
}

/* Style the submit button with a specific background color etc */
input[type="submit"] {
  background-color: #04aa6d;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* When moving the mouse over the submit button, add a darker green color */
input[type="submit"]:hover {
  background-color: #45a049;
}

/* Add a background color and some padding around the form */
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  a {
    i {
      font-size: 1.2rem;
    }
  }
}
.backOrder {
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
  a {
    i {
      font-size: 25px;
    }
  }
  h4 {
    text-align: center;
    justify-content: center;
    align-items: center;
  }
}
hr {
  border-top: 1.5px solid rgb(97, 93, 93);
  width: 50%;
  opacity: 0.5;
}
.delText {
  margin-top: 3px;
  font-size: 17px;
}
.subBtn {
  margin-top: 6px;
}
.adySec {
  width: 30%;
}
.img {
  width: 60px;
}
.parag{
    p{
        font-size: 20px;
    }
}
</style>
