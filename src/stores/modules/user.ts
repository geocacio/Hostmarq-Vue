import { defineStore } from 'pinia';
import { index, store } from '@/api/generalAPI';
import type { User } from '@/types/userType';

const endpoint = {
    index: 'users',
    register: 'register',
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

        async createUser(form: User) {
            try {
                this.users = await store(endpoint.register, form);
            } catch (error) {
                throw error;
            }
        }
    },

});