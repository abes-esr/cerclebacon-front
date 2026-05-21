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
          @click="checkFile(item.filename)"
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
          @click="downloadFile(item.logsFilename)"
          density="compact"
          size="small"
          v-if="item.logsFilename"
      >
        Voir
      </v-btn>
    </template>
    <template v-slot:item.ErrorsFilename="{ item }">
      <v-btn
          :href="baseUrl + 'api/v1/file/' + item.ErrorsFilename"
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

  <CheckFileDialog
      v-model="isDialogOpen"
      :title="title"
      :body="body"
      :isLoading="isLoading"
      @close="onClose"
  ></CheckFileDialog>
</template>

<script setup>

import {onBeforeUnmount, onMounted, ref} from "vue";
import cercleBaconService from "../services/cercleBaconService.js";
import kbart2KafkaService from "../services/kbart2kafkaService.js";
import CheckFileDialog from "./CheckFileDialog.vue";

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
const isDialogOpen = ref(false)
const body = ref('body')
const title = ref('title')
const isLoading = ref(false)

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

async function checkFile(fileName) {
  title.value = 'Check file ' + fileName
  isLoading.value = true
  isDialogOpen.value = true
  try {
    const result = await kbart2KafkaService.checkFile(fileName);
    console.log(result.data);
    body.value = result.data;
  } catch (error) {
    console.error('Erreur Checkfile', error)
    body.value = error.response?.data || 'Erreur lors du check de fichier'
  } finally {
    isLoading.value = false
  }
}

function onClose() {
  body.value = ""
  title.value = ""
}

async function downloadFile(fileName) {
  try {
    const response = await cercleBaconService.client.get(
        'api/v1/file/' + fileName,
        {responseType: 'blob'}
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Erreur téléchargement", error);
    alert("Erreur lors du téléchargement");
  }
}
</script>

<style scoped>
.data-table {
  width: 100vw !important;
}
</style>