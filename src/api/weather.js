import axios from "axios";

const API_KEY_WEATHER = "d7cd34498fc4aaa83bc3476b937a9518";
const API_URL =
  "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/";

const weather = axios.create({
  baseURL: API_URL
});
export async function getWeather(coordinates) {
  const response = await weather.get(
    `${API_KEY_WEATHER}/${coordinates.lat},${coordinates.lng}?lang=fr&units=ca`
  );
  return response.data;
}
