<template>
	<div>
		<!-- <NewLoading v-if="$fetchState.pending" /> -->
		<loading
			:active.sync="isLoading"
			color="#5f76e8"
			:width="128"
			:height="128"
			:is-full-page="true"
			:loader="'bars'"
		/>

		<div>
			<!-- ------------------------Category-------------------------- -->
			<div class="container">
				<h3>Create Category</h3>
				<form action="action_page.php" @submit.prevent="submit">
					<label for="fname1">Name</label>
					<input
						type="text"
						id="fname1"
						placeholder="TM"
						v-model="name_tm"
						required
					/>

					<!-- <label for="fname2">Name</label> -->
					<input
						type="text"
						id="fname2"
						placeholder="RU"
						v-model="name_ru"
						required
					/>

					<label for="img" class="uploadLabel">Image</label>
					<input
						type="file"
						id="img"
						@change="onChangeImage"
						class="uploadButton"
					/>
					<p>{{ imgVal }}</p>
					<br />

					<input type="submit" value="Create" />
				</form>
			</div>
			<br />
			<br />
			<br />
			<div class="container">
				<h5>Add subcategory in category</h5>
				<form action="action_page.php" @submit.prevent="submitSub">
					<label for="fname1">Name</label>
					<input
						type="text"
						id="fname1"
						placeholder="TM"
						v-model="name_tmSub"
						required
					/>

					<input
						type="text"
						id="fname2"
						placeholder="RU"
						v-model="name_ruSub"
						required
					/>

					<br />
					<div>
						<label for="country"
							>Choose category for create subcategory
						</label>
						<div>
							<div>
								<div>
									<select name="" id="" v-model="parentId">
										<option
											:value="item.id"
											v-for="(item, index) in categorySub"
											:key="index"
										>
											{{ item.name_ru }}
										</option>
									</select>
								</div>
							</div>
						</div>
					</div>

					<input type="submit" value="Create" />
					<h1></h1>
				</form>
			</div>
			<!-- ------------------------subcategory-------------------------- -->

			<br />
			<br />
			<br />

			<!-- ------------------------sub_in_sub-------------------------- -->

			<div class="container">
				<h5>
					Add sub_in_sub in subcategory
					<NuxtLink :to="'createProduct'"> Create product</NuxtLink>
				</h5>
				<form action="action_page.php" @submit.prevent="submitSibIn">
					<label for="fname1">Name</label>
					<input
						type="text"
						id="fname1"
						placeholder="TM"
						v-model="name_tmSubIn"
						required
					/>

					<input
						type="text"
						id="fname2"
						placeholder="RU"
						v-model="name_ruSubIn"
						required
					/>

					<br />
					<div>
						<label for="country"
							>Choose subcategory for create sub_in_sub
						</label>
						<div>
							<div>
								<div>
									<select name="" id="" v-model="parentIdSub">
										<option
											:value="item.id"
											v-for="(item, index) in newCategory"
											:key="index"
										>
											{{ item.name_ru }}
										</option>
									</select>
								</div>
							</div>
						</div>
					</div>

					<input type="submit" value="Create" />
					<h1></h1>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
