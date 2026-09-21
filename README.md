Movie Search App
A small React app that lets you browse movies from TMDB with interactive UI enhancements.

Features
Loading spinner while fetching data
Error banner for API failures
Debounced search input
Animated movie cards (fade‑in & hover scale)
Modal view showing full movie details
Responsive layout with media queries
Refactored components: SearchBar, FiltersBar, MovieCard, MovieModal
Prerequisites
Node.js (>= 14) and npm
Installation
bash

# Install all dependencies (including added ones)
npm install
Development
bash

npm start
Open http://localhost:3000
 in your browser. The app reloads on code changes.

Production Build
bash

npm run build
The optimized files are placed in the build folder.

Notes
The API key is currently hard‑coded for simplicity; consider moving it to environment variables for production.
Spinner (.spinner) and error banner (.error-banner) styles are defined in movieApp.css.
Enjoy exploring movies!