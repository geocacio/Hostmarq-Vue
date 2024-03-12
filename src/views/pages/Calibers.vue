<template>
    <BreadcrumbComponent title="Associados" />

    <div class="dashboard-header flex-horizontal">
        <div class="search-container">
            <InputComponent type="text" placeholder="Pesquisar" v-model="search" />
            <!-- <InputComponent type="text" placeholder="Pesquisar" v-model="search" @input="searchSubmit" /> -->
        </div>
        <div class="dashboard-actions">

            <ModalComponent id="new-user" buttonText="Novo">

                <div class="mb-3">
                    <LabelComponent text="Calibre" />
                    <InputComponent type="text" placeholder="Calibre" v-model="form.name" :validation="true"
                        :error="errors.name" :error-message="'Por favor, insira um nome de usuário.'"
                        @input="errors.name = false" />
                </div>

                <div class="mb-3">
                    <LabelComponent text="Tipo" />
                    <select class="form-control" v-model="form.type">
                        <option value="">Selecione o tipo</option>
                        <option value="permitted">Permitido</option>
                        <option value="restricted">Restrito</option>
                    </select>
                    <div v-if="errors.type" class="error-message">
                        Por favor, selecione um tipo.
                    </div>
                </div>

                <div class="mb-3 text-center">
                    <ButtonComponent buttonClass="dark-blue" @click="submit" text="Criar" />
                </div>

            </ModalComponent>

            <NewModalComponent :isOpen="isOpenEditModal" @update:isOpen="closeEdtModal">
                <div class="mb-3">
                    <LabelComponent text="Calibre" />
                    <InputComponent type="text" placeholder="Calibre" v-model="form.name" :validation="true"
                        :error="errors.name" :error-message="'Por favor, insira o calibre desejado.'"
                        @input="errors.name = false" />
                </div>

                <div class="mb-3">
                    <LabelComponent text="Tipo" />
                    <select class="form-control" v-model="form.type">
                        <option value="">Selecione o tipo</option>
                        <option value="permitted">Permitido</option>
                        <option value="restricted">Restrito</option>
                    </select>
                    <div v-if="errors.type" class="error-message">
                        Por favor, selecione um tipo.
                    </div>
                </div>

                <div class="text-center">
                    <ButtonComponent buttonClass="dark-blue" @click="update" text="Atualizar" />
                </div>
            </NewModalComponent>
        </div>
    </div>

    <div class="row row-gap-15">

        <TableComponent :items="dataTable" :actions="actions" />

        <!-- <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="(person, index) in users.data" :key="index">
            <PersonComponent :data="person" @update="updateuser" @delete="deleteUser" />
        </div> -->

    </div>

    <!-- <PaginationComponent class="mt-5" :links="users.links" :currentPage="users.current_page" @update:pageUrl="fetchPage" /> -->
    <!-- <PaginationComponent class="mt-5" :data="users" @update:pageUrl="fetchPage" /> -->
</template>

<script setup lang="ts">
import BreadcrumbComponent from '@/components/BreadcrumbComponent.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import InputComponent from '@/components/form/InputComponent.vue';
import { ref, onMounted, reactive } from 'vue';

import NewModalComponent from '@/components/NewModalComponent.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import LabelComponent from '@/components/form/LabelComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import TableComponent from '@/components/TableComponent.vue';
import { useCaliberStore } from '@/stores/modules/caliber';
import type { Caliber } from '@/types/caliberType';
import type { Action } from '@/types/actionType';

// Acessar os dados do usuário conectado
import { useAuthStore } from '@/stores/modules/auth';
const authStore = useAuthStore();
const loggedInuser = authStore.getUser;
// Acessar o slug do clube do usuário conectado
const clubSlug = (loggedInuser as { club?: { slug: string } })?.club?.slug ?? '';

const caliberStore = useCaliberStore();
const calibers = ref<Caliber[]>([]);

interface dataTable {
    id: number | string;
    'Nome': string;
    'Tipo': string;
    slug: string;
}
const dataTable = ref<dataTable[]>([]);

interface Form {
    id?: number | string;
    name: string;
    type: string;
    slug?: string;
}

const form = reactive<Form>({
    name: '',
    type: ''
});

const search = ref('');

const actions: Action[] = [
    {
        name: 'edit',
        action: (item: any) => {
            //chamar modal de edição
            showdataCaliber(item);
        },
        icon: 'edit',
        class: 'light blue',
    },
    {
        name: 'delete',
        action: (item: any) => {
            removeCaliber(item.slug);
        },
        icon: 'trash',
        class: 'light red',
    },
];

const removeCaliber = async (itemSlug: string) => {
    await caliberStore.deleteCaliber(clubSlug, itemSlug)
    const index = dataTable.value.findIndex((item: any) => item.slug === itemSlug);
    if (index !== -1) {
        dataTable.value.splice(index, 1);
    }
}

const editCaliber = async (item: object) => {

}

onMounted(async () => {
    try {
        await caliberStore.fetchCalibers(clubSlug);
        calibers.value = caliberStore.getCalibers;

        dataTable.value = calibers.value.map((item: any) => {
            return {
                id: item.id,
                'Nome': item.name,
                'Tipo': item.type,
                slug: item.slug,
            }
        })
    } catch (error) {
        console.error(error);
    }
});

const errors = reactive({
    name: false,
    type: false,
});

const validateForm = () => {
    errors.name = !form.name;
    errors.type = !form.type || form.type === "";

    return !errors.name && !errors.type;
};

const submit = async () => {

    if (validateForm()) {
        try {
            const newCaliber: any = await caliberStore.createCaliber(clubSlug, form);
            document.getElementById('closeModal-new-user')?.click();
            let caliber = {
                id: newCaliber.id,
                'Nome': newCaliber.name,
                'Tipo': newCaliber.type,
                slug: newCaliber.slug
            }
            if (caliber) {
                dataTable.value.push(caliber);
                //limpar o formulário
                clearForm();
            }
        } catch (error) {
            console.error(error);
        }
    }

};

//constante para abrir o modal de edição
const isOpenEditModal = ref(false);
//constante para fechar o modal de edição
const closeEdtModal = () => {
    
    isOpenEditModal.value = false;

    //limpar o formulário
    clearForm();
};

//função para mostrar os dados do calibre no modal de edição
const showdataCaliber = (item: any) => {
    form.id = item['id'];
    form.name = item['Nome'];
    form.type = item['Tipo'];
    form.slug = item['slug'];

    //abrindo o modal de edição
    isOpenEditModal.value = true;
};

//funçõ para limpar o formulário
const clearForm = () => {
    form.name = '';
    form.type = '';
    errors.name = false;
    errors.type = false;
};

//atualizar o calibre
const update = async () => {
    if (validateForm()) {
        try {
            const updatedCaliber: any = await caliberStore.updateCaliber(clubSlug, form);
            //fechar o modal de edição
            closeEdtModal();

            let caliber = {
                id: updatedCaliber.id,
                'Nome': updatedCaliber.name,
                'Tipo': updatedCaliber.type,
                slug: updatedCaliber.slug
            }
            
            if (caliber) {

                const index = dataTable.value.findIndex((item: any) => item.slug === updatedCaliber.slug);
                if (index !== -1) {
                    dataTable.value[index] = caliber;
                }

                //limpar o formulário
                clearForm();
            }
        } catch (error) {
            console.error(error);
        }
    }
};

</script>

<style scoped>
.error-message {
    color: red;
}
</style>