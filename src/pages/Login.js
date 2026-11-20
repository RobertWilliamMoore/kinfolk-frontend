import React, { useEffect, useState } from 'react';
import './Login.css';

// Import your logo matching the exact filename and extension
import logo from '../images/kinfolk-logo.jpg'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const loginText = document.querySelector('.title.login');
    const signupText = document.querySelector('.title.signup');
    const sliderTab = document.querySelector('.slider-tab');
    if (loginText && signupText && sliderTab) {
      if (isLogin) {
        loginText.style.marginLeft = '20%';
        signupText.style.marginLeft = '100%';
        sliderTab.style.transform = 'translateX(0%)';
      } else {
        loginText.style.marginLeft = '-100%';
        signupText.style.marginLeft = '50%';
        sliderTab.style.transform = 'translateX(0%)';
      }
    }
  }, [isLogin]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        // Save user session so Home.js route protection grants access
        localStorage.setItem('currentUser', JSON.stringify({ username }));
        
        window.location.replace('/home');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        alert('Signup successful! You can now log in.');
        setIsLogin(true);
      } else {
        alert('Signup failed');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Signup failed');
    }
  };

  return (
    <div className="container">
      {/* Custom Kinfolk Branding Header */}
      <div className="brand-header">
        <img src={logo} alt="Kinfolk Logo" className="brand-logo" /> 
        <h1 className="brand-title">KINFOLK</h1>
      </div>

      <div className="title-text">
        <div className="title login">Welcome Back</div>
        <div className="title signup">Join Us</div>
      </div>
      <div className="form-container">
        <div className="slide-controls">
          <input
            type="radio"
            name="slide"
            id="login"
            checked={isLogin}
            onChange={() => setIsLogin(true)}
          />
          <input
            type="radio"
            name="slide"
            id="signup"
            checked={!isLogin}
            onChange={() => setIsLogin(false)}
          />
          <label htmlFor="login" className="slide login">
            Login
          </label>
          <label htmlFor="signup" className="slide signup">
            Signup
          </label>
          <div className="slider-tab"></div>
        </div>
        <div className="form-inner">
          {isLogin ? (
            <form className="login" onSubmit={handleLogin}>
              <div className="field">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="pass-link">
                <a href="#forgot" onClick={(e) => e.preventDefault()}>Forgot password?</a>
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Login" />
              </div>
              <div className="signup-link">
                Not a member?{' '}
                <a href="#signup" onClick={(e) => { e.preventDefault(); setIsLogin(false); }}>
                  Signup now
                </a>
              </div>
            </form>
          ) : (
            <form className="signup" onSubmit={handleSignup}>
              <div className="field">
                <input
                  type="text"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Signup" />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;