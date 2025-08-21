import React from "react";
import { Container, Button } from "react-bootstrap";

function Hero() {
  return (
    <div className="text-center py-5" id="home">
      <Container>
        <h1 className="display-4 fw-bold text-white">Hi, I'm Lenin 👋</h1>
        <p className="lead text-white">AI & Data Science Student | Web Developer</p>
        <Button variant="primary" href="#projects" className="me-2">
          View My Work
        </Button>
        <Button variant="outline-light" href="#contact">
          Contact Me
        </Button>
      </Container>
    </div>
  );
}

export default Hero;