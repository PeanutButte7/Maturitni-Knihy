<template>
    <div id="admin">
        <div class="mb-10">
            <router-link :to="{ name: 'adminAddBook' }" class="ml-5 text-primary">Přidat knihu</router-link>
            <router-link :to="{ name: 'pendingList' }" class="ml-5 text-primary">Otevřít pending list</router-link>
        </div>
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