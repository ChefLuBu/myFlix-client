import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "./navbar.scss";

export function Menubar({ user }) {
  // const NavBar = (props) => {
  //     return (<div>
  //         <Link to={"/"} ><h1>Kung Fu Flix</h1></Link>
  //     </div>
  //     );
  // }

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
        <Navbar.Brand className="navbar-logo" href="/">
          Kung Fu Flix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && <Nav.Link href={`/users/${user}`}></Nav.Link>}
            {isAuth() && (
              <Button
                Variant="link"
                onClick={() => {
                  this.onLoggedOut();
                }}
              >
                Logout
              </Button>
            )}
            {!isAuth() && <Nav.Link href="/">Sign-in</Nav.Link>}
            {!isAuth() && <Nav.Link herf="/register">Sign-up</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
