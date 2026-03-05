import {defineStore} from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        user: null,
        token: null,
    }),
    getters: {
        isAuthenticated: state => state.authenticated,
        getUser: state => state.user
    },
    actions: {
        login(userData, token) {
            this.authenticated = true
            this.user = userData
            this.token = token
        },
        logout() {
            this.authenticated = false
            this.user = null
            this.token = null
        }
    }
})