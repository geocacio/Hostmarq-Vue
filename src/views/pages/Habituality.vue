<template>
    <BreadcrumbComponent title="Habitualidade" />

    <TableComponent class="mt-5" :items="habitualitiesData" :actions="actions" />

    <!-- <PaginationComponent class="mt-5" :totalPages="2" :currentPage="1" /> -->
</template>

<script setup lang="ts">
import BreadcrumbComponent from '@/components/BreadcrumbComponent.vue';
// import PaginationComponent from '@/components/PaginationComponent.vue';
import TableComponent from '@/components/TableComponent.vue';
import { ref, onMounted } from 'vue';
import type { Action } from '@/types/habitualityType';
import { useHabitualityStore } from '@/stores/modules/habitualities';

const totalPages = ref(1);
const currentPage = ref(1);

const habituallityStore = useHabitualityStore();

const habitualities = ref([]);

const actions: Action[] = [
    {
        name: 'edit',
        action: (item) => {
            console.log('Edit', item);
        },
        icon: 'edit',
        class: 'light blue',
    },
    {
        name: 'view',
        action: (item) => {
            // Código para a ação "Visualizar"
        },
        icon: 'eye',
        class: 'light orange',
    },
    {
        name: 'delete',
        action: (item) => {
            // Código para a ação "Excluir"
        },
        icon: 'trash',
        class: 'light red',
    },
    {
        name: 'settings',
        action: (item) => {
            // Código para a ação "Configurações"
        },
        icon: 'settings',
        class: 'light green',
    },
];

const habitualitiesData = ref([]);

onMounted(async () => {
    try {
        await habituallityStore.fetchHabitualities();
        habitualities.value = habituallityStore.getHabitualities;
        //mapear os dados para escolher quais campos serão exibidos
        habitualitiesData.value = habitualities.value.map((item) => {
            return {
                id: item.id,
                date_time: item.date_time,
                location: item.location.name,
                event: item.event.name,
                weapon: `Tipo: ${item.weapon.type.name} - Modelo: ${item.weapon.model.name} - Calibre: ${item.weapon.caliber.name} - Sigma: ${item.weapon.number_sigma}`,

            }
        });
    } catch (e) {
        console.log(e);
    }
});

</script>