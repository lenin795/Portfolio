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

  // Enhanced project card animation with different effects
  const animateProject = (element, index) => {
    if (animatedProjects.has(index)) return;
    
    const animationTypes = [
      'slideInLeft',
      'slideInRight', 
      'fadeInUp',
      'rotateIn'
    ];
    
    const animationType = animationTypes[index % animationTypes.length];
    
    setTimeout(() => {
      element.classList.add('animate-in', animationType);
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
      id: 3,
      title: "Portfolio Website",
      icon: "🌐",
      description: "Modern portfolio with animations and responsive design",
      tech: ["React", "GSAP", "Bootstrap"],
      color: "from-pink-500 to-rose-600",
      features: ["Responsive Design", "GSAP Animations", "Modern UI"],
      bgColor: "#ec4899, #f43f5e"
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
    willChange: 'transform, opacity'
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
      {/* Enhanced floating background elements */}
      <div style={floatingElementsStyle}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${Math.random() * 100 + 30}px`,
              height: `${Math.random() * 100 + 30}px`,
              background: `linear-gradient(45deg, rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1) 0%, transparent 70%)`,
              borderRadius: Math.random() > 0.5 ? '50%' : '20%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 6}s ease-in-out infinite ${Math.random() * 2}s`,
              filter: `blur(${Math.random() * 2}px)`,
              transform: `rotate(${Math.random() * 360}deg)`
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
            onClick={() => handleProjectClick(project)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-15px) scale(1.03) rotateX(5deg)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            {/* Enhanced gradient overlay */}
            <div 
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
            
            {/* Content */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ 
                fontSize: '4rem',
                marginBottom: '20px',
                textAlign: 'center',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                animation: 'iconBounce 3s ease-in-out infinite'
              }}>
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
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.25)';
                    e.target.style.transform = `scale(1.1) translateY(${techIndex * 2}px)`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.target.style.transform = `scale(1) translateY(${techIndex * 2}px)`;
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
              <button style={{
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
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2))';
                e.target.style.transform = 'translateY(-3px) scale(1.05)';
                e.target.style.boxShadow = '0 10px 25px rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))';
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = 'none';
              }}
              >
                View Details →
              </button>
            </div>

            {/* Animated decorative elements */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
              borderRadius: '50%',
              opacity: 0.5,
              animation: 'pulse 2s ease-in-out infinite'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              width: '20px',
              height: '20px',
              background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.15), transparent)',
              borderRadius: '50%',
              opacity: 0.3,
              animation: 'spin 4s linear infinite'
            }} />
          </div>
        ))}
      </div>

      {/* Enhanced Modal */}
      <div style={modalOverlayStyle} onClick={() => setSelectedProject(null)}>
        <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
          {selectedProject && (
            <>
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div style={{ 
                  fontSize: '3rem', 
                  marginBottom: '15px',
                  animation: 'modalIconBounce 1s ease-out'
                }}>
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

      {/* Enhanced CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Enhanced floating animation */
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg) scale(1); 
            }
            25% { 
              transform: translateY(-15px) rotate(90deg) scale(1.05); 
            }
            50% { 
              transform: translateY(-25px) rotate(180deg) scale(0.95); 
            }
            75% { 
              transform: translateY(-15px) rotate(270deg) scale(1.05); 
            }
          }
          
          /* Enhanced icon bounce */
          @keyframes iconBounce {
            0%, 20%, 50%, 80%, 100% { 
              transform: translateY(0) rotateY(0deg); 
            }
            10% { 
              transform: translateY(-8px) rotateY(180deg); 
            }
            30% { 
              transform: translateY(-4px) rotateY(360deg); 
            }
            40% { 
              transform: translateY(-15px) rotateY(180deg); 
            }
            60% { 
              transform: translateY(-6px) rotateY(360deg); 
            }
          }

          /* Project card animations */
          .animate-in {
            animation-duration: 0.8s;
            animation-fill-mode: forwards;
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }

          .slideInLeft {
            animation-name: slideInLeft;
          }
          
          .slideInRight {
            animation-name: slideInRight;
          }
          
          .fadeInUp {
            animation-name: fadeInUp;
          }
          
          .rotateIn {
            animation-name: rotateIn;
          }

          @keyframes slideInLeft {
            from {
              transform: translateX(-100px) rotateY(-30deg);
              opacity: 0;
            }
            to {
              transform: translateX(0) rotateY(0deg);
              opacity: 1;
            }
          }

          @keyframes slideInRight {
            from {
              transform: translateX(100px) rotateY(30deg);
              opacity: 0;
            }
            to {
              transform: translateX(0) rotateY(0deg);
              opacity: 1;
            }
          }

          @keyframes fadeInUp {
            from {
              transform: translateY(60px) scale(0.8);
              opacity: 0;
            }
            to {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
          }

          @keyframes rotateIn {
            from {
              transform: rotate(-180deg) scale(0.5);
              opacity: 0;
            }
            to {
              transform: rotate(0deg) scale(1);
              opacity: 1;
            }
          }

          /* Modal animations */
          @keyframes modalIconBounce {
            0% {
              transform: scale(0) rotate(180deg);
            }
            50% {
              transform: scale(1.2) rotate(360deg);
            }
            100% {
              transform: scale(1) rotate(360deg);
            }
          }

          @keyframes fadeInList {
            from {
              transform: translateX(-20px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          @keyframes techFadeIn {
            from {
              transform: translateY(20px) scale(0.8);
              opacity: 0;
            }
            to {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
          }

          /* Additional decorative animations */
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.5;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.8;
            }
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
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
