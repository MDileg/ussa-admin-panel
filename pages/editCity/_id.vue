<template>
  <div>
    <div class="container">
         <div>
        <NuxtLink :to="'../city'">
          <i class="fa fa-arrow-left fa-lg mt-4">back</i>
        </NuxtLink>
      </div>
      <br>
      <h3>Edit city</h3>
      <form action="action_page.php" @submit.prevent="submit">
        <label for="fname1">TM</label>
        <input type="text" id="fname1" placeholder="TM" v-model="name_tm" />

        <label for="fname2">RU</label>
        <input type="text" id="fname2" placeholder="RU" v-model="name_ru" />
 
           <label for="fname3">Delivery price</label>
        <input type="text" id="fname3" placeholder="Delivery price" v-model="delivery_price" required />
      
        <br />
        
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
        name_tm: null,
        name_ru: null,
        delivery_price:null,
       
        categoryId: null,
        category: [],
        oldProduct: []
      };
    },
   
    async mounted() {
    //   await this.catogoryFunc();
      await this.productGetid();
    },
    methods: {
      onChangeImage(event) {
        this.image = event.target.files[0];
      },
      async submit() {
        // collect the data
        // request to api
        // do something after request result
        const formData = new FormData();
        formData.append("photo", this.image);

        const data = {
          name_ru: this.name_ru,
          name_tm: this.name_tm,
          description_tm: this.description_tm,
          description_ru: this.description_ru,
          delivery_price: this.delivery_price,
          price: this.price,
          categoryId: this.categoryId
        };

        console.log('this isa ', data);

        const token = this.$store.getters["user/getUserToken"];

        try {
          const response = await this.$axios.$patch(
            `http://95.85.125.197:1101/admin/cities/edit/${this.$route.params.id}`,
            data,
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
               title: 'Server error'
             })
            });
           this.$router.push('../city')
 
        } catch (err) {}
      },
      async productGetid() {
        const token = this.$store.getters["user/getUserToken"];

        const data = await this.$axios.$get(
          `http://95.85.125.197:1101/admin/cities/${this.$route.params.id}`,
          {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        );
        this.name_tm = data.name_tm,
        this.name_ru = data.name_ru,
        this.description_tm = data.description_tm,
        this.description_ru = data.description_ru,
        this.price = data.price,
        this.delivery_price = data.delivery_price
        this.categoryId = data.categoryId,
        console.log("this is: ", this.oldProduct);
      },
      //---------------------------------category--------------------------------
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

