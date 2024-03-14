import { defineStore } from 'pinia'
import { store, index, destroy, update } from '@/api/generalAPI';

const endpoint = {
    index: 'weapons',
    sud: 'clubs/{clubSlug}/weapons/{weaponId}',
}

export const useWeaponStore = defineStore('weapons', {
    state: () => ({
        weapons: [],
    }),

    getters: {
        getWeapons: (state) => state.weapons,
    },

    actions: {
        async fetchWeapons(clubSlug: string, link: string = '') {
            // eslint-disable-next-line no-useless-catch
            try {
                const weaponData = await index(link != "" ? link : endpoint.index.replace('{clubSlug}', clubSlug));
                this.weapons = weaponData;
            } catch (error) {
                throw error;
            }
        },

        async createWeapon(clubSlug: string, form: any) {
            // eslint-disable-next-line no-useless-catch
            try {
                const result = await store(endpoint.index, form);
                return result.weapon;
            } catch (error) {
                throw error;
            }
        },

        async updateWeapon(clubSlug: string, form: any){
            // eslint-disable-next-line no-useless-catch
            try{
                const result = await update(endpoint.sud.replace('{clubSlug}', clubSlug).replace('{weaponId}', form.id), form);
                return result.weapon;
            }catch(error){
                throw error;
            }
        },

        async deleteWeapon(clubSlug: string, weaponId: string) {
            // eslint-disable-next-line no-useless-catch
            try {
                const result = await destroy(endpoint.index.replace('{clubSlug}', clubSlug) + `/${weaponId}`);
                return result.weapon;
            } catch (error) {
                throw error;
            }
        }
    },
});