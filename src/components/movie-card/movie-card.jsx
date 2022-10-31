import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";



export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className="movieCard mt-3 mb-3">
        <Card.Img  variant="top" 
        crossOrigin="anonymous"
         src={movie.imgUrl} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birthyear:PropTypes.string.isRequired,
        Deathyear: PropTypes.string.isRequired}),
    }).isRequired,
    onMovieClick: PropTypes.func,
  };