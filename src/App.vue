<template>
  <v-app id="app">
    <!--<v-app-bar color="primary" src="CellularNarratives.png" dark>
      <v-icon>mdi-account-multiple-outline</v-icon>
      <span class="mr-2">Cellular Narratives</span>
    <v-spacer/>-->
    <CellularAutomata />

    <v-menu left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          absolute
          top
          right
          color="primary"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-btn href="https://futureofmaking.de" target="_blank" text>
            <span class="mr-2">DNA-Synthesizer</span>
            <v-icon>mdi-dna</v-icon>
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn
            href="https://epidemic-simulations.web.app"
            target="_blank"
            text
          >
            <span class="mr-2">Epidemic Simulations</span>
            <v-icon>mdi-trending-up</v-icon>
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn href="https://creaition-webapp.web.app" target="_blank" text>
            <span class="mr-2">Cre[ai]tion</span>
            <v-icon>mdi-robot</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- </v-app-bar> -->

    <!--<v-footer color="#A234BD" dark>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>Future Of Making</strong>
      </v-col>
    </v-footer>-->
  </v-app>
</template>

<script>
import CellularAutomata from "./components/CellularAutomata";
export default {
  name: "App",

  components: {
    CellularAutomata
  },
  data: () => ({})
};
</script>

<style>
html {
  overflow-y: auto !important;
  overflow: hidden !important; /* Hide scrollbars */
}
</style>
