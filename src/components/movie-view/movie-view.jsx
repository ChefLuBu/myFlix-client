import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";

import "./movie-view.scss";

export class MovieView extends React.Component {

addMovieToFavorites(e) {
  const { movie } = this.props;
  const Username = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  e.preventDefault();
  
axios
  .post(
    `https://kungfuflix.herokuapp.com/users/${username}/movies/${movie._id}`,
    { username: localStorage.getItem("user") },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  .then((response) => {
    console.log(response);
    alert("Movie added");
  })
  .catch((error) => console.error(error));
}

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }

  render() {
    // if (!this.props.movie) return null;
    const { movie, onBackClick } = this.props;
    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img
            crossOrigin="anonymous"
            style={{
              resizeMode: "cover",
              height: "508px",
              width: "343px",
            }}
            src={movie.imgUrl}
          />
        </div>
        <div className="movie-title">
          <span className="title">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="description">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="genre">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="genre-description">
          <span className="genre">Description: </span>
          <span className="value">{movie.Genre.Description}</span>
        </div>
        <div className="movie-director">
          <span className="director">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <div className="director-bio">
          <span className="director">Bio: </span>
          <span className="value">{movie.Director.Bio}</span>
        </div>
        <div className="director-birthyear">
          <span className="director">BirthYear: </span>
          <span className="value">{movie.Director.Birthyear}</span>
        </div>
        <div className="director-deathyear">
          <span className="director">Deathyear: </span>
          <span className="value">{movie.Director.Deathyear}</span>
        </div>
        <button
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </button>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>

        <Link to={`/genre/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link>
        <br />
        <Button
            variant='primary'
            onClick={(e) => this.addMovieToFavorites(e)}
          >
            Add to favorites
          </Button>
        </div>
    );
  }
}


MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birthyear: PropTypes.string.isRequired,
      Deathyear: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
