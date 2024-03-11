import { defineStore } from 'pinia'
import { store, index, destroy } from '@/api/generalAPI';

const endpoint = {
    index: 'clubs/{clubId}/events',
}

export const useEventStore = defineStore('event', {
    state: () => ({
        events: [],
    }),

    getters: {
        getEvents: (state) => state.events,
    },

    actions: {
        async fetchEvents(clubId: string) {
            try {
                let eventData = await index(endpoint.index.replace('{clubId}', clubId));
                this.events = eventData;
            } catch (error) {
                throw error;
            }
        },

        async createEvent(clubId: string, form: any) {
            try {
                let result = await store(endpoint.index.replace('{clubId}', clubId), form);
                return result.event;
            } catch (error) {
                throw error;
            }
        },

        async deleteEvent(clubId: string, eventId: string) {
            try {
                let result = await destroy(endpoint.index.replace('{clubId}', clubId) + `/${eventId}`);
            } catch (error) {
                throw error;
            }
        }
    },
});