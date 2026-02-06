<template>
  <v-app>
    <RouterView/>
    <v-btn @click="consoleLog">
      console.log
    </v-btn>
    <v-btn @click="route">
      route
    </v-btn>
  </v-app>
</template>

<script setup>
import {useAuthStore} from "./store/AuthStore.js";
import router from "./router/index.js";

const AuthStore = useAuthStore()

function consoleLog() {
  console.log(AuthStore.isAuthenticated)
}

function route() {
  router.push('/')
}
</script>