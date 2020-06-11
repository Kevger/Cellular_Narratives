<template>
  <v-container ref="CAContainer" fluid>
    <v-card dark color="rgb(0,0,0,0.2)">
      <v-card-title>Narrative Controls</v-card-title>
      <v-container fluid>
        <v-row no-gutters>
          <v-col>
            <v-subheader class="ma-0 pa-0"
              >Totally new narrative chance</v-subheader
            >
            <v-slider
              v-on="on"
              min="0"
              max="0.05"
              step="0.00001"
              v-model="newNarrativeChance"
              thumb-label
            ></v-slider>
          </v-col>
          <v-col>
            <v-subheader class="ma-0 pa-0">Momentum loss</v-subheader>
            <v-slider
              min="0"
              max="1"
              step="0.00001"
              v-model="healingRate"
              thumb-label
            ></v-slider>
          </v-col>
          <v-col>
            <v-subheader class="ma-0 pa-0"
              >Chance to integrate other narratives</v-subheader
            >
            <v-slider
              min="0"
              max="1"
              step="0.0001"
              v-model="chanceToMix"
              thumb-label
            ></v-slider>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-subheader class="ma-0 pa-0">Mutation chance</v-subheader>
            <v-slider
              min="0"
              max="1"
              step="0.0001"
              v-model="mutationChance"
              thumb-label
            ></v-slider>
          </v-col>
          <v-col>
            <v-subheader class="ma-0 pa-0">Mutation strength</v-subheader>
            <v-slider
              min="0"
              max="255"
              step="1"
              v-model="mutationStrength"
              thumb-label
            ></v-slider>
          </v-col>
          <v-col>
            <v-subheader class="ma-0 pa-0">Super spreader chance</v-subheader>
            <v-slider
              min="0"
              max="0.1"
              step="0.0001"
              v-model="superSpreaderChance"
              thumb-label
            ></v-slider>
          </v-col>
          <v-col>
            <v-subheader class="ma-0 pa-0">Super spreader strength</v-subheader>
            <v-slider
              min="0"
              max="10"
              step="0.1"
              v-model="superSpreaderStrength"
              thumb-label
            ></v-slider>
          </v-col>
        </v-row>
        <v-row>
          <v-card-actions>
            <v-btn
              v-model="wrap"
              :color="wrap ? 'secondary' : 'primary'"
              value="false"
              @click="wrap = !wrap"
              hide-details
              >Torus</v-btn
            >
            <v-btn color="primary" :disabled="isRunning" @click="step"
              >Single step</v-btn
            >
            <v-btn
              v-model="isRunning"
              :color="isRunning ? 'secondary' : 'primary'"
              @click="run"
              >run</v-btn
            >
            <v-btn color="primary" @click="reset">reset</v-btn>
          </v-card-actions>
        </v-row>
      </v-container>
    </v-card>

    <canvas ref="myCanvas" id="myCanvas"></canvas>
  </v-container>
</template>

<script>
import CAWorld from "../plugins/cellauto.js";

