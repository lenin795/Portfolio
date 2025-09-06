import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function AppNavbar() {
  return (
    <Navbar 
      expand="lg" 
      sticky="top"
      style={{
        background: 'rgba(0, 0, 0, 0.3)', // Semi-transparent over galaxy
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        zIndex: 1000 // Ensure it stays above background
      }}
      variant="dark"
    >
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
