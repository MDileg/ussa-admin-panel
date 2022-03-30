<template>
  <div class="animated fadeIn">
    <!-- ************* Loading ************* -->

    <!-- ************* Edit Post ************* -->
    <b-row class="d-felx justify-content-center">
      <b-col sm="12" md="8">
        <b-card>
          <b-card-body>
            <b-form>
              <!-- ************* Images ************* -->
              <div class="form-group" v-if="showImages">
                <draggable
                  v-model="post.images"
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
                      v-for="image in post.images"
                      :key="image"
                    >
                      <div class="x-button" @click="deleteImg(image)">
                        <i class="fa fa-times"></i>
                      </div>
                      <img class="list-img" :src="url + image" alt="" />
                    </div>
                  </transition-group>
                </draggable>
              </div>
              <!-- ************* Add Image ************* -->
              <div class="form-group d-flex">
                <hr />
                <label for="name" class="col-3">Add image</label>
                <b-col sm="9" md="9" class="px-1">
                  <b-form-file
                    ref="fileInput"
                    class="mt-3"
                    @change="onFileChange"
                    plain
                    multiple
                  ></b-form-file>
                  <!-- ************* Add Image Button ************* -->
                  <b-button
                    @click.prevent="addImage"
                    variant="outline-primary"
                    class="mt-3"
                  >
                    <i class="fa fa-upload"></i>
                    Add Image
                  </b-button>
                </b-col>
              </div>
              <hr />
              <div class=" mb-2">
                <label for="name" class="mr-3 bold">Name_TM</label>
                <b-form-input
                  placeholder="TM"
                  v-model="post.name_tm"
                  class="w-100"
                  id="name"
                ></b-form-input>
              </div>
              <div class=" mb-2">
                <label for="name" class="mr-3">Name_RU:</label>
                <b-form-input
                  placeholder="RU"
                  v-model="post.name_ru"
                  class="mb-2"
                ></b-form-input>
              </div>

              <div class=" mb-2">
                <label for="name" class="mr-3">Bought price: </label>
                <b-form-input
                  placeholder="Bought price"
                  v-model="post.bought_price"
                  class="mb-2"
                ></b-form-input>
              </div>

              <div class=" mb-2">
                <label for="name" class="mr-3">Discount amount</label>
                <b-form-input
                  placeholder="Discount amount"
                  v-model="post.discount_amount"
                  class="mb-2"
                ></b-form-input>
              </div>

              <div class=" mb-2">
                <label for="name" class="mr-3">Percentage: </label>
                <b-form-input
                  placeholder="Percentage"
                  v-model="post.percentage"
                  class="mb-2"
                ></b-form-input>
              </div>
               <div class=" mb-2">
                <label for="name" class="mr-3">Product code: </label>
                <b-form-input
                  placeholder="Code"
                  v-model="post.code"
                  class="mb-2"
                ></b-form-input>
              </div>

             <div class=" mb-2">
                <label for="name" class="mr-3">Product tags: </label>
                <b-form-input
                  placeholder="Tags"
                  v-model="post.tags"
                  class="mb-2"
                ></b-form-input>
              </div>

              <div class=" mb-2">
                <label for="name" class="mr-3">Stock quantity</label>
                <b-form-input
                  placeholder="Stock quantity"
                  v-model="post.stock_quantity"
                  class="mb-2"
                ></b-form-input>
              </div>
              <b-row>
                <b-col sm="2">
                  <label for="textarea-small">Discription TM:</label>
                </b-col>
                <b-col sm="10">
                  <b-form-textarea
                    class="mb-2"
                    id="textarea-small"
                    size="sm"
                    placeholder="Tm"
                    v-model="post.description_tm"
                  ></b-form-textarea>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="2">
                  <label for="textarea-small">Discription RU:</label>
                </b-col>
                <b-col sm="10">
                  <b-form-textarea
                    id="textarea-small"
                    size="sm"
                    placeholder="RU"
                    v-model="post.description_ru"
                  ></b-form-textarea>
                </b-col>
              </b-row>
              <div class="d-flex mt-4">
                <b-form-checkbox class="mr-2" v-model="post.isActive"
                  >Active</b-form-checkbox
                >
                <b-form-checkbox class="mr-2" v-model="post.isPopular"
                  >Popular</b-form-checkbox
                >
                <b-form-checkbox v-model="post.is_dollar_dependent"
                  >Dollars</b-form-checkbox
                >
              </div>

              <div class="mt-3">
                <label for="country" class="subTit"
                  >Add product in category
                </label>

                <select name="" v-model="post.categoryId">
                  <option
                    v-for="(item, index) in category"
                    :key="index"
                    :value="item.id"
                    :style="
                      item.subcategories.length == 0 ? '' : 'display:none;'
                    "
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
                <select name="" v-model="post.categoryId">
                  <option
                    v-for="(item, index) in subcategory"
                    :key="index"
                    :value="item.id"
                    >{{ item.name_tm }}</option
                  >
                </select>
              </div>

              <div>
                <label for="country" class="subTit"
                  >Add product in sub-in-sub</label
                >
                <select name="" v-model="post.categoryId">
                  <option
                    v-for="(item, index) in subinSub"
                    :key="index"
                    :value="item.id"
                    >{{ item.name_tm }}</option
                  >
                </select>
              </div>

              <div class="form-action mt-5">
                <div class="text-center">
                  <b-button variant="outline-primary" @click.prevent="submit"
                    ><i class="fa fa-star"></i>&nbsp; Submit</b-button
                  >
                </div>
              </div>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import draggable from "vuedraggable";

  export default {
    components: {
      draggable
    },
    computed: {
      token() {
        return this.$store.getters["user/getUserToken"];
      },

      currentUser() {
        return this.$store.getters["user/getCurrentUser"];
      },

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
        category: [],
        subcategory: [],
        subinSub: [],

        showImages: false,
        isLoading: true,

        url: this.$axios.defaults.baseURL,
        id: this.$route.params.id,

        post: {
          categoryId: null,
          description_tm: null,
          description_ru: null,
          name_tm: null,
          name_ru: null,
          price: 0,
          bought_price: null,
          given_price: null,
          stock_quantity: null,
          discount_amount: null,
          code:null,
          percentage: null,
          isActive: null,
          isPopular: null,
          is_dollar_dependent: null,
          images: [],
          tags: null,
        },

        files: [],
        images: [],
        imageSrcs: [],

          drag: false
      };
    },

    async mounted() {
      let id = this.$route.params.id;
      let token = this.$store.getters["user/getUserToken"];

      try {
        let product = await this.$axios.$get(
          `http://95.85.125.197:1101/admin/products/${id}`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );

        this.post = product;

        this.showImages = true;
      } catch (err) {
        console.log(err);
      }

      await this.catogoryFunc();
    },

    methods: {
      onFileChange(event) {
        const files = event.target.files;

        this.images = files;
      },

      async addImage() {
        if (this.images) {
          console.log(this.images);

          this.isLoading = true;
          let formData = new FormData();

          for (let i = 0; i < this.post.images.length; i++) {
            formData.append("images", this.post.images[i]);
          }

          for (
            let i = 0;
            i < Math.min(5 - this.post.images.length, this.images.length);
            i++
          ) {
            formData.append("image" + i, this.images[i]);
          }

          await this.$axios({
            method: "post",
            url: `http://95.85.125.197:1101/admin/products/upload-image/${this.id}`,
            data: formData,
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "multipart/form-data"
            }
          })
            .then(res => {
              console.log(res);
              this.post.images = res.data.product.images;
            })
            .catch(err => {
              alert("Server Error");
            });
        }
      },

      async deleteImg(image) {
        if (confirm("Cyndanam suraty pozjakmy?")) {
          await this.$axios({
            method: "post",
            url: `http://95.85.125.197:1101/admin/products/upload-image/${this.id}`,
            headers: { Authorization: "Bearer " + this.token },
            data: {
              images: this.post.images.filter(e => e !== image)
            }
          })
            .then(res => {
              this.post.images = res.data.product.images;
            })
            .catch(err => {
              console.log(err.res);
            });
        }
      },
      async submit() {
        const data = {
          name_ru: this.post.name_ru,
          name_tm: this.post.name_tm,
          price: this.post.price,
          bought_price: this.post.bought_price,
          given_price: this.post.given_price,
          discount_amount: this.post.discount_amount,
          stock_quantity: this.post.stock_quantity,
          code: this.post.code,
          percentage: this.post.percentage,
          isPopular: this.post.isPopular,
          isActive: this.post.isActive,
          is_dollar_dependent: this.post.is_dollar_dependent,
          description_tm: this.post.description_tm,
          description_ru: this.post.description_ru,
          categoryId: this.post.categoryId,
          tags:this.post.tags


        };

        const token = this.$store.getters["user/getUserToken"];

        try {
          const response = await this.$axios.$patch(
            `http://95.85.125.197:1101/admin/products/edit/${this.$route.params.id}`,
            data,
            {
              headers: {
                Authorization: "Bearer " + token
              }
            }
          );
          this.$router
            .push("/")
            .then(res => {
              this.showAlert({
                type: "success",
                text: "article successful created!"
              });
            })
            .catch(err => {
              this.showAlert({
                type: "success",
                text: "article successful created! image didn't changed"
              });
            });
        } catch (err) {}
      },
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

        for (let aman of this.category) {
          aman.subcategories.forEach(el => {
            this.subcategory.push(el);
          });
        }

        for (let aman of this.subcategory) {
          aman.subcategories.forEach(el => {
            this.subinSub.push(el);
          });
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
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
</style>
