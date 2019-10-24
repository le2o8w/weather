<template>
  <v-card class="my-4" elevation="5" width="100%" v-if="result">
    <v-lazy height="100%" max-height="calc(100vh - 50px)">
      <v-img
        :src="result.image"
        :alt="result.city"
        class="white--text"
        height="100%"
        max-height="calc(100vh - 50px)"
        transition="fade-transition"
        gradient="to bottom, rgba(0,0,0,.3), rgba(0,0,0,.6)"
        cover
      >
        <v-card-title>
          <v-container class="d-flex justify-space-between align-start">
            <h2>
              <span
                v-for="(details, index) in result.country"
                :key="index"
                :class="'mb-1 size-' + (index + 1)"
                class="break-word"
              >
                {{ details }}
              </span>
            </h2>
            <Favourite :favourite="result.favourite" />
          </v-container>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <h3 class="my-3 size-2">
                  {{ result.localDay | capitalizeFirst }}
                </h3>
                <p class="size-3">
                  {{ result.summary | capitalizeFirst }}
                </p>
                <p class="weather__short">
                  <v-lazy min-height="50px" transition="fade-transition">
                    <v-img
                      class="weather__icon"
                      :src="result.currentWeatherIcon"
                    ></v-img>
                  </v-lazy>
                  <span class="weather__temperature">
                    {{ result.currentWeather.temperature | round }}°C
                  </span>
                </p>
                <div class="weather__details size-3">
                  <p>
                    Précipitations :
                    <span>
                      {{
                        (result.currentWeather.precipProbability * 100) | round
                      }}
                      %
                    </span>
                  </p>
                  <p>
                    Humidité :
                    <span>
                      {{ (result.currentWeather.humidity * 100) | round }}
                      %
                    </span>
                  </p>
                  <p>
                    Vent :
                    <span>
                      {{ result.currentWeather.windSpeed | round }}
                      km/h
                    </span>
                  </p>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-img>
    </v-lazy>
  </v-card>
</template>
<script>
import Favourite from "@/components/Favourite.vue";
export default {
  name: "WeatherArticle",
  components: {
    Favourite
  },
  props: {
    result: {}
  }
};
</script>
<style>
.size-4,
.size-3,
.size-2,
.size-1 {
  font-weight: 400;
  display: block;
}
.size-4 {
  font-size: 18px;
}
.size-3 {
  font-size: 16px;
}
.size-2 {
  font-size: 22px;
}
.size-1 {
  font-size: 30px;
}

.weather__short,
.weather__details p {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 75%;
}
.weather__temperature {
  font-size: 24px;
}
.weather__icon {
  width: 50px;
}
</style>
