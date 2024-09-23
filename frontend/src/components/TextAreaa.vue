<template>
    <div class="dataSourceMetadata">
        <textarea name="dataSourceMetadata" id="dataSourceMetadata" cols="60">{{globalState.dataSourceMetadata}}</textarea>
        <div class="tableName">
          <label for="TableName">Table Name</label><br>
          <input type="text" name="TableName" v-model="tableName"><br>
          <button @click="generate">Generate</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { globalStateStore } from '../stores/globalStateStore';
    import { ref } from 'vue';
    // Initialize the store
    const globalState = globalStateStore()
    let tableName = ref('')

    async function generate() {
      if(globalState.dataSources.some(row=> row.name.toUpperCase() === tableName.value.toUpperCase())){
        const rowToDisplay = globalState.dataSources.filter(row=> row.name.toUpperCase() === tableName.value.toUpperCase())
        globalState.dataSourceMetadata = rowToDisplay[0].metadata;
        return rowToDisplay[0].metadata;
      }
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        "dataSourceName": tableName.value
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const fetchRes = await fetch("http://localhost:3000/getDataSources", requestOptions);
      const result = await fetchRes.json();
      globalState.dataSources.push(result);
      globalState.dataSourceMetadata = result.metadata;
    }
</script>

<style scoped>
.tableName {
  margin: 0 25%;
  min-width: 100%;
}
.dataSourceMetadata {
  display: block;
  position: absolute;
  margin-left: 200px;
  height: 70%;
  width: 50%;
  box-sizing: border-box; 
}
textarea {
  min-height: 100%;
  min-width: 100%;
  margin: 0 25%;
  position: relative;
}
</style>