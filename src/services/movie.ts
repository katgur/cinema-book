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

async function getTopMovies(page: number): Promise<GetTopMoviesResponse> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  };
  const response = await fetch(
    `${url}/top_rated?language=ru&page=${page}`,
    options
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const json = await response.json();
  if (!isGetTopMoviesResponse(json)) {
    throw new Error("Wrong data from server");
  }
  return json;
}

async function getMovieById(id: number): Promise<GetMovieByIdResponse> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  };
  const response = await fetch(`${url}/${id}?language=ru`, options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const json = await response.json();
  if (!isGetMovieByIdResponse(json)) {
    throw new Error("Wrong data from server");
  }
  return json;
}

async function getMovieRecommendations(
  id: number
): Promise<GetMovieRecommendationsResponse> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  };
  const response = await fetch(
    `${url}/${id}/recommendations?language=ru`,
    options
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const json = await response.json();
  if (!isGetTopMoviesResponse(json)) {
    throw new Error("Wrong data from server");
  }
  return json;
}

export default {
  getTopMovies,
  getMovieById,
  getMovieRecommendations,
};
