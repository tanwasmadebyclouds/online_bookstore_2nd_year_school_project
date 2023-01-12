<template>
  <div class="container is-widescreen" style="margin-top: 8%">
    <div class="columns mt-1">

      <div class="column is-2">
        <div class="box p-1  is-size-5 has-text-centered" style="background-color:#e4e4e4">
          <router-link style="color:black" :to="`my-account-admin`">ข้อมูลส่วนตัว</router-link>
        </div>
        <div class="box p-1 mt-5  is-size-5 has-text-centered" style="background-color:#e4e4e4">
            <router-link style="color:black" :to="`all-order`">ตรวจสอบคำสั่งซื้อ</router-link>
        </div>
        <div class="box p-1 mt-5  is-size-5 has-text-centered" style="background-color:#e4e4e4">
          <router-link style="color:black" :to="`update-book`">เพิ่ม-ลด หนังสือ</router-link>
        </div>
        <div class="box p-1 mt-5  is-size-5 has-text-centered" style="background-color:#e4e4e4">
          <router-link style="color:black" :to="`update-code-promotion`">เพิ่ม-ลด โค้ดส่วนลด</router-link>
        </div>
      </div> 

      <div class="column is-0"></div>

      <div class="box column is-size-9 pt-5 mt-3 is-10" style="background-color:#F2F2F2">
        <div class="has-text-centered">หนังสือทั้งหมด</div>

        <!-- ตาราง -->
        <div class="table-container has-text-centered">
          <table class="table mt-5 is-fullwidth table is-hoverable" style="border-style: solid">
            <thead style="background-color:#CDBE78">
              <tr class="is-size-6">
                <th>รูป<th>
                <th>book_id</th>
                <th>ชื่อหนังสือ</th>
                <th>ราคา</th>
                <th>จำนวนสินค้าในคลัง</th>
                <th>จำนวนยอดขาย</th>
                <th></th>
              </tr>
            </thead>
            <tbody >
              <tr v-for="(book, index) in books" :key="book.book_id">
                <td colspan="2">
                      <figure class="image ">
                        <img  :src="imagePath(book.image_url)" style="height: 180px; width:90px;" alt="Placeholder image"/>
                      </figure>
                </td>
                <td ><br><br>{{book.book_id}}</td>
                <td><br><br>{{book.book_name}}</td>
                <td><br><br>{{book.price}}</td>
                <td><br><br>{{book.quantity}}</td>
                <td><br><br>{{book.book_sales}}</td>
                <button class="button is-primary mt-6" @click="editBook(book, index)">Edit</button>
              </tr>
            </tbody>
          </table>
        </div>
        <button class="button mt-6 mb-6 is-rounded is-success" @click="showAddBook = true;">เพิ่มหนังสือ</button>
      </div>

      <div class="column is-2">
        <div class="card mt-5">
          <header class="card-header has-background-primary">
            <p class="card-header-title">Sort</p>
            <p class="card-header-icon">
              <span class="card-header-icon icon">
                <i class="fas fa-filter"></i>
              </span>
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="control">
                <label class="radio">
                  <input type="radio" v-model="sortOption" value="sort_book_id" @change="sortBook()"  />
                  Sort book_id
                </label>
              </div>
              <div class="control">
                <label class="radio">
                  <input type="radio" v-model="sortOption" value="sort_name" @change="sortBook()" />
                  Sort name
                </label>
              </div>
              <div class="control">
                <label class="radio">
                  <input type="radio" v-model="sortOption" value="sort_price" @change="sortBook()" />
                  Sort price
                </label>
              </div>
              <div class="control">
                <label class="radio">
                  <input type="radio" v-model="sortOption" value="sort_quantity" @change="sortBook()" />
                  Sort quantity
                </label>
              </div>
              <div class="control">
                <label class="radio">
                  <input type="radio" v-model="sortOption" value="sort_book_sales" @change="sortBook()" />
                  Sort book sales
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>


    <div class="modal" :class="{'is-active':showEdit}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit</p>
        </header>
        <section class="modal-card-body">

          <input
              class="mb-5"
              multiple
              type="file"
              accept="image/png, image/jpeg, image/webp"
              @change="selectImage"
            />

            <div v-if="image" class="columns is-multiline">
              <div class="column is-5">
                <div class="card">
                  <div class="card-image">
                    <figure class="image is-4by5">
                      <img :src="showSelectImage()" alt="Placeholder image"/>
                    </figure>
                  </div>
                  <footer class="card-footer">
                    <a @click="deleteSelectImage()" class="card-footer-item has-text-danger">Delete</a>
                  </footer>
                </div>
              </div>
            </div>


            <div class="column is-10">
                <div class="control">
                  <label class="label">ชื่อหนังสือ</label>
                 <input  class="input" type="text" v-model="$v.book_name.$model" :class="{'is-danger': $v.book_name.$error}"/>
                </div>
                <template v-if="$v.book_name.$error">
                  <p class="help is-danger" v-if="!$v.book_name.required">This field is required</p>
                  <p class="help is-danger" v-if="!$v.book_name.alphaNum">Invalid Book Name</p>
                </template>
            </div>
            <!-- <div class="column is-10">
                <div class="control">
                  <label class="label">Book Type</label>
                  <input v-model="book_type" class="input" type="text" />
                </div>
            </div> -->
            <div class="column is-10">
                <div class="control">
                  <label class="label">ราคา</label>
                  <input  class="input" type="text" v-model="$v.book_price.$model" :class="{'is-danger': $v.book_price.$error}"/>
                </div>
                <template v-if="$v.book_price.$error">
                  <p class="help is-danger" v-if="!$v.book_price.required">This field is required</p>
                  <p class="help is-danger" v-if="!$v.book_price.numeric">Invalid Book Price</p>
                </template>
            </div>
            <div class="column is-4">
              <div class="control">
                <label class="label">จำนวนสินค้าในคลัง</label>
                <div class="columns ml-1 mt-1">
                  <button class="button" @click="discount_num_book()">-</button>
                  <input  class="input" type="text" v-model="$v.book_quantity.$model" :class="{'is-danger': $v.book_quantity.$error}"/>
                   <button class="button" @click="addcount_num_book()">+</button>
                  <template v-if="$v.book_quantity.$error">
                  <p class="help is-danger" v-if="!$v.book_quantity.required">This field is required</p>
                  <p class="help is-danger" v-if="!$v.book_quantity.numeric">Invalid Book Quantity</p>
                </template>
                </div>
              </div>
            </div>
            <div class="column is-10">
                <div class="control">
                   <label class="label">เรื่องย่อ</label>
                   <textarea class="textarea" type="text" v-model="$v.detail_book.$model" :class="{'is-danger': $v.detail_book.$error}"></textarea>
                </div>
                <template v-if="$v.detail_book.$error">
                  <p class="help is-danger" v-if="!$v.detail_book.required">This field is required</p>
                </template>
            </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="saveBookEdit()">Save changes</button>
          <button class="button"  @click="showEdit = false; image=null;">Cancel</button>
        </footer>
      </div>
    </div>




    <div class="modal" :class="{'is-active':showAddBook}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">เพิ่มหนังสือ</p>
        </header>
        <section class="modal-card-body">
            <input
              class="mb-5"
              multiple
              type="file"
              accept="image/png, image/jpeg, image/webp"
              @change="selectImage"
            />

            <div v-if="image" class="columns is-multiline">
              <div class="column is-5">
                <div class="card">
                  <div class="card-image">
                    <figure class="image is-4by5">
                      <img :src="showSelectImage()" alt="Placeholder image"/>
                    </figure>
                  </div>
                  <footer class="card-footer">
                    <a @click="deleteSelectImage()" class="card-footer-item has-text-danger">Delete</a>
                  </footer>
                </div>
              </div>
            </div>
            <p class="help is-danger" v-if="!$v.image.required">This field is required</p>

            <div class="column is-10">
                <div class="control">
                   <label class="label">ชื่อหนังสือ</label>
                 <input  class="input" type="text" v-model="$v.book_name_add.$model" :class="{'is-danger': $v.book_name_add.$error}"/>
                </div>
                <template v-if="$v.book_name_add.$error">
                  <p class="help is-danger" v-if="!$v.book_name_add.required">This field is required</p>
                  <p class="help is-danger" v-if="!$v.book_name_add.alphaNum">Invalid Book Name</p>
                </template>
            </div>
            <!-- <div class="column is-10">
                <div class="control">
                   <label class="label">Book Type</label>
                  <input v-model="book_type_add" class="input" type="text" />
                </div>
            </div> -->
            <div class="column is-10">
                <div class="control">
                   <label class="label">ราคา</label>
                   <input  class="input" type="text" v-model="$v.book_price_add.$model" :class="{'is-danger': $v.book_price_add.$error}"/>
                </div>
                <template v-if="$v.book_price_add.$error">
                  <p class="help is-danger" v-if="!$v.book_price_add.required">This field is required</p>
                  <p class="help is-danger" v-if="!$v.book_price_add.numeric">Invalid Book Price</p>
                </template>
            </div>
            <div class="column is-10">
                <div class="control">
                   <label class="label">จำนวนสินค้าในคลัง</label>
                  <input  class="input" type="text" v-model="$v.book_quantity_add.$model" :class="{'is-danger': $v.book_quantity_add.$error}"/>
                </div>
                <template v-if="$v.book_quantity_add.$error">
                  <p class="help is-danger" v-if="!$v.book_quantity_add.required">This field is required</p>
                  <p class="help is-danger" v-if="!$v.book_quantity_add.numeric">Invalid Book Quantity</p>
                </template>
            </div>
            <div class="column is-10">
                <div class="control">
                   <label class="label">เรื่องย่อ</label>
                  <textarea class="textarea" type="text" v-model="$v.detail_book_add.$model" :class="{'is-danger': $v.detail_book_add.$error}"></textarea>
                </div>
                <template v-if="$v.detail_book_add.$error">
                  <p class="help is-danger" v-if="!$v.detail_book_add.required">This field is required</p>
                </template>
            </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="submitBook()">Add</button>
          <button class="button"  @click="showAddBook = false; image=null;">Cancel</button>
        </footer>
      </div>
    </div>


  </div>
