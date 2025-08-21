import React, { useEffect, useRef } from "react";

function Certifications() {
  const stageRef = useRef(null);
  const uniqueId = useRef(`cert-carousel-${Date.now()}`);

  useEffect(() => {
    const loadLibraries = async () => {
      const stageElement = stageRef.current?.querySelector('.cert-stage');
      const ringElement = stageRef.current?.querySelector('.cert-ring');
      const imgElements = stageRef.current?.querySelectorAll('.cert-img');
      const carouselContainer = stageRef.current?.parentElement;

      if (!stageElement || !ringElement || !imgElements.length) return;

      let currentRotation = 0;
      let isDragging = false;
      let startX = 0;
      let startY = 0;

      // Set initial positions with better spacing
      imgElements.forEach((img, i) => {
        const angle = i * -(360 / certifications.length); // Dynamic angle based on number of certificates
        img.style.transform = `rotateY(${angle}deg) translateZ(600px)`;
      });

      // Smooth rotation function
      const rotateCarousel = (deltaRotation) => {
        currentRotation += deltaRotation;
        ringElement.style.transform = `rotateY(${currentRotation}deg)`;
      };

      // Mouse wheel handler
      const handleWheel = (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 10 : -10; // Adjust sensitivity
        rotateCarousel(delta);
      };

      // Keyboard handler
      const handleKeyDown = (e) => {
        switch(e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            rotateCarousel(-15);
            break;
          case 'ArrowRight':
            e.preventDefault();
            rotateCarousel(15);
            break;
        }
      };

      // Enhanced Mouse/Touch handlers
      const handleStart = (e) => {
        isDragging = true;
        startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        startY = e.type === 'touchstart' ? e.touches.clientY : e.clientY;
        ringElement.style.cursor = 'grabbing';
        carouselContainer.style.cursor = 'grabbing';
        
        // Prevent text selection
        document.body.style.userSelect = 'none';
        
        document.addEventListener('mousemove', handleMove, { passive: false });
        document.addEventListener('touchmove', handleMove, { passive: false });
      };

      const handleMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        
        const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const deltaX = currentX - startX;
        
        // Increase sensitivity for better responsiveness
        rotateCarousel(deltaX * 0.5);
        startX = currentX;
      };

      const handleEnd = () => {
        isDragging = false;
        ringElement.style.cursor = 'grab';
        carouselContainer.style.cursor = 'grab';
        document.body.style.userSelect = '';
        
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('touchmove', handleMove);
      };

      // Hover effects with improved scaling
      imgElements.forEach(img => {
        img.addEventListener('mouseenter', () => {
          imgElements.forEach(otherImg => {
            if (otherImg === img) {
              otherImg.style.opacity = '1';
              otherImg.style.transform = otherImg.style.transform + ' scale(1.1)';
              otherImg.style.zIndex = '10';
            } else {
              otherImg.style.opacity = '0.7';
              otherImg.style.zIndex = '1';
            }
          });
        });

        img.addEventListener('mouseleave', () => {
          imgElements.forEach(otherImg => {
            otherImg.style.opacity = '1';
            otherImg.style.transform = otherImg.style.transform.replace(' scale(1.1)', '');
            otherImg.style.zIndex = '5';
          });
        });
      });

      // Add event listeners to the entire carousel container for better accessibility
      carouselContainer.addEventListener('mousedown', handleStart);
      carouselContainer.addEventListener('touchstart', handleStart, { passive: false });
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchend', handleEnd);
      
      // Add wheel and keyboard support
      carouselContainer.addEventListener('wheel', handleWheel, { passive: false });
      document.addEventListener('keydown', handleKeyDown);
      
      // Make container focusable for keyboard events
      carouselContainer.setAttribute('tabindex', '0');
      carouselContainer.style.outline = 'none';

      // Cleanup function
      return () => {
        carouselContainer.removeEventListener('mousedown', handleStart);
        carouselContainer.removeEventListener('touchstart', handleStart);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchend', handleEnd);
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('touchmove', handleMove);
        carouselContainer.removeEventListener('wheel', handleWheel);
        document.removeEventListener('keydown', handleKeyDown);
      };
    };

    const cleanup = loadLibraries();
    return () => {
      if (cleanup && typeof cleanup.then === 'function') {
        cleanup.then(cleanupFn => cleanupFn && cleanupFn());
      }
    };
  }, []);

  const certifications = [
    { title: "NPTEL: Foundations of Cloud, IoT, and Edge ML (2025)", image: "/certificates/foundation.png" },
    { title: "NPTEL: Innovation by design", image: "/certificates/innovation.png" },
    { title: "NPTEL: Distributed System", image: "/certificates/Distributedsystem.png" },
    { title: "Javascript", image: "/certificates/javascript.png" },
    { title: "Python", image: "/certificates/python.png" },
    { title: "MongoDB", image: "/certificates/MongoDB.png" },
  ];

  const containerStyle = {
    padding: '40px 0',
    backgroundColor: 'transparent'
  };

  const innerContainerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 15px'
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    color: 'white',
    fontSize: '2.5rem',
    fontWeight: 'bold'
  };

  const carouselContainerStyle = {
    minHeight: '700px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'visible',
    cursor: 'grab', // Add grab cursor to entire container
    borderRadius: '20px', // Visual feedback for interactive area
    padding: '20px' // Add padding for larger interactive area
  };

  const stageStyle = {
    position: 'relative',
    width: '500px',
    height: '600px',
    margin: '0 auto',
    transformStyle: 'preserve-3d',
    userSelect: 'none',
    perspective: '1500px'
  };

  const ringStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    left: '0',
    top: '0',
    cursor: 'grab',
    transition: 'transform 0.1s ease-out'
  };

  const imgBaseStyle = {
    position: 'absolute',
    width: 'auto',
    height: 'auto',
    left: '70%',
    top: '60%',
    marginLeft: '-190px',
    marginTop: '-250px',
    backfaceVisibility: 'hidden',
    borderRadius: '15px',
    boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
    backgroundColor: '#ffffff',
    border: '4px solid #e5e7eb',
    overflow: 'hidden',
    transition: 'opacity 0.3s ease, transform 0.3s ease, z-index 0.3s ease',
    zIndex: '5'
  };

  const instructionsStyle = {
    textAlign: 'center',
    marginTop: '30px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1.1rem'
  };

  return (
    <div style={containerStyle} id="certifications">
      <div style={innerContainerStyle}>
        <h2 style={titleStyle}>Certifications</h2>
        <div style={carouselContainerStyle}>
          <div 
            id={uniqueId.current}
            ref={stageRef}
          >
            <div className="cert-stage" style={stageStyle}>
              <div className="cert-ring" style={ringStyle}>
                {certifications.map((cert, index) => (
                  <div key={index} className="cert-img" style={imgBaseStyle}>
                    <img 
                      src={cert.image} 
                      alt={cert.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '11px',
                        display: 'block',
                        pointerEvents: 'none' // Prevent image drag interference
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const parent = e.target.parentElement;
                        parent.innerHTML = `
                          <div style="
                            width: 100%;
                            height: 100%;
                            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            color: #374151;
                            text-align: center;
                            padding: 20px;
                            box-sizing: border-box;
                          ">
                            <div style="font-size: 48px; margin-bottom: 20px;">📜</div>
                            <h4 style="font-size: 18px; font-weight: 600; margin: 0; line-height: 1.4;">
                              ${cert.title}
                            </h4>
                          </div>
                        `;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Instructions */}
        <div style={instructionsStyle}>
          <p>🖱️ Drag • 🖲️ Mouse wheel • ⌨️ Arrow keys to rotate certificates</p>
        </div>
      </div>
    </div>
  );
}

export default Certifications;
