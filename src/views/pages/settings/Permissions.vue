<template>
    <BreadcrumbComponent title="Permissões" />

    <div class="row">
        <div class="col-12">

            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Lista de Permissões</h4>
                </div>

                <div class="card-body">

                    <NavTabComponent :tabs="roles" :content="permissions" @togglePermission="togglePermission" />

                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BreadcrumbComponent from '@/components/BreadcrumbComponent.vue';
import NavTabComponent from '@/components/NavTabComponent.vue';
import { useRoleStore } from '@/stores/modules/roles';
import { onMounted, ref } from 'vue';
import type { Role } from '@/types/rolesType';
import type { Permission } from '@/types/permissionType';

const roleStore = useRoleStore();
const roles = ref<Role[]>([]);

const permissions = ref<Permission[]>([]);

onMounted( async () => {
    await roleStore.fetchRoles();

    roles.value = roleStore.getRoles;
    permissions.value = roles.value.permissions;
});

const togglePermission = async (roleId: number, permissionId: number) => {
    const payload = {
        'permission_id': permissionId,
    };
    
    await roleStore.addPermission(roleId, payload);
};

</script>