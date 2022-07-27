import { defineStore } from 'pinia'
import http from '../http'

export const useSettingStore = defineStore('setting', {
    state: () => ({
        settings: [],
        error: null
    }),

    actions: {
        async getSetting() {
            try {
                const res = await http.get('api-key');

                return this.settings = res.data.data
            } catch (error) {
                this.error = error.response.data.message
            }
        }
    }
})