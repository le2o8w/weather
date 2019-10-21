<template>
  <v-content>
    <v-container class="fill-height" fluid v-if="pending">
      <Loader />
    </v-container>
    <v-container class="fill-height d-flex flex-column" fluid v-else>
      <WeatherArticle :result="result" />
      <WeatherHourly class="d-none d-sm-flex" :result="result" />
      <v-card class="my-8 mx-auto" width="90%">
        <v-container>
          <v-card-title>
            <h4>Semaine à venir</h4>
          </v-card-title>
          <v-sheet>
            <v-slide-group multiple show-arrows>
              <v-slide-item
                v-for="(day, index) in result.weeklyWeather"
                :key="index"
              >
                <WeatherDaily :result="day" />
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-container>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import { getCoordinates } from "@/api/localisation.js";
import { getPictures } from "@/api/pictures.js";
import { getWeather } from "@/api/weather.js";
import moment from "moment-timezone";
import WeatherArticle from "@/components/WeatherArticle.vue";
import WeatherHourly from "@/components/WeatherHourly.vue";
import WeatherDaily from "@/components/WeatherDaily.vue";
import Loader from "@/components/Loader.vue";
export default {
  name: "Results",
  components: {
    WeatherArticle,
    WeatherHourly,
    WeatherDaily,
    Loader
  },
  data() {
    return {
      pending: true,
      result: {}
    };
  },
  watch: {
    "$route.params.city": function() {
      this.search();
    }
  },
  mounted() {
    this.search();
  },
  methods: {
    async search() {
      this.showSearch = false;
      this.pending = true;
      try {
        const response = await getCoordinates(this.$route.params.city);
        this.result.coordinates = response.results[0].geometry.location;
        this.result.city = response.results[0].address_components[0].long_name;
        this.result.country = response.results[0].formatted_address.split(",");

        const weather = await getWeather(this.result.coordinates);
        this.result.currentWeather = weather.currently;
        this.result.hourlyWeather = weather.hourly.data;
        this.result.hourlyTemperatures = [];
        this.result.hourlyLabels = [];
        this.result.hourlyWeather.forEach(hour => {
          this.result.hourlyTemperatures.push(
            parseFloat(Math.round(hour.temperature))
          );
          this.result.hourlyLabels.push(
            this.localTime(hour.time, weather.timezone)
          );
        });
        this.result.hourlyTemperatures = this.result.hourlyTemperatures.slice(
          0,
          24
        );

        this.result.hourlyRange = [];
        let min = Math.min(...this.result.hourlyTemperatures);
        let max = Math.max(...this.result.hourlyTemperatures);
        for (let index = min; index <= max; index++) {
          this.result.hourlyRange.push(min);
          min++;
        }
        this.result.hourlyRange = this.result.hourlyRange.reverse();
        this.result.summary = weather.currently.summary;
        this.result.currentWeatherIcon = require(`@/assets/icons/${weather.currently.icon}.png`);
        this.result.localDay = this.localDate(
          weather.currently.time,
          weather.timezone
        );
        this.result.weeklyWeather = weather.daily.data;
        this.result.weeklyWeather.forEach(day => {
          day.localDay = this.localDay(day.time, weather.timezone);
        });
        this.result.timezone = weather.timezone;

        const picture = await getPictures(this.result.city);
        this.result.image = picture.results[0].urls.full;
        this.result.thumb = picture.results[0].urls.thumb;
      } catch (e) {
        console.error(e);
      }

      this.pending = false;
    },

    localDate(day, timezone) {
      let language;
      if (navigator.languages != undefined) {
        language = navigator.languages[0];
      } else {
        language = navigator.language;
      }
      moment.locale(language);
      return moment.tz(day * 1000, timezone).format("dddd D MMMM YYYY");
    },
    localDay(day, timezone) {
      let language;
      if (navigator.languages != undefined) {
        language = navigator.languages[0];
      } else {
        language = navigator.language;
      }
      moment.locale(language);
      return moment.tz(day * 1000, timezone).format("ddd");
    },
    localTime(day, timezone) {
      return moment.tz(day * 1000, timezone).format("H") + "h";
    }
  }
};
</script>
<style>
.link {
  text-decoration-line: none;
}
</style>
