<template>
    <!-- <div class="container-fluid mt-4">
        <div class="align-items-center justify-content-between" style="display: flex;">
            <h1 class="mb-0 mr-md-4">Dashboard</h1>
            <md-button @click="openPowerBI" class="md-primary md-raised d-flex justify-content-end">Ver no Power BI</md-button>
        </div>
        <div class="row">
            <div class="power-bi mt-3"></div>
        </div>
    </div>     -->
    <v-card class="pa-4 mx-sm-4">
        <v-layout row wrap px-4 class="top-section">

            <v-flex sm12 md7>
                <h1>Dashboard</h1>
            </v-flex>

            <v-flex align-self-start sm12 md5 class="px-xs-4 text-lg-right">
                <v-btn color="primary" class="white--text ml-0">
                    Ver no Power BI
                </v-btn>
            </v-flex>

            <v-flex xs12>
                <div class="power-bi mt-3"></div>
            </v-flex>

        </v-layout>
    </v-card>

</template>
<script>
export default {
  methods: {
    openPowerBI() {
      alert("Esse botão abre o PowerBI");
    }
  }
};
</script>
<style scoped>
.power-bi {
  width: 100%;
  height: 650px;
  background: url("../assets/images/power-bi.jpg");
  background-size: cover;
}

</style>


