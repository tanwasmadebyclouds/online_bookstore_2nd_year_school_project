<template>
  <div class="container is-widescreen" style="margin-top: 8%">
    <div class="columns mt-1">

      <div class="column is-2">
        <div class="box p-1  is-size-5 has-text-centered" style="background-color:#e4e4e4">
          <router-link style="color:black" :to="`my-account`">ข้อมูลส่วนตัว</router-link>
        </div>
        <div class="box p-1 mt-5  is-size-5 has-text-centered" style="background-color:#e4e4e4">
            <router-link style="color:black" :to="`my-order`">คำสั่งซื้อของฉัน</router-link>
        </div>
        <div class="box p-1 mt-5  is-size-5 has-text-centered" style="background-color:#e4e4e4">
          <router-link style="color:black" :to="`my-address`">ที่อยู่ที่จัดส่ง</router-link>
        </div>
      </div>

      <div class="column is-0"></div>

      <div class="box column is-size-5 pt-5 mt-3" style="background-color:#F2F2F2">
        <div class="has-text-centered">ข้อมูลส่วนตัว</div>
        <div class="box is-size-5 mt-5 mb-4 mb-3 mx-5 py-6 pl-5" style="background-color:#C4C4C4">
          <div class="mt-6">
            <div class="mb-3" v-if="temp_user != null" >ชื่อ: {{temp_user.fname}} {{temp_user.lname}}</div>
            <!-- <div class="mb-3" v-if="temp_user != null">ชื่อ: {{temp_user.fname}} {{temp_user.lname}}</div> -->
            <div class="mb-3"  v-if="temp_user != null">วันเกิด: {{temp_user.birthday}}</div>
            <!-- <div class="mb-3" v-if="temp_user != null" >วันเกิด: {{temp_user.birthday}}</div> -->
            <div class="mb-3" v-if="temp_user != null" >เพศ: {{temp_user.gender}}</div>
            <!-- <div class="mb-3" v-if="temp_user != null" >เพศ: {{temp_user.gender}}</div> -->
            <div class="mb-3" v-if="temp_user != null" >อีเมล: {{temp_user.email}}</div>
            <!-- <div class="mb-3" v-if="temp_user != null" >อีเมล: {{temp_user.email}}</div> -->
            <div class="mb-3" v-if="temp_user != null" >มือถือ: {{temp_user.phone}}</div>
            <!-- <div class="mb-3" v-if="temp_user != null" >มือถือ: {{temp_user.phone}}</div> -->
            <div class="mb-3" v-if="temp_user != null" >ที่อยู่: {{temp_user.address}}</div>
            <!-- <div class="mb-3" v-if="temp_user != null" >ที่อยู่: {{temp_user.address}}</div> -->
          </div>
          <button class="button mt-6 mb-6 is-rounded is-active" style="background-color:#CDBE78" @click="showEdit = true;">แก้ไขข้อมูลส่วนตัว</button>
          <button class="button mt-6 mb-6 is-rounded is-active ml-3" style="background-color:#CDBE78" @click="showChangePass = true;">เปลี่ยนรหัสผ่าน</button>
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
            <div class="column is-10">
                <div class="control">
                   <label class="label">ชื่อ</label>
                  <input v-model="$v.fname.$model" :class="{'is-danger': $v.fname.$error}" class="input" type="text"/>
                </div>
                <template v-if="$v.fname.$error">
                  <p class="help is-danger" v-if="!$v.fname.required">This field is required</p>
                  <p class="help is-danger" v-if="!$v.fname.alpha">Invalid fname</p>
                </template>
            </div>
            <div class="column is-10">
                <div class="control">
                   <label class="label">นามสกุล</label>
                 <input v-model="$v.lname.$model" :class="{'is-danger': $v.lname.$error}" class="input" type="text" />
                </div>
                <template v-if="$v.lname.$error">
                  <p class="help is-danger" v-if="!$v.lname.required">This field is required</p>
                  <p class="help is-danger" v-if="!$v.lname.alpha">Invalid lname</p>
                </template>
            </div>
            <div class="column is-10">
                <div class="control">
                   <label class="label">วันเกิด</label>
                  <input v-model="$v.birthday.$model" :class="{'is-danger': $v.birthday.$error}" class="input" type="date" />
                </div>
                <template v-if="$v.birthday.$error">
                  <p class="help is-danger" v-if="!$v.birthday.required">This field is required</p>
                  <p class="help is-danger" v-if="!$v.birthday.date">Invalid birthday</p>
                </template>
            </div>
            <div class="column is-10">
                <div class="control">
                  <label class="label">เพศ</label>
                  <label class="radio">
                    <input type="radio" v-model="gender" value="male">
                    ชาย
                  </label>
                  <label class="radio">
                    <input type="radio" v-model="gender" value="female">
                    หญิง
                  </label>
                </div>
            </div>
            <div class="column is-10">
                <div class="control">
                   <label class="label">อีเมล</label>
                  <input  class="input" type="text" v-model="$v.email.$model" :class="{'is-danger': $v.email.$error}"  maxlength="100"/>
                </div>
                <template v-if="$v.email.$error">
                  <p class="help is-danger" v-if="!$v.email.required">This field is required</p>
                  <p class="help is-danger" v-if="!$v.email.email">Invalid Email</p>
                </template>
            </div>
            <div class="column is-10">
                <div class="control">
                   <label class="label">มือถือ</label>
                  <input  class="input" type="text" v-model="$v.phone.$model" :class="{'is-danger': $v.phone.$error}" maxlength="10" />
                </div>
                <template v-if="$v.phone.$error">
                  <p class="help is-danger" v-if="!$v.phone.required">This field is required</p>
                  <p class="help is-danger" v-if="!$v.phone.phone">Invalid Mobile Number</p>
                </template>
            </div>
            <div class="column is-10">
                <div class="control">
                   <label class="label">ที่อยู่</label>
                   <textarea class="textarea" type="text" v-model="$v.address.$model" :class="{'is-danger': $v.address.$error}"  maxlength="255"></textarea>
                </div>
                <template v-if="$v.address.$error">
                  <p class="help is-danger" v-if="!$v.address.required">This field is required</p>
                </template>
            </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="saveAccount()">Save changes</button>
          <button class="button"  @click="cancel()">Cancel</button>
        </footer>
      </div>
    </div>


    <div class="modal" :class="{'is-active':showChangePass}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">เปลี่ยนรหัสผ่าน</p>
        </header>
        <section class="modal-card-body">
            <div class="column is-10">
                <div class="control">
                   <label class="label">Password</label>
                  <input class="input" type="password" v-model="$v.password.$model" :class="{'is-danger': $v.password.$error}"/>
                </div>
                <template v-if="$v.password.$error">
                  <p class="help is-danger" v-if="!$v.password.required">This field is required</p>
                  <p class="help is-danger" v-if="!$v.password.minLength">minLength 8</p>
                  <p class="help is-danger" v-if="!$v.password.minLength">Invalid password</p>
                </template>
            </div>
            <div class="column is-10">
                <div class="control">
                   <label class="label">New Password</label>
                  <input class="input" type="password" v-model="$v.new_password.$model" :class="{'is-danger': $v.new_password.$error}"/>
                </div>
                <template v-if="$v.new_password.$error">
                  <p class="help is-danger" v-if="!$v.new_password.required">This field is required</p>
                  <p class="help is-danger" v-if="!$v.new_password.minLength">minLength 8</p>
                  <p class="help is-danger" v-if="!$v.new_password.minLength">Invalid password</p>
                </template>
            </div>
            <div class="column is-10">
                <div class="control">
                   <label class="label">Confirm Password</label>
                  <input class="input" type="password" v-model="$v.confirm_password.$model" :class="{'is-danger': $v.confirm_password.$error}"/>
                </div>
                <template v-if="$v.confirm_password.$error">
                  <p class="help is-danger" v-if="!$v.confirm_password.required">This field is required</p>
                  <p class="help is-danger" v-if="!$v.confirm_password.sameAs">Not Same</p>
                </template>
            </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="changePassword()">Save Change</button>
          <button class="button"  @click="showChangePass = false">Cancel</button>
        </footer>
      </div>
    </div>


  </div>
