<template>
    <div class="wrapper">
        <Sidebar />

        <div class="main-content">

            <header class="header-top">
                <DropdownComponent :options="dropdownOptions"
                    image="https://sistema.hostmarq.com.br//fotos/07032023_foto3.PNG" text="Magno Carlos" />
            </header>

            <div class="body-content">

               <router-view></router-view>

            </div>

            <Footer />
        </div>
    </div>
</template>

<script setup lang="ts">
import Sidebar from '@/layouts/Sidebar.vue';
import Footer from '@/layouts/Footer.vue';
import DropdownComponent from '@/components/DropdownComponent.vue';

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
</script>