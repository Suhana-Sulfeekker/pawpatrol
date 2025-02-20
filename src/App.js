import React from 'react';
import './App.css';
//import { BrowserRouter as Router } from 'react-router-dom'; // Route, Switch
import { useNavigate } from 'react-router-dom';
import { auth, provider, db } from "./firebase"; 
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; 
//import Layout from './components/layout';
import backgroundImage from './assets/background.jpg';
//import MainDashboard from './MainDashboard';

function LandingPage() {
  const navigate = useNavigate();

  const handleUserLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User logged in:", result.user.email);
      localStorage.setItem('userLoggedIn', 'true');
      navigate('/main-dashboard'); 
    } catch (error) {
      console.error("Error during user sign-in:", error);
      alert("Login failed. Please try again.");
    }
  };

  const handlewihtoutLogin = async () => {
    localStorage.setItem('userLoggedIn', 'false');
    navigate('/main-dashboard'); 
  };
  const handleAuthorityLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Authority login attempt:", user.email);

      // Check Firestore for authority role
      const docRef = doc(db, "authorities", user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().role === "authority") {
        console.log("Access granted to:", user.email);
        navigate('/authority-dashboard'); 
      } else {
        console.warn("Access denied for:", user.email);
        alert("Access Denied: You are not authorized.");
        await auth.signOut();
      }
    } catch (error) {
      console.error("Error during authority sign-in:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">PawPatrol 🐾</div>
        <div className="nav-buttons">
          <button className="login-button" onClick={handleUserLogin}>Login</button>
          <button className="authority-button" onClick={handleAuthorityLogin}>Authority Login</button>
          <button className="without-login-button" onClick={handlewihtoutLogin}>Continue Without Login</button>
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
   // </Layout>
  );
}

export default LandingPage;
