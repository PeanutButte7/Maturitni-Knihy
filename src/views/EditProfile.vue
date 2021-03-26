<template>
    <div id="editProfile" class="text-primary text-xl">
        <h1 class="text-5xl font-medium inline-block"> {{ user.data.displayName }} </h1>
        <p class="inline-block ml-5">Počet příspěvků: {{ user.data.contributions }}</p>
        <button v-if="!showEditNameInput" @click="showEditNameInput = true" class="text-brand text-bold block">Upravit jméno</button>
        <div v-if="showEditNameInput" class="my-5">
            <InputField v-model="newName" placeholder="Zadejte nové jméno" class="text-lg block"/>
            <button @click="changeName" type="button" class="text-primary text-lg mt-2">Změnit jméno</button>
            <p v-if="this.errorMessage" class="text-red-500 mt-5 text-lg">{{ this.errorMessage }}</p>
        </div>
        <button @click="signOut" class="mt-10 text-note text-bold block">Odhlásit se</button>
    </div>
</template>

<script>
    import {db} from "../../db";
    import firebase from "firebase";
    import InputField from "../components/Core/InputField";
    import store from "@/store";
    import {mapGetters} from "vuex";
    import text from "@/text.json";

    export default {
        name: "EditProfile",
        components: {
            InputField
        },
        data() {
            return {
                showEditNameInput: false,
                newName: null,
                errorMessage: null
            }
        },
        computed: {
          ...mapGetters({
            user: "user"
          })
        },
        methods: {
            signOut() {
                firebase.auth().signOut().then(() => {
                    store.dispatch("fetchUser", null)
                    this.$router.replace({
                        name: "home"
                    });
                });
            },
            changeName() {
               if (this.newName == null) {
                   this.errorMessage = text.errorMessages.nameEmpty
                   return;
               } else if (this.newName.length > 30) {
                   this.errorMessage = text.errorMessages.nameTooLong
                   return;
               }

               db.collection("users").doc(this.user.data.uid).update({
                   displayName: this.newName
               }).then(() => {
                   store.dispatch("changeUserDisplayName", this.newName)
                   this.newName = null;
                   this.showEditNameInput = null;
                   this.errorMessage = null;
               }).catch(err => {
                   this.errorMessage = err;
               });
            }
        }
    }
</script>