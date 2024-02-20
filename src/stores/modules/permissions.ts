import { defineStore } from 'pinia';
import { index, store, update } from '@/api/generalAPI';

const endpoint = {
    index: 'permissions',
}

export const usePermissionStore = defineStore('permission', {
    state: () => ({
        permissions: [],
    }),

    getters: {
        getPermissions: (state) => state.permissions,
    },

    actions: {
        async fetchPermissions() {
            try {
                this.permissions = await index(endpoint.index);
            } catch (error) {
                throw error;
            }
        },
    },

});

export default usePermissionStore;