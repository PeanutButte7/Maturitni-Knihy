<template>
    <div id="app">
        <Navbar/>
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