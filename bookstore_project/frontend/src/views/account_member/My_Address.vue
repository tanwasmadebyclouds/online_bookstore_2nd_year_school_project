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
        <div class="has-text-centered">ที่อยู่เพิ่มเติม</div>
        <div class="box is-size-5 mt-5 mb-4 mb-3 mx-5 py-6 pl-5" >

          <div class="container ">
            <div class="columns is-multiline">
              <div class="column  card is-5 mx-5 px-0 py-0 my-6" style="background-color:#C4C4C4" v-for="(address, index) in address_all" :key="address.user_address_no">
                <div class="card-content">
                  <div class="content" style="height: 200px;">{{address.address}}</div>
                </div>
                <footer class="card-footer" style="height: 40px; background-color:#CDBE78; border-top: 0px solid">
                  <a  class="card-footer-item has-text-black" style="border-right: 0px;"  @click="EditAddress(address, index)">แก้ไขที่อยู่</a>
                  <a  class="card-footer-item has-text-black" @click="deleteAddress(index)" v-show="address_all.length != 1">ลบ</a>
                </footer>
              </div>
            </div>
            <button class="button mt-6 mb-6 is-rounded is-active mx-6 has-text-black" style="background-color:#CDBE78"  @click="showAdd = true;">เพิ่มที่อยู่</button>
          </div>
        </div>
      </div>
    </div>


    <div class="modal" :class="{'is-active':showAdd}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">เพิ่มที่อยู่</p>
        </header>
        <section class="modal-card-body">
            <div class="column is-10">
                <div class="control">
                   <label class="label">ที่อยู่</label>
                  <textarea class="textarea" type="text" v-model="$v.address_add.$model" :class="{'is-danger': $v.address_add.$error}"></textarea>
                </div>
                <template v-if="$v.address_add.$error">
                  <p class="help is-danger" v-if="!$v.address_add.required">This field is required</p>
                </template>
            </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="postAddress()">ADD</button>
          <button class="button"  @click="showAdd = false;">Cancel</button>
        </footer>
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
                   <label class="label">ที่อยู่</label>
                  <textarea class="textarea" type="text" v-model="$v.address_edit.$model" :class="{'is-danger': $v.address_edit.$error}"></textarea>
                </div>
                <template v-if="$v.address_edit.$error">
                  <p class="help is-danger" v-if="!$v.address_edit.required">This field is required</p>
                </template>
            </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="SaveEdit()">SAVE</button>
          <button class="button"  @click="showEdit = false;">Cancel</button>
        </footer>
      </div>
    </div>





  </div>
</template>

<script>
import axios from "@/plugins/axios";
// @ is an alias to /src
import { required, email, alpha } from 'vuelidate/lib/validators'
export default {
  props: ["user"],
  data() {
    return {
      showAdd: false,
      showEdit: false,
      address_edit:null,
      address_add:'',
      address_all: [],
      index_address: null,
    };
  },
  mounted() {
    this.getAddress();
  },
  methods: {
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
    postAddress(){
      if (!this.$v.address_add.$error) {
        axios
          .post(`http://localhost:3000/addAddress`, {address: this.address_add, user_id:this.user.user_id})
          .then((res) => {
            this.address_add = ''
            this.address_all.push(res.data);
          })
          .catch((e) => console.log(e.response.data));
        this.showAdd = false;
      }
    },
    EditAddress(address, index){
      this.showEdit = true;
      this.address_edit = address.address;
      this.index_address = index;
    },
    SaveEdit(){
      if (!this.$v.address_edit.$error) {
        axios
          .put(`http://localhost:3000/address_all/${this.user.user_id}`, {address: this.address_edit, user_address_no:this.address_all[this.index_address].user_address_no})
          .then((response) => {
            console.log(response.data.address, this.index_address)
            
            this.address_all[this.index_address].address = response.data.address;
          })
          .catch((e) => {
           console.log(e.response.data);
          });
        this.showEdit = false;
      }
    },
    deleteAddress(index) {
      const result = confirm(`Are you sure you want to delete this address`);
      console.log(this.address_all[index].user_address_no)
      if (result) {
        axios
          .delete(`http://localhost:3000/address_all/${this.user.user_id}/${this.address_all[index].user_address_no}`)
          .then((response) => {
          })
          .catch((error) => {
            this.error = error.message;
          });
          this.address_all.splice(index, 1);
      }
    },

  },
  validations:{
    address_add:{
      required: required
    },
    address_edit:{
      required: required
    }
  }
};
</script>
