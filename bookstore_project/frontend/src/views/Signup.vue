<template>
  <div class="container" style="background-color:#F2F2F2;">
    <div class=" column is-12" style="margin:auto;margin-top:7%;">
      <h1 class=" is-size-2 has-text-weight-bold has-text-centered" style="margin-bottom:8%;color:#CDBE78;">Sign up</h1>
    </div>

    <div class=" columns" style="margin-left:auto; margin-bottom:5%;">
      <div class=" column is-half" style="margin-left:auto; margin-right:auto; width:45%">
        <div class=" columns">
          <h1 class=" is-size-5 has-text-weight-bold" style="width:35%; color:orange; margin-right:5%;">First Name</h1>
          <input 
          v-model="$v.first_name.$model"
          :class="{ 'is-danger': $v.first_name.$error }"
          class="input is-normal" 
          type="text" 
          placeholder="Normal input" 
          style="border-radius: 25px; border-color:white; background-color:#B3B3B3 ;"/>
        </div>
        <template v-if="$v.first_name.$error">
          <p class="help is-danger" v-if="!$v.first_name.required">
            This field is required
          </p>
        </template>
      </div>
    </div>

    <div class=" columns" style="margin-left:auto; margin-bottom:5%;">
      <div class=" column is-half" style="margin-left:auto; margin-right:auto; width:45%">
          <div class=" columns">
            <h1 class=" is-size-5 has-text-weight-bold" style="width:35%; color:orange; margin-right:5%">Last Name</h1>
            <input 
            v-model="$v.last_name.$model"
            :class="{ 'is-danger': $v.last_name.$error }"
            class="input is-normal" 
            type="text" 
            placeholder="Normal input" 
            style="border-radius: 25px; border-color:white; background-color:#B3B3B3 ;"/>
          </div>
          <template v-if="$v.last_name.$error">
            <p class="help is-danger" v-if="!$v.last_name.required">
              This field is required
            </p>
          </template>
        </div>
      </div>

    
    <div class=" columns" style="margin-left:auto; margin-bottom:5%;">
      <div class=" column is-half" style="margin-left:auto; margin-right:auto; width:45%">
        <div class=" columns">
          <h1 class=" is-size-5 has-text-weight-bold" style="width:35%; color:orange; margin-right:5%">Email</h1>
          <input
          v-model="$v.email.$model"
          :class="{ 'is-danger': $v.email.$error }"
          class="input is-normal" 
          type="text" placeholder="" 
          style="border-radius: 25px; border-color:white; background-color:#B3B3B3 ;">
        </div>
        <template v-if="$v.email.$error">
          <p class="help is-danger" v-if="!$v.email.required">
            This field is required
          </p>
          <p class="help is-danger" v-if="!$v.email.email">
            Invalid Email
          </p>
        </template>
      </div>
    </div>

    <div class=" columns" style="margin-left:auto; margin-bottom:5%;">
      <div class=" column is-half" style="margin-left:auto; margin-right:auto; width:45%">
          <div class=" columns">
            <h1 class=" is-size-5 has-text-weight-bold" style="width:35%; color:orange; margin-right:5%">Date of birth</h1>
            <input
            v-model="$v.datebirth.$model"
            :class="{ 'is-danger': $v.datebirth.$error }"
            class="input is-normal" 
            type="date" 
            placeholder="" 
            style="border-radius: 25px; border-color:white; background-color:#B3B3B3 ;">
          </div>
          <template v-if="$v.datebirth.$error">
            <p class="help is-danger" v-if="!$v.datebirth.required">
              This field is required
            </p>
          </template>
        </div>
      </div>

    <div class=" columns" style="margin-left:auto; margin-bottom:5%;">
      <div class=" column is-half" style="margin-left:auto; margin-right:auto; width:45%">
        <div class=" columns">
          <h1 class=" is-size-5 has-text-weight-bold" style="width:35%; color:orange; margin-right:5%">Gender</h1>
          <select
          v-model="$v.gender.$model"
          :class="{ 'is-danger': $v.gender.$error }"
          class="input is-normal" 
          type="text" 
          placeholder="" 
          style="border-radius: 25px; border-color:white; background-color:#B3B3B3 ;">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          </select>
        </div>
        <template v-if="$v.gender.$error">
          <p class="help is-danger" v-if="!$v.gender.required">
            This field is required
          </p>
        </template>
      </div>
    </div>

    <div class=" columns" style="margin-left:auto; margin-bottom:5%;">
      <div class=" column is-half" style="margin-left:auto; margin-right:auto; width:45%">
          <div class=" columns">
            <h1 class=" is-size-5 has-text-weight-bold" style="width:35%; color:orange; margin-right:5%">Phone</h1>
            <input 
            v-model="$v.mobile.$model"
            :class="{ 'is-danger': $v.mobile.$error }"
            class="input is-normal" 
            type="text" 
            placeholder="" 
            style="border-radius: 25px; border-color:white; background-color:#B3B3B3 ;">
          </div>
          <template v-if="$v.mobile.$error">
                <p class="help is-danger" v-if="!$v.mobile.required">
                  This field is required
                </p>
                <p class="help is-danger" v-if="!$v.mobile.mobile">
                  Invalid Mobile Number
                </p>
              </template>
        </div>
      </div>

    
    <div class=" columns" style="margin-left:auto; margin-bottom:5%;">
      <div class=" column is-half" style="margin-left:auto; margin-right:auto; width:45%">
        <div class=" columns">
          <h1 class=" is-size-5 has-text-weight-bold" style="width:35%; color:orange; margin-right:5%">Username</h1>
          <input 
          v-model="$v.username.$model"
          :class="{ 'is-danger': $v.username.$error }"
          class="input is-normal" 
          type="text" 
          placeholder="" 
          style="border-radius: 25px; border-color:white; background-color:#B3B3B3 ;">
        </div>
        <template v-if="$v.username.$error">
          <p class="help is-danger" v-if="!$v.username.required">
            This field is required
          </p>
          <p class="help is-danger" v-if="!$v.username.minLength">
            Must be at least 3 characters
          </p>
        </template>
      </div>
    </div>

    <div class=" columns" style="margin-left:auto; margin-bottom:5%;">
      <div class=" column is-half" style="margin-left:auto; margin-right:auto; width:45%">
          <div class=" columns">
            <h1 class=" is-size-5 has-text-weight-bold" style="width:35%; color:orange; margin-right:5%">Password</h1>
            <input 
            v-model="$v.password.$model"
            :class="{ 'is-danger': $v.password.$error }"
            class="input is-normal" 
            type="password" 
            placeholder="" 
            style="border-radius: 25px; border-color:white; background-color:#B3B3B3 ;">
          </div>
          <template v-if="$v.password.$error">
            <p class="help is-danger" v-if="!$v.password.required">
              This field is required
            </p>
            <p class="help is-danger" v-if="!$v.password.minLength">
              Must be at least 8 character
            </p>
            <p class="help is-danger" v-if="!$v.password.complex">
              Password too easy
            </p>
          </template>
        </div>
      </div>

    <div class=" columns" style="margin-left:auto; margin-bottom:5%;">
      <div class=" column is-half" style="margin-left:26%; width:46%">
        <div class=" columns">
          <h1 class=" is-size-5 has-text-weight-bold" style="width:35%; color:orange; margin-right:5%">ComfirmPassword</h1>
          <input 
          v-model="$v.confirm_password.$model"
          :class="{ 'is-danger': $v.confirm_password.$error }"
          class="input is-normal" 
          type="password" 
          placeholder="" 
          style="border-radius: 25px; border-color:white; background-color:#B3B3B3 ; ">
        </div>
        <template v-if="$v.confirm_password.$error">
        <p class="help is-danger" v-if="!$v.confirm_password.sameAs">
          Password not match
        </p>
        </template>
      </div>
    </div>

    <div class=" columns" style="margin-left:auto; margin-bottom:7%;">
      <div class=" column is-half" style="margin-left:24%; width:46%">
        <div class=" columns">
          <h1 class=" is-size-5 has-text-weight-bold" style="width:35%; color:orange; margin-right:5%">Address</h1>
          <textarea 
          class="textarea is-normal" 
          type="text" 
          v-model="$v.address.$model" 
          :class="{'is-danger': $v.address.$error}">
          </textarea>
        </div>
        <template v-if="$v.address.$error">
        <p class="help is-danger" v-if="!$v.address.sameAs">
          This field is required
        </p>
        </template>
      </div>
    </div>

    <div class=" column" style="margin-left:auto; margin-bottom:2%;">
        <label class="checkbox is-size-5 columns">
          <input type="checkbox" style="margin-top:0.5%; margin-right:1%; margin-left:2.5%;">
          <h1 style="color:#CDBE78;">I agree to the terms and conditions</h1>
        </label>
    </div>

    <div class=" column" style="margin-left:auto; margin-bottom:5%;">
        <button class=" button is-success" style="margin-left:1.75%; width:20%; border-radius:25px;" @click="submit()"> Sign Up</button>
    </div>


  </div>
  
