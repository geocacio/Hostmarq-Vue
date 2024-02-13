<template>
    <div class="sidebar" :class="{ 'show': shouldShowMenu() }" @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave">

        <div class="header-sidebar">
            <div class="logo">
                <img src="@/assets/images/logo_small.png" alt="logo" />
            </div>
            <button class="toggle-menu" @click="isOpen = !isOpen">
                <IconComponent name="arrow-left" />
            </button>
        </div>

        <div class="body-sidebar">
            <nav class="main-menu">
                <div class="collapse navbar-collapse show">
                    <ul class="nav-menu navbar-nav me-auto mb-2 mb-lg-0">

                        <li class="nav-item">
                            <router-link to="/dashboard" class="nav-link" active-class="active">
                                <IconComponent name="home" />
                                <span class="nav-text">Dashboard</span>
                            </router-link>
                        </li>

                        <li class="nav-item">
                            <router-link to="/clubs" class="nav-link" v-if="userHasRole('Master') || userHasRole('Admin')" active-class="active">
                                <IconComponent name="home" />
                                <span class="nav-text">Clubs</span>
                            </router-link>
                        </li>

                        <li class="nav-item">
                            <router-link to="/users" class="nav-link" active-class="active">
                                <IconComponent name="users" />
                                <span class="nav-text">Associados</span>
                            </router-link>
                        </li>

                        <li class="nav-item">
                            <router-link to="/habituality" class="nav-link" active-class="active">
                                <IconComponent name="award" />
                                <span class="nav-text">Habitualities</span>
                            </router-link>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <IconComponent name="aperture" />
                                <span class="nav-text">Home</span>
                            </a>
                        </li>
                        <li class="nav-item-label">UI ELEMENTS</li>

                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <IconComponent name="alert-circle" />
                                <span class="nav-text">Home</span>
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li class="dropdown-item">
                                    <a class="dropdown-link" href="#">
                                        <span class="nav-text">Home</span>
                                    </a>
                                </li>
                                <li class="dropdown-item">
                                    <a class="dropdown-link" href="#">
                                        <span class="nav-text">Teste</span>
                                    </a>
                                </li>
                                <li class="dropdown-item">
                                    <a class="dropdown-link" href="#">
                                        <span class="nav-text">Laele</span>
                                    </a>
                                </li>
                                <li class="dropdown-item">
                                    <a class="dropdown-link" href="#">
                                        <span class="nav-text">Mais um</span>
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">
                                <IconComponent name="ancor" />
                                <span class="nav-text">Home</span>
                            </a>
                        </li>

                    </ul>
                </div>
            </nav>
        </div>


    </div>
</template>

<script setup lang="ts">
import IconComponent from '@/components/IconComponent.vue';
import { onMounted, ref, defineProps, watch } from 'vue';
import { useAuthStore } from '@/stores/modules/auth'

const authStore = useAuthStore()

const userHasRole = (role: any) => authStore.userRoles.includes(role)

const props = defineProps({
    openSidebar: Boolean
});

watch(() => props.openSidebar, (value) => {
    isOpen.value = true;
});

const isOpen = ref(false);
const isHovered = ref(false);

const handleMouseEnter = () => {
    isHovered.value = true;
};

const handleMouseLeave = () => {
    isHovered.value = false;
};

const shouldShowMenu = () => isOpen.value || (!isOpen.value && isHovered.value);

onMounted(() => {
    isOpen.value = window.innerWidth > 992 ? true : false;
});

</script>