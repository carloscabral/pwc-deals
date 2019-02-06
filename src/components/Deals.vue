<template>

  <div class="container-fluid mt-4">

    <md-button @click="newDeal" class="md-fab md-primary" style="position: fixed; right: 10px; bottom: 24px;">
      <md-icon>add</md-icon>
    </md-button>

    <TopSection title="Transações" @print="printList" @export="exportList" />

    <div class="space"></div>  

    <Accordion>
        <div class="row">
          <div class="col-md-4 col-sm-6">
            <md-field>
              <label for="buyer">Comprador</label>
              <md-select v-model="selectedBuyers" name="buyer" id="buyer" multiple md-dense>
                <md-option value="comprador1">Comprador 1</md-option>
                <md-option value="comprador2">Comprador 2</md-option>
                <md-option value="comprador3">Comprador 3</md-option>
                <md-option value="comprador4">Comprador 4</md-option>
                <md-option value="comprador5">Comprador 5</md-option>
                <md-option value="comprador6">Comprador 6</md-option>
                <md-option value="comprador7">Comprador 7</md-option>
              </md-select>
            </md-field>        
          </div>
          <div class="col-md-4 col-sm-6">
            <md-field>
              <label for="seller">Vendedor</label>
              <md-select v-model="selectedSellers" name="seller" id="seller" multiple md-dense>
                <md-option value="vendedor1">vendedor 1</md-option>
                <md-option value="vendedor2">vendedor 2</md-option>
                <md-option value="vendedor3">vendedor 3</md-option>
                <md-option value="vendedor4">vendedor 4</md-option>
                <md-option value="vendedor5">vendedor 5</md-option>
                <md-option value="vendedor6">vendedor 6</md-option>
                <md-option value="vendedor7">vendedor 7</md-option>
              </md-select>
            </md-field>          
          </div>
          <div class="col-md-4 col-sm-6 mt-sm-3 mt-md-0">
            <md-field>
              <label for="dealed">Negociada</label>
              <md-select v-model="selectedDealed" name="dealed" id="dealed" multiple md-dense>
                <md-option value="negociada1">Negociada 1</md-option>
                <md-option value="negociada2">Negociada 2</md-option>
                <md-option value="negociada3">Negociada 3</md-option>
                <md-option value="negociada4">Negociada 4</md-option>
                <md-option value="negociada5">Negociada 5</md-option>
                <md-option value="negociada6">Negociada 6</md-option>
                <md-option value="negociada7">Negociada 7</md-option>
              </md-select>
            </md-field>         
          </div>
          <div class="col-md-4 col-sm-6">
              <label for="sic" class="date-label">Data Inicial</label>
              <md-datepicker v-model="selectedFirstDate" md-immediately class="mt-0"  />
          </div>
          <div class="col-md-4 col-sm-6">
              <label for="sic" class="date-label">Data Final</label>
              <md-datepicker v-model="selectedLastDate" md-immediately class="mt-0"  />
          </div>

          <div class="col-md-4 col-sm-6">
              <md-button class="md-primary md-raised ml-0" style="margin-top: 30px;">Listar transações</md-button>
          </div>

        </div>
    </Accordion>

    <div class="row align-items-center">
      <div class="col-md-7 d-lg-flex align-items-center">
        <div class="search-box d-flex" style="width: 15rem;">
            <md-icon class="icon-search">search</md-icon>
            <md-field>
              <md-input v-model="search" placeholder="Pesquisar por comprador..." @input="searchOnTable" />
            </md-field>
        </div>

      </div>
      <div class="col-md-5 d-flex flex-md-row-reverse mt-3">
        <div class="pagination d-flex align-items-center">
          <p class="mb-0">Mostrando <strong>{{ deals.length }}</strong> de <strong>{{ deals.length + deals.length }}</strong></p>
          <div class="arrows d-flex align-items-center ml-2">
            <div class="arrow-container">
              <md-icon>arrow_left</md-icon>
            </div>
            <div class="arrow-container">
              <md-icon>arrow_right</md-icon>
            </div>          
          </div>
        </div>
      </div>
    </div>

    <div class="space"></div>

    <md-table v-model="searched" md-sort="buyer" md-sort-order="asc" md-fixed-header>

      <md-table-empty-state
        md-label="Nenhuma transação encontrada"
        :md-description="`A busca por '${search}' não retornou nenhum registro. Tente novamente ou adicione uma nova transação.`">
        <md-button class="md-primary md-raised" @click="newDeal">Nova transação</md-button>
      </md-table-empty-state>

      <md-table-row slot="md-table-row" @click="tableClicked" slot-scope="{ item }">
        <md-table-cell md-label="N° Transação" md-sort-by="dealNumber">{{ item.dealNumber }}</md-table-cell>
        <md-table-cell md-label="Data" md-sort-by="dealDate">{{ item.dealDate }}</md-table-cell>   
        <md-table-cell md-label="Tipo Transação" md-sort-by="dealType">
          <div class="md-list-item-text">
            <span>{{ item.dealType }}</span>
          </div>          
        </md-table-cell>        
        <md-table-cell md-label="Comprador" md-sort-by="buyerCompany">
          <div class="md-list-item-text">
            <span>{{ item.buyerCompany }}</span>
          </div>          
        </md-table-cell>
        <md-table-cell md-label="Vendedor" md-sort-by="sellerCompany">
          <div class="md-list-item-text">
            <span>{{ item.sellerCompany }}</span>
          </div>          
        </md-table-cell>
        <md-table-cell md-label="Target" md-sort-by="dealedCompany">
          <div class="md-list-item-text">
            <span>{{ item.dealedCompany }}</span>
          </div>          
        </md-table-cell> 
        <md-table-cell md-label="Valor (USD MM)" md-sort-by="dealValue">
          <div class="md-list-item-text">
            <span>{{ item.dealValue }}</span>
          </div>          
        </md-table-cell>        
        <md-table-cell md-label="Setor / Indústria" md-sort-by="dealedSIC">
          <div class="md-list-item-text">
            <span>{{ item.dealedSIC }}</span>
          </div>          
        </md-table-cell>                
        
        <md-table-cell md-label="Ações">
        <md-menu md-direction="bottom-start">
          <md-button class="md-icon-button" md-menu-trigger>
            <md-icon>more_vert</md-icon>
          </md-button>

          <md-menu-content class="table-pop-up">
            <md-menu-item @click="editItem(item.dealNumber)"><md-icon>edit</md-icon><span>Editar</span></md-menu-item>
            <md-menu-item @click="removeItem(item.dealNumber)"><md-icon>delete</md-icon><span>Excluir</span></md-menu-item>
          </md-menu-content>
          
        </md-menu>
        </md-table-cell>
      </md-table-row>
    </md-table>      
  </div>

</template>

<script>
import my_data from "../datas/deals.json";
import TopSection from "./TopSection";
import Accordion from "./Accordion";
// import multiSelect from 'vue-multi-select';
// import 'vue-multi-select/dist/lib/vue-multi-select.min.css'

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByTerm = (items, term) => {
  if (term) {
    return items.filter(item =>
      toLower(item.buyerCompany).includes(toLower(term)) || 
      toLower(item.sellerCompany).includes(toLower(term)) ||
      toLower(item.dealedCompany).includes(toLower(term))
    );
  }

  return items;
};

export default {
  name: "Deals",
  data: () => ({
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],    
    selectedBuyers: [ { name: 'Comprador 1' }, { name: 'Comprador 2' }, { name: 'Comprador 3' }, { name: 'Comprador 4' }, { name: 'Comprador 5' } ],
    selectedSellers: [],
    selectedDealed: [],
    selectedFirstDate: new Date(),
    selectedLastDate: new Date(),
    search: null,
    searched: [],
    deals: my_data
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

<style lang="scss" scoped>
</style>
