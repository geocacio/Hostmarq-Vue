<template>
    <transition name="fade-transition">
        <div class="custom-modal" :class="{ 'show': isOpen }" v-show="isOpen">
            <div class="modal-body-style">
                <button class="btn-close" @click="closeModal"></button>
                <div class="custom-modal-content">
                    <div class="content-margin">

                        <slot></slot>
                    </div>
                </div>
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