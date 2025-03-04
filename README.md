# Realtime Chatting App 📱💬

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

---

## Overview
This is a **realtime chatting application** built using the MERN (MongoDB, Express, React, Node.js) stack. The app features seamless **realtime communication** powered by **Socket.IO**, secure user authentication with **JWT (JSON Web Token)**, and **image storage** using **Cloudinary**. The user interface is styled using **TailwindCSS** and **DaisyUI**, ensuring a responsive and modern design.
### Live preview: 
- https://chat-app-39rq.onrender.com/
---

## Features
- 🔒 Secure authentication and authorization with JWT.
- 🔄 Realtime messaging with Socket.IO.
- 📸 Image upload and storage with Cloudinary.
- 🎨 Elegant and responsive UI using TailwindCSS and DaisyUI.
- 🗂️ Organized project structure for scalability.

---

## Tech Stack
- **Frontend**: React.js, TailwindCSS, DaisyUI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Realtime Communication**: Socket.IO
- **Authentication**: JWT (JSON Web Token)
- **Image Storage**: Cloudinary

---

## Installation
Follow these steps to set up the project locally:

### Prerequisites
- Node.js installed on your machine.
- MongoDB instance running locally or via a cloud service.
- Cloudinary account for storing images.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/priyanshup12/chat-app.git
2. Install dependencies:
  ```bash
  cd backend
  npm install
  cd ../frontend
  npm install
  ```
3. Configure environment variables:
 - Create a .env file in the root directory.
 - Add the following:
   ```bash
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```
4. Run the development server:
   ```bash
   # Run backend
   npm run dev
   # Run frontend
   cd frontend
   npm start
   ```
---
## Usage
1. Register or log in to the app.
2. Start a chat with other users in realtime.
3. Upload your profile picture during setup, stored securely via Cloudinary.
---
## License
This project is licensed under the MIT License. See the LICENSE file for details.


