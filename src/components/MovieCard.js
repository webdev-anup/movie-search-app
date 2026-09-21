import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  hover: { scale: 1.03, boxShadow: "0px 8px 15px rgba(0,0,0,0.2)" },
};

const MovieCard = ({ movie, onReadMore }) => (
  <motion.div
    className="movie"
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    whileHover="hover"
  >
    <img
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
    />
    <h2>{movie.title}</h2>
    <p className="rating">Rating: {movie.vote_average}</p>
    <p>{movie.overview.substring(0, 150)}...</p>
    <button onClick={onReadMore} className="read-more">
      Read More
    </button>
  </motion.div>
);

export default MovieCard;

