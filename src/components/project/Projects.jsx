import React from "react";
import turbolog from "../gif/turbolog.gif";
import rovinox from "../gif/rovinox.gif";
import portfolio from "../gif/portfolio.gif";
import amacon from "../gif/amacon.gif";
import slack from "../gif/slack.gif";
import bootcamp from "../gif/Bootcamp.gif";

const Projects = () => {
  const allCard = [
    {
      image: bootcamp,
      appName: "Bootcamp",
      tool: "payment, mongodb, express, axios, MUI",
      description:
        "It's a platform for students to learn coding, maintain grading, submit homework, pay tuition, and many more functionalities",
      websiteUrl: "",
      githubURL: "https://github.com/rovinox/rovinox-camp",
    },
    {
      image: slack,
      appName: "Slack Clone",
      tool: "React, Redux, Firebase 5, Semantic UI React",
      description:
        "You can create channels and send direct messages. Add emojis to your messages. Upload and display image messages.",
      websiteUrl: "",
      githubURL: "https://github.com/rovinox/slack-clone.git",
    },
    {
      image: amacon,
      appName: "Amacon",
      tool: "MERN Stack, Stripe API, Cloudinary API, Next.js, JWT, Semantic UI React",
      description:
        "An e-commerce App with Full CRUD Functionality. Server-side Rendering for speed. Attractive + Responsive App Interface.",
      websiteUrl: "",
      githubURL: "https://github.com/rovinox/amacon.git",
    },
    {
      image: turbolog,
      appName: "Turbolog",
      tool: "React, Material-UI, Redux, Node, Express, Bcrypt, google maps API, PostgreSQL",
      description:
        "A app to keeps track of car maintenance history. Also you can find near by car mechanic shop and a forum section to ask any DYI questions.",
      websiteUrl: "",
      githubURL: "https://github.com/turbolog/turbo-log",
    },
    {
      image: rovinox,
      appName: "Rovinox",
      tool: "Styled-components v4 Dynamic CSS-in-JS, React Context API",
      description:
        "Build a Complete CryptoCurrency Financial Reporting App. Date Manipulation and Graphing Historical Price.",
      websiteUrl: "",
      githubURL: "https://github.com/rovinox/rovinox.git",
    },
    {
      image: portfolio,
      appName: "Portfolio",
      tool: "React MDL material design, React Router v4, Nodemailer",
      description:
        "I have build my own portfolio from the scratch instead of getting a template. Now i have the perfect portfolio i wanted.",
      websiteUrl: "",
      githubURL: "https://github.com/rovinox/portfolio.git",
    },
  ];

  // Styles
  const containerStyle = {
    padding: '40px 20px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const titleStyle = {
    color: 'white',
    fontSize: 'clamp(2rem, 6vw, 3rem)',
    textAlign: 'center',
    marginBottom: '40px',
    fontWeight: 'bold'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    width: '100%',
    justifyItems: 'center'
  };

  const cardStyle = {
    width: '350px',
    height: '450px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    backdropFilter: 'blur(10px)'
  };

  const imageContainerStyle = {
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    position: 'relative'
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease'
  };

  const contentStyle = {
    padding: '20px',
    height: 'calc(100% - 200px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  const titleCardStyle = {
    color: '#64B5F6',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    marginBottom: '10px'
  };

  const toolsStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.9rem',
    marginBottom: '10px',
    lineHeight: '1.4'
  };

  const descriptionStyle = {
    color: 'white',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    marginBottom: '20px',
    flex: 1
  };

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: '2px solid #64B5F6',
    color: '#64B5F6',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>My Projects</h1>
      <div style={gridStyle}>
        {allCard.map((item, index) => (
          <div
            key={index}
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.5)';
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.transform = 'scale(1)';
            }}
          >
            <div style={imageContainerStyle}>
              <img
                src={item.image}
                alt={item.appName}
                style={imageStyle}
              />
            </div>
            <div style={contentStyle}>
              <div>
                <h3 style={titleCardStyle}>{item.appName}</h3>
                <p style={toolsStyle}>
                  <strong>Libraries:</strong> {item.tool}
                </p>
                <p style={descriptionStyle}>{item.description}</p>
              </div>
              <a
                href={item.githubURL}
                target="_blank"
                rel="noopener noreferrer"
                style={buttonStyle}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#64B5F6';
                  e.target.style.color = 'white';
                  e.target.style.boxShadow = '0 4px 15px rgba(100, 181, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#64B5F6';
                  e.target.style.boxShadow = 'none';
                }}
              >
                View on GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;