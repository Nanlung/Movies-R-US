const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch popular movies: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query: string) => {
  if (!query.trim()) {
    throw new Error("Search query cannot be empty.");
  }

  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
    query
  )}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch search results: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};
