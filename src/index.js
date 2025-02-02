import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import UserDashboard from './UserDashboard';
import AuthorityDashboard from './AuthorityDashboard';
import Map from './Map';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/authority-dashboard" element={<AuthorityDashboard />} />
        <Route path="/Map" element={<Map />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
