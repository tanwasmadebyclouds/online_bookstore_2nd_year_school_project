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

      <div class="box column is-size-5 pt-5 mt-3" style="background-color:#F2F2F2">
        <div class="has-text-centered">หนังสือทั้งหมด</div>

        <!-- ตาราง -->
        <div class="table-container has-text-centered">
          <table class="table mt-5 is-fullwidth table is-hoverable" style="border-style: solid">
            <thead style="background-color:#CDBE78">
              <tr class="is-size-4">
                <th>promotion_id</th>
                <th>code</th>
                <th>discount</th>
                <th>start_date</th>
                <th>expire_date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(code, index) in codes" :key="code.promotion_id">
                <td>{{code.promotion_id}}</td>
                <td>{{code.promotion_code}}</td>
                <td>{{code.discount}}</td>
                <td>{{code.start_date}}</td>
                <td>{{code.expire_date}}</td>
                <button class="button is-primary mt-1" @click="showEditCode(code, index)">Edit</button>
              </tr>
            </tbody>
          </table>
        </div>
         <button class="button mt-6 mb-6 is-rounded is-success" @click="showAddCode = true;">เพิ่มโค้ดส่วนลด</button>
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
                   <label class="label">code</label>
                 <input  class="input" type="text" v-model="$v.code.$model" :class="{'is-danger': $v.code.$error}"/>
                </div>
                <template v-if="$v.code.$error">
                  <p class="help is-danger" v-if="!$v.code.required">This field is required</p>
                  <p class="help is-danger" v-if="!$v.code.alphaNum">Invalid Code</p>
                </template>
            </div>
            <div class="column is-10">
                <div class="control">
                   <label class="label">discount</label>
                  <input  class="input" type="text" v-model="$v.discount.$model" :class="{'is-danger': $v.discount.$error}"/>
                </div>
                <template v-if="$v.discount.$error">
                  <p class="help is-danger" v-if="!$v.discount.required">This field is required</p>
                  <p class="help is-danger" v-if="!$v.discount.alphaNum">Invalid tracking</p>
                </template>
            </div>
            <div class="column is-10">
                <div class="control">
                   <label class="label">start_date</label>
                  <input class="input" type="date" v-model="$v.start_date.$model" :class="{'is-danger': $v.start_date.$error}">
                </div>
                <template v-if="$v.start_date.$error">
                  <p class="help is-danger" v-if="!$v.start_date.required">This field is required</p>
                  <p class="help is-danger" v-if="!$v.start_date.date_start">Invalid Date</p>
                </template>
            </div>
            <div class="column is-10">
                <div class="control">
                   <label class="label">expire_date</label>
                   <input class="input" type="date" v-model="$v.expire_date.$model" :class="{'is-danger': $v.expire_date.$error}">
                </div>
                <template v-if="$v.expire_date.$error">
                  <p class="help is-danger" v-if="!$v.expire_date.required">This field is required</p>
                  <p class="help is-danger" v-if="!$v.expire_date.expire_date">Invalid Date</p>
                </template>
            </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="saveEditCode()">Save changes</button>
          <button class="button"  @click="showEdit = false;">Cancel</button>
        </footer>
      </div>
    </div>


    <div class="modal" :class="{'is-active':showAddCode}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">เพิ่มโค้ดส่วนลด</p>
        </header>
        <section class="modal-card-body">
            <div class="column is-10">
                <div class="control">
                   <label class="label">code</label>
                  <input  class="input" type="text" v-model="$v.code_add.$model" :class="{'is-danger': $v.code_add.$error}"/>
                </div>
                <template v-if="$v.code_add.$error">
                  <p class="help is-danger" v-if="!$v.code_add.required">This field is required</p>
                  <p class="help is-danger" v-if="!$v.code_add.alphaNum">Invalid Code</p>
                </template>
            </div>
            <div class="column is-10">
                <div class="control">
                   <label class="label">discount</label>
                  <input  class="input" type="text" v-model="$v.discount_add.$model" :class="{'is-danger': $v.discount_add.$error}"/>
                </div>
                <template v-if="$v.discount_add.$error">
                  <p class="help is-danger" v-if="!$v.discount_add.required">This field is required</p>
                  <p class="help is-danger" v-if="!$v.discount_add.alphaNum">Invalid tracking</p>
                </template>
            </div>
            <div class="column is-10">
                <div class="control">
                   <label class="label">start_date</label>
                  <input  :min="new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().split('T')[0]" class="input" type="date" v-model="$v.start_date_add.$model" :class="{'is-danger': $v.start_date_add.$error}"/>
                </div>
                <template v-if="$v.start_date_add.$error">
                  <p class="help is-danger" v-if="!$v.start_date_add.required">This field is required</p>
                  <p class="help is-danger" v-if="!$v.start_date_add.date_start_add">Invalid Date</p>
                </template>
            </div>
            <div class="column is-10">
                <div class="control">
                   <label class="label">expire_date</label>
                   <input :min="new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().split('T')[0]" class="input" type="date" v-model="$v.expire_date_add.$model" :class="{'is-danger': $v.expire_date_add.$error}"/>
                </div>
                <template v-if="$v.expire_date_add.$error">
                  <p class="help is-danger" v-if="!$v.expire_date_add.required">This field is required</p>
                  <p class="help is-danger" v-if="!$v.expire_date_add.expire_date_add">Invalid Date</p>
                </template>
            </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="postAddCode()">Add</button>
          <button class="button"  @click="showAddCode = false;">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
