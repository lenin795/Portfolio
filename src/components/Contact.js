import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import emailjs from "emailjs-com";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const serviceID = "service_9v1cltq";   // from EmailJS dashboard
  const templateID = "template_9umdi2b"; // from EmailJS dashboard
  const userID = "oKt7MSFDbmsc9S4G7";      // from EmailJS account (public key)

  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    to_email: "lenin7955@gmail.com", // your email
  };

  emailjs.send(serviceID, templateID, templateParams, userID)
    .then((res) => {
      console.log("✅ Message sent!", res.status, res.text);
      alert("Message sent successfully 🚀");
      setFormData({ name: "", email: "", message: "" }); // reset form
    })
    .catch((err) => {
      console.error("❌ Failed:", err);
      alert("Message failed. Please try again!");
    });
};


  const socialLinks = [
    
    {
      name: "LinkedIn",
      iconImage: "/images/linkedin.png",
      url: "https://www.linkedin.com/in/leninm/",
      username: "lenin murugesan",
      color: "#0077B5",
      description: "Connect with me professionally"
    },
    {
      name: "GitHub",
      iconImage: "/images/github.png",
      url: "https://github.com/lenin795",
      username: "lenin795",
      color: "#86afc2ff",
      description: "Check out my code repositories"
    },
    {
      name: "Gmail",
      iconImage: "/images/email.png",
      url: "mailto:lenin7955@gmail.com",
      username: "lenin7955@gmail.com",
      color: "#EA4335",
      description: "Send me an email directly"
    }
  ];

  return (
    <div className="py-5" id="contact" style={{ minHeight: '100vh', background: 'transparent' }}>
      <Container>
        <h2 className="text-center mb-5 text-white" style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: 'bold',
          marginBottom: '60px',
          marginTop:'-10px'
        }}>
          Get In Touch
        </h2>

        <Row style={{ minHeight: '70vh' }}>
          {/* Contact Form Section - LEFT SIDE */}
          <Col lg={7} md={12} className="mb-4 mb-lg-0" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              background: 'transparent',
              padding: '40px',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '500px'
            }}>
              <h3 className="text-white mb-4" style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                Send Me a Message
              </h3>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="text-white fw-bold">Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="name"
                    placeholder="Enter your name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      background: 'transparent',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      fontSize: '16px',
                      color: 'white',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#4285F4';
                      e.target.style.boxShadow = '0 0 0 0.2rem rgba(66, 133, 244, 0.25)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="text-white fw-bold">Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email"
                    placeholder="Enter your email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      background: 'transparent',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      fontSize: '16px',
                      color: 'white',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#4285F4';
                      e.target.style.boxShadow = '0 0 0 0.2rem rgba(66, 133, 244, 0.25)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="text-white fw-bold">Message</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={5} 
                    name="message"
                    placeholder="Your message..." 
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    style={{
                      background: 'transparent',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      fontSize: '16px',
                      color: 'white',
                      resize: 'vertical',
                      minHeight: '20px',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#4285F4';
                      e.target.style.boxShadow = '0 0 0 0.2rem rgba(66, 133, 244, 0.25)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </Form.Group>

                <Button 
                  type="submit"
                  style={{
                    background: 'transparent',
                    border: '2px solid #4285F4',
                    borderRadius: '10px',
                    padding: '12px 30px',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#4285F4',
                    width: '100%',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#4285F4';
                    e.target.style.color = 'white';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(66, 133, 244, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#4285F4';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Send Message 🚀
                </Button>
              </Form>
            </div>
          </Col>

          {/* Social Links Section - RIGHT SIDE */}
          <Col lg={5} md={12} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '400px',
              padding: '20px'
            }}>
              <h3 className="text-white mb-4" style={{ 
                fontSize: '1.5rem', 
                fontWeight: '600',
                textAlign: 'center'
              }}>
                Connect with Me
              </h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target={social.name === 'Gmail' ? '_self' : '_blank'}
                    rel={social.name === 'Gmail' ? '' : 'noopener noreferrer'}
                    style={{
                      textDecoration: 'none',
                      color: 'white',
                      background: 'transparent',
                      padding: '20px 25px',
                      borderRadius: '16px',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      transition: 'all 0.4s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                      e.currentTarget.style.borderColor = social.color;
                      e.currentTarget.style.boxShadow = `0 15px 40px ${social.color}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Icon Image Container */}
                    <div style={{
                      minWidth: '55px',
                      height: '55px',
                      background: 'transparent',
                      border: `2px solid ${social.color}`,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px'
                    }}>
                      <img 
                        src={social.iconImage}
                        alt={`${social.name} icon`}
                        style={{
                          width: '32px',
                          height: '32px',
                          objectFit: 'contain',
                          filter: social.name === 'GitHub' ? 'brightness(0) invert(1)' : 'none'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const parent = e.target.parentElement;
                          let svgIcon = '';
                          
                          switch(social.name) {
                            case 'Gmail':
                              svgIcon = `
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="${social.color}">
                                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.910 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                                </svg>`;
                              break;
                            case 'LinkedIn':
                              svgIcon = `
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="${social.color}">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>`;
                              break;
                            case 'GitHub':
                              svgIcon = `
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="${social.color}">
                                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                                </svg>`;
                              break;
                            case 'Instagram':
                              svgIcon = `
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="${social.color}">
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
                                </svg>`;
                              break;
                            default:
                              svgIcon = `<div style="color: ${social.color}; font-size: 20px;">🔗</div>`;
                          }
                          parent.innerHTML = svgIcon;
                        }}
                      />
                    </div>
                    
                    <div style={{ textAlign: 'left', flex: 1 }}>
                      <h4 style={{
                        margin: 0,
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: 'white'
                      }}>
                        {social.name}
                      </h4>
                      <p style={{
                        margin: '3px 0',
                        fontSize: '13px',
                        color: social.color,
                        fontWeight: '500'
                      }}>
                        {social.username}
                      </p>
                      <p style={{
                        margin: 0,
                        fontSize: '11px',
                        color: 'rgba(255, 255, 255, 0.7)'
                      }}>
                        {social.description}
                      </p>
                    </div>

                    <div style={{
                      fontSize: '1.1rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      transition: 'transform 0.3s ease'
                    }}>
                      →
                    </div>
                  </a>
                ))}
              </div>

            </div>
          </Col>
        </Row>
      </Container>

      <style dangerouslySetInnerHTML={{
        __html: `
          #contact input::placeholder,
          #contact textarea::placeholder {
            color: rgba(255, 255, 255, 0.6) !important;
            opacity: 1;
          }
          
          #contact input:-webkit-autofill,
          #contact input:-webkit-autofill:hover,
          #contact input:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
            -webkit-text-fill-color: white !important;
            background-color: transparent !important;
          }

          @media (max-width: 768px) {
            #contact .row {
              flex-direction: column-reverse;
            }
          }
        `
      }} />
    </div>  
  );
}

export default Contact;
