<template>
    <div id="login">
        <form class="container mx-auto">
            <div class="mb-4">
                <InputLabel>Email</InputLabel>
                <InputField v-model="form.email" placeholder="paja69@gmail.com" type="email"/>
            </div>
            <div class="mb-12">
                <InputLabel>Heslo</InputLabel>
                <InputField v-model="form.password" placeholder="*********" type="password"/>
            </div>
            <div class="flex items-center justify-between">
                <button @click="login" class="bg-brand text-gray-900 font-bold border-2 border-brand rounded-lg px-6 py-1" type="button">Přihlásit se</button>
            </div>
            <p class="text-lg mt-4 text-note">Ještě nemáš účet? <router-link :to=" { name: 'signUp'}" class="underline">Vytvoř si ho!</router-link></p>
            <p class="text-lg mt-4 text-note"><router-link :to=" { name: 'forgotPassword'}" class="underline">Zapomenuté heslo</router-link></p>
            <p v-if="this.errorMessage" class="text-red-500 mt-5">{{ this.errorMessage }}</p>
        </form>
    </div>
</template>

<script>
    import firebase from "firebase";
    import InputLabel from "../components/Core/InputLabel";
    import InputField from "../components/Core/InputField";
    import text from "@/text.json";

    export default {
        name: "Login",
        components: {
            InputLabel,
            InputField
        },
        data() {
            return {
                form: {
                    email: null,
                    password: null,
                },
                errorMessage: null
            };
        },
        methods: {
            login() {
                if (!this.form.email || !this.form.password) {
                    this.errorMessage = text.errorMessages.missingDetails
                    return;
                }

                firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
                    .then(() => {
                        this.$router.replace({
                            name: "home"
                        });
                    })
                    .catch(() => {
                        this.errorMessage = "Špatný email nebo heslo"
                    });
            }
        }
    }
</script>