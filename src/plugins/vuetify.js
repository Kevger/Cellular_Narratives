import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#6E469F",
        secondary: "#9E44EC",
        accent: "#6E469F",
        error: "#6E469F",
        info: "#6E469F",
        success: "#6E469F",
        warning: "#6E469F"
      }
    }
  }
});
