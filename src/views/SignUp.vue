<template>
    <div id="signUp">
        <form class="container mx-auto">
            <div v-if="!user.loggedIn">
                <div class="mb-4">
                    <InputLabel>Email</InputLabel>
                    <InputField v-model="form.email" placeholder="paja69@gmail.com" type="email"/>
                </div>
                <div class="mb-4">
                    <InputLabel>Heslo</InputLabel>
                    <InputField v-model="form.password" placeholder="*********" type="password"/>
                </div>
                <div class="mb-12">
                    <InputLabel>Heslo znovu</InputLabel>
                    <InputField v-model="form.passwordRepeat" placeholder="*********" type="password"/>
                </div>
                <div class="flex items-center justify-between">
                    <button @click="signUp" class="bg-brand text-gray-900 font-bold border-2 border-brand rounded-lg px-6 py-1" type="button">Vytvořit účet</button>
                </div>
            </div>
            <div v-else>
                <div class="mb-12">
                    <InputLabel>Váš účet byl vytvořen, nyní doplňte jméno nebo přezdívku</InputLabel>
                    <InputField v-model="form.name" placeholder="Pája"/>
                </div>
                <div class="flex items-center justify-between">
                    <button @click="addName" class="bg-brand text-gray-900 font-bold border-2 border-brand rounded-lg px-6 py-1" type="button">Dokončit vytvoření</button>
                </div>
            </div>
            <p v-if="this.errorMessage" class="text-red-500 mt-5">{{ this.errorMessage }}</p>
        </form>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import firebase from "firebase/app";
    import InputLabel from "../components/Core/InputLabel";
    import InputField from "../components/Core/InputField";
    import {db} from "../../db";

    export default {
        name: "SignUp",
        components: {
            InputField,
            InputLabel
        },
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
        computed: {
            ...mapGetters({
                user: "user"
            })
        },
        methods: {
            signUp() {
                if (!this.form.email || !this.form.password || this.form.password !== this.form.passwordRepeat) {
                    if (this.form.password !== this.form.passwordRepeat) {
                        this.errorMessage = "Hesla nejsou stejná"
                    }
                    else {
                        this.errorMessage = "Vyplňte všechny údaje"
                    }
                    return;
                }

                firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password)
                    .then(() => {
                        location.reload();
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
            },
            addName() {
                if (!this.form.name) {
                    this.errorMessage = "Jméno nesmí být prázdné"
                    return;
                } else if (this.form.name.length > 30) {
                    this.errorMessage = "Jméno nesmí mít více jak 30 znaků"
                    return;
                }

                db.collection("users").doc(this.user.data.uid).update({
                    displayName: this.form.name
                }).then(() => {
                    this.$router.push({ name: "home" });
                    location.reload();
                }).catch(err => {
                    this.errorMessage = err;
                });
            }
        }
    }
</script>

<style scoped>

</style>