<template>
  <!-- <div class="container-fluid mt-4">

    <md-button @click="newUser" class="md-fab md-primary" style="position: fixed; right: 10px; bottom: 24px;">
      <md-icon>add</md-icon>
    </md-button>    

    <TopSection title="Usuários" @print="printList" @export="exportList" />

    <div class="space"></div>

    <form class="mb-3">
      <fieldset>
        <legend>Personalizar listagem:</legend>
        <div class="row">
          <div class="col-md-4 col-sm-6">
            <md-field>
              <label for="name">Nome</label>
              <md-select v-model="selectedNames" name="name" id="name" multiple md-dense>
                <md-option value="nome1">Nome 1</md-option>
                <md-option value="nome2">Nome 2</md-option>
                <md-option value="nome3">Nome 3</md-option>
                <md-option value="nome4">Nome 4</md-option>
                <md-option value="nome5">Nome 5</md-option>
                <md-option value="nome6">Nome 6</md-option>
                <md-option value="nome7">Nome 7</md-option>
              </md-select>
            </md-field>        
          </div>
          <div class="col-md-4 col-sm-6">
            <md-field>
              <label for="profile">Perfil</label>
              <md-select v-model="selectedProfile" name="profile" id="profile" multiple md-dense>
                <md-option value="profile1">Perfil 1</md-option>
                <md-option value="profile2">Perfil 2</md-option>
                <md-option value="profile3">Perfil 3</md-option>
                <md-option value="profile4">Perfil 4</md-option>
                <md-option value="profile5">Perfil 5</md-option>
                <md-option value="profile6">Perfil 6</md-option>
                <md-option value="profile7">Perfil 7</md-option>
              </md-select>
            </md-field>         
          </div>

          <div class="col-md-4 col-sm-6">
              <md-button class="md-primary ml-0 md-raised" style="margin-top: 16px">Listar usuários</md-button>
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
              <md-input v-model="search" placeholder="Pesquisar por nome..." @input="searchOnTable" />
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
        md-label="Nenhum usuário encontrado"
        :md-description="`A busca por '${search}' não retornou nenhum registro. Tente novamente ou adicione um novo usuário.`">
        <md-button class="md-primary md-raised" @click="newUser">Novo usuário</md-button>
      </md-table-empty-state>

      <md-table-row slot="md-table-row" @click="tableClicked" slot-scope="{ item }">
        <md-table-cell md-label="Número" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Nome" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="E-mail" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Perfil" md-sort-by="profile">{{ item.profile }}</md-table-cell>        
        <md-table-cell md-label="Data de inclusão" md-sort-by="added">{{ item.added }}</md-table-cell>
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
  </div> -->
  <div>Página com lista de usuários (to-do)</div>
</template>

<script>
import my_data from "../datas/users.json";
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
  name: "Users",
  data: () => ({
    selectedNames: [],
    selectedProfile: [],
    search: null,
    searched: [],
    users: my_data
  }),
  methods: {
    tableClicked() {
      alert("Ao clicar em uma linha da tabela serão exibidos todos os dados daquele registro.")
    },    
    newUser() {
      this.$router.push("/usuarios/novo");
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
      alert("Entra em modo de edição da usuário: " + args)
    },
    removeItem(args) {
      let result = confirm("Tem certeza que deseja excluir esse registro?")
      if (result == true) {
        alert("Usuário de número " + args + " seria removida com essa ação.")
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
