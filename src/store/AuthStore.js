import {defineStore} from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: true,
    }),
    getters: {isAuthenticated: state => state.authenticated},
    actions: {
        login() {
            this.authenticated = true;
        }, logout() {
            this.authenticated = false;
        }
    },
})