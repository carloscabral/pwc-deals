<template>
  <div class="container-fluid mt-4">

    <md-button @click="newCountry" class="md-fab md-primary" style="position: fixed; right: 10px; bottom: 24px;">
      <md-icon>add</md-icon>
    </md-button>    

    <TopSection title="Países" @print="printList" @export="exportList" />

    <div class="space"></div>

    <form class="mb-3">
      <fieldset>
        <legend>Personalizar listagem:</legend>
          <div class="row">
            <div class="col-md-4 col-sm-6">
              <md-field>
                <label for="country">País</label>
                <md-select v-model="selectedCountry" name="country" id="country" multiple md-dense>
                  <md-option value="country1">País 1</md-option>
                  <md-option value="country2">País 2</md-option>
                  <md-option value="country3">País 3</md-option>
                  <md-option value="country4">País 4</md-option>
                  <md-option value="country5">País 5</md-option>
                  <md-option value="country6">País 6</md-option>
                  <md-option value="country7">País 7</md-option>
                </md-select>
              </md-field>        
            </div>
            <div class="col-md-4 col-sm-6">
              <md-field>
                <label for="continent">Continente</label>
                <md-select v-model="selectedContinent" name="continent" id="continent" multiple md-dense>
                  <md-option value="continent1">Ásia</md-option>
                  <md-option value="continent2">Europa</md-option>
                  <md-option value="continent3">África</md-option>
                  <md-option value="continent4">América do Norte</md-option>
                  <md-option value="continent5">América do Sul</md-option>
                  <md-option value="continent6">América Central</md-option>
                  <md-option value="continent7">Oceania</md-option>
                </md-select>
              </md-field>         
            </div>

            <div class="col-md-4 col-sm-6">
                <md-button class="md-primary ml-0 md-raised" style="margin-top: 16px">Listar países</md-button>
            </div>    
          </div>
      </fieldset>
    </form>

    <md-divider class="mt-4 mb-3"></md-divider>

    <div class="row align-items-center">
      <div class="col-md-7 d-lg-flex align-items-center">
        <div class="search-box d-flex" style="width: 15rem;">
            <md-icon class="icon-search">search</md-icon>
            <md-field>
              <md-input v-model="search" placeholder="Pesquisar por país..." @input="searchOnTable" />
            </md-field>
        </div>

      </div>
      <div class="col-md-5 d-flex flex-md-row-reverse mt-3">
        <div class="pagination d-flex align-items-center">
          <p class="mb-0">Mostrando <strong>{{ users.length }}</strong> de <strong>{{ users.length + users.length }}</strong></p>
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

    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-fixed-header>

      <md-table-empty-state
        md-label="Nenhum país encontrado"
        :md-description="`A busca por '${search}' não retornou nenhum registro. Tente novamente ou adicione um novo país.`">
        <md-button class="md-primary md-raised" @click="newCountry">Adicionar países</md-button>
      </md-table-empty-state>

      <md-table-row @click="tableClicked" slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Nome" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Continente" md-sort-by="continent">{{ item.continent }}</md-table-cell>
        <md-table-cell md-label="Ações">
        <md-menu md-direction="bottom-start">
          <md-button class="md-icon-button" md-menu-trigger>
            <md-icon>more_vert</md-icon>
          </md-button>

          <md-menu-content class="table-pop-up">
            <md-menu-item @click="editItem(item.id)"><md-icon>edit</md-icon><span>Editar</span></md-menu-item>
            <md-menu-item @click="removeItem(item.id)"><md-icon>delete</md-icon><span>Excluir</span></md-menu-item>
          </md-menu-content>
          
        </md-menu>
        </md-table-cell>
      </md-table-row>
    </md-table>      
  </div>

</template>

<script>
import my_data from "../datas/countries.json";
import TopSection from "./TopSection";

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByTerm = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.name).includes(toLower(term)));
  }
  return items;
};

export default {
  name: "Countries",
  data: () => ({
    selectedCountry: [],
    selectedContinent: [],
    search: null,
    searched: [],
    users: my_data
  }),
  methods: {
    tableClicked() {
      alert("Ao clicar em uma linha da tabela serão exibidos todos os dados daquele registro.")
    },    
    newCountry() {
      this.$router.push("/paises/novo");
    },
    searchOnTable() {
      this.searched = searchByTerm(this.users, this.search);
    },
    printList() {
      alert("Relatório será impresso.")
    },
    exportList() {
      alert("Relatório será exportado para excel.")
    },
    editItem(args) {
      alert("Entra em modo de edição do país: " + args)
    },
    removeItem(args) {
      let result = confirm("Tem certeza que deseja excluir esse registro?")
      if (result == true) {
        alert("País de número " + args + " seria removido com essa ação.")
      }
    }    
  },
  created() {
    this.searched = this.users;
  },
  components: {
    TopSection
  }   
};
</script>

<style lang="scss" scoped>
</style>
