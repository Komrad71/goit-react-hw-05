import axios from "axios";

const BASE_URL = "https://api.unsplash.com/search/photos";
const API_KEY = "a_hgbQf36zo272hjDZlr_BZ3Ei6uKxZiFZM0TPnTw6g"; // Unsplash key

const FetchImages = async (query, page) => {
  const { data } = await axios.get(BASE_URL, {
    params: {
      query,
      page,
      per_page: 10,
    },
    headers: {
      Authorization: `Client-ID ${API_KEY}`,
    },
  });

  return data;
};

export default FetchImages;