<template>
  <div class="container-fluid mt-4">

    <h1 class="top-title">Nova Transação</h1>

      <div class="row justify-content-start mt-3 align-items-center">
        <div class="col-md-3 col-sm-6">
            <md-field style="min-width: 150px;">
                <label>Número</label>
                <md-input v-model="my_number"></md-input>
            </md-field>            
        </div>
        <div class="col-md-3 col-sm-6">
          <label for="ca" class="mb-0 option-label">CA</label>
          <div>
              <md-radio v-model="ca" value="yes" class="md-primary mt-2">Sim</md-radio>
              <md-radio v-model="ca" value="no" class="md-primary mt-2">Não</md-radio>
          </div>           
        </div>           
      </div>
      <md-divider class="mt-4"></md-divider>
      <div class="row align-items-start mt-4">            
        <div class="col-md-4">
            <h3>Comprador</h3>
            <p class="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos vitae nulla laboriosam nesciunt reprehenderit distinctio accusamus itaque qui sapiente! Veritatis molestiae, sequi distinctio optio adipisci aliquid itaque officia rem earum.</p>
        </div>
        <div class="col-md-8 d-flex-column">
            <md-field class="ml-md-5">
                <label>Nome da empresa</label>
                <md-input></md-input>
            </md-field>
            <md-field class="ml-md-5">
                <label for="sic">SIC</label>
                <md-select v-model="SIC" name="sic" id="sic" md-dense>
                    <md-option value="1">Agropecuária</md-option>
                    <md-option value="2">Pecuária</md-option>
                    <md-option value="3">Avicultura</md-option>
                    <md-option value="4">Mineração</md-option>
                    <md-option value="5">Extração de Ferro</md-option>
                    <md-option value="6">Mineração</md-option>
                </md-select>
            </md-field>          
            <md-autocomplete  class="ml-md-5" v-model="buyerCountry" :md-options="countries" :md-fuzzy-search="false" md-dense>
                <label>País da empresa compradora</label>

                <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                    <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
                </template>

                <template slot="md-autocomplete-empty" slot-scope="{ term }">
                    País "{{ term }}" não encontrado.
                </template>
            </md-autocomplete>
            <div class="ml-md-5">
                <label for="ca" class="mb-0 option-label">P.E.?</label>
                <div>
                    <md-radio v-model="PE" value="yes" class="md-primary mt-2">Sim</md-radio>
                    <md-radio v-model="PE" value="no" class="md-primary mt-2">Não</md-radio>
                </div>           
            </div>              
            <md-field class="ml-md-5">
                <label for="group-belong">Grupo a que pertence</label>
                <md-input v-model="groupBelong" name="group-belong" id="group-belong"></md-input>
            </md-field>
            <md-autocomplete  class="ml-md-5" v-model="countryGroup" :md-options="countries" :md-fuzzy-search="false" md-dense>
                <label>País do grupo ou matriz</label>

                <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                    <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
                </template>

                <template slot="md-autocomplete-empty" slot-scope="{ term }">
                    País "{{ term }}" não encontrado.
                </template>
            </md-autocomplete>
            <div class="ml-md-5">
                <label for="ca" class="mb-0 option-label">Origem do capital do grupo ou matriz</label>
                <div>
                    <md-radio :disabled="true" v-model="sourceOrigin" value="multinational" class="md-primary mt-2">Multinacional</md-radio>
                    <md-radio :disabled="true" v-model="sourceOrigin" value="national" class="md-primary mt-2">Nacional</md-radio>
                </div>           
            </div>                                    
            <md-field class="ml-md-5">
                <label for="continent">Continente do grupo ou matriz</label>
                <md-select v-model="continent" name="continent" id="continent" md-dense>
                    <md-option value="1">Europa</md-option>
                    <md-option value="2">África</md-option>
                    <md-option value="3">América do Norte</md-option>
                    <md-option value="4">América do Sul</md-option>
                    <md-option value="5">América Central</md-option>
                    <md-option value="6">Oceania</md-option>
                </md-select>
            </md-field>
            <md-field class="ml-md-5">
                <label for="accessor">Acessor</label>
                <md-input v-model="accessor" name="accessor" id="accessor"></md-input>
            </md-field>
            <div class="ml-md-5">
                <label for="ca" class="mb-0 option-label">Principal comprador?</label>
                <div>
                    <md-radio v-model="mainBuyer" value="yes" class="md-primary mt-2">Sim</md-radio>
                    <md-radio v-model="mainBuyer" value="no" class="md-primary mt-2">Não</md-radio>
                </div>           
            </div>                                                                                                 
        </div>
      </div>
      <md-divider class="mt-4"></md-divider>
      <div class="row align-items-start mt-4">
        <md-divider class="mt-3"></md-divider>            
        <div class="col-md-5">
            <h3>Vendedor</h3>
            <p class="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos vitae nulla laboriosam nesciunt reprehenderit distinctio accusamus itaque qui sapiente! Veritatis molestiae, sequi distinctio optio adipisci aliquid itaque officia rem earum.</p>
        </div>
        <div class="col-md-7">
            conteúdo
        </div>
      </div>
      <div class="row align-items-center mt-3">
        <md-divider class="mt-3"></md-divider>            
        <div class="col-md-5">
            <h3>Transação</h3>
            <p class="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos vitae nulla laboriosam nesciunt reprehenderit distinctio accusamus itaque qui sapiente! Veritatis molestiae, sequi distinctio optio adipisci aliquid itaque officia rem earum.</p>
        </div>
        <div class="col-md-7">
            conteúdo
        </div>
      </div>            
     
  </div>

</template>

<script>
import my_data from "../datas/deals.json";

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByTerm = (items, term) => {
  if (term) {
    return items.filter(item =>
      toLower(item.buyerCompany).includes(toLower(term))
    );
  }
  return items;
};

export default {
  name: "NewDeal",
  data: () => ({
    my_number: null,
    ca: false,
    SIC: "",
    buyerCountry: "",
    countryGroup: "",
    sourceOrigin: "",
    PE: "",
    groupBelong: "",
    continent: "",
    accessor: "",
    mainBuyer: "",
    countries: [
      "Argélia",
      "Argentina",
      "Alemanha",
      "Brasil",
      "Canada",
      "Italia",
      "Japão",
      "China",
      "Reino unido",
      "Estados Unidos",
      "México",
      "Rússia",
      "Uruguai"
    ]
  }),
  methods: {
    newTransaction() {
      window.alert("Noop");
    },
    searchOnTable() {
      this.searched = searchByTerm(this.transactions, this.search);
    }
  },
  watch: {
    countryGroup(newValue, oldValue) {
    
        (newValue.toLowerCase().trim() === "brasil") 
            ? this.sourceOrigin = "national" 
            : this.sourceOrigin = "multinational"
        
    },
  },
  created() {
    this.searched = this.transactions;
  }
};
</script>

<style lang="scss" scoped>

</style>
