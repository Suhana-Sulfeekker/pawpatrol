# PawPatrol 🐾

## Basic Details

### Team Name: Hacklets

### Team Members

- Member 1: Suhana Sulfeekker - Model Engineering College
- Member 2: M Gayathri - Model Engineering College
- Member 3: Ananya P - Model Engineering College

### Hosted Project Link

[https://pawpatrol-tinkherhack.vercel.app/](https://pawpatrol-tinkherhack.vercel.app/)

### Project Description

PawPatrol is a crowdsourcing platform that enables users to report and track stray dog sightings, promoting safety and awareness in local communities. By leveraging geolocation, reverse geocoding, and map-based visualization, the platform provides real-time insights on stray dog activity.

### The Problem Statement

Stray dogs in India pose significant challenges, including public safety concerns due to frequent attacks, the spread of diseases like rabies, and environmental issues arising from their scavenging habits. In 2021, approximately 1.6 crore stray dogs were reported in the country, with around 17.01 lakh dog bite cases documented that year. A survey indicated that over 60% of citizens consider attacks by stray dogs to be a common issue in their area.

### The Solution

PawPatrol is your go-to platform for reporting and tracking stray dog sightings, making neighborhoods safer while keeping things interactive and fun! With real-time geolocation, smart reverse geocoding, and dynamic map visualizations, users can easily mark sightings, upload images, and stay updated on stray activity. Whether you're a concerned citizen or an animal lover, PawPatrol turns community safety into a collaborative mission—one pawprint at a time! 🐾📋

## Technical Details

### Technologies/Components Used

#### Frontend

- React.js
- Leaflet.js (Map & markers)
- Chart.js (Data visualization)
- Tailwind CSS (Styling)

#### Backend & Database

- Firebase (Auth, Firestore, Hosting)
- Cloudinary (Image storage)

#### APIs & Libraries

- Geolocation API
- OpenStreetMap Nominatim
- jsPDF (PDF reports)

### Implementation

#### How It Works

1. **User Reports a Stray Dog**
   - Captures location using Geolocation API.
   - Reverse geocoding converts it to a readable location.
   - User uploads an image & adds details.
   - Data is stored in Firestore & images in Cloudinary.
2. **Map-Based Visualization**
   - Leaflet.js displays reported locations as markers.
   - Clicking a marker reveals detailed information (location, time, image).
3. **Data Analytics**
   - Chart.js creates an hourly sighting distribution chart.
   - Helps users identify peak stray activity times.
4. **Authority Dashboard (Restricted Access)**
   - View & filter reports by location or date range.
   - Generate reports using jsPDF for actionable insights.

### Future Scope

🔹 Automated Monthly Reports – Email reports to authorities (Govt., NGOs, newspapers, animal welfare orgs).  
🔹 Public Sightings Validation – Introduce a thumbs-up/down system to verify reports.  
🔹 AI Image Recognition – Track the same stray dog across multiple sightings using image detection.  
🔹 Animal Population Surveys – Govt. agencies can use PawPatrol for stray animal surveys & planning welfare programs.

### Project Documentation
For Software:

# Screenshots (Add at least 3)


![landing page](https://github.com/user-attachments/assets/f85dd390-da9c-4212-8c1e-1373186b8b53)
![google authentication](https://github.com/user-attachments/assets/60dc6b5e-3c1a-4749-8e8a-ca1d530d596a)
![Page 1](https://github.com/user-attachments/assets/4998cc32-633e-4544-95f0-cce4a20baa52)
![map1](https://github.com/user-attachments/assets/633b9cd5-0df0-4e5a-8c8f-ff01defff814)
![map 2](https://github.com/user-attachments/assets/467ff25f-6101-4023-94f6-11cfeefe5505)
![userdashboard1](https://github.com/user-attachments/assets/c64bceb2-ab69-40ed-ad71-c1df16408503)
![userdashboard 2](https://github.com/user-attachments/assets/80ecf466-b151-4222-934e-3483032d5214)
![user dashboard 3](https://github.com/user-attachments/assets/f0a3af0b-9d05-42a6-9ada-445371c376db)
![authority dashboard](https://github.com/user-attachments/assets/69059887-a3f0-41ac-83e6-3181d6483566)
![report](https://github.com/user-attachments/assets/71a22739-bac5-4c2e-b2c1-42cc37323557)


### Project Demo
# Video
[https://drive.google.com/file/d/1My2Kko4u1iBOTmaBA7EQQ94BfIv1V3zz/view?usp=sharing]



## Team Contributions
- *Suhana Sulfeekker*: User dashboard, login and authentication, and map setup.
- *M Gayathri*: Main dashboard, footer setup, and UI works.
- *Ananya P*: Authority dashboard, footer and other UI works.
  
---
Made with ❤️ at TinkerHub

