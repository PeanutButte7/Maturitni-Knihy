<template>
    <div id="login" class="w-full max-w-xs">
        <form>
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
            <div class="flex items-center justify-between">
                <button @click="login" class="text-accent font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Sign in
                </button>
            </div>
        </form>
        <p>{{ this.errorMessage }}</p>
    </div>
</template>

<script>
    import firebase from "firebase";

    export default {
        name: "Login",
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
                    this.errorMessage = "Vyplňte všechny údaje";
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