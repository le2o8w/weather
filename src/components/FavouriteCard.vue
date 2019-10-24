<template>
  <v-card class="my-3 mx-auto" elevation="5" v-if="favourite" width="250px">
    <v-img
      :src="favourite.thumb"
      :alt="favourite.city"
      class="white--text"
      height="175px"
      gradient="to bottom, rgba(0,0,0,.3), rgba(0,0,0,.6)"
      transition="fade-transition"
      cover
    >
      <a href="#" class="link white--text" @click.prevent="navigate">
        <v-card-title class="d-flex justify-space-between align-center">
          {{ favourite.city | capitalizeFirst }}
        </v-card-title>
        <v-card-text>
          <div class="d-flex justify-space-between  align-center">
            <v-lazy min-height="50px" transition="fade-transition">
              <v-img
                class="weather__icon"
                :src="icon"
                :alt="'Weather icon for' + favourite.city"
              ></v-img>
            </v-lazy>
            <h5 v-if="temperature" class="display-1">
              {{ temperature | round }} °
            </h5>
          </div>
        </v-card-text>
      </a>
    </v-img>
  </v-card>
</template>

<script>
import { getWeather } from "@/api/weather.js";
export default {
  name: "FavouriteCard",

  props: {
    favourite: {}
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
      if (this.favourite) {
        try {
          const weather = await getWeather(this.favourite.coordinates);
          this.icon = require(`@/assets/icons/${weather.currently.icon}.png`);
          this.temperature = weather.currently.temperature;
        } catch (error) {
          console.log(error);
        }
      }
    },
    navigate() {
      this.$router.push({
        name: "results",
        params: { city: this.favourite.city }
      });
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
