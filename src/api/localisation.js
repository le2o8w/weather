import axios from "axios";

const API_KEY = "AIzaSyCOc7sdfPj4zJeHjcGwgcwYH4DhlyhLdkg";
const API_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
const API_LATLNG = "https://maps.googleapis.com/maps/api/geocode/";

const localisation = axios.create({
  baseURL: API_URL
});

const coordinates = axios.create({
  baseURL: API_LATLNG
});

export async function getCoordinates(query) {
  const response = await localisation.get(`${query}&key=${API_KEY}`);
  return response.data;
}

export async function getCity(query) {
  const response = await coordinates.get(`${query}&key=${API_KEY}`);
  return response.data;
}
