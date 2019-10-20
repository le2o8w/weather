import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import Vuebar from "vuebar";

Vue.config.productionTip = false;
Vue.filter("capitalizeFirst", function(value) {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
});
Vue.filter("round", function(value) {
  if (!value) return 0;
  value = parseFloat(value);
  return Math.round(value);
});

Vue.use(Vuebar);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
