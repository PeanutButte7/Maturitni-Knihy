<template>
    <div class="text-primary text-xl">
        <div v-for="(book, bookIndex) in books" :key="bookIndex">
            <p v-if="hasPendingLinks(book)">{{ book.name }}</p>
            <div v-for="(analysisLink, analysisLinkIndex) in book.analysisLinks" :key="analysisLinkIndex" class="text-lg text-note">
                <div v-if="analysisLink.status === 'pending'" class="mb-4 flex items-center">
                    <button @click="changeLinkStatus(book, analysisLinkIndex, 'accepted', 'analysisLinks')" type="button" class="mr-2">
                        <svg class="stroke-current text-brand inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </button>
                    <a :href="analysisLink.url" target="_blank"> {{ analysisLink.url }} </a>
                    <button @click="changeLinkStatus(book, analysisLinkIndex, 'denied', 'analysisLinks')" type="button" class="ml-2">
                        <svg class="text-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                    </button>
                </div>
            </div>
            <div v-for="(audioBookLinks, audioBookLinksIndex) in book.audioBookLinks" :key="audioBookLinksIndex + 100" class="text-lg text-note">
                <div v-if="audioBookLinks.status === 'pending'" class="mb-4 flex items-center border-b border-accent">
                    <button @click="changeLinkStatus(book, audioBookLinksIndex, 'accepted', 'audioBookLinks')" type="button" class="mr-2">
                        <svg class="stroke-current text-brand inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </button>
                    <a :href="audioBookLinks.url" target="_blank"> {{ audioBookLinks.url }} </a>
                    <button @click="changeLinkStatus(book, audioBookLinksIndex, 'denied', 'audioBookLinks')" type="button" class="ml-2">
                        <svg class="text-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {db} from "../../../db";

    export default {
        name: "PendingList",
        data() {
            return {
                books: []
            }
        },
        methods: {
            changeLinkStatus(book, index, status, type){
                let newLinks = book[type];
                newLinks[index].status = status;

                db.collection("books").doc(book.id).update({
                    [type]: newLinks
                }).then(function() {
                    console.log("Document successfully updated!");
                }).catch(err => {
                    console.log(err)
                })
            },
            hasPendingLinks(book) {
                let hasPendingLinks;

                book.analysisLinks.forEach(link => {
                    if (link.status === "pending") {
                        hasPendingLinks = true;
                    }
                });

                book.audioBookLinks.forEach(link => {
                    if (link.status === "pending") {
                        hasPendingLinks = true;
                    }
                });

                return hasPendingLinks;
            }
        },
        firestore: {
            books: db.collection("books").orderBy("name")
        }
    }
</script>

<style scoped>

</style>