<template>
  <v-app id="app">
    <v-app-bar color="primary" src="CellularNarratives.png" dark>
      <v-icon>mdi-account-multiple-outline</v-icon>
      <span class="mr-2">Cellular Narratives</span>
      <v-spacer />
      <v-btn href="https://futureofmaking.de" target="_blank" text>
        <span class="mr-2">DNA-Synthesizer</span>
        <v-icon>mdi-dna</v-icon>
      </v-btn>
      <v-btn href="https://epidemic-simulations.web.app" target="_blank" text>
        <span class="mr-2">Epidemic Simulations</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn href="https://creaition-webapp.web.app" target="_blank" text>
        <span class="mr-2">AI Cre[ai]tion</span>
        <v-icon>mdi-robot</v-icon>
      </v-btn>
    </v-app-bar>

    <CellularAutomata />
    <v-footer color="purple" dark>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>Future Of Making</strong>
      </v-col>
    </v-footer>
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
#app {
  background: url("/CellularNarratives.png") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.disable-scrollbars::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* Chrome/Safari/Webkit */
}

.disable-scrollbars {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
</style>
