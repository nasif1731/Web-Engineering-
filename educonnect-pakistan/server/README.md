# EduConnect Pakistan - Backend 🔧

This is the Express-based backend for EduConnect Pakistan – a tutoring platform built with Node.js, MongoDB, and JWT authentication.

---

## 📦 Installation

```bash
cd server
npm install
npm run dev
```

🔐 **Environment Variables**  
Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

🔧 **Routes Overview**

| Endpoint           | Description                          |
|--------------------|--------------------------------------|
| /api/auth          | Register/Login APIs                  |
| /api/users         | User Profile APIs                    |
| /api/sessions      | Session Booking & Management         |
| /api/wishlist      | Wishlist APIs                        |
| /api/reviews       | Review & Rating APIs                 |
| /api/verification   | Admin Tutor Verification System      |
| /api/reports       | Admin Reporting Dashboard            |
| /api/upload        | Profile Image Upload                 |

🧾 **Folder Structure**

```
server/
├── controllers/
├── models/
├── routes/
├── middleware/
├── uploads/          # For profile images
├── config/
└── app.js
```

🛡 **Auth & Middleware**
- JWT-based authentication
- Role-based access control
- Multer for image uploads

✅ **Tips**
- Ensure MongoDB is running before starting the server
- You can test endpoints using Postman
- `uploads/` folder is auto-created on the first upload

🧑‍💻 **Author**  
Built with ❤️ for EduConnect Pakistan by [Your Name]

---

Let me know if you want these tailored for deployment (e.g., Vercel + Render or GitHub Pages + Railway), or want a ZIP-ready version!
