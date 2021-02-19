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
            <div v-else-if="step === 'emailVerification'" class="text-center">
                <p class="text-xl font-bold text-primary">Účet byl vytvořen a byl vám zaslán verifikační email. Po jeho ověření budete moci začít přidávat příspěvky. Také si můžete změnit jméno na vašem profilu.</p>
            </div>
            <p v-if="step === 'accountCreation'" class="text-lg mt-4 text-note">Už máš účet? <router-link :to=" { name: 'login'}" class="underline">Přihlaš se!</router-link></p>
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
    import text from "@/text.json";

    export default {
        name: "SignUp",
        components: {
            InputField,
            InputLabel
        },
        data() {
            return {
                form: {
                    email: null,
                    password: null,
                    passwordRepeat: null,
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
                        this.errorMessage = text.errorMessages.missingDetails
                    }
                    return;
                }

                firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password)
                    .then(data => {
                        console.log(data.user.uid)
                        this.step = "loading"
                        setInterval(() => {
                            db.collection("users").doc(data.user.uid).get().then((doc) => {
                                if (doc.exists && this.step === "loading") {
                                    this.step = "emailVerification"

                                    store.dispatch("fetchUser", {
                                        uid: data.user.uid,
                                        displayName: doc.data().displayName,
                                        role: doc.data().role,
                                        contributions: doc.data().contributions,
                                        badges: doc.data().badges,
                                        verified: firebase.auth().currentUser.emailVerified
                                    })

                                    this.verifyEmail(data.user.uid)
                                }
                            }).catch(function(error) {
                                console.log("Error getting documents: ", error);
                            });

                            if (this.step === "emailVerification") clearInterval();
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
            verifyEmail() {
                firebase.auth().currentUser.sendEmailVerification().then(function() {
                    console.log("Email sent")
                }).catch(function(error) {
                    console.log(error)
                });
            }
        }
    }
</script>

<style scoped>

</style>