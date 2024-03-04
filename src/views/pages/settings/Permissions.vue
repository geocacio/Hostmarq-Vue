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
                        
                        <template v-if="roleList.includes(authStore.getRole[0])" v-slot:header>
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
import { useAuthStore } from '@/stores/modules/auth';

const authStore = useAuthStore();

const roleStore = useRoleStore();
const roles = ref<Role[]>([]);
const clubStore = useClubStore();

const clubs = ref<Club[]>([]);

const permissions = ref<Permission[]>([]);

interface clubList {
    code?: number;
    name?: string;
}
const clubList = ref<clubList[]>([]);

let roleList = ['Master', 'Admin'];
const role = ref('');

let clubsId = [] as number[];

onMounted( async () => {
    await roleStore.fetchRoles();
    
    if(roleList.includes(authStore.getRole[0])){
        await clubStore.fetchClubs();
        clubs.value = clubStore.getClubs;
        clubList.value = clubs.value.map(club => ({ code: club.id, name: club.name }));
    }else{
        clubList.value = [{ code: authStore.getUser?.club?.id }];
    }

    roles.value = roleStore.getRoles;
    permissions.value = authStore.getPermissions;
});

const togglePermission = async (roleId: number, permissionId: number, isChecked) => {
    const payload = {
        'clubs_id': clubsId,
        'permission_id': permissionId,
        'action': isChecked ? 'attach' : 'detach'
    };
    
    await roleStore.addPermission(roleId, payload);
};

const handleSelectedOptions = (selectedOptions: any) => clubsId = selectedOptions.map((option: any) => option.code);

</script>