<template>

    <nav>
        <div class="nav nav-pills custom-nav-pills" role="tablist">

            <button class="nav-link" :id="`nav-${tab.id}`" data-bs-toggle="tab" :data-bs-target="`#nav-${tab.name}`" type="button"
                role="tab" aria-controls="nav-home" aria-selected="true" v-for="(tab, index) in tabs" :key="tab.id" :class="{ 'active' : index == 0}" @click="getCurrentRole(tab.id!)">{{ tab.name }}</button>

        </div>
    </nav>
    <div class="tab-content custom-tab-content">
        <div class="tab-pane fade" :id="`nav-${tab.name}`" role="tabpanel" :aria-labelledby="`nav-${tab.id}`" v-for="(tab, index) in tabs" :key="tab.id" :class="{ 'active show' : index == 0}">

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

const props = defineProps({
    tabs: {
        type: Array as () => Role[],
        required: true,
    },
    content: {
        type: Array as () => Permission[],
        required: true,
    },
});

const currentRole = ref<number>();

const getCurrentRole = (roleId: number) => {
    currentRole.value = roleId;
};

const emits = defineEmits(['togglePermission']);

const toggleSwitch = (permissionId: number) => {
    emits('togglePermission', currentRole.value, permissionId);
};

const isChecked = (roleId: number, permission: Permission) => {
    return permission.roles.some(role => role.id === roleId);
};

</script>