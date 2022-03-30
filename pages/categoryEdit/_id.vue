<template>
  <div>
    <NewLoading v-if="$fetchState.pending" />

    <div class="container" v-else>
      <div>
        <NuxtLink :to="'../category'">
          <i class="fa fa-arrow-left fa-lg mt-4">back</i>
        </NuxtLink>
      </div>
      <br>
      <h3>Edit category of {{ name_ru }}</h3>
      <form action="action_page.php" @submit.prevent="submit">
        <label for="fname1">Title</label>
        <input type="text" id="fname1" placeholder="TM" v-model="name_tm" />

        <input type="text" id="fname2" placeholder="RU" v-model="name_ru" />

        <br />

       

   <label for="img" class="uploadLabel">Image</label>
        <input type="file" id="img" @change="onChangeImage"   class="uploadButton" />
       <p>{{imgVal}}</p>

        <br />
        <label for="subject" style="margin-top:40px;">Content</label>

        <input type="submit" value="Create" />
        <h1></h1>
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
        name_tm: null,
        name_ru: null,
        
        imgVal:null,
        image_isAdded: null,
        categoryId: null,
        category: [],
        oldProduct: []
      };
    },
    async fetch() {
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
          name_ru: this.name_ru,
          name_tm: this.name_tm,
          categoryId: this.categoryId,
        };

 

        const token = this.$store.getters["user/getUserToken"];

        try {
          const response = await this.$axios.$patch(
            `http://95.85.125.197:1101/admin/categories/edit/${this.$route.params.id}`,
            data,
            {
              headers: {
                Authorization: "Bearer " + token
              }
            }
          );
                        this.$router.push('/category')
 
          await this.$axios
            .$post(
              "http://95.85.125.197:1101/admin/categories/upload-image/" +
                this.$route.params.id,
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
                type: 'success',
                text: "article successful created!"
              });
            Swal.fire({
                title: 'Something was wrong or you did not add image, but you can add empty banner'
            })
            });
                        this.$router.push('/category')

        } catch (err) {}
      },
           showAlert(data) {
        this.$nuxt.$emit("alert", data);
      },
      async productGetid() {
        const token = this.$store.getters["user/getUserToken"];

        const data = await this.$axios.$get(
          `http://95.85.125.197:1101/admin/categories/${this.$route.params.id}`,
          {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        );
          (this.name_tm = data.name_tm),
          (this.name_ru = data.name_ru),
          (this.categoryId = data.categoryId)
      
   
      },
      //---------------------------------category--------------------------------

      async catogoryFunc() {
        const token = this.$store.getters["user/getUserToken"];

        const data = await this.$axios.$get(
          "http://95.85.125.197:1101/admin/categories/",
          {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        );
        data.forEach(element => {
          this.category.push(element);
        });
        console.log("ineeee", this.category);
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
  margin-top: 100px;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>

