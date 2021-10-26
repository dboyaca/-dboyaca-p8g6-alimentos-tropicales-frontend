import { createRouter, createWebHashHistory } from 'vue-router'
import App                                    from './App.vue'

import Login                                  from './components/login.vue'
import SignUp                                 from './components/signUp.vue'
import AddCultivo                             from './components/addCultivo.vue'
import Home                                   from './components/home.vue'

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
  
  {
    path: '/cultivo/add',
    name: "addcultivo",
    component: AddCultivo
  },

  {
    path: '/home',
    name: "home",
    component: Home
  }
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
