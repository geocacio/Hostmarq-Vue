<template>
    <section class="section-login">
        <div class="container content-login">
            <div class="card form-login">
                <div class="card-body">
                    <div class="form-header">
                        <img class="image" src="../../assets/images/logo_small_black.png" />
                        <h3 class="title">Hostmarq</h3>
                        <span class="description">Por favor faça login na sua conta</span>
                    </div>
                    <div class="form-body">
                        <div class="mb-3">
                            <LabelComponent text="Usuário" />
                            <InputComponent type="text" placeholder="Usuário" />
                        </div>

                        <div class="mb-3">
                            <LabelComponent text="Senha" />
                            <InputComponent type="password" placeholder="Senha" />
                        </div>

                        <div class="mb-3 flex-horizontal">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                                <label class="form-check-label" for="flexSwitchCheckDefault">Manter conectado</label>
                            </div>

                            <a href="#" class="forgot-password text-primary">Esqueceu a senha?</a>
                        </div>

                        <div class="mb-3">
                            <button class="btn btn-primary w-100">Login</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import DropdownComponent from '@/components/DropdownComponent.vue';
import InputComponent from '@/components/form/InputComponent.vue';
import LabelComponent from '@/components/form/LabelComponent.vue';

</script>