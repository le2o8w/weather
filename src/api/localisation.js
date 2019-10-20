import axios from "axios";

const API_KEY = "AIzaSyCOc7sdfPj4zJeHjcGwgcwYH4DhlyhLdkg";
const API_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=";

const localisation = axios.create({
  baseURL: API_URL
});

export async function getCoordinates(query) {
  const response = await localisation.get(`${query}&key=${API_KEY}`);
  return response.data;
}
