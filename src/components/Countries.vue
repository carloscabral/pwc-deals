<template>

  <v-card class="pa-4 mx-sm-4">

    <TopSection title="Países" @print="printList" @export="exportList" />

    <Accordion>

      <v-layout row wrap class="p-3">        

        <v-flex xs12 sm6 md4 lg3 class="px-sm-4">
          <v-select v-model="selectedName" :items="getName" label="Nome" multiple dense>
            <template slot="selection" slot-scope="{ item, index }">
              <v-chip small v-if="index === 0">
                <span>{{ item }}</span>
              </v-chip>
              <span v-if="index === 1" class="grey--text caption">(+{{ selectedName.length - 1 }})</span>
            </template>              
            <v-list-tile slot="prepend-item" ripple @click="toggleAll('name')">
              <v-list-tile-action>
                <v-icon :color="selectedName.length > 0 ? 'primary' : ''">{{ iconName }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>Selecionar todos</v-list-tile-title>
            </v-list-tile>
            <v-divider slot="prepend-item" class="mt-2"></v-divider>
          </v-select>
        </v-flex>

        <v-flex xs12 sm6 md4 lg3 class="px-sm-4">
          <v-select v-model="selectedContinent" :items="getContinent" label="Continente" multiple dense>
            <template slot="selection" slot-scope="{ item, index }">
              <v-chip small v-if="index === 0">
                <span>{{ item }}</span>
              </v-chip>
              <span v-if="index === 1" class="grey--text caption">(+{{ selectedContinent.length - 1 }})</span>
            </template>              
            <v-list-tile slot="prepend-item" ripple @click="toggleAll('continent')">
              <v-list-tile-action>
                <v-icon :color="selectedContinent.length > 0 ? 'primary' : ''">{{ iconContinent }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>Selecionar todos</v-list-tile-title>
            </v-list-tile>
            <v-divider slot="prepend-item" class="mt-2"></v-divider>
          </v-select>
        </v-flex>

        <v-flex xs12 sm6 md4 lg3 class="px-sm-4 mt-2">
          <v-btn class="colored-shadow" :disabled="dialog" :loading="dialog" color="primary mx-0" @click="dialog = true">Listar Países</v-btn>
          <v-dialog v-model="dialog" hide-overlay persistent width="300">
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

    <div class="deals-table mb-2" style="position: relative">
      
      <v-card-title>
        <v-text-field style="max-width: 14rem;" v-model="search" append-icon="search" label="Buscar na listagem" single-line hide-details></v-text-field>
      </v-card-title>

      <v-data-table :headers="headers" :items="countries" :search="search" hide-actions :pagination.sync="pagination">
        <template slot="items" slot-scope="props">
          <td :class="{ dimmed: props.item.isDraft }" class="text-xs-left">{{ props.item.id }}</td>
          <td :class="{ dimmed: props.item.isDraft }" class="text-xs-left">{{ props.item.name }}</td>
          <td :class="{ dimmed: props.item.isDraft }" class="text-xs-left">{{ props.item.state }}</td>
          <td class="justify-space-around layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item.id)">edit</v-icon>
            <v-icon small @click="removeItem(props.item.id)">delete</v-icon>
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
        <v-btn slot="activator" class="colored-shadow" style="margin-right: -1.5rem; margin-top: 3rem;" absolute dark fab top right color="primary">
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
import TopSection from "./TopSection";
import Accordion from "./Accordion";

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
    selectedContinent: [],
    selectedName: [],
    search: "",
    dialog: false,
    pagination: {},    
    countries: my_data,
    headers: [
      { text: "Número", align: "left", value: "id" },
      { text: "Nome", value: "name" },
      { text: "Continente", value: "continent" },
      { text: "Ações", value: "" }      
    ]
  }),
  methods: {
    tableClicked() {
      alert("Ao clicar em uma linha da tabela serão exibidos todos os dados daquele registro.")
    },    
    // newCountry() {
    //   this.$router.push("/paises/novo");
    // },
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
    },
    toggleAll(params) {
      this.$nextTick(() => {
        switch (params) {
          case "name":
            this.selectAllNames
              ? (this.selectedName = [])
              : (this.selectedName = this.getName.slice());
            break;
          case "continent":
            this.selectAllContinents
              ? (this.selectedContinent = [])
              : (this.selectedContinent = this.getContinent.slice());
            break;
          default:
        }
      });
    }          
  },
  computed: {
    getName() {
      return [...new Set(this.countries.map(({ name }) => name).sort())];
    },
    getContinent() {
      return [...new Set(this.countries.map(({ continent }) => continent).sort())];
    },
    selectAllNames() {
      return this.selectedName.length === this.getName.length;
    },
    selectSomeNames() {
      return this.selectedName.length > 0 && !this.selectAllNames;
    },
    selectAllContinents() {
      return this.selectedContinent.length === this.getContinent.length;
    },
    selectSomeContinents() {
      return this.selectedContinent.length > 0 && !this.selectAllContinents;
    },    
    iconName() {
      if (this.selectAllNames) return "check_box";
      if (this.selectSomeNames) return "indeterminate_check_box";
      return "check_box_outline_blank";
    },
    iconContinent() {
      if (this.selectAllContinents) return "check_box";
      if (this.selectSomeContinents) return "indeterminate_check_box";
      return "check_box_outline_blank";
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
    dialog (val) {
      if (!val) return

      setTimeout(() => (this.dialog = false), 4000)
    }
  },
  components: {
    TopSection,
    Accordion
  }   
};
</script>

<style lang="scss" scoped>
</style>
