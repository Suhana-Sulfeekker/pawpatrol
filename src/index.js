import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Layout from './components/Layout';
import UserDashboard from './UserDashboard';
import AuthorityDashboard from './AuthorityDashboard';
import Map from './Map';
import MainDashboard from './MainDashboard';

  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/authority-dashboard" element={<AuthorityDashboard />} />
        <Route path="/main-dashboard" element={<MainDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/Map" element={<Map />} />
      </Routes>
    </Layout>
  </Router>
</React.StrictMode>
);
