<template>
  <v-lazy transition="fade-transition">
    <v-app class="welcome" style="background-size:cover !important;">
      <v-content>
        <v-container class="fill-height" fluid>
          <div class="welcome__container">
            <h1
              :class="[$vuetify.breakpoint.xs ? 'display-2' : 'display-4']"
              class="mb-4  primary--text"
            >
              Weather
            </h1>
            <p class="mb-12 body-1 primary--text">
              Look up the weather in any city :
            </p>

            <v-text-field
              class="subtitle-1 "
              label="Search"
              outlined
              v-model="city"
              @keyup.enter="goToCity(city)"
            ></v-text-field>
            <v-btn class="text-lowercase subtitle-1" text small
              >or click here for geolocalisation</v-btn
            >
          </div>
        </v-container>
      </v-content>
    </v-app>
  </v-lazy>
</template>
<script>
export default {
  name: "Welcome",
  data() {
    return {
      city: ""
    };
  },
  methods: {
    goToCity(city) {
      this.$router.push({ name: "results", params: { city: city } });
    }
  }
};
</script>
<style>
.welcome {
  background: 50% 50% url("../../public/img/background/landscape.jpg")
    rgba(0, 0, 0, 0) no-repeat !important;
}

.welcome__container {
  width: 50%;
  margin: 0 auto;
  text-align: center;
}

@media screen and (max-width: 600px) {
  .welcome__container {
    width: 95%;
  }
}
</style>
