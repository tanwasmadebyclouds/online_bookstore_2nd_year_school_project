<template>
  <div class="container is-widescreen" style="margin-top:10%">
    <section class="section" v-if="error">
      <div class="container is-widescreen">
        <div class="notification is-danger">{{ error }}</div>
      </div>
    </section>
    <section class="hero">
    </section>
    <section class="section">
      <div class="content">
        <div class="columns is-multiline">
          <div class="column is-6">
            <figure class="image" v-if="book != null">
                <img  :src="imagePath(book.image_url)" style="height: 45%; width:45%;" alt="Placeholder image"/>
            </figure>
          </div>
          <div class="column is-6 has-background-light" style="margin-top:3%;border-radius: 25px;">
              <h4 class="title is-4" v-if="book != null">{{book.book_name}}</h4>
              <p class="subtitle is-5" v-if="book != null">มีหนังสือ {{book.quantity}} เล่ม</p>
              <br>
              <br>
              <br>
              <br>
              <p class="title is-3" style="color:green;" v-if="book != null"> ฿ : {{book.price}} </p>
              <br>
              <br>
              <br>
              <footer class="card-footer">
                <router-link class="card-footer-item" to="/">To Home Page</router-link>
                  <a class="card-footer-item" @click="goCheckcart(book)" v-if="book != null && user">
                    <span>add in cart 🛒</span>
                  </a>
            </footer>
          </div>
          <div class="column">
            <h1 style="margin-left:45%;margin-top:3%;">เนื้อเรื่องย่อ</h1>
            <div class="content" v-if="book != null">{{book.detail_book}}</div>
          </div>
        </div>
        
      </div>
    </section>
  </div>
  <!-- <figure class="image" >
                  <img
                    :src="'http://localhost:3000/'+image.file_path"
                    alt="Placeholder image"
                    style="height: 500px; object-fit: cover;"
                  />
                </figure> -->
</template>

<script>
import axios from "@/plugins/axios";

export default {
  props: ['user', 'my_cart'],
  data() {
    return {
      book: null,
      error: null,
      youha: {i:"ppp"}
    };
  },
  mounted() {
    this.getBooks(this.$route.params.id);
  },
  methods: {
    getBooks(bookId){
      axios
        .get(`http://localhost:3000/getBooks/${bookId}`)
        .then((response) => {
          this.book = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    goCheckcart(book) {
      let selectedBook = this.my_cart.books.filter((book_s)=> book_s.book_id === book.book_id);
      console.log(selectedBook)
      if(selectedBook[0]){
        selectedBook[0].quantity += 1;
      }
      else{
        this.my_cart.books.push({book_id: book.book_id,book_name: book.book_name,price: book.price, quantity: 1, image_url: book.image_url, old_quantity:book.quantity,detail_book:book.detail_book});
        console.log(selectedBook)
      }
       localStorage.setItem('my_cart', JSON.stringify(this.my_cart));
    },
  },
};
</script>