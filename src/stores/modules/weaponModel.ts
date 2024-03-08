import { defineStore } from 'pinia'
import { store, index, destroy } from '@/api/generalAPI';

const endpoint = {
    index: 'clubs/{clubId}/weapon-models',
}

export const useWeaponModelStore = defineStore('weaponModel', {
    state: () => ({
        weaponModels: [],
    }),

    getters: {
        getWeaponModels: (state) => state.weaponModels,
    },

    actions: {
        async fetchWeaponModels(clubId: string) {
            try {
                let weaponModelData = await index(endpoint.index.replace('{clubId}', clubId));
                this.weaponModels = weaponModelData;
            } catch (error) {
                throw error;
            }
        },

        async createWeaponModel(clubId: string, form: any) {
            try {
                this.weaponModels = await store(endpoint.index.replace('{clubId}', clubId), form);
            } catch (error) {
                throw error;
            }
        },

        async deleteWeaponModel(clubId: string, weaponModelId: string) {
            try {
                this.weaponModels = await destroy(endpoint.index.replace('{clubId}', clubId) + `/${weaponModelId}`);
            } catch (error) {
                throw error;
            }
        }
    },
});