<template>
    <button type="button" class="btn" :class="`btn-${type}`">
        <i :class="icon" v-if="icon"></i>
        {{ text ?? '' }}
    </button>
</template>

<script setup lang="ts">
    import { defineProps } from 'vue'

    const props = defineProps({
        type: String,
        text: String,
        icon: String
    });
    
</script>