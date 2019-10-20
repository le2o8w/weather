<template>
  <v-card width="90%" height="100%">
    <v-container>
      <v-card-title>
        <h4>Températures heure par heure</h4>
      </v-card-title>
      <v-container>
        <div class="d-flex justify-space-between align-stretch">
          <div class="d-flex flex-column" width="2%" height="100%">
            <div
              v-bind:style="{ height: labelHeight }"
              v-for="(temp, index) in result.hourlyRange"
              :key="index"
            >
              {{ temp }}°
            </div>
          </div>
          <v-sheet width="98%" height="100%" color="transparent">
            <v-sparkline
              height="100%"
              :smooth="16"
              :key="String(result.hourlyTemperatures)"
              :gradient="['#f72047', '#ffd200', '#1feaea']"
              :line-width="1"
              :value="result.hourlyTemperatures"
              :labels="result.hourlyLabels"
              auto-draw
              stroke-linecap="round"
              color="white"
              label-size="5"
              :show-labels="true"
            ></v-sparkline>
          </v-sheet>
        </div>
      </v-container>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "WeatherHourly",
  props: {
    result: null
  },
  computed: {
    labelHeight() {
      return 90 / this.result.hourlyRange.length + "%";
    }
  },
  data() {
    return {
      src: ""
    };
  }
};
</script>
<style scoped>
.weather__icon {
  width: 50px;
}
</style>
