<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-icon>mdi-account-multiple-outline</v-icon>
      <span class="mr-2">Cellular Narratives</span>
      <v-spacer />
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">About</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <CellularAutomata />
    </v-content>
    <v-footer color="primary" dark>
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
