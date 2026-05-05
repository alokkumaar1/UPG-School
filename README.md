# 🏫 UPG+2 High School — Admission Management Portal

A complete online admission management system for UPG+2 High School, Lawahikala, Dandai, Garhwa, Jharkhand.

---

## 📁 Folder Structure

```
school-admission/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminLogin.jsx          # Admin login page
│   │   │   └── AdminDashboard.jsx      # View all applications
│   │   ├── common/
│   │   │   ├── Navbar.jsx              # Top navigation
│   │   │   ├── Footer.jsx              # Footer
│   │   │   ├── ProgressBar.jsx         # Multi-step progress
│   │   │   └── Spinner.jsx             # Loading spinner
│   │   ├── form/
│   │   │   ├── Step1Student.jsx        # Student details
│   │   │   ├── Step2Parent.jsx         # Parent details
│   │   │   ├── Step3Documents.jsx      # Document upload
│   │   │   └── Step4Review.jsx         # Review + Razorpay payment
│   │   └── pages/
│   │       ├── HomePage.jsx            # Landing page
│   │       ├── AdmissionForm.jsx       # Multi-step form controller
│   │       ├── ConfirmationPage.jsx    # Success page after payment
│   │       └── NotFound.jsx            # 404 page
│   ├── config/
│   │   ├── firebase.js                 # Firebase initialization
│   │   └── constants.js                # School details, fees, etc.
│   ├── hooks/
│   │   └── useAdmission.js             # Firebase Firestore + Storage hooks
│   ├── utils/
│   │   ├── helpers.js                  # Utility functions
│   │   └── generateReceipt.js          # PDF receipt generation (jsPDF)
│   ├── App.jsx                         # Router setup
│   ├── main.jsx                        # Entry point
│   └── index.css                       # Tailwind + custom styles
├── firestore.rules                     # Firestore security rules
├── storage.rules                       # Storage security rules
├── vercel.json                         # Vercel deployment config
├── .env.example                        # Environment variables template
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## ⚡ Quick Setup (Step-by-Step)

### Step 1: Install dependencies

```bash
cd school-admission
npm install
```

### Step 2: Set up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project
2. Enable **Firestore Database** (start in test mode initially)
3. Enable **Firebase Storage**
4. Go to **Project Settings → Your apps → Add app (Web)** → Copy the config
5. In Firestore, create a collection named `admissions` (it will auto-create on first submission)

### Step 3: Set up Razorpay

1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Go to **Settings → API Keys → Generate Test Key**
3. Copy your `Key ID` (starts with `rzp_test_...`)

### Step 4: Create your `.env` file

```bash
cp .env.example .env
```

Open `.env` and fill in your actual values:

```env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id

VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=YourSecurePassword123
```

### Step 5: Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Step 6: Update Firebase Security Rules

In Firebase Console:

**Firestore Rules** — paste contents of `firestore.rules`  
**Storage Rules** — paste contents of `storage.rules`

---

## 🚀 Deploy to Vercel

### Method 1: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

During setup, add all your environment variables from `.env` when prompted.

### Method 2: GitHub + Vercel Dashboard

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import from GitHub
3. In **Environment Variables**, add all the `VITE_*` variables from your `.env` file
4. Click **Deploy**

---

## 🛣️ Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with school info and admission notice |
| `/admission` | Multi-step admission form |
| `/confirmation` | Success page after payment |
| `/admin/login` | Admin panel login |
| `/admin/dashboard` | View and filter all applications |

---

## 🗃️ Firestore Data Structure

**Collection:** `admissions`

```json
{
  "applicationId": "UPG-2024-123456",
  "studentName": "Ramesh Kumar",
  "dob": "2010-04-15",
  "gender": "Male",
  "class": "6",
  "fatherName": "Suresh Kumar",
  "motherName": "Sunita Devi",
  "mobile": "9876543210",
  "address": "Village XYZ, Dandai, Garhwa",
  "documentURLs": {
    "studentPhoto": "https://storage.googleapis.com/...",
    "birthCertificate": "https://storage.googleapis.com/...",
    "marksheet": "https://storage.googleapis.com/..."
  },
  "paymentId": "pay_XXXXXXXXXX",
  "paymentStatus": "Paid",
  "createdAt": "Timestamp"
}
```

---

## 🔐 Admin Panel

- URL: `/admin/login`
- Default credentials (set in `.env`):
  - Username: `admin`
  - Password: `school@2024`
- **Change these before deploying to production!**
- For production, replace with Firebase Authentication

---

## 🛠️ Customization

### Change school details
Edit `src/config/constants.js`:
```js
export const SCHOOL = {
  name: 'Your School Name',
  phone: '+91-XXXXXXXXXX',
  email: 'your@email.com',
  // ...
};
```

### Change admission fee
In `src/config/constants.js`:
```js
export const ADMISSION = {
  fee: 550,  // Change to desired amount
};
```

### Change admin password
In your `.env` file:
```env
VITE_ADMIN_PASSWORD=YourNewPassword
```

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| Database | Firebase Firestore |
| File Storage | Firebase Storage |
| Payment | Razorpay |
| PDF Generation | jsPDF |
| Notifications | React Hot Toast |
| Hosting | Vercel |

---

## 🐛 Troubleshooting

**"Firebase app not initialized"** → Check that all `VITE_FIREBASE_*` env vars are set correctly.

**"Razorpay is not defined"** → Ensure the Razorpay script in `index.html` loads. Check internet connection.

**Payment shows placeholder error** → Set `VITE_RAZORPAY_KEY_ID` in your `.env` file.

**Admin login fails** → Verify `VITE_ADMIN_USERNAME` and `VITE_ADMIN_PASSWORD` match what you're entering.

**Files not uploading** → Check Firebase Storage rules allow writes, and check file size limits.
