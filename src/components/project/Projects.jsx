import { useEffect, useRef, useState, useCallback } from "react";
import turbolog from "../gif/turbolog.gif";
import rovinox from "../gif/rovinox.gif";
import portfolio from "../gif/portfolio.gif";
import amacon from "../gif/amacon.gif";
import slack from "../gif/slack.gif";
import bootcamp from "../gif/Bootcamp.gif";

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward (for ping-pong)
  const containerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const lastScrollTime = useRef(0);
  const accumulatedDelta = useRef(0);
  const autoPlayRef = useRef(null);
  const resumeTimeoutRef = useRef(null);

  const AUTO_PLAY_INTERVAL = 3000; // 3 seconds between cards
  const RESUME_DELAY = 5000; // 5 seconds before resuming auto-play

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

  const totalCards = allCard.length;

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Pause auto-play and schedule resume
  const pauseAutoPlay = useCallback(() => {
    setIsPaused(true);

    // Clear existing resume timeout
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    // Schedule resume after 5 seconds of inactivity
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, RESUME_DELAY);
  }, [RESUME_DELAY]);

  // Auto-play effect - ping-pong carousel (goes forward then backward)
  useEffect(() => {
    if (isPaused) {
      // Clear auto-play when paused
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
      return;
    }

    // Start auto-play with ping-pong effect
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        // If at the last card, reverse direction
        if (prev >= totalCards - 1 && direction === 1) {
          setDirection(-1);
          return prev - 1;
        }
        // If at the first card, go forward
        if (prev <= 0 && direction === -1) {
          setDirection(1);
          return prev + 1;
        }
        // Otherwise, continue in current direction
        return prev + direction;
      });
    }, AUTO_PLAY_INTERVAL);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPaused, totalCards, direction, AUTO_PLAY_INTERVAL]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  // Navigate function with bounds checking
  const navigate = useCallback((delta) => {
    pauseAutoPlay(); // Pause auto-play on user interaction
    setCurrentIndex((prev) => {
      const newIndex = prev + delta;
      return Math.max(0, Math.min(totalCards - 1, newIndex));
    });
  }, [totalCards, pauseAutoPlay]);

  // Desktop: Mouse wheel scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isMobile) return;

    const handleWheel = (e) => {
      e.preventDefault();

      const now = Date.now();
      const timeDelta = now - lastScrollTime.current;

      // Reset accumulated delta if too much time passed
      if (timeDelta > 200) {
        accumulatedDelta.current = 0;
      }

      // Accumulate scroll delta
      accumulatedDelta.current += e.deltaY;
      lastScrollTime.current = now;

      // Threshold for one card movement
      const threshold = 80;

      // Calculate how many cards to move based on scroll speed
      if (Math.abs(accumulatedDelta.current) >= threshold) {
        const cardsToMove = Math.floor(Math.abs(accumulatedDelta.current) / threshold);
        const direction = accumulatedDelta.current > 0 ? 1 : -1;

        // Limit max cards to skip to 3
        const limitedMove = Math.min(cardsToMove, 3) * direction;
        navigate(limitedMove);

        // Reset accumulated delta
        accumulatedDelta.current = 0;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [isMobile, navigate]);

  // Mobile: Touch swipe handling
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isMobile) return;

    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const deltaX = touchStartX.current - touchEndX;
      const deltaY = touchStartY.current - touchEndY;

      // Only handle horizontal swipes (ignore vertical)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        // Calculate cards to move based on swipe distance
        const cardsToMove = Math.min(Math.floor(Math.abs(deltaX) / 100), 3);

        if (deltaX > 0) {
          navigate(Math.max(1, cardsToMove)); // Swipe left = next
        } else {
          navigate(-Math.max(1, cardsToMove)); // Swipe right = prev
        }
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, navigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        navigate(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        navigate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Responsive card dimensions
  const getResponsiveDimensions = () => {
    if (isMobile) {
      return {
        cardWidth: Math.min(320, window.innerWidth - 40),
        cardHeight: 450,
        spacing: 60,
        imageHeight: 180,
      };
    }
    return {
      cardWidth: 420,
      cardHeight: 500,
      spacing: 320,
      imageHeight: 220,
    };
  };

  const dimensions = getResponsiveDimensions();

  // Styles
  const containerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    touchAction: 'none', // Prevent default touch behaviors
  };

  const titleStyle = {
    color: 'white',
    fontSize: isMobile ? '1.5rem' : 'clamp(1.8rem, 5vw, 2.5rem)',
    textAlign: 'center',
    marginBottom: isMobile ? '20px' : '30px',
    fontWeight: 'bold',
    position: 'relative',
    zIndex: 10,
    padding: isMobile ? '10px 20px' : '15px 40px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  };

  const carouselContainerStyle = {
    position: 'relative',
    width: '100%',
    height: isMobile ? '480px' : '520px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const getCardStyle = (index) => {
    const offset = index - currentIndex;
    const isActive = offset === 0;
    const maxVisibleOffset = isMobile ? 1 : 2;
    const isVisible = Math.abs(offset) <= maxVisibleOffset;

    if (!isVisible) {
      return { display: 'none' };
    }

    const { cardWidth, cardHeight, spacing } = dimensions;

    // Calculate horizontal position
    const translateX = offset * spacing;

    // Scale based on distance from center
    const scale = isActive ? 1 : isMobile ? 0.85 : 0.75 - Math.abs(offset) * 0.05;

    // Opacity based on distance
    const opacity = isActive ? 1 : isMobile ? 0.5 : 0.4 - Math.abs(offset) * 0.1;

    // Z-index - active card on top
    const zIndex = 10 - Math.abs(offset);

    // Parallax vertical offset
    const translateY = Math.abs(offset) * (isMobile ? 10 : 20);

    return {
      position: 'absolute',
      width: `${cardWidth}px`,
      height: `${cardHeight}px`,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      border: isActive ? '2px solid rgba(100, 181, 246, 0.5)' : '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: isMobile ? '15px' : '20px',
      overflow: 'hidden',
      boxShadow: isActive
        ? '0 25px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(100, 181, 246, 0.2)'
        : '0 10px 30px rgba(0, 0, 0, 0.3)',
      transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
      opacity,
      zIndex,
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(10px)',
      cursor: isActive ? 'default' : 'pointer',
    };
  };

  const imageContainerStyle = {
    width: '100%',
    height: `${dimensions.imageHeight}px`,
    overflow: 'hidden',
    position: 'relative',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease',
  };

  const contentStyle = {
    padding: isMobile ? '15px' : '25px',
    height: `calc(100% - ${dimensions.imageHeight}px)`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const titleCardStyle = {
    color: '#64B5F6',
    fontSize: isMobile ? '1.2rem' : '1.5rem',
    fontWeight: 'bold',
    marginBottom: isMobile ? '8px' : '12px',
  };

  const toolsStyle = {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: isMobile ? '0.75rem' : '0.85rem',
    marginBottom: isMobile ? '8px' : '12px',
    lineHeight: '1.4',
  };

  const descriptionStyle = {
    color: 'white',
    fontSize: isMobile ? '0.85rem' : '0.95rem',
    lineHeight: '1.5',
    marginBottom: isMobile ? '15px' : '20px',
    flex: 1,
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: isMobile ? 3 : 4,
    WebkitBoxOrient: 'vertical',
  };

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: '2px solid #64B5F6',
    color: '#64B5F6',
    padding: isMobile ? '10px 18px' : '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: isMobile ? '0.9rem' : '1rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center',
  };

  const indicatorContainerStyle = {
    position: 'absolute',
    bottom: isMobile ? '25px' : '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: isMobile ? '8px' : '12px',
    zIndex: 20,
  };

  const getIndicatorStyle = (index) => ({
    width: index === currentIndex ? (isMobile ? '24px' : '32px') : (isMobile ? '8px' : '10px'),
    height: isMobile ? '8px' : '10px',
    borderRadius: '5px',
    backgroundColor: index === currentIndex ? '#64B5F6' : 'rgba(255, 255, 255, 0.3)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  });

  const counterStyle = {
    position: 'absolute',
    bottom: isMobile ? '55px' : '80px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: isMobile ? '0.8rem' : '0.9rem',
    zIndex: 20,
  };

  const scrollHintStyle = {
    position: 'absolute',
    bottom: isMobile ? '85px' : '120px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: isMobile ? '0.75rem' : '0.85rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    opacity: currentIndex === 0 ? 1 : 0,
    transition: 'opacity 0.3s ease',
    zIndex: 20,
  };

  // Navigation arrows for desktop
  const arrowStyle = (direction) => ({
    position: 'absolute',
    top: '50%',
    [direction]: isMobile ? '10px' : '30px',
    transform: 'translateY(-50%)',
    width: isMobile ? '40px' : '50px',
    height: isMobile ? '40px' : '50px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    fontSize: isMobile ? '1.2rem' : '1.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 25,
    transition: 'all 0.3s ease',
    opacity: (direction === 'left' && currentIndex === 0) ||
             (direction === 'right' && currentIndex === totalCards - 1) ? 0.3 : 1,
    pointerEvents: (direction === 'left' && currentIndex === 0) ||
                   (direction === 'right' && currentIndex === totalCards - 1) ? 'none' : 'auto',
  });

  const handleCardClick = (index) => {
    if (index !== currentIndex) {
      pauseAutoPlay();
      setCurrentIndex(index);
    }
  };

  const handleIndicatorClick = (index) => {
    pauseAutoPlay();
    setCurrentIndex(index);
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      <h1 style={titleStyle}>My Projects</h1>

      <div style={carouselContainerStyle}>
        {/* Left Arrow */}
        <div
          style={arrowStyle('left')}
          onClick={() => navigate(-1)}
          onMouseEnter={(e) => {
            if (currentIndex > 0) {
              e.currentTarget.style.backgroundColor = 'rgba(100, 181, 246, 0.3)';
              e.currentTarget.style.borderColor = '#64B5F6';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          &#8249;
        </div>

        {/* Cards */}
        {allCard.map((item, index) => (
          <div
            key={index}
            style={getCardStyle(index)}
            onClick={() => handleCardClick(index)}
            onMouseEnter={(e) => {
              if (index === currentIndex && !isMobile) {
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
              }
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
                  <strong>Tech:</strong> {item.tool}
                </p>
                <p style={descriptionStyle}>{item.description}</p>
              </div>
              <a
                href={item.githubURL}
                target="_blank"
                rel="noopener noreferrer"
                style={buttonStyle}
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#64B5F6';
                  e.target.style.color = 'white';
                  e.target.style.boxShadow = '0 4px 20px rgba(100, 181, 246, 0.4)';
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

        {/* Right Arrow */}
        <div
          style={arrowStyle('right')}
          onClick={() => navigate(1)}
          onMouseEnter={(e) => {
            if (currentIndex < totalCards - 1) {
              e.currentTarget.style.backgroundColor = 'rgba(100, 181, 246, 0.3)';
              e.currentTarget.style.borderColor = '#64B5F6';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          &#8250;
        </div>
      </div>

      {/* Scroll/Swipe hint */}
      <div style={scrollHintStyle}>
        <span>{isMobile ? 'Swipe to explore' : 'Scroll to explore'}</span>
        <span style={{ animation: 'bounce 1s infinite' }}>{isMobile ? '←→' : '↓'}</span>
      </div>

      {/* Auto-play indicator */}
      <div
        style={{
          position: 'absolute',
          top: isMobile ? '80px' : '100px',
          right: isMobile ? '15px' : '30px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: isMobile ? '0.7rem' : '0.8rem',
          zIndex: 20,
          cursor: 'pointer',
          padding: '8px 12px',
          borderRadius: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease',
        }}
        onClick={() => {
          if (isPaused) {
            setIsPaused(false);
          } else {
            pauseAutoPlay();
          }
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(100, 181, 246, 0.2)';
          e.currentTarget.style.borderColor = 'rgba(100, 181, 246, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }}
      >
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: isPaused ? 'rgba(255, 255, 255, 0.4)' : '#64B5F6',
          animation: isPaused ? 'none' : 'pulse 1.5s infinite',
        }} />
        <span>{isPaused ? 'Paused' : 'Auto-play'}</span>
      </div>

      {/* Counter */}
      <div style={counterStyle}>
        {currentIndex + 1} / {totalCards}
      </div>

      {/* Dot indicators */}
      <div style={indicatorContainerStyle}>
        {allCard.map((_, index) => (
          <div
            key={index}
            style={getIndicatorStyle(index)}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </div>

      {/* Inject animations */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default Projects;
