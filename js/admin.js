// ==========================================
// Omoola Pharmacy & Stores - Admin Dashboard
// Admin Panel Functionality
// ==========================================

// Admin Authentication
class AdminAuth {
    constructor() {
        this.checkAuth();
    }

    checkAuth() {
        const isAuthenticated = localStorage.getItem('omoola_admin_auth') === 'true';
        if (!isAuthenticated && !window.location.pathname.includes('login')) {
            this.promptLogin();
        }
        return isAuthenticated;
    }

    promptLogin() {
        const password = prompt('Enter admin password:');
        if (password === 'admin123') {
            localStorage.setItem('omoola_admin_auth', 'true');
            return true;
        } else {
            alert('Invalid password');
            window.location.href = '../index.html';
            return false;
        }
    }

    logout() {
        localStorage.removeItem('omoola_admin_auth');
        window.location.href = '../index.html';
    }
}

// Product Management
class ProductManager {
    constructor() {
        this.products = this.loadProducts();
    }

    loadProducts() {
        // In production, this would load from Firebase
        return window.sampleProducts || [];
    }

    async addProduct(productData) {
        // TODO: Integrate with Firebase Firestore
        // TODO: Upload image to Cloudinary first
        console.log('Adding product:', productData);
        
        // Example Firebase integration:
        /*
        try {
            const imageUrl = await this.uploadImage(productData.image);
            const docRef = await addDoc(collection(db, 'products'), {
                ...productData,
                image: imageUrl,
                createdAt: serverTimestamp()
            });
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('Error adding product:', error);
            return { success: false, error: error.message };
        }
        */
    }

    async updateProduct(productId, productData) {
        // TODO: Integrate with Firebase Firestore
        console.log('Updating product:', productId, productData);
        
        // Example Firebase integration:
        /*
        try {
            const productRef = doc(db, 'products', productId);
            await updateDoc(productRef, {
                ...productData,
                updatedAt: serverTimestamp()
            });
            return { success: true };
        } catch (error) {
            console.error('Error updating product:', error);
            return { success: false, error: error.message };
        }
        */
    }

    async deleteProduct(productId) {
        // TODO: Integrate with Firebase Firestore
        console.log('Deleting product:', productId);
        
        // Example Firebase integration:
        /*
        try {
            await deleteDoc(doc(db, 'products', productId));
            return { success: true };
        } catch (error) {
            console.error('Error deleting product:', error);
            return { success: false, error: error.message };
        }
        */
    }

    async uploadImage(imageFile) {
        // TODO: Integrate with Cloudinary
        console.log('Uploading image:', imageFile);
        
        // Example Cloudinary integration:
        /*
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', cloudinaryConfig.uploadPreset);
        
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
            {
                method: 'POST',
                body: formData
            }
        );
        
        const data = await response.json();
        return data.secure_url;
        */
    }
}

// Order Management
class OrderManager {
    constructor() {
        this.orders = this.loadOrders();
    }

    loadOrders() {
        // TODO: Load from Firebase
        return [];
    }

    async updateOrderStatus(orderId, status) {
        // TODO: Integrate with Firebase Firestore
        console.log('Updating order status:', orderId, status);
        
        // Example Firebase integration:
        /*
        try {
            const orderRef = doc(db, 'orders', orderId);
            await updateDoc(orderRef, {
                status: status,
                updatedAt: serverTimestamp()
            });
            return { success: true };
        } catch (error) {
            console.error('Error updating order:', error);
            return { success: false, error: error.message };
        }
        */
    }

    async getOrderDetails(orderId) {
        // TODO: Load from Firebase
        console.log('Getting order details:', orderId);
    }
}

// Category Management
class CategoryManager {
    constructor() {
        this.categories = this.loadCategories();
    }

    loadCategories() {
        // TODO: Load from Firebase
        return [
            { id: 1, name: 'Medicines', slug: 'medicines', description: 'Prescription & OTC medications' },
            { id: 2, name: 'Health Products', slug: 'health', description: 'Vitamins & wellness items' },
            { id: 3, name: 'Groceries', slug: 'groceries', description: 'Daily essentials' }
        ];
    }

    async addCategory(categoryData) {
        // TODO: Integrate with Firebase
        console.log('Adding category:', categoryData);
    }

    async updateCategory(categoryId, categoryData) {
        // TODO: Integrate with Firebase
        console.log('Updating category:', categoryId, categoryData);
    }

    async deleteCategory(categoryId) {
        // TODO: Integrate with Firebase
        console.log('Deleting category:', categoryId);
    }
}

// User Management
class UserManager {
    constructor() {
        this.users = this.loadUsers();
    }

    loadUsers() {
        // TODO: Load from Firebase
        return [];
    }

    async updateUserRole(userId, role) {
        // TODO: Integrate with Firebase Auth custom claims
        console.log('Updating user role:', userId, role);
    }
}

// Dashboard Analytics
class AnalyticsManager {
    constructor() {
        this.stats = this.loadStats();
    }

    loadStats() {
        // TODO: Calculate from Firebase data
        return {
            totalProducts: 8,
            totalOrders: 42,
            totalRevenue: 2450000,
            totalUsers: 156
        };
    }

    async generateReport(startDate, endDate) {
        // TODO: Generate analytics report
        console.log('Generating report:', startDate, endDate);
    }
}

// Initialize admin managers
let adminAuth, productManager, orderManager, categoryManager, userManager, analyticsManager;

if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // Only initialize on admin pages
        if (window.location.pathname.includes('/admin/')) {
            adminAuth = new AdminAuth();
            productManager = new ProductManager();
            orderManager = new OrderManager();
            categoryManager = new CategoryManager();
            userManager = new UserManager();
            analyticsManager = new AnalyticsManager();
            
            // Export to window for use in admin pages
            window.adminAuth = adminAuth;
            window.productManager = productManager;
            window.orderManager = orderManager;
            window.categoryManager = categoryManager;
            window.userManager = userManager;
            window.analyticsManager = analyticsManager;
        }
    });
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AdminAuth,
        ProductManager,
        OrderManager,
        CategoryManager,
        UserManager,
        AnalyticsManager
    };
}