</template>

<script>
import axios from "@/plugins/axios";
// @ is an alias to /src
import { required, alphaNum, numeric, alpha} from 'vuelidate/lib/validators'


export default {
  props: ["user"],
  data() {
    return {
      search: "",
      showEdit: false,
      showAddBook: false,

      book_name: '',
      book_price:'',
      book_type: '',
      book_quantity:0,
      book_order_type:'stock',
      detail_book:'',


      index_books: null,
      book_id: null,
      image_old: null,

      books: [],

      book_name_add: '',
      book_price_add:'',
      book_type_add: '',
      book_quantity_add:'',
      book_order_type_add:'stock',
      detail_book_add:'',

      image: null,

      sortOption:'sort_book_id',
    };
  },
  mounted() {
    this.getBooks()
  },
  
  methods: {
    getBooks(){
      axios
        .get(`http://localhost:3000/getBooks`)
        .then((response) => {
          this.books = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    discount_num_book(){
      if(this.$v.book_quantity.$model > 0){
        this.$v.book_quantity.$model -= 1;
      }
    },
    addcount_num_book(){
        this.$v.book_quantity.$model = Number(this.$v.book_quantity.$model) + 1;
    },
    selectImage(e) {
       this.image = e.target.files[0];
    },
     showSelectImage() {
      return URL.createObjectURL(this.image);
    },
    deleteSelectImage() {
      this.image = null;
    },
    submitBook(){
      let formData = new FormData();
      formData.append("book_name", this.book_name_add);
      formData.append("price", this.book_price_add);
      formData.append("order_type", this.book_order_type_add);
      formData.append("quantity", this.book_quantity_add);
      formData.append("image_url", this.image);
      formData.append("detail_book", this.detail_book_add);
      console.log(formData)
      axios
        .post("http://localhost:3000/addBook", formData)
        .then((res) => {
          this.books.push(res.data)
        })
        .catch((e) => console.log(e.response.data));
      this.showAddBook = false;
      this.book_name_add = ''
      this.book_price_add =''
      this.book_type_add = ''
      this.book_quantity_add =''
      this.book_order_type_add ='stock'
      this.detail_book_add = ''
      this.image = null
    },
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    editBook(book, index){
      this.showEdit = true;
      this.book_name = book.book_name
      this.book_price = book.price
      // this.book_type = ''
      this.book_quantity = Number(book.quantity)
      this.book_order_type = book.order_type
      this.detail_book = book.detail_book
      this.book_id = book.book_id
      this.image_old = book.image_url;
      this.index_books = index
      this.image = null;
    },
    saveBookEdit(){
      let formData = new FormData();
      formData.append("book_name", this.book_name);
      formData.append("price", this.book_price);
      formData.append("order_type", this.book_order_type);
      formData.append("quantity", this.book_quantity);
      formData.append("image_url", this.image);
      formData.append("detail_book", this.detail_book);
      formData.append("image_old", this.image_old);
      formData.append("book_id", this.book_id);
      axios
        .put(`http://localhost:3000/updateBook`, formData)
        .then((response) => {
          console.log(response.data)
          this.books[this.index_books].book_name = response.data.book_name;
          this.books[this.index_books].price = response.data.price;
          this.books[this.index_books].order_type = response.data.order_type;
          this.books[this.index_books].quantity = response.data.quantity;
          this.books[this.index_books].image_url = response.data.image_url;
          this.books[this.index_books].detail_book = response.data.detail_book;
        })
        .catch((e) => {
          console.log(e.response.data);
        });
      this.showEdit = false;
      this.book_id = null;
      this.image = null
      this.image_old = null;
    },
    sortBook(){
      if(this.sortOption === 'sort_price') {
          this.books.sort((a, b) => {
            if (a.price < b.price) {
              return -1;
            }
            else if (a.price > b.price) {
              return 1;
            }
            else {
              return 0;
            }
          })
      }
      else if(this.sortOption === 'sort_quantity'){
         this.books.sort((a, b) => {
            if (a.quantity < b.quantity) {
              return -1;
            }
            else if (a.quantity > b.quantity) {
              return 1;
            }
            else {
              return 0;
            }
          })
      }
      else if(this.sortOption === 'sort_quantity'){
         this.books.sort((a, b) => {
            if (a.quantity < b.quantity) {
              return -1;
            }
            else if (a.quantity > b.quantity) {
              return 1;
            }
            else {
              return 0;
            }
          })
      }
      else if(this.sortOption === 'sort_book_id'){
         this.books.sort((a, b) => {
            if (a.book_id < b.book_id) {
              return -1;
            }
            else if (a.book_id > b.book_id) {
              return 1;
            }
            else {
              return 0;
            }
          })
      }
      else if(this.sortOption === 'sort_name'){
         this.books.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            else if (a.name > b.name) {
              return 1;
            }
            else {
              return 0;
            }
          })
      }
      else if(this.sortOption === 'sort_book_sales'){
         this.books.sort((a, b) => {
            if (a.book_sales < b.book_sales) {
              return -1;
            }
            else if (a.name > b.name) {
              return 1;
            }
            else {
              return 0;
            }
          })
      }
        
    }
  },
  validations:{
    book_name_add:{
      required: required,
      alphaNum: alphaNum
    },
    book_price_add:{
      required: required,
      numeric: numeric
    },
    book_quantity_add:{
      required: required,
      numeric: numeric
    },
    detail_book_add:{
      required: required
    },
    image:{
      required: required
    },
    book_name:{
      required: required,
      alphaNum: alphaNum
    },
    book_price:{
      required: required,
      numeric: numeric
    },
    book_quantity:{
      required: required,
      numeric: numeric
    },
    detail_book:{
      required: required
    },

  }
};
</script>
