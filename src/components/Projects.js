import React, { useEffect, useRef, useState } from "react";

function Projects() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const projectRefs = useRef([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedProjects, setAnimatedProjects] = useState(new Set());

  // Enhanced intersection observer for multiple elements
  useEffect(() => {
    const observers = [];
    
    // Observer for title animation
    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateTitle();
        }
      },
      { threshold: 0.3 }
    );

    // Observer for individual project cards
    const projectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectIndex = parseInt(entry.target.dataset.index);
            animateProject(entry.target, projectIndex);
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before fully visible
      }
    );

    // Observe title
    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
      observers.push(titleObserver);
    }

    // Observe project cards
    projectRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.index = index;
        projectObserver.observe(ref);
      }
    });
    observers.push(projectObserver);

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // Enhanced title animation
  const animateTitle = () => {
    if (titleRef.current) {
      titleRef.current.style.transform = 'translateY(0) scale(1)';
      titleRef.current.style.opacity = '1';
      titleRef.current.style.filter = 'blur(0px)';
      
      // Add subtle bounce effect
      setTimeout(() => {
        titleRef.current.style.transform = 'translateY(0) scale(1.05)';
        setTimeout(() => {
          titleRef.current.style.transform = 'translateY(0) scale(1)';
        }, 150);
      }, 300);
    }
  };

  // Enhanced project card animation with rotating effects
  const animateProject = (element, index) => {
    if (animatedProjects.has(index)) return;
    
    setTimeout(() => {
      element.classList.add('animate-in', 'rotateInWithBounce');
      element.style.opacity = '1';
      setAnimatedProjects(prev => new Set([...prev, index]));
    }, index * 200); // Staggered delay
  };

  const addToRefs = (el) => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current.push(el);
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const projects = [
    {
      id: 1,
      title: "Courier Tracking System",
      icon: "📦",
      description: "Real-time courier order tracking with admin management",
      tech: ["HTML", "CSS", "JavaScript"],
      color: "from-blue-500 to-purple-600",
      features: ["User Dashboard", "Admin Panel", "Real-time Tracking"],
      bgColor: "#3b82f6, #8b5cf6"
    },
    {
      id: 2,
      title: "Book Management App",
      icon: "📚",
      description: "CRUD operations with Firebase integration",
      tech: ["React", "Firebase", "Bootstrap"],
      color: "from-green-500 to-teal-600",
      features: ["CRUD Operations", "Real-time Sync", "Responsive UI"],
      bgColor: "#10b981, #06b6d4"
    },
    
    {
      id: 4,
      title: "Weather Dashboard",
      icon: "☁️",
      description: "Live weather forecasts with interactive dashboard",
      tech: ["React", "OpenWeather API", "Bootstrap"],
      color: "from-yellow-400 to-orange-500",
      features: ["Live Updates", "City Search", "Weather Insights"],
      bgColor: "#f59e0b, #f97316"
    }
  ];

  const containerStyle = {
    padding: '80px 0',
    backgroundColor: 'transparent',
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden'
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '60px',
    color: 'white',
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    transform: 'translateY(50px) scale(0.8)',
    opacity: 0,
    filter: 'blur(5px)',
    transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  };

  const projectCardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '24px',
    border: '2px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    padding: '40px 30px',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: 0,
    minHeight: '320px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    willChange: 'transform, opacity',
    transformStyle: 'preserve-3d'
  };

  const floatingElementsStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    overflow: 'hidden'
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    backdropFilter: 'blur(15px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: selectedProject ? 1 : 0,
    visibility: selectedProject ? 'visible' : 'hidden',
    transition: 'all 0.4s ease'
  };

  const modalContentStyle = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    borderRadius: '24px',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(20px)',
    padding: '40px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '80vh',
    overflow: 'auto',
    transform: selectedProject ? 'scale(1) rotateY(0deg)' : 'scale(0.8) rotateY(90deg)',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  return (
    <div style={containerStyle} id="projects" ref={containerRef}>
      {/* Enhanced floating background elements with rotation */}
      <div style={floatingElementsStyle}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="floating-element"
            style={{
              position: 'absolute',
              width: `${Math.random() * 100 + 30}px`,
              height: `${Math.random() * 100 + 30}px`,
              background: `linear-gradient(45deg, rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1) 0%, transparent 70%)`,
              borderRadius: Math.random() > 0.5 ? '50%' : '20%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: `blur(${Math.random() * 2}px)`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Animated title */}
      <h2 ref={titleRef} style={titleStyle}>My Projects</h2>

      {/* Projects grid */}
      <div style={gridStyle}>
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={addToRefs}
            style={projectCardStyle}
            className="project-card"
            onClick={() => handleProjectClick(project)}
          >
            {/* Enhanced gradient overlay with rotation */}
            <div 
              className="gradient-overlay"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '22px',
                opacity: 0.15,
                background: `linear-gradient(135deg, ${project.bgColor})`,
                zIndex: 0
              }}
            />
            
            {/* Rotating decorative ring */}
            <div 
              className="rotating-ring"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '200px',
                height: '200px',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
                opacity: 0.3
              }}
            />
            
            {/* Inner rotating element */}
            <div 
              className="rotating-inner"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '60px',
                height: '60px',
                background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                borderRadius: '50%',
                zIndex: 1,
                opacity: 0.5
              }}
            />
            
            {/* Content */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div 
                className="project-icon"
                style={{ 
                  fontSize: '4rem',
                  marginBottom: '20px',
                  textAlign: 'center',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                }}
              >
                {project.icon}
              </div>
              <h3 style={{
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '15px',
                textAlign: 'center',
                letterSpacing: '0.5px'
              }}>
                {project.title}
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1rem',
                lineHeight: '1.6',
                marginBottom: '25px',
                textAlign: 'center'
              }}>
                {project.description}
              </p>
            </div>

            {/* Tech stack */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
              marginBottom: '20px',
              position: 'relative',
              zIndex: 2
            }}>
              {project.tech.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="tech-badge"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    transform: `translateY(${techIndex * 2}px)`,
                    animationDelay: `${techIndex * 0.1}s`
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Enhanced view details button */}
            <div style={{
              textAlign: 'center',
              position: 'relative',
              zIndex: 2
            }}>
              <button 
                className="details-button"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '25px',
                  color: 'white',
                  padding: '12px 24px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.4s ease',
                  letterSpacing: '0.5px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                View Details →
              </button>
            </div>

            {/* Multiple rotating decorative elements */}
            <div 
              className="rotating-corner-element"
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                width: '30px',
                height: '30px',
                background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.15), transparent)',
                borderRadius: '50%',
                opacity: 0.3,
                zIndex: 1
              }}
            />
          </div>
        ))}
      </div>

      {/* Enhanced Modal */}
      <div style={modalOverlayStyle} onClick={() => setSelectedProject(null)}>
        <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
          {selectedProject && (
            <>
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div 
                  className="modal-icon-rotate"
                  style={{ 
                    fontSize: '3rem', 
                    marginBottom: '15px'
                  }}
                >
                  {selectedProject.icon}
                </div>
                <h2 style={{
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: '700',
                  marginBottom: '10px'
                }}>
                  {selectedProject.title}
                </h2>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '1.1rem',
                  lineHeight: '1.6'
                }}>
                  {selectedProject.description}
                </p>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <h4 style={{ color: 'white', marginBottom: '15px', fontSize: '1.2rem' }}>
                  Key Features:
                </h4>
                <ul style={{ color: 'rgba(255, 255, 255, 0.9)', paddingLeft: '20px' }}>
                  {selectedProject.features.map((feature, index) => (
                    <li key={index} style={{ 
                      marginBottom: '8px', 
                      fontSize: '1rem',
                      animation: `fadeInList 0.5s ease forwards ${index * 0.1}s`,
                      opacity: 0
                    }}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                marginBottom: '30px'
              }}>
                <span style={{ color: 'white', fontWeight: '600', marginRight: '10px' }}>
                  Tech Stack:
                </span>
                {selectedProject.tech.map((tech, index) => (
                  <span
                    key={index}
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      animation: `techFadeIn 0.6s ease forwards ${index * 0.1}s`,
                      opacity: 0
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={() => setSelectedProject(null)}
                  style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    border: 'none',
                    borderRadius: '25px',
                    color: 'white',
                    padding: '12px 30px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Enhanced CSS Animations with Rotating Effects */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Floating elements with 3D rotation */
          .floating-element {
            animation: float3D 6s ease-in-out infinite;
          }
          
          @keyframes float3D {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg) rotateY(0deg) scale(1); 
            }
            25% { 
              transform: translateY(-15px) rotate(90deg) rotateY(90deg) scale(1.05); 
            }
            50% { 
              transform: translateY(-25px) rotate(180deg) rotateY(180deg) scale(0.95); 
            }
            75% { 
              transform: translateY(-15px) rotate(270deg) rotateY(270deg) scale(1.05); 
            }
          }
          
          /* Project card entrance with rotation */
          .animate-in.rotateInWithBounce {
            animation: rotateInWithBounce 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }

          @keyframes rotateInWithBounce {
            0% {
              transform: rotate(-180deg) scale(0.3) rotateY(90deg);
              opacity: 0;
            }
            60% {
              transform: rotate(20deg) scale(1.1) rotateY(0deg);
              opacity: 0.9;
            }
            80% {
              transform: rotate(-5deg) scale(0.95) rotateY(0deg);
              opacity: 1;
            }
            100% {
              transform: rotate(0deg) scale(1) rotateY(0deg);
              opacity: 1;
            }
          }

          /* Continuous rotating elements */
          .rotating-ring {
            animation: rotate360 8s linear infinite;
          }
          
          .rotating-inner {
            animation: rotateCounterClockwise 6s linear infinite;
          }
          
          .rotating-corner-element {
            animation: rotate360 4s linear infinite;
          }

          @keyframes rotate360 {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }

          @keyframes rotateCounterClockwise {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }

          /* Project card hover effects with 3D rotation */
          .project-card {
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .project-card:hover {
            transform: translateY(-15px) scale(1.03) rotateX(5deg) rotateY(2deg) !important;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3) !important;
            border-color: rgba(255, 255, 255, 0.3) !important;
          }
          
          .project-card:hover .rotating-ring {
            animation-duration: 2s;
            opacity: 0.6;
          }
          
          .project-card:hover .rotating-inner {
            animation-duration: 1.5s;
            opacity: 0.8;
            transform: scale(1.2);
          }
          
          .project-card:hover .project-icon {
            animation: iconRotateBounce 0.8s ease-out;
          }

          @keyframes iconRotateBounce {
            0% { transform: rotateY(0deg) scale(1); }
            25% { transform: rotateY(90deg) scale(1.1); }
            50% { transform: rotateY(180deg) scale(1.2); }
            75% { transform: rotateY(270deg) scale(1.1); }
            100% { transform: rotateY(360deg) scale(1); }
          }

          /* Tech badges rotation on hover */
          .tech-badge:hover {
            transform: rotate(5deg) scale(1.1) !important;
            background: rgba(255, 255, 255, 0.25) !important;
          }

          /* Button rotation effect */
          .details-button:hover {
            transform: translateY(-3px) scale(1.05) rotate(2deg) !important;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2)) !important;
            box-shadow: 0 10px 25px rgba(255, 255, 255, 0.2) !important;
          }

          /* Modal icon rotation */
          .modal-icon-rotate {
            animation: modalIconSpinBounce 1.5s ease-out;
          }

          @keyframes modalIconSpinBounce {
            0% {
              transform: scale(0) rotate(0deg);
              opacity: 0;
            }
            50% {
              transform: scale(1.3) rotate(180deg);
              opacity: 0.8;
            }
            70% {
              transform: scale(0.9) rotate(270deg);
              opacity: 1;
            }
            100% {
              transform: scale(1) rotate(360deg);
              opacity: 1;
            }
          }

          /* List and tech stack animations remain the same */
          @keyframes fadeInList {
            from {
              transform: translateX(-20px) rotate(-2deg);
              opacity: 0;
            }
            to {
              transform: translateX(0) rotate(0deg);
              opacity: 1;
            }
          }

          @keyframes techFadeIn {
            from {
              transform: translateY(20px) scale(0.8) rotate(-5deg);
              opacity: 0;
            }
            to {
              transform: translateY(0) scale(1) rotate(0deg);
              opacity: 1;
            }
          }

          /* Enhanced gradient overlay rotation */
          .gradient-overlay {
            animation: gradientRotate 12s linear infinite;
          }

          @keyframes gradientRotate {
            0% { 
              background: linear-gradient(0deg, var(--bg-colors));
              opacity: 0.15;
            }
            25% { 
              background: linear-gradient(90deg, var(--bg-colors));
              opacity: 0.2;
            }
            50% { 
              background: linear-gradient(180deg, var(--bg-colors));
              opacity: 0.15;
            }
            75% { 
              background: linear-gradient(270deg, var(--bg-colors));
              opacity: 0.2;
            }
            100% { 
              background: linear-gradient(360deg, var(--bg-colors));
              opacity: 0.15;
            }
          }
          
          .project-card {
            will-change: transform, box-shadow, border-color, opacity;
          }
        `
      }} />
    </div>
  );
}

export default Projects;