import React, { useEffect, useRef } from "react";

function About() {
  const sectionRef = useRef(null);
  const profileImageRef = useRef(null);
  const titleRef = useRef(null);
  const paragraph1Ref = useRef(null);
  const paragraph2Ref = useRef(null);
  const paragraph3Ref = useRef(null);

  useEffect(() => {
    // Load GSAP from CDN
    const loadGSAP = async () => {
      if (typeof window !== 'undefined' && !window.gsap) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.async = true;
        
        return new Promise((resolve) => {
          script.onload = () => {
            const scrollTriggerScript = document.createElement('script');
            scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
            scrollTriggerScript.async = true;
            scrollTriggerScript.onload = resolve;
            document.head.appendChild(scrollTriggerScript);
          };
          document.head.appendChild(script);
        });
      }
    };

    const initAnimations = () => {
      if (window.gsap && window.ScrollTrigger) {
        const { gsap } = window;
        gsap.registerPlugin(window.ScrollTrigger);

        // Set initial states
        gsap.set([profileImageRef.current, titleRef.current, paragraph1Ref.current, paragraph2Ref.current, paragraph3Ref.current], {
          opacity: 0,
          y: 50
        });

        gsap.set(profileImageRef.current, {
          scale: 0.8,
          rotation: -10
        });

        // Create timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            markers: false // Set to true for debugging
          }
        });

        // Animate profile image
        tl.to(profileImageRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.7)"
        })
        // Animate title
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.5")
        // Animate paragraphs with stagger
        .to([paragraph1Ref.current, paragraph2Ref.current, paragraph3Ref.current], {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out"
        }, "-=0.4");

        // Cleanup function
        return () => {
          if (window.ScrollTrigger) {
            window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
          }
        };
      }
    };

    loadGSAP().then(() => {
      // Small delay to ensure DOM is ready
      setTimeout(initAnimations, 100);
    });

  }, []);

  const containerStyle = {
    padding: '80px 0',
    backgroundColor: 'transparent'
  };

  const innerContainerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 15px'
  };

  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    gap: '40px',
    flexWrap: 'wrap'
  };

  const imageColStyle = {
    flex: '1 1 300px',
    textAlign: 'center',
    minWidth: '300px'
  };

  const contentColStyle = {
    flex: '1 1 400px',
    minWidth: '300px'
  };

  const profileImageStyle = {
    width: '300px',
    height: '350px',
    borderRadius: '50%',
    objectFit: 'auto',
    border: '4px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 10px 30px #1a0033',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  };

  const titleStyle = {
    marginBottom: '24px',
    color: 'white',
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
  };

  const paragraphStyle = {
    color: 'white',
    fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
    lineHeight: '1.7',
    marginBottom: '20px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
  };

  // Responsive styles
  const mediaQuery = window.innerWidth <= 768;
  if (mediaQuery) {
    rowStyle.flexDirection = 'column';
    rowStyle.textAlign = 'center';
    imageColStyle.marginBottom = '30px';
  }

  return (
    <div style={containerStyle} id="about" ref={sectionRef}>
      <div style={innerContainerStyle}>
        <div style={rowStyle}>
          <div style={imageColStyle}>
            <img
              ref={profileImageRef}
              src="/lenin.png"
              alt="Lenin"
              style={profileImageStyle}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
              }}
            />
          </div>
          <div style={contentColStyle}>
            <h2 ref={titleRef} style={titleStyle}>About Me</h2>
            
            <p ref={paragraph1Ref} style={paragraphStyle}>
              I'm an aspiring Full Stack Developer with a strong passion for creating modern, user-friendly, and scalable web applications.
              My journey in tech have been focused on mastering MongoDB, Express.js, React.js, and Node.js 
              to build full-stack applications that solve real-world problems.
            </p>
            
            <p ref={paragraph2Ref} style={paragraphStyle}>
              I enjoy building responsive front-end designs with React and developing efficient back-end systems with Node.js and Express.
              Along with my growing expertise in MongoDB, I aim to create projects that deliver both great functionality and smooth user experiences.
            </p>
            
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;