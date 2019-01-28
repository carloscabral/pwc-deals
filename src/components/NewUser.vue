<template>
  <div class="container-fluid mt-4" style="min-height: 75vh;">

    <h1 class="top-title">Novo Usuário</h1>

      <md-divider class="mt-4"></md-divider>
      <div class="row align-items-start mt-4">            
        <div class="col-md-4">
            <h3>Dados do usuário</h3>
            <p class="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos vitae nulla laboriosam nesciunt reprehenderit distinctio accusamus itaque qui sapiente! Veritatis molestiae, sequi distinctio optio adipisci aliquid itaque officia rem earum.</p>
        </div>
        <div class="col-md-8 d-flex-column">
            <md-field class="ml-md-5">
                <label>Nome do usuário</label>
                <md-input></md-input>
            </md-field>
            <md-field class="ml-md-5">
                <label>E-mail</label>
                <md-input></md-input>
            </md-field>                             
            <md-field class="ml-md-5">
                <label for="profile">Perfil</label>
                <md-select v-model="profile" name="profile" id="profile" md-dense>
                    <md-option value="1">Perfil 1</md-option>
                    <md-option value="2">Perfil 2</md-option>
                    <md-option value="3">Perfil 3</md-option>
                    <md-option value="4">Perfil 4</md-option>
                    <md-option value="5">Perfil 5</md-option>
                </md-select>
            </md-field>
            <md-button @click="save" class="md-primary md-raised ml-0 ml-md-5 mt-4 mb-4">Salvar</md-button>                                                                               
        </div>
      </div>            
     
  </div>

</template>

<script>

export default {
  name: "NewUser",
  data: () => ({
    name: "",
    email: "",
    profile: ""
  }),
  methods: {
    save() {
      this.$router.push("/usuarios")
      alert("Usuário salvo com sucesso")
    }
  },
  watch: {

  }
};
</script>

<style lang="scss" scoped>

</style>
