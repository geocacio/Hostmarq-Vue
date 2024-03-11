import { defineStore } from "pinia";
import { index, store, update, destroy } from '@/api/generalAPI';

const endpoint = {
    index: 'clubs/{clubSlug}/calibres',
    sud: 'clubs/{clubSlug}/calibres/{caliberSlug}',
}

export const useCaliberStore = defineStore('caliber', {
    state: () => ({
        calibers: [],
    }),


    getters: {
        getCalibers: (state) => state.calibers,
    },

    actions: {
        async fetchCalibers(clubSlug: string) {
            try {
                let caliberData = await index(endpoint.index.replace('{clubSlug}', clubSlug));
                this.calibers = caliberData;
            } catch (error) {
                throw error;
            }
        },

        async createCaliber(clubSlug: string, form: any) {
            try {
                let result = await store(endpoint.index.replace('{clubSlug}', clubSlug), form);
                return result.data;
            } catch (error) {
                throw error;
            }
        },

        async updateCaliber(clubSlug: string, form: any) {
            try {
                let result = await update(endpoint.sud.replace('{clubSlug}', clubSlug).replace('{caliberSlug}', form.slug), form);
                return result.data;
            } catch (error) {
                throw error;
            }
        },

        async deleteCaliber(clubSlug: string, caliberId: string) {
            try {
                let result = await destroy(endpoint.index.replace('{clubSlug}', clubSlug) + `/${caliberId}`);
                return result.data;
            } catch (error) {
                throw error;
            }
        }

    },
});