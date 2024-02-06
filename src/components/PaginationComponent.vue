<template>
    <div class="pagination-default">
      <button
        v-for="page in totalPages"
        :key="page"
        class="btn-pagination"
        :class="{ active: currentPage === page }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    totalPages: Number,
    currentPage: Number,
  });

  const emit = defineEmits(['update:currentPage']);
  
  const changePage = (page: number) => {
    emit('update:currentPage', page);
  };
  </script>