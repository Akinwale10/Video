// ==========================================
// Cloudinary Configuration
// Replace these values with your actual Cloudinary credentials
// ==========================================

// NOTE: DO NOT commit this file with real credentials to a public repository
// Use environment variables or a secure config management system in production

const cloudinaryConfig = {
    cloudName: "YOUR_CLOUD_NAME",
    apiKey: "YOUR_API_KEY",
    apiSecret: "YOUR_API_SECRET", // Keep this secret! Never expose in client-side code
    uploadPreset: "YOUR_UPLOAD_PRESET" // Create an unsigned upload preset in Cloudinary dashboard
};

// Cloudinary Upload Widget Configuration
const cloudinaryWidgetConfig = {
    cloudName: cloudinaryConfig.cloudName,
    uploadPreset: cloudinaryConfig.uploadPreset,
    sources: ['local', 'url', 'camera'],
    multiple: false,
    maxFiles: 1,
    maxFileSize: 5000000, // 5MB
    clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    folder: 'omolola-pharmacy/products',
    tags: ['product-image'],
    context: {
        alt: 'Product Image',
        caption: 'Uploaded from Omolola Pharmacy Admin'
    }
};

// Function to initialize Cloudinary upload widget
function initializeCloudinaryWidget(callback) {
    if (typeof cloudinary === 'undefined') {
        console.error('Cloudinary library not loaded. Please include the Cloudinary upload widget script.');
        return null;
    }
    
    const widget = cloudinary.createUploadWidget(cloudinaryWidgetConfig, (error, result) => {
        if (!error && result && result.event === "success") {
            console.log('Upload successful:', result.info);
            if (callback) {
                callback(result.info);
            }
        } else if (error) {
            console.error('Upload error:', error);
        }
    });
    
    return widget;
}

// Function to get optimized image URL
function getOptimizedImageUrl(publicId, options = {}) {
    const {
        width = 800,
        height = 600,
        crop = 'fill',
        quality = 'auto',
        format = 'auto'
    } = options;
    
    return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/w_${width},h_${height},c_${crop},q_${quality},f_${format}/${publicId}`;
}

// Function to delete image (requires backend with API secret)
async function deleteCloudinaryImage(publicId) {
    // This should be done on the backend for security
    console.warn('Image deletion should be handled by backend API with proper authentication');
    
    // Example backend endpoint call:
    /*
    try {
        const response = await fetch('/api/cloudinary/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            body: JSON.stringify({ publicId })
        });
        return await response.json();
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
    */
}

// Export for use in other files
if (typeof window !== 'undefined') {
    window.cloudinaryConfig = cloudinaryConfig;
    window.cloudinaryWidgetConfig = cloudinaryWidgetConfig;
    window.initializeCloudinaryWidget = initializeCloudinaryWidget;
    window.getOptimizedImageUrl = getOptimizedImageUrl;
    window.deleteCloudinaryImage = deleteCloudinaryImage;
}
