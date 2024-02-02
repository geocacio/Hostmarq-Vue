<template>
    <input type="checkbox" :checked="modelValue" @change="updateValue(($event.target as HTMLInputElement)?.checked)" :required="required" :disabled="disabled">
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: Boolean,
    required: Boolean,
    disabled: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (value: boolean) => {
    emit('update:modelValue', value);
};

</script>
