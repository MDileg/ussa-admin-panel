<template>
  <div>
    <div class="container">
               <div>
        <NuxtLink :to="'../natifigation'">
          <i class="fa fa-arrow-left fa-lg">back</i>
        </NuxtLink>
      </div>
      <br>
      <h3>Edit -  {{title_ru}} </h3>
      <form action="action_page.php" @submit.prevent="submit">
        <label for="fname1">Title</label>
        <input type="text" id="fname1" placeholder="TM" v-model="title_tm" />

        <input type="text" id="fname2" placeholder="RU" v-model="title_ru" />

      
        <br />
   

        <label for="subject" style="margin-top:40px;">Content</label>
        <textarea
          id="subject"
          name="Content"
          placeholder="TM"
          style="height:200px"
          v-model="text_tm"
        ></textarea>
        <textarea
          id="subject"
          name="Content"
          placeholder="RU"
          style="height:200px"
          v-model="text_ru"
        ></textarea>
     <label for="img" class="uploadLabel">Image</label>
        <input type="file" id="img" @change="onChangeImage"   class="uploadButton" />
       <p>{{imgVal}}</p>
        <br />
        <input type="submit" value="Create" />
      </form>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
  export default {
    data() {
      return {
        title_tm: null,
        title_ru: null,
        text_tm: null,
        text_ru: null,
        image_isAdded: null,
        categoryId: null,
        imgVal: null,
        category: [],
        oldProduct: []
      };
    },
    async mounted() {
      await this.catogoryFunc();
      await this.productGetid();
    },
    methods: {
      onChangeImage(event) {
        this.image_isAdded = event.target.files[0];
        this.imgVal = 'image successfully upload'
      },
      async submit() {
    
        const formData = new FormData();
        formData.append("photo", this.image_isAdded);

        const data = {
          title_ru: this.title_ru,
          title_tm: this.title_tm,
          text_tm: this.text_tm,
          text_ru: this.text_ru,
        
        };

   

        const token = this.$store.getters["user/getUserToken"];

        try {
          const response = await this.$axios.$patch(
            `http://95.85.125.197:1101/admin/notifications/edit/${this.$route.params.id}`,
            data,
            {
              headers: {
                Authorization: "Bearer " + token
              }
            }
          );
 
            this.$router.push('../natifigation')

          await this.$axios.$post(
            "http://95.85.125.197:1101/admin/notifications/upload-image/" +
              response.uuid,
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
                 text: "article successful created! wait a just a second!"
              });
            })
            .catch(err => {
              this.showAlert({
                type: 'success',
                text: "Article error! or forget image"
              });
             
            });
        } catch (err) {}
      },
      async productGetid() {
        const token = this.$store.getters["user/getUserToken"];

        const data = await this.$axios.$get(
          `http://95.85.125.197:1101/admin/notifications/${this.$route.params.id}`,
          {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        );
        this.title_tm = data.title_tm,
        this.title_ru = data.title_ru,
        this.text_tm = data.text_tm,
        this.text_ru = data.text_ru,
       
        this.image_isAdded = data.image_isAdded,
        this.categoryId = data.categoryId
      
      },
      //---------------------------------category--------------------------------

      async catogoryFunc() {
        const token = this.$store.getters["user/getUserToken"];

        const data = await this.$axios.$get(
          "http://95.85.125.197:1101/admin/notifications/",
          {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        );
        data.forEach(element => {
          this.category.push(element);
        });
       
      },
      showAlert(data) {
        this.$nuxt.$emit("alert", data);
      },
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
  margin-top: 6px; /* Add a top margin */
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
  margin-top: 150px;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>

