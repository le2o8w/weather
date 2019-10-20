<template>
  <v-card v-if="result" class="daily my-5 mx-3 pa-3" elevation="5">
    <v-card-text class=" d-flex flex-column align-center justif-center">
      <h3 class="'mb-1 size-3">{{ result.localDay }}</h3>
      <v-img
        class="weather__icon"
        :src="require(`@/assets/icons/${result.icon}.png`)"
      ></v-img>
      <div class="d-flex justify-space-between align-center">
        <h4 class="mb-1">{{ result.temperatureMin | round }}°C</h4>
        <h4 class="mb-1">{{ result.temperatureMax | round }}°C</h4>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "WeatherDaily",
  props: {
    result: {}
  },
  data() {
    return {
      src: ""
    };
  }
};
</script>
<style scoped>
.daily:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.25)
  );
  filter: blur(1px);
}

.daily:active:before {
  opacity: 0;
}
.weather__icon {
  width: 50px;
  margin: 20px 0;
}
h4 {
  margin: 0 5px;
}
</style>
