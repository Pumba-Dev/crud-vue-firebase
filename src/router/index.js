import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginScreen from '../views/login/LoginScreen.vue'
import Register from '../views/register/Register.vue'
import RegisterStepTwo from '../views/register/RegisterStepTwo.vue'
import ProfileView from '../views/profile/ProfileView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginScreen
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/register2',
    name: 'register2',
    component: RegisterStepTwo,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/home',
    name: 'home',
    component: ProfileView,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
