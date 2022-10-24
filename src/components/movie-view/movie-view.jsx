import React from "react";
import PropTypes from "prop-types";


export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
      }
    
      componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
      }
    
    

  render() {
    const { movie, onBackClick } = this.props;

    return (
        <div className="movie-view">
        <div className="movie-poster">
          <img style={{ crossorigin:"anonymous",
            resizeMode: "cover",
            height: 508,
            width: 343}} src={movie.imgUrl} />
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
          <span className="value">{movie.Director.BirthYear}</span>
        </div>
        <div className="director-deathyear">
          <span className="director">Deathyear: </span>
          <span className="value">{movie.Director.Deathyear}</span>
        </div>
        <button
          onClick={() => {
            onBackClick(null);
          }}>
          Back
        </button>
      </div>
    );
  }
}
// These must be called here and on movie card in order 
//for them to render the objects correcty

MovieView.propTypes = {
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
    onBackClick: PropTypes.func.isRequired
  };