// @ is an alias to /src
import { required, alphaNum, numeric } from 'vuelidate/lib/validators'

function date_start(value){
      const s = new Date(value);
      const e = new Date(this.expire_date);
      console.log(e, s)
      return s <  e
    }

function date_expire(value){
      const e = new Date(value);
      const s = new Date(this.start_date);
      console.log(e, s)
      return s <  e
    }

function date_start_add(value){
      const s = new Date(value);
      const e = new Date(this.expire_date_add);
      console.log(e, s)
      return s <  e
    }

function date_expire_add(value){
      const e = new Date(value);
      const s = new Date(this.start_date_add);
      console.log(e, s)
      return s <  e
    }

export default {
  props: ["user"],
  data() {
    return {
      showEdit:false,
   
      code_id:'',
      code:'',
      discount:'',
      start_date:'',
      expire_date:'',

      showAddCode: false,
      code_add:'',
      discount_add:'',
      start_date_add:'',
      expire_date_add:'',

      codes:[],
      index_code:'',
    };
  },
  mounted() {
    this.getCodePromotion();
  },
  methods: {
    getCodePromotion(){
       axios
        .get(`http://localhost:3000/getCodePromotion`)
        .then((response) => {
          this.codes = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showEditCode(code, index){
      this.showEdit = true;
      this.code_id = code.promotion_id;
      this.discount = code.discount;
      this.code = code.promotion_code;
      this.start_date = code.start_date;
      this.expire_date = code.expire_date;
      this.index_code = index
    },
    saveEditCode(){
      axios
        .put(`http://localhost:3000/updateCode`, {
          promotion_id: this.code_id, 
          discount:this.discount,
          promotion_code:this.code,
          start_date:this.start_date,
          expire_date:this.expire_date})
        .then((response) => {
          console.log(response.data)
          this.codes[this.index_code].discount = response.data.discount;
          this.codes[this.index_code].promotion_code = response.data.promotion_code;
          this.codes[this.index_code].start_date = response.data.start_date;
          this.codes[this.index_code].start_date = response.data.start_date;
        })
        .catch((e) => {
          console.log(e.response.data);
        });
      this.showEdit = false;
    },
    postAddCode(){
      axios
        .post(`http://localhost:3000/addCodePromotion`, {
          discount:this.discount_add,
          start_date:this.start_date_add,
          expire_date:this.expire_date_add,
          promotion_code:this.code_add,
        })
        .then((res) => {
          this.codes.push(res.data);
        })
        .catch((e) => console.log(e.response.data));
      this.showAddCode = false;
    },
    
  },
  validations:{
    code:{
      required: required,
      alphaNum: alphaNum
    },
    discount:{
      required: required,
      numeric: numeric
    },
    start_date:{
      required: required,
      date_start: date_start
    },
    expire_date:{
      required: required,
      date_expire: date_expire
    },
    code_add:{
      required: required,
      alphaNum: alphaNum
    },
    discount_add:{
      required: required,
      numeric: numeric
    },
    start_date_add:{
      required: required,
      date_start: date_start_add
    },
    expire_date_add:{
      required: required,
      date_expire: date_expire_add
    },
  }
};
</script>
