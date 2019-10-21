<template>
  <span>
    <v-btn icon v-if="isFavorited" @click.prevent="unFavorite()">
      <v-icon>mdi-heart</v-icon>
    </v-btn>
    <v-btn icon v-else @click.prevent="favorite()">
      <v-icon>mdi-heart-outline</v-icon>
    </v-btn>
  </span>
</template>

<script>
export default {
  props: {
    favourite: {}
  },
  data: function() {
    return {
      isFavorited: "",
      favourites: {}
    };
  },

  mounted() {
    this.load();
  },
  watch: {
    favourites: {
      handler: "saveFavourites",
      deep: true
    },
    isFavorited: {
      handler: "load",
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
        let isFav = favourites.find(
          f => f.city === this.favourite.city.toLowerCase()
        );
        if (isFav) {
          this.isFavorited = true;
        } else {
          this.isFavorited = false;
        }
      } else {
        favourites = [];
        this.isFavorited = false;
      }
      return (this.favourites = favourites);
    },
    favorite() {
      this.favourites.push({
        city: this.favourite.city.toLowerCase(),
        coordinates: this.favourite.coordinates,
        thumb: this.favourite.thumb
      });
      this.isFavorited = true;
    },
    unFavorite() {
      const index = this.favourites.findIndex(
        n => n.city === this.favourite.city.toLowerCase()
      );
      this.favourites.splice(index, 1);
      this.$emit("update", this.favourites);
      this.isFavorited = false;
    }
  }
};
</script>
