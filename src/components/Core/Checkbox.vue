<template>
    <div id="checkbox">
        <input :value="value" @input="$emit('input', $event.target.checked)" :id="checkboxId" type="checkbox" class="appearance-none focus:outline-none checked:bg-brand border-2 border-brand rounded-md mr-3 p-2">
        <label :for="checkboxId" class="text-xl lg:text-2xl text-primary select-none"><slot/></label>
    </div>
</template>

<script>
    export default {
        name: "checkbox",
        props: {
            value: {
                required: true,
            },
            checkboxId: {
                required: true,
                type: String
            }
        }
    }
</script>
