<template>
    <BreadcrumbComponent title="Associados" />

    <div class="dashboard-header flex-horizontal">
        <div class="search-container">
            <InputComponent type="text" placeholder="Pesquisar" />
        </div>
        <div class="dashboard-actions">
            <!-- <ButtonComponent buttonClass="dark-blue" text="Novo" /> -->

            <ModalComponent id="new-user" buttonText="Novo">

                <div class="mb-3">
                    <LabelComponent text="Nome" />
                    <InputComponent type="text" placeholder="Nome" v-model="form.name" :validation="true" :error="errors.name" :error-message="'Por favor, insira um nome de usuário.'" @input="errors.name = false" />
                </div>

                <div class="mb-3">
                    <LabelComponent text="Tipo de usuário" />
                    <select class="form-control" v-model="form.role_id">
                        <option value="">Selecione o tipo de usuário</option>
                        <option value="2">Admin</option>
                        <option value="3">Dono de um clube(ClubMaster)</option>
                        <option value="4">Funcionario do clube(ClubAdmin)</option>
                        <option value="5">Usuário</option>
                    </select>
                </div>

                <div class="mb-3">
                    <LabelComponent text="E-mail" />
                    <InputComponent type="email" placeholder="E-mail" v-model="form.email" :validation="true" :error="errors.email" :error-message="'Por favor, insira um e-mail para o usuário.'" @input="errors.email = false" />
                </div>

                <div class="mb-3">
                    <LabelComponent text="Senha" />
                    <PasswordComponent placeholder="Senha" v-model="form.password" @keypress="submit" :validation="true" :error="errors.password" :error-message="'Por favor, insira sua senha.'" @input="errors.password = false" />
                </div>

                <div class="mb-3 text-center">
                    <ButtonComponent buttonClass="dark-blue" @click="submit" text="Criar" />
                </div>

            </ModalComponent>
        </div>
    </div>

    <div class="row row-gap-15">

        <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="(person, index) in users" :key="index">
            <PersonComponent :data="person" />
        </div>

    </div>

    <PaginationComponent class="mt-5" :totalPages="2" :currentPage="1" />
</template>

<script setup lang="ts">
import BreadcrumbComponent from '@/components/BreadcrumbComponent.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import PersonComponent from '@/components/PersonComponent.vue';
import InputComponent from '@/components/form/InputComponent.vue';
import { ref, onMounted, reactive } from 'vue';
import { useUserStore } from '@/stores/modules/user';
import type { User } from '@/types/userType';
import ModalComponent from '@/components/ModalComponent.vue';
import LabelComponent from '@/components/form/LabelComponent.vue';
import PasswordComponent from '@/components/form/PasswordComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';

const userStore = useUserStore();
const users = ref<User[]>([]);

const totalPages = ref(10);
const currentPage = ref(1);

interface Form {
    name: string;
    email: string;
    password: string;
    role_id: string;
}

const form = reactive<Form>({
    name: 'Geovane',
    email: 'geovane@hostmarq.com',
    password: 'password',
    role_id: '',
});

onMounted(async () => {
    try {
        const response = await userStore.fetchUsers();
        users.value = userStore.getUsers;
    } catch (error) {
        console.error(error);
    }
});

const errors = reactive({
    name: false,
    email: false,
    password: false,
});

const validateForm = () => {
    errors.name = !form.name;
    errors.email = !form.email;
    errors.password = !form.password;

    return !errors.name && !errors.email && !errors.password;
};

const submit = async () => {

    if (validateForm()) {
        try {
            const newUser = await userStore.createUser(form);
            //adicionar o usuário criado na lista de usuários
            users.value.push(newUser);
        } catch (error) {
            console.error(error);
        }
    }

};

</script>