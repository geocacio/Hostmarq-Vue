<template>
  <div v-html="iconSvg"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import icons from '@/svgs/index'
import { defineProps } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

interface Icons {
  [key: string]: string;
}

const iconSvg = computed(() => (icons as unknown as Icons)[props.name] as string)

</script>