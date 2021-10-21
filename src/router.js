import { createRouter, createWebHashHistory } from 'vue-router'
import App                                    from './App.vue'

import Login                                  from './components/login.vue'
import SignUp                                 from './components/signUp.vue'


const routes = [
  {
    path: '/',
    name: 'root',
    component: App
  },
  {
    path: '/user/login',
    name: "login",
    component: Login
  },
  {
    path: '/user/signUp',
    name: "signup",
    component: SignUp
  },
  /*
  {
    path: '/cultivo/add',
    name: "addcultivo",
    component: AddCultivo
  }
  
  {
    path: '/user/home',
    name: "home",
    component: Home
  },
  {
    path: '/user/account',
    name: "account",
    component: Account
  }
  */
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
