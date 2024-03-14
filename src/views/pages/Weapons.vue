<template>
    <BreadcrumbComponent title="Armas" />

    <div class="dashboard-header flex-horizontal">
        <div class="search-container">
            <InputComponent type="text" placeholder="Pesquisar" v-model="search" @input="searchSubmit" />
        </div>
        <div class="dashboard-actions">

            <ModalComponent id="new-user" buttonText="Novo">

                <div class="mb-3">
                    <LabelComponent text="Sigma" />
                    <InputComponent type="text" placeholder="Sigma" v-model="form.number_sigma" :validation="true"
                        :error="errors.number_sigma" :error-message="'Por favor, o sigma da arma.'"
                        @input="errors.number_sigma = false" />
                </div>

                <div class="mb-3">
                    <LabelComponent text="Origem" />
                    <select class="form-control" v-model="form.origin">
                        <option value="">Selecione a origem</option>
                        <option value="Armamento do clube">Armamento do clube</option>
                        <option value="Armamento do instrutor">Armamento do instrutor</option>
                    </select>
                    <div v-if="errors.origin" class="error-message">
                        Por favor, a origem.
                    </div>
                </div>

                <div class="mb-3">
                    <LabelComponent text="Tipo" />
                    <SelectComponent :options="allTypes" v-model="form.type_id" placeholder="Selecione o Tipo" />
                    <div v-if="errors.caliber_id" class="error-message">
                        Por favor, o calibre.
                    </div>
                </div>

                <div class="mb-3">
                    <LabelComponent text="Modelo" />
                    <SelectComponent :options="allModels" v-model="form.model_id" />
                    <div v-if="errors.caliber_id" class="error-message">
                        Por favor, o calibre.
                    </div>
                </div>

                <div class="mb-3">
                    <LabelComponent text="Calibre" />
                    <SelectComponent :options="allCalibers" v-model="form.caliber_id" />
                    <div v-if="errors.caliber_id" class="error-message">
                        Por favor, o calibre.
                    </div>
                </div>

                <div class="mb-3 text-center">
                    <ButtonComponent buttonClass="dark-blue" @click="submit" text="Criar" />
                </div>

            </ModalComponent>
            <NewModalComponent :isOpen="isOpenEditModal" @update:is-open="closeEditModal">
                <div class="mb-3">
                    <LabelComponent text="Nome" />
                    <InputComponent type="text" placeholder="Nome" v-model="form.name" :validation="true"
                        :error="errors.name" :error-message="'Porfavor, insira o tipo'" @input="errors.name = false" />
                </div>

                <div class="text-center">
                    <ButtonComponent button-class="dark-blue" @click="update" text="Atualizar" />
                </div>
            </NewModalComponent>

            <ModalConfirmationComponent :isOpen="isOpenDeleteModal" :closeDeleteModal="closeDeleteModal"
                :confirmRemove="removeType" text="Tem certeza que deseja excluir este tipo?" />

        </div>
    </div>

    <div class="row row-gap-15" v-if="hasData()">
        <TableComponent :items="dataTable" :actions="actions" />
        <PaginationComponent class="mt-5" :data="weapons" @update:pageUrl="fetchPage" />
    </div>

    <BoxMessageComponent text="Nenhuma arma encontrada." icon="close-circle" v-else />
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
import { useWeaponStore } from '@/stores/modules/weapon';
import type { Action } from '@/types/actionType';
import NewModalComponent from '@/components/NewModalComponent.vue';

// Acessar os dados do usuário conectado
import { useAuthStore } from '@/stores/modules/auth';
import ModalConfirmationComponent from '@/components/ModalConfirmationComponent.vue';
import BoxMessageComponent from '@/components/BoxMessageComponent.vue';
import useClubStore from '@/stores/modules/club';
import SelectComponent from '@/components/form/SelectComponent.vue';


const authStore = useAuthStore();
const loggedInuser = authStore.getUser;
// Acessar o slug do clube do usuário conectado
const clubSlug = (loggedInuser as { club?: { slug: string } })?.club?.slug ?? '';

const weaponStore = useWeaponStore();
const weapons = ref([]);

const clubStore = useClubStore();
const club = ref([]);


interface dataTable {
    id: number | string;
    'Nome': string;
}
const dataTable = ref<dataTable[]>([]);

interface Form {
    id?: number | string;
    user_id?: number | string,
    number_sigma: string;
    origin: string,
    caliber_id: number | string,
    model_id: number | string,
    type_id: number | string,
}

