<template>
    <v-layout row wrap px-4 class="top-section">

      <v-flex sm12 md7>
        <div>
          <h1>Listagem de {{ title }}</h1>
          <v-subheader style="height: 1rem" class="p-0 mb-4">Utilize os filtros abaixo para gerar o relatório:</v-subheader>
        </div>
      </v-flex>

      <v-flex align-self-start sm12 md5 class="px-xs-4 text-lg-right">
          <v-btn outline color="primary" class="white--text ml-0" @click="$emit('print')">
            Imprimir
            <v-icon right dark small class="hidden-sm-and-down">print</v-icon>
          </v-btn>
          <v-btn outline color="primary" class="white--text ml-0" @click="$emit('export')">
            Exportar
            <v-icon right dark small class="hidden-sm-and-down">cloud_download</v-icon>
          </v-btn>
      </v-flex>

    </v-layout>    
</template>

<script>
export default {
  props: { title: String }
};
</script>

<style lang="scss">
.top-section {
  margin-bottom: 1.5rem;
}
.top-section h1 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

@media only screen and (min-width: 576px) {
  .top-section h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
}
</style>


