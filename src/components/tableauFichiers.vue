<template>
  <v-data-table
      :items="fichiers"
      :headers="headers"
      class="data-table"
  >
  </v-data-table>
  <v-btn @click="console.log(fichiers)">test</v-btn>
</template>

<script setup>

import {onMounted, ref} from "vue";
import cercleBaconService from "../services/cercleBaconService.js";

const headers = ref([
    {title: 'Provider', key: 'provider'},
    {title: 'Zone', key: 'zone'},
    {title: 'Package', key: 'packageName'},
    {title: 'Force Option', key: 'forceOption'},
    {title: 'Lines', key: 'linesUrl'},
    {title: 'Logs', key: 'logsUrl'},
    {title: 'Errors', key: 'ErrorsUrl'},
    {title: 'Package Date', key: 'date'},
])
const fichiers = ref([])

onMounted(() => {
  setupData()
})

function setupData(){
  cercleBaconService.getFiles()
      .then(response => fichiers.value = response.data)
      .catch(error => console.log(error))
}
</script>

<style scoped>
.data-table {
  width: 100vw !important;
}
</style>