<script setup>

import HeaderBar from "../components/HeaderBar.vue";
import TableauFichiers from "../components/TableauFichiers.vue";
</script>

<template>
  <HeaderBar/>

  <main class="app-content">
    <TableauFichiers/>
  </main>
</template>

<style scoped>
.app-content {
  padding: 16px 16px;
}

</style>