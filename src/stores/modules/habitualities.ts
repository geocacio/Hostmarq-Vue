import { defineStore } from 'pinia'
import { index } from '@/api/generalAPI';
import { useAuthStore } from './auth';
import type { User } from '@/types/userType';


const auth = useAuthStore().user as User;


const endpoint = {
    index: `clubs/${auth.club.slug}/habitualities`,
}

export const useHabitualityStore = defineStore('habituality', {
    state: () => ({
        habitualities: [],
    }),

    getters: {
        getHabitualities: (state) => state.habitualities,
    },

    actions: {
        async fetchHabitualities() {
        try {
            this.habitualities = await index(endpoint.index);
        } catch (error) {
            throw error;
        }
        },
    },

});

export default useHabitualityStore;