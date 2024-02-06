<template>
    <div class="pagination-default">

        <button class="btn-pagination"><IconComponent name="chevrons-left" /></button>
        <button class="btn-pagination"><IconComponent name="chevron-left" /></button>

        <button v-for="page in totalPages" :key="page" class="btn-pagination" :class="{ active: currentPage === page }"
            @click="changePage(page)">
            {{ page }}
        </button>

        <button class="btn-pagination"><IconComponent name="chevron-right" /></button>
        <button class="btn-pagination"><IconComponent name="chevrons-right" /></button>

    </div>
</template>
  
<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import IconComponent from './IconComponent.vue';

const props = defineProps({
    totalPages: Number,
    currentPage: Number,
});

const emit = defineEmits(['update:currentPage']);

const changePage = (page: number) => {
    emit('update:currentPage', page);
};
</script>