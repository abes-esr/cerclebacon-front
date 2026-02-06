<template>
  <v-data-table
      :items="fichiers"
      :headers="headers"
      class="data-table"
      density="compact"
      :items-per-page="-1"
      hide-default-footer
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
          @update:modelValue="onForceOptionChange(item)"
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
  <div class="refresh-hint">
    Données mises à jour automatiquement toutes les 30 secondes
  </div>
  <div class="toolbar">
    <v-btn
        class="btn-modern"
        @click="setupData"
        :class="{ refreshing: isRefreshing }"
    >
      Refresh
    </v-btn>
  </div>
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

function setupData() {
  cercleBaconService.getFiles()
      .then(response => fichiers.value = response.data)
      .catch(error => console.log(error))
}

function onForceOptionChange(item) {
  // sécurité : on ne fait rien si vide
  if (!item.forceOption) {
    return
  }

  cercleBaconService.renameFile(item.filename, item.forceOption)
      .then(() => {
        console.log('Renommage OK pour', item.filename)
        setupData() // refresh du tableau
      })
      .catch(error => {
        console.error('Erreur renommage', error)
        alert(error.response?.data || 'Erreur lors du renommage')
      })
}
</script>

<style scoped>
.data-table {
  width: 100vw !important;
}
</style>