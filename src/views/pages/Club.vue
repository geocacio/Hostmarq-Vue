<template>
    <!-- <BreadcrumbComponent :title="$t('My club')" /> -->
    <BreadcrumbComponent title="Meu clube" />
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useClubStore } from '@/stores/modules/club';
import type { Club } from '@/types/clubType';
import BreadcrumbComponent from '@/components/BreadcrumbComponent.vue';

const clubeStore = useClubStore();

const form = reactive<Club>({
    name: "Clube Fictício",
    acronym: "CF",
    cnpj: "12.345.678/0001-90",
    address: "Rua Fictícia, 123",
    phone: "(11) 1234-5678",
    email: "contato@clubeficticio.com.br",
    email_om: "om@clubeficticio.com.br",
    url: "http://www.clubeficticio.com.br",
    app_url: "http://app.clubeficticio.com.br",
    logo: "http://www.clubeficticio.com.br/logo.png",
    favicon: "http://www.clubeficticio.com.br/favicon.ico",
    logo_rodape: "http://www.clubeficticio.com.br/logo_rodape.png",
    country: "Brasil",
    city: "São Paulo"
});

const errors = reactive({
    name: false,
    acronym: false,
    cnpj: false,
    address: false,
    phone: false,
    email: false,
    email_om: false,
    url: false,
    app_url: false,
    logo: false,
    favicon: false,
    logo_rodape: false,
    country: false,
    city: false
});

const validateForm = () => {
    errors.name = !form.name;
    errors.acronym = !form.acronym;
    errors.cnpj = !form.cnpj;
    errors.address = !form.address;
    errors.phone = !form.phone;
    errors.email = !form.email;
    errors.email_om = !form.email_om;
    errors.url = !form.url;
    errors.app_url = !form.app_url;
    errors.logo = !form.logo;
    errors.favicon = !form.favicon;
    errors.logo_rodape = !form.logo_rodape;
    errors.country = !form.country;
    errors.city = !form.city;

    return Object.values(errors).every(error => !error);
};

const submit = () => {
    if (validateForm()) {
        console.log(form);

        try{
            const newClub: any = clubeStore.createClub(form);
        }catch(error){
            console.error(error);
        }
    }
};

</script>