import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

// Initializes connection to firestore
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

export const createUserInFirestore = functions.auth.user().onCreate((user) => {
    return db.collection("users").doc(user.uid).set({
            uid: user.uid,
            displayName: user.email,
            contributions: 0,
            banned: false,
            role: "Contributor"
    })
        .then(() => {
            console.log("User account created!");
        })
        .catch(error => {
            console.error("Error creating document: ", error);
        });
});