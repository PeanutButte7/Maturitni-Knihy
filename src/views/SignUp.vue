<template>
    <div id="signUp">
        <form class="container mx-auto">
            <div v-if="step === 'accountCreation'">
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
            <div class="text-center" v-else-if="step === 'loading'">
                <p class="text-xl font-bold text-primary">Vytváříme váš účet... mělo by být hotovo dřív než dočtete tuhle větu... snad...</p>
                <svg class="block mt-8 ml-auto mr-auto animate-spin h-20 w-20 text-brand" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
            <div v-else-if="step === 'nameCreation'">
                <div class="mb-12">
                    <InputLabel>Váš účet byl vytvořen, nyní doplňte jméno nebo přezdívku</InputLabel>
                    <InputField v-model="form.name" placeholder="Pája"/>
                </div>
                <div class="flex items-center justify-between">
                    <button @click="addName" class="bg-brand text-gray-900 font-bold border-2 border-brand rounded-lg px-6 py-1" type="button">Dokončit vytvoření</button>
                </div>
            </div>
            <p class="text-lg mt-4 text-note">Už máš účet? <router-link :to=" { name: 'login'}" class="underline">Přihlaš se!</router-link></p>
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
    import store from "@/store";

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
                errorMessage: null,
                step: "accountCreation"
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
                    .then(data => {
                        console.log(data.user.uid)
                        this.step = "loading"
                        setInterval(() => {
                            db.collection("users").doc(data.user.uid).get().then((doc) => {
                                if (doc.exists) {
                                    this.step = "nameCreation"

                                    store.dispatch("fetchUser", {
                                        uid: data.user.uid,
                                        displayName: doc.data().displayName,
                                        role: doc.data().role,
                                        contributions: doc.data().contributions,
                                        badges: doc.data().badges
                                    })
                                }
                            }).catch(function(error) {
                                console.log("Error getting documents: ", error);
                            });

                            if (this.step === "nameCreation") clearInterval();
                        }, 500)
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
                }).catch(err => {
                    this.errorMessage = err;
                });
            }
        }
    }
</script>

<style scoped>

</style>