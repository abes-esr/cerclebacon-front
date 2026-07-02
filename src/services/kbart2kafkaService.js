// src/services/kbart2kafkaService.js
import axios from 'axios'
import {useAuthStore} from '../store/AuthStore.js'

export class Kbart2KafkaService {

    getBaseUrl() {
        return import.meta.env.VITE_KBART2KAFKA_URL
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

    checkFile(fileName) {
        return this.client.get('api/v1/check/' + fileName)
    }
}

export default new Kbart2KafkaService()