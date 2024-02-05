<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from './layouts/Sidebar.vue';
import InputComponent from './components/form/InputComponent.vue';
import DropdownComponent from './components/DropdownComponent.vue';
import { ref } from "vue";

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

const isSidebarOpen = ref(true);

</script>

<template>
    <div class="wrapper">

        <Sidebar />

        <div class="main-content">

            <header class="header-top">
                <DropdownComponent :options="dropdownOptions" image="https://sistema.hostmarq.com.br//fotos/07032023_foto3.PNG"
                    text="Magno Carlos" />
            </header>

            <div class="body-content">

                <div class="card">
                    <div class="row mt-5">
                        <div class="col-6">
                            <InputComponent type="text" placeholder="Search" />
                        </div>
                    </div>

                </div>

            </div>

            <footer class="footer">
                <span class="copy">Copyright © 2024. All right reserved.</span>
            </footer>
        </div>

    </div>
</template>
