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

// Sets up local user profile data
firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        return;
    }

    db.collection("users").doc(user.uid).get().then((doc) => {
        if (doc.exists) {
            store.dispatch("fetchUser", {
                uid: user.uid,
                displayName: doc.data().displayName,
                role: doc.data().role,
                contributions: doc.data().contributions,
                badges: doc.data().badges
            })
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
    console.log("Error getting documents: ", error);
    });
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
