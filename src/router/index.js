import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index"

import SignUp from "../views/SignUp";
import Login from "../views/Login";
import Home from "../views/Home";
import Admin from "../views/Admin/Admin";
import AdminAddBook from "../views/Admin/AdminAddBook";
import Book from "../views/Book";
import PendingList from "../views/Admin/PendingList";
import EditProfile from "../views/EditProfile";
import Faq from "@/views/Faq";
import Leaderboard from "@/views/Leaderboard";

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
        path: '/kniha/:id',
        name: 'book',
        component: Book,
        props: true
    },
    {
        path: '/profil/:id',
        name: 'profile',
        component: EditProfile,
        props: true
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        beforeEnter: (to, from, next) => {
            if (store.getters.user.data === null || store.getters.user.data.role !== "Admin") next({ name: 'home' });
            else next()
        },
        children: [
            {
                path: 'addBook',
                name: 'adminAddBook',
                component: AdminAddBook
            },
            {
                path: 'pendingList',
                name: 'pendingList',
                component: PendingList
            }
        ]
    },
    {
        path: '/faq',
        name: 'faq',
        component: Faq,
    },
    {
        path: '/zebricek',
        name: 'leaderboard',
        component: Leaderboard,
    }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
