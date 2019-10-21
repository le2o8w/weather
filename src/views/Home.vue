<template>
  <v-lazy transition="fade-transition">
    <v-app class="welcome" style="background-size:cover !important;">
      <v-content>
        <v-container class="fill-height" fluid>
          <div class="welcome__container">
            <v-img
              src="../../public/img/logo-home.png"
              alt="Weather"
              max-width="60%"
              class="mx-auto"
              contain
            ></v-img>
            <h1 class="mt-4 mb-12 body-1 primary--text">
              Prévisions météo du monde entier :
            </h1>

            <v-text-field
              class="subtitle-1 "
              label="Rechercher une ville"
              outlined
              v-model="city"
              @keyup.enter="goToCity(city)"
            ></v-text-field>
            <p class="primary--text font-weight-bold">ou</p>
            <v-btn
              class="subtitle-1"
              color="cyan"
              elevation="1"
              @click="locateMe"
              :loading="gettingLocation"
            >
              Géolocalisation <v-icon right>mdi-crosshairs-gps</v-icon>
            </v-btn>

            <div v-if="error">
              Sorry, but the navigator won't allow us to access your location.
            </div>
          </div>
        </v-container>
      </v-content>
    </v-app>
  </v-lazy>
</template>
<script>
import { getCity } from "@/api/localisation.js";
export default {
  name: "Welcome",

  data() {
    return {
      city: "",
      location: null,
      gettingLocation: false,
      error: null
    };
  },
  methods: {
    goToCity(city) {
      this.$router.push({ name: "results", params: { city: city } });
    },

    async getLocation() {
      return new Promise(async (resolve, reject) => {
        if (!("geolocation" in navigator)) {
          reject(new Error("Geolocation is not available."));
        }

        navigator.geolocation.getCurrentPosition(
          async pos => {
            resolve(pos);
            const coordinates =
              "json?latlng=" +
              pos.coords.latitude +
              "," +
              pos.coords.longitude +
              "&result_type=political";
            await getCity(coordinates).then(response => {
              const city = response.results[0].formatted_address.replace(
                /,/gi,
                ""
              );
              this.goToCity(city);
            });
          },
          err => {
            reject(err);
          }
        );
      });
    },
    async locateMe() {
      this.gettingLocation = true;
      try {
        this.location = await this.getLocation();
      } catch (e) {
        this.gettingLocation = false;
        this.error = e.message;
      }
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
