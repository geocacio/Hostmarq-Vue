<template>
    <div class="form-check form-switch">
        <input class="form-check-input cursor-pointer" type="checkbox" :id="`switch-${id}`" @change="toggleSwitch(id)" :checked="isChecked" ref="checkbox">
        <label class="form-check-label cursor-pointer" :for="`switch-${id}`" @click.prevent="labelClicked">{{ text }}</label>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    isChecked: {
        type: Boolean,
        default: false,
    },
});

const emits = defineEmits(['toggle']);

const toggleSwitch = (id: number) => {
    emits('toggle', id);
};

const checkbox = ref<any>(null);
const labelClicked = () => {
    checkbox.value.click();
};

</script>