import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./login-view.scss";
import axios from "axios";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";
export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");



  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr(<span style={{ color: "red" }}>Username Required!</span>);
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr(
        <span style={{ color: "red" }}>
          Username must be 2 characters long!
        </span>
      );
      isReq = false;
    }
    if (!password) {
      setPasswordErr(<span style={{ color: "red" }}>Password Required!</span>);
      isReq = false;
    } else if (password.length < 6) {
      setPassword(
        <span style={{ color: "red" }}>
          Password must be 6 characters long!
        </span>
      );
      isReq = false;
    }

    return isReq;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */

    const isReq = validate();
    if (isReq) {
    axios
      .post("https://mykungfuflix.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log("no such user");
      });
    }
  };

  return (
    <Container className="registration" lg={4}>
      <Row>
        <Col className="d-flex justify-content-center">
          <CardGroup className="login-signup">
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">Login</Card.Title>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control
                      className="round-form"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      className="round-form"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>
                  <div className="d-grid gap-2">
                    <Button
                      className="d-flex justify-content-center"
                      variant="primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                  <p className="mt-5 text-center">
                    Don't have an account? <br />
                    <Button
                      className="mt-2 d-flex justify-content-center"
                      variant="primary"
                      as={Link}
                      to={"/register"}
                    >
                      Sign up
                    </Button>
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}
