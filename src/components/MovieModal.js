import React from "react";
import ReactModal from "react-modal";

// Set the root element for accessibility (you may need to adjust the selector based on your app).
ReactModal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "600px",
    width: "90%",
    background: "#fff",
    borderRadius: "8px",
    padding: "20px",
  },
};

const MovieModal = ({ movie, isOpen, onRequestClose }) => (
  <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
    <button onClick={onRequestClose} style={{ float: "right", border: "none", background: "transparent", fontSize: "1.2rem" }}>
      ×
    </button>
    <h2>{movie.title}</h2>
    <img
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
      style={{ width: "100%", borderRadius: "4px" }}
    />
    <p style={{ marginTop: "10px" }}>{movie.overview}</p>
    <p><strong>Rating:</strong> {movie.vote_average}</p>
    <p><strong>Release Date:</strong> {movie.release_date}</p>
  </ReactModal>
);

export default MovieModal;

