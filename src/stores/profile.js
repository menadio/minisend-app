import { defineStore } from 'pinia'
import http from '../http'

export const useProfileStore = defineStore('profile', {
    state: () => ({
        user: null,
        error: null
    }),
    getters: {
        // totalPostedEmails(state) {
        //     return state.user.posted_count
        // },
        // totalSentEmails(state) {
        //     return state.user.sent_count
        // },
        // totalFailedEmails(state) {
        //     return state.user.failed_count
        // }
    },
    actions: {
        async getUserData() {
            try {
                const res = await http.get('user');

                return this.user = res.data.data
            } catch (error) {
                this.error = error.response.data.message
            }
        }
    }
})