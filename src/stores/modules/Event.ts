import { defineStore } from 'pinia'
import { store, index, destroy, update } from '@/api/generalAPI';

const endpoint = {
    index: 'clubs/{clubSlug}/events',
    sud: 'clubs/{clubSlug}/events/{eventId}'
};

export const useEventStore = defineStore('event', {
    state: () => ({
        events: [],
    }),

    getters: {
        getEvents: (state) => state.events,
    },

    actions: {
        async fetchEvents(clubSlug: string) {
            // eslint-disable-next-line no-useless-catch
            try {
                const eventData = await index(endpoint.index.replace('{clubSlug}', clubSlug));
                this.events = eventData;
            } catch (error) {
                throw error;
            }
        },

        async createEvent(clubSlug: string, form: any) {
            // eslint-disable-next-line no-useless-catch
            try {
                const result = await store(endpoint.index.replace('{clubSlug}', clubSlug), form);
                return result.event;
            } catch (error) {
                throw error;
            }
        },

        async updateEvent(clubSlug: string, form: any){
            // eslint-disable-next-line no-useless-catch
            try{
                const result = await update(endpoint.sud.replace('{clubSlug}', clubSlug).replace('{eventId}', form.id), form);
                return result.event;
            }catch(error){
                throw error;
            }
        },

        async deleteEvent(clubSlug: string, eventId: string) {
            // eslint-disable-next-line no-useless-catch
            try {
                const result = await destroy(endpoint.sud.replace('{clubSlug}', clubSlug) + `/${eventId}`);
                return result;
            } catch (error) {
                throw error;
            }
        }
    },
});