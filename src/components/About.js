import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function About() {
  return (
    <div className="py-5" id="about">
      <Container>
        <Row className="align-items-center" style={{ padding: "20px" }}>
          <Col md={6} className="text-center">
            <img
              src="/lenin.jpg"
              alt="Lenin"
              className="profile-img rounded-circle"
              style={{ width: "200px", height: "200px" }}
            />
          </Col>
          <Col md={6}>
            <h2 className="mb-3 text-white">About Me</h2>
            <p className="text-white">
              I'm Lenin, an AI & Data Science student passionate about building
              smart solutions with web technologies, machine learning, and AI.
            </p>
            <p className="text-white">
              Skilled in React, Python, and Data Science. I enjoy solving
              real-world problems with code 🚀.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;