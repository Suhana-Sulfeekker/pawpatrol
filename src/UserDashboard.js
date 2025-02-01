import React, { useState } from "react";
import buzzer from "./assets/buzzer.jpeg";
import axios from "axios";

function UserDashboard() {
  const [image, setImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [location, setLocation] = useState(null);
  const [locationMessage, setLocationMessage] = useState(""); // New state for location message
  const [locationDetails, setLocationDetails] = useState(null); // State to store the location details

  // Function to open the camera and capture an image
  const handleCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();

      setTimeout(() => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setImage(canvas.toDataURL("image/png"));
        stream.getTracks().forEach((track) => track.stop()); // Stop camera
      }, 1000);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  // Function to get user location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation({
            latitude,
            longitude,
            timestamp: new Date().toISOString(),
          });

          // Fetch location name using reverse geocoding
          fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          )
            .then((response) => response.json())
            .then((data) => {
              const locationName = data.display_name || "Location not found";
              setLocationDetails(locationName); // Set the location name in state
            })
            .catch((error) => {
              console.error("Error fetching location name:", error);
            });

          setLocationMessage("Location retrieved successfully!"); // Set the success message
          console.log("Location fetched:", position.coords);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Failed to get location");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Function to upload image to Cloudinary
  const uploadImageToCloudinary = async () => {
    if (!image) {
      alert("Please capture an image first!");
      return;
    }

    if (!location) {
      alert("Please enable location first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", image); // The captured image
    formData.append("upload_preset", "PawPatrol"); // Your Cloudinary upload preset
    formData.append("cloud_name", "dyx30ezh4"); // Your Cloudinary cloud name

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dyx30ezh4/image/upload",
        formData
      );
      const uploadedImageUrl = response.data.secure_url; // URL of the uploaded image
      setUploadedImageUrl(uploadedImageUrl); // Set the image URL to display it
      console.log("Image URL:", uploadedImageUrl);

      // Report the sighting along with location and timestamp
      console.log("Sighting Reported:", {
        latitude: location.latitude,
        longitude: location.longitude,
        timestamp: location.timestamp,
        imageUrl: uploadedImageUrl || "",
      });

      alert("Sighting reported successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    }
  };

  return (
    <div className="user-dashboard">
      <h2 className="pixel-text">Do you want to report a Stray Dog Sighting?</h2>

      <div className="buzzer-container" onClick={getLocation}>
        <img src={buzzer} alt="Red Buzzer" className="buzzer" />
      </div>

      {locationMessage && <p className="location-message">{locationMessage}</p>} {/* Display location message */}

      {locationDetails && <p>Location: {locationDetails}</p>} {/* Display location name */}

      <h3 className="pixel-text">If possible, can you please upload the image of the Stray Dog?</h3>
      
      <button className="capture-button" onClick={handleCapture}>
        Click Photo
      </button>

      {image && <img src={image} alt="Captured" className="captured-image" />}
      
      <button className="capture-button" onClick={uploadImageToCloudinary}>
        Upload
      </button>

      {uploadedImageUrl && (
        <div>
          <h4>Uploaded Image URL:</h4>
          <p>{uploadedImageUrl}</p> {/* Display URL as text */}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
