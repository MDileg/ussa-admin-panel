<template>
  <div>
    <div class="container">
      <h3>Create Banner <NuxtLink :to="'../banners'"> Banner </NuxtLink></h3>
      <form action="action_page.php" @submit.prevent="submit">
        
        <label for="img" class="uploadLabel">Image</label>
        <input type="file" id="img" @change="onChangeImage"   class="uploadButton" />
       <p>{{imgVal}}</p>

        <input type="submit" value="Create" />
        <h1></h1>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
  export default {
    data() {
      return {
        image_isAdded: null,
        imgVal:null,
      };
    },
    async mounted() {
      // await this.categoryFunc();
    },
    methods: {
      onChangeImage(event) {
        this.image_isAdded = event.target.files[0];
        this.imgVal = 'image successfully upload'
      },
      async submit() {
       
        const formData = new FormData();
        formData.append("photo", this.image_isAdded);
 

        const token = this.$store.getters["user/getUserToken"];

        try {
            await this.$axios.$post(
            "http://95.85.125.197:1101/admin/banners/upload-image/" + this.$route.params.id,
            formData,
            {
              headers: {
                Authorization: "Bearer " + token
              }
            }
          )
             .then(res => {
              this.showAlert({
                type: 'success',
                text: "article successful created!"
              });
            })
            .catch(err => {
              this.showAlert({
                type: 'danger',
                text: "Article error!"
              });
          Swal.fire({
                title: 'image did not change'
            })
            });
            this.$router.push('/banners')
        } catch (err) {}
      },
 
     showAlert(data) {
        this.$nuxt.$emit("alert", data);
      },
 
    },
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
  margin-top:50px;
}
</style>
