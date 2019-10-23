import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favourites: []
  },
  mutations: {
    setFavourites(state, payload) {
      state.favourites = payload;
    },
    add(state, payload) {
      state.favourites.push(payload);
    },
    remove(state, payload) {
      const index = state.favourites
        .map(favourite => {
          return favourite.city;
        })
        .indexOf(payload.city);
      state.favourites.splice(index, 1);
    }
  },
  actions: {
    loadFavourites(context) {
      const data = localStorage.getItem("favourites");
      if (data != null) {
        context.commit("setFavourites", JSON.parse(data));
      } else {
        context.commit("setFavourites", []);
      }
    },
    addFavourite(context, favourite) {
      context.commit("add", favourite);
    },
    removeFavourite(context, favourite) {
      context.commit("remove", favourite);
    },
    saveFavourites(context, favourites) {
      localStorage.setItem("favourites", JSON.stringify(favourites));
      context.commit("setFavourites", favourites);
    }
  }
});
