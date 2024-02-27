<template>
    <BreadcrumbComponent title="Permissões" />

    <div class="row">
        <div class="col-12">

            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Lista de Permissões</h4>
                </div>
                
                <div class="card-body">
                    
                    <NavTabComponent :tabs="roles" :content="permissions" @togglePermission="togglePermission" :showSelectClubs="true" >
                        
                        <template v-slot:header>
                            <div class="mb-3">
                                <LabelComponent text="Clubes" />
                                <MultipleSelectComponent :options="clubList" @update:selectedOptions="handleSelectedOptions" placeholder="Selecione um ou mais Clubes" />
                            </div>
                        </template>

                    </NavTabComponent>

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
import MultipleSelectComponent from '@/components/MultipleSelectComponent.vue';
import LabelComponent from '@/components/form/LabelComponent.vue';
import { useClubStore } from '@/stores/modules/club';
import type { Club } from '@/types/clubType';

const roleStore = useRoleStore();
const roles = ref<Role[]>([]);
const clubStore = useClubStore();

const clubs = ref<Club[]>([]);

const permissions = ref<Permission[]>([]);

const clubList = ref([]);

onMounted( async () => {
    await roleStore.fetchRoles();
    await clubStore.fetchClubs();
    
    roles.value = roleStore.getRoles;
    permissions.value = roles.value.permissions;

    clubs.value = clubStore.getClubs;

    clubList.value = clubs.value.map(club => ({ code: club.id, name: club.name }));
});

const togglePermission = async (roleId: number, permissionId: number) => {
    const payload = {
        'permission_id': permissionId,
    };
    
    await roleStore.addPermission(roleId, payload);
};

const options = ref([
    { code: 1, name: 'Opção 1' },
    { code: 2, name: 'Opção 2' },
    { code: 3, name: 'Opção 3' },
    { code: 4, name: 'Opção 4' },
    { code: 5, name: 'Opção 5' },
    { code: 6, name: 'Opção 6' },
    { code: 7, name: 'Opção 7' },
    { code: 8, name: 'Opção 8' },
    { code: 9, name: 'Opção 9' },
    { code: 10, name: 'Opção 10' },
]);

const handleSelectedOptions = (selectedOptions: any) => {
    console.log(selectedOptions);
};

</script>