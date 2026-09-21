import React from "react";

const FiltersBar = ({ sortBy, onSortChange, genres, selectedGenre, onGenreChange }) => (
  <div className="filters">
    <label htmlFor="sort-by">Sort By:</label>
    <select id="sort-by" value={sortBy} onChange={onSortChange}>
      <option value="popularity.desc">Popularity Descending</option>
      <option value="popularity.asc">Popularity Ascending</option>
      <option value="vote_average.desc">Rating Descending</option>
      <option value="vote_average.asc">Rating Ascending</option>
      <option value="release_date.desc">Release Date Descending</option>
      <option value="release_date.asc">Release Date Ascending</option>
    </select>
    <label htmlFor="genre">Genre:</label>
    <select id="genre" value={selectedGenre} onChange={onGenreChange}>
      <option value="">All Genres</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  </div>
);

export default FiltersBar;

