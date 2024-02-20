<template>

    <nav>
        <div class="nav nav-tabs" role="tablist">

            <button class="nav-link" :id="`nav-${tab.id}`" data-bs-toggle="tab" :data-bs-target="`#nav-${tab.name}`" type="button"
                role="tab" aria-controls="nav-home" aria-selected="true" v-for="(tab, index) in tabs" :key="tab.id" :class="{ 'active' : index == 0}">{{ tab.name }}</button>

            <!-- <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button"
                role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>

            <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button"
                role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button> -->

        </div>
    </nav>
    <div class="tab-content">
        <div class="tab-pane fade" :id="`nav-${tab.name}`" role="tabpanel" :aria-labelledby="`nav-${tab.id}`" v-for="(tab, index) in tabs" :key="tab.id" :class="{ 'active show' : index == 0}">

            <SwitchComponent v-for="(permission) in content" :key="permission.id" :id="permission.id" :text="permission.name" />

        </div>
        <!-- <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...
        </div>
        <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...
        </div> -->
    </div>

</template>

<script setup lang="ts">
import { defineProps } from 'vue';
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

</script>