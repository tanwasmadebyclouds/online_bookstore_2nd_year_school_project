<template>
  <div class="container mt-5">
    <div class="columns is-centered has-background-light" style="margin-top:10%;border-radius: 25px;">
      <div class="column is-6">
        <div class="is-4" style="background-color: #CDBE78;">

        </div>

      </div>

      <div class="column is-6 is-centered">
        <h1 class="title is-centered">Sign in</h1>

        <p
          v-if="error"
          class="
            px-3
            py-2
            mb-3
            has-text-danger-dark has-background-danger-light
          "
        >
          {{ error }}
        </p>

        <!-- Login form -->
        <div class="field">
          <label class="label">Username</label>
          <div class="control has-icons-left">
            <input v-model="username" class="input" type="text" />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left has-icons-right">
            <input v-model="password" class="input" type="password" />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </div>
        </div>

        <button class="button is-black is-fullwidth" @click="submit">Login</button>

        <router-link :to="`/user/signup`"><p class="my-3">
          Don't have an account yet? <a href="/signup.html">Sign up</a>
        </p></router-link>
      </div>
    </div>
  </div>
</template>




<script>
import axios from '@/plugins/axios'

export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    submit() {
      const data = {
        username: this.username,
        password: this.password,
      };

      axios
        .post("http://localhost:3000/user/login/", data)
        .then((res) => {
          const token = res.data.token;
          const role = res.data.user_role;
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          if(!localStorage.getItem('my_cart')){
            localStorage.setItem("my_cart", JSON.stringify({ 'user_id':res.data.user_id, 'books':[],}));
          }
          this.$emit("auth-change");
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          this.error = error.response.data;
          console.log(error.response.data);
        });
    },
  },
};
</script>