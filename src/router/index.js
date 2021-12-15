import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/login/LoginView.vue'
import RegisterStepOneView from '../views/register/RegisterStepOneView.vue'
import RegisterStepTwoView from '../views/register/RegisterStepTwoView.vue'
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
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterStepOneView
  },
  {
    path: '/register2',
    name: 'register2',
    component: RegisterStepTwoView,
    meta: {
      requiresAuth: true
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
