<template>
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
