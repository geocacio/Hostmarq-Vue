<template>

    <nav>
        <div class="nav nav-pills custom-nav-pills" role="tablist">

            <button class="nav-link" :id="`nav-${tab.id}`" data-bs-toggle="tab" :data-bs-target="`#nav-${tab.name}`" type="button"
                role="tab" aria-controls="nav-home" aria-selected="true" v-for="(tab, index) in tabs" :key="tab.id" :class="{ 'active' : index == 0}" @click="getCurrentRole(tab.id!)">{{ tab.name }}</button>

        </div>
    </nav>
    <div class="tab-content custom-tab-content">
        <div class="tab-pane fade" :id="`nav-${tab.name}`" role="tabpanel" :aria-labelledby="`nav-${tab.id}`" v-for="(tab, index) in tabs" :key="tab.id" :class="{ 'active show' : index == 0}">
            <!-- slot exclusivo para permissões de usuários (selecionar o clube) -->
            <slot name="header" v-if="showSelectClubs && tab.name != 'Admin'">
                <div class="mb-3">
                    <LabelComponent text="Clube" />
                    <SelectComponent :options="clubsOptions" />
                </div>
            </slot>
            <div class="show-grid">
                <SwitchComponent v-for="(permission) in content" :key="permission.id" :id="permission.id" :text="permission.name" @toggle="toggleSwitch" :isChecked="isChecked(tab.id!, permission)" />
            </div>

        </div>
        
    </div>

</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import type { Role } from '@/types/rolesType';
import type { Permission } from '@/types/permissionType';
import SwitchComponent from './SwitchComponent.vue';
import SelectComponent from './form/SelectComponent.vue';
import LabelComponent from './form/LabelComponent.vue';

const props = defineProps({
    tabs: {
        type: Array as () => Role[],
        required: true,
    },
    content: {
        type: Array as () => Permission[],
        required: true,
    },
    showSelectClubs: {
        type: Boolean,
        default: false,
    },
});

const currentRole = ref<number>();

const getCurrentRole = (roleId: number) => {
    currentRole.value = roleId;
};

const emits = defineEmits(['togglePermission']);

const toggleSwitch = (permissionId: number) => {
    let roleId = currentRole.value == undefined ? props.tabs[0].id : currentRole.value;
    emits('togglePermission', roleId, permissionId);
};

const isChecked = (roleId: number, permission: Permission) => {
    return permission.roles.some(role => role.id === roleId);
};

const clubsOptions = ref([
    { value: 0, text: 'Todos' },
    { value: 1, text: 'Clube 1' },
    { value: 2, text: 'Clube 2' },
    { value: 3, text: 'Clube 3' },
    { value: 4, text: 'Clube 4' },
    { value: 5, text: 'Clube 5' },
]);

</script>