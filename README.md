# 🏥 MediVault — AI-Powered Medical Records Platform

![MediVault](https://img.shields.io/badge/MediVault-Healthcare-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
![Claude AI](https://img.shields.io/badge/Claude-AI%20Powered-orange?style=for-the-badge)

> A full-stack medical records management platform where patients securely store health records, doctors manage patient data, and an AI assistant powered by Claude summarizes medical history in real time.

---

## 📸 Features Overview

| Feature | Description |
|---|---|
| 🔐 Auth System | Separate login & registration for Patients and Doctors |
| 📋 Medical Records | Upload and manage prescriptions, lab reports, X-rays, scans and more |
| 🤖 AI Health Assistant | Chat with Claude AI to get summaries of your recent medical records |
| 📱 QR Code Profiles | Generate a personal QR code — doctors scan it to instantly view your records |
| 📁 File Upload | Attach PDFs, images, and documents to records (up to 10MB) |
| 👨‍⚕️ Doctor Dashboard | Doctors can manage patients, view records, and scan patient QR codes |
| 🏠 Patient Dashboard | Patients see health stats, records, AI chat, and QR code in one place |

---

## 🧠 How It Works

### For Patients

1. **Register** as a Patient with your basic health info (blood group, DOB, etc.)
2. **Upload Medical Records** — add prescriptions, lab reports, X-rays with file attachments
3. **Chat with AI** — the AI Health Assistant reads your last 5 records and gives you a smart health summary
4. **Generate QR Code** — get a personal QR code to share with any doctor instantly

### For Doctors

1. **Register** as a Doctor with your specialization and license number
2. **View Patient List** — see all registered patients on the platform
3. **Scan QR Code** — paste a patient's QR token to instantly pull up their medical profile and records
4. **Add Records** — create medical records directly for patients after a consultation

### AI Health Assistant

The AI chatbot (powered by **Claude by Anthropic**) automatically loads the patient's 5 most recent records as context and can:

- Auto-summarize recent health records with one click
- Answer questions like *"What medications am I on?"* or *"When was my last lab test?"*
- Explain diagnoses and medical terminology in simple language
- Highlight health trends from uploaded records

> ⚠️ The AI assistant is for informational purposes only and does not replace professional medical advice.

---

## 🗂️ Project Structure

```
medivault/
├── backend/
│   ├── models/
│   │   ├── User.js              # Patient & Doctor schema
│   │   └── MedicalRecord.js     # Medical records schema
│   ├── routes/
│   │   ├── auth.js              # Register & Login
│   │   ├── records.js           # Add, view, delete records
│   │   ├── qr.js                # QR code generation & scanning
│   │   ├── chat.js              # AI chatbot & auto-summary
│   │   ├── patients.js          # Patient management
│   │   └── doctors.js           # Doctor management
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── uploads/                 # Uploaded files stored here
│   ├── server.js                # Main Express server
│   └── .env                     # Environment variables
│
└── frontend/
    └── src/
        ├── api/
        │   └── index.js         # All API calls (Axios)
        ├── context/
        │   └── AuthContext.js   # Global auth state
        ├── components/
        │   ├── AIChatbot.js     # AI Health Assistant chat UI
        │   ├── QRCodeDisplay.js # QR code generator component
        │   └── AddRecordModal.js# Add new medical record form
        └── pages/
            ├── Login.js         # Login page
            ├── Register.js      # Patient & Doctor registration
            ├── PatientDashboard.js  # Full patient portal
            ├── DoctorDashboard.js   # Doctor portal
            └── QRPage.js        # Public QR scan result page
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v16 or higher
- MongoDB (local) or MongoDB Atlas account
- Anthropic API Key — get one free at [console.anthropic.com](https://console.anthropic.com)

---

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/medivault.git
cd medivault
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Edit the `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/medivault
JWT_SECRET=your_secret_key_here
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxx
```

Start the backend:

```bash
npm start
# or for development with auto-restart:
npm run dev
```

Backend runs at: `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register as patient or doctor |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get logged-in user info |

### Records
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/records` | Get all records for current user |
| POST | `/api/records` | Add new medical record (with file) |
| DELETE | `/api/records/:id` | Delete a record |

### QR Code
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/qr/generate` | Generate QR code for patient |
| GET | `/api/qr/scan/:token` | Get patient data by QR token |

### AI Chat
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/chat` | Send message to AI assistant |
| GET | `/api/chat/summary` | Auto-generate health summary from records |

---

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js** — REST API server
- **MongoDB** + **Mongoose** — Database and ODM
- **JWT** — Secure authentication tokens
- **bcryptjs** — Password hashing
- **Multer** — File upload handling
- **qrcode** — QR code generation

### Frontend
- **React 18** — UI framework
- **React Router v6** — Client-side routing
- **Axios** — HTTP requests
- **React Toastify** — Notifications
- **Context API** — Global state management

### AI
- **Anthropic Claude API** — Powers the AI Health Assistant and record summarization

---

## 🌐 Deployment

### Backend (Render / Railway)
1. Push code to GitHub
2. Connect repo to [Render](https://render.com) or [Railway](https://railway.app)
3. Set environment variables in the dashboard:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `ANTHROPIC_API_KEY`

### Frontend (Vercel / Netlify)
1. Connect the `frontend/` folder to [Vercel](https://vercel.com)
2. Set environment variable:
   - `REACT_APP_API_URL=https://your-backend-url.com/api`

---

## 🔒 Security Notes

- Passwords are hashed using **bcryptjs** before storing
- All protected routes require a valid **JWT token**
- `.env` file is excluded from git — never commit API keys
- File uploads are validated for type and size (max 10MB)
- QR tokens are unique UUIDs per patient

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Built with ❤️ using React, Node.js, MongoDB, and Claude AI.

> 💡 **Tip:** Add your Anthropic API key to unlock the full AI Health Assistant. Without it, the chatbot runs in demo mode with pre-defined responses.
