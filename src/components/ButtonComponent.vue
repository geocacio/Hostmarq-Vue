<template>
    <button type="button" class="btn btn-component" :class="buttonClass" :title="title">
    <IconComponent class="svg" :name="icon ?? ''" />
    {{ text ?? '' }}
</button>
</template>

<script setup lang="ts">
    import { defineProps } from 'vue'
    import IconComponent from './IconComponent.vue'

    const props = defineProps({
        buttonClass: String,
        text: String,
        icon: String,
        light: Boolean,
        title: String,
    });
    
</script>