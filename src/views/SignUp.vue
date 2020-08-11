<template>
    <div id="signUp" class="w-full max-w-xs">
        <form>
            <div class="mb-4">
                <label class="block text-primary font-bold mb-2" for="name">
                    Username
                </label>
                <input v-model="form.name" id="name" type="text" placeholder="E-mail" class="border rounded w-full py-2 px-3 text-primary focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-6">
                <label class="block text-primary font-bold mb-2" for="email">
                    E-mail
                </label>
                <input v-model="form.email" id="email" type="text" placeholder="E-mail" class="border rounded w-full py-2 px-3 text-primary focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-6">
                <label class="block text-primary font-bold mb-2" for="password">
                    Password
                </label>
                <input v-model="form.password" id="password" type="password" placeholder="******************" class="border rounded w-full py-2 px-3 text-primary focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-6">
                <label class="block text-primary font-bold mb-2" for="password-repeat">
                    Repeat password
                </label>
                <input v-model="form.passwordRepeat" id="password-repeat" type="password" placeholder="******************" class="border rounded w-full py-2 px-3 text-primary focus:outline-none focus:shadow-outline">
            </div>
            <div class="flex items-center justify-between">
                <button @click="signUp" class="text-accent font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Sign Up
                </button>
            </div>
        </form>
        <p>{{ this.errorMessage }}</p>
    </div>
</template>

<script>
    import firebase from "firebase/app";
    import { db } from "../../db.js"

    export default {
        name: "SignUp",
        data() {
            return {
                form: {
                    name: null,
                    email: null,
                    password: null,
                    passwordRepeat: null
                },
                errorMessage: null
            };
        },
        methods: {
            signUp() {
                if (!this.form.email || !this.form.password || this.form.password !== this.form.passwordRepeat) {
                    if (this.form.password !== this.form.passwordRepeat) {
                        this.errorMessage = "Hesla nejsou stejná"
                    } else {
                        this.errorMessage = "Vyplňte všechny údaje"
                    }
                    return;
                }

                firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password)
                    .then(data => {
                        data.user.updateProfile({
                            displayName: this.form.name,
                        });

                        db.collection("users").doc(firebase.auth().currentUser.uid).set({
                            uid: firebase.auth().currentUser.uid,
                            displayName: this.form.name,
                            contributions: 0,
                            badges: null
                        });
                    })
                    .catch(err => {
                        if (err.code === "auth/weak-password") {
                            this.errorMessage = "Heslo musí mít minimálně 6 znaků"
                        } else if (err.code === "auth/email-already-in-use") {
                            this.errorMessage = "Email už je používán jiným účtem"
                        } else {
                            this.errorMessage = err.message;
                        }
                    });
            }
        }
    }
</script>

<style scoped>

</style>