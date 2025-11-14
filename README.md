# Omolola Pharmacy & Stores

A fully functional, professional e-commerce platform for medicines, health products, and groceries. Built with HTML, CSS, and Vanilla JavaScript, integrated with Firebase for authentication and Firestore database, and Cloudinary for image storage.

![Omolola Pharmacy](https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80)

## 🌟 Features

### Customer-Facing Features
- **Modern, Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Product Catalog**: Browse medicines, health products, and groceries
- **Advanced Search**: Real-time search with suggestions
- **Category Filtering**: Filter products by category, price, rating, and availability
- **Product Details**: Comprehensive product information with reviews and ratings
- **Shopping Cart**: Persistent cart using localStorage
- **Secure Checkout**: Multi-step checkout process with delivery and payment options
- **User Authentication**: Firebase-powered authentication system

### Admin Dashboard Features
- **Dashboard Overview**: Key metrics and statistics at a glance
- **Product Management**: Add, edit, and delete products with Cloudinary image uploads
- **Category Management**: Organize products into categories
- **Order Management**: View and update order statuses
- **User Management**: Manage user accounts and roles
- **Analytics**: Track sales, revenue, and customer data

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (optional, for local development server)
- Firebase account (for backend integration)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Akinwale10/Video.git
   cd Video
   ```

2. **Set up Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your Firebase configuration

3. **Set up Cloudinary**
   - Go to [Cloudinary Console](https://cloudinary.com/console)
   - Copy your Cloud Name, API Key
   - Create an unsigned upload preset

4. **Configure the application**
   - Copy `config.example.js` to create your own configuration
   - Update `js/firebase-config.js` with your Firebase credentials
   - Update `js/cloudinary-config.js` with your Cloudinary credentials

5. **Run locally**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   
   # Using PHP
   php -S localhost:8000
   ```

6. **Open in browser**
   Navigate to `http://localhost:8000`

## 📁 Project Structure

```
omolola-pharmacy/
├── index.html              # Homepage
├── shop.html               # Product listing page
├── product.html            # Product detail page
├── cart.html               # Shopping cart
├── checkout.html           # Checkout process
├── about.html              # About page
├── contact.html            # Contact page
├── admin/                  # Admin dashboard
│   ├── index.html          # Dashboard overview
│   ├── products.html       # Product management
│   ├── categories.html     # Category management
│   ├── orders.html         # Order management
│   └── users.html          # User management
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   ├── main.js             # Frontend functionality
│   ├── admin.js            # Admin dashboard logic
│   ├── firebase-config.js  # Firebase configuration
│   └── cloudinary-config.js # Cloudinary configuration
├── assets/
│   ├── images/             # Image assets
│   └── icons/              # SVG icons
├── config.example.js       # Configuration template
└── README.md               # This file
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#2563eb` - Main brand color
- **Primary Dark**: `#1e40af` - Darker shade for hover states
- **Secondary Orange**: `#f59e0b` - Call-to-action buttons
- **Success Green**: `#10b981` - Success messages
- **Error Red**: `#ef4444` - Error messages

### Typography
- **Headings**: Montserrat (Bold, Semi-bold)
- **Body Text**: Lato (Regular, Medium)

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Configuration

### Firebase Setup

1. **Authentication**
   ```javascript
   // Enable Email/Password authentication in Firebase Console
   // Users can register and login
   ```

2. **Firestore Database Structure**
   ```
   products/
     - {productId}
       - name: string
       - description: string
       - price: number
       - category: string
       - image: string (Cloudinary URL)
       - stock: number
       - rating: number
       - reviews: number
       - requiresPrescription: boolean
   
   categories/
     - {categoryId}
       - name: string
       - slug: string
       - description: string
   
   orders/
     - {orderId}
       - userId: string
       - items: array
       - total: number
       - status: string
       - deliveryAddress: object
       - createdAt: timestamp
   
   users/
     - {userId}
       - email: string
       - name: string
       - role: string
       - createdAt: timestamp
   ```

### Cloudinary Setup

1. **Create Upload Preset**
   - Go to Settings > Upload
   - Add upload preset
   - Set mode to "Unsigned"
   - Configure folder and tags

2. **Image Optimization**
   - Automatic format selection
   - Automatic quality adjustment
   - Responsive image delivery

## 🛒 Shopping Cart

The shopping cart uses browser localStorage for persistence:
- Items persist across browser sessions
- Automatic quantity updates
- Real-time total calculation
- Empty cart detection

```javascript
// Cart operations
cart.addItem(product, quantity);
cart.removeItem(productId);
cart.updateQuantity(productId, quantity);
cart.getTotal();
cart.clear();
```

