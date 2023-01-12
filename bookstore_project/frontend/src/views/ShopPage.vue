<template>
  <div class="container is-widescreen">
    <section class="hero">
      <div class="hero-body">
        <div class="columns">
        </div>
      </div>
    </section>
    <section class="section" id="app">
      <div class="content">
        <div class="columns is-multiline">
          <div class="column is-3" v-for="book in books" :key="book.book_id">
            <router-link :to="`/detail/${book.book_id}`">
              <figure class="image">
                <img  :src="imagePath(book.image_url)" style="height: 80%;width:80%;" alt="Placeholder image"/>
              </figure>
            </router-link>
            <div class="columns">
            <p class="column has-text-left ml-6 pl-5 mb-6 has-text-weight-semibold is-9" style=" height: 2rem;"> {{book.book_name}}</p>
            </div>
            <div class="columns">
              <div class="column is-3"></div>
              <button @click="goCheckcart(book)" class="column button is-warning is-6  pt-2 mb-5" aria-label="like" v-show="book.quantity > 0"><p>add in cart 🛒</p></button>
            <button class="column button is-light is-6  pt-2 mb-5" aria-label="like" v-show="book.quantity === 0"><p>out of stock 🛒</p></button>
            
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from '@/plugins/axios';
// @ is an alias to /src
export default {
  name: "Home",
  props: ['user', 'my_cart'],
  data() {
    return {
      search: "",
      blogs: [],
      books: [],
    };
  },
  mounted() {
    this.getBooks();
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
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    shortContent(content) {
      if (content.length > 200) {
        return content.substring(0, 197) + "...";
      }
      return content;
    },
    goCheckcart(book) {
      let selectedBook = this.my_cart.books.filter((book_s)=> book_s.book_id === book.book_id);
      console.log(selectedBook)
      if(selectedBook[0]){
        selectedBook[0].quantity += 1;
      }
      else{
        this.my_cart.books.push({book_id: book.book_id,book_name: book.book_name,price: book.price, quantity: 1, image_url: book.image_url, old_quantity:book.quantity,detail_book: book.detail_book});
        console.log(selectedBook)
      }
       localStorage.setItem('my_cart', JSON.stringify(this.my_cart));
    },
  },
};
</script>
