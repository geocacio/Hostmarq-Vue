import { defineStore } from 'pinia'
import { store, index, destroy, update } from '@/api/generalAPI';

const endpoint = {
    index: 'clubs/{clubSlug}/weapon-models',
    sud: 'clubs/{clubSlug}/weapon-models/{weaponModelId}',
}

export const useWeaponModelStore = defineStore('weaponModel', {
    state: () => ({
        weaponModels: [],
    }),

    getters: {
        getWeaponModels: (state) => state.weaponModels,
    },

    actions: {
        async fetchWeaponModels(clubSlug: string, link: string = '') {
            // eslint-disable-next-line no-useless-catch
            try {
                const weaponModelData = await index(link != '' ? link : endpoint.index.replace('{clubSlug}', clubSlug));
                this.weaponModels = weaponModelData;
            } catch (error) {
                throw error;
            }
        },

        async createWeaponModel(clubSlug: string, form: any) {
            // eslint-disable-next-line no-useless-catch
            try {
                const result = await store(endpoint.index.replace('{clubSlug}', clubSlug), form);
                return result.model;
            } catch (error) {
                throw error;
            }
        },

        async updateWeaponModel(clubSlug: string, form: any){
            // eslint-disable-next-line no-useless-catch
            try{
                const result = await update(endpoint.sud.replace('{clubSlug}', clubSlug ).replace('{weaponModelId}', form.id), form);
                return result.model;
            }catch(error){
                throw error;
            }
        },
        
        async deleteWeaponModel(clubSlug: string, weaponModelId: string) {
            // eslint-disable-next-line no-useless-catch
            try {
                const result = await destroy(endpoint.index.replace('{clubSlug}', clubSlug) + `/${weaponModelId}`);
                return result.model;
            } catch (error) {
                throw error;
            }
        }
    },
}); 