export default {
  data: () => ({
    healingRate: 0.0001,
    mutationStrength: 10,
    mutationChance: 0.05,
    newNarrativeChance: 0.001,
    chanceToMix: 0.001,
    superSpreaderChance: 0.0001,
    superSpreaderStrength: 1,
    wrap: false,
    isRunning: false,
    cellSize: 10
  }),

  mounted: function() {
    this.reset();
  },
  watch: {
    wrap() {
      this.CA.wrap = this.wrap;
    },
    newNarrativeChance() {
      this.CA.cellSettings.newNarrativeChance = this.newNarrativeChance;
    },
    healingRate() {
      this.CA.cellSettings.healingRate = this.healingRate;
    },
    mutationChance() {
      this.CA.cellSettings.mutationChance = this.mutationChance;
    },
    chanceToMix() {
      this.CA.cellSettings.chanceToMix = this.chanceToMix;
    },
    superSpreaderStrength() {
      this.CA.cellSettings.superSpreaderStrength = this.superSpreaderStrength;
    },
    superSpreaderChance() {
      this.CA.cellSettings.superSpreaderChance = this.superSpreaderChance;
    },
    mutationStrength() {
      this.CA.cellSettings.mutationStrength = this.mutationStrength;
    }
  },
  methods: {
    setSettings() {
      this.CA.cellSettings = {};
      this.CA.cellSettings.newNarrativeChance = this.newNarrativeChance;
      this.CA.cellSettings.healingRate = this.healingRate;
      this.CA.cellSettings.mutationStrength = this.mutationStrength;
      this.CA.cellSettings.mutationChance = this.mutationChance;
      this.CA.cellSettings.superSpreaderChance = this.superSpreaderChance;
      this.CA.cellSettings.superSpreaderStrength = this.superSpreaderStrength;
      this.CA.cellSettings.chanceToMix = this.chanceToMix;
    },
    init() {
      const world = new CAWorld({
        width:
          Math.floor(this.$refs.CAContainer.clientWidth / this.cellSize) - 2,
        height: Math.floor(1000 / this.cellSize),
        cellSize: this.cellSize,
        wrap: false
      });
      world.registerCellType(
        "normal",
        {
          getColor: function() {
            return `rgba(${this.type[0]},${this.type[1]},${
              this.type[2]
            },${Math.min(this.contagions, 1)})`;
          },
          process: function(neighbors, options) {
            //Chance to create a brand new narrative
            this.stability *= this.newnessLoss;
            if (Math.random() > this.stability || Math.random() < 0.0001) {
              if (
                Math.random() < 0.1 &&
                Math.random() < options.newNarrativeChance
              ) {
                this.contagions = Math.random();
                this.polarize = Math.random();
                this.stability = Math.random();
                this.type = [
                  Math.random() * 255,
                  Math.random() * 255,
                  Math.random() * 255
                ];
                this.newnessLoss = 0.9 + Math.random() / 10;
                if (Math.random() < options.superSpreaderChance) {
                  this.contagions += options.superSpreaderStrength;
                  this.polarize += options.superSpreaderStrength / 10;
                  this.newnessLoss *= 0.99;
                }
              }
              //Chance to accept totally a narrative
              else if (Math.random() > options.chanceToMix) {
                const index = Math.floor(Math.random() * neighbors.length);
                const neighbor = neighbors[index];
                if (
                  neighbor &&
                  Math.random() < neighbor.contagions &&
                  (Math.random() > this.contagions ||
                    this.polarize < neighbor.lastPolarize)
                ) {
                  this.type[0] = neighbor.lastType[0];
                  this.type[1] = neighbor.lastType[1];
                  this.type[2] = neighbor.lastType[2];
                  this.stability = neighbor.lastStability;
                  let contFactor = 1;
                  if (Math.random() < options.healingRate) {
                    contFactor = 1 - options.healingRate;
                  }
                  this.contagions = neighbor.lastContagions * contFactor;
                  this.polarize =
                    neighbor.lastPolarize * this.newnessLoss * contFactor;
                  this.newnessLoss = neighbor.lastNewnessLoss;
                } else {
                  this.contagions *= this.newnessLoss;
                  if (Math.random() < options.mutationChance) {
                    this.type[0] = Math.max(
                      Math.min(
                        255,
                        this.type[0] +
                          options.mutationStrength * (-1 / 2 + Math.random())
                      ),
                      0
                    );
                    this.type[1] = Math.max(
                      Math.min(
                        255,
                        this.type[1] +
                          options.mutationStrength * (-1 / 2 + Math.random())
                      ),
                      0
                    );
                    this.type[2] = Math.max(
                      Math.min(
                        255,
                        this.type[2] +
                          options.mutationStrength * (-1 / 2 + Math.random())
                      ),
                      0
                    );

                    this.newnessLoss *= 0.99 + Math.random() / 100;

                    if (Math.random() < options.superSpreaderChance) {
                      this.contagions += options.superSpreaderStrength;
                      this.polarize += options.superSpreaderStrength / 10;
                      this.stability = Math.random();
                      this.newnessLoss *= 0.99;
                    } else {
                      if (Math.random() > 0.5) {
                        this.contagions += (-1 / 2 + Math.random()) / 5;
                        this.polarize *=
                          this.polarize * (1 / 2 + Math.random());
                      } else {
                        this.contagions *= 1 / 2 + Math.random();
                        this.polarize += (-1 / 2 + Math.random()) / 5;
                      }
                    }
                  }
                  this.polarize = Math.min(this.polarize, 10);
                  this.contagions = Math.min(this.contagions, 10);
                }
              } else {
                //Chance to mix surrounding narratives
                let acceptedNarratives = 1;
                for (let i = 0; i < neighbors.length; ++i) {
                  const index = Math.floor(Math.random() * neighbors.length);
                  if (
                    neighbors[index] &&
                    Math.random() < neighbors[index].contagions
                  ) {
                    this.type[0] += neighbors[index].lastType[0];
                    this.type[1] += neighbors[index].lastType[1];
                    this.type[2] += neighbors[index].lastType[2];
                    this.stability += neighbors[index].lastStability;
                    this.contagions += neighbors[index].lastContagions;
                    this.polarize += neighbors[index].lastPolarize;
                    this.newnessLoss += neighbors[index].lastNewnessLoss;
                    acceptedNarratives += 1;
                  }
                }
                this.type[0] /= acceptedNarratives;
                this.type[1] /= acceptedNarratives;
                this.type[2] /= acceptedNarratives;
                this.contagions /= acceptedNarratives;
                this.polarize /= acceptedNarratives;
                this.newnessLoss /= acceptedNarratives;
                this.stability /= acceptedNarratives;
              }
            }
          },
          reset: function() {
            this.lastContagions = this.contagions;
            this.lastType[0] = this.type[0];
            this.lastType[1] = this.type[1];
            this.lastType[2] = this.type[2];
            this.lastPolarize = this.polarize;
            this.lastNewnessLoss = this.newnessLoss;
            this.lastStability = this.stability;
          }
        },
        function() {
          this.lastType = [];
          this.contagions = Math.random();
          this.polarize = Math.random();
          this.newnessLoss = 0.9;
          this.type = [255, 255, 255];
          this.stability = 0;
        }
      );

      world.initialize([{ name: "normal", distribution: 100 }]);

      return world;
    },
    step() {
      this.CA.step();
      this.render();
    },
    run() {
      if (this.renderLoop) {
        clearInterval(this.renderLoop);
        this.renderLoop = null;
        this.isRunning = false;
      } else {
        this.renderLoop = setInterval(() => this.step(), 100);
        this.isRunning = true;
      }
    },
    reset() {
      this.CA = this.init();
      this.setSettings();
      const myCanvas = document.getElementById("myCanvas");
      myCanvas.width = this.CA.cellSize * this.CA.width;
      myCanvas.height = this.CA.cellSize * this.CA.height;
      this.ctx = myCanvas.getContext("2d");

      //this.dbCanvas = document.createElement("canvas");
      //this.dbCanvas.width = myCanvas.width;
      //this.dbCanvas.height = myCanvas.height;
      //this.dbCtx = this.dbCanvas.getContext("2d");

      this.render();
    },
    render() {
      //this.dbCtx.clearRect(0, 0, this.dbCtx.height, this.dbCtx.width);
      this.ctx.clearRect(0, 0, this.ctx.height, this.ctx.width);
      for (let y = 0; y < this.CA.height; ++y) {
        for (let x = 0; x < this.CA.width; ++x) {
          this.ctx.fillStyle = this.CA.grid[y][x].getColor();
          this.ctx.fillRect(
            x * this.CA.cellSize,
            y * this.CA.cellSize,
            this.CA.cellSize,
            this.CA.cellSize
          );
        }
      }
      //this.ctx.drawImage(this.dbCanvas, 0, 0);
    }
  }
};
</script>
<style></style>
