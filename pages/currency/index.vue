<template>
  <div>
    <NewLoading v-if="$fetchState.pending" />

    <div class="container" v-else>
      <h3>
        Currency <i class="fa fa-dollar"></i>
        <NuxtLink :to="'/'"> Product Table</NuxtLink>
      </h3>
      <form action="action_page.php" @submit.prevent="submit">
        <label for="fname1">Currency</label>
        <input
          type="text"
          id="fname1"
          placeholder="currency"
          v-model="currency_value"
          required
        />

        <input type="submit" value="Create" />
      </form>
    </div>
  </div>
</template>

<script>
  import NewLoading from "@/components/NewLoading";
  import Swal from "sweetalert2";

  export default {
    components: {
      NewLoading: NewLoading
    },
    data() {
      return {
        currency_value: null
      };
    },
    async fetch() {
      await this.getOldCur();
    },
    methods: {
      async submit() {
        const data = {
          currency_value: this.currency_value
        };

        try {
          const token = this.$store.getters["user/getUserToken"];
          const response = await this.$axios
            .$patch(`http://95.85.125.197:1101/admin/constants/edit/`, data, {
              headers: {
                Authorization: "Bearer " + token
              }
            })

            .then(res => {
              this.showAlert({
                type: "success",
                text: "article successful created!"
              });
            })
            .catch(err => {
              this.showAlert({
                type: "danger",
                text: "Article error!"
              });
              Swal.fire({
                title: "Server error sorry"
              });
            });
            this.$router.push('/')
        } catch (err) {}
      },

      async getOldCur() {
        const token = this.$store.getters["user/getUserToken"];

        const data = await this.$axios.$get(
          `http://95.85.125.197:1101/admin/constants/`,
          {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        );
       

        this.currency_value = data.currency_value;
      },

      showAlert(data) {
        this.$nuxt.$emit("alert", data);
      }
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
}
</style>
