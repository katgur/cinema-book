import axios from "axios";
import {
  GetMovieByIdResponse,
  GetTopMoviesResponse,
  GetMovieRecommendationsResponse,
} from "../types";
import {
  isGetMovieByIdResponse,
  isGetTopMoviesResponse,
} from "../types/typeGuards";

const url = "https://api.themoviedb.org/3/movie";

axios.interceptors.request.use(
  function (config) {
    const headers = config.headers;
    headers.Authorization = `Bearer ${import.meta.env.VITE_API_KEY}`;
    return {
      ...config,
      headers,
    };
  },
  function (error) {
    return Promise.reject(error);
  }
);

async function getTopMovies(page: number): Promise<GetTopMoviesResponse> {
  const response = await axios.get(`${url}/top_rated?language=ru&page=${page}`);
  const data = response.data;
  if (!isGetTopMoviesResponse(data)) {
    throw new Error("Wrong data from server");
  }
  return data;
}

async function getMovieById(id: string): Promise<GetMovieByIdResponse> {
  const response = await axios.get(`${url}/${id}?language=ru`);
  const data = response.data;
  if (!isGetMovieByIdResponse(data)) {
    throw new Error("Wrong data from server");
  }
  return data;
}

async function getMovieRecommendations(
  id: string
): Promise<GetMovieRecommendationsResponse> {
  const response = await axios.get(`${url}/${id}/recommendations?language=ru`);
  const data = response.data;
  if (!isGetTopMoviesResponse(data)) {
    throw new Error("Wrong data from server");
  }
  return data;
}

export default {
  getTopMovies,
  getMovieById,
  getMovieRecommendations,
};
