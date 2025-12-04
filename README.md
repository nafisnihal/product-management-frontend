# Product Management Frontend

A modern Next.js 15 application with TypeScript, Redux Toolkit, and Tailwind CSS for product management with analytics dashboard.

## Features

- 🔐 JWT Authentication with HTTP-only cookies via Next.js API proxy
- 🔥 **Real-time data storage with Firebase Firestore**
- 📊 Analytics dashboard with interactive charts
- 📱 Responsive design with Tailwind CSS
- ⚡ Next.js 15 with App Router
- 🎨 Beautiful UI components with shadcn/ui
- 📈 Real-time data visualization with Recharts
- 🔄 State management with Redux Toolkit
- 📝 Form validation with React Hook Form + Zod
- 🎯 TypeScript for type safety

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API server running
- Firebase account with Firestore database enabled

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/nafisnihal/product-management-frontend.git
cd product-management-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Backend API URL - Set this to your deployed backend URL
NEXT_PUBLIC_API_URL=https://your-backend-url.com

# Firebase Configuration (Get from Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# For local development:
# NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Environment Variables:**

- `NEXT_PUBLIC_API_URL` - Backend API server URL
- `NEXT_PUBLIC_FIREBASE_API_KEY` - Firebase API key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` - Firebase Auth domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` - Firebase project ID
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `NEXT_PUBLIC_FIREBASE_APP_ID` - Firebase app ID
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` - Firebase measurement ID (Analytics)

### 4. Firebase Setup

1. **Create Firebase Project**:

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select existing one
   - Enable Google Analytics (optional)

2. **Setup Firestore Database**:

   - Navigate to **Firestore Database** in the Firebase console
   - Click **Create database**
   - Choose **Start in test mode** (for development) or **production mode**
   - Select a location for your database

3. **Get Firebase Configuration**:

   - Go to **Project Settings** → **General** tab
   - Scroll down to **Your apps** section
   - Click **Add app** → **Web app** (</>)
   - Register your app and copy the configuration values
   - Update your `.env.local` file with these values

## Running the Application

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at `http://localhost:3000`

## Demo Credentials

- Email: `admin@demo.com`
- Password: `admin123`

## Key Features

### 🔥 Firebase Firestore Integration

- **Real-time database** with automatic synchronization
- **Offline support** with local caching
- **Scalable NoSQL** document-based storage
- **Live updates** across all connected clients
- **Security rules** for data protection
- **Collections**: products, categories, analytics data

### 🔐 Authentication System

- Secure login with JWT tokens
- HTTP-only cookies for enhanced security
- Cross-origin authentication via Next.js API proxy
- Automatic token verification and route protection

### 📊 Analytics Dashboard

- Product sales analytics with interactive charts
- Stock level monitoring with low stock alerts
- Category distribution analysis
- Price distribution visualization
- Top-performing products tracking
- **Real-time data updates** from Firestore

### 🏪 Product Management

- Complete CRUD operations for products
- Advanced filtering and search capabilities
- Bulk operations support
- **Real-time data synchronization** via Firestore
- Form validation with error handling
- **Live updates** when other users make changes

## Project Structure

```
product-management-frontend/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── api/                 # API proxy routes
│   │   │   └── auth/            # Authentication proxy endpoints
│   │   ├── analytics/           # Analytics dashboard pages
│   │   ├── login/               # Login page
│   │   ├── products/            # Products management pages
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout component
│   │   ├── page.tsx             # Home page
│   │   └── providers.tsx        # App providers (Redux, etc.)
│   ├── components/              # React components
│   │   ├── analytics/           # Analytics-specific components
│   │   ├── auth/                # Authentication components
│   │   ├── layout/              # Layout components
│   │   ├── products/            # Product management components
│   │   └── ui/                  # Reusable UI components (shadcn/ui)
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.ts           # Authentication hook
│   │   ├── useProducts.ts       # Products data hook
│   │   ├── useAnalytics.ts      # Analytics data hook
│   │   └── use-toast.ts         # Toast notifications hook
│   ├── lib/                     # Utility libraries
│   │   ├── utils.ts             # General utilities
│   │   └── firebase.ts          # Firebase configuration
│   ├── store/                   # Redux store configuration
│   │   ├── store.ts             # Main store configuration
│   │   ├── hooks.ts             # Typed Redux hooks
│   │   ├── api/                 # RTK Query API definitions
│   │   └── slices/              # Redux slices
│   ├── types/                   # TypeScript type definitions
│   │   └── index.ts             # Shared type definitions
│   └── proxy.ts                 # Next.js middleware for route protection
├── public/                      # Static assets
├── .env.local                   # Environment variables (DO NOT COMMIT!)
├── .gitignore
├── components.json              # shadcn/ui configuration
├── next.config.ts               # Next.js configuration
├── package.json
├── postcss.config.mjs           # PostCSS configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── README.md
```

## Technologies Used

### Core Framework

- **Next.js 16** 
- **React 19** 
- **TypeScript** 

### Database & Backend

- **Firebase Firestore** - Real-time NoSQL database
- **Firebase SDK** - Real-time data synchronization
- **Next.js API Routes** - Authentication proxy endpoints

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible UI components
- **Lucide React** - Icon library
- **Recharts** - Charts and data visualization

### State Management

- **Redux Toolkit** - State management
- **RTK Query** - Data fetching and caching

### Forms & Validation

- **React Hook Form** - Form management
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation integration
