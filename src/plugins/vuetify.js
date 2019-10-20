import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#512DA8",
        secondary: "#01024e",
        accent: "#01024e",
        error: "#01024e"
      }
    }
  },
  icons: {
    iconfont: "mdi"
  }
});
