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
                        <div class="form-group mb-4">
                            <LabelComponent text="Usuário" />
                            <InputComponent type="text" placeholder="Usuário" />
                        </div>

                        <div class="form-group">
                            <LabelComponent text="Senha" />
                            <InputComponent type="password" placeholder="Senha" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import InputComponent from '@/components/form/InputComponent.vue';
import LabelComponent from '@/components/form/LabelComponent.vue';
</script>