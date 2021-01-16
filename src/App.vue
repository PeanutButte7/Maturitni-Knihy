<template>
    <div id="app">
        <Navbar class="mt-5 mx-8"/>
        <router-view v-if="!menuActive" class="container mx-auto mt-10 mb-10"/>
    </div>
</template>

<script>
    import Navbar from "./components/Navbar";
    import {mapGetters} from "vuex";

    export default {
        name: "App",
        components: {
            Navbar
        },
        computed: {
            ...mapGetters({
                menuActive: "menuActive"
            })
        },
    }
</script>