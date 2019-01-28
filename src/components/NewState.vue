<template>
  <div class="container-fluid mt-4" style="min-height: 70vh;">

    <h1 class="top-title">Novo Estado</h1>

      <md-divider class="mt-4"></md-divider>
      <div class="row align-items-start mt-4">            
        <div class="col-md-4">
            <h3>Informações do Estado</h3>
            <p class="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos vitae nulla laboriosam nesciunt reprehenderit distinctio accusamus itaque qui sapiente! Veritatis molestiae, sequi distinctio optio adipisci aliquid itaque officia rem earum.</p>
        </div>
        <div class="col-md-8 d-flex-column">
            <md-field class="ml-md-5">
                <label>Sigla do Estado</label>
                <md-input></md-input>
            </md-field>                          
            <md-field class="ml-md-5">
                <label for="region">Região</label>
                <md-select v-model="region" name="region" id="region" md-dense>
                  <md-option value="region1">Ásia</md-option>
                  <md-option value="region2">Europa</md-option>
                  <md-option value="region3">África</md-option>
                  <md-option value="region4">América do Norte</md-option>
                  <md-option value="region5">América do Sul</md-option>
                  <md-option value="region6">América Central</md-option>
                  <md-option value="region7">Oceania</md-option>
                </md-select>
              </md-field> 
            <md-button @click="save" class="md-primary md-raised ml-0 ml-md-5 mt-4 mb-4">Salvar</md-button>                                                                               
        </div>
      </div>            
     
  </div>

</template>

<script>

export default {
  name: "NewState",
  data: () => ({
    name: "",
    region: "",
  }),
  methods: {
    save() {
      this.$router.push("/estados")
      alert("Estado salvo com sucesso")
    }
  },
  watch: {

  }
};
</script>

<style lang="scss" scoped>

</style>
