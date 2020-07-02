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
              and emotions, how they spread like pathogens, thus influencing
              society and the economy. In order to understand recessions, for
              example, it is not enough to understand the cybernetic control
              loops behind them, but one must also include the human factor with
              it‘s irrational, emotionally driven actions. Above all, this
              includes our belief in stories that create meaning, the
              narratives.
            </p>
            <p>
              Simulating the dynamic system behaviour of narratives helps us to
              understand the underlying narratives of history, why people acted
              the way they did, and thus history itself. These infectious
              narratives, behave similarly to pathogens and can be simulated
              with the help of mathematical models.
            </p>
            <p>
              In this case, the system dynamic behaviour is simulated by
              cellular automata. By using cellular automata, in which the
              individual cells are able to represent character values such as
              political views, skepticism, liberalism, or existing knowledge
              through mathematical modeling and can interact with other cells in
              their immediate environment, it is possible to simulate this
              complex system behavior in a simplified way and thus get a feeling
              of how narratives spread in society. Narratives can emerge
              spontaneously, evolve, be in competition, or symbiosis with other
              narratives and can also be forgotten or dismissed.
            </p>
            <p>
              This webapp was specifically developed to simulate the dynamic
              system behavior of narratives in society using cellular automata
              and mathematical modeling. The user can design different forms of
              societies, such as pluralistic, populistic, or a society that is
              sceptical towards any form of societal change. Each color
              represented here represents a narrative, the more similar the
              colors the more similar the narrative. The narratives can have a
              symbiotic effect with each other, can displace one another, and
              evolve. Through the complex interaction of narratives and their
              unfolding, beautiful and fascinating landscapes emerge
              simultaneously. Explore the dynamic spread and development of
              narratives in different social systems.
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
