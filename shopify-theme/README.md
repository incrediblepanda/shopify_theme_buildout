# TCG Vaults Shopify Theme

A modern, dark-themed Shopify theme designed specifically for Pokémon card retailers and collectors. Built with Shopify 2.0 architecture, TailwindCSS, and optimized for TCG e-commerce.

## Features

### 🎨 Design
- **Dark Theme**: Sleek black background with blue-purple gradient accents
- **Modern Typography**: Clean Inter font family throughout
- **Responsive Design**: Optimized for all device sizes
- **Smooth Animations**: Fade-in and hover effects for enhanced UX

### 🛍️ E-commerce Features
- **Product Metafields**: Support for card set, rarity, grading company, and condition
- **Advanced Filtering**: Filter by set, rarity, grading company, and price range
- **Product Image Carousel**: Multiple image support with thumbnails
- **Quick Add to Cart**: Fast purchase experience
- **Trust Badges**: Authenticity, grading, and shipping guarantees

### 📱 Homepage Sections
- **Hero Section**: Customizable headline, CTA, and background image
- **Category Grid**: 6 product category tiles (Singles, Slabs, Booster Packs, ETBs, Booster Boxes, Sealed Bundles)
- **Featured Products**: Showcase products from any collection
- **Trust Section**: Display authenticity, grading, and shipping promises
- **Customer Reviews**: 3 customizable testimonials with ratings
- **Email Opt-in**: Newsletter signup with benefits display

### ⚙️ Theme Customization
- **Logo Upload**: Custom logo with size control
- **Color Gradients**: Customizable blue-purple gradients
- **Typography Settings**: Font selection and sizing
- **Layout Options**: Page width and sticky header controls
- **Social Media Links**: Connect all major platforms

## Installation

### Prerequisites
- Shopify CLI installed
- Access to a Shopify development store
- Basic knowledge of Liquid templating

### Setup Instructions

1. **Clone or Download** this theme to your local machine
2. **Install Shopify CLI** if not already installed:
   ```bash
   npm install -g @shopify/cli @shopify/theme
   ```

3. **Navigate to theme directory**:
   ```bash
   cd shopify-theme
   ```

4. **Connect to your Shopify store**:
   ```bash
   shopify theme dev
   ```

5. **Preview the theme** using the provided URL

6. **Deploy to your store**:
   ```bash
   shopify theme push
   ```

## Theme Configuration

### Required Setup

#### 1. Metafields Configuration
Navigate to **Settings > Custom data** in your Shopify admin and create the following product metafields:

- **card.set** (Single line text) - Card set name
- **card.rarity** (Single line text) - Card rarity (e.g., "Rare Holo")
- **card.grading_company** (Single line text) - Grading company (e.g., "PSA", "BGS")
- **card.condition** (Single line text) - Card condition (e.g., "NM", "LP", "MP")

#### 2. Collections Setup
Create the following collections for the category grid:
- `singles` - Individual cards
- `slabs` - Graded cards
- `booster-packs` - Sealed booster packs
- `elite-trainer-boxes` - ETB products
- `booster-boxes` - Sealed booster boxes
- `sealed-bundles` - Bundle products

#### 3. Featured Collection
Create a `featured` collection and add products you want to showcase on the homepage.

### Theme Customization

Access **Online Store > Themes > Customize** to configure:

#### Logo & Branding
- Upload your logo (recommended: 300x100px)
- Set logo maximum width
- Upload favicon (32x32px)

#### Colors & Gradients
- Customize primary gradient colors
- Adjust accent gradient colors
- Modify text colors

#### Homepage Sections
Each section can be customized through the theme editor:

1. **Hero Section**
   - Set headline and subheadline
   - Configure CTA buttons and links
   - Upload background image

2. **Category Grid**
   - Assign collection handles
   - Upload category images
   - Customize titles and descriptions

3. **Featured Products**
   - Select featured collection
   - Set number of products to display
   - Configure "View All" button

4. **Trust Section**
   - Customize trust badge content
   - Enable/disable statistics display
   - Modify stat numbers and labels

5. **Reviews Section**
   - Update customer testimonials
   - Upload customer avatars
   - Set overall rating display

6. **Email Opt-in**
   - Customize newsletter content
   - Configure success messages
   - Enable/disable benefits section

## File Structure

```
shopify-theme/
├── assets/
│   ├── styles.css          # Main CSS with TailwindCSS
│   └── global.js           # Theme JavaScript functionality
├── config/
│   └── settings_schema.json # Theme customization settings
├── layout/
│   └── theme.liquid        # Main layout with header/footer
├── locales/
│   └── en.default.json     # English text content
├── sections/
│   ├── hero.liquid         # Homepage hero section
│   ├── category-grid.liquid # Product category grid
│   ├── featured-products.liquid # Featured products display
│   ├── trust-section.liquid # Trust badges and stats
│   ├── reviews.liquid      # Customer testimonials
│   └── email-optin.liquid  # Newsletter signup
├── snippets/
│   └── product-card.liquid # Reusable product card component
├── templates/
│   ├── index.liquid        # Homepage template
│   ├── product.liquid      # Product page template
│   ├── collection.liquid   # Collection page template
│   └── page.contact.liquid # Contact page template
└── README.md              # This file
```

## Customization Guide

### Adding New Metafields

1. Create metafield in Shopify admin
2. Update `product-card.liquid` snippet to display the new field
3. Add filtering options in `collection.liquid` if needed

### Styling Changes

All custom styles are in `assets/styles.css`. The theme uses:
- **TailwindCSS**: Utility-first CSS framework
- **CSS Custom Properties**: For theme colors and gradients
- **CSS Grid & Flexbox**: For responsive layouts

Key CSS variables:
```css
:root {
  --color-primary: #3B82F6;
  --color-secondary: #9333EA;
  --color-background: #000000;
  --color-text: #FFFFFF;
}
```

### Adding New Sections

1. Create new `.liquid` file in `sections/` directory
2. Include section schema for customization options
3. Add section to desired template file

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

The theme is optimized for performance with:
- Lazy loading images
- Minified CSS and JavaScript
- Optimized image sizes
- Minimal external dependencies

## Support

For theme support and customization requests, contact the TCG Vaults development team.

## Troubleshooting

### Common Issues

1. **Metafields not displaying**: Ensure metafields are created with exact namespace.field format
2. **Images not loading**: Check image URLs and sizes
3. **Sections not appearing**: Verify section is added to template and enabled in theme customizer

### Debug Mode

Add `?debug=true` to any URL to enable debug information display.

## Contributing

When contributing to this theme:
1. Follow existing code style and structure
2. Test across multiple browsers and devices
3. Update documentation for any new features
4. Ensure accessibility standards are maintained

## License

This theme is proprietary to TCG Vaults. All rights reserved.

## Changelog

### v1.0.0 (Initial Release)
- Complete Shopify 2.0 theme implementation
- Homepage sections with full customization
- Product and collection templates
- Contact page with form functionality
- Responsive design and dark theme
- Metafields support for card details
- Advanced filtering and sorting
