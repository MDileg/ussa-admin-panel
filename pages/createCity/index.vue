<template>
  <div>
    <div class="container">
      <h3>Create new city <NuxtLink :to="'city'"> Go city</NuxtLink></h3>
      <form action="action_page.php" @submit.prevent="submit">
        <label for="fname1">Name</label>
        <input type="text" id="fname1" placeholder="TM" v-model="name_tm" required />
        <input type="text" id="fname2" placeholder="RU" v-model="name_ru" required />
         
        
        <br>
           <label for="fname3">Delivery price</label>
        <input type="text" id="fname3" placeholder="Delivery price" v-model="delivery_price" required />
      
        <div>
          <label for="country"> you should go city table for checking </label>
        </div>
     <input type="submit" value="Create"  />
       
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name_tm: null,
        name_ru: null,
        delivery_price:null,
        category: [],
        subcategory: [],
        parentIndex: null,
        categoryId: null
      };
    },
    
    methods: {
      onChangeImage(event) {
        this.image = event.target.files[0];
      },
      async submit() {
        
        const formData = new FormData();
        formData.append("photo", this.image);

        const data = {
          name_ru: this.name_ru,
          name_tm: this.name_tm,
          delivery_price: this.delivery_price,
          parentId: this.parentIndex
        };
 

        const token = this.$store.getters["user/getUserToken"];

        try {
          const response = await this.$axios.$post(
            `http://95.85.125.197:1101/admin/cities/add`,
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
              alert('server error')
            });
            this.name_ru = ''
            this.name_tm = ''
            
     
  this.$router.push('/city')
      
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
}
</style>