</template>

<script>
import axios from "@/plugins/axios";
import { required, email, alpha, minLength,  sameAs} from 'vuelidate/lib/validators'
// @ is an alias to /src

function mobile (value) {
     return !!value.match(/0[0-9]{9}/)
}

function date (value) {
    const bd = new Date(value);
    const today = new Date()
    console.log(bd, today)
     return bd < today 
}

function complexPassword (value) {
   if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
     return false
   }
   return true
 }


export default {
  props: ["user", 'my_cart'],
  data() {
    return {
      temp_user: null,
      showEdit: false,
      fname: null,
      lname:null,
      birthday: null,
      gender: null,
      email:null,
      phone:null,
      address: null,

      showChangePass: false,
      password:null,
      new_password:null,
      confirm_password:null,
    
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    saveAccount() {
      
        let data = {
          fname:this.fname,
          lname:this.lname,
          birthday:this.birthday,
          gender:this.gender,
          email:this.email,
          phone:this.phone,
          address:this.address,
          user_address_no:this.user.user_address_no,
        }
        axios
          .put(`http://localhost:3000/edit_profile_member/${this.user.user_id}`, data)
          .then((res) => {
            console.log(res.data)
            this.temp_user = res.data;
            this.fname = this.temp_user.fname
            this.lname = this.temp_user.lname
            this.birthday = this.temp_user.birthday
            this.gender = this.temp_user.gender
            this.email = this.temp_user.email
            this.phone = this.temp_user.phone
            this.address = this.temp_user.address
          })
          .catch((e) => console.log(e.response.data));

        this.showEdit = false 
      
    },
    cancel(){
      this.showEdit = false
    },

    getUser() {
      axios.get("http://localhost:3000/user/me").then((res) => {
        this.temp_user = res.data;
        this.fname = this.temp_user.fname
        this.lname = this.temp_user.lname
        this.birthday = this.temp_user.birthday
        this.gender = this.temp_user.gender
        this.email = this.temp_user.email
        this.phone = this.temp_user.phone
        this.address = this.temp_user.address
      });
    },
    
    changePassword(){
      axios
          .put(`http://localhost:3000/changePassword`, {
            user_id: this.user.user_id,
            username: this.user.username,
            password: this.password,
            new_password: this.new_password,
            confirm_password: this.confirm_password
          })
          .then((res) => {
            alert('เปลี่ยนรหัสทำเร็จ')
            this.showChangePass = false
          })
          .catch((e) => alert('คุณกรอกรหัสผิด'));
    }
    

  },
  validations:{
    fname:{
      required: required,
      alpha: alpha
    },
    lname:{
      required: required,
      alpha: alpha
    },
    email: {
         required: required, 
         email: email     
    },
    phone: {
         required: required, 
         mobile: mobile     
    },
    birthday:{
      required: required, 
      date:date  
    },
    address:{
      required: required
    },
    password:{
      required: required,
      minLength: minLength(8),
      complex: complexPassword
    },
    new_password:{
      required: required,
      minLength: minLength(8),
      complex: complexPassword
    },
    confirm_password:{
      required: required,
      sameAs: sameAs('new_password'),
    }
  }
};
</script>
