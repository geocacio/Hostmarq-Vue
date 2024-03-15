<template>
    <BreadcrumbComponent title="Armas" />

    <div class="dashboard-header flex-horizontal">
        <div class="search-container">
            <InputComponent type="text" placeholder="Pesquisar" v-model="search" @input="searchSubmit" />
        </div>
        <div class="dashboard-actions">

            <ModalComponent id="new-user" buttonText="Novo">

                <div class="mb-3">
                    <LabelComponent text="Data e hora" />
                    <InputComponent type="text" placeholder="Data e hora" v-model="form.date_time" />
                    <div v-if="errors.date_time" class="error-message">
                        Por favor, Insira uma data e hora.
                    </div>
                </div>

                <div class="mb-3">
                    <LabelComponent text="Local" />
                    <SelectComponent :options="allLocations" v-model="form.location_id" placeholder="Selecione um local" />
                    <div v-if="errors.location_id" class="error-message">
                        Por favor, Selecione um local.
                    </div>
                </div>

                <div class="mb-3">
                    <LabelComponent text="Evento" />
                    <SelectComponent :options="allEvents" v-model="form.event_id" placeholder="Selecione um evento" />
                    <div v-if="errors.event_id" class="error-message">
                        Por favor, Selecione um evento.
                    </div>
                </div>

                <div class="mb-3">
                    <LabelComponent text="Origem da arma" />
                    <SelectComponent :options="origin" placeholder="Selecione a origem da Arma" />
                </div>

                <div class="mb-3">
                    <LabelComponent text="Arma" />
                    <SelectComponent :options="allCalibers" v-model="form.weapon_id" placeholder="Selecione uma arma" />
                    <div v-if="errors.weapon_id" class="error-message">
                        Por favor, Selecione uma arma.
                    </div>
                </div>

                <div class="mb-3">
                    <LabelComponent text="Quantidade" />
                    <InputComponent type="number" placeholder="Quantidade de tiros" v-model="form.quantity" />
                    <div v-if="errors.quantity" class="error-message">
                        Por favor, Insira a quantidade de tiros.
                    </div>
                </div>

                <div class="mb-3">
                    <LabelComponent text="Origem da munição" />
                    <SelectComponent :options="originOfAmmunition" v-model="form.origin" placeholder="Origem da munição" />
                    <div v-if="errors.origin" class="error-message">
                        Por favor, Selecione a Origem da munição.
                    </div>
                </div>

                <div class="mb-3">
                    <LabelComponent text="Tipo de Munição" />
                    <SelectComponent :options="typeAmmunition" v-model="form.type" placeholder="Tipo de Munição" />
                    <div v-if="errors.type" class="error-message">
                        Por favor, Selecione o Tipo de Munição.
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

//armas do club
const clubWeapons = ref([]);

//armas do usuário
const userWeapons = ref([]);


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
    date_time: string;
    event_id: string | number,
    location_id: number | string,
    quantity: number | string,
    origin: string,
    type: string,
}

const form = reactive<Form>({
    weapon_id: 3,
    date_time: "2022-03-01T14:30:00",
    event_id: '',
    location_id: '',
    quantity: 10,
    origin: "Clube",
    type: "Original"
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

        //Peprar os dados dos eventos para o select
        allEvents.value = allEventsToSelectList();

        //Prepara os dados dos locais para o select
        allLocations.value = allLocationsToSelectList();


        await habitualityStore.fetchHabitualities(clubSlug);
        habitualities.value = habitualityStore.getHabitualities;
        console.log(habitualities.value.data);
        
        dataTable.value = habitualities.value.data.map((item: any) => {
            return {
                'Data e hora': item.date_time,
                'Evento': item.event.name,
                'Local': item.location.name,
                'Quantidade': item.quantity,
                'Origem': item.origin,
                'Tipo': item.type,
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
    console.log('passou pela função submit')
    // if (validateForm()) {
        console.log('passou pela validação')
        try {
            const newHabituality: any = await habitualityStore.creatingHabituality(clubSlug, form);
            document.getElementById('closeModal-new-user')?.click();
            const habituality = {
                'Data e hora': newHabituality.date_time,
                allData: newHabituality
            }

            if (habituality) {
                dataTable.value.push(habituality);

                clearForm();
            }

        } catch (error) {
            console.error(error);
        }
    // }

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

const allEvents = ref([]);
const allLocations = ref([]);
const originOfAmmunition = [
    {
        value: 'clube',
        text: 'Clube'
    },
    {
        value: 'Atirador',
        text: 'Atirador'
    }

];

const typeAmmunition = [
    {
        value: 'Original',
        text: 'Original'
    },
    {
        value: 'Recarregada',
        text: 'Recarregada'
    }
]

const allEventsToSelectList = () => club.value.events.map((item: any) => ({ text: item.name, value: item.id }));

const allLocationsToSelectList = () => club.value.locations.map((item: any) => ({ text: item.name, value: item.id }));

</script>

<style scoped>
.error-message {
    color: red;
}
</style>