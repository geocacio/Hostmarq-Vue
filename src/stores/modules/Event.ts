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
                this.events = await store(endpoint.index.replace('{clubId}', clubId), form);
            } catch (error) {
                throw error;
            }
        },

        async deleteEvent(clubId: string, eventId: string) {
            try {
                this.events = await destroy(endpoint.index.replace('{clubId}', clubId) + `/${eventId}`);
            } catch (error) {
                throw error;
            }
        }
    },
});