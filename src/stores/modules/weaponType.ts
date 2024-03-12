import { defineStore } from 'pinia'
import { store, index, destroy, update } from '@/api/generalAPI';

const endpoint = {
    index: 'clubs/{clubSlug}/weapon-types',
    sud: 'clubs/{clubSlug}/weapon-types/{weaponTypeId}',
}

export const useWeaponTypeStore = defineStore('weaponType', {
    state: () => ({
        weaponTypes: [],
    }),

    getters: {
        getWeaponTypes: (state) => state.weaponTypes,
    },

    actions: {
        async fetchWeaponTypes(clubSlug: string) {
            // eslint-disable-next-line no-useless-catch
            try {
                const weaponTypeData = await index(endpoint.index.replace('{clubSlug}', clubSlug));
                this.weaponTypes = weaponTypeData;
            } catch (error) {
                throw error;
            }
        },

        async createWeaponType(clubSlug: string, form: any) {
            // eslint-disable-next-line no-useless-catch
            try {
                const result = await store(endpoint.index.replace('{clubSlug}', clubSlug), form);
                return result.type;
            } catch (error) {
                throw error;
            }
        },

        async updateWeaponType(clubSlug: string, form: any){
            // eslint-disable-next-line no-useless-catch
            try{
                const result = await update(endpoint.sud.replace('{clubSlug}', clubSlug).replace('{weaponTypeId}', form.id), form);
                return result.type;
            }catch(error){
                throw error;
            }
        },

        async deleteWeaponType(clubSlug: string, weaponTypeId: string) {
            // eslint-disable-next-line no-useless-catch
            try {
                const result = await destroy(endpoint.index.replace('{clubSlug}', clubSlug) + `/${weaponTypeId}`);
                return result.type;
            } catch (error) {
                throw error;
            }
        }
    },
});