# Zenith Saga Store

An immersive anime-themed e-commerce website for merchandise including cards, stickers, posters, and bookmarks from anime, TV series, music bands, and sports.

![Zenith Saga Store](public/images/zenith-saga-logo.png)

## Features

- **Modern Design**: Sleek anime-inspired UI with orange, black, and white color scheme
- **3D Elements**: Interactive 3D product showcases for an immersive shopping experience
- **Responsive Layout**: Fully responsive design that works on all devices
- **Product Categories**: Browse merchandise by anime, TV series, movies, music, and sports
- **Shopping Cart**: Add products to cart and manage quantities
- **Checkout System**: Complete checkout process with shipping and payment information
- **Order Confirmation**: Receive confirmation with dynamic order ID
- **Form Submission**: Integration with Web3Forms for order processing

## Tech Stack

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React
- **Three.js/React Three Fiber**: 3D rendering capabilities
- **Web3Forms**: Form submission and email notifications

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/zenith-saga-store.git
   cd zenith-saga-store
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create necessary directories:
   ```bash
   mkdir -p public/images/products public/images/categories
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
zenith-saga-store/
├── app/                  # Next.js app directory
│   ├── checkout/         # Checkout page
│   ├── products/         # Products pages
│   ├── categories/       # Categories pages
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── Header.tsx        # Site header
│   ├── Footer.tsx        # Site footer
│   ├── HeroSection.tsx   # Hero section
│   ├── ProductCard.tsx   # Product card component
│   ├── CategoryCard.tsx  # Category card component
│   └── Newsletter.tsx    # Newsletter signup component
├── data/                 # Data files
│   └── mockData.ts       # Mock product and category data
├── public/               # Static assets
│   └── images/           # Images for the site
├── styles/               # Additional styles
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

## Customization

### Adding Products

To add new products, edit the `data/mockData.ts` file and add new entries to the `featuredProducts` array.

### Changing Colors

The color scheme can be modified in the `tailwind.config.js` file by updating the custom colors in the theme section.

### 3D Models

To add 3D models, place your .glb or .gltf files in the public directory and update the 3D viewer component to load these models.

## Deployment

This project can be deployed on Vercel, Netlify, or any other platform that supports Next.js applications.

```bash
# Build for production
npm run build
# or
yarn build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Images sourced from [Unsplash](https://unsplash.com)
- Icons from [Heroicons](https://heroicons.com)
- Form processing by [Web3Forms](https://web3forms.com) 