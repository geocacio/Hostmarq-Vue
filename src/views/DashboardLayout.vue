<template>
    <div class="wrapper">
        <Sidebar :openSidebar="openSidebar" />

        <div class="main-content">

            <Header @toggleMenu="openSidebar = $event" />

            <div class="body-content">

               <router-view></router-view>

            </div>

            <Footer />
        </div>
    </div>
</template>

<script setup lang="ts">
import Header from '@/layouts/Header.vue';
import Sidebar from '@/layouts/Sidebar.vue';
import Footer from '@/layouts/Footer.vue';
import { ref } from 'vue';

const openSidebar = ref(false);

</script>