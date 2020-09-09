<template>
    <div id="editProfile" class="text-primary text-xl">
        <h1 class="text-5xl font-medium inline-block"> {{ user.displayName }} </h1>
        <p class="inline-block ml-5">Počet příspěvků: {{ user.contributions }}</p>
        <button v-if="!showEditNameInput" @click="showEditNameInput = true" class="text-brand text-bold block">Upravit jméno</button>
        <div v-if="showEditNameInput" class="my-5">
            <InputField v-model="newName" placeholder="Zadejte nové jméno" class="text-lg block"/>
            <button @click="changeName" type="button" class="text-primary text-lg mt-2">Změnit jméno</button>
            <p v-if="this.errorMessage" class="text-red-500 mt-5 text-lg">{{ this.errorMessage }}</p>
        </div>
        <button @click="signOut" class="mt-10 text-brand text-bold block">Odhlásit se</button>
    </div>
</template>

<script>
    import {db} from "../../db";
    import firebase from "firebase";
    import InputField from "../components/Core/InputField";

    export default {
        name: "EditProfile",
        components: {
            InputField
        },
        data() {
            return {
                user: {},
                showEditNameInput: false,
                newName: null,
                errorMessage: null
            }
        },
        created() {
            db.collection("users").doc(this.$route.params.id).get().then(doc => {
                if (doc.exists) {
                    this.user = doc.data();
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        },
        methods: {
            signOut() {
                firebase.auth().signOut().then(() => {
                    this.$router.replace({
                        name: "home"
                    });
                });
            },
            changeName() {
               if (this.newName == null) {
                   this.errorMessage = "Jméno nesmí být prázdné"
               } else if (this.newName.length > 30) {
                   this.errorMessage = "Jméno nesmí mít více jak 30 znaků"
               }

               db.collection("users").doc(this.user.uid).update({
                   displayName: this.newName
               }).then(() => {
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