<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth';
import { provide } from 'vue';

const auth = useAuthStore();
provide('auth', auth.user);
</script>

<template>
    <RouterView />
</template>