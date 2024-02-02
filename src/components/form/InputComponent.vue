<template>
    <input :type="type" class="form-control" :value="modelValue" @input="updateValue(($event.target as HTMLInputElement)?.value)" :placeholder="placeholder" :required="required" :disabled="disabled" />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    name: String,
    modelValue: String,
    placeholder: String,
    type: {
        type: String,
        default: 'text',
    },
    required: Boolean,
    disabled: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (value: string) => {
    emit('update:modelValue', value);
};
</script>