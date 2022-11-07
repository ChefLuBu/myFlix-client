import React from "react";
import { Button, Container, Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "./genre-view.scss"

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick, genreMovies } = this.props;

    return (
      <div>
        <Container key={genre.view} className='genre-view'>
          <Row key={genre.Name}>
            <Col className='value'>
              <h1>{genre.Genre.Name}</h1>
            </Col>
          </Row>
          <Row key={genre.Description}>
            <p className='value'>{genre.Genre.Description}</p>
          </Row>
          <Row key={genre.Genre}>
            <Col className='label'>
              <h3>Other {genre.Genre.Name} films: </h3>
            </Col>
          </Row>

          <Row key={genre._id}>
            {genreMovies.map((movie) => (
              <Col lg={6} md={6}>
                <MovieCard key={movie._id} movie={movie}>
                  {movie.Title}
                </MovieCard>
              </Col>
            ))}
          </Row>

          <Button
            className='mt-4'
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