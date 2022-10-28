import { MovieView } from "../movie-view/movie-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export function MoviesViewer(props) {
    const { selectedMovie } = props;
  return (
    <>
      <MovieView />
    </>
    );
}



