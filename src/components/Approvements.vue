<template>

  <v-card class="pa-4 mx-sm-4">

    <TopSection title="Aprovações" @print="printList" @export="exportList" />

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

    <div class="deals-table mb-2" style="position: relative">
      
      <v-card-title>
        <v-text-field style="max-width: 14rem;" v-model="search" append-icon="search" label="Buscar na listagem" single-line hide-details></v-text-field>
      </v-card-title>

        <v-expand-transition mode="in-out">
            <v-toolbar v-if="selected.length > 0" flat color="rgba(255, 111, 0, .1)">
                <h4 v-if="selected.length == 1" class="mr-4">{{ selected.length }} item selecionado</h4>
                <h4 v-else class="mr-4">{{ selected.length }} itens selecionados</h4>
                <v-btn color="primary" @click="setApprovement" dark class="mb-2">Aprovar</v-btn>
            </v-toolbar>
        </v-expand-transition>

        <v-data-table
            v-model="selected" 
            select-all 
            :headers="headers" 
            :items="deals" 
            :search="search" 
            hide-actions 
            :pagination.sync="pagination">
            <template slot="items" slot-scope="props">
                <td>
                    <v-checkbox color="primary"
                        v-model="props.selected"
                        hide-details
                    ></v-checkbox>
                </td>            
            <td :class="{ dimmed: props.item.isDraft }">{{ props.item.dealNumber }}</td>
            <td :class="{ dimmed: props.item.isDraft }" class="text-xs-left">{{ props.item.dealDate }}</td>
            <td :class="{ dimmed: props.item.isDraft }" class="text-xs-left">{{ props.item.dealType }}</td>
            <td :class="{ dimmed: props.item.isDraft }" class="text-xs-left">{{ props.item.buyerCompany }}</td>
            <td :class="{ dimmed: props.item.isDraft }" class="text-xs-left d-flex-column align-center">
                {{ props.item.buyerGroup }}
                <p class="mb-0"><small style="color: rgba(0,0,0,.54)">{{ props.item.buyerCountry }}</small></p>
            </td>
            <td :class="{ dimmed: props.item.isDraft }" class="text-xs-left">{{ props.item.sellerCompany }}</td>
            <td :class="{ dimmed: props.item.isDraft }" class="text-xs-left d-flex-column align-center">
                {{ props.item.dealedCompany }}
                <p class="mb-0"><small style="color: rgba(0,0,0,.54)">{{ props.item.dealedCountry }}</small></p>
            </td>
            <td :class="{ dimmed: props.item.isDraft }" class="text-xs-left">{{ props.item.region }}</td>
            <td :class="{ dimmed: props.item.isDraft }" class="text-xs-right">{{ props.item.dealValue }}</td>
            <td :class="{ dimmed: props.item.isDraft }" class="text-xs-left">{{ props.item.dealedSIC }}</td>
            <td class="justify-space-around layout px-0">
                <v-icon small class="mr-2" @click="editItem(props.item.dealNumber)">edit</v-icon>
                <v-icon small class="mr-2" @click="showItem(props.item.dealNumber)">visibility</v-icon>
                <v-icon small @click="deleteItem(props.item.dealNumber)">delete</v-icon>
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

      <!-- <v-tooltip left>
        <v-btn @click="dialog = true" slot="activator" class="colored-shadow" style="margin-right: -1.5rem; margin-top: 3rem;" absolute dark fab top right color="primary">
          <v-icon>add</v-icon>
        </v-btn>
        <span>Nova transação</span>
      </v-tooltip>  -->

      <div class="text-xs-right pt-2 my-3">
        <v-pagination circle style="outline: none" v-model="pagination.page" :length="pages"></v-pagination>
      </div>               

    </div>

  </v-card>

</template>

<script>
import my_data from "../datas/deals.json";
import TopSection from "./TopSection";

export default {
  name: "Approvements",
  data: () => ({
    //   Related to CRUD actions
    instanceName: "Aprovações",
    editedIndex: -1,
    selected: [],
    editedItem: {
      dealNumber: 0,
      dealDate: "21/02/18",
      dealType: "",
      buyerCompany: "",
      buyerGroup: "",
      buyerCountry: "",
      sellerCompany: "",
      dealedCompany: "",
      dealedCountry: "",
      region: "",
      state: "",
      dealValue: "",
      dealedSIC: "",
      ca: "",
      capitalSource: "",
      advisor: "",
      mainBuyer: "",
      isDraft: "",
      groupContinent: "",
      privatization: ""
    },
    defaultItem: {
      dealNumber: 0,
      dealDate: "21/02/18",
      dealType: "",
      buyerCompany: "",
      buyerGroup: "",
      buyerCountry: "",
      sellerCompany: "",
      dealedCompany: "",
      dealedCountry: "",
      region: "",
      state: "",
      dealValue: "",
      dealedSIC: "",
      ca: "",
      capitalSource: "",
      advisor: "",
      mainBuyer: "",
      isDraft: "",
      groupContinent: "",
      privatization: ""
    },
    //
    search: "",
    dialog: false,
    showDetailDialog: false,
    pagination: {},
    deals: my_data,
    headers: [
      { text: "Número", align: "left", value: "dealNumber" },
      { text: "Data", value: "dealDate" },
      { text: "Tipo de transação", value: "dealType" },
      { text: "Comprador", value: "buyerCompany" },
      { text: "Grupo pertencente", value: "" },
      { text: "Vendedor", value: "sellerCompany" },
      { text: "Target", value: "dealedCompany" },
      { text: "Região", value: "region" },
      { text: "USD (MM)", value: "dealValue" },
      { text: "Setor / Indústria", value: "dealedSIC" },
      { text: "Ações", value: "" }
    ]
  }),
  methods: {
    setApprovement() {
        alert("Ação que aprova o(s) rascunho(s) selecionado(s).")
    },   
    printList() {
      alert("Relatório será impresso.");
    },
    exportList() {
      alert("Relatório será exportado para excel.");
    },
    // Related to CRUD action
    showItem(args) {
      alert("Mostra todos os dados do item da listagem.")
    }, 
    editItem(args) {
      alert("Entra em modo de edição da transação: " + args)
    },
    deleteItem(args) {
      let result = confirm("Tem certeza que deseja excluir esse registro?")
      if (result == true) {
        alert("Transação de número " + args + " seria removida com essa ação.")
      }
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.deals[this.editedIndex], this.editedItem);
      } else {
        this.deals.push(this.editedItem);
      }
      this.close();
    },
    getAlternateLabel (count) {
        if (count > 1) { 
            return count +  'usuários selecionados'
        } else if (count == 1) {
            return count +  'selecionado'
        }
    },    
    // End CRUD actions
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Novo " + this.instanceName
        : "Editar " + this.instanceName;
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
    dialog(val) {
      val || this.close();
    }
  },
  components: {
    TopSection
  }
};
</script>

<style lang="scss" scoped>
</style>
