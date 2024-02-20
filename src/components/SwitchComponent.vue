<template>
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" :id="`switch-${id}`" @click="toggleSwitch(id)">
        <label class="form-check-label" :for="`switch-${id}`">{{ text }}</label>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});

const emits = defineEmits(['toggle']);

const toggleSwitch = (id: number) => {
    emits('toggle', id);
};

</script>