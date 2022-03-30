<template>
  <div>
  <loading
			:active.sync="isLoading"
			color="#5f76e8"
			:width="128"
			:height="128"
			:is-full-page="true"
			:loader="'bars'"
		/>

    <div class="container">
      <h3>
        Create new notifications
        <NuxtLink :to="'../natifigation'"> Go notifications</NuxtLink>
      </h3>
      <form action="action_page.php" @submit.prevent="submit">
        <label for="fname1">Name</label>
        <input
          type="text"
          id="fname1"
          placeholder="TM"
          v-model="title_tm"
          required
        />

        <input
          type="text"
          id="fname2"
          placeholder="RU"
          v-model="title_ru"
          required
        />
        <label for="fname1">Text</label>

        <textarea
          id="frame"
          placeholder="Write a text in Turkmen"
          v-model="text_tm"
        ></textarea>

        <textarea
          id="frame"
          placeholder="Write a text in Russain"
          v-model="text_ru"
        ></textarea>

       
        <br />
        <div>
          <label for="country"> you should go notification table for checking </label>
        </div>

        <input type="submit" value="Create" />
      </form>
    </div>
  </div>
</template>

<script>

import Loading from 'vue-loading-overlay';
  import Swal from "sweetalert2";
  export default {
    data() {
      return {
        title_tm: null,
        title_ru: null,
        text_tm: null,
        text_ru: null,
        parentIndex: null,
        categoryId: null,
        image_isAdded: null,
        imgVal: null,

        isLoading: false,
	      fullPage: true,
      };
    },
    
	components: {
		Loading,
	},

    methods: {
      //image add section
      onChangeImage(event) {
        this.image_isAdded = event.target.files[0];
        this.imgVal = "image successfully upload";
      },

      async submit() {
        const formData = new FormData();
        formData.append("photo", this.image_isAdded);
        //data add section
        const data = {
          title_tm: this.title_tm,
          title_ru: this.title_ru,
          text_tm: this.text_tm,
          text_ru: this.text_ru
        };

        //token gives in api
        const token = this.$store.getters["user/getUserToken"];
this.isLoading = true;
        try {
          const response = await this.$axios.$post(
            `http://95.85.125.197:1101/admin/notifications/add`,
            data,
            {
              headers: {
                Authorization: "Bearer " + token
              }
            }
          )
           
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
                title: "server error"
              });
            });
          this.isLoading = false;
          this.$router.push('/natifigation')
        } catch (err) {}
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
