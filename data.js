// Sample product data for OMOOLA PHARMACY & STORES
const products = [
    {
        id: 1,
        name: 'Paracetamol 500mg',
        description: '16 tablets - Pain relief & fever reducer',
        price: 1200,
        image: '💊',
        badges: ['OTC', 'In Stock'],
        category: 'pharmacy',
        requiresPrescription: false
    },
    {
        id: 2,
        name: 'Vitamin C 1000mg',
        description: '30 tablets - Immune support',
        price: 2500,
        image: '🍊',
        badges: ['OTC', 'In Stock'],
        category: 'pharmacy',
        requiresPrescription: false
    },
    {
        id: 3,
        name: 'Ibuprofen 400mg',
        description: '20 tablets - Anti-inflammatory',
        price: 1500,
        image: '💊',
        badges: ['OTC', 'In Stock'],
        category: 'pharmacy',
        requiresPrescription: false
    },
    {
        id: 4,
        name: 'Hand Sanitizer 500ml',
        description: 'Antibacterial gel - 70% alcohol',
        price: 1800,
        image: '🧴',
        badges: ['In Stock'],
        category: 'personal-care',
        requiresPrescription: false
    },
    {
        id: 5,
        name: 'Face Masks (50 pack)',
        description: 'Disposable surgical masks',
        price: 3500,
        image: '😷',
        badges: ['In Stock', 'Sale'],
        category: 'personal-care',
        requiresPrescription: false
    },
    {
        id: 6,
        name: 'Multivitamin Complex',
        description: '60 tablets - Daily health support',
        price: 4200,
        image: '💊',
        badges: ['OTC', 'In Stock'],
        category: 'pharmacy',
        requiresPrescription: false
    },
    {
        id: 7,
        name: 'Antibiotics (Amoxicillin)',
        description: '500mg - 21 capsules',
        price: 3800,
        image: '💊',
        badges: ['Rx Required'],
        category: 'pharmacy',
        requiresPrescription: true
    },
    {
        id: 8,
        name: 'Blood Pressure Monitor',
        description: 'Digital automatic BP monitor',
        price: 12500,
        image: '🩺',
        badges: ['In Stock'],
        category: 'medical-devices',
        requiresPrescription: false
    }
];

const offers = [
    {
        id: 101,
        name: 'Fresh Organic Apples',
        description: '1kg - Imported premium quality',
        price: 2800,
        originalPrice: 3500,
        image: '🍎',
        badges: ['Sale', 'In Stock'],
        category: 'groceries',
        requiresPrescription: false
    },
    {
        id: 102,
        name: 'Omega-3 Fish Oil',
        description: '100 softgels - Heart health',
        price: 5600,
        originalPrice: 7000,
        image: '🐟',
        badges: ['Sale', 'OTC'],
        category: 'pharmacy',
        requiresPrescription: false
    },
    {
        id: 103,
        name: 'Baby Diapers (Large)',
        description: 'Pack of 84 - Ultra soft',
        price: 8400,
        originalPrice: 10500,
        image: '👶',
        badges: ['Sale', 'In Stock'],
        category: 'baby',
        requiresPrescription: false
    },
    {
        id: 104,
        name: 'Thermometer Digital',
        description: 'Fast accurate temperature',
        price: 3200,
        originalPrice: 4000,
        image: '🌡️',
        badges: ['Sale', 'In Stock'],
        category: 'medical-devices',
        requiresPrescription: false
    }
];

const searchSuggestions = [
    'Paracetamol',
    'Vitamin C',
    'Hand sanitizer',
    'Face masks',
    'Blood pressure monitor',
    'Thermometer',
    'Antibiotics',
    'Cough syrup',
    'Pain relief',
    'First aid kit',
    'Baby formula',
    'Diapers',
    'Fresh fruits',
    'Organic vegetables',
    'Multivitamins'
];

// Cart functionality
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartBadge();
    }

    loadCart() {
        const saved = localStorage.getItem('omoolaCart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('omoolaCart', JSON.stringify(this.items));
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                ...product,
                quantity: quantity
            });
        }
        
        this.saveCart();
        this.updateCartBadge();
        return true;
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartBadge();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
            this.updateCartBadge();
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    updateCartBadge() {
        const badge = document.getElementById('cartBadge');
        if (badge) {
            const count = this.getItemCount();
            badge.textContent = count;
            badge.style.display = count > 0 ? 'block' : 'none';
        }
    }

    clear() {
        this.items = [];
        this.saveCart();
        this.updateCartBadge();
    }
}

// Export for use in script.js
if (typeof window !== 'undefined') {
    window.products = products;
    window.offers = offers;
    window.searchSuggestions = searchSuggestions;
    window.ShoppingCart = ShoppingCart;
}
