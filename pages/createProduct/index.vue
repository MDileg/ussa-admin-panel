<template>
  <div>
    <div class="container">
      <h5>Create product in subcategory</h5>
      <form action="action_page.php" @submit.prevent="submit">
        <label for="fname1">Name</label>
        <input
          type="text"
          id="fname1"
          placeholder="TM"
          v-model="name_tm"
          required
        />

        <input
          type="text"
          id="fname2"
          placeholder="RU"
          v-model="name_ru"
          required
        />
 
        <br />
     
        <br />
        <label for="lname">Bought price</label>
        <input
          type="text"
          id="lname"
          placeholder=" Bought Price"
          v-model="bought_price"
          required
        />

        <br />

        <label for="lname">Discount amount</label>
        <input
          type="text"
          id="lname"
          placeholder="Discount amount"
          v-model="discount_amount"
          required
        />

        <br />
        <label for="lname">Percentage</label>
        <input
          type="text"
          id="lname"
          placeholder="Percentage"
          v-model="percentage"
          required
        />
        <br />
        <label for="lnames">Stock quantity</label>
        <input
          type="text"
          id="lnames"
          placeholder="stock quantity"
          v-model="stock_quantity"
          required
        />
        <br/>
   <label for="lname">Product code</label>
        <input
          type="text"
          id="lname"
          placeholder="Product code"
          v-model="code"
          required
        />
        <br />

         <label for="lname">Product tags</label>
        <input
          type="text"
          id="lname"
          placeholder="Product tags"
          v-model="tags"
          required
        />
        <br />


        <label for="lname">Is popular</label>
        <input
          type="checkbox"
          id="lname"
          placeholder="Price"
          v-model="isPopular"
        />

        <br />
        <label for="rad">Product active</label>
        <input
          type="checkbox"
          id="rad"
          value="Active Products"
          v-model="isActive"
        />
        <br />
        <label for="rad">Dollar price</label>
        <input
          type="checkbox"
          id="rad"
          value="Active Products"
          v-model="is_dollar_dependent"
        />
        <br />
        <br />
        <div>
          <label for="country" class="subTit"
            >Add product in category
          </label>

          <select name="" v-model="categoryId">
            <option
              v-for="(item, index) in category"
              :key="index"
              :value="item.id"
              :style="item.subcategories.length == 0 ? '' : 'display:none;'"
            >
              <span>{{ item.name_ru }}</span>
              <!-- <span v-else>b</span> -->
            </option>
          </select>
        </div>


        <div>
          <label for="country" class="subTit"
            >Add product in subcategory
          </label>

          <select name="" v-model="categoryId">
            <option
              v-for="(item, index) in newCategory"
              :key="index"
              :value="item.id"
              :style="item.subcategories.length == 0 ? '' : 'display:none;'"
            >
              <span>{{ item.name_ru }}</span>
              <!-- <span v-else>b</span> -->
            </option>
          </select>
        </div>

        <br />
        <div>
          <label for="country" class="subTit">Add product in sub-in-sub </label>

          <select name="" v-model="categoryId">
            <option
              v-for="(item, index) in newCategory2"
              :key="index"
              :value="item.id"
              >{{ item.name_tm }}</option
            >
          </select>
        </div>

 
        <label for="img" class="uploadLabel">Image</label>
        <input
           type="file"
          id="img"
          ref="file"
          @change="onChangeImage"
          class="uploadButton"
          multiple
         
 
        />

<div class="form-group">
                <draggable
                  v-model="imageSrcs"
                  v-bind="dragOptions"
                  @start="drag = true"
                  @end="drag = false"
                >
                  <transition-group
                    class="list-group"
                    type="transition"
                    :name="!drag ? 'flip-list' : null"
                  >

                    <div
                      class="list-group-item"
                      style="cursor: move"
                      v-for="src in imageSrcs"
                      :key="src"
                    >
                      
                      <img class="list-img"  :src="src" @click="deleteImg(src)" />
                    </div>
                  </transition-group>
                </draggable>
              </div>

 

     

        <p>{{ imgVal }}</p>
        <br />
        <label for="subject" style="margin-top:40px;">Content</label>
        <textarea
          id="subject"
          name="Content"
          placeholder="TM"
          style="height:200px"
          v-model="description_tm"
        ></textarea>
        <textarea
          id="subject"
          name="Content"
          placeholder="RU"
          style="height:200px"
          v-model="description_ru"
        ></textarea>
        <p>You have to fill all gaps</p>
        <input type="submit" value="Create" />
      </form>
    </div>
  </div>
</template>

