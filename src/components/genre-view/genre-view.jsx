import React from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import { Button, Container, Col, Row } from "react-bootstrap";
import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick, genreMovies } = this.props;

    return (
      <div>
        <Container key={genre.view} className="genre-view">
          <Row key={genre.Name}>
            <Col className="value">
              <h1>{genre.Genre.Name}</h1>
            </Col>
          </Row>
          <Row key={genre.Description}>
            <p className="value">{genre.Genre.Description}</p>
          </Row>
          <Row key={genre.Genre}>
            <Col className="label">
              <h3>Other {genre.Genre.Name} films: </h3>
            </Col>
          </Row>

          <Row key={genre._id}>
            {genreMovies.map((genres, index) => (
              <Card key={`${index}genres`}className="genreView mt-2 mb-2">
                <Card.Img
                  variant="top"
                  crossOrigin="anonymous"
                  src={genres.imgUrl}
                />
                <Card.Body>
                  <Card.Title>{genres.Title}</Card.Title>
                  <Card.Text>{genres.Description}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Row>

          <Button
            className="mt-4"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </Container>
      </div>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
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
  onMovieClick: PropTypes.func,
};
