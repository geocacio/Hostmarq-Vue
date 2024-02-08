<template>
    <!-- Button trigger modal -->
    <ButtonComponent buttonClass="dark-blue w-100" text="Ver" data-bs-toggle="modal" :data-bs-target="`#modal-${id}`" />

    <!-- Modal -->
    <div class="modal fade modal-default" :id="`modal-${id}`" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                    
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ButtonComponent from './ButtonComponent.vue';
import { defineProps } from 'vue';

const props = defineProps({
    id: Number,
});
</script>