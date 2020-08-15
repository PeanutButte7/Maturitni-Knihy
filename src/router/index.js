import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index"

import SignUp from "../views/SignUp";
import Login from "../views/Login";
import Home from "../views/Home";
import Admin from "../views/Admin/Admin";
import AdminAddBook from "../views/Admin/AdminAddBook";
import Book from "../views/Book";


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUp
    },
    {
        path: '/book/:id',
        name: 'book',
        component: Book,
        props: true
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        beforeEnter: (to, from, next) => {
            if (store.getters.user.data.role === "Admin") next();
            else next({ name: 'home' })
        },
        children: [
            {
                path: 'addBook',
                name: "adminAddBook",
                component: AdminAddBook
            }
        ]
    }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
