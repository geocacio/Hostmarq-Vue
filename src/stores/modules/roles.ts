import { defineStore } from 'pinia';
import { index, store, update } from '@/api/generalAPI';

const endpoint = {
    index: 'roles',
}

export const useRoleStore = defineStore('role', {
    state: () => ({
        roles: [],
    }),

    getters: {
        getRoles: (state) => state.roles,
    },

    actions: {
        async fetchRoles() {
            try {
                this.roles = await index(endpoint.index);
            } catch (error) {
                throw error;
            }
        },
    },

});

export default useRoleStore;