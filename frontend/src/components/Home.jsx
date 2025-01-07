import React from 'react';

const Home = () => {
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {/* Background image */}
      <img
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        src="https://media.gettyimages.com/id/1298136769/video/social-media-speech-bubbles-4k-looped-background-footage.jpg?s=640x640&k=20&c=Moe-fPEN_e2eL6fSmA1Sln52tzBGs6xwTXiTxYXcTHQ="
        alt="background"
      />

      {/* Overlay */}
      <div
        className="overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent overlay
          display: 'flex',
          flexDirection: 'column', // Stack elements vertically
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        {/* Text */}
        <h1 style={{ margin: 0, opacity: 1, zIndex: 1 }}>Welcome to Survey Builder</h1>
        
        
        <button
          className="btn btn-primary"
          style={{
            marginTop: '20px', // Add spacing between text and button
            padding: '10px 20px',
            fontSize: '16px',
            opacity: 1, // Ensure full opacity
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
