import axios from "axios";
import {useAuthStore} from "../store/AuthStore.js";

export class CercleBaconService {

    getBaseUrl() {
        return import.meta.env.VITE_BASE_URL
    }


    constructor() {
        this.client = axios.create({
            baseURL: this.getBaseUrl(),
            timeout: 300000,
        })
        this.client.interceptors.request.use((config) => {
            const authStore = useAuthStore()
            if (authStore.isAuthenticated && authStore.token) {
                config.headers.Authorization = authStore.token
            }
            return config
        })
    }

    getFiles() {
        return this.client.get("api/v1/all");
    }

    renameFile(fileName, forceOption) {
        return this.client.post('api/v1/renameFile', {
            fileName: fileName,
            forceOption: forceOption
        })
    }

    login(username, password) {
        return this.client.post('/auth/login', {
            username: username,
            password: password,
        })
    }

    setAuthToken(token) {
        this.client.defaults.headers.common['Authorization'] = token
    }
}

export default new CercleBaconService();