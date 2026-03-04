<script setup>
import {ref, computed} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '../store/AuthStore'

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

function submit() {
  authStore.login()
  router.push('/tableau')
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
      </v-card-text>

      <v-card-actions>
        <v-btn
            class="btn-modern"
            block
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