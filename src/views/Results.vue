<template>
  <v-content>
    <v-container class="fill-height" fluid v-if="pending">
      <Loader transition="fade-transition" />
    </v-container>
    <v-container class="fill-height d-flex flex-column" fluid v-else>
      <WeatherArticle :result="result" transition="fade-transition" />
      <WeatherHourly class="d-none d-sm-flex" :result="result" />
      <v-card class="my-4 mx-auto" transition="fade-transition">
        <v-container>
          <v-card-title class="d-flex align-start flex-column">
            <div class="font-weight-bold">Cette semaine</div>
            <span class="break-word sous-titre font-weight-thin">
              {{ result.weeklyWeatherSummary }}
            </span>
          </v-card-title>
          <v-sheet>
            <v-slide-group show-arrows class="slider">
              <v-slide-item
                v-for="(day, index) in result.weeklyWeather"
                :key="index"
              >
                <div
                  @click="showDaily(day, index)"
                  :class="{ active: activeIndex === index }"
                >
                  <WeatherDaily :result="day" transition="fade-transition" />
                </div>
              </v-slide-item>
            </v-slide-group>
            <v-sheet v-if="selectedDay" tile class="mx-auto pb-2" width="90%">
              <WeatherDailyMore :day="selectedDay" />
            </v-sheet>
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
import WeatherDailyMore from "@/components/WeatherDailyMore.vue";

import Loader from "@/components/Loader.vue";
export default {
  name: "Results",
  components: {
    WeatherArticle,
    WeatherHourly,
    WeatherDaily,
    WeatherDailyMore,
    Loader
  },
  data() {
    return {
      activeIndex: 0,
      selected: true,
      selectedDay: null,
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
        this.result.hourlyWeatherSummary = weather.hourly.summary;
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
        this.result.weeklyWeatherSummary = weather.daily.summary;
        this.result.weeklyWeather = weather.daily.data;
        this.result.weeklyWeather.forEach(day => {
          day.sunriseFullTime = this.localFullTime(
            day.sunriseTime,
            weather.timezone
          );
          day.sunsetFullTime = this.localFullTime(
            day.sunsetTime,
            weather.timezone
          );
          day.localDate = this.localDate(day.time, weather.timezone);
          day.localDay = this.localDay(day.time, weather.timezone);
          day.localDayNb = this.localDayNumber(day.time, weather.timezone);
        });
        this.result.timezone = weather.timezone;

        const picture = await getPictures(this.result.city);
        this.result.image = picture.results[0].urls.full;
        this.result.thumb = picture.results[0].urls.thumb;
        this.result.favourite = {
          city: this.result.city.toLowerCase(),
          coordinates: this.result.coordinates,
          thumb: this.result.thumb
        };
        this.selectedDay = this.result.weeklyWeather[0];
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
    localDayNumber(day, timezone) {
      return moment.tz(day * 1000, timezone).format("D");
    },
    localTime(day, timezone) {
      return moment.tz(day * 1000, timezone).format("H") + "h";
    },
    localFullTime(day, timezone) {
      return moment.tz(day * 1000, timezone).format("HH:mm");
    },
    showDaily(day, index) {
      this.selected = true;
      this.selectedDay = day;
      this.activeIndex = index;
    }
  }
};
</script>
<style>
.link {
  text-decoration-line: none;
}
.break-word {
  word-break: break-word;
}
.sous-titre {
  font-size: 18px;
}
.slider .v-slide-group__prev,
.slider .v-slide-group__next {
  min-width: 35px;
}
</style>
