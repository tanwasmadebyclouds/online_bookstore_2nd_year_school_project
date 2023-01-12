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

      <div class="box is-size-5 pt-5 mt-3 column is-11" style="background-color:#F2F2F2">
        <div class="has-text-centered">คำสั่งซื้อทั้งหมด</div>

        <!-- ตาราง -->
        <div class="table-container has-text-centered">
          <table class="table mt-5 is-fullwidth table is-hoverable" style="border-style: solid">
            <thead style="background-color:#CDBE78">
              <tr class="is-size-6">
                <th>หมายเลขคำสั่งซื้อ</th>
                <th>ชื่อลูกค้า</th>
                <th>วัน เวลา</th>
                <th>หมายเลขติดตาม</th>
                <th>ยอดการซื้อ</th>
                <th>สถานะ</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cart, index) in carts" :key="cart.cart_id">
                <td>{{cart.cart_id}}</td>
                <td>{{cart.fname}} {{cart.lname}}</td>
                <td>{{cart.create_date}}</td>
                <td>{{cart.tracking_number}}</td>
                <td>{{cart.total_price}}</td>
                <td>{{cart.order_status}}</td>
                <button class="button is-primary mt-1 mr-1 ml-1" @click="editTracking(cart, index)">Edit</button>
                <button class="button is-info mt-1 ml-3" @click="showInfoCart(cart)">รายละเอียด</button>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- <div class="column is-3">
        <div class="card mt-6">
          <header class="card-header has-background-primary">
            <p class="card-header-title">Filter</p>
            <p class="card-header-icon">
              <span class="card-header-icon icon">
                <i class="fas fa-filter"></i>
              </span>
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="control">
                <label class="checkbox">
                  <input type="checkbox" v-model="filter_pending"/>
                  Hide Pending
                </label>
              </div>
              <div class="control">
                <label class="checkbox">
                  <input type="checkbox" v-model="filter_shipped" />
                  Hide Shipped
                </label>
              </div>
              <div class="control">
                <label class="checkbox">
                  <input type="checkbox" v-model="filter_canceled"/>
                  Hide Canceled
                </label>
              </div>
            </div>
          </div>
        </div>
      </div> -->


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
                   <label class="label">หมายเลขติดตาม</label>
                  <input maxlength="10" class="input" type="text" v-model="$v.tracking_num_edit.$model" :class="{'is-danger': $v.tracking_num_edit.$error}"/>
                </div>
                <template v-if="$v.tracking_num_edit.$error">
                  <p class="help is-danger" v-if="!$v.tracking_num_edit.required">This field is required</p>
                  <p class="help is-danger" v-if="!$v.tracking_num_edit.alphaNum">Invalid tracking</p>
                </template>
            </div>
            <div class="column is-10">
              <div class="control">
                <div class="select">
                  <select v-model="status_edit">
                    <option  value="pending">Pending</option>
                    <option  value="shipped">Shipped</option>
                    <option  value="canceled">Canceled</option>
                  </select>
                </div>
              </div>
            </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="saveTracking()">Save changes</button>
          <button class="button"  @click="showEdit = false;">Cancel</button>
        </footer>
      </div>
    </div>

    <div class="modal" :class="{'is-active':showInfo}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">รายละเอียด</p>
        </header>
        <section class="modal-card-body">
          <table class="table mt-5 is-fullwidth table is-hoverable" style="border-style: solid">
            <thead style="background-color:#CDBE78">
              <tr class="is-size-6">
                <th>ชื่อหนังสือ</th>
                <th>รหัสสินค้า</th>
                <th>ราคา</th>
                <th>จำนวน</th>
                <th>รวม</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in info" :key="item.book_id">
                <td>{{item.book_name}}</td>
                <td>{{item.book_id}}</td>
                <td>{{item.price}}</td>
                <td>x{{item.item_quantity}}</td>
                <td>{{item.total_item}}</td>
              </tr>
              <tr>
                <td colspan="3"></td>
                <td >รวม</td>
                <td v-if='info != null'>{{info[0].total_price_cart}}</td>
              </tr>
              <tr>
                <td colspan="3"></td>
                <td >ใช้ส่วนลด</td>
                <td v-if='info != null'>{{(info[0].discount)?info[0].discount:0}}</td>
              </tr>
              <tr>
                <td colspan="3"></td>
                <td >ราคาสุทธิ</td>
                <td v-if='info != null'>{{(info[0].discount)?info[0].total_price_cart-info[0].discount:info[0].total_price_cart}}</td>
              </tr>
            </tbody>
          </table>

          <div class="columns">
            <div class="column card-content"><p class="card-header-title">ที่อยู่ที่จัดส่ง</p>
              <div class="content" v-if='info != null'>
              {{info[0].delivery_address}}
              </div>
            </div>
            <div class="column card-content"><p class="card-header-title">วิธีจัดส่ง</p>
              <div class="content">
              EMS
              </div>
            </div>
            <div class="column card-content"><p class="card-header-title">วิธีการชำระเงิน</p>
              <div class="content" v-if='info != null'>
              {{info[0].payment_type}}
              </div>
            </div>
          </div>

        </section>
        <footer class="modal-card-foot">
          <button class="button"  @click="showInfo = false;">Cancel</button>
        </footer>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "@/plugins/axios";
// @ is an alias to /src
import { required, alphaNum } from 'vuelidate/lib/validators'
export default {
  props: ["user"],
  data() {
    return {
      showEdit: false,
      tracking_num_edit:'',
      status_edit: null,
      carts: [],
      cart_id_edit: null,
      index_carts: null,
      showInfo:false,
      info: null,
      filter_pending: null,
      filter_shipped: null,
      filter_canceled: null,
    };
  },
  mounted() {
    this.getAllCart();
  },
  methods: {
    getAllCart(){
      axios
        .get(`http://localhost:3000/getAllCart`)
        .then((response) => {
          this.carts = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editTracking(cart, index){
      this.showEdit = true;
      this.tracking_num_edit = cart.tracking_number;
      this.status_edit = cart.order_status;
      this.index_carts = index;
      this.cart_id_edit = cart.cart_id;
    },
    saveTracking(){
      this.$v.$touch();
      if (!this.$v.$invalid) {
      axios
        .put(`http://localhost:3000/tracking_number`, {cart_id: this.cart_id_edit, tracking_number:this.tracking_num_edit, order_status: this.status_edit})
        .then((response) => {
          console.log(response.data)
          
          this.carts[this.index_carts].tracking_number = response.data.tracking_number;
          this.carts[this.index_carts].order_status = response.data.order_status;
        })
        .catch((error) => {
          console.log(error.response.data)
        });
      this.showEdit = false;
      }
    },
    showInfoCart(cart){
      this.showInfo = true
      axios
        .get(`http://localhost:3000/getInfo/${cart.user_id}/${cart.cart_id}`)
        .then((response) => {
          this.info = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  validations:{
    tracking_num_edit:{
      required: required,
      alphaNum: alphaNum
    },
  }
};
</script>
