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
                    <LabelComponent text="Nome" />
                    <InputComponent type="text" placeholder="Nome" v-model="form.name" :validation="true" :error="errors.name" :error-message="'Por favor, insira um nome.'" @input="errors.name = false" />
                </div>

                <div class="mb-3 text-center">
                    <ButtonComponent buttonClass="dark-blue" @click="submit" text="Criar" />
                </div>

            </ModalComponent>

            <NewModalComponent :isOpen="isOpenEditModal" @update:isOpen="closeModalEdit">
                <div class="mb-3">
                    <LabelComponent text="Nome" />
                    <InputComponent type="text" placeholder="Nome" v-model="form.name" :validation="true" :error="errors.name" :error-message="'Por favor, insira um nome.'" @input="errors.name = false" />
                </div>

                <div class="mb-3 text-center">
                    <ButtonComponent buttonClass="dark-blue" @click="update" text="Atualizar" />
                </div>
            </NewModalComponent>
        </div>
    </div>

    <div class="row row-gap-15">

        <TableComponent :items="dataTable" :actions="actions"/>

    </div>

    <!-- <PaginationComponent class="mt-5" :links="users.links" :currentPage="users.current_page" @update:pageUrl="fetchPage" /> -->
    <!-- <PaginationComponent class="mt-5" :data="users" @update:pageUrl="fetchPage" /> -->
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';

import { useEventStore } from '@/stores/modules/Event';
import type { Action } from '@/types/actionType';

import BreadcrumbComponent from '@/components/BreadcrumbComponent.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import InputComponent from '@/components/form/InputComponent.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import LabelComponent from '@/components/form/LabelComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import TableComponent from '@/components/TableComponent.vue';
import NewModalComponent from '@/components/NewModalComponent.vue';

// Acessar os dados do usuário conectado
import { useAuthStore } from '@/stores/modules/auth';

const authStore = useAuthStore();
const loggedInuser = authStore.getUser;
// Acessar o slug do clube do usuário conectado
const clubSlug = (loggedInuser as { club?: { slug: string } })?.club?.slug ?? '';

const eventStore = useEventStore();
const events = ref([]);

interface dataTable {
    id: number | string;
    'Nome': string;
}
const dataTable = ref<dataTable[]>([]);

interface Form {
    id?: number | string;
    name: string;
}

const form = reactive<Form>({
    name: '',
});

const search = ref('');

const actions: Action[] = [
    {
        name: 'edit',
        action: (item) => {
            showDataEvent(item);
        },
        icon: 'edit',
        class: 'light blue',
    },
    {
        name: 'delete',
        action: (item: any) => {
            removeWeaponType(item.id);
        },
        icon: 'trash',
        class: 'light red',
    },
];

const removeWeaponType = async(itemId: string) => {
    await eventStore.deleteEvent(clubSlug, itemId)
    const index = dataTable.value.findIndex((item: any) => item.id === itemId);
    dataTable.value.splice(index, 1);
}

const editCaliber = async(item: object) => {
    
}

onMounted(async () => {
    try {
        await eventStore.fetchEvents(clubSlug);
        events.value = eventStore.getEvents;

        dataTable.value = events.value.map((item: any) => {
            return {
                id: item.id,
                'Nome': item.name,
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

    return !errors.name;
};

const submit = async () => {
    
    if (validateForm()) {

        try {
            const newEvents: any = await eventStore.createEvent(clubSlug, form);
            document.getElementById('closeModal-new-user')?.click();
            const event = {
                id: newEvents.id,
                'Nome': newEvents.name
            }
            
            if (event){
                dataTable.value.push(event);
            }
        } catch (error) {
            console.error(error);
        }
    }

};


//Inicio da função Editar
const isOpenEditModal = ref(false);

//Função para abrir o modal de edição e trazer os dados do banco
const showDataEvent = (item: any) => {
    form.id = item['id'],
    form.name = item['Nome'],

    //Função para abrir o modal após trazer os campos já preenchidos
    isOpenEditModal.value = true;
}

//Função fechar modal
const closeModalEdit = () => {
    isOpenEditModal.value = false;

    //Limpa os campos do edit modal
    clearForm();
}

//Função para limpar os campos do modal de edição
const clearForm = () => {
    form.name = '',
    errors.name = false
}

const update = async () => {
    if(validateForm()){
        // eslint-disable-next-line no-useless-catch
        try{
            const newEvent: any = await eventStore.updateEvent(clubSlug, form);

            //Fechar modal
            closeModalEdit();

            const event = {
                id: newEvent.id,
                "Nome": newEvent.name,
            }


            if(event){
                const index = dataTable.value.findIndex((item) => item.id == newEvent.id);
                
                if(index !== -1){
                    dataTable.value[index] = event;
                    console.log('passou aqui', dataTable.value);
                }
            }

        }catch(error){
            throw error;
        }
    }
}


// const searchSubmit = async (event: any) => {
//     //buscar somente se tiver mais de 3 caracteres, a não ser que seja para apagar a busca
//     if (event.target.value.length < 3 && event.target.value.length > 0) {
//         return;
//     }

//     const url = `users?page=${users.value.current_page}&search=${event.target.value}`;

//     try {
//         await userStore.fetchUsers(url);
//         users.value = userStore.getUsers;
//     } catch (error) {
//         console.error(error);
//     }
// };
</script>