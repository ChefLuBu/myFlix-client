import React from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { MoviesList } from "../movies-list/movies-list";
import { MoviesViewer } from "../movies-viewer/movies-viewer";
import { RegistrationView } from "../registration-view/registration-view";
import "./main-view.scss";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      //   selectedMovie: null,
      user: null,
    };
  }

  getMovies(token) {
    axios
      .get("https://mykungfuflix.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user)
      return (
        <Row>
          <Col>
            <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
          </Col>
        </Row>
      );
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MoviesList movies={movies} />} />

          <Route path="/movies/:movieId" element={<MoviesViewer selectedMovies={movies} />} />
            
        </Routes>
      </BrowserRouter>
    );
  }
}
