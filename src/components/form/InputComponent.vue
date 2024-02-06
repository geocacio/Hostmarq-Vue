<template>
    <div>
        <input :type="type" class="form-control" :value="modelValue" @input="updateValue(($event.target as HTMLInputElement)?.value)" :placeholder="placeholder" :required="required" :disabled="disabled" />
        <div v-if="validation && error" class="error-message">
            {{ errorMessage }}
        </div>
    </div>
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
    validation: Boolean,
    error: Boolean,
    errorMessage: String,
});

const emit = defineEmits(['update:modelValue', 'update:error']);

const updateValue = (value: string) => {
    emit('update:modelValue', value);
    if (props.validation && !value) {
        emit('update:error', true);
    } else {
        emit('update:error', false);
    }
};
</script>

<style scoped>
.error-message {
    color: red;
}
</style>