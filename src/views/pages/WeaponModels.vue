<template>
    <BreadcrumbComponent title="Modelos de armas" />

    <div class="dashboard-header flex-horizontal">
        <div class="search-container">
            <InputComponent type="text" placeholder="Pesquisar" v-model="search" @input="searchSubmit" />
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

            <NewModalComponent :isOpen="isOpenEditModal" @update:isOpen="closeEditModal">
                <div class="mb-3">
                    <LabelComponent text="Nome"/>
                    <InputComponent type="text" placeholder="Nome" v-model="form.name" :validation="true"
                        :error="errors.name" :error-message="'Porfavor, insira o modelo'" @input="errors.name = false"/>
                </div>
                <div class="text-center">
                    <ButtonComponent button-class="dark-blue" @click="update" text="Atualizar"/>
                </div>
            </NewModalComponent>

            <ModalConfirmationComponent
                :isOpen="isOpenDeleteModal"
                :closeDeleteModal="closeDeleteModal"
                :confirmRemove="removeWeaponModel"
                text="Tem certeza que deseja excluir este evento?"/>
        </div>
    </div>

    <div class="row row-gap-15" v-if="hasData()">

        <TableComponent :items="dataTable" :actions="actions"/>
        <PaginationComponent class="mt-5" :data="weaponModel" @update:pageUrl="fetchPage" />

    </div>

    <BoxMessageComponent text="Nenhum modelo encontrado." icon="close-circle" v-else/>

</template>

<script setup lang="ts">
import BreadcrumbComponent from '@/components/BreadcrumbComponent.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import InputComponent from '@/components/form/InputComponent.vue';
import { ref, onMounted, reactive } from 'vue';
import ModalComponent from '@/components/ModalComponent.vue';
import LabelComponent from '@/components/form/LabelComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import TableComponent from '@/components/TableComponent.vue';
import { useWeaponModelStore } from '@/stores/modules/weaponModel';
import type { Action } from '@/types/actionType';

// Acessar os dados do usuário conectado
import { useAuthStore } from '@/stores/modules/auth';
import NewModalComponent from '@/components/NewModalComponent.vue';
import ModalConfirmationComponent from '@/components/ModalConfirmationComponent.vue';
import BoxMessageComponent from '@/components/BoxMessageComponent.vue';
const authStore = useAuthStore();
const loggedInuser = authStore.getUser;
// Acessar o slug do clube do usuário conectado
const clubSlug = (loggedInuser as { club?: { slug: string } })?.club?.slug ?? '';

const weaponModelStore = useWeaponModelStore();
const weaponModel = ref([]);

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

const hasData = () => dataTable.value.length > 0;

const search = ref('');

//Função da páginação
const fetchPage = async (label: string) => {
    let url = `clubs/${clubSlug}/weapon-models?page=${label}`;
    url = search.value ? `${url}&search=${search.value}` : url;

    // eslint-disable-next-line no-useless-catch
    try{
        await weaponModelStore.fetchWeaponModels(clubSlug, url);
        weaponModel.value = weaponModelStore.getWeaponModels;

        dataTable.value = weaponModel.value.data.map((item: { id: any; name: any; }) => {
            return({
                id: item.id,
                "Nome": item.name
            })
        });
    }catch(error){
        throw error;
    }
}

const actions: Action[] = [
    {
        name: 'edit',
        action: (item) => {
            showDataCaliber(item);
        },
        icon: 'edit',
        class: 'light blue',
    },
    {
        name: 'delete',
        action: (item: any) => {
            confirmDeleteItem(item.id);
        },
        icon: 'trash',
        class: 'light red',
    },
];

onMounted(async () => {
    try {
        await weaponModelStore.fetchWeaponModels(clubSlug);
        weaponModel.value = weaponModelStore.getWeaponModels;

        dataTable.value = weaponModel.value.data.map((item: any) => {
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
            const newWeaponModel: any = await weaponModelStore.createWeaponModel(clubSlug, form);
            document.getElementById('closeModal-new-user')?.click();
            const weaponModel = {
                id: newWeaponModel.id,
                'Nome': newWeaponModel.name
            }
            
            if (weaponModel){
                dataTable.value.push(weaponModel);

                clearForm();
            }

        } catch (error) {
            console.error(error);
        }
    }

};

//const para abrir o modal de edição
const isOpenEditModal = ref(false);

//const para fechar o modal de edição
const closeEditModal = () => {
    isOpenEditModal.value = false;

    //limpar o formulário
    clearForm();
}

//Funcção para mostrar os dados do modelo no modal de edição
const showDataCaliber = (item: any) => {
    form.id = item['id']
    form.name = item['Nome']

    isOpenEditModal.value = true;
};

//Função para limpar o modal de edição
const clearForm = () => {
    form.name = '';
    errors.name = false;
};

//Função para atualizar o Modelo da Arma
const update = async () => {
    if(validateForm()){
        try{
            const updateWeaponModel: any = await weaponModelStore.updateWeaponModel(clubSlug, form);

            //Fechar o modal editar
            closeEditModal();
            
            let weaponModel = { 
                id: updateWeaponModel.id,
                'Nome': updateWeaponModel.name
            }

            if(weaponModel){
                const index = dataTable.value.findIndex((item) => item.id == updateWeaponModel.id);
                if(index !== -1) {
                    dataTable.value[index] = weaponModel;
                }

                //Limpar o formulário
                clearForm();
            }

        }catch(error){
            console.error(error);
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


const searchSubmit = async (event: any) => {
    //Busca somente se tiver mais de 3 caracteres, a não ser que seja para apagar a busca
    if(event.target.value.length < 3 && event.target.value.length > 0) {
        return;
    }

    const url = `clubs/${clubSlug}/weapon-models?page=${weaponModel.value.current_page}&search=${event.target.value}`;

    // eslint-disable-next-line no-useless-catch
    try{
        await weaponModelStore.fetchWeaponModels(clubSlug, url);
        weaponModel.value = weaponModelStore.getWeaponModels;
        dataTable.value = weaponModel.value.data.map((item: any) => {
            return{
                id: item.id,
                "Nome": item.name
            }
        })
    }catch(error){
        throw error;
    }
}

//constante para armazenar o calibre que será excluído
const itemToDelete = ref(null);

//constante para abrir o modal de confimação de exclusão
const isOpenDeleteModal = ref(false);

//função para confirmar a exclusão do calibre
const confirmDeleteItem = (item: any) => {
    itemToDelete.value = item;
    isOpenDeleteModal.value = true;
}

//constante para fechar o modal de confimação de exclusão
const closeDeleteModal = () => {

    //limpar a constante
    itemToDelete.value = null;
    isOpenDeleteModal.value = false;
}

const removeWeaponModel = async () => {
    let itemId = itemToDelete.value;
    await weaponModelStore.deleteWeaponModel(clubSlug, itemId)
    const index = dataTable.value.findIndex((item: any) => item.id === itemId);
    if (index !== -1) {
        dataTable.value.splice(index, 1);
    }

    //fechar o modal de confirmação
    closeDeleteModal();
}

</script>