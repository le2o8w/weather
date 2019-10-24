<template>
  <v-lazy transition="fade-transition">
    <v-app class="welcome" style="background-size:cover !important;">
      <v-content>
        <v-container class="fill-height" fluid>
          <div class="favourites ma-3">
            <v-btn icon to="/favourites" fab x-large>
              <v-icon x-large class="favourites--icon" color="pink"
                >mdi-heart</v-icon
              >
            </v-btn>
          </div>
          <div class="welcome__container">
            <v-img
              src="../../public/img/logo-home.png"
              alt="Weather"
              max-width="70%"
              class="mx-auto"
              contain
            ></v-img>
            <h1 class="mt-4 mb-12 sous-titre primary--text">
              Prévisions météo du monde entier
            </h1>

            <v-text-field
              class="input"
              label="Rechercher une ville"
              light
              single-line
              solo
              append-icon="mdi-magnify"
              color="primary"
              v-model="city"
              @keyup.enter="goToCity(city)"
            ></v-text-field>
            <p class="primary--text font-weight-bold">ou</p>
            <v-btn
              class="subtitle-1 text-capitalize"
              large
              color="#85c6b4"
              elevation="1"
              @click="locateMe"
              :loading="gettingLocation"
            >
              <div class="d-flex justify-space-around align-center">
                <span class="px-1">Géolocalisation</span>
                <v-icon small class="px-1">mdi-crosshairs-gps</v-icon>
              </div>
            </v-btn>

            <div class="py-5" v-if="error">
              Désolé, le navigateur n'autorise pas l'accès à votre position.
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
<style scoped>
.welcome {
  background: 50% url("../../public/img/background/landscape.jpg")
    rgba(0, 0, 0, 0) no-repeat !important;
}

.welcome__container {
  width: 50%;
  margin: 0 auto;
  text-align: center;
}
.favourites {
  position: fixed;
  top: 0;
  right: 0;
}
.favourites--icon {
  animation: 1.8s ease 0s infinite beat;
}
@media screen and (max-width: 900px) {
  .welcome__container {
    width: 95%;
  }
}
@keyframes beat {
  0%,
  50%,
  100% {
    transform: scale(1.1, 1.12);
  }
  30%,
  80% {
    transform: scale(0.92, 0.95);
  }
}
</style>
