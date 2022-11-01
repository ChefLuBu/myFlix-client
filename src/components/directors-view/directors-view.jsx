import React from "react";
import { Button, Container, Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export class DirectorsView extends React.Component {
  render() {
    const { director, onBackClick, directorMovies } = this.props;

    return (
      <Container className='director-view'>
        <Row>
          <Col className='value'>
            <h1>{director.Director.Name}</h1>
            <p className='value'>Birthdate: {director.Director.Birthyear}</p>

            {director.Director.Deathyear > 0 && (
              <p className='value'>Deathdate: {director.Director.Deathyear}</p>
            )}
          </Col>
        </Row>
        <Row>
          <Col className='value'>{director.Director.Bio}</Col>
        </Row>

        <Row>
          <Col className='pt-3'>
            <h3 className='label'>Other {director.Director.Name} films:</h3>
          </Col>
        </Row>
        <Row>
          {directorMovies.map((movie) => (
            <Col lg={4} md={6}>
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
    );
  }
}