import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Route } from "react-router-dom";
import  Menubar  from "../navbar/navbar";
import { LoginView } from "../login-view/login-view";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import "./main-view.scss";
import { DirectorsView } from "../directors-view/directors-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { setMovies, setLoggedIn } from "../../actions/actions";
import MoviesList from '../movies-list/movies-list';
import { API_ROOT } from '../config.js'

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      // movies: [],
      //   selectedMovie: null,
      user: null,
    };
  }

  getMovies(token) {
    axios
      .get(`${API_ROOT}/movies`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(this.props)
        this.props.setMovies(response.data)
        // this.setState({
        //   movies: response.data,
        // });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.props.setLoggedIn(true)
      this.setState({
        user: localStorage.getItem("user", "birthday", "email"),
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
    this.props.setLoggedIn(true)
    const { Username, Email, Birthday, FavoriteMovies } = authData.user;
    this.setState({
      user: authData.user.Username,
      email: Email,
      birthday: Birthday,
      favoriteMovies: FavoriteMovies,
      username: Username,
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", Username);
    localStorage.setItem("birthday", Birthday);
    localStorage.setItem("email", Email);
    localStorage.setItem("favoriteMovies", FavoriteMovies);
    this.getMovies(authData.token);
    this.getTitleList(FavoriteMovies);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.props.setLoggedIn(false)
    this.setState({
      user: null,
    });
  }

  render() {
    const { user } = this.state;
    const { movies} = this.props;
    console.log("movies=", movies)
    return (
      <BrowserRouter>
        <Menubar user={user} />
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              if (!user) {
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              }
              if (movies.length === 0) return <div className="main-view"></div>;
              // return movies.map((m) => (
              //   <Col md={3} key={m._id}>
              //     <MovieCard movie={m} />
              //   </Col>
              // ));
              return <MoviesList />
            }}
          />
          <Route
            path="/register"
            render={() => {
              if (user) return <redirect to="/" />;
              return (
                <Col lg={8} md={8}>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          <Route
            exact
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            exact
            path="/genre/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    genreMovies={movies.filter(
                      (movie) => movie.Genre.Name === match.params.name
                    )}
                    genre={movies.find(
                      (m) => m.Genre.Name === match.params.name
                    )}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            exact
            path="/directors/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorsView
                    directorMovies={movies.filter(
                      (movie) => movie.Director.Name === match.params.name
                    )}
                    director={movies.find(
                      (m) => m.Director.Name === match.params.name
                  )}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path={`/users/${user}`}
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (!user) return <Redicrect to="/" />;
              return (
                <Col>
                  <ProfileView
                    movies={movies}
                    user={user}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path={`/user-update/${user}`}
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (!user) return <Redirect to="/" />;
              return (
                <Col>
                  <UserUpdate
                    user={user}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </BrowserRouter>
    );
  }
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
  }
}

export default connect(mapStateToProps, { setMovies, setLoggedIn })(MainView);
//connect method has two arguments
//in order to connect redux to the components, you say connect
//the first argument connects the reducers, the second connects the actions
//After the props method, you put the component
//second arguement IS mapDispatchToProps