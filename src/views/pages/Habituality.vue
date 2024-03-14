<template>
    <BreadcrumbComponent title="Armas" />

    <div class="dashboard-header flex-horizontal">
        <div class="search-container">
            <InputComponent type="text" placeholder="Pesquisar" v-model="search" @input="searchSubmit" />
        </div>
        <div class="dashboard-actions">

            <ModalComponent id="new-user" buttonText="Novo">

                <div class="mb-3">
                    <LabelComponent text="Origem" />
                    <SelectComponent :options="origin" v-model="form.origin" placeholder="Selecione a Origem" />
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
                    <SelectComponent :options="allModels" v-model="form.model_id" placeholder="Selecione o Modelo" />
                    <div v-if="errors.caliber_id" class="error-message">
                        Por favor, o calibre.
                    </div>
                </div>

                <div class="mb-3">
                    <LabelComponent text="Calibre" />
                    <SelectComponent :options="allCalibers" v-model="form.caliber_id" placeholder="Selecione o Calibre" />
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
                    <LabelComponent text="Sigma" />
                    <InputComponent type="text" placeholder="Sigma" v-model="form.number_sigma" :validation="true"
                        :error="errors.number_sigma" :error-message="'Por favor, o sigma da arma.'"
                        @input="errors.number_sigma = false" />
                </div>

                <div class="mb-3">
                    <LabelComponent text="Origem" />
                    <SelectComponent :options="origin" v-model="form.origin" placeholder="Selecione a Origem" />
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
                    <SelectComponent :options="allModels" v-model="form.model_id" placeholder="Selecione o Modelo" />
                    <div v-if="errors.caliber_id" class="error-message">
                        Por favor, o calibre.
                    </div>
                </div>

                <div class="mb-3">
                    <LabelComponent text="Calibre" />
                    <SelectComponent :options="allCalibers" v-model="form.caliber_id" placeholder="Selecione o Calibre" />
                    <div v-if="errors.caliber_id" class="error-message">
                        Por favor, o calibre.
                    </div>
                </div>

                <div class="text-center">
                    <ButtonComponent button-class="dark-blue" @click="update" text="Atualizar" />
                </div>
            </NewModalComponent>

            <ModalConfirmationComponent :isOpen="isOpenDeleteModal" :closeDeleteModal="closeDeleteModal"
                :confirmRemove="removeWeapon" text="Tem certeza que deseja excluir este tipo?" />

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
import { useHabitualityStore } from '@/stores/modules/habitualities';
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

const habitualityStore = useHabitualityStore();
const habitualities = ref([]);

const clubStore = useClubStore();
const club = ref([]);


interface dataTable {
    id: number | string;
    'Arama': string;
    'Data': string;
    'Evento': string;
    'Local': string;
    'Quantidade': string;
    'Origem': string;
    'Tipo': string
}

const dataTable = ref<dataTable[]>([]);

interface Form {
    id?: number | string;
    weapon_id: number | string,
    data_time: string;
    event_id: string,
    location_id: number | string,
    quantity: number | string,
    origin: string,
    type: string,
}

const form = reactive<Form>({
    weapon_id: '',
    data_time: '',
    event_id: '',
    location_id: '',
    quantity: '',
    origin: '',
    type: '',
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
                'Número do sigma': item.number_sigma,
                'Origem': item.origin,
                'Calibre': item.caliber_id,
                'Modelo': item.model_id,
                'Tipo': item.type_id,
                allData: item
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
            showDataWeapon(item);
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
        await clubStore.show(clubSlug);
        club.value = clubStore.getClub;

        //Prepara os dados do calibres para o select
        // allCalibers.value = getWeaponToSelectList();
        // console.log(allCalibers.value);

        //prepara os dados dos modelos para o select
        // allModels.value = getModelsToSelectList();

        //prepara os dados dos tipos de armas para o select
        // allTypes.value = getTypesToSelectList();
        await habitualityStore.fetchHabitualities(clubSlug);
        habitualities.value = habitualityStore.getHabitualities;
        
        dataTable.value = habitualities.value.data.map((item: any) => {
            return {
                'Arma': item.allData.weapon_id,
                'Origem': item.origin,
                'Calibre': item.caliber.name,
                'Modelo': item.model.name,
                'Tipo': item.type.name,
                allData: item
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
const showDataWeapon = (item: any) => {
    form.id = item['id'],
    form.number_sigma = item['number_sigma'],
    form.origin = item['origin'],
    form.caliber_id = item['caliber_id'],
    form.model_id = item['model_id'],
    form.type_id = item['type_id']

    isOpenEditModal.value = true;
}

//Função para limpar o modal editar
const clearForm = () => {
    form.number_sigma = '',
    form.origin = '',
    form.caliber_id = '',
    form.model_id = '',
    form.type_id = ''

    errors.number_sigma = false;
    errors.origin = false;
    errors.caliber_id = false;
    errors.model_id = false;
    errors.type_id = false;
}

//Função para atualizar o tipo da Arma
const update = async () => {
    if (validateForm()) {
        // eslint-disable-next-line no-useless-catch
        try {
            const updateWeapon: any = await weaponStore.updateWeapon(form);

            //Fechar o modal
            closeEditModal();
            
            let weapon = {
                'Número do sigma': updateWeapon.number_sigma,
                'Origem': updateWeapon.origin,
                'Calibre': updateWeapon.caliber.name,
                'Modelo': updateWeapon.model.name,
                'Tipo': updateWeapon.type.name,
                allData: updateWeapon
            }

            if (weapon) {
                const index = dataTable.value.findIndex((item) => item.allData.id == updateWeapon.id)

                if (index !== -1) {
                    dataTable.value[index] = weapon;
                }
            }

            //Limpar o modal
            clearForm();

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
                'Número do sigma': item.number_sigma,
                'Origem': item.origin,
                'Calibre': item.caliber.name,
                'Modelo': item.model.name,
                'Tipo': item.type.name,
                allData: item
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

const removeWeapon = async () => {
    let itemId = itemToDelete.value;
    await weaponStore.deleteWeapon(clubSlug, itemId);
    const index = dataTable.value.findIndex((item: any) => item.allData.id === itemId);
    if (index !== -1) {
        dataTable.value.splice(index, 1);
    }

    //fechar o modal de confirmação
    closeDeleteModal();
}

const origin = [
    {
        value: 'Armamento do clube',
        text: 'Armamento do Clube'
    },
    {
        value: 'Armamento do instrutor',
        text: 'Armamento do Instrutor'
    }
]

const allCalibers = ref([]);
const allModels = ref([]);
const allTypes = ref([]);

// const getWeaponToSelectList = () => club.value.weapon.map((item: any) => ({ text: item.name, value: item.id }));

// const getModelsToSelectList = () => club.value.weapon.map((item: any) => ({ text: item.name, value: item.id }));

// const getTypesToSelectList = () => club.value.weapon_types.map((item: any) => ({ text: item.name, value: item.id }));

</script>

<style scoped>
.error-message {
    color: red;
}
</style>