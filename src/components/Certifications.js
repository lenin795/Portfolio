import React, { useEffect, useRef } from "react";

function Certifications() {
  const stageRef = useRef(null);
  const uniqueId = useRef(`cert-carousel-${Date.now()}`);
  const autoRotationRef = useRef(null);
  const isAutoRotatingRef = useRef(true);

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
      let targetRotation = 0;
      let isAnimating = false;

      // Set initial positions with better spacing
      imgElements.forEach((img, i) => {
        const angle = i * -(360 / certifications.length);
        img.style.transform = `rotateY(${angle}deg) translateZ(600px)`;
      });

      // Smooth rotation function
      const rotateCarousel = (deltaRotation) => {
        currentRotation += deltaRotation;
        ringElement.style.transform = `rotateY(${currentRotation}deg)`;
      };

      // Animate to target rotation
      const animateToRotation = (target) => {
        if (isAnimating) return;
        isAnimating = true;
        targetRotation = target;
        
        const animate = () => {
          const diff = targetRotation - currentRotation;
          const step = diff * 0.1;
          
          if (Math.abs(diff) > 0.5) {
            currentRotation += step;
            ringElement.style.transform = `rotateY(${currentRotation}deg)`;
            requestAnimationFrame(animate);
          } else {
            currentRotation = targetRotation;
            ringElement.style.transform = `rotateY(${currentRotation}deg)`;
            isAnimating = false;
          }
        };
        animate();
      };

      // Auto rotation function
      const startAutoRotation = () => {
        if (autoRotationRef.current) {
          clearInterval(autoRotationRef.current);
        }
        
        if (isAutoRotatingRef.current) {
          autoRotationRef.current = setInterval(() => {
            if (isAutoRotatingRef.current && !isDragging && !isAnimating) {
              startAutoRotation();
              rotateCarousel(-0.3);
              isAutoRotatingRef.current = true; 
            }
          }, 50);
        }
      };

      // Stop auto rotation
      const stopAutoRotation = () => {
        if (autoRotationRef.current) {
          clearInterval(autoRotationRef.current);
          autoRotationRef.current = null;
        }
      };

      // Start auto rotation initially
      startAutoRotation();

      // Certificate click handler - center the clicked certificate
      const handleCertificateClick = (e, index) => {
        e.stopPropagation();
        stopAutoRotation();
        
        // Calculate rotation needed to center this certificate
        const anglePerCert = 360 / certifications.length;
        const targetAngle = index * anglePerCert;
        
        // Find the shortest path to the target
        let rotationNeeded = targetAngle - (currentRotation % 360);
        if (rotationNeeded > 180) rotationNeeded -= 360;
        if (rotationNeeded < -180) rotationNeeded += 360;
        
        // Animate to center position
        animateToRotation(currentRotation + rotationNeeded);
        
        // Add visual feedback
        const clickedCert = e.currentTarget;
        clickedCert.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.5)';
        clickedCert.style.border = '4px solid #3b82f6';
        
        // Reset visual feedback and restart rotation after delay
        setTimeout(() => {
          clickedCert.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
          clickedCert.style.border = '4px solid #e5e7eb';
          isAutoRotatingRef.current = true;
          startAutoRotation();
        }, 3000);
      };

      // Touch/Mouse handlers for manual rotation
      const handleStart = (e) => {
        isDragging = true;
        stopAutoRotation();
        startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        ringElement.style.cursor = 'grabbing';
        carouselContainer.style.cursor = 'grabbing';
        
        document.body.style.userSelect = 'none';
        
        const moveHandler = (e) => handleMove(e);
        const endHandler = () => handleEnd(moveHandler, endHandler);
        
        document.addEventListener('mousemove', moveHandler, { passive: false });
        document.addEventListener('touchmove', moveHandler, { passive: false });
        document.addEventListener('mouseup', endHandler);
        document.addEventListener('touchend', endHandler);
      };

      const handleMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        
        const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const deltaX = currentX - startX;
        
        rotateCarousel(deltaX * 0.3);
        startX = currentX;
      };

      const handleEnd = (moveHandler, endHandler) => {
        isDragging = false;
        ringElement.style.cursor = 'grab';
        carouselContainer.style.cursor = 'grab';
        document.body.style.userSelect = '';
        
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('touchmove', moveHandler);
        document.removeEventListener('mouseup', endHandler);
        document.removeEventListener('touchend', endHandler);
        
        // Resume auto rotation after interaction
        setTimeout(() => {
          isAutoRotatingRef.current = true;
          startAutoRotation();
        }, 20000);
      };

      // Add event listeners
      imgElements.forEach((img, index) => {
        const clickHandler = (e) => handleCertificateClick(e, index);
        img.addEventListener('click', clickHandler);
        img.addEventListener('touchend', clickHandler);
        
        // Simple hover effects without stopping rotation
        img.addEventListener('mouseenter', () => {
          img.style.transform = img.style.transform + ' scale(1.05)';
          img.style.zIndex = '10';
        });

        img.addEventListener('mouseleave', () => {
          img.style.transform = img.style.transform.replace(' scale(1.05)', '');
          img.style.zIndex = '5';
        });
      });

      carouselContainer.addEventListener('mousedown', handleStart);
      carouselContainer.addEventListener('touchstart', handleStart, { passive: false });
      
      // Make container focusable
      carouselContainer.setAttribute('tabindex', '0');
      carouselContainer.style.outline = 'none';

      // Cleanup function
      return () => {
        stopAutoRotation();
        carouselContainer.removeEventListener('mousedown', handleStart);
        carouselContainer.removeEventListener('touchstart', handleStart);
        
        imgElements.forEach((img, index) => {
          const clickHandler = (e) => handleCertificateClick(e, index);
          img.removeEventListener('click', clickHandler);
          img.removeEventListener('touchend', clickHandler);
        });
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
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    fontWeight: 'bold'
  };

  const carouselContainerStyle = {
    minHeight: 'clamp(400px, 80vh, 700px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'visible',
    cursor: 'grab',
    borderRadius: '20px',
    padding: '20px',
    touchAction: 'none'
  };

  const stageStyle = {
    position: 'relative',
    width: 'clamp(300px, 80vw, 500px)',
    height: 'clamp(400px, 70vh, 600px)',
    margin: '0 auto',
    transformStyle: 'preserve-3d',
    userSelect: 'none',
    perspective: 'clamp(800px, 150vw, 1500px)'
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
    left: '50%',
    top: '60%',
    marginLeft: 'clamp(-120px, -15vw, -190px)',
    marginTop: 'clamp(-150px, -20vh, -250px)',
    backfaceVisibility: 'hidden',
    borderRadius: '15px',
    boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
    backgroundColor: '#ffffff',
    border: '4px solid #e5e7eb',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, z-index 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
    zIndex: '5',
    cursor: 'pointer',
    maxWidth: 'clamp(200px, 40vw, 380px)',
    maxHeight: 'clamp(250px, 50vh, 500px)'
  };

  const instructionsStyle = {
    textAlign: 'center',
    marginTop: '30px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
    padding: '0 20px'
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
                        pointerEvents: 'none'
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
                            <div style="font-size: clamp(24px, 6vw, 48px); margin-bottom: 10px;">📜</div>
                            <h4 style="font-size: clamp(12px, 3vw, 18px); font-weight: 600; margin: 0; line-height: 1.4;">
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

        
      </div>
    </div>
  );
}

export default Certifications;