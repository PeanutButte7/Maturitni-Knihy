<template>
    <div>
        <router-link :to="{ name: 'adminAddBook' }" class="ml-5 text-primary">Přidat knihu</router-link>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "Admin",
    }
</script>

<style scoped>

</style>