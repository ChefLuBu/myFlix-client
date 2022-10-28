import { MovieCard } from "../movie-card/movie-card";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';


export function MoviesList(props) {
    const { movies, button } = props;
  return (
    <>
      {movies.map((m) => (
        <Col md={3} key={m._id}>
          <MovieCard movie={m} />
        </Col>,
        <>
        <Button key="seeMore" onClick={() => onMovieClick(movie)} variant="link">See More</Button>
</>
      ))}
    </>
  );
}

