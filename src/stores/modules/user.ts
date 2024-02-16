import { defineStore } from 'pinia';
import { index, store, update, destroy } from '@/api/generalAPI';
import type { User } from '@/types/userType';

const endpoint = {
    index: 'users',
    single: 'users/{userId}',
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
        async fetchUsers(links: string = '') {
            try {
                this.users = await index(links != '' ? links : endpoint.index);
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
        },

        async updateUser(form: User) {
            try {
                const userId = form.id?.toString() ?? '';
                this.users = await update(endpoint.single.replace('{userId}', userId), form);
            } catch (error) {
                throw error;
            }
        },

        async deleteUser(userId: string) {
            try {
                this.users = await destroy(endpoint.single.replace('{userId}', userId));
            } catch (error) {
                throw error;
            }
        }

    },

});