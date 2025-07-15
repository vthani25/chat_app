# 💬 QuickChat

**QuickChat** is a full-stack real-time messaging application where users can sign up, create a profile, and chat with others instantly! Check it out [here](https://quickchatfrontend.vercel.app) !

Built with:
- **React** (Vite) for the frontend
- **Node.js + Express** for the backend
- **MongoDB** for data storage
- **Socket.IO** for real-time communication
- **Cloudinary** for profile image uploads

---

## 🚀 Live Demo

- 🌐 Frontend: [https://quickchatfrontend.vercel.app](https://quickchatfrontend.vercel.app)  
- 🔗 Backend API: Deployed with Render

---

## ⚙️ Features

- 🔐 Secure JWT Authentication
- 🧑‍💼 User Registration and Login
- 📸 Profile Picture Upload via Cloudinary
- ✏️ Bio and Profile Editing
- 🟢 Online Users Tracking
- 💬 Real-Time Chat with Socket.IO
- 🧠 Unseen Message Counts
- 🛡️ Protected Routes (Frontend & Backend)

---

| 📸 Screenshots |
|------------------------|
| **Sign Up/Log In** |
| ![Log In](https://hc-cdn.hel1.your-objectstorage.com/s/v3/c87eda81b360a0ac8c4ffcc76d1c47d4ec749903_image.png) |
| **Chat With Others** |
| ![Chat](https://hc-cdn.hel1.your-objectstorage.com/s/v3/b0e98e2f960298edee163b5c0f7958cd32b075ca_image.png) |
| **Update Profile** |
| ![Profile](https://hc-cdn.hel1.your-objectstorage.com/s/v3/723e9480d5138d867424e12a92db0497b843a7f5_image.png) |

---

### 🔧 Running Locally

Want to try QuickChat on your own machine? Follow these steps:

1. **Clone the repository**

```bash
git clone https://github.com/vthani25/chat_app.git
cd chat_app
```

2. **Start the server**
```bash
cd server
npm install
# Create a .env file with your MongoDB URI, JWT secret, and Cloudinary credentials
npm start
```
2. **Run the frontend**
```bash
cd client
npm install
# Create a .env file with: VITE_BACKEND_URL=http://localhost:5000
npm run dev
```
Now it'll be running on your localhost as well!

---
