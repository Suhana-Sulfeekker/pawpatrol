import React from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import backgroundImage from './assets/background.jpg';

function LandingPage() {
  const navigate = useNavigate();

  const handleUserLogin = () => {
    signInWithPopup(auth, provider)
      .then(() => navigate('/user-dashboard'))
      .catch((error) => console.error("Error during user sign-in:", error));
  };

  const handleAuthorityLogin = () => {
    signInWithPopup(auth, provider)
      .then(() => navigate('/authority-dashboard'))
      .catch((error) => console.error("Error during authority sign-in:", error));
  };

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">PawPatrol 🐾</div>
        <div className="nav-buttons">
          <button className="login-button" onClick={handleUserLogin}>Login</button>
          <button className="authority-button" onClick={handleAuthorityLogin}>Authority Login</button>
        </div>
      </nav>

      <div className="image-container">
        <img src={backgroundImage} alt="Paw Patrol" className="center-image" />
      </div>

      <div className="text-section">
        <h2 className="headline">Keeping Neighborhoods Safe !!</h2>
        <p className="subtext">Report dangerous stray dog sightings in your area.</p>
      </div>
    </div>
  );
}

export default LandingPage;