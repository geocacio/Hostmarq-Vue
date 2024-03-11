<template>
    <BreadcrumbComponent title="Associados" />

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
        </div>
    </div>

    <div class="row row-gap-15">

        <TableComponent :items="dataTable" :actions="actions"/>

    </div>

    <!-- <PaginationComponent class="mt-5" :links="users.links" :currentPage="users.current_page" @update:pageUrl="fetchPage" /> -->
    <!-- <PaginationComponent class="mt-5" :data="users" @update:pageUrl="fetchPage" /> -->
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
import { useEventStore } from '@/stores/modules/Event';

const eventStore = useEventStore();
const events = ref([]);

interface dataTable {
    id: number;
    name: string;
}
const dataTable = ref<dataTable[]>([]);

interface Form {
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

const removeWeaponType = async(itemSlug: string) => {
    await eventStore.deleteEvent("carcara", itemSlug)
}

const editCaliber = async(item: object) => {
    
}

onMounted(async () => {
    try {
        await eventStore.fetchEvents('carcara');
        events.value = eventStore.getEvents;

        dataTable.value = events.value.map((item) => {
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
            const newWeaponType: any = await eventStore.createEvent("carcara", form);
            document.getElementById('closeModal-new-user')?.click();
            
            if (newWeaponType){
                dataTable.value.push(newWeaponType);
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

    const url = `users?page=${users.value.current_page}&search=${event.target.value}`;

    try {
        await userStore.fetchUsers(url);
        users.value = userStore.getUsers;
    } catch (error) {
        console.error(error);
    }
};

</script>