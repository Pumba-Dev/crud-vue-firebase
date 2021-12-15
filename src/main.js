import Vue from 'vue'
import App from './App.vue'
import "./reset.css"
// Vue Router
import router from './router'
// Import FireBase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Import BootStrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

let firebaseConfig = {
  apiKey: "AIzaSyDjSvk2lj12LWpzFhn3rNMTfS2di_5Qi9k",
  authDomain: "api-medclub.firebaseapp.com",
  databaseURL: "https://api-medclub-default-rtdb.firebaseio.com",
  projectId: "api-medclub",
  storageBucket: "api-medclub.appspot.com",
  messagingSenderId: "309215446723",
  appId: "1:309215446723:web:c3c0fd1c15b9b176a70476",
  measurementId: "G-4ENZY993DS"
};
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();

Vue.use(db)
Vue.use(firebase)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
