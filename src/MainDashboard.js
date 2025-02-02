// src/pages/MainDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';  
import './MainDashboard.css';  

const MainDashboard = () => {

    const navigate = useNavigate(); 
    const goToMainDashboard = () => { 
    navigate('/main-dashboard');  
};
  return (
    <div className="main-dashboard">
    <div className="button-container">
    <button className="dashboard-button" onClick={() => navigate('/Map')}>
       View Map
    </button>

    <button
        className="dashboard-button"
        onClick={() => {
    let userLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    
    if (userLoggedIn) {
      // Navigate to the user dashboard if logged in
      navigate('/user-dashboard');
    } else {
          alert("You must be logged in to upload a photo.");
     }
  }}
> Upload Photo
</button>

   <button className="dashboard-button" onClick={() => navigate('/helpline')}>
       Helpline Contact
    </button>
  </div>
  </div>
  );
};

export default MainDashboard;
