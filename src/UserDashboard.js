import React, { useState } from "react";
import buzzer from "./assets/buzzer.jpeg";
import axios from "axios";
import { db, auth } from "./firebase"; 
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";

function UserDashboard() {
  const [image, setImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [userLocation, setUserLocation] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [locationData, setLocationData] = useState({
    latitude: null,
    longitude: null,
    location: "",
  });

  const handleBuzzerClick = async () => {
    const buzzerElement = document.querySelector(".buzzer-container");
    buzzerElement.style.transform = "scale(0.9)";
    setTimeout(() => (buzzerElement.style.transform = "scale(1)"), 100);

    if (!window.confirm("Are you sure?")) return;

    getLocationAndConfirm();
  };

  const getLocationAndConfirm = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          );
          const location = response.data.display_name;
          setUserLocation(location);
          setLocationData({ latitude, longitude, location });
        } catch (error) {
          console.error("Error fetching location:", error);
          alert("Failed to fetch location details.");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Failed to access location. Please enable GPS.");
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const getNextId = async () => {
    const sightingsRef = collection(db, "sightings");
    const q = query(sightingsRef, orderBy("id", "desc"));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return snapshot.docs[0].data().id + 1;
    } else {
      return 1;
    }
  };

  const storeSighting = async (latitude, longitude, location) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to report sightings.");
      return;
    }

    const userId = user.uid;
    const username = user.email;

    try {
      const sightingsRef = collection(db, "sightings");
      const nextId = await getNextId();

      const reportData = {
        id: nextId,
        imageUrl: uploadedImageUrl || "",
        latitude,
        longitude,
        location,
        description,
        timestamp: serverTimestamp(),
        userId,
        username,
      };

      await addDoc(sightingsRef, reportData);
      alert(`Report submitted successfully! Report ID: ${nextId}`);
    } catch (error) {
      console.error("Error storing sighting:", error);
      alert("Failed to store report.");
    }
  };

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
        stream.getTracks().forEach((track) => track.stop());
      }, 1000);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const uploadImageToCloudinary = async () => {
    if (!image) {
      alert("Please capture an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "PawPatrol");
    formData.append("cloud_name", "dyx30ezh4");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dyx30ezh4/image/upload",
        formData
      );
      setUploadedImageUrl(response.data.secure_url);
      setUploadSuccess(true); 
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
      setUploadSuccess(false);
    }
  };

  const handleSubmitReport = async () => {
    if (!locationData.latitude || !locationData.longitude) {
      alert("Location data is missing.");
      return;
    }

    if (!description.trim()) {
      alert("Please enter a description.");
      return;
    }

    await storeSighting(locationData.latitude, locationData.longitude, locationData.location);
  };
  
  return (
    <div className="user-dashboard">
      <div className="report-box">
        <h2 className="pixel-text">Do you want to report a Stray Dog Sighting?</h2>
        <div className="buzzer-section">
          <div className="buzzer-container" onClick={handleBuzzerClick}>
            <img src={buzzer} alt="Red Buzzer" className="buzzer" />
          </div>
          <p className="buzzer-text"><b>Press The Buzzer</b></p> {/* Bold text added */}
        </div>
        {userLocation && <p className="location-text">{userLocation}</p>}
      </div>

      <div className="report-box">
        <h3 className="pixel-text">If possible, can you please upload the image of the Stray Dog?</h3>
        <button className="capture-button" onClick={handleCapture}>Click Photo</button>
        {image && <img src={image} alt="Captured" className="captured-image" />}
        <small>Refresh the page to click picture again in case of an unclear pic</small>
        <button className="capture-button" onClick={uploadImageToCloudinary}>Upload</button>
        {uploadSuccess && <p className="upload-success-message">Image successfully uploaded!</p>}
      </div>

      <textarea
        className="description-box"
        placeholder="Enter a description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <button className="submit-button" onClick={handleSubmitReport}>
        Submit Report
      </button>
    </div>
  );
}

export default UserDashboard;
