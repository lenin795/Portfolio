import React from "react";

function Skills() {
  const skills = [
    { name: "HTML", color: "#E34F26", image: "/images/html-icon.png" },
    { name: "CSS", color: "#1572B6", image: "/images/css.png" },
    { name: "React", color: "#61DAFB", image: "/images/react.png" },
    { name: "Python", color: "#3776AB", image: "/images/python.png" },
    { name: "Java", color: "#ED8B00", image: "/images/java.png" },
    { name: "JavaScript", color: "#F7DF1E", image: "/images/javascript.png" },
    { name: "MongoDB", color: "#47A248", image: "/images/mongodb.png" },
    { name: "SQL", color: "#336791", image: "/images/sql.png" },
    { name: "Git", color: "#F05032", image: "/images/git.png" },
  ];

  // Duplicate skills for seamless loop
  const duplicatedSkills = [...skills, ...skills,...skills];

  return (
    <div style={{ 
      padding: '100px 0',
      background: 'transparent',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '80px',
          color: 'white',
          fontSize: '3rem',
          fontWeight: 'bold'
        }}>
          Skills
        </h2>
        
        {/* Single Moving Skills Container - Right to Left */}
        <div style={{ position: 'relative' }}>
          {/* Gradient fade edges */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '120px',
            height: '100%',
            background: 'linear-gradient(to right, rgba(0,0,0,0.2), transparent)',
            zIndex: 10
          }}></div>
          <div style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '120px',
            height: '100%',
            background: 'linear-gradient(to left, rgba(0,0,0,0.2), transparent)',
            zIndex: 10
          }}></div>
          
          {/* Scrolling Container */}
          <div style={{ overflow: 'hidden' }}>
            <div 
              style={{
                display: 'flex',
                gap: '30px',
                width: 'max-content',
                animation: 'moveRightToLeft 50s linear infinite'
              }}
            >
              {duplicatedSkills.map((skill, index) => (
                <div
                  key={index}
                  style={{
                    minWidth: '250px',
                    padding: '30px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(15px)',
                    textAlign: 'center',
                    transition: 'all 0.4s ease',
                    cursor: 'pointer',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.08) translateY(-10px)';
                    e.target.style.background = `rgba(${parseInt(skill.color.slice(1, 3), 16)}, ${parseInt(skill.color.slice(3, 5), 16)}, ${parseInt(skill.color.slice(5, 7), 16)}, 0.3)`;
                    e.target.style.borderColor = skill.color;
                    e.target.style.boxShadow = `0 15px 40px ${skill.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1) translateY(0)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${skill.color}25, ${skill.color}45)`,
                    border: `3px solid ${skill.color}`,
                    margin: '0 auto 25px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 8px 25px ${skill.color}40`,
                    transition: 'all 0.4s ease',
                    padding: '15px'
                  }}>
                    <img 
                      src={skill.image} 
                      alt={skill.name}
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                        transition: 'transform 0.4s ease'
                      }}
                      onError={(e) => {
                        // Fallback to first letter if image fails to load
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = `<span style="font-size: 32px; font-weight: bold; color: ${skill.color};">${skill.name.charAt(0)}</span>`;
                      }}
                    />
                  </div>
                  <h3 style={{
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: '700',
                    margin: 0,
                    letterSpacing: '0.5px'
                  }}>
                    {skill.name}
                  </h3>
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
          
          /* Hover effect for icon rotation */
          .skill-card:hover img {
            transform: rotate(360deg) scale(1.1);
          }
        `
      }} />
    </div>
  );
}

export default Skills;