<template>
  <v-app>
    <v-toolbar dense>
      <v-toolbar-title>
        <router-link to="/">
          <v-img
            src="../../public/img/logo.png"
            height="38px"
            max-width="100px"
            contain
          >
          </v-img>
        </router-link>
      </v-toolbar-title>
      <div class="flex-grow-1" v-if="!showSearch"></div>
      <v-text-field
        class="pr-4 pl-8"
        hide-details
        single-line
        v-if="showSearch"
        v-model="searchText"
        label="Recherche..."
        transition="slide-x-transition"
        @keyup.enter="newSearch(searchText)"
        autofocus
        color="#85c6b4"
      ></v-text-field>
      <v-btn icon @click="showSearch = !showSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon to="/favourites">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container class="fill-height">
      <router-view></router-view>
    </v-container>
    <v-footer>
      <v-col class="text-center" cols="12">
        <a
          href="https://darksky.net/poweredby/"
          class="link"
          target="_blank"
          rel="noreferrer"
        >
          Powered by Dark Sky ☔️
        </a>
        –
        <a
          href="https://unsplash.com/"
          class="link"
          target="_blank"
          rel="noreferrer"
        >
          Unsplash 📸
        </a>
      </v-col>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      pending: true,
      searchText: "",
      showSearch: false,
      result: {}
    };
  },
  methods: {
    newSearch(city) {
      this.$router.push({ name: "results", params: { city: city } });
      this.searchText = "";
      this.showSearch = false;
    }
  }
};
</script>
<style scoped>
.link {
  color: #85c6b4;
}
</style>
