<template>
    <header class="header-top">

        <ButtonComponent class="toggle-menu-mobile text-dark" icon="menu" @click="toggleMenu()" />

        <DropdownComponent :options="dropdownOptions" image="https://sistema.hostmarq.com.br//fotos/07032023_foto3.PNG"
            :text="user?.name" />
    </header>
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue';
import DropdownComponent from '@/components/DropdownComponent.vue';
import { defineEmits, onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/modules/auth';
import { useRouter } from "vue-router";
import type { User } from '@/types/userType';

const user = ref<User>();

const router = useRouter();

const auth = useAuthStore();

const dropdownOptions = [
    {
        text: 'Profile',
        icon: 'fa-regular fa-user',
        type: 'link',
        url: '#'
    },
    {
        text: 'Clube',
        icon: 'fa-regular fa-user',
        type: 'link',
        url: 'club'
    },
    {
        text: 'Settings',
        type: 'link',
        url: '#'
    },
    {
        text: 'Logout',
        icon: 'fa-solid fa-right-from-bracket',
        type: 'button',
        action: async () => {
            const success = await auth.logout();
            if (success) {
                router.push({ name: "Login" });
            } else {
                // Trate o erro aqui
            }
        }
    },
];

const emit = defineEmits(['toggleMenu']);

const changeMenu = ref(false);

const toggleMenu = () => {
    changeMenu.value = !changeMenu.value;
    emit('toggleMenu', changeMenu.value);
};

onMounted(() => {
    if (auth.user) {
        user.value = auth.user;
    }
});

</script>