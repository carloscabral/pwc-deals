<template>

  <v-card class="pa-4 mx-sm-4">

    <TopSection :title="instanceName" @print="printList" @export="exportList" />

    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
        <v-card-title style="background-color: rgba(255, 111, 0, .1)">
            <span class="headline ml-3">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
            <v-container grid-list-md>
            <v-layout wrap>
                <v-flex xs12 sm3>
                  <v-text-field v-model="editedItem.id" label="ID do SIC"></v-text-field>
                </v-flex>
                <v-flex xs12 sm7 offset-sm1>
                  <v-select :items="getDistinct('name')" v-model="editedItem.name" label="Setor que pertence"></v-select>
                </v-flex>
            </v-layout>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="close">Cancelar</v-btn>
            <v-btn color="primary" flat @click="save">Salvar</v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>         

    <div class="mb-2" style="position: relative">
      
      <v-card-title>
        <v-text-field style="max-width: 14rem;" v-model="search" append-icon="search" label="Buscar na listagem" single-line hide-details></v-text-field>
      </v-card-title>

      <v-data-table :headers="headers" :items="dataTable" :search="search" hide-actions :pagination.sync="pagination">
        <template slot="items" slot-scope="props">
          <td :class="{ dimmed: props.item.isDraft }" class="text-xs-left">{{ props.item.id }}</td>
          <td :class="{ dimmed: props.item.isDraft }" class="text-xs-left">{{ props.item.name }}</td>
          <td class="justify-space-around layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small class="mr-2" @click="showItem(props.item)">visibility</v-icon>
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </template>
        <div slot="no-results">
          <div class="empty-state">
            <v-icon>search</v-icon>
            <h1>Nenhum item encontrado</h1>
            <p>A busca por '{{ search }}' não retornou nenhum registro. Tente novamente ou crie um novo.</p>
          </div>
        </div>
      </v-data-table>
      <small>&bull;&nbsp;As linhas com aparência esmaecida representam rascunhos.</small>

      <v-tooltip left>
        <v-btn @click="dialog = true" slot="activator" class="colored-shadow" style="margin-right: -1.5rem; margin-top: 3rem;" absolute dark fab top right color="primary">
          <v-icon>add</v-icon>
        </v-btn>
        <span>Novo Setor</span>
      </v-tooltip> 

      <div class="text-xs-right pt-2 my-3">
        <v-pagination circle style="outline: none" v-model="pagination.page" :length="pages"></v-pagination>
      </div>               

    </div>

  </v-card>

</template>

<script>
import my_data from "../datas/sics.json";
import TopSection from "./shared/TopSection";
import Accordion from "./shared/Accordion";

import { generalMixin } from '../mixins/generalMixin'

export default {
  mixins: [ generalMixin ],
  name: "SICs",
  data: () => ({
    instanceName: "SIC",
    editedItem: { id: '', name: '' },
    defaultItem: { id: '', name: '' },
    dataTable: my_data,
    headers: [
      { text: "Número", align: "left", value: "id" },
      { text: "Nome", value: "name" },
      { text: "Ações", value: "" }      
    ]
  }),
  watch: {
    dialog (val) { val || this.close() }
  },
  components: {
    TopSection,
    Accordion
  }   
};
</script>

<style lang="scss" scoped>
</style>
