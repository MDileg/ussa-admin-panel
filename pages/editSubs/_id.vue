<template>
  <div class="backBtn">
    <!--  -->
    <NewLoading v-if="$fetchState.pending" />

    <div class="container" v-else>
      <div>
        <NuxtLink :to="'../category'">
          <i class="fa fa-arrow-left fa-lg mt-4">back</i>
        </NuxtLink>
      </div>
      <br />
      <h3>Sub/SubInSub {{ name_ru }}</h3>
      <form action="action_page.php" @submit.prevent="submit">
        <label for="fname1">Title</label>
        <input type="text" id="fname1" placeholder="TM" v-model="name_tm" />


        <input type="text" id="fname2" placeholder="RU" v-model="name_ru" />
<div  class="subDel">
        <input type="submit" value="Create" />
        <div class="deleteBtn">
          <!-- <p>Can't delete if inside has product,try agian</p> -->
          <button
            class="danger"
            title="Delete Selected"
            @click="deleteProduct(uuid)"
          >
            <svg viewBox="0 0 448 512" width="25px" title="trash-alt">
              <path
                d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
              ></path>
            </svg>
          </button>
        </div>

</div>
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
    layout: "empty",
    data() {
      return {
        name_tm: null,
        name_ru: null,
        uuid: null,
        category: [],
        oldProduct: []
      };
    },
    async fetch() {
      await this.catogoryFunc();
      await this.productGetid();
    },
    methods: {
      async submit() {
        const data = {
          name_ru: this.name_ru,
          name_tm: this.name_tm
        };
 

        const token = this.$store.getters["user/getUserToken"];

        try {
          const response = await this.$axios
            .$patch(
              `http://95.85.125.197:1101/admin/categories/edit/${this.$route.params.id}`,
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
                title: "impossible to delete, inside has product...!"
              });
            });

          this.$router.push("/");
        } catch (err) {}
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
          (this.uuid = data.uuid);
 
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
    
      },
      showAlert(data) {
        this.$nuxt.$emit("alert", data);
      },
      async deleteProduct(a) {
        const token = this.$store.getters["user/getUserToken"];

        try {
          Swal.fire({
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
                const data = this.$axios.$delete(
                  `http://95.85.125.197:1101/admin/categories/delete/${a}`,
                  {
                    headers: {
                      Authorization: "Bearer " + token
                    }
                  }
                );
                Swal.fire(
                  "Deleted!",
                  "Your file has been deleted. wait just a second",
                  "success"
                );

                this.uuid = this.uuid.filter(p => a != p);
              }
            })
            .catch(er => {
              Swal.fire({
                title: "Pleace check it,if not deleted, there is a product inside"
              });
            });
        } catch (er) {
          
        }
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
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
.subDel{
  display: flex;
  justify-content: space-between;
}

.container {
  margin-top: 150px;
}
</style>