</template>

<script>
import axios from '@/plugins/axios'
import {
  required,
  email,
  helpers,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";

function mobile(value) {
  return !helpers.req(value) || !!value.match(/0[0-9]{9}/);
}

function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}

export default {
  data () {
    return {
      username: "",
      password: "",
      confirm_password: "",
      gender: "",
      datebirth: "",
      email: "",
      mobile: "",
      first_name: "",
      last_name: "",
      address: "",
    }
  },
  methods: {
    submit() {
      // Validate all fields
      this.$v.$touch();

      // เช็คว่าในฟอร์มไม่มี error
      if (!this.$v.$invalid) {
        let data = {
          username: this.username,
          password: this.password,
          gender: this.gender,
          datebirth: this.datebirth,
          confirm_password: this.confirm_password,
          email: this.email,
          mobile: this.mobile,
          first_name: this.first_name,
          last_name: this.last_name,
          address: this.address,
        };
        console.log(data)
        axios
          .post("http://localhost:3000/user/signup", data)
          .then((res) => {
            alert("Sign up Success");
            this.$router.push({ path: "/" });
          })
          .catch((err) => {
            alert(err.response.data.details.message)
          });
      }
    },
  },
  validations: {
    email: {
      required: required,
      email: email,
    },
    mobile: {
      required: required,
      mobile: mobile,
    },
    datebirth: {
      required: required,
    },
    gender: {
      required: required,
    },
    password: {
      required: required,
      minLength: minLength(8),
      complex: complexPassword,
    },
    confirm_password: {
      sameAs: sameAs("password"),
    },
    username: {
      required: required,
      minLength: minLength(3),
      maxLength: maxLength(20),
    },
    first_name: {
      required: required,
    },
    last_name: {
      required: required,
    },
    address: {
      required: required,
    },
  },

}
</script>