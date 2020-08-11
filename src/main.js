import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import * as firebase from "firebase/app"
import "firebase/auth";
import 'firebase/firestore'

import './styles/index.css';

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
