<template>
  <v-app>
    <v-toolbar dense>
      <v-toolbar-title
        ><router-link to="/" class="link white--text "
          >Weather</router-link
        ></v-toolbar-title
      >
      <div class="flex-grow-1" v-if="!showSearch"></div>

      <v-text-field
        class="ps-8"
        hide-details
        single-line
        v-if="showSearch"
        v-model="search"
        label="Search"
        transition="slide-x-transition"
        @keyup.enter="newSearch(search)"
        autofocus
      ></v-text-field>
      <v-btn icon @click="showSearch = !showSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon color="primary">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content min-height="100vh">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="3"
            v-for="(favourite, index) in favourites"
            :key="index"
          >
            <FavouriteCard :info="favourite" @updated-favourites="update" />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import FavouriteCard from "@/components/FavouriteCard.vue";

export default {
  name: "Favourites",
  components: {
    FavouriteCard
  },
  data() {
    return {
      search: "",
      showSearch: false,
      favourites: []
    };
  },
  mounted() {
    this.load();
  },
  watch: {
    favourites: {
      handler: "saveFavourites",
      deep: true
    }
  },
  methods: {
    saveFavourites() {
      localStorage.setItem("favourites", JSON.stringify(this.favourites));
    },

    load() {
      let favourites;
      const data = localStorage.getItem("favourites");

      if (data != null) {
        favourites = JSON.parse(data);
      } else {
        favourites = [];
      }
      return (this.favourites = favourites);
    },
    newSearch(city) {
      this.$router.push({ name: "results", params: { city: city } });
      this.showSearch = false;
    },
    update(favourites) {
      this.favourites = favourites;
    }
  }
};
</script>
<style>
.link {
  text-decoration-line: none;
}
</style>
