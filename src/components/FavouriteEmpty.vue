<template>
  <v-card class="mx-auto" width="90%" height="75vh" elevation="5">
    <v-container fill-height>
      <v-row>
        <v-col align-self="center" justify-self="center" class="text-center">
          <h2 class="mb-8">
            Vous n'avez aucune ville sauvegardée !
          </h2>
          <v-icon x-large color="primary">mdi-heart-broken</v-icon>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  name: "FavouriteEmpty"
};
</script>
<style scoped></style>
