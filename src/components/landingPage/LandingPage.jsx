import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import picture from "../gif/NeajMahmud.jpg";

const LandingPage = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const textLoop = [
    "Hi I'm Neaj.",
    "A full-Stack Software Engineer.",
    "I Love Coding.",
    "And Solving Problems."
  ];

  const writeText = `My programming journey began with an attempt to prank a friend through the creation of a simulated computer virus. I researched and achieved this with just a few lines of code and no prior coding knowledge. This initial foray sparked a deep passion for programming that has evolved into 7+ years of delivering high-impact enterprise solutions.

As a Software Engineer, I've architected systems that saved $1M+ annually and improved processing efficiency by 30% for Fortune 500 clients. My expertise spans the full technology stack—React/TypeScript frontends, Node.js/Python/.NET backends, and optimized databases (PostgreSQL, MongoDB, DynamoDB).

I excel at translating complex business requirements into scalable technical solutions while leading cross-functional teams across global time zones. Recent highlights include building RestauNax, a comprehensive restaurant management platform with real-time ordering, Stripe payment integration, and automated business workflows, showcasing my ability to handle complex system architecture from concept to production.

Core Technologies: React • TypeScript • Node.js • Python • .NET • PostgreSQL • MongoDB • AWS • Azure • Docker • Kubernetes`;

  // Text loop effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => 
        prevIndex === textLoop.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Styles
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    position: 'relative'
  };

  const contentStyle = {
    maxWidth: '1000px',
    width: '100%',
    textAlign: 'center',
    color: 'white'
  };

  const avatarStyle = {
    width: 'clamp(200px, 30vw, 300px)',
    height: 'clamp(200px, 30vw, 300px)',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '30px',
    border: '4px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
    animation: 'fadeInScale 1s ease-out'
  };

  const textLoopStyle = {
    fontSize: 'clamp(24px, 5vw, 36px)',
    fontWeight: 'bold',
    marginBottom: '20px',
    minHeight: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'fadeInUp 1s ease-out 0.3s both'
  };

  const rainbowDividerStyle = {
    height: '4px',
    margin: '30px auto',
    maxWidth: '400px',
    background: 'linear-gradient(45deg, #fb0094, #0000ff, #00ff00, #ffff00, #ff0000, #fb0094, #0000ff, #00ff00, #ffff00, #ff0000)',
    backgroundSize: '400%',
    animation: 'rainbowMove 10s linear infinite',
    borderRadius: '2px',
    position: 'relative'
  };

  const bioStyle = {
    fontSize: 'clamp(16px, 2.5vw, 18px)',
    lineHeight: '1.6',
    marginBottom: '40px',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'left',
    maxWidth: '800px',
    margin: '0 auto 40px auto',
    animation: 'fadeInUp 1s ease-out 0.6s both'
  };

  const socialLinksStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    animation: 'fadeInUp 1s ease-out 0.9s both'
  };

  const socialButtonStyle = {
    display: 'inline-block',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '25px',
    padding: '12px 20px',
    color: '#64B5F6',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    border: '2px solid #64B5F6',
    backdropFilter: 'blur(10px)',
    minWidth: '100px',
    textAlign: 'center'
  };

  const connectButtonStyle = {
    // Removed - no longer needed
  };

  // CSS animations
  const animationCSS = `
    @keyframes fadeInScale {
      0% {
        opacity: 0;
        transform: scale(0.8);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes fadeInUp {
      0% {
        opacity: 0;
        transform: translateY(30px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes rainbowMove {
      0% {
        background-position: 0 0;
      }
      50% {
        background-position: 400% 0;
      }
      100% {
        background-position: 0 0;
      }
    }

    @keyframes pulse {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(100, 181, 246, 0.4);
      }
      50% {
        box-shadow: 0 0 20px 10px rgba(100, 181, 246, 0.2);
      }
    }

    @keyframes textFade {
      0%, 10% {
        opacity: 0;
        transform: translateY(10px);
      }
      20%, 80% {
        opacity: 1;
        transform: translateY(0);
      }
      90%, 100% {
        opacity: 0;
        transform: translateY(-10px);
      }
    }

    .text-loop-item {
      animation: textFade 2s ease-in-out;
    }

    .social-button:hover {
      background-color: #64B5F6 !important;
      color: white !important;
      transform: translateY(-3px) scale(1.05) !important;
      box-shadow: 0 10px 25px rgba(100, 181, 246, 0.3) !important;
      border-color: #64B5F6 !important;
    }
  `;

  return (
    <>
      <style>{animationCSS}</style>
      <div style={containerStyle}>
        <div style={contentStyle}>
          <img
            src={picture}
            alt="Neaj Mahmud"
            style={avatarStyle}
          />

          <div style={textLoopStyle}>
            <span className="text-loop-item" key={currentTextIndex}>
              {textLoop[currentTextIndex]}
            </span>
          </div>



          <div style={rainbowDividerStyle}></div>

          <p style={bioStyle}>{writeText}</p>

          <div style={socialLinksStyle}>
            <a
              href="https://github.com/rovinox"
              rel="noopener noreferrer"
              target="_blank"
              style={socialButtonStyle}
              className="social-button"
              title="GitHub"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/neaj-mahmud-a35217185/"
              rel="noopener noreferrer"
              target="_blank"
              style={socialButtonStyle}
              className="social-button"
              title="LinkedIn"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;