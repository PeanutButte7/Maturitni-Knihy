<template>
    <div id="navbar" class="text-right text-xl text-primary">
        <span v-if="!user.loggedIn">
            <router-link to="signUp">Vytvořit účet</router-link>
            <router-link to="login" class="ml-5">Přihlásit se</router-link>
        </span>
        <router-link to="admin" class="ml-5">Admin</router-link>
        <span v-if="user.loggedIn" class="ml-5">Přihlášen jako: {{ user.data === null ?  "" : user.data.displayName}}</span>
<!--        MOVE SIGNOUT TO PROFILE PAGE LATER-->
        <button v-if="user.loggedIn" @click="signOut" class="ml-5 text-bold">Odhlásit</button>
    </div>
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