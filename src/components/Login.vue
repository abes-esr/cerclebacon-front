<script setup>
import {ref, computed} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '../store/AuthStore'
import cercleBaconService from '../services/cercleBaconService.js'

const router = useRouter()
const authStore = useAuthStore()

const login = ref('')
const password = ref('')

const rules = [
  v => !!v || 'Champ obligatoire',
  v => v.length <= 32 || '32 caractères maximum'
]

const isValid = computed(() =>
    login.value.length > 0 &&
    password.value.length > 0 &&
    login.value.length <= 32 &&
    password.value.length <= 32
)

const errorMessage = ref('')
const isLoading = ref(false)

function submit() {
  isLoading.value = true
  errorMessage.value = ''
  cercleBaconService.login(login.value, password.value)
      .then(response => {
            console.log(response)
            const userData = {
              iln: response.data.iln,
              userNum: response.data.userNum,
              shortName: response.data.shortName,
              role: response.data.role,
              email: response.data.email
            }
            const token = `Bearer ${response.data.accessToken}`

            authStore.login(userData, token)

            cercleBaconService.setAuthToken(token)

            router.push('/')
          }
      ).catch(error => {
        console.error(error)
        errorMessage.value = error.response?.data || 'Erreur lors de la connexion'
      }
  ).finally(() => {
    isLoading.value = false
  })
}
</script>

<template>
  <div class="login-wrapper">
    <v-card class="login-card">
      <v-card-title class="login-title">
        Connexion
      </v-card-title>

      <v-card-text>
        <v-text-field
            label="Login"
            v-model="login"
            :rules="rules"
            maxlength="32"
            counter
            density="compact"
        />

        <v-text-field
            label="Mot de passe"
            v-model="password"
            type="password"
            :rules="rules"
            maxlength="32"
            counter
            density="compact"
        />
        <p>{{ errorMessage }}</p>
      </v-card-text>

      <v-card-actions>
        <v-btn
            class="btn-modern"
            block
            :loading="isLoading"
            :disabled="!isValid"
            @click="submit"
        >
          Se connecter
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f6fa;
}

.login-card {
  width: 360px;
}

.login-title {
  text-align: center;
  font-weight: 600;
}
</style>