<template>
  <div class="dataSourceSideBar">
    <input type="text" id="searchFilter" placeholder="Filter" v-model="searchField">
    <ul id="dataSources">
      <li v-for="dataSource in filteredDataSources" key="dataSource.id" @click="setDataSource(dataSource)">
        {{dataSource.name}} <img src="../img/downloadIco.png" alt="downloadIco">
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import {onMounted, ref, computed } from 'vue';
  import { globalStateStore, DataSource } from '../stores/globalStateStore';
  // Initialize the store
  const globalState = globalStateStore()
  const searchField = ref('')
  
  function setDataSource(dataSource) {
    globalState.dataSourceMetadata = dataSource.metadata
  }

  (async function fetchDataSources(){
    const fetchData = await fetch("http://localhost:3000/getDataSources");
    globalState.dataSources = await fetchData.json()
  })()

  const filteredDataSources = computed(() => {
    return globalState.dataSources.filter(row => row.name.startsWith(searchField.value));
  })
</script>

<style scoped>
.dataSourceSideBar {
  max-height: 100%;
  display: inline-block;
  position: fixed;
  top: 0px;
  left: 0px;
  padding: 10px;
  width: 200px;
  overflow-y: auto;
}
ul {
  list-style-type: none;
  padding-left: 0px;
}
li {
  max-height: 20px;
  max-width: 100%;
  padding: 4px;
  border: 1px solid green;
}
img {
  max-width: 100%;
  max-height: 15px;
  margin-left: 10px;
  display: inline-block;
  position: absolute;
  right: 10%;
}
</style>
