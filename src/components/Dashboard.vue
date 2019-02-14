<template>

    <v-card class="pa-4 mx-sm-4">
        <v-layout row wrap px-4 class="top-section">

            <v-flex xs12 sm7>
                <h1>Dashboard</h1>
            </v-flex>

            <v-flex align-self-start xs12 sm5 class="px-xs-4 text-md-right">
                <v-btn color="primary" class="white--text ml-0 colored-shadow" :href="powerBiLink">
                    Ver no Power BI
                </v-btn>
            </v-flex>

            <v-flex xs12 class="mt-4">
                <iframe :src="powerBiLink" style="height:80vh; width: 100%;" frameborder="0" allowFullScreen="true"></iframe>
            </v-flex>

        </v-layout>
    </v-card>

</template>
<script>
export default {
  name: "Dashboard",
  data: () => ({
    powerBiLink: "https://app.powerbi.com/reportEmbed?reportId=134f14e8-96fb-4916-894e-0ce6e64e8329&groupId=cfcfe137-96d8-4dfc-8087-35ac2180addf&autoAuth=true"
  }),
  methods: {
    openPowerBI() {
      alert("Esse botão abre o PowerBI");
    }
  }
};
</script>
<style lang="scss" scoped>

</style>


