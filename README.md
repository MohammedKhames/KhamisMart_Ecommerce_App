# 🛒 KhamisMart - Modern E-commerce Platform

**KhamisMart** is a premium, high-performance e-commerce platform built with **Next.js 15+** and **Tailwind CSS**. It features a stunning modern design centered around a bold Navy & Orange brand identity, offering a seamless shopping experience across all devices.

![Brand Theme](https://img.shields.io/badge/Theme-Navy_%26_Orange-orange?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Key Features

### 🚀 Performance & UI
- **Full Responsiveness**: Optimized for mobile, tablet, and desktop viewports.
- **Micro-Animations**: Smooth transitions using Framer Motion and Swiper.js.
- **Premium Hero Slider**: High-impact home page slider with optimized mobile visibility.
- **Glassmorphism & Blurs**: Modern UI elements for a state-of-the-art aesthetic.

### 🛍️ Shopping Experience
- **Advanced Search**: Real-time search with an expandable mobile-friendly search bar.
- **Product Management**: Full integration with Cart and Wishlist systems.
- **Consistent Layouts**: Normalized product cards and grids ensuring a balanced UI.
- **Dynamic Categories & Brands**: Effortlessly browse products by category or brand.

### 🔐 Security & Auth
- **NextAuth Integration**: Clean and secure authentication flow.
- **JWT-Based API Communication**: Secure interaction with the backend services.

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context (Cart & Wishlist)
- **Sliders**: [Swiper.js](https://swiperjs.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🚀 Getting Started

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MohammedKhames/khamismart.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the necessary configuration (API URLs, NextAuth secrets, etc.).

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open the browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Branding Colors

| Color | Hex | Tailwind Utility |
|-------|-----|------------------|
| **Brand Orange** | `#FF9900` | `text-[#FF9900]` / `bg-[#FF9900]` |
| **Brand Navy** | `#131921` | `text-[#131921]` / `bg-[#131921]` |

## 📐 Project Structure

```text
src/
├── app/          # Next.js App Router (Pages & Layouts)
├── assets/       # Static assets (images, icons)
├── components/   # Reusable UI components
│   ├── home/    # Home page sections
│   ├── layout/  # Navbar, Footer
│   └── ui/      # Core UI elements (Shadcn/UI)
├── contexts/     # Cart & Wishlist contexts
├── helpers/      # Utility functions
├── interfaces/   # TypeScript interfaces
└── services/     # API service layer
```

---

Developed with ❤️ by **Mohammed Khamis**.
