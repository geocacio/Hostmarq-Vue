import { defineStore } from 'pinia';
import { index } from '@/api/generalAPI';
import type { Club } from '@/types/clubType';

const endpoint = {
    index: 'clubs',
}

export const useClubStore = defineStore('club', {
    state: () => ({
        clubs: [] as Club[],
    }),

    getters: {
        getClubs: (state) => state.clubs,
    },

    actions: {
        async fetchClubs() {
        try {
            this.clubs = await index(endpoint.index);
        } catch (error) {
            throw error;
        }
        },
    },

});

export default useClubStore;