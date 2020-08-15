<template>
    <div id="book" class="text-primary">
        <h1 class="text-6xl font-medium"> {{ book.name }} </h1>
        <div class="text-3xl">
            <span>{{ book.author }}</span>
            <span> {{ book.pages }}</span>
            <div class="mt-10">
                <p class="text-3xl font-medium">Rozbory</p>
                <a v-for="(link, index) in book.analysisLinks" :key="index" :href="link.url" target="_blank" class="text-lg text-brand block">
                    {{ link.url }}
                </a>
            </div>
            <div class="mt-10">
                <p class="text-3xl font-medium">Audio knihy</p>
                <a v-for="(link, index) in book.audioBookLinks" :key="index" :href="link.url" target="_blank" class="text-lg text-brand">
                    <span class="text-primary"> {{ getLinkType(link) }} -</span>
                    <span> {{ link.url.split("/")[2] }} </span>
                </a>
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