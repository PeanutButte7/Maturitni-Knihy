<template>
    <input :value="value" @input="$emit('input', $event.target.value)" :placeholder="placeholder" type="text" class="focus:outline-none bg-background text-primary border-2 border-brand rounded-lg px-3 py-1">
</template>

<script>
    export default {
        name: "InputField",
        props: {
            value: {
                required: true,
            },
            placeholder: {
                required: true,
                type: String
            }
        }
    }
</script>

<style scoped>

</style>