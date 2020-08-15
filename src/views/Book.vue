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
            </div>
            <div class="mt-10">
                <p class="text-3xl font-medium">Audio knihy</p>
                <div v-if="audioBookLinks.length" class="mt-2">
                    <a v-for="(link, index) in audioBookLinks" :key="index" :href="link.url" target="_blank" class="text-lg text-brand block mt-1">
                        <span class="text-primary"> {{ getLinkType(link) }} -</span>
                        <span> {{ link.url.split("/")[2] }} </span>
                    </a>
                    <p class="text-lg mt-4 text-note">Víš o dalších audio knihách nebo rozborech? Přihlaš se a přidej je! Pomůžeš tak dalším co tady hledají informace :)</p>
                </div>
                <p v-else class="text-lg mt-4 text-note">Vypadá to, že k této knize audio knihy nikdo nepřidal nebo neexistují. Jestli o nějaké víš, můžeš se přihlásit a doplnit ji!</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { db } from '../../db'

    export default {
        name: "Book",
        data() {
            return {
                book: {}
            }
        },
        created() {
            db.collection("books").doc(this.$route.params.id.split("_")[0]).get().then(doc => {
                if (doc.exists) {
                    this.book = doc.data();
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        },
        computed: {
            analysisLinks: function () {
                if (this.book.analysisLinks === undefined) {
                    return [];
                }

                const acceptedLinks = [];
                this.book.analysisLinks.forEach(link => {
                    if (link.status === "accepted") {
                        acceptedLinks.push(link);
                    }
                })

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
            getLinkType(link) {
                switch (link.type) {
                    case "paid":
                        return "Placená";
                    case "free":
                        return "Zdarma";
                    default:
                        return "Cracklá";
                }
            }
        }
    }
</script>