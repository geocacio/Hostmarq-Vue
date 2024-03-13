<template>
    <transition name="fade-transition">
        <div class="custom-modal" :class="[iClass, { 'show': isOpen }]" v-show="isOpen">
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
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
    isOpen: Boolean,
    iClass: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['update:isOpen']);

const closeModal = () => {
    emit('update:isOpen', false);
}
</script>