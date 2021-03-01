<template>
    <div id="book" class="text-primary">
        <h1 class="text-5xl font-medium"> {{ book.name }} </h1>
        <div class="text-3xl">
            <div class="flex">
                <span class="flex items-center">
                    <svg width="36" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg"
                         class="stroke-current inline-block">
                        <path d="M30 32V29C30 27.4087 29.3679 25.8826 28.2426 24.7574C27.1174 23.6321 25.5913 23 24 23H12C10.4087 23 8.88258 23.6321 7.75736 24.7574C6.63214 25.8826 6 27.4087 6 29V32"
                              stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18 17C21.3137 17 24 14.3137 24 11C24 7.68629 21.3137 5 18 5C14.6863 5 12 7.68629 12 11C12 14.3137 14.6863 17 18 17Z"
                              stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="ml-2"> {{ book.author }} </span>
                </span>
                <span class="flex items-center ml-8">
                    <svg width="32" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg"
                         class="stroke-current inline-block">
                        <path d="M21 3.5H9C8.20435 3.5 7.44129 3.81607 6.87868 4.37868C6.31607 4.94129 6 5.70435 6 6.5V30.5C6 31.2956 6.31607 32.0587 6.87868 32.6213C7.44129 33.1839 8.20435 33.5 9 33.5H27C27.7956 33.5 28.5587 33.1839 29.1213 32.6213C29.6839 32.0587 30 31.2956 30 30.5V12.5L21 3.5Z"
                              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21 3.5V12.5H30" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M24 20H12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M24 26H12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15 14H13.5H12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="ml-2"> {{ book.pages }} </span>
                </span>
            </div>
            <div class="mt-10">
                <p class="text-3xl font-medium">Rozbory</p>
                <div class="mt-2">
                    <a v-for="(link, index) in analysisLinks" :key="index" :href="link.url" target="_blank" class="text-lg text-brand block mt-1">
                        {{ link.url }}
                    </a>
                </div>
                <div v-if="user.loggedIn && user.data.verified && (user.data.role === 'Admin' || user.data.role === 'Contributor')">
                    <InputField v-if="showAnalysisInput" v-model="newAnalysisLink" placeholder="Vložte odkaz" class="text-lg block mt-4"/>
                    <button v-if="!showAnalysisInput" @click="showAnalysisInput = true" type="button" class="text-primary text-lg mt-2">+ Přidat odkaz</button>
                    <button v-if="showAnalysisInput" @click="addLink('analysisLinks')" type="button" class="text-primary text-lg mt-2">Odeslat odkaz na kontrolu</button>
                </div>
            </div>
            <div class="mt-10">
                <p class="text-3xl font-medium">Audio knihy</p>
                <div v-if="audioBookLinks.length" class="mt-2">
                    <a v-for="(link, index) in audioBookLinks" :key="index" :href="link.url" target="_blank" class="text-lg text-brand block mt-1">
                        <span class="text-primary"> {{ getLinkType(link) }} -</span>
                        <span> {{ link.url.split("/")[2] }} </span>
                    </a>
                </div>
                <div v-if="user.loggedIn && user.data.verified && (user.data.role === 'Admin' || user.data.role === 'Contributor')">
                    <InputField v-if="showAudioBookInput" v-model="newAudioBookLink" placeholder="Vložte odkaz" class="text-lg mt-4"/>
                    <div v-if="showAudioBookInput" class="inline-block relative w-32 text-primary">
                        <select v-model="newAudioBookType" class="ml-2 text-lg focus:outline-none appearance-none bg-background border-2 border-brand rounded-lg pl-3 pr-12 py-1">
                            <option value="cracked">Cracklá</option>
                            <option value="free">Zdarma</option>
                            <option value="paid">Placená</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center mt-2">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    <button v-if="!showAudioBookInput" @click="showAudioBookInput = true" type="button" class="text-primary text-lg mt-2">+ Přidat odkaz</button>
                    <button v-if="showAudioBookInput" @click="addLink('audioBookLinks')" type="button" class="block text-primary text-lg mt-2">Odeslat odkaz na kontrolu</button>
                </div>
              <p v-if="user.loggedIn && !user.data.verified" class="text-lg mt-4 text-note">Pokud chcete přidávat odkazy ověřte si prosím svůj email</p>
              <p v-if="!user.loggedIn" class="text-lg mt-4 text-note">Víte o dalších audioknihách nebo rozborech? <router-link :to=" { name: 'signUp'}" class="underline">Přihlašte se</router-link> a přidejte je! Pomůžete tak dalším co tady hledají informace :)</p>
                <p v-if="showThankYouText && !this.errorMessage" class="text-lg mt-4 text-brand">Děkujeme za pomoc! Váš odkaz byl odeslán na schválení. Jakmile ho zkontrolujeme, přidáme vám fiktivní internetové bodíky. Jestli chcete, můžete se později podívat, jak jste se posunuli v tabulce!</p>
                <p v-if="this.errorMessage" class="text-lg text-red-500 mt-5">{{ this.errorMessage }}</p>
            </div>
            <div class="mt-10">
                <p class="text-3xl font-medium">Školy zahrnující tuto knihu</p>
                <span v-for="school in linkedSchools" :key="school.name" class="text-lg mr-2">{{school.name}}</span>
                <div v-if="user.loggedIn && user.data.verified && user.data.role === 'Admin'">
                    <div v-if="showSchoolInput" class="inline-block relative w-32 text-primary">
                        <select v-model="newSchoolLink" class="text-lg focus:outline-none appearance-none bg-background border-2 border-brand rounded-lg pl-3 pr-24 py-1">
                            <option v-for="school in schools" :key="school.name" :value="school.id">{{ school.name }}</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    <button v-if="!showSchoolInput" @click="showSchoolInput = true" type="button" class="text-primary text-lg mt-2">+ Přidat školu</button>
                    <button v-if="showSchoolInput" @click="addSchool(newSchoolLink)" type="button" class="block text-primary text-lg mt-2">Odeslat odkaz do systému</button>
                </div>
                <p class="text-lg mt-4 text-note">Bohužel nejsme schopni udržovat kompletní přehled o všech školách, je tak možné, že se zde vaše škola nemusí vyskytovat. Doporučujeme zkontrolovat seznam přímo na stránkách vaší školy.</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { db } from '../../db'
    import InputField from "../components/Core/InputField";
    import {mapGetters} from "vuex";
    import text from "@/text.json";
    import firebase from "firebase/app";

    export default {
        name: "Book",
        components: {
            InputField
        },
        data() {
            return {
                book: {},
                schools: [],
                linkedSchools: [],
                showAnalysisInput: false,
                showAudioBookInput: false,
                showSchoolInput: false,
                newSchoolLink: null,
                newAnalysisLink: null,
                newAudioBookLink: null,
                newAudioBookType: null,
                showThankYouText: false,
                errorMessage: null,
            }
        },
        created() {
            db.collection("books").doc(this.$route.params.id.split("_")[0]).get().then(doc => {
                if (doc.exists) {
                    this.book = doc.data();
                    if (doc.data().schoolList === undefined) {
                        db.collection("books").doc(this.$route.params.id.split("_")[0]).update({
                            schoolList: []
                        })
                    } else {
                        doc.data().schoolList.forEach(school => {
                            this.getSchool(school)
                        })
                    }
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        },
        computed: {
            ...mapGetters({
                user: "user"
            }),
            analysisLinks: function () {
                if (this.book.analysisLinks === undefined) {
                    return [];
                }

                const acceptedLinks = [];
                this.book.analysisLinks.forEach(link => {
                    if (link.status === "accepted") {
                        acceptedLinks.push(link);
                    }
                });

                return acceptedLinks;
            },
            audioBookLinks: function () {
                if (this.book.audioBookLinks === undefined) {
                    return [];
                }

                const acceptedLinks = [];
                this.book.audioBookLinks.forEach(link => {
                    if (link.status === "accepted") {
                        acceptedLinks.push(link);
                    }
                });

                return acceptedLinks;
            }
        },
        methods: {
            addSchool(school) {
                db.collection("books").doc(this.book.id).update({
                    schoolList: firebase.firestore.FieldValue.arrayUnion(school)
                })

                this.showSchoolInput = false;
                this.newSchoolLink = null;
            },
            getSchool(school) {
                db.collection("schools").doc(school).get().then(doc => {
                    if (doc.exists) {
                        this.linkedSchools.push(doc.data());
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });
            },
            getLinkType(link) {
                switch (link.type) {
                    case "paid":
                        return "Placená";
                    case "free":
                        return "Zdarma";
                    default:
                        return "Cracklá";
                }
            },
            addLink(type) {
                if (this.newAnalysisLink && type === "analysisLinks") {
                    if (this.newAnalysisLink.length > 150) {
                        this.errorMessage = text.errorMessages.linkTooLong
                        return;
                    }
                } else if (!this.newAnalysisLink && type === "analysisLinks"){
                    this.errorMessage = text.errorMessages.fieldEmpty
                    return;
                }

                if (type === "audioBookLinks" && (!this.newAudioBookType || !this.newAudioBookLink)) {
                    this.errorMessage = text.errorMessages.fieldEmpty
                    return;
                }

                if (type === "audioBookLinks" && this.newAudioBookLink) {
                    if (this.newAudioBookLink.length > 150) {
                        this.errorMessage = text.errorMessages.linkTooLong
                        return;
                    }
                }

                let newLinks = this.book[type];

                if (type === "analysisLinks") {
                    newLinks.push({
                        url: this.newAnalysisLink,
                        status: "pending",
                        createdBy: db.doc('users/' + this.user.data.uid)
                    });
                } else {
                    newLinks.push({
                        url: this.newAudioBookLink,
                        type: this.newAudioBookType,
                        status: "pending",
                        createdBy: db.doc('users/' + this.user.data.uid)
                    });
                }

                db.collection("books").doc(this.book.id).update({
                    [type]: newLinks
                }).then(() => {
                    this.showThankYouText = true
                }).catch(err => {
                    console.log(err)
                });

                this.showAnalysisInput = false;
                this.newAnalysisLink = null;
                this.showAudioBookInput = false;
                this.newAudioBookLink = null;
                this.newAudioBookType = null;
                this.errorMessage = null;
            }
        },
        firestore: {
            schools: db.collection("schools").orderBy("name")
        }
    }
</script>