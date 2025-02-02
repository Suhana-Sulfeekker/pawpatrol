import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

L.Icon.Default.mergeOptions({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

function MapPage() {
    const [userLocation, setUserLocation] = useState(null);
    const [sightings, setSightings] = useState([]);
    const mapRef = useRef(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                    fetchSightingsData();
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("Error getting location. Please enable location services.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    }, []);

    
    const fetchSightingsData = async () => {
        try {
            const sightingsRef = collection(db, "sightings");
            const snapshot = await getDocs(sightingsRef);
            const locations = snapshot.docs.map((doc) => {
                const data = doc.data();
                return { 
                    id: doc.id,
                    lat: data.latitude, 
                    lng: data.longitude, 
                    timestamp: data.timestamp ? data.timestamp.toDate() : null,
                    location: data.location || "Unknown Location"
                };
            });

            setSightings(locations);
        } catch (error) {
            console.error("Error fetching sightings:", error);
            alert("Error fetching sightings data. Please try again later.");
        }
    };

    
    const groupSightingsByLocation = (sightings) => {
        const grouped = sightings.reduce((acc, sighting) => {
            const key = `${sighting.lat},${sighting.lng}`;
            if (!acc[key]) {
                acc[key] = {
                    location: sighting.location,
                    sightings: []
                };
            }
            acc[key].sightings.push(sighting.timestamp);
            return acc;
        }, {});

        return grouped;
    };

    const groupedSightings = groupSightingsByLocation(sightings);

   
    const formatDate = (timestamp) => {
        if (timestamp) {
            return new Date(timestamp).toLocaleString();
        }
        return "Invalid Date";
    };

    
    const getHourlyData = (timestamps) => {
        const hourlyCounts = new Array(24).fill(0); 

        timestamps.forEach((timestamp) => {
            if (timestamp) {
                const hour = new Date(timestamp).getHours();
                hourlyCounts[hour] += 1;
            }
        });

        return {
            labels: Array.from({ length: 24 }, (_, i) => `${i}:00`), 
            datasets: [
                {
                    label: "Sightings per Hour",
                    data: hourlyCounts,
                    backgroundColor: "rgba(255, 69, 69, 0.8)", 
                    borderColor: "rgba(255, 0, 0, 1)",
                    borderWidth: 1,
                },
            ],
        };
    };

    return (
        <>
            {/* 🟥🖤 Popup & Chart Styling */}
            <style>{`
                .custom-popup {
    background: #111 !important;
    color: #ff4444 !important;
    border: 2px solid #ff0000 !important;
    border-radius: 10px !important;
    padding: 10px !important;
    text-align: center !important;
    max-width: 480px !important; /* Slightly increased width */
    min-height: 400px !important; /* Ensures enough space */
}

.custom-popup h4 {
    color: #ff4444;
}

.chart-container {
    width: 100%; /* Ensures chart doesn't overflow */
    max-width: 380px; /* Prevents it from exceeding popup width */
    height: 180px; /* Slightly adjusted height */
    background: #111;
    border-radius: 8px;
    padding: 0; /* Remove unnecessary padding */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto; /* Ensures centering */
}


            `}</style>

            <div className="map-wrapper">
                <h2 className="map-heading">Stray Dog Sighting Map</h2>
                <div className="map-container">
                    {userLocation ? (
                        <MapContainer
                            center={[userLocation.lat, userLocation.lng]}
                            zoom={13}
                            style={{ height: "80vh", width: "100%" }}
                            whenCreated={(map) => (mapRef.current = map)}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                            />
                            {Object.keys(groupedSightings).map((key) => {
                                const [lat, lng] = key.split(",");
                                const { location, sightings } = groupedSightings[key];
                                const chartData = getHourlyData(sightings);

                                return (
                                    <Marker key={key} position={[parseFloat(lat), parseFloat(lng)]}>
                                        <Popup>
                                            <div className="custom-popup">
                                                <h4>Sightings at this location:</h4>
                                                <p><strong>Location:</strong> {location}</p>
                                                {sightings.map((timestamp, index) => (
                                                    <p key={index}><strong>Date and Time:</strong> {formatDate(timestamp)}</p>
                                                ))}
                                                <h5>Hourly Sighting Distribution</h5>
                                                <div className="chart-container">
                                                    <Bar
                                                        data={chartData}
                                                        options={{
                                                            responsive: true,
                                                            maintainAspectRatio: false,
                                                            plugins: {
                                                                legend: { display: false },
                                                            },
                                                            scales: {
                                                                x: {
                                                                    ticks: { color: "#ff4444", font: { size: 10 } },
                                                                    grid: { color: "#444" },
                                                                },
                                                                y: {
                                                                    ticks: { color: "#ff4444", font: { size: 10 } },
                                                                    grid: { color: "#444" },
                                                                },
                                                            },
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </Popup>
                                    </Marker>
                                );
                            })}
                        </MapContainer>
                    ) : (
                        <p>Loading map...</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default MapPage;
