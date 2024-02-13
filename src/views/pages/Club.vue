<template>

    <BreadcrumbComponent title="Clubes" />

    <div class="dashboard-header flex-horizontal">
        <div class="search-container">
            <InputComponent type="text" placeholder="Pesquisar" />
        </div>
        <div class="dashboard-actions">
            <ButtonComponent buttonClass="dark-blue" text="Novo" />
        </div>
    </div>

    <div class="row row-gap-15">

        <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="(person, index) in clubs" :key="index">
            <ClubComponent :data="person" />
        </div>

    </div>

    <PaginationComponent class="mt-5" :totalPages="2" :currentPage="1" />

</template>

<script setup lang="ts">
import BreadcrumbComponent from '@/components/BreadcrumbComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import ClubComponent from '@/components/ClubComponent.vue';
import InputComponent from '@/components/form/InputComponent.vue';
import type { Club } from '@/types/clubType';
import { ref, onMounted } from 'vue';
import { useClubStore } from '@/stores/modules/club';

const clubs = ref<Club[]>([]);

const clubStore = useClubStore();

onMounted( async () => {
    await clubStore.fetchClubs();
    clubs.value = clubStore.clubs;
});
</script>