<template>
  <div class="mx-auto" width="80%">
    <v-row class="pa-2" width="100%">
      <v-col cols="12">
        <div class="d-flex align-start justify-space-between">
          <h2 class="font-weight-medium">
            {{ day.localDate | capitalizeFirst }}
          </h2>
          <img class="icon" :src="require(`@/assets/icons/${day.icon}.png`)" />
        </div>
        <h3 class="font-weight-regular">{{ day.summary }}</h3>
      </v-col>
    </v-row>

    <v-row class="pa-2 d-flex justify-space-between align-center" width="100%">
      <v-col
        cols="12"
        sm="6"
        class=" d-flex justify-space-between align-center"
      >
        <div class="d-flex align-start flex-column">
          <div>Lever du soleil</div>
          <div class="font-weight-bold">{{ day.sunriseFullTime }}</div>
        </div>
        <img
          class="icon-small mx-3"
          :src="require(`@/assets/icons/sunrise.png`)"
        />
      </v-col>
      <v-col cols="12" sm="6" class="d-flex justify-space-between align-center">
        <div class="d-flex align-start flex-column">
          <div>Coucher du soleil</div>
          <div class="font-weight-bold">{{ day.sunsetFullTime }}</div>
        </div>
        <img
          class="icon-small mx-3"
          :src="require(`@/assets/icons/sunset.png`)"
        />
      </v-col>
    </v-row>

    <v-row class="pa-2 d-flex justify-space-between align-center">
      <v-col cols="12" sm="6" class=" d-flex justify-start">
        <div class="d-flex align-start flex-column">
          <div>Température minimale</div>
          <div class="font-weight-bold">{{ day.temperatureMin }} °C</div>
        </div>
      </v-col>
      <v-col cols="12" sm="6" class=" d-flex justify-start">
        <div class="d-flex align-start flex-column">
          <div>Température maximale</div>
          <div class="font-weight-bold">{{ day.temperatureMax }} °C</div>
        </div>
      </v-col>
    </v-row>
    <v-row class="pa-2 d-flex justify-space-between align-center">
      <v-col cols="12" sm="6" class=" d-flex justify-start">
        <div class="d-flex align-start flex-column">
          <div>Précipitations</div>
          <div class="font-weight-bold">
            {{ (day.precipProbability * 100) | round }} %
          </div>
        </div>
      </v-col>
      <v-col cols="12" sm="6" class=" d-flex justify-start">
        <div class="d-flex align-start flex-column">
          <div>Vent</div>
          <div class="font-weight-bold">{{ day.windSpeed | round }} km/h</div>
        </div>
      </v-col>
    </v-row>
    <v-row class="pa-2 d-flex justify-space-between align-center">
      <v-col cols="12" sm="6" class=" d-flex justify-start">
        <div class="d-flex align-start flex-column">
          <div>Indice UV</div>
          <div class="font-weight-bold">{{ day.uvIndex }}</div>
        </div>
      </v-col>
      <v-col cols="12" sm="6" class=" d-flex justify-start">
        <div class="d-flex align-start flex-column">
          <div>Couverture nuageuse</div>
          <div class="font-weight-bold">
            {{ (day.cloudCover * 100) | round }} %
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "WeatherDailyMore",
  props: {
    day: null
  }
};
</script>
<style>
.icon {
  width: 60px;
  height: 60px;
}
.icon-small {
  width: 40px;
  height: 40px;
}
</style>
