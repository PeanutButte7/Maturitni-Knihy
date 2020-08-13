<template>
    <div id="app">
        <Navbar class="mt-5 mx-8"/>
        <router-view class="container mx-auto mt-10"/>
    </div>
</template>

<script>
    import Navbar from "./components/Navbar";

    export default {
        name: "App",
        components: {
            Navbar
        }
    }
</script>