<template>
    <div class="input-group">
        <input :type="currentType" class="form-control" :value="modelValue"
            @input="updateValue(($event.target as HTMLInputElement)?.value)" @keypress="$emit('keypress', $event)" :placeholder="placeholder" :required="required"
            :disabled="disabled" />
        <button class="btn" type="button" @click.prevent="togglePasswordVisibility">
            <IconComponent :name="currentIcon" />
        </button>
    </div>
    <div v-if="validation && error" class="error-message">
        {{ errorMessage }}
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import IconComponent from '@/components/IconComponent.vue';

const props = defineProps({
    modelValue: String,
    placeholder: String,
    type: {
        type: String,
        default: 'password',
    },
    required: Boolean,
    disabled: Boolean,
    validation: Boolean,
    error: Boolean,
    errorMessage: String,
});

const emit = defineEmits(['update:modelValue', 'update:error', 'input', 'keypress']);

const updateValue = (value: string) => {
    emit('update:modelValue', value);
    if (props.validation && !value) {
        emit('update:error', true);
    } else {
        emit('update:error', false);
    }
    emit('input', value);
};

const currentType = ref(props.type);
const currentIcon = ref('eye-off');

const togglePasswordVisibility = () => {
    currentType.value = currentType.value === 'password' ? 'text' : 'password';
    currentIcon.value = currentIcon.value === 'eye' ? 'eye-off' : 'eye';
};
</script>

<style scoped lang="scss">
.input-group {
    border: 1px solid #dee2e6;
    border-radius: 0.375rem;

    &:focus-within {
        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, .25) !important;
    }

    .form-control {
        border: none;
        border-radius: 0.375rem;

        &:focus {
            box-shadow: none;
        }
    }

    .btn {
        border: none;
        background-color: transparent;

        &:active {
            box-shadow: none;
        }
    }

}

.error-message {
    color: red;
}
</style>