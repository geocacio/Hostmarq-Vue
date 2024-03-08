import { defineStore } from "pinia";
import { index, store, update, destroy } from '@/api/generalAPI';

const endpoint = {
    index: 'clubs/{clubId}/calibres',
}

export const useCaliberStore = defineStore('caliber', {
    state: () => ({
        calibers: [],
    }),

    getters: {
        getCalibers: (state) => state.calibers,
    },

    actions: {
        async fetchCalibers(clubId: string) {
            try {
                let caliberData = await index(endpoint.index.replace('{clubId}', clubId));
                this.calibers = caliberData;
            } catch (error) {
                throw error;
            }
        },

        async createCaliber(clubId: string, form: any) {
            try {
                this.calibers = await store(endpoint.index.replace('{clubId}', clubId), form);
            } catch (error) {
                throw error;
            }
        },

        async updateCaliber(clubId: string, form: any) {
            try {
                this.calibers = await update(endpoint.index.replace('{clubId}', clubId), form);
            } catch (error) {
                throw error;
            }
        },

        async deleteCaliber(clubId: string, caliberId: string) {
            try {
                this.calibers = await destroy(endpoint.index.replace('{clubId}', clubId) + `/${caliberId}`);
            } catch (error) {
                throw error;
            }
        }

    },
});