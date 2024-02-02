<template>
    <label :for="props.for">{{ text }}</label>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    text: String,
    for: String
});

</script>