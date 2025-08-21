import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Projects() {
  const projects = [
    {
      title: "Book Management App",
      description: "React app for managing books (CRUD features).",
      link: "#"
    },
    {
      title: "Wellness AI",
      description: "AI-powered healthcare project with chatbot & image recognition.",
      link: "#"
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio website built with React & Bootstrap.",
      link: "#"
    }
  ];

  return (
    <div className="py-5" id="projects">
      <Container>
        <h2 className="text-center mb-4 text-white">Projects</h2>
        <Row>
          {projects.map((project, index) => (
            <Col md={4} key={index}>
              <Card className="mb-4 shadow-sm" style={{ background: "rgba(255, 255, 255, 0.9)" }}>
                <Card.Body>
                  <Card.Title>{project.title}</Card.Title>
                  <Card.Text>{project.description}</Card.Text>
                  <Button variant="primary" href={project.link}>
                    View Project
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Projects;