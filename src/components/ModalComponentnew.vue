<template>
    <!-- Modal -->
    <div v-if="show" class="modal fade show d-block" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" @click="close" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
    <div v-if="show" class="modal-backdrop fade show"></div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: Boolean,
});

const emits = defineEmits(['update:modelValue']);

const close = () => {
    emits('update:modelValue', false);
};

</script>

<style scoped>
.d-block {
    display: block;
}
</style>