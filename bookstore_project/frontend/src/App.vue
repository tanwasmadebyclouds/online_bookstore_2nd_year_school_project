<template>
  <div class="app">
        <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation" style="background-color: #CDBE78;">


  <div id="navbarBasicExample" class="navbar-menu">
  <div class="navbar-start">
    
      <router-link :to="`/`" class="navbar-item column is-half" ><a style="font-size: 25px;font-weight: bold;color:black;">
        Home
      </a></router-link>

      <router-link :to="`/shop/`" class="navbar-item column is-half"><a style="font-size: 25px;font-weight: bold;color:black;">
        Shop
      </a></router-link>

      <router-link :to="`/contact/`" class="navbar-item column is-half"><a style="font-size: 25px;font-weight: bold;color:black;">
        Contact
      </a></router-link>
  </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <router-link :to="`/Payment/`"><a class="button is-white" v-if="user && !my_cart_check()" style="margin-right:5%;">
            <img src ="https://i.pinimg.com/originals/15/bb/55/15bb559cdd28f56d7c17b00498b4a946.png">
          </a></router-link>
           <router-link :to="`/Payment/`"><a class="button is-danger" style="margin-right:5%;" v-if="my_cart_check()" >
            <img src ="https://i.pinimg.com/originals/15/bb/55/15bb559cdd28f56d7c17b00498b4a946.png">
          </a></router-link>
           <router-link :to="`/user/login`"><a class="button is-white" v-if="!user">
            <img src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png">
          </a></router-link>
          <div v-if="user && member_check()" class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              <span class="pl-3">{{ user.fname }}</span>
            </a>
            <div class="navbar-dropdown">
              <a class="navbar-item" @click="seeprofile()">Profile</a>
              <a class="navbar-item" @click="log_out()">Log out</a>
            </div>
          </div>
          <div v-if="user && admin_check()" class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              <span class="pl-3">{{ user.fname }}</span>
            </a>
            <div class="navbar-dropdown">
              <a class="navbar-item" @click="seeadminprofile()">Profile</a>
              <a class="navbar-item" @click="log_out()">Log out</a>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</nav>
<router-view :key="$route.fullPath"
      @auth-change="onAuthChange"
      :user="user"
      :my_cart='my_cart'/>
    </div>    
</template>

<script>
import axios from "@/plugins/axios";
export default {
    data(){
        return {
          user: null,
          my_cart: null,
        }
    },
    mounted() {
    this.onAuthChange();
  },
  methods: {
    onAuthChange() {
      const token = localStorage.getItem("token");
      if (token) {
        this.getUser();
      }
    },
    getUser() {
      axios.get("http://localhost:3000/user/me").then((res) => {
        this.user = res.data;
        this.my_cart = JSON.parse(localStorage.getItem("my_cart"))
      });
    },
    log_out() {
        localStorage.clear();
        this.user = null;
        this.$router.push({ path: "/" });
    },
    seeprofile() {
        this.$router.push({ path: "/my-account" });
    },
    seeadminprofile() {
        this.$router.push({ path: "/my-account-admin" });
    },
    my_cart_check() {
        try{
        if (this.my_cart.books.length >= 1){
          return true
        }
        return false
      }catch{
        return false
      }
    },
    admin_check() {
        try{
        if (this.user.role == 'employee'){
          return true
        }
        return false
      }catch{
        return false
      }
    },
    member_check() {
        try{
        if (this.user.role == 'member'){
          return true
        }
        return false
      }catch{
        return false
      }
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@200&display=swap');
    .navbar-brand {
  width: 100%;
}

.navbar {
  flex-wrap: wrap;
}

.navbar-brand {
  justify-content: space-between;
}
*{
  font-family: 'Prompt', sans-serif;
}
</style>