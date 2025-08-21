import React from "react";
import AppNavbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import GalaxyCloudFastBackground from "./components/GalaxyBackground";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div>
      <GalaxyCloudFastBackground />
      <AppNavbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;