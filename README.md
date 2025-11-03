# LinkedIn Clone (MERN Stack)

A social media platform inspired by LinkedIn built with the MERN stack. Users can register, login, create posts, like, comment, and view their own posts. This project demonstrates full-stack development with React, Node.js, Express, and MongoDB.

---

## Features

* User authentication (register/login) with JWT
* Create, edit, and delete posts
* Like and comment on posts
* View all posts (feed)
* View your own posts
* Responsive design (desktop & mobile)
* Mobile popup for creating posts
* Clean and modern UI with Tailwind CSS
* Real-time like/comment count updates

---

## Tech Stack

* **Frontend:** React.js, Tailwind CSS, Axios, React Icons
* **Backend:** Node.js, Express.js, MongoDB, Mongoose, bcrypt, JWT
* **Other Tools:** Vercel (deployment), Postman (API testing)

---

## Folder Structure

```
/client      # React frontend
/server      # Node.js + Express backend
```

---

## How to Run the Project Locally

Follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the `backend` folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4. Run the Backend

```bash
cd backend
npm start
```

Server runs on `http://localhost:5000`.

### 5. Run the Frontend

```bash
cd frontend
npm run dev
```

React app runs on `http://localhost:5173`.

### 6. Open the App

* Visit `http://localhost:5173`
* Register or login
* Create posts, like, comment, and view your feed

---


## Notes

* Make sure your MongoDB server is running.
* Update the frontend API URLs if deploying backend to a remote server.
* Tailwind CSS is used for responsive styling; the Create Post component pops up on mobile.

---

