<template>
    <BreadcrumbComponent title="Meu clube" />

    <div class="row">
        <div class="col-12">

            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Dados do clube</h4>
                </div>
                <div class="card-body">

                    <div class="mb-3">
                        <LabelComponent text="Nome" />
                        <InputComponent type="text" placeholder="Nome" v-model="form.name" :validation="true" :error="errors.name" :error-message="'Por favor, insira um nome de clube.'" @input="errors.name = false" />
                    </div>

                    <div class="mb-3">
                        <LabelComponent text="Sigla" />
                        <InputComponent type="text" placeholder="Sigla" v-model="form.acronym" :validation="true" :error="errors.acronym" :error-message="'Por favor, insira uma sigla para o clube.'" @input="errors.acronym = false" />
                    </div>

                    <div class="mb-3">
                        <LabelComponent text="CNPJ" />
                        <InputComponent type="text" placeholder="CNPJ" v-model="form.cnpj" :validation="true" :error="errors.cnpj" :error-message="'Por favor, insira um CNPJ para o clube.'" @input="errors.cnpj = false" />
                    </div>

                    <div class="mb-3">
                        <LabelComponent text="Endereço" />
                        <InputComponent type="text" placeholder="Endereço" v-model="form.address" :validation="true" :error="errors.address" :error-message="'Por favor, insira um endereço para o clube.'" @input="errors.address = false" />
                    </div>

                    <div class="mb-3">
                        <LabelComponent text="Telefone" />
                        <InputComponent type="text" placeholder="Telefone" v-model="form.phone" :validation="true" :error="errors.phone" :error-message="'Por favor, insira um telefone para o clube.'" @input="errors.phone = false" />
                    </div>

                    <div class="mb-3">
                        <LabelComponent text="E-mail" />
                        <InputComponent type="email" placeholder="E-mail" v-model="form.email" :validation="true" :error="errors.email" :error-message="'Por favor, insira um e-mail para o clube.'" @input="errors.email = false" />
                    </div>

                    <div class="mb-3">
                        <LabelComponent text="E-mail OM" />
                        <InputComponent type="email" placeholder="E-mail OM" v-model="form.email_om" :validation="true" :error="errors.email_om" :error-message="'Por favor, insira um e-mail OM para o clube.'" @input="errors.email_om = false" />
                    </div>

                    <div class="mb-3">
                        <LabelComponent text="URL" />
                        <InputComponent type="text" placeholder="URL" v-model="form.url" :validation="true" :error="errors.url" :error-message="'Por favor, insira uma URL para o clube.'" @input="errors.url = false" />
                    </div>

                    <div class="mb-3">
                        <LabelComponent text="App URL" />
                        <InputComponent type="text" placeholder="App URL" v-model="form.app_url" :validation="true" :error="errors.app_url" :error-message="'Por favor, insira uma App URL para o clube.'" @input="errors.app_url = false" />
                    </div>

                    <div class="mb-3">
                        <LabelComponent text="Logo" />
                        <InputComponent type="text" placeholder="Logo" v-model="form.logo" :validation="true" :error="errors.logo" :error-message="'Por favor, insira uma logo para o clube.'" @input="errors.logo = false" />
                    </div>

                    <div class="mb-3">
                        <LabelComponent text="Favicon" />
                        <InputComponent type="text" placeholder="Favicon" v-model="form.favicon" :validation="true" :error="errors.favicon" :error-message="'Por favor, insira um favicon para o clube.'" @input="errors.favicon = false" />
                    </div>

                    <div class="mb-3">
                        <LabelComponent text="Logo Rodapé" />
                        <InputComponent type="text" placeholder="Logo Rodapé" v-model="form.logo_rodape" :validation="true" :error="errors.logo_rodape" :error-message="'Por favor, insira uma logo de rodapé para o clube.'" @input="errors.logo_rodape = false" />
                    </div>

                    <div class="mb-3">
                        <LabelComponent text="País" />
                        <InputComponent type="text" placeholder="País" v-model="form.country" :validation="true" :error="errors.country" :error-message="'Por favor, insira um país para o clube.'" @input="errors.country = false" />
                    </div>

                    <div class="mb-3">
                        <LabelComponent text="Cidade" />
                        <InputComponent type="text" placeholder="Cidade" v-model="form.city" :validation="true" :error="errors.city" :error-message="'Por favor, insira uma cidade para o clube.'" @input="errors.city = false" />
                    </div>

                    <div class="mb-3 text-center">
                        <ButtonComponent buttonClass="dark-blue" @click="submit" :text="buttonTextSubmit()" />
                    </div>


                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useClubStore } from '@/stores/modules/club';
import type { Club } from '@/types/clubType';
import BreadcrumbComponent from '@/components/BreadcrumbComponent.vue';
import LabelComponent from '@/components/form/LabelComponent.vue';
import InputComponent from '@/components/form/InputComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';

const clubeStore = useClubStore();

const form = reactive<Club>({
    name: "",
    acronym: "",
    cnpj: "",
    address: "",
    phone: "",
    email: "",
    email_om: "",
    url: "",
    app_url: "",
    logo: "",
    favicon: "",
    logo_rodape: "",
    country: "",
    city: ""
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
        try{
            if (form.id) {
                clubeStore.updateClub(form);
            } else {
                const newClub: any = clubeStore.createClub(form);
                Object.assign(form, newClub);
            }
        }catch(error){
            console.error(error);
        }
    }
};

const buttonTextSubmit = () => form.id ? "Atualizar" : "Cadastrar";

onMounted( async () => {
    await clubeStore.fetchClub();
    Object.assign(form, clubeStore.getClub);
});

</script>