<template>
    <multiselect v-model="selectedOptions" :options="options" :multiple="true" track-by="code" :taggable="true" :searchable="true"
        :hideSelected="true" label="name" :placeholder="placeholder" />
</template>
  
<script setup lang="ts">
import '../../node_modules/vue-multiselect/dist/vue-multiselect.css';
import { ref, defineProps, defineEmits, watch } from 'vue';

interface Option {
    code: string | number;
    name: string | number;
}

const props = defineProps({
    options: {
        type: Array as () => Option[],
        required: true,
    },
    placeholder: {
        type: String,
        default: 'Selecione uma ou mais opções',
    },
});

const selectedOptions = ref<Option[]>([]);

const emit = defineEmits(['update:selectedOptions']);

watch(selectedOptions, (newVal) => {
    emit('update:selectedOptions', newVal);
});

</script>