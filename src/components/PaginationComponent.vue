<template>
    <div class="pagination-default">

        <button class="btn-pagination" :class="{'active' : link.active}" v-for="link in links" :key="link.label" @click="changePage(link.label)">
            <IconComponent :name="getIconName(link.label) || ''" />
            {{ getLabel(link.label) }}
        </button>

        <!-- <button class="btn-pagination"><IconComponent name="chevrons-left" /></button>
        <button class="btn-pagination"><IconComponent name="chevron-left" /></button>

        <button v-for="page in totalPages" :key="page" class="btn-pagination" :class="{ active: currentPage === page }"
            @click="changePage(page)">
            {{ page }}
        </button>

        <button class="btn-pagination"><IconComponent name="chevron-right" /></button>
        <button class="btn-pagination"><IconComponent name="chevrons-right" /></button> -->

    </div>
</template>
  
<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import IconComponent from './IconComponent.vue';

export interface PaginationLink {
  label: string;
  active: boolean;
}

const props = defineProps({
    links: Array as () => PaginationLink[],
    currentPage: Number,
});

const emit = defineEmits(['update:pageUrl']);

const changePage = (label: string) => {
    let newPage = props.currentPage || 1;
    if (label.includes('Next')) {
        newPage++;
    } else if (label.includes('Previous')) {
        newPage--;
    } else {
        newPage = Number(label);
    }
    console.log(newPage, props.currentPage);
    emit('update:pageUrl', newPage);
};

const getIconName = (label: string) => {
    if (label.includes('Previous')) return 'chevrons-left';
    if (label.includes('Next')) return 'chevrons-right';
    return null;
};

const getLabel = (label: string) => {
    if (label.includes('Previous')) return '';
    if (label.includes('Next')) return '';
    return label;
};
</script>