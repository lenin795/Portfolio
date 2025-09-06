import React from "react";

function Skills() {
  const skills = [
    { name: "HTML", color: "#E34F26", image: "/images/html-icon.png" },
    { name: "CSS", color: "#1572B6", image: "/images/css.png" },
    { name: "React", color: "#61DAFB", image: "/images/react.png" },
    { name: "Python", color: "#3776AB", image: "/images/python.png" },
    { name: "Java", color: "#ED8B00", image: "/images/java.png" },
    { name: "JavaScript", color: "#F7DF1E", image: "images/javascript.png" },
    { name: "MongoDB", color: "#47A248", image: "/images/mongodb.png" },
    { name: "SQL", color: "#336791", image: "/images/sql.png" },
    { name: "Git", color: "#F05032", image: "/images/git.png" },
  ];

  // Duplicate skills for seamless loop
  const duplicatedSkills = [...skills, ...skills, ...skills];

  // Helper function to convert hex to rgba
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div style={{ 
      padding: '80px 0',
      background: 'transparent',
      height:'400px',
      
    }}>
      <div style={{ 
        top:'200px',
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
          Skills
        </h2>
        
        <div style={{ position: 'relative' }}>
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
          }}></div>
          <div style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '120px',
            height: '100%',
            background: 'linear-gradient(to left, rgba(0,0,0,0.2), transparent)',
            zIndex: 10,
            pointerEvents: 'none'
          }}></div>
          
          {/* Scrolling Container */}
          <div style={{ 
            overflow: 'hidden',
            height: '350px'
          }}>
            <div 
              style={{
                display: 'flex',
                gap: '40px',
                width: 'max-content',
                alignItems: 'center',
                height: '100%',
                willChange: 'transform',
                animation: 'moveRightToLeft 50s linear infinite'
              }}
            >
              {duplicatedSkills.map((skill, index) => (
                <div
                  key={index}
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
                    e.target.style.transform = 'scale(1.08) translateY(-10px)';
                    e.target.style.background = hexToRgba(skill.color, 0.15);
                    e.target.style.borderColor = skill.color;
                    e.target.style.boxShadow = `0 15px 40px ${hexToRgba(skill.color, 0.4)}`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1) translateY(0)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
                  }}
                >
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '20px',
                    background: `linear-gradient(135deg, ${hexToRgba(skill.color, 0.2)}, ${hexToRgba(skill.color, 0.4)})`,
                    border: `3px solid ${skill.color}`,
                    margin: '0 auto 25px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 8px 25px ${hexToRgba(skill.color, 0.4)}`,
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
                      src={skill.image} 
                      alt={skill.name}
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
                        fallback.innerHTML = skill.name.charAt(0);
                        fallback.style.cssText = `
                          font-size: 48px; 
                          font-weight: bold; 
                          color: ${skill.color};
                          position: relative;
                          z-index: 2;
                          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
                        `;
                        parent.appendChild(fallback);
                      }}
                    />
                  </div>
                  <h3 style={{
                    color: 'white',
                    fontSize: 'clamp(14px, 2.5vw, 18px)',
                    fontWeight: '700',
                    margin: '0',
                    letterSpacing: '0.5px',
                    textAlign: 'center'
                  }}>
                    {skill.name}
                  </h3>
                  {/* Decorative Elements */}
                  <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    left: '15px',
                    width: '25px',
                    height: '25px',
                    background: hexToRgba(skill.color, 0.15),
                    borderRadius: '50%',
                    opacity: '0.6'
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '50px',
                    left: '15px',
                    width: '15px',
                    height: '15px',
                    background: hexToRgba(skill.color, 0.2),
                    borderRadius: '50%',
                    opacity: '0.4'
                  }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes moveRightToLeft {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
          
          @keyframes shine {
            0% { transform: translateX(-150%) translateY(-50%) rotate(45deg); }
            100% { transform: translateX(150%) translateY(50%) rotate(45deg); }
          }
          
          .skill-card:hover img {
            transform: rotate(360deg) scale(1.1);
          }
        `
      }} />
    </div>
  );
}

export default Skills;
