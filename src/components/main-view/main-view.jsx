import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
            _id: "633e0cc8b4441dbf71b82a68",
            Title: 'Red Cliff',
            Description: 'In 208 A.D., in the final days of the Han Dynasty, shrewd Prime Minster Cao Cao convinced the child-Emperor Han the only way to unite all of China was to declare war on the kingdoms of Xu in the west and East Wu in the south.',
            imgUrl: 'https://m.media-amazon.com/images/M/MV5BMTcyOTQ3NDA1OV5BMl5BanBnXkFtZTcwMDY3NzM4Mg@@._V1_.jpg',
            Genre: 'Action',
            Director: 'John Woo'
        },
        {
            _id: "633e0ceab4441dbf71b82a69",
            Title: 'House of Flying Daggers',
            Description: 'A romantic police captain breaks a beautiful member of a rebel group out of prison to help her rejoin her fellows, but things are not what they seem.',
            imgUrl: 'https://m.media-amazon.com/images/M/MV5BMWYzM2JmOWItN2IxZC00MmFjLWEyMTQtYTQ2ODBiNjRlYmZlXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_.jpg',
            Genre: 'Romance',
            Director: 'Yimou Zhang'
        },
        {
            _id: "633e0d0cb4441dbf71b82a6a",
            Title: 'Call of Heroes',
            Description: "A group of villagers must stand up to a warlord's psychopath son, who is protected by a Commander with proficient martial arts skills as well as a small army.",
            imgUrl: 'https://m.media-amazon.com/images/M/MV5BNDNkMjg2MDgtMmJiZC00ZmRhLWEyMWUtOTBmMDUzZTNlMTAzXkEyXkFqcGdeQXVyNjc4MjAzNTE@._V1_.jpg',
            Genre:'Action',
            Director: 'Benny Chan' 
        },
      ],
      selectedMovie: null,
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }
  render() {
    const { movies, selectedMovie } = this.state;
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))
        }
      </div>
    );
  }
  }