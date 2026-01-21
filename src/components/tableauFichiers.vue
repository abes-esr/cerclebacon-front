<template>
  <v-data-table
      :items="fichiers"
      :headers="headers"
      class="data-table"
      density="compact"
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
    <template v-slot:item.forceOption="{ item }">
      <v-select
          v-model="item.forceOption"
          :items="['', 'FORCE', 'BYPASS']"
          variant="outlined"
          hide-details
          density="compact"
          class="force-option-select"
          placeholder="Select"
      />
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
  <v-btn
      class="btn-modern mt-4"
      @click="setupData"
  >
    Refresh
  </v-btn>
</template>

<script setup>

import {onBeforeUnmount, onMounted, ref} from "vue";
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

let interval

onMounted(() => {
  setupData()
  interval = setInterval(() => {
    setupData()
  }, 30000)
})

onBeforeUnmount(() => {
  clearInterval(interval)
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