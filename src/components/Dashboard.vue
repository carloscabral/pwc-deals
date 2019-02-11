<template>

    <v-card class="pa-4 mx-sm-4">
        <v-layout row wrap px-4 class="top-section">

            <v-flex xs12 sm7>
                <h1>Dashboard</h1>
            </v-flex>

            <v-flex align-self-start xs12 sm5 class="px-xs-4 text-md-right">
                <v-btn color="primary" class="white--text ml-0 colored-shadow">
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
<style lang="scss" scoped>
.power-bi {
  width: 100%;
  height: 650px;
  background: url("../assets/images/power-bi.jpg");
  background-size: cover;
}

</style>


