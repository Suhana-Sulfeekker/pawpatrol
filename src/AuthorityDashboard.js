import React, { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { jsPDF } from "jspdf";  
import "jspdf-autotable"; 
import './App.css';

function AuthorityDashboard() {
  const [sightings, setSightings] = useState([]);
  const [filteredSightings, setFilteredSightings] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const fetchSightings = async () => {
      const sightingsRef = collection(db, "sightings");
      const q = query(sightingsRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const sightingsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSightings(sightingsData);
      setFilteredSightings(sightingsData); // Default to show all initially
    };

    const fetchUserDetails = () => {
      const user = auth.currentUser;
      if (user) {
        setUserDetails({ email: user.email, username: user.displayName });
      }
    };

    fetchSightings();
    fetchUserDetails();
  }, []);

  // Function to filter sightings based on search input and date range
  useEffect(() => {
    let filteredData = sightings;

    if (searchLocation) {
      filteredData = filteredData.filter((sighting) =>
        sighting.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    if (fromDate && toDate) {
      const fromTimestamp = new Date(fromDate).getTime();
      const toTimestamp = new Date(toDate).getTime();
      filteredData = filteredData.filter((sighting) => {
        const sightingTimestamp = sighting.timestamp?.toDate().getTime();
        return sightingTimestamp >= fromTimestamp && sightingTimestamp <= toTimestamp;
      });
    }

    setFilteredSightings(filteredData);
  }, [searchLocation, fromDate, toDate, sightings]);

  // Generate PDF Report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Stray Dog Sightings Report", 20, 10);
    doc.autoTable({
      head: [["ID", "User Email", "Location", "Latitude", "Longitude", "Description", "Timestamp"]],
      body: filteredSightings.map((sighting) => [
        sighting.id,
        sighting.username,
        sighting.location,
        sighting.latitude,
        sighting.longitude,
        sighting.description || "N/A",
        sighting.timestamp?.toDate().toLocaleString(),
      ]),
    });
    doc.save("sightings-report.pdf");
  };

  return (
    <div className="authority-dashboard">
      <div className="header">
        <h2>Authority Dashboard</h2>
        {userDetails && (
          <div className="user-info">
            <h4>Logged in as: {userDetails.username || "N/A"}</h4>
            <p>Email: {userDetails.email}</p>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="search-input"
        />
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="date-input"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="date-input"
        />
      </div>

      {/* Table */}
      <div className="table-container">
        <h3>Stray Dog Sightings Details</h3>
        {filteredSightings.length > 0 ? (
          <table className="sightings-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User Email</th>
                <th>Location</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Description</th>
                <th>Timestamp</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {filteredSightings.map((sighting) => (
                <tr key={sighting.id}>
                  <td>{sighting.id}</td>
                  <td>{sighting.username}</td>
                  <td>{sighting.location}</td>
                  <td>{sighting.latitude}</td>
                  <td>{sighting.longitude}</td>
                  <td>{sighting.description || "N/A"}</td>
                  <td>{sighting.timestamp?.toDate().toLocaleString()}</td>
                  <td>
                    {sighting.imageUrl ? (
                      <a href={sighting.imageUrl} target="_blank" rel="noopener noreferrer">
                        View Image
                      </a>
                    ) : (
                      "No Image"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No sightings found.</p>
        )}
      </div>

      <div className="download-section">
        <button className="generate-pdf-btn" onClick={generatePDF}>
          Generate PDF Report
        </button>
      </div>
    </div>
  );
}

export default AuthorityDashboard;