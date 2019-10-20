<template>
  <v-card class="my-3 mx-auto" elevation="5" v-if="info" width="250px">
    <v-img
      :src="info.thumb"
      :alt="info.city"
      class="white--text"
      height="175px"
      gradient="to bottom, rgba(0,0,0,.3), rgba(0,0,0,.6)"
      cover
    >
      <v-card-title class="d-flex justify-space-between align-center">
        <a href="#" class="link white--text lato" @click.prevent="navigate">
          {{ info.city | capitalizeFirst }}
        </a>
        <Favourite :favourite="info" @update="updateFavourites" />
      </v-card-title>
      <v-card-text>
        <div class="d-flex justify-space-between  align-center">
          <v-lazy min-height="50px" transition="fade-transition">
            <v-img
              class="weather__icon"
              :src="icon"
              :alt="'Weather icon for' + info.city"
            ></v-img>
          </v-lazy>
          <h5 class="lato display-1">{{ temperature | round }} °</h5>
        </div>
      </v-card-text>
    </v-img>
  </v-card>
</template>

<script>
import Favourite from "@/components/Favourite.vue";
import { getWeather } from "@/api/weather.js";

export default {
  name: "FavouriteCard",
  components: {
    Favourite
  },
  props: {
    info: {}
  },
  mounted() {
    this.weather();
  },
  data() {
    return {
      icon: "",
      temperature: ""
    };
  },
  methods: {
    async weather() {
      try {
        const weather = await getWeather(this.info.coordinates);
        this.icon = require(`@/assets/icons/${weather.currently.icon}.png`);
        this.temperature = weather.currently.temperature;
      } catch (error) {
        console.log(error);
      }
    },
    updateFavourites(favourites) {
      this.$emit("updated-favourites", favourites);
    },
    navigate() {
      this.$router.push({ name: "results", params: { city: this.info.city } });
    }
  }
};
</script>
<style>
.weather__icon {
  width: 50px;
}
.link {
  text-decoration-line: none;
}
</style>
