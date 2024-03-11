<template>
    
    <div class="custom-modal" v-if="isOpen">
        <div class="custom-modal-content">
            <button class="close" @click="closeModal">&times;</button>
            <slot></slot>

        </div>
    </div>

</template>
<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue';

const props = defineProps({
    isOpen: Boolean
});

const emit = defineEmits(['update:isOpen']);

const closeModal = () => {
    emit('update:isOpen', false);
}
</script>