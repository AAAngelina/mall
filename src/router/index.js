import Vue from 'vue'
import VueRouter from 'vue-router'


//1.安装插件
Vue.use(VueRouter)

//2.创建路由对象
const Home = () => import('../views/home/Home')  /*路由懒加载*/
const Profile = () => import('../views/profile/Profile')
const Category = () => import('../views/category/Category')
const Shopping = () => import('../views/shopping/Shopping')

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopping',
    component: Shopping
  },
  {
    path: '/profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//3.导出 router
export default router
