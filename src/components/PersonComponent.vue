<template>
    <div class="card">
        <div class="person-item">
            <img src="https://sistema.hostmarq.com.br//fotos/07032023_foto3.PNG" class="avatar">
            <!-- <img :src="data?.image" class="avatar"> -->

            <div class="person-info mt-5">
                <h3 class="name">{{ data?.name }}</h3>
                <span class="description">{{ data?.email }}</span>
            </div>

            <div class="social-networks mt-3 mb-3">
                <template v-for="(media, index) in data?.social_networks" :key="index">
                    <a :href="media.url" target="_blank" :class="`social-network bg-${media.name.toLowerCase()}`">
                        <IconComponent :name="media.name.toLowerCase()" />
                    </a>
                </template>
            </div>

            <ModalComponent :id="data?.id" buttonText="Ver">
                <div class="row row-gap-15">

                    <div class="col-sm-5 col-md-4 col-lg-3">
                        <div class="card">
                            <div class="person-item person-modal">
                                <img src="https://sistema.hostmarq.com.br//fotos/07032023_foto3.PNG" class="avatar">
                                <!-- <img :src="data?.image" class="avatar"> -->

                                <div class="person-info mt-5">
                                    <h3 class="name">{{ data?.name }}</h3>
                                    <span class="description">{{ data?.email }}</span>
                                </div>

                                <div class="social-networks mt-3 mb-3">
                                    <template v-for="(media, index) in data?.social_networks" :key="index">
                                        <a :href="media.url" :class="`social-network bg-${media.name.toLowerCase()}`">
                                            <IconComponent :name="media.name.toLowerCase()" />
                                        </a>
                                    </template>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="col-sm-7 col-md-8 col-lg-9">

                        <div class="card mb-4">

                            <div class="mb-3">
                                <LabelComponent text="Matrícula" />
                                <InputComponent type="text" v-model="form.registration" placeholder="Matrícula" />
                            </div>

                            <div class="mb-3">
                                <LabelComponent text="Nome" />
                                <InputComponent type="text" v-model="form.name" placeholder="Nome" />
                            </div>

                            <div class="mb-3">
                                <LabelComponent text="Email" />
                                <InputComponent type="email" v-model="form.email" placeholder="Email" />
                            </div>

                            <div class="mb-3">
                                <LabelComponent text="Telefone" />
                                <InputComponent type="text" v-model="form.phone" placeholder="Telefone" />
                            </div>

                            <div class="mt-3 text-center">
                                <ButtonComponent buttonClass="dark-blue" text="Salvar" @click="updateUser" />
                            </div>

                        </div>

                        <div class="card">

                            <div class="person-actions-menu">

                                <ButtonComponent buttonClass="light blue" icon="dollar" title="Compras" />
                                <ButtonComponent buttonClass="light orange" icon="eye" />
                                <ButtonComponent buttonClass="light red" icon="email" title="E-mail" />
                                <ButtonComponent buttonClass="light red" icon="trash" title="Remover usuário" @click="removeUser" />
                                <ButtonComponent buttonClass="light green" icon="settings" />

                            </div>

                        </div>

                    </div>

                </div>
            </ModalComponent>

        </div>
    </div>
</template>

<script setup lang="ts">
import ButtonComponent from './ButtonComponent.vue';
import IconComponent from './IconComponent.vue';
import { defineProps, ref, onMounted, defineEmits } from 'vue';
import ModalComponent from './ModalComponent.vue';
import LabelComponent from './form/LabelComponent.vue';
import InputComponent from './form/InputComponent.vue';
import type { Person } from '@/types/personType';

const props = defineProps({
    data: Object
});

const form = ref<Person>({
    registration: '',
    name: '',
    email: '',
    phone: '',
});

onMounted(() => {
    if (props.data){
        form.value = props.data as Person;
    }
});

const emits = defineEmits(['update', 'delete']);

const updateUser = () => {
    emits('update', form.value);
};

const removeUser = () => {
    emits('delete', form.value);
};

</script>