import { defineStore } from 'pinia'
import { index, store, update, destroy } from '@/api/generalAPI';

const endpoint = {
    index: 'clubs/{clubSlug}/habitualities',
}

export const useHabitualityStore = defineStore('habituality', {
    state: () => ({
        habitualities: [],
    }),

    getters: {
        getHabitualities: (state) => state.habitualities,
    },

    actions: {
        async fetchHabitualities(clubSlug: string) {
            // eslint-disable-next-line no-useless-catch
            try {
                // console.log('passou aqui', clubSlug);
                const habitualitiesData = await index(endpoint.index.replace('{clubSlug}', clubSlug));
                this.habitualities = habitualitiesData;
            } catch (error) {
                throw error;
            }
        },
        async creatingHabituality(clubSlug: string, form: any) {
            // eslint-disable-next-line no-useless-catch
            try{
                const result = await store(endpoint.index.replace('{clubSlug}', clubSlug), form);
                return result.data;
            }catch(error){
                throw error;
            }
        }
    },

});

export default useHabitualityStore;