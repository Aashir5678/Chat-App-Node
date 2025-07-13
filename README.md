# 🔊 Real-Time Chat App

A minimalist, fast, and real-time chat application built with **Node.js**, **Socket.IO**, and **vanilla JavaScript**. Made collaboratively by three passionate students as a side project to explore web sockets and real-time networking.

---

## 🚀 Features

- 🧠 Username-based message tracking
- 💬 Real-time 1-to-many message broadcasting
- 🧾 Message history synced to each new user on join
- 🚪 User join/leave notifications
- ⚡ Built entirely on web sockets — no page refresh needed
- 🔐 Local-first and super lightweight
- 🥭 MongoDB database to save messages

---

## 🛠️ Tech Stack

| Frontend | Backend | Realtime |
|----------|---------|----------|
| HTML/CSS/JS | Node.js (Express), MongoDB | Socket.IO |

---

## 📂 Project Structure
CHAT-APP/
├── frontend/
│ ├── client.js # Handles UI and socket communication
│ ├── index.html # Chat UI
│ └── styles.css # Simple styling
├── server.js # Express + Socket.IO server
├── package.json # Dependencies
├── .gitignore
└── README.md

👥 Built By
Aashir Alam – Socket.IO backend, event handling, MongoDB database

Agam Singh – Frontend UI + styling and Frontend Js

Rayyan Lodhi – Deployment, database

🧠 We built this to learn how to manage real-time client-server communication and deepen our collaborative dev experience.

⚙️ Notes
If you're using this on a private LAN, make sure to disable the firewall for private networks (see comment in server.js).

You can open multiple tabs or browsers to simulate different users.
