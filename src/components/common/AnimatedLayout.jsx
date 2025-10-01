import React from "react";

const AnimatedLayout = ({ children }) => {
  const backgroundContainerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1
  };

  const starsStyle = {
    background: 'black url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/stars.png) repeat',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'block',
    zIndex: 0
  };

  const twinklingStyle = {
    width: '10000px',
    height: '100%',
    background: 'transparent url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/twinkling.png") repeat',
    backgroundSize: '1000px 1000px',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
    animation: 'move-background 70s linear infinite'
  };

  const cloudsStyle = {
    width: '10000px',
    height: '100%',
    background: 'transparent url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/clouds_repeat.png") repeat',
    backgroundSize: '1000px 1000px',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 3,
    animation: 'move-background 30s linear infinite'
  };

  const moonStyle = {
    height: '70vh',
    width: '70vh',
    position: 'absolute',
    zIndex: 3,
    right: '20px',
    marginTop: '20px'
  };

  const contentWrapperStyle = {
    position: 'relative',
    zIndex: 10,
    minHeight: '100vh',
    width: '100%',
    maxWidth: '100vw',
    overflowX: 'hidden',
    boxSizing: 'border-box'
  };

  const keyframesCSS = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body, html {
      width: 100%;
      max-width: 100vw;
      overflow-x: hidden;
    }
    
    @keyframes move-background {
      from {
        transform: translate3d(0px, 0px, 0px);
      }
      to {
        transform: translate3d(1000px, 0px, 0px);
      }
    }
  `;

  return (
    <>
      {/* Inject keyframes */}
      <style>{keyframesCSS}</style>
      
      {/* Animated Background */}
      <div style={backgroundContainerStyle}>
        <img
          style={moonStyle}
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/moon2.png"
          alt="Moon"
        />
        <div style={starsStyle}></div>
        <div style={twinklingStyle}></div>
        <div style={cloudsStyle}></div>
      </div>

      {/* Content Layer */}
      <div style={contentWrapperStyle}>
        {children}
      </div>
    </>
  );
};

export default AnimatedLayout;