<template>
  <div>
    <NewLoading v-if="$fetchState.pending" />

    <div class="container" v-else>
      <h3>Terms <i class="fa fa-info-circle"></i></h3>
      <form action="action_page.php" @submit.prevent="submit">
  <label for="fname1">Terms</label>
        <textarea type="text" id="fname1" placeholder="TM" v-model="text_tm" required />

        <textarea type="text" id="fname1" placeholder="RU" v-model="text_ru" required />

         



        <input type="submit" value="Create" />
      </form>
    </div>
  </div>
</template>

<script>
  import NewLoading from "@/components/NewLoading";

  export default {
    components: {
      NewLoading: NewLoading
    },
    data() {
      return {
        text_tm: null,
        text_ru: null
      };
    },
    async fetch() {
      await this.getOldCur();
    },
    methods: {
      async submit() {
        const data = {
          text_tm: this.text_tm,
          text_ru: this.text_ru
        };

        try {
          const token = this.$store.getters["user/getUserToken"];
          const response = await this.$axios
            .$patch(`http://95.85.125.197:1101/admin/terms/edit/`, data, {
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
                title: "Something go wrong"
              });
            });
        } catch (err) {}
      },

      async getOldCur() {
        const token = this.$store.getters["user/getUserToken"];

        const data = await this.$axios.$get(
          `http://95.85.125.197:1101/admin/terms/`,
          {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        );
      

        this.text_tm = data.text_tm;
        this.text_ru = data.text_ru;
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
  resize: vertical; /* Allow the user to vertically
  resize the textarea (not horizontally) */
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
textarea {
  height: 300px;
}
</style>
