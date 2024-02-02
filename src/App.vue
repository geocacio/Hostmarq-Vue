<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import IconComponent from './components/IconComponent.vue';
import DropdownComponent from './components/DropdownComponent.vue';
import InputComponent from './components/form/InputComponent.vue';

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

<template>
    <div class="wrapper">

        <div class="sidebar show">

            <div class="header-sidebar">
                <div class="logo">
                    <img src="./assets/images/logo_small.png" alt="logo" />
                </div>
                <button class="toggle-menu">
                    <IconComponent name="arrow-left" />
                </button>
            </div>

            <div class="body-sidebar">
                <nav class="main-menu">
                    <div class="collapse navbar-collapse">
                        <ul class="nav-menu navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">
                                    <IconComponent name="home" />
                                    <span class="nav-text">Home</span>
                                </a>
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

        <div class="main-content">

            <header class="header-top">
                <DropdownComponent
                image="https://sistema.hostmarq.com.br//fotos/07032023_foto3.PNG"
                text="Magno Carlos"
                :options="dropdownOptions"/>
            </header>

            <div class="body-content">

                <div class="card">
                    <InputComponent type="text" placeholder="Search" />
                </div>

            </div>

            <footer class="footer">
                <span class="copy">Copyright © 2024. All right reserved.</span>
            </footer>
        </div>

    </div>
</template>
