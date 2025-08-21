import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Skills() {
  const skills = [
    "React",
    "Python",
    "JavaScript",
    "MongoDB",
    "Data Science",
    "Machine Learning",
  ];

  return (
    <div className="py-5" id="skills">
      <Container>
        <h2 className="text-center mb-4 text-white">Skills</h2>
        <Row>
          {skills.map((skill, index) => (
            <Col md={4} key={index} className="mb-3">
              <div className="p-3 text-center" style={{ background: "rgba(255, 255, 255, 0.9)", borderRadius: "8px" }}>
                {skill}
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Skills;