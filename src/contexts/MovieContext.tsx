/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
  useContext,
} from "react";

type Movie = {
  id: number;
  title: string;
  [key: string]: unknown;
};

type MovieContextType = {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
};

export const MovieContext = createContext<MovieContextType | undefined>(
  undefined
);

export const useMovieContext = (): MovieContextType => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};

// Provider component
export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    try {
      const stored = localStorage.getItem("favorites");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to parse favorites from localStorage:", error);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites to localStorage:", error);
    }
  }, [favorites]);

  // Add a movie to favorites
  const addToFavorites = (movie: Movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  // Remove a movie from favorites
  const removeFavorites = (movieId: number) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  // Check if a movie is a favorite
  const isFavorite = (movieId: number) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      favorites,
      addToFavorites,
      removeFavorites,
      isFavorite,
    }),
    [favorites, isFavorite]
  );

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
