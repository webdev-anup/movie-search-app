import React from "react";

// Simple search bar that calls onChange with the raw event target value.
// The parent component handles debouncing.
const SearchBar = ({ onChange }) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder="Search movies..."
      className="search-input"
      onChange={onChange}
    />
  </div>
);

export default SearchBar;

