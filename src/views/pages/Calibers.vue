<template>
    <BreadcrumbComponent title="Associados" />

    <div class="dashboard-header flex-horizontal">
        <div class="search-container">
            <InputComponent type="text" placeholder="Pesquisar" v-model="search" @input="searchSubmit" />
        </div>
        <div class="dashboard-actions">

            <ModalComponent id="new-user" buttonText="Novo">

                <div class="mb-3">
                    <LabelComponent text="Calibre" />
                    <InputComponent type="text" placeholder="Calibre" v-model="form.name" :validation="true" :error="errors.name" :error-message="'Por favor, insira um nome de usuário.'" @input="errors.name = false" />
                </div>

                <div class="mb-3">
                    <LabelComponent text="Tipo" />
                    <select class="form-control" v-model="form.type">
                        <option value="">Selecione o tipo de usuário</option>
                        <option value="permitted">Permitido</option>
                        <option value="restricted">Restrito</option>
                    </select>
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
import { useCaliberStore } from '@/stores/modules/caliber';

const caliberStore = useCaliberStore();
const calibers = ref<Caliber[]>([]);

interface dataTable {
    id: number;
    name: string;
    type: string;
}
const dataTable = ref<dataTable[]>([]);

interface Form {
    name: string;
    type: string;
}

const form = reactive<Form>({
    name: '9mm',
    type: ''
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
            removeCaliber(item.slug);
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

const removeCaliber = async(itemSlug: string) => {
    await caliberStore.deleteCaliber("itaberaba-ct", itemSlug)
}

const editCaliber = async(item: object) => {
    
}

onMounted(async () => {
    try {
        await caliberStore.fetchCalibers('itaberaba-ct');
        calibers.value = caliberStore.getCalibers;

        // await userStore.fetchUsers('users');
        // users.value = userStore.getUsers;
        // console.log('passou aqui', users.value.data)
        dataTable.value = calibers.value.map((item) => {
            return {
                id: item.id,
                'Nome': item.name,
                'Tipo': item.type,
                slug: item.slug
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
    errors.type = !form.type;

    return !errors.name && !errors.type;
};

const submit = async () => {

    if (validateForm()) {
        try {
            const newCaliber: any = await caliberStore.createCaliber("itaberaba-ct", form);
            document.getElementById('closeModal-new-user')?.click();
            console.log(newCaliber);
            if (newCaliber){
                dataTable.value.push(newCaliber);
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