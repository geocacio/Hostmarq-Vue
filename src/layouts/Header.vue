<template>
    <header class="header-top">

        <ButtonComponent class="toggle-menu-mobile text-dark" icon="menu" @click="toggleMenu()" />

        <DropdownComponent :options="dropdownOptions" image="https://sistema.hostmarq.com.br//fotos/07032023_foto3.PNG"
            text="Magno Carlos" />
    </header>
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue';
import DropdownComponent from '@/components/DropdownComponent.vue';
import { defineEmits, ref } from 'vue';

const dropdownOptions = [
    {
        text: 'Profile',
        icon: 'fa-regular fa-user',
        type: 'link',
        url: '#'
    },
    {
        text: 'Settings',
        type: 'link',
        url: '#'
    },
    {
        text: 'Logout',
        icon: 'fa-solid fa-right-from-bracket',
        type: 'button'
    },
];

const emit = defineEmits(['toggleMenu']);

const changeMenu = ref(false);

const toggleMenu = () => {
    changeMenu.value = !changeMenu.value;
    emit('toggleMenu', changeMenu.value);
};




</script>