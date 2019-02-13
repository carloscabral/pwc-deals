<template>

  <v-card class="pa-4 mx-sm-4">

    <TopSection title="SIC" @print="printList" @export="exportList" />

    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
        <v-card-title>
            <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
            <v-container grid-list-md>
            <v-layout wrap>
                <v-flex xs12 sm4>
                <v-text-field v-model="editedItem.id" label="ID do SIC"></v-text-field>
                </v-flex>
                <v-flex xs12 sm8>
                <v-text-field v-model="editedItem.name" label="Nome do setor"></v-text-field>
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

    <v-dialog v-model="showDetailDialog" scrollable max-width="500px">
      <v-card>
        <v-card-title>SIC: [ número ]</v-card-title>
        <v-divider></v-divider>
        <div class="p-4">
          <p style="color: rgba(0,0,0,.5)">Todas as informações de um SIC especifico.</p>
        </div>
        <v-card-text style="height: 300px;">

        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" flat @click="showDetailDialog = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>             

    <div class="deals-table mb-2" style="position: relative">
      
      <v-card-title>
        <v-text-field style="max-width: 14rem;" v-model="search" append-icon="search" label="Buscar na listagem" single-line hide-details></v-text-field>
      </v-card-title>

      <v-data-table :headers="headers" :items="sics" :search="search" hide-actions :pagination.sync="pagination">
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
        <span>Novo setor</span>
      </v-tooltip> 

      <div class="text-xs-right pt-2 my-3">
        <v-pagination circle style="outline: none" v-model="pagination.page" :length="pages"></v-pagination>
      </div>               

    </div>

  </v-card>

</template>

<script>
import my_data from "../datas/sics.json";
import TopSection from "./TopSection";
import Accordion from "./Accordion";

export default {
  name: "SICs",
  data: () => ({
    //   Related to CRUD actions
    instanceName: "SIC",
    editedIndex: -1,
    editedItem: { id: '', name: '' },
    defaultItem: { id: '', name: '' },
    // 
    search: "",
    dialog: false,
    showDetailDialog: false,
    pagination: {},    
    sics: my_data,
    headers: [
      { text: "Número", align: "left", value: "id" },
      { text: "Nome", value: "name" },
      { text: "Ações", value: "" }      
    ]
  }),
  methods: {
    tableClicked() {
      alert("Ao clicar em uma linha da tabela serão exibidos todos os dados daquele registro.")
    },    
    printList() {
      alert("Relatório será impresso.")
    },
    exportList() {
      alert("Relatório será exportado para excel.")
    },
    // Related to CRUD action
    editItem (item) {
      this.editedIndex = this.sics.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    showItem (item) {
      this.editedIndex = this.sics.indexOf(item)
      this.showDetailDialog = true
    },     
    deleteItem (item) {
      const index = this.sics.indexOf(item)
      confirm('Tem certeza de que deseja excluir o SIC ' + item.id + '?') && this.sics.splice(index, 1)
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.sics[this.editedIndex], this.editedItem)
      } else {
        this.sics.push(this.editedItem)
      }
      this.close()
    }
    // End CRUD actions   
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Novo ' + this.instanceName : 'Editar ' + this.instanceName
    },    
    // Custom pagination
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;
      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    }
  },
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
