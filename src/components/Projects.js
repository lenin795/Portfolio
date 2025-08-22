import React, { useEffect, useRef } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import gsap from "gsap";

function Projects() {
  const projectRefs = useRef([]);

  useEffect(() => {
    projectRefs.current.forEach((ref, index) => {
      gsap.fromTo(
        ref,
        { 
          opacity: 0, 
          y: 60, 
          scale: 0.9, 
          rotation: -5 
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          delay: index * 0.3, // Staggered animation for each card
        }
      );
      // Hover animation for each card
      ref.addEventListener("mouseenter", () => {
        gsap.to(ref, {
          scale: 1.05,
          y: -10,
          duration: 0.3,
          ease: "power2.out",
        });
      });
      ref.addEventListener("mouseleave", () => {
        gsap.to(ref, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    // Cleanup event listeners on component unmount
    return () => {
      projectRefs.current.forEach((ref) => {
        ref.removeEventListener("mouseenter", () => {});
        ref.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current.push(el);
    }
  };

  return (
    <div className="py-5" id="projects">
      <Container>
        <h2 className="text-center mb-5 display-4 fw-bold text-white">
          My Projects
        </h2>
        <Row>
          <Col md={6} lg={4} className="mb-4">
            <Card ref={addToRefs} className="h-100 bg-dark text-white">
              <Card.Body>
                <Card.Title>📦 Courier Order Tracking System</Card.Title>
                <Card.Text>
                  A web app for placing and tracking courier orders with real-time
                  delivery status updates. Admins can manage orders through stages
                  like Picked Up, Transported, Delivered, and Returned.
                </Card.Text>
                <Card.Text>
                  <strong>Tech Stack:</strong> HTML, CSS, JavaScript (LocalStorage)
                </Card.Text>
                <Card.Text>
                  <strong>Key Features:</strong>
                  <ul>
                    <li>User dashboard for courier details.</li>
                    <li>Admin dashboard for order updates.</li>
                    <li>Real-time status tracking.</li>
                    <li>Persistent data with LocalStorage.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <Card ref={addToRefs} className="h-100 bg-dark text-white">
              <Card.Body>
                <Card.Title>📚 Book Management App</Card.Title>
                <Card.Text>
                  A React-based app for managing books with CRUD operations.
                  Includes versions with Firebase Firestore and local state
                  management.
                </Card.Text>
                <Card.Text>
                  <strong>Tech Stack:</strong> React.js, Firebase (Firestore),
                  Bootstrap
                </Card.Text>
                <Card.Text>
                  <strong>Key Features:</strong>
                  <ul>
                    <li>Add, edit, and delete books.</li>
                    <li>Real-time database sync with Firestore.</li>
                    <li>Responsive and clean UI.</li>
                    <li>Scalable code structure.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <Card ref={addToRefs} className="h-100 bg-dark text-white">
              <Card.Body>
                <Card.Title>🌐 Personal Portfolio Website</Card.Title>
                <Card.Text>
                  A personal portfolio showcasing projects, certifications, and
                  skills with modern UI and animations.
                </Card.Text>
                <Card.Text>
                  <strong>Tech Stack:</strong> React.js, Bootstrap, GSAP
                </Card.Text>
                <Card.Text>
                  <strong>Key Features:</strong>
                  <ul>
                    <li>Responsive single-page design.</li>
                    <li>GSAP animations for transitions.</li>
                    <li>Sections for projects, certifications, and contact.</li>
                    <li>Gradient text and scaling animations.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <Card ref={addToRefs} className="h-100 bg-dark text-white">
              <Card.Body>
                <Card.Title>☁ Weather App</Card.Title>
                <Card.Text>
                  A React-based weather dashboard providing live forecasts and
                  weather insights.
                </Card.Text>
                <Card.Text>
                  <strong>Tech Stack:</strong> React.js, OpenWeather API,
                  Bootstrap
                </Card.Text>
                <Card.Text>
                  <strong>Key Features:</strong>
                  <ul>
                    <li>Live weather updates for any city.</li>
                    <li>Interactive and responsive dashboard.</li>
                    <li>Displays temperature, humidity, and wind speed.</li>
                    <li>Real-time API integration.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <Card ref={addToRefs} className="h-100 bg-dark text-white">
              <Card.Body>
                <Card.Title>🧠 MindCMS (AI-Powered CMS)</Card.Title>
                <Card.Text>
                  An AI-powered CMS for automating content creation, SEO
                  optimization, and social media management.
                </Card.Text>
                <Card.Text>
                  <strong>Tech Stack:</strong> React.js / Vue.js, Node.js / C#,
                  OpenAI GPT, PostgreSQL / MongoDB, Redis, Docker, Kubernetes,
                  AWS/Azure
                </Card.Text>
                <Card.Text>
                  <strong>Key Features:</strong>
                  <ul>
                    <li>AI-generated articles and SEO metadata.</li>
                    <li>Automatic multi-platform publishing.</li>
                    <li>Analytics dashboard for content insights.</li>
                    <li>Scalable microservices architecture.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <Card ref={addToRefs} className="h-100 bg-dark text-white">
              <Card.Body>
                <Card.Title>🏥 Wellness AI Project</Card.Title>
                <Card.Text>
                  A healthcare AI system for wellness monitoring with image
                  recognition and chatbot assistance.
                </Card.Text>
                <Card.Text>
                  <strong>Tech Stack:</strong> Python, Streamlit, MERN stack,
                  AI/ML models
                </Card.Text>
                <Card.Text>
                  <strong>Key Features:</strong>
                  <ul>
                    <li>AI chatbot for health queries.</li>
                    <li>Image recognition for health analysis.</li>
                    <li>User-friendly Streamlit dashboard.</li>
                    <li>Scalable MERN stack backend.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Projects;