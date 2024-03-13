<template>
    <BreadcrumbComponent title="Localizações" />

    <div class="dashboard-header flex-horizontal">
        <div class="search-container">
            <InputComponent type="text" placeholder="Pesquisar" v-model="search" @input="searchSubmit" />
        </div>
        <div class="dashboard-actions">

            <ModalComponent id="new-user" buttonText="Novo">

                <div class="mb-3">
                    <LabelComponent text="Local" />
                    <InputComponent type="text" placeholder="Local" v-model="form.name" :validation="true"
                        :error="errors.name" :error-message="'Por favor, insira um local.'"
                        @input="errors.name = false" />
                </div>

                <div class="mb-3 text-center">
                    <ButtonComponent buttonClass="dark-blue" @click="submit" text="Criar" />
                </div>

            </ModalComponent>


            <!-- Modal de editar -->
            <NewModalComponent :isOpen="isOpenEditModal" @update:isOpen="closeEditModal">
                <div class="mb-3">
                    <LabelComponent text="Local" />
                    <InputComponent type="text" placeholder="Local" v-model="form.name" :validation="true"
                        :error="errors.name" :error-message="'Por favor, insira um local.'"
                        @input="errors.name = false" />
                </div>

                <div class="text-center">
                    <ButtonComponent buttonClass="dark-blue" @click="update" text="Atualizar" />
                </div>
            </NewModalComponent>

            <!-- Modal de confirmação de exclusão -->
            <NewModalComponent :isOpen="isOpenDeleteModal" @update:isOpen="closeDeleteModal">
                <div class="mb-3">
                    <p>Tem certeza que deseja excluir este Local?</p>
                </div>
                <div>
                    <ButtonComponent buttonClass="dark-blue" @click="removeLocation" text="confirmar" />
                </div>
            </NewModalComponent>

        </div>
    </div>
    
    <div class="row row-gap-15" v-if="hasData()">

        <TableComponent :items="dataTable" :actions="actions" />
        <PaginationComponent class="mt-5" :data="locations" @update:pageUrl="fetchPage" />

    </div>

    <div class="empty-data" v-else>
        <p>Nenhuma Local encontrado.</p>
    </div>
    
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
import { useLocationStore } from '@/stores/modules/location';
import type { Location } from '@/types/locationType';
import type { Action } from '@/types/actionType';

// Acessar os dados do usuário conectado
import { useAuthStore } from '@/stores/modules/auth';
const authStore = useAuthStore();
const loggedInuser = authStore.getUser;
// Acessar o slug do clube do usuário conectado
const clubSlug = (loggedInuser as { club?: { slug: string } })?.club?.slug ?? '';

const locationStore = useLocationStore();
const locations = ref<Location[]>([]);

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

const fetchPage = async (label: string) => {
    let url = `clubs/${clubSlug}/locations?page=${label}`;
    url = search.value ? `${url}&search=${search.value}` : url;
    try {
        await locationStore.fetchLocations(clubSlug, url);
        locations.value = locationStore.getLocations;

        dataTable.value = locations.value.data.map((item: any) => {
            return {
                id: item.id,
                'Nome': item.name,
            }
        })

    } catch (error) {
        console.error(error);
    }
};

const actions: Action[] = [
    {
        name: 'edit',
        action: (item: any) => {
            //chamar modal de edição
            showdataLocation(item);
        },
        icon: 'edit',
        class: 'light blue',
    },
    {
        name: 'delete',
        action: (item: any) => {
            //chamar modal de confirmação
            confirmDeleteItem(item);
        },
        icon: 'trash',
        class: 'light red',
    },
];

onMounted(async () => {
    try {
        await locationStore.fetchLocations(clubSlug);
        locations.value = locationStore.getLocations;

        dataTable.value = locations.value.data.map((item: any) => {
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
});

const validateForm = () => {
    errors.name = !form.name;

    return !errors.name;
};

const submit = async () => {

    if (validateForm()) {
        try {
            const newLocation: any = await locationStore.createLocation(clubSlug, form);
            document.getElementById('closeModal-new-user')?.click();
            let location = {
                id: newLocation.id,
                'Nome': newLocation.name,
            }
            if (location) {
                dataTable.value.push(location);
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
const closeEditModal = () => {

    isOpenEditModal.value = false;

    //limpar o formulário
    clearForm();
};

//função para mostrar os dados do local no modal de edição
const showdataLocation = (item: any) => {
    form.id = item['id'];
    form.name = item['Nome'];

    //abrindo o modal de edição
    isOpenEditModal.value = true;
};

//funçõ para limpar o formulário
const clearForm = () => {
    form.name = '';
    errors.name = false;
};

//atualizar a lozalização
const update = async () => {
    if (validateForm()) {
        try {
            const updatedLocation: any = await locationStore.updateLocation(clubSlug, form);
            //fechar o modal de edição
            closeEditModal();

            if (updatedLocation) {
                
                let location = {
                    id: updatedLocation.id,
                    'Nome': updatedLocation.name,
                }

                const index = dataTable.value.findIndex((item: any) => item.id === updatedLocation.id);
                if (index !== -1) {
                    dataTable.value[index] = location;
                }

                //limpar o formulário
                clearForm();
            }
        } catch (error) {
            console.error(error);
        }
    }
};

const searchSubmit = async (event: any) => {
    //buscar somente se tiver mais de 3 caracteres, a não ser que seja para apagar a busca
    if (event.target.value.length < 3 && event.target.value.length > 0) {
        return;
    }

    //url da paginação
    const url = `clubs/${clubSlug}/locations?page=${locations.value.current_page}&search=${event.target.value}`;

    try {
        await locationStore.fetchLocations(clubSlug, url);
        locations.value = locationStore.getLocations;

        dataTable.value = locations.value.data.map((item: any) => {
            return {
                id: item.id,
                'Nome': item.name,
            }
        })
    } catch (error) {
        console.error(error);
    }
}

//constante para armazenar o local que será excluído
const itemToDelete = ref(null);

//constante para abrir o modal de confimação de exclusão
const isOpenDeleteModal = ref(false);
//constante para fechar o modal de confimação de exclusão
const closeDeleteModal = () => {

    //limpar a constante
    itemToDelete.value = null;
    isOpenDeleteModal.value = false;
}

//função para confirmar a exclusão do local
const confirmDeleteItem = (item: any) => {
    itemToDelete.value = item;
    isOpenDeleteModal.value = true;
}

const removeLocation = async () => {
    let itemId = itemToDelete.value.id;
    await locationStore.deleteLocation(clubSlug, itemId)
    const index = dataTable.value.findIndex((item: any) => item.id === itemId);
    if (index !== -1) {
        dataTable.value.splice(index, 1);
    }

    //fechar o modal de confirmação
    closeDeleteModal();
}

</script>

<style scoped>
.error-message {
    color: red;
}
</style>