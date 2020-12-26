<template>
    <div id="Home">
        <h1 class="text-center text-4xl lg:text-6xl font-medium text-brand">Maturitní knihy</h1>
        <h2 class="text-center text-xl lg:text-3xl text-primary">Kompletní databáze rozborů a audio knih k maturitě</h2>
        <div id="searchSection" class="mt-10 lg:mt-16">
            <div id="filters" class="mb-2">
                <Checkbox v-model="searchForAuthor" checkboxId="authorCheckbox" class="inline-block">Vyhledat dle autora</Checkbox>
                <Checkbox  v-model="onlyAudioBooks" checkbox-id="audioBookCheckbox" class="inline-block lg:ml-10 mt-2 lg:mt-0">Pouze tituly s audioknihou</Checkbox>
            </div>
            <input @input="search" v-model="searchedText" :placeholder="placeholder" type="text" class="text-2xl focus:outline-none bg-background text-primary border-2 border-brand rounded-lg px-3 py-1 w-full">
        </div>
        <div v-if="books.length === 0" class="mt-8">
            <div v-for="index in 20" :key="index" class="animate-pulse pt-8">
                <div class="h-10 w-full bg-accent rounded animate-pulse"></div>
            </div>
        </div>
        <div v-else id="table" class="hidden lg:table border-collapse table-auto w-full mt-10">
            <div class="table-header-group font-bold">
                <div class="table-row text-xl text-primary text-left">
                    <div class="table-cell">Kniha</div>
                    <div class="table-cell">Autor</div>
                    <div class="table-cell">
                        <svg class="stroke-current" width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.13428 18V12C3.13428 9.61305 4.12493 7.32387 5.8883 5.63604C7.65167 3.94821 10.0433 3 12.5371 3C15.0309 3 17.4225 3.94821 19.1859 5.63604C20.9493 7.32387 21.9399 9.61305 21.9399 12V18" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21.9399 19C21.9399 19.5304 21.7198 20.0391 21.3279 20.4142C20.936 20.7893 20.4046 21 19.8504 21H18.8056C18.2515 21 17.72 20.7893 17.3281 20.4142C16.9363 20.0391 16.7161 19.5304 16.7161 19V16C16.7161 15.4696 16.9363 14.9609 17.3281 14.5858C17.72 14.2107 18.2515 14 18.8056 14H21.9399V19ZM3.13428 19C3.13428 19.5304 3.35442 20.0391 3.74628 20.4142C4.13814 20.7893 4.66962 21 5.22379 21H6.26855C6.82272 21 7.3542 20.7893 7.74606 20.4142C8.13792 20.0391 8.35806 19.5304 8.35806 19V16C8.35806 15.4696 8.13792 14.9609 7.74606 14.5858C7.3542 14.2107 6.82272 14 6.26855 14H3.13428V19Z" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="table-cell pl-3">
                        <svg class="stroke-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14 2V8H20" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 13H8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 17H8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10 9H9H8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="table-row-group">
                <div @click="linkToBook(book)" v-for="(book, index) in shownBooks" :key="index" class="hover:bg-highlight table-row font-light text-xl text-primary border-b border-accent cursor-pointer">
                    <div class="table-cell font-normal pb-1 pt-5">{{ book.name }}</div>
                    <div class="table-cell">{{ book.author }}</div>
                    <div class="table-cell">
                        <svg v-if="book.audioBookLinks.length" class="stroke-current" width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.13428 18V12C3.13428 9.61305 4.12493 7.32387 5.8883 5.63604C7.65167 3.94821 10.0433 3 12.5371 3C15.0309 3 17.4225 3.94821 19.1859 5.63604C20.9493 7.32387 21.9399 9.61305 21.9399 12V18" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21.9399 19C21.9399 19.5304 21.7198 20.0391 21.3279 20.4142C20.936 20.7893 20.4046 21 19.8504 21H18.8056C18.2515 21 17.72 20.7893 17.3281 20.4142C16.9363 20.0391 16.7161 19.5304 16.7161 19V16C16.7161 15.4696 16.9363 14.9609 17.3281 14.5858C17.72 14.2107 18.2515 14 18.8056 14H21.9399V19ZM3.13428 19C3.13428 19.5304 3.35442 20.0391 3.74628 20.4142C4.13814 20.7893 4.66962 21 5.22379 21H6.26855C6.82272 21 7.3542 20.7893 7.74606 20.4142C8.13792 20.0391 8.35806 19.5304 8.35806 19V16C8.35806 15.4696 8.13792 14.9609 7.74606 14.5858C7.3542 14.2107 6.82272 14 6.26855 14H3.13428V19Z" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="table-cell pl-3">{{ book.pages }}</div>
                </div>
            </div>
        </div>
        <div id="mobile-table" class="text-primary text-base font-light mt-5">
            <div @click="linkToBook(book)" v-for="(book, index) in shownBooks" :key="index" class="bg-highlight rounded-lg p-4 mb-3">
                <p class="font-medium text-xl">{{ book.name }}</p>
                <p>{{ book.author }}</p>
                <div class="mt-2">
                    <span>{{ book.pages }} stran</span>
                    <svg v-if="book.audioBookLinks.length" class="stroke-current inline ml-2 mb-1" width="20" height="18" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.13428 18V12C3.13428 9.61305 4.12493 7.32387 5.8883 5.63604C7.65167 3.94821 10.0433 3 12.5371 3C15.0309 3 17.4225 3.94821 19.1859 5.63604C20.9493 7.32387 21.9399 9.61305 21.9399 12V18" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21.9399 19C21.9399 19.5304 21.7198 20.0391 21.3279 20.4142C20.936 20.7893 20.4046 21 19.8504 21H18.8056C18.2515 21 17.72 20.7893 17.3281 20.4142C16.9363 20.0391 16.7161 19.5304 16.7161 19V16C16.7161 15.4696 16.9363 14.9609 17.3281 14.5858C17.72 14.2107 18.2515 14 18.8056 14H21.9399V19ZM3.13428 19C3.13428 19.5304 3.35442 20.0391 3.74628 20.4142C4.13814 20.7893 4.66962 21 5.22379 21H6.26855C6.82272 21 7.3542 20.7893 7.74606 20.4142C8.13792 20.0391 8.35806 19.5304 8.35806 19V16C8.35806 15.4696 8.13792 14.9609 7.74606 14.5858C7.3542 14.2107 6.82272 14 6.26855 14H3.13428V19Z" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { db } from '../../db'
    import Checkbox from "../components/Core/Checkbox";

    export default {
        name: "Home",
        components: {
            Checkbox
        },
        data() {
            return {
                books: [],
                shownBooks: [],
                searchedText: "",
                searchForAuthor: false,
                onlyAudioBooks: false
            }
        },
        created() {
            this.shownBooks = this.books;
        },
        computed: {
            placeholder() {
                return this.searchForAuthor ? "Vyhledej autora" : "Vyhledej knihu"
            },
            cleanedSearchText() {
                return this.searchedText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            }
        },
        watch: {
            onlyAudioBooks() {
                this.search();
            }
        },
        methods: {
            linkToBook(book) {
                const strippedName = book.name.replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                this.$router.push({ name: "book", params: { id: book.id + "_" + strippedName }})
            },
            search() {
                const field = this.searchForAuthor ? "author" : "name";
                let searchedBooks = [];
                let filteredBooks = [];

                if (this.cleanedSearchText !== "") {
                    this.books.forEach(book => {
                        if (book[field].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").startsWith(this.cleanedSearchText)) {
                            searchedBooks.push(book)
                        }
                    });
                } else {
                    searchedBooks = this.books;
                }

                if (this.onlyAudioBooks) {
                    filteredBooks = searchedBooks.filter(book => book.audioBookLinks.length)
                } else {
                    filteredBooks = searchedBooks;
                }

                this.shownBooks = filteredBooks;
            }
        },
        firestore: {
            books: db.collection("books").orderBy("name")
        }
    }
</script>