const form = reactive<Form>({
    number_sigma: '',
    origin: '',
    caliber_id: '',
    model_id: '',
    type_id: ''
});

const hasData = () => dataTable.value.length > 0;

const search = ref('');

//Função da páginação
const fetchPage = async (label: string) => {
    let url = `clubs/${clubSlug}/weapons?page=${label}`;
    url = search.value ? `${url}&search=${search.value}` : url;

    // eslint-disable-next-line no-useless-catch
    try {
        await weaponStore.fetchWeapons(clubSlug, url);
        weapons.value = weaponStore.getWeapons;

        dataTable.value = weapons.value.data.map((item: { id: any; name: any; }) => {
            return ({
                id: item.id,
                'Número do sigma': newWeapon.number_sigma
            })
        });
    } catch (error) {
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
        //Pega os dados do clube (calibres, modelos e tipos de armas)
        const clubResponse = await clubStore.show(clubSlug);
        club.value = clubStore.getClub;

        //Prepara os dados do calibres para o select
        allCalibers.value = getCalibersToSelectList();

        //prepara os dados dos modelos para o select
        allModels.value = getModelsToSelectList();

        //prepara os dados dos tipos de armas para o select
        allTypes.value = getTypesToSelectList();

        await weaponStore.fetchWeapons(clubSlug);
        weapons.value = weaponStore.getWeapons;

        dataTable.value = weapons.value.data.map((item: any) => {
            return {
                id: item.id,
                'Número do sigma': item.number_sigma
            };
        });
    } catch (error) {
        console.error(error);
    }
});

const errors = reactive({
    number_sigma: false,
    origin: false,
    caliber_id: false,
    model_id: false,
    type_id: false,
});

const validateForm = () => {
    errors.number_sigma = !form.number_sigma;
    errors.origin = !form.origin;
    errors.caliber_id = !form.caliber_id;
    errors.model_id = !form.model_id;
    errors.type_id = !form.type_id;

    return !errors.number_sigma && !errors.origin && !errors.caliber_id && !errors.model_id && !errors.type_id;
};

const submit = async () => {

    if (validateForm()) {

        try {
            const newWeapon: any = await weaponStore.createWeapon(clubSlug, form);
            document.getElementById('closeModal-new-user')?.click();
            const weapon = {
                id: newWeapon.id,
                'Número do sigma': newWeapon.number_sigma
            }

            if (weapon) {
                dataTable.value.push(weapon);

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
    if (validateForm()) {
        // eslint-disable-next-line no-useless-catch
        try {
            const updateWeaponType: any = await weaponStore.updateWeaponType(clubSlug, form);

            //Fechar o modal
            closeEditModal();

            let weaponType = {
                id: updateWeaponType.id,
                'Nome': updateWeaponType.name
            }

            if (weaponType) {
                const index = dataTable.value.findIndex((item) => item.id == updateWeaponType.id)

                if (index !== -1) {
                    dataTable.value[index] = weaponType;
                }
            }

        } catch (error) {
            throw error;
        }
    }
}

const searchSubmit = async (event: any) => {
    //Busca somente se tiver mais de 3 caracteres, a não ser que seja para apagar a busca
    if (event.target.value.length < 3 && event.target.value.length > 0) {
        return;
    }

    console.log()

    const url = `weapons?page=${weapons.value.current_page}&search=${event.target.value}`;

    // eslint-disable-next-line no-useless-catch
    try {
        await weaponStore.fetchWeapons(clubSlug, url);
        weapons.value = weaponStore.getWeapons;
        dataTable.value = weapons.value.data.map((item: any) => {
            return {
                id: item.id,
                'Número do sigma': item.number_sigma
            }
        })
    } catch (error) {
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
    await weaponStore.deleteWeapon(clubSlug, itemId);
    const index = dataTable.value.findIndex((item: any) => item.id === itemId);
    if (index !== -1) {
        dataTable.value.splice(index, 1);
    }

    //fechar o modal de confirmação
    closeDeleteModal();
}

const allCalibers = ref([]);
const allModels = ref([]);
const allTypes = ref([]);

const getCalibersToSelectList = () => club.value.calibers.map((item: any) => ({ text: item.name, value: item.id }));

const getModelsToSelectList = () => club.value.weapon_models.map((item: any) => ({ text: item.name, value: item.id }));

const getTypesToSelectList = () => club.value.weapon_types.map((item: any) => ({ text: item.name, value: item.id }));

</script>

<style scoped>
.error-message {
    color: red;
}
</style>