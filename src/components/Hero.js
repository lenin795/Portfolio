import React, { useEffect, useRef, useState } from "react";
import { Container, Button } from "react-bootstrap";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

function Hero() {
  const nameRef = useRef(null);
  const heroRef = useRef(null);
  const avatarRef = useRef(null);
  const buttonRef = useRef(null);
  const roleRef = useRef(null);
  const particlesRef = useRef([]);
  const [currentRole, setCurrentRole] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const roles = [
    
    "Full Stack Developer",
    "MERN Stack Developer", 
    "Problem Solver",
    "Tech Enthusiast"
  ];

  useEffect(() => {
    // Check if mobile
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    // Role rotation with typing effect
    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => {
        const next = (prev + 1) % roles.length;
        gsap.to(roleRef.current, {
          duration: 0.5,
          opacity: 0,
          onComplete: () => {
            gsap.to(roleRef.current, {
              text: roles[next],
              duration: 1,
              opacity: 1,
              ease: "none",
              onStart: () => {
                if (roleRef.current) roleRef.current.textContent = "";
              }
            });
          }
        });
        return next;
      });
    }, 3000);

    // Create floating particles
    const createParticles = () => {
      for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 4 + 2}px;
          height: ${Math.random() * 4 + 2}px;
          background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: 100%;
          pointer-events: none;
          z-index: 1;
        `;
        heroRef.current.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.to(particle, {
          y: -window.innerHeight - 100,
          x: `+=${Math.random() * 200 - 100}`,
          rotation: 360,
          duration: Math.random() * 15 + 10,
          repeat: -1,
          ease: "none",
          delay: Math.random() * 5
        });
      }
    };

    // Main animations timeline
    const tl = gsap.timeline({ delay: 0.5 });

    // Avatar floating animation
    gsap.to(avatarRef.current, {
      y: -20,
      rotation: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Name typing animation
    tl.fromTo(
      nameRef.current,
      {
        opacity: 0,
        text: "",
      },
      {
        text: "Hi, I'm LENIN",
        opacity: 1,
        duration: 2,
        ease: "none",
        onStart: () => {
          if (nameRef.current) nameRef.current.textContent = "";
        }
      }
    );

    // Initial role typing animation
    gsap.fromTo(
      roleRef.current,
      {
        opacity: 0,
        text: ""
      },
      {
        text: roles[0],
        opacity: 1,
        duration: 1,
        ease: "none",
        onStart: () => {
          if (roleRef.current) roleRef.current.textContent = "";
        }
      }
    );

    createParticles();

    return () => {
      clearInterval(roleInterval);
      window.removeEventListener('resize', handleResize);
      particlesRef.current.forEach(particle => {
        if (particle.parentNode) particle.parentNode.removeChild(particle);
      });
    };
  }, []);

  // Mouse move 3D tilt effect
  const handleMouseMove = (e) => {
    if (isMobile) return;
    
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const xRotation = ((clientY / innerHeight) - 0.5) * 10;
    const yRotation = ((clientX / innerWidth) - 0.5) * -10;
    
    gsap.to(heroRef.current, {
      rotationX: xRotation,
      rotationY: yRotation,
      duration: 0.5,
      transformPerspective: 1000,
      transformOrigin: "center center"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(heroRef.current, { 
      rotationX: 0, 
      rotationY: 0, 
      duration: 0.5 
    });
  };

  // Magnetic button effect
  const handleButtonMouseMove = (e) => {
    if (isMobile) return;
    
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleButtonMouseLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  };

  const heroStyles = {
    minHeight: '100vh',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    overflow: 'hidden',
    padding: isMobile ? '60px 0' : '80px 0'
  };

  const avatarStyle = {
    width: isMobile ? '100px' : '120px',
    height: isMobile ? '100px' : '120px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgb(16, 9, 35) 0%, #764ba2 100%)',
    border: '3px solid rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: isMobile ? '3.5rem' : '4.5rem',
    fontWeight: '900',
    fontFamily: 'Arial, sans-serif',
    color: '#ffffff',
    textShadow: '0 4px 15px rgba(0,0,0,0.4)',
    margin: '0 auto 2rem',
    boxShadow: '0 20px 40px rgba(16, 9, 35, 0.3), 0 0 60px rgba(118, 75, 162, 0.2)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    letterSpacing: '-2px',
    backdropFilter: 'blur(10px)'
  };

  const nameStyle = {
    color: 'rgba(255, 255, 255, 0.9)',
    display: "inline-block",
    fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : 'clamp(2.5rem, 8vw, 5rem)',
    fontWeight: '800',
    lineHeight: '1.1',
    marginBottom: '1rem',
    textShadow: '0 0 30px rgba(102, 126, 234, 0.3)'
  };

  const subtitleStyle = {
    fontSize: isMobile ? '1.2rem' : 'clamp(1.2rem, 3vw, 1.8rem)',
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '300',
    marginBottom: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    minHeight: '2rem',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
  };

  const buttonStyle = {
    background: "linear-gradient(135deg, rgb(16, 9, 35) 0%, #764ba2 100%)",
    border: "none",
    padding: "12px 30px",
    borderRadius: "30px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "1px",
    boxShadow: "0 10px 30px rgba(16, 9, 35, 0.4)",
    transition: "all 0.3s ease"
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .particle {
          animation: float 20s infinite linear;
        }
        
        .scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          color: white;
          cursor: pointer;
          z-index: 10;
        }
        
        .scroll-line {
          width: 2px;
          height: 30px;
          background: rgba(255,255,255,0.3);
          position: relative;
          overflow: hidden;
          margin-top: 10px;
        }
        
        .scroll-line::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          animation: scroll-move 2s infinite;
        }
        
        @keyframes scroll-move {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        .magnetic-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        }
      `}</style>
      
      <div 
        ref={heroRef}
        className="text-center"
        id="home"
        style={heroStyles}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Container style={{ position: 'relative', zIndex: 2 }}>
          {/* Floating Avatar with L */}
          <div 
            ref={avatarRef} 
            style={avatarStyle}
            onMouseEnter={(e) => {
              gsap.to(e.target, { scale: 1.1, duration: 0.3 });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.target, { scale: 1, duration: 0.3 });
            }}
          >
            L
          </div>

          {/* Main Name with Typing Effect */}
          <h1 
            ref={nameRef} 
            className="display-4 fw-bold"
            style={nameStyle}
          >
          </h1>

          {/* Rotating Subtitle with Typing Effect */}
          <p ref={roleRef} className="lead" style={subtitleStyle}>
          </p>

          {/* Description */}
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: isMobile ? '1rem' : '1.1rem',
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            lineHeight: '1.6',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
          }}>
            Skilled in Java, and MERN Stack. I enjoy solving
            real-world problems with code 🚀
          </p>

          {/* Enhanced Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            <Button 
              ref={buttonRef}
              variant="primary" 
              href="#projects" 
              className="me-2 magnetic-btn"
              style={buttonStyle}
              onMouseMove={handleButtonMouseMove}
              onMouseLeave={handleButtonMouseLeave}
            >
              View My Work
            </Button>
            <Button 
              variant="outline-light" 
              href="#contact"
              style={{
                borderRadius: "30px",
                padding: "12px 30px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "1px",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255,255,255,0.2)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255,255,255,0.1)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Contact Me
            </Button>
          </div>
        </Container>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <span style={{ fontSize: '0.8rem', marginBottom: '10px' }}>Scroll Down</span>
          <div className="scroll-line"></div>
        </div>
      </div>
    </>
  );
}

export default Hero;