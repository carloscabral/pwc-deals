<template>

  <v-card class="pa-4 mx-sm-4">

    <TopSection :title="instanceName" @print="printList" @export="exportList" />

    <Accordion>

      <v-layout row wrap class="p-3">        

        <v-flex xs12 sm6 md4 lg3 class="px-sm-4">
          <v-select v-model="selectedName" :items="getDistinct('name')" label="Nome" multiple dense>
            <template slot="selection" slot-scope="{ item, index }">
              <v-chip small v-if="index === 0">
                <span>{{ item }}</span>
              </v-chip>
              <span v-if="index === 1" class="grey--text caption">(+{{ selectedName.length - 1 }})</span>
            </template>              
            <v-list-tile slot="prepend-item" ripple @click="toggleAll('name')">
              <v-list-tile-action>
                <v-icon v-if="selectAll('name')" :color="selectedName.length > 0 ? 'primary' : ''">check_box</v-icon>
                <v-icon v-else-if="selectSome('name')" :color="selectedName.length > 0 ? 'primary' : ''">indeterminate_check_box</v-icon>
                <v-icon v-else :color="selectSome('name').length > 0 ? 'primary' : ''">check_box_outline_blank</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>Selecionar todos</v-list-tile-title>
            </v-list-tile>
            <v-divider slot="prepend-item" class="mt-2"></v-divider>
          </v-select>
        </v-flex>

        <v-flex xs12 sm6 md4 lg3 class="px-sm-4">
          <v-select v-model="selectedContinent" :items="getDistinct('continent')" label="Continente" multiple dense>
            <template slot="selection" slot-scope="{ item, index }">
              <v-chip small v-if="index === 0">
                <span>{{ item }}</span>
              </v-chip>
              <span v-if="index === 1" class="grey--text caption">(+{{ selectedContinent.length - 1 }})</span>
            </template>              
            <v-list-tile slot="prepend-item" ripple @click="toggleAll('continent')">
              <v-list-tile-action>
                <v-icon v-if="selectAll('continent')" :color="selectedContinent.length > 0 ? 'primary' : ''">check_box</v-icon>
                <v-icon v-else-if="selectSome('continent')" :color="selectedContinent.length > 0 ? 'primary' : ''">indeterminate_check_box</v-icon>
                <v-icon v-else :color="selectSome('continent').length > 0 ? 'primary' : ''">check_box_outline_blank</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>Selecionar todos</v-list-tile-title>
            </v-list-tile>
            <v-divider slot="prepend-item" class="mt-2"></v-divider>
          </v-select>
        </v-flex>

        <v-flex xs12 sm6 md4 lg3 class="px-sm-4 mt-2">
          <v-btn class="colored-shadow" :disabled="listPopup" :loading="listPopup" color="primary mx-0" @click="listPopup = true">Listar Países</v-btn>
          <v-dialog v-model="listPopup" hide-overlay persistent width="300">
            <v-card color="primary" dark>
              <v-card-text>
                Por favor, aguarde...
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>          
        </v-flex>

      </v-layout>
    </Accordion>

    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title style="background-color: rgba(255, 111, 0, .1)">
              <span class="headline ml-3">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
              <v-container grid-list-md>
              <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field v-model="editedItem.name" label="Nome"></v-text-field>
                  </v-flex>               
                  <v-flex xs12>
                    <v-select :items="getDistinct('continent')" v-model="editedItem.continent" label="Continente que pertence"></v-select>
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
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.continent }}</td>
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
        <v-btn slot="activator" @click="dialog = true" class="colored-shadow" style="margin-right: -1.5rem; margin-top: 3rem;" absolute dark fab top right color="primary">
          <v-icon>add</v-icon>
        </v-btn>
        <span>Novo país</span>
      </v-tooltip> 

      <div class="text-xs-right pt-2 my-3">
        <v-pagination circle style="outline: none" v-model="pagination.page" :length="pages"></v-pagination>
      </div>               

    </div>

  </v-card>

</template>

<script>
import my_data from "../datas/countries.json";
import TopSection from "./shared/TopSection";
import Accordion from "./shared/Accordion";

import { generalMixin } from '../mixins/generalMixin'

export default {
  mixins: [ generalMixin ],
  name: "Countries",
  data: () => ({
    instanceName: "Países",
    editedItem: { name: '', continent: ''},
    defaultItem: { name: '', continent: ''},      
    selectedContinent: [],
    selectedName: [],
    dataTable: my_data,
    headers: [
      { text: "Nome", value: "name" },
      { text: "Continente", value: "continent" },
      { text: "Ações", value: "" }      
    ]
  }),
  watch: {
    listPopup (val) {
      if (!val) return

      setTimeout(() => (this.listPopup = false), 3000)
    },
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
