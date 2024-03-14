import { defineStore } from 'pinia';
import { index, store, update } from '@/api/generalAPI';
import type { Club } from '@/types/clubType';

const endpoint = {
    index: 'clubs',
    show: '{clubId}',
    user: 'my-club',
    userUpdate: 'my-club/{club}',
}

export const useClubStore = defineStore('club', {
    state: () => ({
        clubs: [] as Club[],
        club: [] as Club[],
    }),

    getters: {
        getClubs: (state) => state.clubs,
        getClub: (state) => state.club,
    },

    actions: {
        async fetchClubs() {
            try {
                let clubData = await index(endpoint.index);
                this.clubs = clubData.data;
            } catch (error) {
                throw error;
            }
        },

        async fetchClub() {
            try {
                let clubData = await index(endpoint.user);
                this.club = clubData.data;
            } catch (error) {
                throw error;
            }
        },

        async showClub(clubId: Club) {
            try {
                console.log('essa é a rota', clubId);
                let clubData = await show(endpoint.show.replace('{clubId}', clubId));
                console.log(clubData);
                // this.club = clubData.data;
            } catch (error) {
                throw error;
            }
        },

        async createClub(form: Club) {
            try {
                this.clubs = await store(endpoint.user, form);
            } catch (error) {
                throw error;
            }
        },

        async updateClub(form: Club) {
            try {
                this.club = await update(endpoint.userUpdate.replace('{club}', form.slug ?? ''), form);
            } catch (error) {
                throw error;
            }
        }

    },

});

export default useClubStore;