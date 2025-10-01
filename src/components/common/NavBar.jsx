import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header style={{
      background: 'transparent',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
      overflow: 'hidden',
       position:"absolute",
       zIndex:"1"
    }}>
      {/* Logo/Title */}
      <Link
        style={{
          textDecoration: 'none',
          color: 'red',
          fontSize: 'clamp(30px, 8vw, 50px)',
          fontFamily: 'Alfa Slab One, serif',
          flexShrink: 0
        }}
        to="/"
      >
        N M
      </Link>

      {/* Navigation Links */}
      <nav style={{
        display: 'flex',
        gap: 'clamp(16px, 4vw, 32px)',
        alignItems: 'center',
        flexShrink: 0,
       
      }}>
        <Link 
          style={{ 
            fontSize: 'clamp(16px, 3vw, 20px)', 
            color: 'white',
            textDecoration: 'none',
            transition: 'opacity 0.3s ease',
            whiteSpace: 'nowrap'
          }} 
          to="/projects"
          onMouseEnter={(e) => e.target.style.opacity = '0.7'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          Projects
        </Link>
        <Link 
          style={{ 
            fontSize: 'clamp(16px, 3vw, 20px)', 
            color: 'white',
            textDecoration: 'none',
            transition: 'opacity 0.3s ease',
            whiteSpace: 'nowrap'
          }} 
          to="/contact"
          onMouseEnter={(e) => e.target.style.opacity = '0.7'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;