<script>
  import swal from "sweetalert2";

  export default {
    computed: {
       dragOptions() {
        return {
          animation: 300,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
        };
      }
    },
    data() {
      return {

        imageSrcs: [],
        images: [],

        newCategory: [],
        category: [],
        sub: [],
        subcategory: [],
        newCategory2: [],

        categoryId: null,
        parentId: null,

        imgVal: null,

        name_tm: null,
        name_ru: null,
        description_tm: null,
        description_ru: null,

        stock_quantity: null,
        isActive: null,

        image_isAdded: null,
        price: null,
        discount_amount: null,
        given_price: null,
        bought_price: null,
        code:null,
        isPopular: false,
        percentage: null,
        is_dollar_dependent:null,
 
        isLoading: true,
        tags: null,
        drag: false,
        url: this.$axios.defaults.baseURL,
        id: this.$route.params.id,

      };
    },
    async mounted() {
      await this.categoryFunc();
    },
    methods: {
     async onChangeImage(event) {
        const files = event.target.files;
        for (let img of files) {
          let reader = new FileReader();

          reader.onload = e => {
            this.images.push(img);
            this.imageSrcs.push(e.target.result);
          
          };
          await reader.readAsDataURL(img);
        }

        this.imgVal = "images successfully upload and limit 5";
      },

       deleteImg(image) {
        swal
          .fire({
            title: "Are you sure?",
            text: "After the delete refresh the page",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          })
          .then(result => {
            if (result.isConfirmed) {
              this.imageSrcs = this.imageSrcs.filter(el => el != image);
              Swal.fire("Deleted!", "Your image has been deleted.", "success");
            }
          });
      },

      async submit() {
         const formData = new FormData();
        for (let i = 0; i < Math.max(this.images.length, 5); i++) {
          formData.append("photo" + i, this.images[i]);
        }

        const data = {
          name_ru: this.name_ru,
          name_tm: this.name_tm,
          description_tm: this.description_tm,
          description_ru: this.description_ru,
          discounted_price: this.discounted_price,
          stock_quantity: this.stock_quantity,
          isActive: this.isActive,

          price: this.price,
          discount_amount: this.discount_amount,
          given_price: this.given_price,
          percentage: this.percentage,
          bought_price: this.bought_price,
          isPopular: this.isPopular,
          code: this.code,
    
          categoryId: this.categoryId,
          parentId: this.parentId,
          is_dollar_dependent: this.is_dollar_dependent,
          tags: this.tags,
        };

        const token = this.$store.getters["user/getUserToken"];

        try {
          const response = await this.$axios.$post(
            `http://95.85.125.197:1101/admin/products/add`,
            data,
            {
              headers: {
                Authorization: "Bearer " + token
              }
            }
          );
      
          await this.$axios
            .$post(
              "http://95.85.125.197:1101/admin/products/upload-image/" +
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
          this.$router.push("/");
        } catch (err) {}

        this.name_ru = "";
        this.name_tm = "";
        this.description_tm = "";
        this.description_ru = "";
        this.categoryId = " ";
        this.discounted_price = "";
        this.stock_quantity = "";
        this.isActive = "";
        this.isDiscounted = "";

        this.price = "";
        this.discount_amount = "";
        this.given_price = "";
        this.percentage = "";
        this.bought_price = "";
        this.isPopular = "";
        this.code = "";
        this.is_dollar_dependent = "";
        this.tags = ''
      },
      //---------------------------------category--------------------------------

      async categoryFunc() {
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

        for (let aman of this.category) {
          aman.subcategories.forEach(el => {
            this.newCategory.push(el);
          });
        }

        for (let aman of this.newCategory) {
          aman.subcategories.forEach(el => {
            this.newCategory2.push(el);
          });
        }
   
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
input[type="number"] {
  width: 80%; /* Full width */
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
label {
  font-weight: 700;
}
.subTit {
  font-size: 19px;
}


.images {
  width: 50px;
  display: flex;

  img {
    margin-right: 20px;
    width: 200px;
    height: 200px;
  }
}














form {
  // margin-bottom: 15px;
  .add-contact-input {
    margin-left: 10px;
    padding: 7px;
  }
  button {
    padding: 7px 14px;
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 0.2rem;
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }
}

.add-contact {
  cursor: pointer;
  margin: 0 0 0px 10px;
}

.tag {
  padding: 7px 20px 7px 25px;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  align-items: center;
  background-color: #fff;
  color: #000;
  background-color: rgba(200, 200, 200, 0.4);
  &:hover {
    background-color: rgba(200, 200, 200, 0.8);
  }
}

.contact {
  margin-right: 10px;
  span {
    position: relative;
    padding-right: 12px;
    i {
      position: absolute;
      right: -14px;
      color: red;
      cursor: pointer;
      font-size: 12px;
    }
  }
}

.pointer {
  cursor: pointer;
}

label {
  font-weight: bold;
}

.list-group {
  flex-direction: row;
  justify-content: center;
  width: 100%;
  min-height: 20px;
  transition: all;
  flex-wrap: wrap;
  .list-group-item {
    width: 300px;
    height: 300px;
    margin: 10px;
    position: relative;
    object-fit: contain;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.125);
    cursor: move;
    img {
      width: 100%;
      height: 90%;
      object-fit: cover;
      margin-top: 1.2rem;
    }
    .x-button {
      color: red;
      position: absolute;
      padding-right: 10px;
      padding-left: 10px;
      cursor: pointer;
      font-size: 20px;
      top: 0;
      right: 0;
      z-index: 123;
      transition: all 0.2s ease-in-out;
      &:hover {
        color: #fff;
        background-color: red;
      }
    }
  }
}
</style>
