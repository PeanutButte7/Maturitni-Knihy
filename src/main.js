import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { firestorePlugin } from 'vuefire'

import * as firebase from "firebase/app"
import "firebase/auth";
import 'firebase/firestore'

import './styles/index.css';
import {db} from "../db";

Vue.config.productionTip = false;
Vue.use(firestorePlugin);

firebase.auth().onAuthStateChanged(user => {
  db.collection("users").doc(user.uid).get().then((doc) => {
    if (doc.exists) {
      console.log("Document data:", doc.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

    console.log("lol");
    store.dispatch("fetchUser", user)
  }).catch(function(error) {
    console.log("Error getting documents: ", error);
  });
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
