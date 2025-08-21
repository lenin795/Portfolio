import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function AppNavbar() {
  return (
    <Navbar bg="transparent" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#home" className="text-white">Lenin's Portfolio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#about" className="text-white">About</Nav.Link>
            <Nav.Link href="#projects" className="text-white">Projects</Nav.Link>
            <Nav.Link href="#skills" className="text-white">Skills</Nav.Link>
            <Nav.Link href="#certifications" className="text-white">Certifications</Nav.Link>
            <Nav.Link href="#contact" className="text-white">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;