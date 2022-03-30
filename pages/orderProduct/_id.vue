<template>
  <div>
    <div class="container backOrder">
      <NuxtLink :to="'../order'">
        <i class="fa fa-arrow-left fa-lg mt-4">back</i>
      </NuxtLink>

      <h4>Amount of order: {{ countOrder }}</h4>

      <form @submit.prevent="submit" class="subBtn">
        <label for="del" class="delText">DELIVERED</label>
        <input id="del" type="checkbox" v-model="status" class="inputDel" />

        <input type="submit" value="submit" />
        <NuxtLink :to="`../print/${this.$route.params.id}`">
          <button class="btn btn-primary">
            <i class="fa fa-print"></i> Print
          </button></NuxtLink
        >
      </form>
    </div>
    <hr />
    <div class="row align-items-center container2">
      <div
        class="col-md      mr-2  "
        v-for="(orders, index) in order"
        :key="index"
      >
        <div class="col mb-4 ">
          <h5>
            product: <span style="font-weight:300;">{{ orders.name_tm }}</span>
          </h5>
          <h5>
            product: <span style="font-weight:300;">{{ orders.name_ru }}</span>
          </h5>
          <h5>
            DescriptionTM:
            <span style="font-weight:300;">{{ orders.description_tm }}</span>
          </h5>
          <h5>
            DescriptionRU:
            <span style="font-weight:300;">{{ orders.description_ru }}</span>
          </h5>
          <h5>
            Quantity:
            <span style="font-weight:300;">{{ orders.quantity }}</span>
          </h5>
          <h5>
            Product price:
            <span style="font-weight:300;">{{ orders.price }}</span>
          </h5>
          <h5>
            Total price:
            <span style="font-weight:300;">{{ orders.total_price }}</span>
          </h5>
        </div>

        <button
          class="danger mb-3"
          title="Delete Selected"
          @click="deleteProduct(orders.uuid)"
        >
          <svg viewBox="0 0 448 512" width="16" title="trash-alt">
            <path
              d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
            ></path>
          </svg>
        </button>
      </div>
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
        order: null,
        status: false,
        countOrder: null
      };
    },
    async mounted() {
      await this.getOrder();
    
      await this.getOldStatus();
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
          this.countOrder = this.order.length;
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

          console.log("ineee", this.status);
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
.container2 {
   margin-left: 5%;
}
</style>
