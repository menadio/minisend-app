import { defineStore } from 'pinia'
import http from '../http'

export const useEmailStore = defineStore('email', {
    state: () => ({
        emails: [],
        error: null
    }),

    actions: {
        async getEmails() {
            try {
                const res = await http.get('emails');

                return this.emails = res.data.data
                console.log(this.emails)
            } catch (error) {
                this.error = error.response.data.message
            }
        }
    }
})