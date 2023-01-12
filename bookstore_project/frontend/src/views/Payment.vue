<template>
  <div class="container is-widescreen" style="margin-top:5%">
    <section class="section" v-if="error">
      <div class="container is-widescreen">
        <div class="notification is-danger">{{ error }}</div>
      </div>
    </section>
    <section class="section">
      <div class="hero-body">
        <p class="title">payment</p>
      </div>
      <br>
      <div class="content">
        <div class="card has-background-light">
          <div class="card-content">
            <div v-for="(mycart) in my_cart.books" :key="mycart.book_id" class="box">
              <article class="media">
                <div class="media-left">
                  <figure class="image is-64x64">
                    <img :src="imagePath(mycart.image_url)" alt="Image" />
                  </figure>
                </div>
                <div class="media-content ">
                  <div class="level-left">
                    <div class="content">
                      <p>{{mycart.book_name}}</p>
                    </div>
                  </div>
                    <div class="content">
                      <p>price : {{mycart.price}}</p>
                    </div>
                  <nav class="level">
                    <div class="level-left">
                      <a @click="addbookcart(mycart)" class="level-item" aria-label="like">
                        + ({{mycart.quantity}})
                      </a>
                      <a @click="minusbookcart(mycart)" class="level-item" aria-label="like">
                        -
                      </a>
                    </div>
                    <div class="level-right">
                      <div class="level-item">
                        <button
                          @click="deletebookcart(mycart)"
                          class="button is-danger is-outlined"
                        >
                          <span>bring out ❌</span>
                        </button>
                      </div>
                    </div>
                  </nav>
                </div>
              </article>
            </div>
            <div class="content">
              <p class="is-size-4">total price : {{totalPrice}}</p>
            </div>
            <div class="content columns">
              <div class="column is-two-fifths">
                <input class="input" type="text" placeholder="promotion name" v-model="promotion"> 
              </div>
              <div class="column is-one-fifth">
                <button class="button is-danger is-outlined" @click="checkpromotion()">confirm</button>
              </div>
            </div>
            <div class="content columns ">
              <div class="column is-2">
                <p class="is-size-4">select address : </p>
              </div>
              <div class="column">

                <div class="container">
                  <div class="columns is-multiline">
                    <div class="column  card is-4 mx-5 px-0 py-0 my-6" style="background-color:#C4C4C4" v-for="(address) in address_all" :key="address.user_address_no">
                      <div class="card-content">
                        <button class="button is-info is-inverted is-outlined" @click="selectAddress(address.address)" >select you address</button>
                        <br><br>
                        <div class="content is-flex is-flex-wrap" style="height: auto">{{address.address.toString()}}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div class="select">
                <select v-model="user_select_address">
                  <option v-for="(address1) in address_all" :key="address1.user_address_no">{{address1.address}}</option>
                </select>
              </div> -->
              </div>
            </div>
            <div class="content columns ">
              <div class="column is-3">
                <p class="is-size-4">select payment method: </p>
              </div>
              <div class="column control">
                <label class="radio is-size-4">
                  <input v-model="selectpayment" type="radio" value="credit_card">
                  credit card 💸
                </label>
                <label class="radio is-size-4">
                  <input v-model="selectpayment" type="radio" value="transfer">
                  transfer 💸
                </label>
              </div>
            </div>
          </div>
          
          <footer class="card-footer">
            <a class="card-footer-item is-size-2" @click="submitcart()">
              <span>Payment 💸</span>
            </a>
          </footer>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from '@/plugins/axios'

export default {
  props: ['user', 'my_cart'],
  data() {
    return {
      error: null,
      promotion:null,
      checkpromotion1: "",
      address_all:[],
      user_select_address: "",
      selectpayment:"",
      user_set_id: this.my_cart.user_id,
      use_promotion_id: null,
    };
  },
  mounted() {
    this.getAddress()
  },
  methods: {
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    addbookcart(book) {
      let selectedBook = this.my_cart.books.filter((book_s)=> book_s.book_id === book.book_id);
      console.log(selectedBook)
      if (selectedBook[0].quantity < selectedBook[0].old_quantity) {
        selectedBook[0].quantity += 1;
      localStorage.setItem('my_cart', JSON.stringify(this.my_cart));
      }else{
        selectedBook[0].quantity = selectedBook[0].old_quantity;
        localStorage.setItem('my_cart', JSON.stringify(this.my_cart));
      }
    },
    minusbookcart(book) {
      let selectedBook = this.my_cart.books.filter((book_s)=> book_s.book_id === book.book_id);
      console.log(selectedBook)
      if(selectedBook[0].quantity === 1){
        this.my_cart.books.splice(this.my_cart.books.findIndex((book_s)=> book_s.book_id === book.book_id),1);
        console.log(this.my_cart.books.findIndex((book_s)=> book_s.book_id === book.book_id))
      }
      else{
        selectedBook[0].quantity -= 1;
      }
       localStorage.setItem('my_cart', JSON.stringify(this.my_cart));
    },
    deletebookcart(book){
      this.my_cart.books.splice(this.my_cart.books.findIndex((book_s)=> book_s.book_id === book.book_id),1);
      localStorage.setItem('my_cart', JSON.stringify(this.my_cart));
    },
    checkpromotion(){
      axios
        .put(`http://localhost:3000/getPromotion1`, {promotion_code: this.promotion})
        .then((response) => {
          this.checkpromotion1 = response.data;
          this.use_promotion_id = response.data.promotion_id
          if(this.checkpromotion1 === ''){
            alert('mai mee code jaa~~~')
          }
          else{
            alert('use code laew jaa~~~')
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAddress(){
      axios
        .get(`http://localhost:3000/getAddress/${this.user.user_id}`)
        .then((response) => {
          this.address_all = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitcart() {
      let data = {
        delivery_address: this.user_select_address,
        total_price_cart: this.totalPrice,
        user_id: this.my_cart.user_id,
        my_cart: this.my_cart.books,
        payment_type: this.selectpayment,
        promotion:this.use_promotion_id
      };
        console.log(data)
        axios
          .post("http://localhost:3000/addcart", data)
          .then((res) => {
            alert("Add cart success");
            console.log(res.data.user_id)
            this.user_select_address = ""
            this.payment_type = ""
            this.total_price_cart = ""
            this.my_cart.books = ""
            localStorage.setItem("my_cart", JSON.stringify({ 'user_id':this.user_set_id, 'books':[]}));
            this.user_set_id = ""
            this.use_promotion_id = null

            this.$emit("auth-change");
            this.$router.push({ path: "/" });
          })
          .catch((err) => {
            alert(err.response.data.details.message)
          });
      },
      selectAddress(seAddress) {
          this.user_select_address = seAddress;
      },


  },
  computed: {
                totalPrice(newVal) {
                    var num = 0;
                    if(this.checkpromotion1 === ""){
                      this.my_cart.books.forEach(item => {
                      num += item.price*item.quantity
                    });
                    }
                    else{
                      this.my_cart.books.forEach(item => {
                      num += (item.price*item.quantity)
                    });
                    num -= this.checkpromotion1.discount;
                    }
                    return num;
                },
            }
};
</script>