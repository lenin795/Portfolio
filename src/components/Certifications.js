import React, { useEffect, useRef, useState } from "react";

function Certifications() {
  const containerRef = useRef(null);
  const scrollingRef = useRef(null);
  const autoScrollRef = useRef(null);
  const isAutoScrollingRef = useRef(true);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const initializeScrolling = () => {
      const container = containerRef.current;
      const scrollingTrack = scrollingRef.current;
      if (!container || !scrollingTrack) return;

      let isManuallyScrolling = false;
      let scrollPosition = 0;
      const scrollSpeed = 1.2;

      // Calculate total width needed for seamless scrolling
      const certItems = scrollingTrack.querySelectorAll('.cert-item');
      let totalWidth = 0;
      certItems.forEach(item => {
        totalWidth += item.offsetWidth + 40;
      });

      // Clone items for seamless loop
      const cloneItems = () => {
        const originalItems = Array.from(certItems);
        originalItems.forEach(item => {
          const clone = item.cloneNode(true);
          clone.classList.add('cloned');
          scrollingTrack.appendChild(clone);
        });
      };
      cloneItems();

      // Auto scroll function
      const autoScroll = () => {
        if (!isAutoScrollingRef.current || isManuallyScrolling) return;
        scrollPosition -= scrollSpeed;
        
        if (Math.abs(scrollPosition) >= totalWidth) {
          scrollPosition = 0;
        }
        scrollingTrack.style.transform = `translateX(${scrollPosition}px)`;
      };

      // Start auto scroll
      const startAutoScroll = () => {
        if (autoScrollRef.current) {
          cancelAnimationFrame(autoScrollRef.current);
        }
        
        const animate = () => {
          autoScroll();
          autoScrollRef.current = requestAnimationFrame(animate);
        };
        
        if (isAutoScrollingRef.current) {
          animate();
        }
      };

      // Stop auto scroll
      const stopAutoScroll = () => {
        if (autoScrollRef.current) {
          cancelAnimationFrame(autoScrollRef.current);
          autoScrollRef.current = null;
        }
        isAutoScrollingRef.current = false;
      };

      // Manual scroll handlers
      let startX = 0;
      let isDragging = false;
      let lastScrollPosition = scrollPosition;

      const handleStart = (e) => {
        isDragging = true;
        isManuallyScrolling = true;
        stopAutoScroll();
        
        startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        lastScrollPosition = scrollPosition;
        
        container.style.cursor = 'grabbing';
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
        
        scrollPosition = lastScrollPosition + deltaX;
        
        if (scrollPosition > 0) {
          scrollPosition = -totalWidth + (scrollPosition % totalWidth);
        } else if (Math.abs(scrollPosition) >= totalWidth) {
          scrollPosition = scrollPosition % totalWidth;
        }
        scrollingTrack.style.transform = `translateX(${scrollPosition}px)`;
      };

      const handleEnd = (moveHandler, endHandler) => {
        isDragging = false;
        isManuallyScrolling = false;
        container.style.cursor = 'grab';
        document.body.style.userSelect = '';

        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('touchmove', moveHandler);
        document.removeEventListener('mouseup', endHandler);
        document.removeEventListener('touchend', endHandler);

        setTimeout(() => {
          isAutoScrollingRef.current = true;
          startAutoScroll();
        }, 1500);
      };

      // Certificate click handler
      const handleCertClick = (e, cert) => {
        e.stopPropagation();
        stopAutoScroll();
        setSelectedCert(cert);
      };

      // Add event listeners
      container.addEventListener('mousedown', handleStart);
      container.addEventListener('touchstart', handleStart, { passive: false });

      // Add click handlers to certificate items
      certItems.forEach((item, index) => {
        const cert = certificates[index];
        const clickHandler = (e) => handleCertClick(e, cert);
        item.addEventListener('click', clickHandler);
      });

      // Start initial auto scroll
      setTimeout(() => {
        isAutoScrollingRef.current = true;
        startAutoScroll();
      }, 100);

      // Cleanup
      return () => {
        stopAutoScroll();
        container.removeEventListener('mousedown', handleStart);
        container.removeEventListener('touchstart', handleStart);
        
        certItems.forEach((item, index) => {
          const cert = certificates[index];
          const clickHandler = (e) => handleCertClick(e, cert);
          item.removeEventListener('click', clickHandler);
        });
      };
    };

    const cleanup = initializeScrolling();
    return () => {
      if (cleanup) cleanup();
    };
  }, );

  // Certificates data
  const certificates = [
    { 
      name: "NPTEL: Foundations of Cloud, IoT, and Edge ML (2025)", 
      color: "#FF9900", 
      image: "/certificates/foundation.png",
      fullImage: "/certificates/foundation-full.png"
    },
    { 
      name: "NPTEL: Innovation by design", 
      color: "#4285F4", 
      image: "/certificates/innovation.png",
      fullImage: "/certificates/innovation-full.png"
    },
    { 
      name: "NPTEL: Distributed System", 
      color: "#0078D4", 
      image: "/certificates/Distributedsystem.png",
      fullImage: "/certificates/Distributedsystem-full.png"
    },
    { 
      name: "Javascript", 
      color: "#61DAFB", 
      image: "/certificates/javascript.png",
      fullImage: "/certificates/javascript-full.png"
    },
    { 
      name: "Python", 
      color: "#3776AB", 
      image: "/certificates/python.png",
      fullImage: "/certificates/python-full.png"
    },
    { 
      name: "MongoDB", 
      color: "#F7DF1E", 
      image: "/certificates/MongoDB.png",
      fullImage: "/certificates/MongoDB-full.png"
    },
    { 
      name: "System Design", 
      color: "#F7DF1E", 
      image: "/certificates/SystemDesign.jpg",
      fullImage: "/certificates/SystemDesign-full.jpg"
    }
  ];

  // Close certificate view
  const closeCertView = () => {
    setSelectedCert(null);
    setTimeout(() => {
      isAutoScrollingRef.current = true;
    }, 100);
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedCert && e.key === 'Escape') {
        closeCertView();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedCert]);

  // Helper function to convert hex to rgba
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div style={{ padding: '80px 0', backgroundColor: 'transparent', overflow: 'hidden' }} id="certifications">
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '0 20px' 
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '50px',
          color: 'white',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: 'bold'
        }}>
          Certifications
        </h2>
        
        <div 
          ref={containerRef}
          style={{
            width: '100%',
            height: '320px',
            position: 'relative',
            cursor: 'grab',
            userSelect: 'none',
            touchAction: 'none',
            overflow: 'hidden'
          }}
        >
          {/* Fade overlays */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '120px',
            height: '100%',
            background: 'linear-gradient(to right, rgba(0,0,0,0.2), transparent)',
            zIndex: 10,
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '120px',
            height: '100%',
            background: 'linear-gradient(to left, rgba(0,0,0,0.2), transparent)',
            zIndex: 10,
            pointerEvents: 'none'
          }} />
          
          <div 
            ref={scrollingRef}
            className="scrolling-track"
            style={{
              display: 'flex',
              gap: '40px',
              height: '100%',
              alignItems: 'center',
              willChange: 'transform',
              transition: 'none'
            }}
          >
            {certificates.map((cert, index) => (
              <div 
                key={index}
                className="cert-item"
                style={{
                  minWidth: '320px',
                  height: '280px',
                  borderRadius: '24px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(15px)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  position: 'relative',
                  flexShrink: 0,
                  overflow: 'hidden',
                  padding: '30px 20px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-15px) scale(1.08)';
                  e.currentTarget.style.background = hexToRgba(cert.color, 0.15);
                  e.currentTarget.style.borderColor = cert.color;
                  e.currentTarget.style.boxShadow = `0 20px 50px ${hexToRgba(cert.color, 0.4)}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
                }}
              >
                {/* Certificate Image Container */}
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '20px',
                  background: `linear-gradient(135deg, ${hexToRgba(cert.color, 0.2)}, ${hexToRgba(cert.color, 0.4)})`,
                  border: `3px solid ${cert.color}`,
                  margin: '0 auto 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 8px 25px ${hexToRgba(cert.color, 0.4)}`,
                  transition: 'all 0.4s ease',
                  padding: '15px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-150%',
                    width: '200%',
                    height: '200%',
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                    transform: 'rotate(45deg)',
                    animation: 'shine 4s ease-in-out infinite'
                  }} />
                  <img 
                    src={cert.image} 
                    alt={cert.name}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                      transition: 'transform 0.4s ease',
                      position: 'relative',
                      zIndex: 2
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const parent = e.target.parentElement;
                      const fallback = document.createElement('div');
                      fallback.innerHTML = '🏆';
                      fallback.style.cssText = `
                        font-size: 48px;
                        position: relative;
                        z-index: 2;
                        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
                      `;
                      parent.appendChild(fallback);
                    }}
                  />
                </div>
                {/* Certificate Name */}
                <h3 style={{
                  color: 'white',
                  fontSize: 'clamp(14px, 2.5vw, 18px)',
                  fontWeight: '700',
                  margin: '0 0 15px 0',
                  letterSpacing: '0.5px',
                  lineHeight: '1.3',
                  textAlign: 'center',
                  maxWidth: '280px'
                }}>
                  {cert.name}
                </h3>
                {/* Decorative Elements */}
                <div style={{
                  position: 'absolute',
                  bottom: '15px',
                  left: '15px',
                  width: '25px',
                  height: '25px',
                  background: hexToRgba(cert.color, 0.15),
                  borderRadius: '50%',
                  opacity: '0.6'
                }} />
                <div style={{
                  position: 'absolute',
                  top: '50px',
                  left: '15px',
                  width: '15px',
                  height: '15px',
                  background: hexToRgba(cert.color, 0.2),
                  borderRadius: '50%',
                  opacity: '0.4'
                }} />
              </div>
            ))}
          </div>
        </div>
        
        <div style={{
          textAlign: 'center',
          marginTop: '40px',
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
          padding: '0 20px'
        }}>
          <p>Click on any certificate to view full image, or drag to scroll manually</p>
        </div>
      </div>

      {/* Full Certificate Image Viewer */}
      {selectedCert && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.3s ease-out'
          }}
          onClick={closeCertView}
        >
          {/* Close button */}
          <button 
            style={{
              position: 'absolute',
              top: '30px',
              right: '30px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              zIndex: 1001
            }}
            onClick={closeCertView}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            ×
          </button>
          
          {/* Certificate Title */}
          <div style={{
            position: 'absolute',
            top: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            fontWeight: 'bold',
            textAlign: 'center',
            maxWidth: '70%',
            zIndex: 1001
          }}>
            {selectedCert.name}
          </div>
          
          {/* Full Certificate Image */}
          <div 
            style={{
              maxWidth: '55%',
              maxHeight: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'zoomIn 0.5s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedCert.fullImage || selectedCert.image}
              alt={`Full certificate: ${selectedCert.name}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: `0 25px 80px ${hexToRgba(selectedCert.color, 0.3)}`,
                border: `3px solid ${selectedCert.color}`,
                background: 'white'
              }}
              onError={(e) => {
                e.target.src = selectedCert.image;
              }}
            />
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shine {
            0% { transform: translateX(-150%) translateY(-50%) rotate(45deg); }
            100% { transform: translateX(150%) translateY(50%) rotate(45deg); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes zoomIn {
            from { 
              opacity: 0;
              transform: scale(0.8);
            }
            to { 
              opacity: 1;
              transform: scale(1);
            }
          }
          
          .cert-item:hover img {
            transform: rotate(3deg) scale(1.1);
          }
          
          .cert-item {
            will-change: transform, box-shadow, background, border-color;
          }
        `
      }} />
    </div>
  );
}

export default Certifications;
