// ==========================================
// Configuration Template
// Copy this file and rename to config.js
// Fill in your actual credentials
// ==========================================

// FIREBASE CONFIGURATION
// Get these values from Firebase Console: https://console.firebase.google.com/
// 1. Go to Project Settings
// 2. Scroll down to "Your apps"
// 3. Click on Web app or create one
// 4. Copy the configuration object

export const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456",
    measurementId: "G-ABCDEF1234"
};

// CLOUDINARY CONFIGURATION
// Get these values from Cloudinary Console: https://cloudinary.com/console
// 1. Go to Dashboard
// 2. Find Cloud name, API Key
// 3. Create an Upload Preset (Settings > Upload > Add upload preset)

export const cloudinaryConfig = {
    cloudName: "your-cloud-name",
    apiKey: "123456789012345",
    apiSecret: "YOUR_API_SECRET", // NEVER expose this in client-side code!
    uploadPreset: "your_unsigned_upload_preset" // Create in Cloudinary dashboard
};

// ADMIN CREDENTIALS (for development/demo only)
// In production, use Firebase Authentication with proper role management

export const adminCredentials = {
    email: "admin@omololapharmacy.com",
    password: "your-secure-password"
};

// APPLICATION SETTINGS

export const appSettings = {
    // Site Information
    siteName: "Omolola Pharmacy & Stores",
    siteUrl: "https://omololapharmacy.com",
    phoneNumber: "+234 801 234 5678",
    email: "info@omololapharmacy.com",
    address: "123 Medical Plaza, Victoria Island, Lagos",
    
    // Pharmacy License
    licenseNumber: "PCN-NG-2024-001234",
    
    // Business Hours
    businessHours: {
        weekdays: "8:00 AM - 8:00 PM",
        saturday: "9:00 AM - 6:00 PM",
        sunday: "10:00 AM - 4:00 PM"
    },
    
    // Currency
    currency: "NGN",
    currencySymbol: "₦",
    
    // Shipping
    freeShippingThreshold: 5000,
    standardShippingFee: 500,
    expressShippingFee: 1500,
    
    // Payment Methods
    paymentMethods: ["card", "bank-transfer", "cash-on-delivery"],
    
    // Features
    features: {
        prescriptionUpload: true,
        guestCheckout: true,
        productReviews: true,
        loyaltyProgram: false,
        subscriptions: false
    }
};

// DEVELOPMENT/PRODUCTION MODE
export const isDevelopment = window.location.hostname === 'localhost' || 
                            window.location.hostname === '127.0.0.1';

// API ENDPOINTS (if using separate backend)
export const apiEndpoints = {
    base: isDevelopment ? 'http://localhost:3000/api' : 'https://api.omololapharmacy.com',
    products: '/products',
    categories: '/categories',
    orders: '/orders',
    users: '/users',
    auth: '/auth',
    upload: '/upload'
};
