<template>
    <div class="empty-data">
        <IconComponent :name="icon ?? ''" />
        <p>{{ props.text }}</p>
    </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
import IconComponent from './IconComponent.vue';

const props = defineProps({
    text: String,
    icon: String
})
</script>