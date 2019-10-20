import axios from "axios";

const API_KEY =
  "95e1509aa56975486a90cbefa496ab8638135ec23710f6bf0601cde7395663d1";
const API_URL = "https://api.unsplash.com/search/photos";

const pictures = axios.create({
  baseURL: API_URL
});

export async function getPictures(query) {
  const response = await pictures.get(`/?client_id=${API_KEY}&query=${query}`);
  return response.data;
}
