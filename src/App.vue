<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
    <div class="wrapper">

        <div class="sidebar show">

            <div class="header-sidebar">
                <div class="logo"></div>
                <button class="toggle-menu">
                    <i class="bx bx-home-alt"></i>
                </button>
            </div>

            <div class="body-sidebar">
                <nav class="main-menu">
                    <div class="collapse navbar-collapse">
                        <ul class="nav-menu navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>


        </div>

        <div class="main-content">

            <header class="header-top">

            </header>

            <div class="body-content">

                <div class="card"></div>
                <div class="card"></div>
                <div class="card"></div>
                <div class="card"></div>

            </div>

            <footer class="footer">
                <span class="copy">Copyright © 2024. All right reserved.</span>
            </footer>
        </div>

    </div>
</template>
