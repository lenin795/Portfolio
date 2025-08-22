import React, { useEffect, useRef } from "react";
import { Container, Button } from "react-bootstrap";
import gsap from "gsap";

function Hero() {
  const nameRef = useRef(null);

  useEffect(() => {
    // Create a timeline for sequenced animations
    const tl = gsap.timeline();

    // Initial bounce-in animation with gradient sparkle
    tl.fromTo(
      nameRef.current,
      { 
        scale: 0.3,
        opacity: 0,
        y: 100,
        rotationX: -30,
        filter: "blur(5px)"
      },
      {
        scale: 1.2,
        opacity: 1,
        y: 0,
        rotationX: 0,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "bounce.out",
      }
    )
    // Scale down to normal size
    .to(nameRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    })
    // Continuous pulsing with moving effect
    .to(nameRef.current, {
      scale: 1.05,
      x: 10, // Subtle horizontal drift
      y: -5, // Slight upward float
      rotation: 2, // Tiny rotation for organic feel
      repeat: -1,
      yoyo: true,
      duration: 2.5,
      ease: "sine.inOut",
    });

    // Gradient animation for continuous color shift
    gsap.to(nameRef.current, {
      backgroundPosition: "200% 0",
      duration: 4,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  return (
    <div className="text-center py-5" id="home">
      <Container>
        <h1 
          ref={nameRef} 
          className="display-4 fw-bold gradient-text"
          style={{
            background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96c93d)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block" // Ensures transform works correctly
          }}
        >
          Hi, I'm Lenin 
        </h1>
        <p className="lead text-white">
          AI & Data Science Student | Web Developer
        </p>
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