<template>
    <div id="forgotPassword">
        <form class="container mx-auto">
            <div class="mb-4">
                <InputLabel>Zadejte email od svého účtu</InputLabel>
                <InputField v-model="email" placeholder="paja69@gmail.com" type="email"/>
                <p v-if="sent" class="text-note mt-2">Byl vám poslán obnovovací email na zadanou adresu</p>
            </div>
            <div class="flex items-center justify-between">
                <button @click="changePassword" class="bg-brand text-gray-900 font-bold border-2 border-brand rounded-lg px-6 py-1" type="button">Odeslat</button>
            </div>
        </form>
    </div>
</template>

<script>
    import firebase from "firebase";
    import InputLabel from "../components/Core/InputLabel";
    import InputField from "../components/Core/InputField";

    export default {
        name: "ForgotPassword",
        components: {
            InputLabel,
            InputField
        },
        data() {
            return {
                email: null,
                sent: false
            };
        },
        methods: {
            changePassword(){
                firebase.auth().sendPasswordResetEmail(this.email).then(() => {
                    this.sent = true
                }).catch(error => {
                    console.log(error)
                });
            }
        }
    }
</script>