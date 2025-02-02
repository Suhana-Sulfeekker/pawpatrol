# PawPatrol 🐾

A crowdsourced web application to help keep our neighborhood safe by reporting stray dog sightings.

## 🚀 About the Project  

PawPatrol is a crowdsourcing platform that enables users to report and track stray dog sightings, promoting safety and awareness in local communities. By leveraging geolocation, reverse geocoding, and map-based visualization, the platform provides real-time insights on stray dog activity.

---

## 🔹 Core Features  

✅ **📍 Location-Based Reporting** – Uses the **[Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)** to fetch the user's latitude and longitude automatically.  
✅ **🌍 Reverse Geocoding** – Converts coordinates into readable addresses using **[OpenStreetMap's Nominatim API](https://nominatim.org/release-docs/latest/)**.  
✅ **🗺️ Interactive Map** – Displays all reported sightings using **[Leaflet.js](https://leafletjs.com/)**, an open-source JavaScript library for mapping.  
✅ **📷 Image Upload** – Users can take and upload pictures of stray dogs using **[Cloudinary](https://cloudinary.com/documentation/react_integration)** for storage.  
✅ **📊 Data Insights** – Sightings are visualized via an **hourly activity chart** powered by **[Chart.js](https://www.chartjs.org/)** to identify peak stray dog activity times.  
✅ **🔑 Authority Dashboard** – Restricted-access login for authorities, allowing them to:  
  - View reports and filter them by **location (substring search)** or **date range**.  
  - Generate **PDF reports** using **[jsPDF](https://github.com/parallax/jsPDF)** for record-keeping and action.  

---

## 🛠️ Tech Stack  

### **Frontend**  
- [React.js](https://react.dev/)  
- [Leaflet.js](https://leafletjs.com/) (Map & markers)  
- [Chart.js](https://www.chartjs.org/) (Data visualization)  
- [Tailwind CSS](https://tailwindcss.com/) (Styling)  

### **Backend & Database**  
- [Firebase](https://firebase.google.com/) (Auth, Firestore, Hosting)  
- [Cloudinary](https://cloudinary.com/documentation/react_integration) (Image storage)  

### **APIs & Libraries**  
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)  
- [OpenStreetMap Nominatim](https://nominatim.org/release-docs/latest/)  
- [jsPDF](https://github.com/parallax/jsPDF) (PDF reports)  

---

## 📍 How It Works  

### 1️⃣ User Reports a Stray Dog  
- Captures location using **Geolocation API**.  
- Reverse geocoding converts it to a **readable location**.  
- User uploads an **image & adds details**.  
- Data is stored in **Firestore** & images in **Cloudinary**.  

### 2️⃣ Map-Based Visualization  
- **Leaflet.js** displays reported locations as **markers**.  
- Clicking a **marker** reveals **detailed information** (location, time, image).  

### 3️⃣ Data Analytics  
- **Chart.js** creates an **hourly sighting distribution chart**.  
- Helps users identify **peak stray activity times**.  

### 4️⃣ Authority Dashboard (Restricted Access)  
- **View & filter reports** by location or date range.  
- **Generate reports** using **jsPDF** for actionable insights.  

---

## 📌 Future Scope  

🔹 **Automated Monthly Reports** – Email reports to authorities (**Govt., NGOs, newspapers, animal welfare orgs**).  
🔹 **Public Sightings Validation** – Introduce a **thumbs-up/down system** to verify reports.  
🔹 **AI Image Recognition** – Track the same stray dog across multiple sightings using **image detection**.  
🔹 **Animal Population Surveys** – Govt. agencies can use **PawPatrol** for **stray animal surveys & planning welfare programs**.  
