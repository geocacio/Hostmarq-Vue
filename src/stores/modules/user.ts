import { defineStore } from 'pinia';
import { index } from '@/api/generalAPI';
import type { User } from '@/types/userType';

const endpoint = {
    index: 'users',
}

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [] as User[],
    }),

    getters: {
        getUsers: (state) => state.users,
    },

    actions: {
        async fetchUsers() {
        try {
            this.users = await index(endpoint.index);
        } catch (error) {
            throw error;
        }
        },
    },

});