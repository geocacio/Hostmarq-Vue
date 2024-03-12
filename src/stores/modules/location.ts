import { defineStore } from 'pinia';
import { index, store, update, destroy } from '@/api/generalAPI';

const endpoint = {
    index: 'clubs/{clubSlug}/locations',
    sud: 'clubs/{clubSlug}/locations/{locationId}',
}

export const useLocationStore = defineStore('location', {
    state: () => ({
        locations: [],
    }),

    getters: {
        getLocations: (state) => state.locations,
    },

    actions: {
        async fetchLocations(clubSlug: string, link: string = '') {
            try {
                let locationData = await index(link != '' ? link : endpoint.index.replace('{clubSlug}', clubSlug));
                this.locations = locationData;
            } catch (error) {
                throw error;
            }
        },

        async createLocation(clubSlug: string, form: any) {
            try {
                let result = await store(endpoint.index.replace('{clubSlug}', clubSlug), form);
                return result.data;
            } catch (error) {
                throw error;
            }
        },

        async updateLocation(clubSlug: string, form: any) {
            try {
                let result = await update(endpoint.sud.replace('{clubSlug}', clubSlug).replace('{locationId}', form.id), form);
                return result.data;
            } catch (error) {
                throw error;
            }
        },

        async deleteLocation(clubSlug: string, locationId: string) {
            try {
                let result = await destroy(endpoint.index.replace('{clubSlug}', clubSlug) + `/${locationId}`);
                return result.data;
            } catch (error) {
                throw error;
            }
        }

    },
});