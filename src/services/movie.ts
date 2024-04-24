import { TopMoviesResponse } from "../types";
import { isTopMoviesResponse } from "../types/typeGuards";

const url = "https://api.themoviedb.org/3/movie";

async function getTopMovies(page: number): Promise<TopMoviesResponse> {
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
  if (!isTopMoviesResponse(json)) {
    throw new Error("Wrong data from server");
  }
  return json;
}

export default {
  getTopMovies,
};
