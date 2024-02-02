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
                    <div class="collapse navbar-collapse show">
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
                    <div class="row mt-5">
                        <div class="col-6">
                            <InputComponent type="text" placeholder="Search" />
                        </div>
                    </div>

                    <nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
                </div>

            </div>

            <footer class="footer">
                <span class="copy">Copyright © 2024. All right reserved.</span>
            </footer>
        </div>

    </div>
</template>
