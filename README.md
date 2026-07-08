# Herbal Ecommerce Website

A modern, full-stack herbal ecommerce website built with Next.js 15 and Sanity CMS.

## 🚀 Features

- **Product Management**: Complete product catalog with categories, pricing, and inventory
- **Sanity CMS Backend**: Headless CMS for easy content management
- **Responsive Design**: Mobile-first design that works on all devices
- **Product Categories**: Organized products by categories (teas, oils, herbs, tinctures)
- **Shopping Cart**: Add to cart functionality with quantity management
- **Product Detail Pages**: Detailed product information with images, descriptions, benefits, and ingredients
- **Featured Products**: Showcase bestselling and featured products on homepage
- **Customer Testimonials**: Display customer reviews and ratings
- **Search & Filter**: Search products and filter by categories
- **Sanity Studio**: Built-in content management interface at `/studio`

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend/CMS**: Sanity CMS v3
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI, Lucide Icons
- **Notifications**: Sonner (toast notifications)
- **Image Handling**: Next.js Image optimization, Sanity Image URL

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd herbal_ecomweb
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=jfxnntpa
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2026-05-14
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Access the application**:
   - Frontend: http://localhost:3000
   - Sanity Studio: http://localhost:3000/studio

## 🗂️ Project Structure

```
herbal_ecomweb/
├── public/
│   └── Images/              # Static images
├── src/
│   ├── app/
│   │   ├── components/      # React components
│   │   ├── shop/           # Shop page
│   │   ├── product/[slug]/ # Dynamic product pages
│   │   ├── cart/           # Shopping cart
│   │   ├── about/          # About page
│   │   └── studio/         # Sanity Studio
│   ├── sanity/
│   │   ├── lib/
│   │   │   ├── client.ts   # Sanity client
│   │   │   ├── fetch.ts    # Data fetching functions
│   │   │   ├── queries.ts  # GROQ queries
│   │   │   └── image.ts    # Image URL builder
│   │   ├── schemaTypes/    # Sanity schemas
│   │   │   ├── product.ts
│   │   │   ├── category.ts
│   │   │   ├── testimonial.ts
│   │   │   └── order.ts
│   │   └── structure.ts    # Studio structure
│   └── components/
│       └── ui/             # Reusable UI components
├── sanity.config.ts        # Sanity configuration
└── sanity.cli.ts          # Sanity CLI configuration
```

## 📝 Sanity Schemas

### Product Schema
- Name, slug, description
- Images (main + gallery)
- Price, original price
- Category reference
- Stock quantity
- Benefits, ingredients, usage instructions
- SKU, weight
- Featured/New Arrival flags
- Rating

### Category Schema
- Name, slug
- Description
- Category image

### Testimonial Schema
- Customer name and image
- Rating (1-5)
- Testimonial text
- Related product reference
- Verified purchase flag

### Order Schema
- Order number
- Customer information
- Shipping address
- Order items with quantities
- Total amount
- Order status
- Payment status

## 🎨 Key Components

### Homepage
- Hero section
- Features showcase
- Featured products
- Statistics
- Customer testimonials
- CTA section
- Newsletter signup

### Shop Page
- Product grid
- Category filtering
- Search functionality
- Product cards with ratings and pricing

### Product Detail Page
- Image gallery
- Product information
- Add to cart
- Related products
- Benefits and ingredients
- Usage instructions

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Linting
npm run lint         # Run ESLint
```

## 📊 Sanity Studio

Access the Sanity Studio at `/studio` to manage:
- Products
- Categories
- Orders
- Testimonials

### Adding Products

1. Go to http://localhost:3000/studio
2. Click "Products"
3. Click "Create new Product"
4. Fill in all required fields:
   - Product name
   - Slug (auto-generated from name)
   - Main image
   - Category
   - Price
   - Description
   - Stock quantity
5. Optionally add:
   - Additional images
   - Benefits
   - Ingredients
   - Usage instructions
   - Mark as featured or new arrival
6. Click "Publish"

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

## 🔐 Environment Setup

The project uses the following Sanity configuration:
- Project ID: `jfxnntpa`
- Dataset: `production`
- API Version: `2026-05-14`

## 📱 Features to Add (Future Enhancements)

- [ ] User authentication
- [ ] Order management system
- [ ] Payment gateway integration
- [ ] Wishlist functionality
- [ ] Product reviews system
- [ ] Email notifications
- [ ] Advanced filtering (price range, ratings)
- [ ] Related product recommendations
- [ ] Inventory management
- [ ] Multi-currency support

## 🐛 Known Issues

- Live content API is currently disabled (requires next-sanity 9.5.0+)
- Some ESLint warnings about default exports (non-breaking)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For support, email your-email@example.com or open an issue in the repository.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Sanity.io for the powerful CMS
- Radix UI for accessible components
- Tailwind CSS for utility-first styling
