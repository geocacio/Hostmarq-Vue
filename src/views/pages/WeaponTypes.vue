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
import type { User } from '@/types/userType';
import ModalComponent from '@/components/ModalComponent.vue';
import LabelComponent from '@/components/form/LabelComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import TableComponent from '@/components/TableComponent.vue';
import { useWeaponTypeStore } from '@/stores/modules/weaponType';

const weaponTypeStore = useWeaponTypeStore();
const weaponTypes = ref([]);

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

// const fetchPage = async (label: string) => {
//     let url = `users?page=${label}`;
//     url = search ? `${url}&search=${search.value}` : url;
//     try {
//         await userStore.fetchUsers(url);
//         users.value = userStore.getUsers;
//     } catch (error) {
//         console.error(error);
//     }
// };

const actions: Action[] = [
    {
        name: 'edit',
        action: (item) => {
            
        },
        icon: 'edit',
        class: 'light blue',
    },
    // {
    //     name: 'view',
    //     action: (item) => {
    //         // Código para a ação "Visualizar"
    //     },
    //     icon: 'eye',
    //     class: 'light orange',
    // },
    {
        name: 'delete',
        action: (item: any) => {
            removeWeaponType(item.id);
        },
        icon: 'trash',
        class: 'light red',
    },
    // {
    //     name: 'settings',
    //     action: (item) => {
    //         // Código para a ação "Configurações"
    //     },
    //     icon: 'settings',
    //     class: 'light green',
    // },
];

const removeWeaponType = async(itemSlug: string) => {
    await weaponTypeStore.deleteWeaponType("carcara", itemSlug)
}

const editCaliber = async(item: object) => {
    
}

onMounted(async () => {
    try {
        await weaponTypeStore.fetchWeaponTypes('carcara');
        weaponTypes.value = weaponTypeStore.getWeaponTypes;

        dataTable.value = weaponTypes.value.map((item) => {
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
    console.log('passou aqui')
    if (validateForm()) {
        console.log('passou aqui')
        try {
            const newWeaponType: any = await weaponTypeStore.createWeaponType("carcara", form);
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

// const updateuser = async (user: User) => {
//     try {
//         await userStore.updateUser(user);
//     } catch (error) {
//         console.error(error);
//     }
// };

// const deleteUser = async (user: User) => {
//     let userId = user.id?.toString() || '';
//     try {
//         await userStore.deleteUser(userId);
//     } catch (error) {
//         console.error(error);
//     }
// };

</script>