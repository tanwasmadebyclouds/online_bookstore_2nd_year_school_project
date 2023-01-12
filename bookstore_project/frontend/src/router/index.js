import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { guess: true },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/shop/',
    name: 'shop',
    meta: { guess: true },
    component: () => import('../views/ShopPage.vue')
  },
  {
    path: '/contact/',
    name: 'contact',
    meta: { guess: true },
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/Payment/',
    name: 'contact',
    
    meta: { guess: true },
    component: () => import('../views/Payment.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: { guess: true },
    component: () => import('../views/DetailBook.vue')
  },
  {
    path: '/user/signup',
    name: 'signup',
    meta: { guess: true },
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/user/login',
    name: 'login',
    meta: { guess: true },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/my-account',
    name: 'my-account',
    
    meta: { member: true },
    component: () => import('../views/account_member/My_Account.vue')
  },
  {
    path: '/my-order',
    name: 'my-order',
    
    meta: { member: true },
    component: () => import('../views/account_member/My_Order.vue')
  },
  {
    path: '/my-address',
    name: 'my-address',
    
    meta: { member: true },
    component: () => import('../views/account_member/My_Address.vue')
  },
  {
    path: '/my-account-admin',
    name: 'my-account-admin',
    
    meta: { admin: true },
    component: () => import('../views/account_admin/My_Account_Admin.vue')
  },
  {
    path: '/all-order',
    name: 'all-order',
    
    meta: { admin: true },
    component: () => import('../views/account_admin/All_Order.vue')
  },
  {
    path: '/update-book',
    name: 'update-book',
    
    meta: { admin: true },
    component: () => import('../views/account_admin/Update_Book.vue')
  },
  {
    path: '/update-code-promotion',
    name: 'update-code-promotion',
    
    meta: { admin: true },
    component: () => import('../views/account_admin/Update_Code_Promotion.vue')
  },
]

const router = new VueRouter({ routes })
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')
  const isRole = localStorage.getItem('role')
  console.log(isLoggedIn)
  console.log(isRole)

  if (to.meta.member && !isLoggedIn) {
    alert('Please login first!')
    next({ path: '/user/login' })
  }
  if (to.meta.admin && !isLoggedIn) {
    alert('Please login first!')
    next({ path: '/user/login' })
  }
  if(to.meta.admin && isLoggedIn && isRole !== "employee"){
    alert('You not admin!')
    next({ path: '/my-account' })
  }

  if(to.meta.member && isLoggedIn && isRole !== "member"){
    alert('You not member!')
    next({ path: '/my-account-admin' })
  }

  if (to.meta.guess && isLoggedIn) {
  }
  next()
})

export default router
