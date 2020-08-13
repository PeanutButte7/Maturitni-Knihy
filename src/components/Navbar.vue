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
                    <router-link to="signUp">Vytvořit účet</router-link>
                    <router-link to="login" class="ml-5">Přihlásit se</router-link>
                </span>
                <span v-if="user.loggedIn">
                    <router-link v-if="user.data.role === 'Admin'" to="admin" class="ml-5">Admin</router-link>
                    <span class="ml-5">Přihlášen jako: {{ user.data.displayName }}</span>
                        <!--        MOVE SIGNOUT TO PROFILE PAGE LATER-->
                    <button @click="signOut" class="ml-5 text-bold">Odhlásit</button>
                </span>
            </div>
        </div>
    </nav>
</template>

<script>
    import {mapGetters} from "vuex";
    import firebase from "firebase/app";


    export default {
        name: "Navbar",
        computed: {
            ...mapGetters({
                user: "user"
            })
        },
        methods: {
            signOut() {
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                        this.$router.replace({
                            name: "home"
                        });
                    });
            }

        }
    }
</script>