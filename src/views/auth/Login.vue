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
                    <div class="form-body needs-validation">
                        <div class="mb-3">
                            <LabelComponent text="Usuário" />
                            <InputComponent type="text" placeholder="Usuário" v-model="form.email" :validation="true" :error="errors.email" :error-message="'Por favor, insira um nome de usuário.'" @input="errors.email = false" />
                        </div>

                        <div class="mb-3">
                            <LabelComponent text="Senha" />
                            <PasswordComponent v-model="form.password" placeholder="Senha" @keypress.enter="submit" :validation="true" :error="errors.password" :error-message="'Por favor, insira sua senha.'" @input="errors.password = false" />
                        </div>

                        <div class="mb-3 flex-horizontal">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                                <label class="form-check-label cursor-pointer" for="flexSwitchCheckDefault">Manter conectado</label>
                            </div>

                            <a href="#" class="forgot-password text-primary">Esqueceu a senha?</a>
                        </div>

                        <div class="mb-3">
                            <button class="btn btn-primary w-100" @click.prevent="submit">Login</button>
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
import PasswordComponent from '@/components/form/PasswordComponent.vue';
import { ref, reactive } from 'vue';
import { useAuthStore } from '@/stores/modules/auth';
import { useRouter } from 'vue-router';

const router = useRouter();

const authStore = useAuthStore();

const form = reactive({
    // email: 'master@hostmarq.com',
    email: 'carcara@hostmarq.com',
    // email: 'tirocerto@hostmarq.com',
    password: 'password',
});

const errors = reactive({
    email: false,
    password: false,
});

const validateForm = () => {
    errors.email = !form.email;
    errors.password = !form.password;

    return !errors.email && !errors.password;
};

const submit = async () => {
    
    if (validateForm()) {
        const result = await authStore.login(form.email, form.password);

        if (result) {
            router.push({ name: 'Dashboard' });
        }
    }
};

</script>