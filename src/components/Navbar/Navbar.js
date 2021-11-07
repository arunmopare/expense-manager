import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from "@auth0/auth0-react";

const NavigationBar = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    <Navbar bg="primary" lassName="danger" expand="lg">
      <Container>
        <Navbar.Brand style={{ color: "white" }} href="#home">
          Expense Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && (
              <>
                <Nav.Link>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/add-new"
                  >
                    Add Expense
                  </Link>
                </Nav.Link>

                <Nav.Link style={{ textDecoration: "none", color: "white" }}>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/my-profile"
                  >
                    My Profile
                  </Link>
                </Nav.Link>

                <Nav.Link
                  style={{ textDecoration: "none", color: "white" }}
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </Nav.Link>
              </>
            )}
            {!isAuthenticated && (
              <Nav.Link style={{ textDecoration: "none", color: "white" }}>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/login"
                >
                  Login
                </Link>
              </Nav.Link>
            )}
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavigationBar;
