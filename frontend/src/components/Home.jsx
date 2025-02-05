import React from 'react';

const Home = () => {
  return (
    <div style={{ position: 'relative', height: '100vh',  background: "lightblue"}}>
     <div className = "main-container">

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
