<template>
  <v-app style="font-family: 'Lato', sans-serif;">
    <v-toolbar dense>
      <v-toolbar-title>
        <router-link to="/">
          <v-img
            src="../../public/img/logo.png"
            height="38px"
            max-width="150px"
            contain
          >
          </v-img>
        </router-link>
      </v-toolbar-title>
      <div class="flex-grow-1" v-if="!showSearch"></div>
      <v-text-field
        class="ps-8"
        hide-details
        single-line
        v-if="showSearch"
        v-model="searchText"
        label="Search"
        transition="slide-x-transition"
        @keyup.enter="newSearch(searchText)"
        autofocus
      ></v-text-field>
      <v-btn icon @click="showSearch = !showSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon to="/favourites">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-toolbar>
    <router-view></router-view>
    <v-footer>
      <v-col class="text-center" cols="12">
        <a href="https://darksky.net/poweredby/" target="_blank" class="link">
          Powered by Dark Sky
        </a>
        –
        <a href="https://unsplash.com/" target="_blank" class="link">
          Unsplash
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
