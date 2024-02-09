<template>

    <BreadcrumbComponent title="Habitualidade" />

    <div class="dashboard-header flex-horizontal">
        <div class="search-container">
            <InputComponent type="text" placeholder="Pesquisar" />
        </div>
        <div class="dashboard-actions">
            <ButtonComponent buttonClass="dark-blue" text="Novo" />
        </div>
    </div>

    <div class="row row-gap-15">

        <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="(person, index) in users" :key="index">
            <PersonComponent :data="person" />
        </div>

    </div>

    <PaginationComponent class="mt-5" :totalPages="2" :currentPage="1" />

</template>

<script setup lang="ts">
import BreadcrumbComponent from '@/components/BreadcrumbComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import PersonComponent from '@/components/PersonComponent.vue';
import InputComponent from '@/components/form/InputComponent.vue';
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/modules/user';
import type { User } from '@/types/userType';

const userStore = useUserStore();
const users = ref<User[]>([]);

const totalPages = ref(10);
const currentPage = ref(1);

const user = [
    {
        "id": 1,
        "club_id": null,
        "registration": null,
        "name": "Master",
        "email": "master@hostmarq.com",
        "email_verified_at": null,
        "created_at": "2024-01-30T19:52:18.000000Z",
        "updated_at": "2024-01-30T19:52:18.000000Z",
        "cnh": null,
        "cnh_issue_date": null,
        "cnh_expiration_date": null,
        "sisgcorp_password": null,
        "blood_type": null,
        "dispatcher": null,
        "status": null,
        "gender": null,
        "marital_status": null,
        "birthplace": null,
        "nationality": null,
        "birth_date": null,
        "profession": null,
        "instagram": null,
        "phone": null,
        "father": null,
        "mother": null,
        "cpf": null,
        "identity": null,
        "issuing_authority": null,
        "identity_issue_date": null,
        "voter_registration": null,
        "image": 'https://codervent.com/gum/nikon/demo/vertical/ltr/assets/images/avatars/avatar-1.png',
        "roles": [
            {
                "id": 1,
                "name": "Master",
                "description": "master",
                "created_at": "2024-01-30T19:52:17.000000Z",
                "updated_at": "2024-01-30T19:52:17.000000Z",
                "pivot": {
                    "user_id": 1,
                    "role_id": 1
                },
                "permissions": []
            }
        ],
        "social_networks": [
            {
                "id": 1,
                "name": "Facebook",
                "url": "https://www.facebook.com/",
            },
            {
                "id": 2,
                "name": "Twitter",
                "url": "https://www.twitter.com/",
            },
            {
                "id": 3,
                "name": "Instagram",
                "url": "https://www.instagram.com/",
            }
        ],
        "club": null
    },
    {
        "id": 2,
        "club_id": null,
        "registration": "0001",
        "name": "Carcará",
        "email": "carcara@email.com",
        "email_verified_at": null,
        "created_at": "2024-01-30T19:53:13.000000Z",
        "updated_at": "2024-01-30T19:53:13.000000Z",
        "cnh": null,
        "cnh_issue_date": null,
        "cnh_expiration_date": null,
        "sisgcorp_password": null,
        "blood_type": null,
        "dispatcher": null,
        "status": null,
        "gender": null,
        "marital_status": null,
        "birthplace": null,
        "nationality": null,
        "birth_date": null,
        "profession": null,
        "instagram": null,
        "phone": null,
        "father": null,
        "mother": null,
        "cpf": null,
        "identity": null,
        "issuing_authority": null,
        "identity_issue_date": null,
        "voter_registration": null,
        "image": 'https://codervent.com/gum/nikon/demo/vertical/ltr/assets/images/avatars/avatar-2.png',
        "social_networks": [
            {
                "id": 1,
                "name": "Facebook",
                "url": "https://www.facebook.com/",
            },
        ],
    }
]

onMounted( async () => {
    try {
        const response = await userStore.fetchUsers();
        users.value = userStore.getUsers;
    } catch (error) {
        console.error(error);
    }
});

</script>