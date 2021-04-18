// eslint-disable-next-line
import * as React from 'react';
import { createContainer } from "unstated-next";
// https://developers.themoviedb.org/3/movies/get-movie-details
import { IMovie } from '../utils';


export const useStore = () => {
  const [movies, setMovies] = React.useState<IMovie[]>([])
  const [film, setFilm] = React.useState<any>()
  const [loading, setLoading] = React.useState<boolean>(true);
  const [search, setSearch] = React.useState<string>("");
  const debug: boolean = true;

  // GETTER : function get all movies from the server
  const getMovies = async () => {
    try {
      const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=8cfaa9c2cd892c338c650dbcf1149226");
      const json = await response.json();
      setMovies(json.results);
    } catch (err) {
      console.error(err.message);
    }
  };

  // GETTER : function get only a movie 
  const getFilm = async (ref: string) => {
    try {
      fetch(`https://api.themoviedb.org/3/movie/${ref}?api_key=8cfaa9c2cd892c338c650dbcf1149226`)
        .then(response => response.json())
        .then((res) => setFilm(res));
    } catch (err) {
      console.error(err.message);
    }
  };

  // load all movies on charging home page
  React.useEffect(() => {
    getMovies();
  }, [])

  // for a global loading initally
  React.useEffect(() => {
    setLoading(false);
  }, [movies])

  // Load data at beginning
  const start = () => {
    getMovies();
  }

  return {
    // payload / attributes
    debug,
    loading,
    search,
    movies,
    film,
    // action / methods
    setSearch,
    getMovies,
    getFilm,
    setLoading,
    start,
  };
}
export const StoreContainer = createContainer(useStore)