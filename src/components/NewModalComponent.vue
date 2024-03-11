<template>
    <transition name="fade-transition">
        <div class="custom-modal" :class="{ 'show': isOpen }" v-show="isOpen">
            <div class="custom-modal-content">
                <button class="btn-close" @click="closeModal"></button>

                <slot></slot>

            </div>
        </div>
    </transition>

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