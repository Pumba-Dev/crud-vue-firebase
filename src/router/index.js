import Vue from 'vue'
import VueRouter from 'vue-router'
import { getAuth } from "firebase/auth";
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import RegisterStepTwo from '../views/RegisterStepTwo.vue'
import Profile from '../views/Profile.vue'

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
    component: Login
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
      requiresAuth: true
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = getAuth().currentUser;
  // console.log(currentUser);
  const requiresAuth = to.matched.some(rec => rec.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

export default router
