<template>
    <BreadcrumbComponent title="Tipos de arma" />

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
            <NewModalComponent :isOpen="isOpenEditModal" @update:is-open="closeEditModal">
                <div class="mb-3">
                    <LabelComponent text="Nome"/>
                    <InputComponent type="text" placeholder="Nome" v-model="form.name" :validation="true" :error="errors.name" :error-message="'Porfavor, insira o tipo'" @input="errors.name = false"/>
                </div>

                <div class="text-center">
                    <ButtonComponent button-class="dark-blue" @click="update" text="Atualizar" />
                </div>
            </NewModalComponent>

            <ModalConfirmationComponent
                :isOpen="isOpenDeleteModal"
                :closeDeleteModal="closeDeleteModal"
                :confirmRemove="removeType"
                text="Tem certeza que deseja excluir este tipo?"/>

        </div>
    </div>

    <div class="row row-gap-15" v-if="hasData()">
        <TableComponent :items="dataTable" :actions="actions"/>
        <PaginationComponent class="mt-5" :data="weaponTypes" @update:pageUrl="fetchPage" />
    </div>

    <BoxMessageComponent text="Nenhum tipo encontrado." icon="close-circle" v-else/>
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
import { useWeaponTypeStore } from '@/stores/modules/weaponType';
import type { Action } from '@/types/actionType';
import NewModalComponent from '@/components/NewModalComponent.vue';

// Acessar os dados do usuário conectado
import { useAuthStore } from '@/stores/modules/auth';
import ModalConfirmationComponent from '@/components/ModalConfirmationComponent.vue';
import BoxMessageComponent from '@/components/BoxMessageComponent.vue';


const authStore = useAuthStore();
const loggedInuser = authStore.getUser;
// Acessar o slug do clube do usuário conectado
const clubSlug = (loggedInuser as { club?: { slug: string } })?.club?.slug ?? '';

const weaponTypeStore = useWeaponTypeStore();
const weaponTypes = ref([]);

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
    let url = `clubs/${clubSlug}/weapon-types?page=${label}`;
    url = search.value ? `${url}&search=${search.value}` : url;

    // eslint-disable-next-line no-useless-catch
    try{
        await weaponTypeStore.fetchWeaponTypes(clubSlug, url);
        weaponTypes.value = weaponTypeStore.getWeaponTypes;

        dataTable.value = weaponTypes.value.data.map((item: { id: any; name: any; }) => {
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
        action: (item: any) => {
            showDataType(item);
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
        await weaponTypeStore.fetchWeaponTypes(clubSlug);
        weaponTypes.value = weaponTypeStore.getWeaponTypes;

        dataTable.value = weaponTypes.value.data.map((item: any) => {
            return {
                id: item.id,
                'Nome': item.name,
            };
        });
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
            const newWeaponType: any = await weaponTypeStore.createWeaponType(clubSlug, form);
            document.getElementById('closeModal-new-user')?.click();
            const weapontType = {
                id: newWeaponType.id,
                'Nome': newWeaponType.name
            }
            
            if (weapontType){
                dataTable.value.push(weapontType);

                clearForm();
            }

        } catch (error) {
            console.error(error);
        }
    }

};

//Const para abrir modalEditar
const isOpenEditModal = ref(false);

//const para fechar modalEditar
const closeEditModal = () => {
    isOpenEditModal.value = false;

    //Limpar o formulário
    clearForm();
}

//Função para mostrar os dados do tipo no modal de edição
const showDataType = (item: any) => {
    form.id = item['id'],
    form.name = item['Nome'],

    isOpenEditModal.value = true;
}

//Função para limpar o modal editar
const clearForm = () => {
    form.name = '';
    errors.name = false;
}

//Função para atualizar o tipo da Arma
const update = async () => {
    if(validateForm()){
        // eslint-disable-next-line no-useless-catch
        try {
            const updateWeaponType: any = await weaponTypeStore.updateWeaponType(clubSlug, form);

            //Fechar o modal
            closeEditModal();

            let weaponType = {
                id: updateWeaponType.id,
                'Nome': updateWeaponType.name
            }

            if(weaponType){
                const index = dataTable.value.findIndex((item) => item.id == updateWeaponType.id)

                if(index !== -1){
                    dataTable.value[index] = weaponType;
                }
            }

        }catch(error){
            throw error;
        }
    }
}

const searchSubmit = async (event: any) => {
    //Busca somente se tiver mais de 3 caracteres, a não ser que seja para apagar a busca
    if(event.target.value.length < 3 && event.target.value.length > 0) {
        return;
    }

    const url = `clubs/${clubSlug}/weapon-types?page=${weaponTypes.value.current_page}&search=${event.target.value}`;

    // eslint-disable-next-line no-useless-catch
    try{
        await weaponTypeStore.fetchWeaponTypes(clubSlug, url);
        weaponTypes.value = weaponTypeStore.getWeaponTypes;
        dataTable.value = weaponTypes.value.data.map((item: any) => {
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

const removeType = async () => {
    let itemId = itemToDelete.value;
    await weaponTypeStore.deleteWeaponType(clubSlug, itemId);
    const index = dataTable.value.findIndex((item: any) => item.id === itemId);
    if (index !== -1) {
        dataTable.value.splice(index, 1);
    }

    //fechar o modal de confirmação
    closeDeleteModal();
}


</script>