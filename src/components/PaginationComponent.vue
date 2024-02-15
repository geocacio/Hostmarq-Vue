<template>
    <div class="pagination-default">

        <button class="btn-pagination" :class="{'active' : link.active}" v-for="link in data.links" :key="link.label" @click="changePage(link.label)" :disabled="isDisabled(link.label)">
            <IconComponent :name="getIconName(link.label) || ''" />
            {{ getLabel(link.label) }}
        </button>

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
    data: Object
});

const emit = defineEmits(['update:pageUrl']);

const changePage = (label: string) => {
    let newPage = props.data.current_page || 1;
    if (label.includes('Next')) {
        newPage = props.data.last_page > newPage ? newPage + 1 : newPage;
    } else if (label.includes('Previous')) {
        newPage = newPage > 1 ? newPage - 1 : newPage;
    } else {
        newPage = Number(label);
    }
    
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

const isDisabled = (label: string) => {
    if(label.includes('Previous') && props.data.current_page === 1){
        return true;
    }else if(label.includes('Next') && props.data.current_page === props.data.last_page){
        return true;
    }

    return false;
};
</script>