import React from "react";
import axios from "axios";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Figure,
} from "react-bootstrap";
// import moment from "moment";
import { Link } from "react-router-dom";
import "./profile-view.scss";
// import { connect } from "react-redux";
// import { setUser, setMovies } from "../../actions/actions";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavouriteMovies: [],
    };
  }

  componentDidMount() {
    this.getUser();
    console.log("this.props", this.props);
  }

  getUser = () => {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .get(`https://lamptissue-movie-flix.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          username: response.data.username,
          Password: response.data.password,
          Email: response.data.email,
          Birthday: response.data.Birthday,
          FavouriteMovies: response.data.FavouriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  updateUser = (e) => {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .put(
        `https://lamptissue-movie-flix.herokuapp.com/users/${username}`,
        {
          username: this.state.username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log("response", response);
        alert("Profile was successfully updated");
        this.setState({
          username: response.data.username,
          Password: response.data.password,
          Email: response.data.email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem("user", data.username);

        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  deleteUser = (e) => {
    const confirmDelete = window.confirm("Confirm to remove");

    if (confirmDelete) {
      const username = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      axios
        .delete(
          `https://lamptissue-movie-flix.herokuapp.com/users/${username}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          alert("Profile successfully deleted");
          window.location.pathname = "/";
        })
        .catch((e) => {
          console.log(error);
        });
    }
  };
  removeFavoriteMovie = (movieId) => {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .delete(
        `https://lamptissue-movie-flix.herokuapp.com/users/${username}/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert("Movie was removed");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  setUsername(value) {
    this.setState({
      username: value,
    });
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
  }

  setBirth(value) {
    this.setState({
      Birthday: value,
    });
  }

  render() {
    const { movies, user } = this.props;
    const { FavouriteMovies, Email, Birthday } = this.state;

    const favoriteMovie = FavouriteMovies.map((movieId) =>
      movies.find((movie) => movie._id === movieId)
    );

    return (
      <Container>
        <Row>
          <Col lg={5} className='mb-4'>
            <h4>Your Account</h4>
            <Card>
              <Card.Body>
                <Card.Text>Username: {user}</Card.Text>
                <Card.Text>Email: {Email}</Card.Text>
                <Card.Text>
                  {/* Birthday: {moment(Birthday).format("Do MMMM YYYY")} */}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={7} className='mb-5'>
            <h4>Update your details</h4>

            <Card>
              <Form className='p-4'>
                <Form.Group className='mb-3' controlId='formUsername'>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type='text'
                    name='Username'
                    placeholder={this.state.username}
                    onChange={(e) => this.setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className='mb-4' controlId='formPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    name='Password'
                    placeholder='New Password'
                    onChange={(e) => this.setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className='mb-4' controlId='formEmail'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    name='Email'
                    placeholder={this.state.Email}
                    onChange={(e) => this.setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className='mb-4' controlId='formBirth'>
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type='date'
                    name='Birth'
                    placeholder={this.state.Birth}
                    onChange={(e) => this.setBirth(e.target.value)}
                  />
                </Form.Group>
                <div className='d-flex justify-content-between'>
                  <Button
                    variant='primary'
                    type='submit'
                    onClick={this.updateUser}
                  >
                    Update Profile
                  </Button>{" "}
                  <Button
                    variant='outline-danger'
                    type='submit'
                    onClick={this.deleteUser}
                  >
                    Delete Profile
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
        <>
          <Row>
            <Col>
              <h4>Favourite Movies</h4>
            </Col>

            <Row>
              {favoriteMovie.map((movie) => (
                <Col lg={3} md={6} key={movie._id}>
                  <Figure className='fav-movie mb-4'>
                    <Link to={`/movies/${movie._id}`}>
                      <Figure.Image
                        src={movie.ImagePath}
                        alt={movie.Title}
                      ></Figure.Image>
                      <Figure.Caption className='mb-3'>
                        {movie.Title}
                      </Figure.Caption>
                    </Link>

                    <Button
                      variant='secondary'
                      onClick={() => {
                        this.removeFavoriteMovie(movie._id);
                      }}
                    >
                      Remove
                    </Button>
                  </Figure>
                </Col>
              ))}
            </Row>
          </Row>
        </>
      </Container>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    user: state.user,
    movies: state.movies,
  };
};

