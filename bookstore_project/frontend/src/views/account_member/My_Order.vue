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
        <div class="has-text-centered">คำสั่งซื้อของฉัน</div>

        <!-- ตาราง -->
        <div class="table-container has-text-centered">
          <table class="table mt-5 is-fullwidth table is-hoverable" style="border-style: solid">
            <thead style="background-color:#CDBE78">
              <tr class="is-size-4">
                <th>หมายเลขคำสั่งซื้อ</th>
                <th>วัน เวลา</th>
                <th>หมายเลขติดตาม</th>
                <th>ยอดการซื้อ</th>
                <th>สถานะ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cart in carts" :key="cart.cart_id">
                <td>{{cart.cart_id}}</td>
                <td>{{cart.create_date}}</td>
                <td>{{cart.tracking_number}}</td>
                <td>{{cart.total_price}}</td>
                <td>{{cart.order_status}}</td>
                <button class="button is-info mt-1 ml-3" @click="showInfoCart(cart)">รายละเอียด</button>
              </tr>
            </tbody>
          </table>
        </div>
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
export default {
  props: ["user"],
  data() {
    return {
      carts:[],
      showInfo:false,
      book_name:'',
      book_id:'',
      book_price:'',
      item_quantity:'',
      discount: '',
      total_price: '',
      info:null,
    };
  },
   mounted() {
    this.getCart();
  },
  methods: {
    getCart(){
      axios
        .get(`http://localhost:3000/getCartMember/${this.user.user_id}`)
        .then((response) => {
          this.carts = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showInfoCart(cart){
      this.showInfo = true
      axios
        .get(`http://localhost:3000/getInfo/${this.user.user_id}/${cart.cart_id}`)
        .then((response) => {
          this.info = response.data;
          console.log(this.info)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>
