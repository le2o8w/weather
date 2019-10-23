<template>
  <span>
    <v-btn icon large v-if="isFavorited" @click="remove">
      <v-icon x-large>mdi-heart</v-icon>
    </v-btn>
    <v-btn icon large v-else @click="add">
      <v-icon x-large>mdi-heart-outline</v-icon>
    </v-btn>
  </span>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
    favourite: {}
  },
  data() {
    return {
      isFavorited: null
    };
  },

  created() {
    this.loadFavourites();
    this.isFav();
  },
  computed: {
    ...mapState(["favourites"])
  },
  methods: {
    ...mapActions([
      "loadFavourites",
      "saveFavourites",
      "removeFavourite",
      "addFavourite"
    ]),
    isFav() {
      const isFav = this.favourites.find(
        f => f.city === this.favourite.city.toLowerCase()
      );
      if (isFav) {
        return (this.isFavorited = true);
      } else {
        return (this.isFavorited = false);
      }
    },
    add() {
      this.isFavorited = true;
      this.addFavourite(this.favourite);
      this.saveFavourites(this.favourites);
    },
    remove() {
      this.isFavorited = false;
      this.removeFavourite(this.favourite);
      this.saveFavourites(this.favourites);
    }
  }
};
</script>
