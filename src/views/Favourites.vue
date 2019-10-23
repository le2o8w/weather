<template>
  <v-content min-height="100vh">
    <v-container>
      <v-row v-if="favourites.length > 0">
        <v-col
          cols="12"
          sm="6"
          md="3"
          v-for="(favourite, index) in favourites"
          :key="index"
        >
          <FavouriteCard :favourite="favourite" />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12">
          <v-card class="mx-auto" width="90%" height="75vh" elevation="5">
            <v-container fill-height>
              <v-row>
                <v-col
                  align-self="center"
                  justify-self="center"
                  class="text-center"
                >
                  <h2 class="mb-8">
                    Vous n'avez aucune ville sauvegardée !
                  </h2>
                  <v-icon x-large color="primary">mdi-heart-broken</v-icon>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>
<script>
import FavouriteCard from "@/components/FavouriteCard.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "Favourites",
  components: {
    FavouriteCard
  },
  computed: mapState(["favourites"]),
  created() {
    this.loadFavourites();
  },
  methods: {
    ...mapActions(["loadFavourites"])
  }
};
</script>
<style>
.link {
  text-decoration-line: none;
}
</style>
