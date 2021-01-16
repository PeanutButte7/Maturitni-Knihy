<template>
    <div id="navbar">
        <nav id="desktop-menu" class="hidden lg:flex items-center justify-between flex-wrap text-primary text-lg">
            <div class="flex items-center flex-shrink-0 text-white mr-6">
                <router-link to="/" class="text-brand">Hlavní stránka</router-link>
            </div>
            <div class="w-full block flex-grow flex items-center lg:w-auto ml-5">
                <div class="flex-grow">
                    <router-link :to=" { name: 'faq' }" class="font-light">Otázky a odpovědi</router-link>
                </div>
                <div>
                <span v-if="!user.loggedIn">
                    <router-link :to=" { name: 'signUp'}">Vytvořit účet</router-link>
                    <router-link :to=" { name: 'login'}" class="ml-5">Přihlásit se</router-link>
                </span>
                    <div v-if="user.loggedIn" class="inline-flex items-start">
                        <router-link v-if="user.data.role === 'Admin'" :to=" { name: 'admin' }" class="mr-5">Admin</router-link>
                        <svg width="24" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg" class="stroke-current inline-block">
                            <path d="M30 32V29C30 27.4087 29.3679 25.8826 28.2426 24.7574C27.1174 23.6321 25.5913 23 24 23H12C10.4087 23 8.88258 23.6321 7.75736 24.7574C6.63214 25.8826 6 27.4087 6 29V32"
                                  stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M18 17C21.3137 17 24 14.3137 24 11C24 7.68629 21.3137 5 18 5C14.6863 5 12 7.68629 12 11C12 14.3137 14.6863 17 18 17Z"
                                  stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <router-link :to="{ name: 'profile', params: { id: user.data.uid  } }" class="ml-1">{{ user.data.displayName }}</router-link>
                    </div>
                </div>
            </div>
        </nav>
        <nav id="mobile-menu" class="lg:hidden grid grid-cols-2">
            <router-link @click.native="disableMenu()" to="/" class="inline text-lg text-brand">Hlavní stránka</router-link>
            <div class="inline-flex justify-end">
<!--                Profile -->
                <router-link @click.native="disableMenu()" v-if="user.loggedIn" :to="{ name: 'profile', params: { id: user.data.uid } }" class="mr-4">
                    <svg width="24" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg" class="stroke-current inline-block text-primary">
                        <path d="M30 32V29C30 27.4087 29.3679 25.8826 28.2426 24.7574C27.1174 23.6321 25.5913 23 24 23H12C10.4087 23 8.88258 23.6321 7.75736 24.7574C6.63214 25.8826 6 27.4087 6 29V32"
                              stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18 17C21.3137 17 24 14.3137 24 11C24 7.68629 21.3137 5 18 5C14.6863 5 12 7.68629 12 11C12 14.3137 14.6863 17 18 17Z"
                              stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </router-link>
<!--                Signup-->
                <router-link @click.native="disableMenu()" v-else :to="{ name: 'signUp' }" class="mr-4">
                    <svg width="24" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg" class="stroke-current inline-block text-primary">
                        <path d="M30 32V29C30 27.4087 29.3679 25.8826 28.2426 24.7574C27.1174 23.6321 25.5913 23 24 23H12C10.4087 23 8.88258 23.6321 7.75736 24.7574C6.63214 25.8826 6 27.4087 6 29V32"
                              stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18 17C21.3137 17 24 14.3137 24 11C24 7.68629 21.3137 5 18 5C14.6863 5 12 7.68629 12 11C12 14.3137 14.6863 17 18 17Z"
                              stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </router-link>
<!--                Hamburger menu button-->
                <button type="button" @click="switchMenu()">
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="stroke-current text-primary">
                        <path d="M3 12H21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 6H21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 18H21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div v-if="menuActive" class="col-span-2 text-3xl font-medium text-center text-primary mt-20">
<!--                <router-link v-if="user.loggedIn && user.data.role === 'Admin'" :to=" { name: 'admin' }" @click.native="switchMenu()" class="block mt-2">Admin</router-link>-->
                <router-link :to=" { name: 'faq' }" @click.native="disableMenu()" class="block">Otázky a odpovědi</router-link>
                <router-link :to=" { name: 'home' }" @click.native="disableMenu()" class="block mt-8">Tabulka</router-link>
            </div>
        </nav>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import store from "@/store";

    export default {
        name: "Navbar",
        computed: {
            ...mapGetters({
                user: "user",
                menuActive: "menuActive"
            })
        },
        methods: {
            switchMenu() {
                store.dispatch("setMenuActive", !this.menuActive)
            },
            disableMenu(){
                store.dispatch("setMenuActive", false)
            }
        }
    }
</script>