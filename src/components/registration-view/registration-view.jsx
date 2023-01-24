import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Row, Col, Button, Form } from "react-bootstrap";
import config from '../../config.js'

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [values, setValues] = useState({
    nameErr: "",
    usernameErr: "",
    passwordErr: "",
    emailErr: "",
  });
  const validate = () => {
    let isReq = true;
        if (!username) {
          console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      setValues({ ...values, usernameErr: "Username Required" });
      isReq = false;
    } else if (username.length < 5) {
      setValues({
        ...values,
        usernameErr: "Username must be 5 characters long",
      });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, PasswordErr: "Password Required" });
      isReq = falese;
    } else if (password.length < 6) {
      setValues({
        ...values,
        passwordErr: "password must be 6 characters long",
      });
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: "Email Required" });
      isReq = False;
    } else if (email.indexOf("@") === -1) {
      setValues({ ...values, emailErr: "Email is invalid" });
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    const isReq = validate();
    if (isReq) {
      axios
        .post(`${config.API_ROOT}/users"`, {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("Registration successful, please login!");
          window.open("/", "_self");
        })
        .catch((response) => {
          console.error(response);
          alert("unable to register");
        });
    }
  };

  return (
    <Row className="mt-5">
      <Col md={12}>
        <Form>
          <h1>Registration</h1>
          <Form.Group>
          <Form.Label>
            Username:
            </Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {values.usernameErr && <p>{values.usernameErr}</p>}
            </Form.Group>
          <Form.Group>
          <Form.Label>
            Password:
            </Form.Label>

            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {values.passwordErr && <p>{values.passwordErr}</p>}
            </Form.Group>
            <Form.Group>
          <Form.Label>
            Email:
            </Form.Label>

            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {values.emailErr && <p>{values.emailErr}</p>}
            </Form.Group>
            <Form.Group>
          <Form.Label>
            Birthday:
            </Form.Label>
            <Form.Control
              type="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
            </Form.Group>
          <Button variant='primary' type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Name:PropTypes.string.isRequired,
    Username:PropTypes.string.isRequired,
    Password:PropTypes.string.isRequired,
    Email:PropTypes.string.isRequired}),
};
