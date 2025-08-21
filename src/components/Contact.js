import React from "react";
import { Container, Form, Button } from "react-bootstrap";

function Contact() {
  return (
    <div className="py-5" id="contact">
      <Container>
        <h2 className="text-center mb-4 text-white">Contact Me</h2>
        <Form className="mx-auto" style={{ maxWidth: "600px", background: "rgba(255, 255, 255, 0.8)", padding: "20px", borderRadius: "8px" }}>
          <Form.Group className="mb-3">
            <Form.Label className="text-dark">Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" className="text-dark" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-dark">Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" className="text-dark" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-dark">Message</Form.Label>
            <Form.Control as="textarea" rows={4} placeholder="Your message" className="text-dark" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Send Message
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Contact;