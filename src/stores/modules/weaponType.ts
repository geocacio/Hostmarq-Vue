import { defineStore } from 'pinia'
import { store, index, destroy } from '@/api/generalAPI';

const endpoint = {
    index: 'clubs/{clubId}/weapon-types',
}

export const useWeaponTypeStore = defineStore('weaponType', {
    state: () => ({
        weaponTypes: [],
    }),

    getters: {
        getWeaponTypes: (state) => state.weaponTypes,
    },

    actions: {
        async fetchWeaponTypes(clubId: string) {
            try {
                let weaponTypeData = await index(endpoint.index.replace('{clubId}', clubId));
                this.weaponTypes = weaponTypeData;
            } catch (error) {
                throw error;
            }
        },

        async createWeaponType(clubId: string, form: any) {
            try {
                let result = await store(endpoint.index.replace('{clubId}', clubId), form);
                return result.type;
            } catch (error) {
                throw error;
            }
        },

        async deleteWeaponType(clubId: string, weaponTypeId: string) {
            try {
                let result = await destroy(endpoint.index.replace('{clubId}', clubId) + `/${weaponTypeId}`);
                return result.type;
            } catch (error) {
                throw error;
            }
        }
    },
});