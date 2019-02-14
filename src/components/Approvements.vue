<template>

  <v-card class="pa-4 mx-sm-4">

    <TopSection :title="instanceName" @print="printList" @export="exportList" />

    <div class="mb-2" style="position: relative">
      
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
            :items="getDraftDeals" 
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
                <v-icon small class="mr-2" @click="showItem(props.item)">visibility</v-icon>
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

      <div class="text-xs-right pt-2 my-3">
        <v-pagination circle style="outline: none" v-model="pagination.page" :length="pages"></v-pagination>
      </div>               

    </div>

  </v-card>

</template>

<script>
import my_data from "../datas/deals.json";
import TopSection from "./shared/TopSection";

import { generalMixin } from '../mixins/generalMixin'

export default {
  mixins: [ generalMixin ],
  name: "Approvements",
  data: () => ({
    instanceName: "Aprovações",
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
    dataTable: my_data,
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
    }
  },
  computed: {
      getDraftDeals() {
        return this.dataTable.filter( obj => obj.isDraft === true )
      }
  },
  components: {
    TopSection
  }
};
</script>

<style lang="scss" scoped>
</style>
