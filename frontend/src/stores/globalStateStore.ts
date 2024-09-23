
import { defineStore } from 'pinia';
import { ref } from 'vue';
export interface DataSource {
  id: string;
  name: string;
  metadata: string;
}

export const globalStateStore = defineStore('globalStateStore', {
  state: () => ({
    dataSources: [
      {id: "1", name: "1", metadata: "1algum conteudo dodataSource"},
      {id: "2", name: "2", metadata: "2algum conteudo dodataSource"},
      {id: "3", name: "3", metadata: "3algum conteudo dodataSource"},
      {id: "4", name: "4", metadata: "4algum conteudo dodataSource"},
      {id: "5", name: "5", metadata: "5algum conteudo dodataSource"},
      {id: "6", name: "6", metadata: "6algum conteudo dodataSource"},
      {id: "7", name: "7", metadata: "7algum conteudo dodataSource"},
      {id: "8", name: "8", metadata: "8algum conteudo dodataSource"},
      {id: "9", name: "9", metadata: "9algum conteudo dodataSource"},
      {id: "10", name: "10", metadata: "1algum conteudo dodataSource"},
      {id: "11", name: "11", metadata: "1algum conteudo dodataSource"},
      {id: "12", name: "12", metadata: "1algum conteudo dodataSource"},
      {id: "13", name: "13", metadata: "1algum conteudo dodataSource"},
      {id: "14", name: "14", metadata: "1algum conteudo dodataSource"},
      {id: "15", name: "15", metadata: "1algum conteudo dodataSource"},
      {id: "16", name: "16", metadata: "1algum conteudo dodataSource"},
      {id: "17", name: "17", metadata: "1algum conteudo dodataSource"},
      {id: "18", name: "18", metadata: "1algum conteudo dodataSource"},
      {id: "19", name: "19", metadata: "1algum conteudo dodataSource"},
      {id: "20", name: "20", metadata: "2algum conteudo dodataSource"},
      {id: "21", name: "21", metadata: "2algum conteudo dodataSource"},
      {id: "22", name: "22", metadata: "2algum conteudo dodataSource"},
      {id: "23", name: "23", metadata: "2algum conteudo dodataSource"},
      {id: "24", name: "24", metadata: "2algum conteudo dodataSource"},
      {id: "25", name: "25", metadata: "2algum conteudo dodataSource"},
      {id: "26", name: "26", metadata: "2algum conteudo dodataSource"},
      {id: "27", name: "27", metadata: "2algum conteudo dodataSource"},
      {id: "28", name: "28", metadata: "2algum conteudo dodataSource"},
      {id: "29", name: "29", metadata: "2algum conteudo dodataSource"},
      {id: "30", name: "30", metadata: "3algum conteudo dodataSource"},
      {id: "31", name: "31", metadata: "3algum conteudo dodataSource"},
      {id: "31", name: "31", metadata: "3algum conteudo dodataSource"},
      {id: "33", name: "33", metadata: "3algum conteudo dodataSource"},
      {id: "34", name: "34", metadata: "3algum conteudo dodataSource"},
      {id: "35", name: "35", metadata: "3algum conteudo dodataSource"},
      {id: "36", name: "36", metadata: "3algum conteudo dodataSource"},
      {id: "37", name: "37", metadata: "3algum conteudo dodataSource"},
      {id: "38", name: "38", metadata: "3algum conteudo dodataSource"},
      {id: "39", name: "39", metadata: "3algum conteudo dodataSource"},
      {id: "40", name: "40", metadata: "4algum conteudo dodataSource"},
      {id: "41", name: "41", metadata: "4algum conteudo dodataSource"},
      {id: "42", name: "42", metadata: "4algum conteudo dodataSource"},
      {id: "43", name: "43", metadata: "4algum conteudo dodataSource"},
      {id: "44", name: "44", metadata: "4algum conteudo dodataSource"},
    ] as DataSource[],
    dataSourceMetadata: ref(""),
  }),
  actions: {
    increment() {
      //this.count++;
    },
  },
});
