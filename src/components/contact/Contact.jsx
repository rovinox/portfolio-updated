import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    email: "",
  });

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log("e.target.value: ", e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, message, email } = formData;
    //axios.post(`/api/email`, { name, message, email });
  };

  // Inline styles for the animated card
  const contactPageStyle = {
    height: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  };

  const boxStyle = {
    position: "relative",
    width: "min(600px, 90vw)",
    height: "min(600px, 80vh)",
    boxSizing: "border-box",
    overflow: "hidden",
    boxShadow: "0 30px 50px rgba(82, 78, 78, 0.5)",
  };

  const boxBeforeStyle = {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(255,255,255,.1)",
    pointerEvents: "none",
  };

  const contentStyle = {
    position: "absolute",
    top: "15px",
    left: "15px",
    right: "15px",
    bottom: "15px",
    border: "2px solid aqua",
    padding: "30px",
    textAlign: "center",
    boxShadow: "0 5px 10px rgba(0,0,0,.5)",
    overflow: "auto",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    margin: "20px auto",
    width: "100%",
    maxWidth: "400px",
  };

  const inputStyle = {
    fontSize: "18px",
    borderRadius: "10px",
    border: "1px white solid",
    background: "transparent",
    color: "white",
    padding: "12px",
    marginBottom: "15px",
  };

  const textareaStyle = {
    height: "80px",
    borderRadius: "10px",
    border: "1px white solid",
    background: "transparent",
    color: "white",
    fontSize: "18px",
    padding: "12px",
    marginBottom: "15px",
    resize: "vertical",
    fontFamily: "inherit",
  };

  const buttonStyle = {
    marginTop: "20px",
    borderRadius: "10px",
    border: "1px white solid",
    background: "transparent",
    color: "white",
    fontSize: "24px",
    padding: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const spanStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "block",
    boxSizing: "border-box",
  };

  // CSS for the animations
  const animationCSS = `
    .contact-box-span::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 4px;
      background: #ff1100;
      animation: animate1 2s linear infinite;
    }
    
    .contact-box-span:nth-child(1) {
      transform: rotate(0deg);
    }
    .contact-box-span:nth-child(2) {
      transform: rotate(90deg);
    }
    .contact-box-span:nth-child(3) {
      transform: rotate(180deg);
    }
    .contact-box-span:nth-child(4) {
      transform: rotate(270deg);
    }
    
    .contact-box-span:nth-child(2)::before {
      animation-delay: -2s;
    }
    
    @keyframes animate1 {
      0% {
        transform: scaleX(0);
        transform-origin: left;
      }
      50% {
        transform: scaleX(1);
        transform-origin: left;
      }
      50.1% {
        transform: scaleX(1);
        transform-origin: right;
      }
      100% {
        transform: scaleX(0);
        transform-origin: right;
      }
    }
    
    .contact-button:hover {
      color: black !important;
      background: white !important;
    }
    
    .contact-input::placeholder,
    .contact-textarea::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  `;

  return (
    <>
      <style>{animationCSS}</style>
      <div style={contactPageStyle}>
        <div style={boxStyle}>
          <span style={spanStyle} className="contact-box-span"></span>
          <span style={spanStyle} className="contact-box-span"></span>
          <span style={spanStyle} className="contact-box-span"></span>
          <span style={spanStyle} className="contact-box-span"></span>
          <div style={boxBeforeStyle}></div>
          <div style={contentStyle}>
            <h1
              style={{
                color: "white",
                fontSize: "clamp(24px, 5vw, 30px)",
                margin: "0 0 20px 0",
                padding: 0,
              }}
            >
              Let's Connect
            </h1>
            <form style={formStyle} onSubmit={handleSubmit}>
              <p
                style={{
                  color: "white",
                  margin: "10px 0 5px 0",
                  textAlign: "left",
                }}
              >
                Name
              </p>
              <input
                name="name"
                value={formData.name}
                onChange={handleInput}
                style={inputStyle}
                className="contact-input"
                placeholder="Your name"
              />

              <p
                style={{
                  color: "white",
                  margin: "10px 0 5px 0",
                  textAlign: "left",
                }}
              >
                Message
              </p>
              <textarea
                value={formData.message}
                onChange={handleInput}
                name="message"
                style={textareaStyle}
                className="contact-textarea"
                placeholder="Your message"
              />

              <p
                style={{
                  color: "white",
                  margin: "10px 0 5px 0",
                  textAlign: "left",
                }}
              >
                Email
              </p>
              <input
                value={formData.email}
                onChange={handleInput}
                name="email"
                type="email"
                style={inputStyle}
                className="contact-input"
                placeholder="Your email"
              />

              <button
                type="submit"
                style={buttonStyle}
                className="contact-button"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
