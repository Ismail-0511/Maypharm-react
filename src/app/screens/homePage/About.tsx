import React from "react";
import { Box, Container } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function About() {
  return (
    <section className="about-us-section">
          <div className="about-us-header-content">
        <img 
          src="/img/logo.png" 
          alt="May Pharm" 
          className="about-us-logo" 
        />
        <h1 className="about-us-slogan">
          FOR <span className="slogan-highlight">BEAUTIFUL</span> DIRECTION OF<br />
          HUMAN BEINGS
        </h1>
      </div>

      <Container maxWidth="lg" className="about-us-wrapper">
        <Box className="about-us-card">
          <h2 className="about-us-label">ABOUT US</h2>
          <p className="about-us-subtitle">Maypharm Co., Ltd.</p>
          
          <div className="about-us-content">
            <p>
              Established in 2009, Maypharm Co., Ltd. stands as a global leader in
              the realm of cosmetic medicine and dermo-cosmetic products...
            </p>
            <p>
              At Maypharm Co., Ltd., we offer a diverse array of products, all
              manufactured in South Korea in strict accordance with safety
              standards mandated by the KFDA...
            </p>
            <p>
              Moreover, Maypharm Co., Ltd. holds prestigious certifications
              including CE, CPNP, and other global recognitions...
            </p>
          </div>

        <Box className="about-us-learn">
          <a 
        href="https://www.instagram.com/maypharm_cis" 
        target="_blank" 
        rel="noopener noreferrer"
          >
       Instagram +
        </a>
        </Box>
        </Box>
      </Container>
    </section>
  );
}
