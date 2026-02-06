<template>
  <header class="app-header">
    <!-- Titre / Logo -->
    <div class="app-title">
      Cercle Bacon 2.0 — TEST
    </div>

    <!-- Zone utilisateur -->
    <div class="user-area">
      <span class="user-name">
        {{ userName }}
      </span>


      <v-menu location="bottom end">
        <template #activator="{ props }">
          <v-btn
              v-bind="props"
              icon
              variant="text"
              size="small"
          >
            <v-icon size="24">mdi-account-circle</v-icon>
          </v-btn>
        </template>

        <v-list density="compact">
          <v-list-item
              @click="onLogout"
          >
            Déconnexion
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </header>
</template>

<script setup>

import {useAuthStore} from "../store/AuthStore.js";
import router from "../router/index.js";

const userName = 'Eliott Lauwick'

const authStore = useAuthStore()

function onLogout() {
  authStore.logout()
  router.push('/login')
}

</script>

<style scoped>
.app-header {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;

  background-color: #e5e7eb; /* même famille que l'entête du tableau */
  border-bottom: 1px solid #d1d5db;

  position: sticky;
  top: 0;
  z-index: 10;
}

.app-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #111827;
}

.header-info {
  font-size: 0.75rem;
  color: #374151;
}

.user-area {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-name {
  font-size: 0.8rem;
  color: #1f2937;
}

.user-name {
  font-size: 0.9rem;
  color: #1f2937;
  font-weight: 500;
}

</style>
