<template>
    <div id="checkbox">
        <input :value="value" @input="$emit('input', $event.target.checked)" type="checkbox" class="appearance-none focus:outline-none checked:bg-brand border-2 border-brand rounded-md mr-3 p-2">
        <span class="text-2xl text-primary"><slot/></span>
    </div>
</template>

<script>
    export default {
        name: "checkbox",
        props: {
            value: {
                required: true,
            }
        }
    }
</script>

<style scoped>

</style>