<template>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
    </button>

    <!-- Modal -->
    <div class="modal fade modal-default" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <!-- <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> -->
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <div class="row row-gap-15">

                        <div class="col-sm-5 col-md-4 col-lg-3">
                            <div class="card">
                                <div class="person-item person-modal">
                                    <img src="https://codervent.com/gum/nikon/demo/vertical/ltr/assets/images/avatars/avatar-1.png"
                                        class="avatar">

                                    <div class="person-info mt-5">
                                        <h3 class="name">Pauline I. Bird</h3>
                                        <span class="description">Webdeveloper</span>
                                    </div>

                                    <div class="social-networks mt-3 mb-3">
                                        <a href="#" class="social-network bg-facebook">
                                            <IconComponent name="facebook" />
                                        </a>
                                        <a href="#" class="social-network bg-twitter">
                                            <IconComponent name="twitter" />
                                        </a>
                                        <a href="#" class="social-network bg-instagram">
                                            <IconComponent name="instagram" />
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="col-sm-7 col-md-8 col-lg-9">

                            <div class="card mb-4">

                                <div class="mb-3">
                                    <LabelComponent text="Matrícula" />
                                    <InputComponent type="text" placeholder="Matrícula" />
                                </div>

                                <div class="mb-3">
                                    <LabelComponent text="Nome" />
                                    <InputComponent type="text" placeholder="Nome" />
                                </div>

                                <div class="mb-3">
                                    <LabelComponent text="Email" />
                                    <InputComponent type="email" placeholder="Email" />
                                </div>

                                <div class="mb-3">
                                    <LabelComponent text="Telefone" />
                                    <InputComponent type="text" placeholder="Telefone" />
                                </div>

                                <div class="mt-3 text-center">
                                    <ButtonComponent buttonClass="dark-blue" text="Salvar" />
                                </div>

                            </div>

                            <div class="card">

                                <div class="person-actions-menu">

                                    <ButtonComponent buttonClass="light blue" icon="dollar" title="Compras" />
                                    <ButtonComponent buttonClass="light orange" icon="eye" />
                                    <ButtonComponent buttonClass="light red" icon="email" title="E-mail" />
                                    <ButtonComponent buttonClass="light red" icon="trash" />
                                    <ButtonComponent buttonClass="light green" icon="settings" />

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
                <!-- <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ButtonComponent from './ButtonComponent.vue';
import IconComponent from './IconComponent.vue';
import InputComponent from './form/InputComponent.vue';
import LabelComponent from './form/LabelComponent.vue';
</script>