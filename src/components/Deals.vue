<template>

  <div>
    <v-card class="pa-4 mx-4">
      <h1>Listagem de transações</h1>
      <v-subheader style="height: 1rem" class="p-0 mb-5">Utilize os filtros abaixo para gerar o relatório:</v-subheader>
      <!-- <v-btn color="blue-grey" class="white--text" @click="loader = 'loading3'">Upload<v-icon right dark>cloud_upload</v-icon></v-btn> -->
      <Accordion>

        <v-layout row wrap class="p-3">

          <v-flex xs12 sm6 md3 class="px-sm-4">
            <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false"
              :nudge-right="40" lazy transition="scale-transition" 
              offset-y full-width max-width="290px" min-width="290px">
              <v-text-field slot="activator" v-model="initialDate" label="Data inicial" readonly></v-text-field>
              <v-date-picker v-model="initialDate" type="month" color="orange darken-3" :show-current="false" locale="pt" year-icon="calendar_today" scrollable>
              </v-date-picker>
            </v-menu>
          </v-flex>

          <v-flex xs12 sm6 md3 class="px-sm-4">
            <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false"
              :nudge-right="40" lazy transition="scale-transition" 
              offset-y full-width max-width="290px" min-width="290px">
              <v-text-field slot="activator" v-model="endDate" label="Data final" readonly></v-text-field>
              <v-date-picker v-model="endDate" type="month" color="orange darken-3" :show-current="false" locale="pt" year-icon="calendar_today" scrollable>
              </v-date-picker>
            </v-menu>
          </v-flex>          

          <v-flex xs12 sm6 md3 class="px-sm-4">
            <v-select v-model="selectedDealType" :items="getDealType" label="Tipo transação" multiple dense>
              <template slot="selection" slot-scope="{ item, index }">
                <v-chip small v-if="index === 0">
                  <span>{{ item }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text caption">(+{{ selectedDealType.length - 1 }})</span>
              </template>              
              <v-list-tile slot="prepend-item" ripple @click="toggleAll('dealType')">
                <v-list-tile-action>
                  <v-icon :color="selectedDealType.length > 0 ? '#EF6C00' : ''">{{ iconDealType }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>Selecionar todas</v-list-tile-title>
              </v-list-tile>
              <v-divider slot="prepend-item" class="mt-2"></v-divider>
            </v-select>
          </v-flex>

          <v-flex xs12 sm6 md3 class="px-sm-4">
            <v-select v-model="selectedBuyerCountry" :items="getBuyerCountry" label="País grupo / matriz" multiple dense>
              <template slot="selection" slot-scope="{ item, index }">
                <v-chip small v-if="index === 0">
                  <span>{{ item }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text caption">(+{{ selectedBuyerCountry.length - 1 }})</span>
              </template>              
              <v-list-tile slot="prepend-item" ripple @click="toggleAll('buyerCountry')">
                <v-list-tile-action>
                  <v-icon :color="selectedBuyerCountry.length > 0 ? '#EF6C00' : ''">{{ iconBuyerCountry }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>Selecionar todas</v-list-tile-title>
              </v-list-tile>
              <v-divider slot="prepend-item" class="mt-2"></v-divider>
            </v-select>
          </v-flex>

          <v-flex xs12 sm6 md3 class="px-sm-4">
            <v-select v-model="selectedDealedSIC" :items="getDealedSIC" label="Setor / Indústria" multiple dense>
              <template slot="selection" slot-scope="{ item, index }">
                <v-chip small v-if="index === 0">
                  <span>{{ item }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text caption">(+{{ selectedDealedSIC.length - 1 }})</span>
              </template>              
              <v-list-tile slot="prepend-item" ripple @click="toggleAll('dealedSIC')">
                <v-list-tile-action>
                  <v-icon :color="selectedDealedSIC.length > 0 ? '#EF6C00' : ''">{{ iconDealedSIC }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>Selecionar todas</v-list-tile-title>
              </v-list-tile>
              <v-divider slot="prepend-item" class="mt-2"></v-divider>
            </v-select>
          </v-flex>

          <v-flex xs12 sm6 md3 class="px-sm-4">
            <v-select v-model="selectedDealedCountry" :items="getDealedCountry" label="País onde ocorreu a transação" multiple dense>
              <template slot="selection" slot-scope="{ item, index }">
                <v-chip small v-if="index === 0">
                  <span>{{ item }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text caption">(+{{ selectedDealedCountry.length - 1 }})</span>
              </template>              
              <v-list-tile slot="prepend-item" ripple @click="toggleAll('dealedCountry')">
                <v-list-tile-action>
                  <v-icon :color="selectedDealedCountry.length > 0 ? '#EF6C00' : ''">{{ iconDealedCountry }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>Selecionar todas</v-list-tile-title>
              </v-list-tile>
              <v-divider slot="prepend-item" class="mt-2"></v-divider>
            </v-select>
          </v-flex> 

          <v-flex xs12 sm6 md3 class="px-sm-4">
            <v-select v-model="selectedRegion" :items="getRegion" label="Região" multiple dense>
              <template slot="selection" slot-scope="{ item, index }">
                <v-chip small v-if="index === 0">
                  <span>{{ item }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text caption">(+{{ selectedRegion.length - 1 }})</span>
              </template>              
              <v-list-tile slot="prepend-item" ripple @click="toggleAll('region')">
                <v-list-tile-action>
                  <v-icon :color="selectedRegion.length > 0 ? '#EF6C00' : ''">{{ iconRegion }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>Selecionar todas</v-list-tile-title>
              </v-list-tile>
              <v-divider slot="prepend-item" class="mt-2"></v-divider>
            </v-select>
          </v-flex> 

          <v-flex xs12 sm6 md3 class="px-sm-4">
            <v-select v-model="selectedState" :items="getState" label="Estado" multiple dense>
              <template slot="selection" slot-scope="{ item, index }">
                <v-chip small v-if="index === 0">
                  <span>{{ item }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text caption">(+{{ selectedState.length - 1 }})</span>
              </template>              
              <v-list-tile slot="prepend-item" ripple @click="toggleAll('state')">
                <v-list-tile-action>
                  <v-icon :color="selectedState.length > 0 ? '#EF6C00' : ''">{{ iconState }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>Selecionar todas</v-list-tile-title>
              </v-list-tile>
              <v-divider slot="prepend-item" class="mt-2"></v-divider>
            </v-select>
          </v-flex>

          <v-flex xs12 sm6 md3 class="px-sm-4">
            <v-btn depressed color="primary mx-0 mt-4">Listar transações</v-btn>
          </v-flex>

        </v-layout>
      </Accordion>

      <div class="deals-table mb-5" style="position: relative">
        
        <v-card-title>
          <v-text-field style="max-width: 20rem;" v-model="search" prepend-icon="search" label="Buscar na listagem" single-line hide-details></v-text-field>
          <v-spacer></v-spacer>
          <div class="text-xs-center pt-2">
            <v-pagination style="outline: none" v-model="pagination.page" :length="pages"></v-pagination>
          </div> 
        </v-card-title>

        <v-data-table :headers="headers" :items="deals" :search="search" hide-actions :pagination.sync="pagination">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.dealNumber }}</td>
            <td class="text-xs-right">{{ props.item.dealDate }}</td>
            <td class="text-xs-right">{{ props.item.dealType }}</td>
            <td class="text-xs-right">{{ props.item.buyerCompany }}</td>
            <td class="text-xs-right d-flex-column align-center">
              {{ props.item.buyerGroup }}
              <p class="mb-0"><small style="color: rgba(0,0,0,.54)">{{ props.item.buyerCountry }}</small></p>
            </td>
            <td class="text-xs-right">{{ props.item.sellerCompany }}</td>
            <td class="text-xs-right d-flex-column align-center">
              {{ props.item.dealedCompany }}
              <p class="mb-0"><small style="color: rgba(0,0,0,.54)">{{ props.item.dealedCountry }}</small></p>
            </td>
            <td class="text-xs-right">{{ props.item.region }}</td>
            <td class="text-xs-right">{{ props.item.dealValue }}</td>
            <td class="text-xs-right">{{ props.item.dealedSIC }}</td>
            <td class="justify-center layout px-0">
              <v-icon small class="mr-2">edit</v-icon>
              <v-icon small>delete</v-icon>
            </td>
          </template>
          <div slot="no-results">
            <p>Nenhum resultado encontrado!</p>
          </div>
          <!-- <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert> -->
        </v-data-table>

        <v-btn style="margin-right: -20px;" absolute dark fab bottom right color="orange darken-3">
          <v-icon>add</v-icon>
        </v-btn>       

      </div>


    </v-card>

  </div>
</template>

<script>
import my_data from "../datas/deals.json";
import TopSection from "./TopSection";
import Accordion from "./Accordion";

export default {
  name: "Deals",
  data: () => ({
    initialDate: new Date().toISOString().substr(0, 7),
    endDate: new Date().toISOString().substr(0, 7),
    menu1: false,
    menu2: false,
    modal: false,    
    selectedDealType: [],
    selectedBuyerGroup: [],
    selectedDealedSIC: [],
    selectedBuyerCountry: [],
    selectedDealedCountry: [],
    selectedRegion: [],
    selectedState: [],
    selectedFirstDate: new Date(),
    selectedLastDate: new Date(),
    search: "",
    pagination: {},
    deals: my_data,
    headers: [
      { text: 'Número', align: 'left', value: 'dealNumber' },        
      { text: 'Data', value: 'dealDate' },
      { text: 'Tipo de transação', value: 'dealType' },
      { text: 'Comprador', value: 'buyerCompany' },
      { text: 'Grupo pertencente', value: '' },
      { text: 'Vendedor', value: 'sellerCompany' },
      { text: 'Target', value: 'dealedCompany' },
      { text: 'Região', value: 'region' },
      { text: 'USD (MM)', value: 'dealValue' },
      { text: 'Setor / Indústria', value: 'dealedSIC' },
      { text: 'Ações', value: 'iron' }
    ]    
  }),
  methods: {
    tableClicked() {
      alert("Ao clicar em uma linha da tabela serão exibidos todos os dados daquele registro.")
    },    
    searchOnTable() {
      this.searched = searchByTerm(this.deals, this.search);
    },
    newDeal() {
      this.$router.push("/transacoes/novo");
    },
    printList() {
      alert("Relatório será impresso.")
    },
    exportList() {
      alert("Relatório será exportado para excel.")
    },
    editItem(args) {
      alert("Entra em modo de edição da transação: " + args)
    },
    removeItem(args) {
      let result = confirm("Tem certeza que deseja excluir esse registro?")
      if (result == true) {
        alert("Transação de número " + args + " seria removida com essa ação.")
      }
    },
    toggleAll(params) {
      this.$nextTick(() => {
        switch(params) {
          case "dealType":
            (this.selectAllDealTypes) ? this.selectedDealType = [] : this.selectedDealType = this.getDealType.slice()
            break;
          case "buyerGroup":
            (this.selectAllBuyerGroups) ? this.selectedBuyerGroup = [] : this.selectedBuyerGroup = this.getBuyerGroup.slice()
            break;
          case "dealedSIC":
            (this.selectAllDealedSICs) ? this.selectedDealedSIC = [] : this.selectedDealedSIC = this.getDealedSIC.slice()
            break;            
          case "buyerCountry":
            (this.selectAllBuyerCountries) ? this.selectedBuyerCountry = [] : this.selectedBuyerCountry = this.getBuyerCountry.slice()
            break;
          case "dealedCountry":
            (this.selectAllDealedCountries) ? this.selectedDealedCountry = [] : this.selectedDealedCountry = this.getDealedCountry.slice()
            break;
          case "region":
            (this.selectAllRegions) ? this.selectedRegion = [] : this.selectedRegion = this.getRegion.slice()
            break;
          case "state":
            (this.selectAllStates) ? this.selectedState = [] : this.selectedState = this.getState.slice()
            break;                                             
          default:
            //(this.selectAllItems) ? this.selectedBuyers = [] : this.selectedBuyers = this.getDealType.slice()
        }
      })
    }         
  },
  computed: {
    
    // vmkdslmvks
    getDealType() {
      return [...(new Set(this.deals.map(({ dealType }) => dealType).sort()))]
    },
    getBuyerGroup() {
      return [...(new Set(this.deals.map(({ buyerGroup }) => buyerGroup).sort()))]
    }, 
    getDealedSIC() {
      return [...(new Set(this.deals.map(({ dealedSIC }) => dealedSIC).sort()))]
    },
    getBuyerCountry() {
      return [...(new Set(this.deals.map(({ buyerCountry }) => buyerCountry).sort()))]
    },
    getDealedCountry() {
      return [...(new Set(this.deals.map(({ dealedCountry }) => dealedCountry).sort()))]
    }, 
    getRegion() {
      return [...(new Set(this.deals.map(({ region }) => region).sort()))]
    }, 
    getState() {
      return [...(new Set(this.deals.map(({ state }) => state).sort()))]
    },                
    
    //  bfklbmkl
    selectAllDealTypes() {
        return this.selectedDealType.length === this.getDealType.length
    },
    selectSomeDealTypes() {
        return this.selectedDealType.length > 0 && !this.selectAllDealTypes       
    }, 
    selectAllBuyerGroups() {
        return this.selectedBuyerGroup.length === this.getBuyerGroup.length
    },
    selectSomeBuyerGroups() {
        return this.selectedBuyerGroup.length > 0 && !this.selectAllBuyerGroups       
    }, 
    selectAllDealedSICs() {
        return this.selectedDealedSIC.length === this.getDealedSIC.length
    },
    selectSomeDealedSICs() {
        return this.selectedDealedSIC.length > 0 && !this.selectAllDealedSICs       
    },
    selectAllBuyerCountries() {
        return this.selectedBuyerCountry.length === this.getBuyerCountry.length
    },
    selectSomeBuyerCountries() {
        return this.selectedBuyerCountry.length > 0 && !this.selectAllBuyerCountries       
    },
    selectAllDealedCountries() {
        return this.selectedDealedCountry.length === this.getDealedCountry.length
    },
    selectSomeDealedCountries() {
        return this.selectedDealedCountry.length > 0 && !this.selectAllDealedCountries       
    },
    selectAllRegions() {
        return this.selectedRegion.length === this.getRegion.length
    },
    selectSomeRegions() {
        return this.selectedRegion.length > 0 && !this.selectAllRegions       
    },
    selectAllStates() {
        return this.selectedState.length === this.getState.length
    },
    selectSomeStates() {
        return this.selectedState.length > 0 && !this.selectAllStates       
    },

    // Return the right icon for the Select All box
    iconDealType() {
      if (this.selectAllDealTypes) return 'check_box'
      if (this.selectSomeDealTypes) return 'indeterminate_check_box'
      return 'check_box_outline_blank'
    },
    iconBuyerGroup() {
      if (this.selectAllBuyerGroups) return 'check_box'
      if (this.selectSomeBuyerGroups) return 'indeterminate_check_box'
      return 'check_box_outline_blank'
    }, 
    iconDealedSIC() {
      if (this.selectAllDealedSICs) return 'check_box'
      if (this.selectSomeDealedSICs) return 'indeterminate_check_box'
      return 'check_box_outline_blank'
    },
    iconBuyerCountry() {
      if (this.selectAllBuyerCountries) return 'check_box'
      if (this.selectSomeBuyerCountries) return 'indeterminate_check_box'
      return 'check_box_outline_blank'
    },
    iconDealedCountry() {
      if (this.selectAllDealedCountries) return 'check_box'
      if (this.selectSomeDealedCountries) return 'indeterminate_check_box'
      return 'check_box_outline_blank'
    },
    iconRegion() {
      if (this.selectAllRegions) return 'check_box'
      if (this.selectSomeRegions) return 'indeterminate_check_box'
      return 'check_box_outline_blank'
    },
    iconState() {
      if (this.selectAllStates) return 'check_box'
      if (this.selectSomeStates) return 'indeterminate_check_box'
      return 'check_box_outline_blank'
    },        
    
    // Custom pagination
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },
  created() {
    this.searched = this.deals;
  },
  components: {
    TopSection, Accordion
  }
};
</script>

<style lang="scss">
  button {
    outline: none !important;
  }
</style>
