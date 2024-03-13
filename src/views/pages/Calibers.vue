<template>
    <BreadcrumbComponent title="Calibres" />

    <div class="dashboard-header flex-horizontal">
        <div class="search-container">
            <InputComponent type="text" placeholder="Pesquisar" v-model="search" @input="searchSubmit" />
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


            <!-- Modal de editar -->
            <NewModalComponent :isOpen="isOpenEditModal" @update:isOpen="closeEditModal">
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

            <ModalConfirmationComponent
                :isOpen="isOpenDeleteModal"
                :closeDeleteModal="closeDeleteModal"
                :confirmRemove="removeCaliber"
                text="Tem certeza que deseja excluir este calibre?"/>

        </div>
    </div>
    
    <div class="row row-gap-15" v-if="hasData()">

        <TableComponent :items="dataTable" :actions="actions" />
        <PaginationComponent class="mt-5" :data="calibers" @update:pageUrl="fetchPage" />

    </div>

    <BoxMessageComponent text="Nenhum calibre encontrado." icon="close-circle" v-else/>
    <!-- <div class="empty-data" v-else>
        <IconClose />
        <p></p>
    </div> -->
    
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
import BoxMessageComponent from '@/components/BoxMessageComponent.vue';
import ModalConfirmationComponent from '@/components/ModalConfirmationComponent.vue';

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

const hasData = () => dataTable.value.length > 0;

const search = ref('');

const fetchPage = async (label: string) => {
    let url = `clubs/${clubSlug}/calibres?page=${label}`;
    url = search.value ? `${url}&search=${search.value}` : url;
    try {
        await caliberStore.fetchCalibers(clubSlug, url);
        calibers.value = caliberStore.getCalibers;

        dataTable.value = calibers.value.data.map((item: any) => {
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
};

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
            //chamar modal de confirmação
            confirmDeleteItem(item);
        },
        icon: 'trash',
        class: 'light red',
    },
];

onMounted(async () => {
    try {
        await caliberStore.fetchCalibers(clubSlug);
        calibers.value = caliberStore.getCalibers;

        dataTable.value = calibers.value.data.map((item: any) => {
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
const closeEditModal = () => {

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
            closeEditModal();

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

const searchSubmit = async (event: any) => {
    //buscar somente se tiver mais de 3 caracteres, a não ser que seja para apagar a busca
    if (event.target.value.length < 3 && event.target.value.length > 0) {
        return;
    }

    //url da paginação
    const url = `clubs/${clubSlug}/calibres?page=${calibers.value.current_page}&search=${event.target.value}`;

    try {
        await caliberStore.fetchCalibers(clubSlug, url);
        calibers.value = caliberStore.getCalibers;

        dataTable.value = calibers.value.data.map((item: any) => {
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
}

//constante para armazenar o calibre que será excluído
const itemToDelete = ref(null);

//constante para abrir o modal de confimação de exclusão
const isOpenDeleteModal = ref(false);

//constante para fechar o modal de confimação de exclusão
const closeDeleteModal = () => {

    //limpar a constante
    itemToDelete.value = null;
    isOpenDeleteModal.value = false;
}

//função para confirmar a exclusão do calibre
const confirmDeleteItem = (item: any) => {
    itemToDelete.value = item;
    isOpenDeleteModal.value = true;
}

const removeCaliber = async () => {
    let itemSlug = itemToDelete.value.slug;
    await caliberStore.deleteCaliber(clubSlug, itemSlug)
    const index = dataTable.value.findIndex((item: any) => item.slug === itemSlug);
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