<template>
    <NewModalComponent :isOpen="props.isOpen" @update:isOpen="props.closeDeleteModal" iClass="confirmation">
        <div class="mb-3 content-confirmation">
            <IconComponent name="alert-triangle" />
            <p class="text-center">{{ props.text }}</p>
        </div>
        <div class="text-center">
            <ButtonComponent buttonClass="dark-blue-default" @click="confirmRemove" text="confirmar" />
        </div>
    </NewModalComponent>
</template>
<script setup>
import { defineProps } from 'vue'
import NewModalComponent from './NewModalComponent.vue';
import ButtonComponent from './ButtonComponent.vue';
import IconComponent from './IconComponent.vue';

const props = defineProps({
    isOpen: Boolean,
    closeDeleteModal: Function,
    confirmRemove: Function,
    text: String
})
</script>