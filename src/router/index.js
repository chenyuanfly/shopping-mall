import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Home from '../views/main/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    name:"Layout",
    component: Layout,
    children:[
      {
        path:'',
        name:'Home',
        component: Home,
        meta:{
          isLogin:true
        }
      },
      {
        path:"cart",
        name:'Cart',
        component:() => import("../views/main/Cart.vue"),
        meta:{
          isLogin:true
        }
      },
      {
        path:"params",
        name:'Params',
        component:() => import("../views/main/Params.vue"),
        meta:{
          isLogin:true
        }
      },
      {
        path:"product",
        name:'Product',
        component:() => import("../views/main/Product.vue"),
        meta:{
          isLogin:true
        }
      },
    ]
  },
  {
    path:"/login",
    name:'Login',
    component:() => import("../views/Login.vue")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
