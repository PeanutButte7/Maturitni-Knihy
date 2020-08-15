<template>
    <div id="btn" class="flex items-center justify-between">
        <button class="bg-brand text-gray-900 font-bold border-2 border-brand rounded-lg px-6 py-1" type="button"><slot/></button>
    </div>
</template>

<script>
    export default {
        name: "Btn"
    }
</script>