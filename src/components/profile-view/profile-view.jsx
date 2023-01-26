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
import moment from "moment";
import { Link } from "react-router-dom";
import "./profile-view.scss";
import config from '../../config.js'



export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      favoriteMovies: [],
    };
  }

  componentDidMount() {
    this.getUser();
    console.log("this.props", this.props)
  }

  getUser = () => {
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
      axios
      .get(`${config.API_ROOT}/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          favoriteMovies: response.data.favoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error)
      });
  };

  updateUser = (e) => {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .put(
        `${config.API_ROOT}/users/${username}`,
        {
          username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        alert("Profile was successfully updated");
        this.setState({
          username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday
        });
        localStorage.setItem("user", data.Username);
console.log(data)
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
          `${config.API_ROOT}/users/${username}`,
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
        .catch((error) => {
          console.log(error);
        });
    }
  };
  removeFavoriteMovie = (movieId) => {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .delete(
        `${config.API_ROOT}/users/${username}/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert("Movie was removed");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  setUsername(value) {
    this.setState({
      Username: value,
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

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
  }

  render() {
    const { movies, user } = this.props;
    const { favoriteMovies, Email, Birthday } = this.state;

    const favoriteMovie = favoriteMovies.map((movieId) =>
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
                  Birthday: {moment(Birthday).format("Do MMMM YYYY")}
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
                    placeholder={this.state.Username}
                    onSubmit={(e) => this.setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className='mb-4' controlId='formPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='text'
                    name='Password'
                    placeholder='New Password'
                    onSubmit={(e) => this.setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className='mb-4' controlId='formEmail'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='text'
                    name='Email'
                    placeholder={this.state.Email}
                    onSubmit={(e) => this.setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className='mb-4' controlId='formBirthday'>
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type='text'
                    name='Birthday'
                    placeholder={this.state.Birthday}
                    onSubmit={(e) => this.setBirthday(e.target.value)}
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
              <h4>Favorite Movies</h4>
            </Col>

            <Row>
              {favoriteMovie.map((movie) => (
                <Col lg={3} md={6} key={movie._id}>
                  <Figure className='fav-movie mb-4'>
                    <Link to={`/movies/${movie._id}`}>
                      <Figure.Image
                        src={movie.imgUrl}
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


