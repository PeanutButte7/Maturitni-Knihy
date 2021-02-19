<template>
    <div id="leaderboard">
        <h1 class="text-center text-3xl lg:text-6xl font-medium text-brand">Žebříček</h1>
        <div id="table" class="table border-collapse table-auto w-full mt-10">
            <div class="table-header-group font-bold">
                <div class="table-row text-xl text-primary text-left">
                    <div class="table-cell">Uživatel - počet příspěvků</div>
                </div>
            </div>
            <div class="table-row-group">
                <div v-for="(user, index) in users" :key="index" class="table-row font-light text-xl text-primary border-b border-accent">
                    <div v-if="user.contributions > 0" class="table-cell font-normal pb-1 pt-5"> <span v-if="index === 0">🥇</span><span v-else-if="index === 1">🥈</span><span v-else-if="index === 2">🥉</span> {{ user.displayName }} - {{ user.contributions }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {db} from "../../db";

export default {
    name: "Leaderboard",
    data () {
        return {
            users: [],
        }
    },
    firestore: {
        users: db.collection("users").orderBy("contributions", "desc")
    }
}
</script>