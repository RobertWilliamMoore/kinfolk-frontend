import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import './Home.css'; // We'll create this right after so it matches your login theme!

function Home() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // 1. Check if user is logged in (Route Protection)
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    // 2. Parse and set user state for the dashboard
    setCurrentUser(JSON.parse(storedUser));
  }, [navigate]);

  return (
    <div className="home-wrapper">
      <Navigation />
      
      <main className="dashboard-content">
        <div className="dashboard-hero">
          <h1>Welcome back, {currentUser?.username || 'Kinfolk'}</h1>
          <p>Your secure connection to the Spring Boot backend is active.</p>
        </div>

        {/* Next up: We will build the Post Feed & Post Creation components here */}
        <div className="feed-placeholder">
          <h3>Your Feed</h3>
          <p>Ready to build out your posts and timeline next.</p>
        </div>
      </main>
    </div>
  );
}

export default Home;