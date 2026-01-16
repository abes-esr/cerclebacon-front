<template>
  <v-data-table
      :items="fichiers"
      :headers="headers"
      class="data-table"
  >
    <template v-slot:item.check="{ item }">
      <v-btn
          :href="'http://diplotaxis2-test.v202.abes.fr:15081/api/v1/checkfile/' + item.filename"
          target="_blank"
          density="compact"
          size="small"
      >
        Check
      </v-btn>
    </template>
    <template style="align-content: center"
              v-slot:item.forceOption="{ item }">
      <v-select
          label="Select"
          :items="['', 'FORCE', 'BYPASS']"
          density="compact"
      ></v-select>
    </template>
    <template v-slot:item.logsFilename="{ item }">
      <v-btn
          :href="baseUrl + 'file/' + item.logsFilename"
          density="compact"
          size="small"
          target="_blank"
          v-if="item.logsFilename"
      >
        Voir
      </v-btn>
    </template>
    <template v-slot:item.ErrorsFilename="{ item }">
      <v-btn
          :href="baseUrl + 'file/' + item.ErrorsFilename"
          density="compact"
          size="small"
          target="_blank"
          v-if="item.ErrorsFilename"
      >
        Voir
      </v-btn>
    </template>
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
    {title: 'Check', key: 'check'},
    {title: 'Force Option', key: 'forceOption'},
    {title: 'Lines', key: 'linesUrl'},
    {title: 'Logs', key: 'logsFilename'},
    {title: 'Errors', key: 'ErrorsFilename'},
    {title: 'Package Date', key: 'date'},
])
const fichiers = ref([])

const baseUrl = cercleBaconService.getBaseUrl()

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