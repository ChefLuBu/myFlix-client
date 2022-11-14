import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "./navbar.scss"; 
import { propTypes } from "react-bootstrap/esm/Image";
import { connect } from "react-redux";


function Menubar(props) {
const {user} = props
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar
      className="main-nav"
      sticky="top"
      bg="dark"
      expand="large"
      variant="dark"
    >
      <Container>
        <Navbar.Brand className="navbar-logo" to="/" as={Link} >
         <img src={"/img/logo.png"} />
          {/* Kung Fu Flix */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && <Nav.Link to={`/users/${user}`} as={Link}>Profile</Nav.Link>}
            {isAuth() && (
           
              <Button className="dropdown-button"
                onClick={() => {
                  onLoggedOut();
                }}
              >
                Logout
              </Button>
            )}
            {!isAuth() && <Nav.Link to="/" as={Link}>Sign-in</Nav.Link>}
            {!isAuth() && <Nav.Link to="/register" as={Link}>Sign-up</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
      
    </Navbar>
  );
}

const mapStateToProps = state => {
  const { loggedIn } = state;
  return { loggedIn };
};

export default connect(mapStateToProps)(Menubar);