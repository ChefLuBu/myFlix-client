import { MovieCard } from "../movie-card/movie-card";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import { MovieView } from "../movie-view/movie-view";
import onMovieClick from "../main-view/main-view";


export function MoviesList(props) {
    const { movies } = props;
  return (
    <>
      {movies.map((m) => (
        <Col md={3} key={m._id}>
          <MovieCard movie={m} />
        </Col>
        
      ))}
      
    </>
    
  );

}

