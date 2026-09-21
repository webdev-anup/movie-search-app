import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import "./movieApp.css";
import axios from "axios";
import debounce from "lodash.debounce";
import SearchBar from "./SearchBar";
import FiltersBar from "./FiltersBar";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";

const MovieRecommendations = () => {
  // Core data state
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  // UI state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch genres once on mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list",
          {
            params: {
              api_key: "0fa2853e7c4d6c8f146aba861c5e4a06",
            },
          }
        );

        setGenres(response.data.genres);
      } catch {
        setError("Failed to load genres");
      }
    };

    fetchGenres();
  }, []);

  // Centralised fetch for movies
  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = searchQuery
        ? "https://api.themoviedb.org/3/search/movie"
        : "https://api.themoviedb.org/3/discover/movie";

      const response = await axios.get(endpoint, {
        params: {
          api_key: "0fa2853e7c4d6c8f146aba861c5e4a06",
          query: searchQuery,
          sort_by: sortBy,
          with_genres: selectedGenre,
          page: 1,
        },
      });

      setMovies(response.data.results);
    } catch {
      setError("Failed to fetch movies");
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, sortBy, selectedGenre]);

  // Trigger fetch when dependencies change
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Debounced search input handler
  const debouncedSetSearch = useMemo(
    () => debounce((value) => setSearchQuery(value), 300),
    []
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  const handleSearchChange = (e) => {
    debouncedSetSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  return (
    <div className="movie-app">
      <h1>MovieHouse</h1>

      <SearchBar onChange={handleSearchChange} />

      <FiltersBar
        sortBy={sortBy}
        onSortChange={handleSortChange}
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={handleGenreChange}
      />

      {isLoading && <div className="spinner" />}

      {error && <div className="error-banner">{error}</div>}

      <div className="movie-wrapper">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onReadMore={() => openModal(movie)}
          />
        ))}
      </div>

      {showModal && selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          isOpen={showModal}
          onRequestClose={closeModal}
        />
      )}
    </div>
  );
};

export default MovieRecommendations;