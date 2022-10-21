import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <div onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</div>
    );
  }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired,
      Genre: PropTypes.object.isRequired,
        Name: PropTypes.string.isRequired,
      Director: PropTypes.object.isRequired,
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birthyear:PropTypes.string.isRequired,
        Deathyear: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };