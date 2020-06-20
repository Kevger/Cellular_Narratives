<template>
  <v-container>
    <v-row justify="center">
      <v-card max-width="500px">
        <v-app-bar dark color="primary">
          <v-icon x-large>mdi-help-circle</v-icon>
          <span class="headline">About this project</span>
        </v-app-bar>
        <v-container>
          <v-card-title>Narrative Economics</v-card-title>
          <v-card-text>
            <p>
              Narrative Economics is the study of how narratives convey values
              and emotions, how they spread and thus influence the economy. In
              order to understand recessions, for example, it is not enough to
              understand the cybernetic control loops behind them, but one must
              also include the human factor with its irrational, emotionally
              driven actions. Above all, this includes his belief in stories
              that create meaning, the narratives. In order to understand
              history and why people acted the way they did, one must also
              understand the underlying narratives.
            </p>
            <p>
              These infectious narratives, behave similarly to pathogens and can
              be simulated with the help of mathematical models. In this case,
              the system dynamic behaviour is simulated by cellular automata.
            </p>
            <p>
              Each color represented here represents a narrative, the more
              similar the colors the more similar the narrative. The narratives
              can have a symbiotic effect with each other, can displace one
              another and evolve.
            </p>
            <p>
              The parameters you can select here allow you to adapt the company
              structures. This way you can create a society that is totally
              based on pluralism, allows itself to be polarized, consists only
              of wild thinkers or is skeptical towards any kind of development.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn dark fab bottom right color="primary" @click="closeWindow">
              <v-icon>mdi-check-bold</v-icon>
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    closeWindow() {
      this.$emit("windowClosed");
    }
  }
};
</script>