// import NewLoading from '@/components/NewLoading';
import Swal from 'sweetalert2';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
	components: {
		// NewLoading: NewLoading,
		Loading,
	},
	// middleware: "nonauth",
	data() {
		return {
			//category
			name_tm: null,
			name_ru: null,
			imgVal: null,
			image_isAdded: null,

			//subcategory

			name_tmSub: null,
			name_ruSub: null,
			parentId: null,
			categorySub: [],

			//sub_in_sub

			name_tmSubIn: null,
			name_ruSubIn: null,
			parentIdSub: null,

			
			category: [],
			subcategory: [],
			categoryId: null,
			newCategory: [],

			isLoading: false,
			fullPage: true,
		};
	},
	async fetch() {
		await this.categoryFunc();
	},
	async mounted() {
		await this.categoryFuncSub();
		await this.categoryFuncSubIn();
	},
	methods: {
		onChangeImage(event) {
			this.image_isAdded = event.target.files[0];
			this.imgVal = 'image successfully upload';
		},

		//===================================category create=======================================//
		async submit() {
			const formData = new FormData();
			formData.append('photo', this.image_isAdded);

			const data = {
				name_ru: this.name_ru,
				name_tm: this.name_tm,
			};

			const token = this.$store.getters['user/getUserToken'];

			this.isLoading = true;

			try {
				const response = await this.$axios.$post(
					`http://95.85.125.197:1101/admin/categories/add/`,
					data,
					{
						headers: {
							Authorization: 'Bearer ' + token,
						},
					}
				);
			 
				const dataId = response.uuid;

				await this.$axios
					.$post(
						'http://95.85.125.197:1101/admin/categories/upload-image/' +
							dataId,
						formData,
						{
							headers: {
								Authorization: 'Bearer ' + token,
							},
						}
					)
					.then((res) => {
						this.showAlert({
							type: 'success',
							text: 'article successful created!',
						});
					})
					.catch((err) => {
						this.showAlert({
							type: 'danger',
							text: 'Article error!',
						});
						Swal.fire({
							title: 'server error',
						});
					});
				// this.window.location.reload();
				this.isLoading = false;
				this.$router.push('/category');
			} catch (err) {}
		},

		//==========================================================================//
		//===================================create subcategory=======================================//
		async submitSub() {
			const dataSub = {
				name_ru: this.name_ruSub,
				name_tm: this.name_tmSub,
				parentId: this.parentId,
			};

			const token = this.$store.getters['user/getUserToken'];
					this.isLoading = true;

			try {
				const response = await this.$axios
					.$post(
						`http://95.85.125.197:1101/admin/categories/add/`,
						dataSub,
						{
							headers: {
								Authorization: 'Bearer ' + token,
							},
						}
					)
					.then((res) => {
						this.showAlert({
							type: 'success',
							text: 'article successful created!',
						});
					})
					.catch((err) => {
						this.showAlert({
							type: 'danger',
							text: 'Article error!',
						});
						Swal.fire({
							title: 'server error',
						});
					});

				 
						this.isLoading = false;
				this.$router.push('/category');
			} catch (err) {}
		},

		async categoryFuncSub() {
			const token = this.$store.getters['user/getUserToken'];

			const data = await this.$axios.$get(
				'http://95.85.125.197:1101/admin/categories/',
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			);

			data.forEach((element) => {
				this.categorySub.push(element);
			});
		},

		//==========================================================================//

		//====================================SUbINSub=========================================

		async submitSibIn() {
			const data = {
				name_ru: this.name_ruSubIn,
				name_tm: this.name_tmSubIn,
				parentId: this.parentIdSub,
			};

			const token = this.$store.getters['user/getUserToken'];
			this.isLoading = true;

			try {
				const response = await this.$axios
					.$post(`http://95.85.125.197:1101/admin/categories/add/`, data, {
						headers: {
							Authorization: 'Bearer ' + token,
						},
					})
						.then((res) => {
						this.showAlert({
							type: 'success',
							text: 'article successful created!',
						});
					})
					.catch((err) => {
						this.showAlert({
							type: 'danger',
							text: 'Article error!',
						});
						Swal.fire({
							title: 'server error',
						});
					});
			 
	 
						this.isLoading = false;
						this.$router.push('/category');
			 } catch (err) {}
		},
	

		async categoryFuncSubIn() {
			const token = this.$store.getters['user/getUserToken'];

			const data = await this.$axios.$get(
				'http://95.85.125.197:1101/admin/categories/',
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			);

			data.forEach((element) => {
				this.category.push(element);
			});

			for (let aman of this.category) {
				aman.subcategories.forEach((el) => {
					this.newCategory.push(el);
				});
			}
		},

		//==============================================================================

		//---------------------------------category--------------------------------

		showAlert(data) {
			this.$nuxt.$emit('alert', data);
		},
	},
};
</script>

<style lang="scss" scoped>
/* Style inputs with type="text", select elements and textareas */
input[type='text'],
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
input[type='submit'] {
	background-color: #04aa6d;
	color: white;
	padding: 12px 20px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

/* When moving the mouse over the submit button, add a darker green color */
input[type='submit']:hover {
	background-color: #45a049;
}

/* Add a background color and some padding around the form */
.container {
	border-radius: 5px;
	background-color: #f2f2f2;
	padding: 20px;
}
</style>
