<template>
  <div class="container-fluid mt-4" style="min-height: 70vh;">

    <h1 class="top-title">Nova Cidade</h1>

      <md-divider class="mt-4"></md-divider>
      <div class="row align-items-start mt-4">            
        <div class="col-md-4">
            <h3>Informações da cidade</h3>
            <p class="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos vitae nulla laboriosam nesciunt reprehenderit distinctio accusamus itaque qui sapiente! Veritatis molestiae, sequi distinctio optio adipisci aliquid itaque officia rem earum.</p>
        </div>
        <div class="col-md-8 d-flex-column">
            <md-field class="ml-md-5">
                <label>Nome da Cidade</label>
                <md-input></md-input>
            </md-field>                          
            <md-field class="ml-md-5">
                <label for="state">Estado</label>
                <md-select v-model="state" name="state" id="state" md-dense>             
                  <md-option value="state1">AC</md-option>
                  <md-option value="state2">AL</md-option>
                  <md-option value="state3">AP</md-option>
                  <md-option value="state4">AM</md-option>
                  <md-option value="state5">BA</md-option>
                  <md-option value="state6">CE</md-option>
                  <md-option value="state7">DF</md-option>
                  <md-option value="state1">ES</md-option>
                  <md-option value="state2">GO</md-option>
                  <md-option value="state3">MA</md-option>
                  <md-option value="state4">MT</md-option>
                  <md-option value="state5">MS</md-option>
                  <md-option value="state6">MG</md-option>
                  <md-option value="state7">PA</md-option>
                  <md-option value="state1">PB</md-option>
                  <md-option value="state2">PR</md-option>
                  <md-option value="state3">PE</md-option>
                  <md-option value="state4">PI</md-option>
                  <md-option value="state5">RJ</md-option>
                  <md-option value="state6">RN</md-option>
                  <md-option value="state7">RS</md-option>
                  <md-option value="state1">RO</md-option>
                  <md-option value="state2">RR</md-option>
                  <md-option value="state3">SC</md-option>
                  <md-option value="state4">SP</md-option>
                  <md-option value="state5">SE</md-option>
                  <md-option value="state6">TO</md-option>
                </md-select>
              </md-field> 
            <md-button @click="save" class="md-primary md-raised ml-0 ml-md-5 mt-4 mb-4">Salvar</md-button>                                                                               
        </div>
      </div>            
     
  </div>

</template>

<script>

export default {
  name: "NewCity",
  data: () => ({
    name: "",
    state: "",
  }),
  methods: {
    save() {
      this.$router.push("/cidades")
      alert("Cidade salva com sucesso")
    }
  },
  watch: {

  }
};
</script>

<style lang="scss" scoped>

</style>
