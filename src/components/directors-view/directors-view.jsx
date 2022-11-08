import React from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import { Button, Container, Col, Row } from "react-bootstrap";
import "./directors-view.scss";

export class DirectorsView extends React.Component {
  render() {
    const { director, onBackClick, directorMovies } = this.props;

    return (
      <Container className="director-view">
        <Row>
          <Col className="value">
            <h1>{director.Director.Name}</h1>
            <p className="value">Birthdate: {director.Director.Birthyear}</p>

            {director.Director.Deathyear > 0 && (
              <p className="value">Deathdate: {director.Director.Deathyear}</p>
            )}
          </Col>
        </Row>
        <Row>
          <Col className="value">{director.Director.Bio}</Col>
        </Row>

        <Row>
          <Col className="pt-3">
            <h3 className="label">Other {director.Director.Name} films:</h3>
          </Col>
        </Row>
        <Row>
          {directorMovies.map((directed, index) => (
            <Card key={`${index}directors`} className="directorsView mt-2 mb-2">
              <Card.Img
                variant="top"
                crossOrigin="anonymous"
                src={directed.imgUrl}
              />
              <Card.Body>
                <Card.Title>{directed.Title}</Card.Title>
                <Card.Text>{directed.Description}</Card.Text>
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
    );
  }
}

DirectorsView.propTypes = {
  director: PropTypes.shape({
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