## 👨‍💼 Admin Dashboard

### Access
- URL: `/admin/index.html`
- Default Password: `admin123` (Change in production!)
- Password is stored in localStorage for development

### Features
- **Dashboard**: Overview of key metrics
- **Products**: CRUD operations for products
- **Categories**: Manage product categories
- **Orders**: View and update order statuses
- **Users**: Manage user accounts

### Security Notes
⚠️ **Important**: The current admin authentication is for development only. In production:
- Implement proper Firebase Authentication
- Use Firebase Custom Claims for role-based access
- Add server-side validation
- Never store passwords in client-side code

## 🔐 Security Considerations

### Current Implementation (Development)
- Admin password in localStorage
- Client-side validation only
- Sample product data

### Production Recommendations
1. **Authentication**: Use Firebase Authentication with custom claims
2. **Authorization**: Implement proper role-based access control
3. **Data Validation**: Server-side validation using Firebase Security Rules
4. **API Keys**: Store in environment variables, never commit to repository
5. **HTTPS**: Always use SSL/TLS in production
6. **Payment Integration**: Use secure payment gateways (Stripe, Paystack)
7. **Prescription Verification**: Implement pharmacist review system
8. **Data Protection**: Comply with healthcare data regulations (HIPAA, GDPR)

## 📱 Responsive Design

The site is fully responsive with three main breakpoints:

- **Mobile (< 768px)**
  - Single column layout
  - Hamburger menu
  - Touch-optimized interactions
  - Simplified navigation

- **Tablet (768px - 1024px)**
  - Two-column layouts
  - Adapted navigation
  - Optimized for touch

- **Desktop (> 1024px)**
  - Multi-column layouts
  - Full navigation
  - Hover effects
  - Sticky elements

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Alt text for images
- Color contrast (WCAG AA compliant)
- Reduced motion support

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚢 Deployment

### GitHub Pages
```bash
git add .
git commit -m "Initial commit"
git push origin main
```
Enable GitHub Pages in repository settings.

### Netlify
1. Connect your repository
2. Set build command: (none)
3. Set publish directory: `/`
4. Deploy!

### Vercel
```bash
npm i -g vercel
vercel
```

### Traditional Hosting
Upload all files via FTP to your web host's public directory.

## 🧪 Testing

### Manual Testing Checklist
- [ ] Homepage loads correctly
- [ ] Navigation works on all pages
- [ ] Products display properly
- [ ] Search functionality works
- [ ] Filters work on shop page
- [ ] Add to cart functionality
- [ ] Cart updates correctly
- [ ] Checkout process completes
- [ ] Admin login works
- [ ] Admin CRUD operations
- [ ] Responsive on mobile
- [ ] Responsive on tablet

## 📊 Performance

- Minimal dependencies (vanilla JS)
- Optimized CSS (single file)
- Lazy loading for images
- Local storage for cart
- Smooth animations with CSS
- Hardware-accelerated transitions

## 🔄 Future Enhancements

- [ ] Real-time inventory updates
- [ ] Email notifications
- [ ] SMS alerts for orders
- [ ] Live chat with pharmacist
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search filters
- [ ] Multi-language support
- [ ] PWA capabilities
- [ ] Push notifications
- [ ] Order tracking
- [ ] Loyalty program
- [ ] Prescription upload
- [ ] Video consultations

## 📄 License

Copyright © 2024 Omolola Pharmacy & Stores. All rights reserved.

### Important Legal Notes

**Pharmacy License**: PCN-NG-2024-001234 (Replace with actual license in production)

**Medical Disclaimer**: This is a demonstration project. For production use:
- Obtain proper pharmacy licenses
- Comply with healthcare regulations
- Implement proper prescription verification
- Consult legal counsel for medical disclaimers
- Follow local pharmacy laws

## 🤝 Contributing

This is a demonstration project. For improvements:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For questions or issues:
- Check the documentation
- Review code comments
- Check browser console for errors
- Ensure JavaScript is enabled

## 🙏 Acknowledgments

- Design inspired by modern e-commerce platforms
- Images from [Unsplash](https://unsplash.com)
- Icons: SVG (inline)
- Fonts: [Google Fonts](https://fonts.google.com)

## 📋 Changelog

### Version 1.0.0 (November 2024)
- Initial release
- Complete frontend implementation
- Admin dashboard
- Firebase integration ready
- Cloudinary integration ready
- Responsive design
- Shopping cart functionality
- Search and filter features

---

**Built with ❤️ for Omolola Pharmacy & Stores**

*For any questions or support, please contact the development team.*
