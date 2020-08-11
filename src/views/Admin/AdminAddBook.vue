<template>
    <div id="adminAddBook">
        <form>
            <div class="mb-6">
                <InputLabel>Název knihy</InputLabel>
                <InputField v-model="form.name" placeholder="Máj"/>
            </div>
            <div class="mb-12">
                <InputLabel>Autor</InputLabel>
                <InputField v-model="form.author" placeholder="Karel Hynek Mácha"/>
            </div>
            <div class="mb-12">
                <InputLabel>Počet stran</InputLabel>
                <InputField v-model="form.pages" placeholder="420"/>
            </div>
            <div class="mb-6">
                <InputLabel>Odkazy na rozbory</InputLabel>
                <div v-for="(link, index) in form.analysisLinks" :key="index" class="flex items-center mb-3">
                    <InputField v-model="link.url" placeholder=""/>
                    <button @click="deleteAnalysisLink(index)" type="button" class="ml-3 text-primary">
                        <svg class="text-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                    </button>
                </div>
                <button @click="addAnalysisLink" type="button" class="text-primary mt-1 mt-2">+ Přidat odkaz</button>
            </div>
            <div class="mb-6">
                <InputLabel>Odkazy na audioknihy</InputLabel>
                <div v-for="(link, index) in form.audioBookLinks" :key="index" class="flex items-center mb-3">
                    <InputField v-model="link.url" placeholder=""/>
                    <div class="inline-block relative w-32 text-primary">
                        <select v-model="link.type" class="ml-4 w-full focus:outline-none appearance-none bg-background border-2 border-brand rounded-lg px-3 py-1">
                            <option value="cracked">Cracklá</option>
                            <option value="free">Zdarma</option>
                            <option value="paid">Placená</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    <button @click="deleteAudioBookLink(index)" type="button" class="ml-8 text-primary">
                        <svg class="text-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                    </button>
                </div>
                <button @click="addAudioBookLink" type="button" class="text-primary mt-2">+ Přidat odkaz</button>
            </div>
            <div class="flex items-center justify-between">
                <button @click="createBook" class="bg-brand text-gray-900 font-bold border-2 border-brand rounded-lg px-6 py-1" type="button">Vytvořit knihu</button>
            </div>
        </form>
        <p v-if="this.errorMessage" class="text-red-500 mt-5">{{ this.errorMessage }}</p>
        <p v-if="uploadSuccessful" class="text-brand mt-5">Kniha byla nahrána do databáze</p>
    </div>
</template>

<script>
    import InputField from "../../components/Core/InputField";
    import InputLabel from "../../components/Core/InputLabel";
    import {db} from "../../../db";
    import {mapGetters} from "vuex";

    export default {
        name: "AdminAddBook",
        components: {
            InputField,
            InputLabel
        },
        data() {
            return {
                form: {
                    name: null,
                    author: null,
                    pages: null,
                    analysisLinks: [],
                    audioBookLinks: []
                },
                errorMessage: null,
                uploadSuccessful: false,
            };
        },
        computed: {
            ...mapGetters({
                user: "user",

            })
        },
        methods: {
            createBook() {
                if (!this.form.name || !this.form.author || !this.form.pages) {
                    this.errorMessage = "Vyplňte všechny informace";
                    return;
                }

                let hasError;

                this.form.analysisLinks.forEach(link => {
                    if (link.url === "") {
                        this.errorMessage = "Vyplňte odkazy k rozborům";
                        hasError = true;
                    }
                });

                this.form.audioBookLinks.forEach(link => {
                    if (link.url === "" || link.type === "") {
                        this.errorMessage = "Vyplňte odkazy a typy odkazů k audioknihám";
                        hasError = true;
                    }
                });

                if (isNaN(this.form.pages)) {
                    this.errorMessage = "Počet stran musí být zadán jako číslo";
                    hasError = true;
                }

                if (hasError) {
                    return;
                }

                db.collection("books").add({
                    name: this.form.name,
                    author: this.form.author,
                    pages: parseInt(this.form.pages, 10),
                    analysisLinks: this.form.analysisLinks,
                    audioBookLinks: this.form.audioBookLinks
                }).then(() => {
                    this.errorMessage = null;
                    this.uploadSuccessful = true;
                }).catch(err => {
                    console.log(err)
                });
            },
            addAnalysisLink() {
                this.form.analysisLinks.push({url: "", status: "pending", createdBy: db.doc('users/' + this.user.data.uid)})
            },
            deleteAnalysisLink(index) {
                this.form.analysisLinks.splice(index, 1);
            },
            addAudioBookLink(){
                this.form.audioBookLinks.push({url: "", type: "", status: "pending", createdBy: db.doc('users/' + this.user.data.uid)})
            },
            deleteAudioBookLink(index){
                this.form.audioBookLinks.splice(index, 1);
            }
        }
    }
</script>

<style scoped>

</style>