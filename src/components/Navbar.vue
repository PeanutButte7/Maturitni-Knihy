<template>
    <nav id="navbar" class="flex items-center justify-between flex-wrap text-primary text-lg">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
            <router-link to="/" class="text-brand">Hlavní stránka</router-link>
        </div>
        <div class="w-full block flex-grow flex items-center lg:w-auto ml-5">
            <div class="flex-grow">
                <router-link to="/" class="text-accent">FAQ</router-link>
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
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Navbar",
        computed: {
            ...mapGetters({
                user: "user"
            })
        }
    }
</script>