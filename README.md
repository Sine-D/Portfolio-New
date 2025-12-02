# 🚀 Modern 3D Portfolio

A stunning, interactive portfolio website built with React, Three.js, and modern web technologies. Features immersive 3D elements, smooth animations, and a responsive design that showcases projects and skills in a visually captivating way.

## ✨ Features

### 🎨 Visual Excellence
- **3D Graphics**: Immersive Three.js backgrounds with gradient meshes, particles, wireframes, and geometric shapes
- **Interactive 3D Cube**: Custom-built interactive cube in the hero section with drag controls and smooth animations
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Modern Design**: Glassmorphism effects, gradient overlays, and premium aesthetics
- **Responsive Layout**: Fully optimized for desktop, tablet, and mobile devices

### 🛠️ Technical Features
- **TypeScript**: Full type safety and enhanced developer experience
- **React 18**: Latest React features with hooks and functional components
- **Custom Hooks**: Reusable logic for swipe navigation and touch gestures
- **Performance Optimized**: Lazy loading, code splitting, and optimized 3D rendering
- **SEO Ready**: Proper meta tags and semantic HTML structure

### 📱 User Experience
- **Touch Gestures**: Swipe navigation support for mobile devices
- **Bottom Navigation**: Mobile-friendly navigation bar
- **Loading Animation**: Smooth entry experience with custom loading screen
- **Interactive Elements**: Hover effects, click animations, and visual feedback
- **Accessibility**: ARIA labels and keyboard navigation support

## 🏗️ Project Structure

```
Portfolio/
├── src/
│   ├── components/          # React components
│   │   ├── Hero.tsx        # Hero section with 3D cube
│   │   ├── About.tsx       # About section
│   │   ├── Skills.tsx      # Skills showcase
│   │   ├── Projects.tsx    # Project portfolio
│   │   ├── Testimonials.tsx # Client testimonials
│   │   ├── Achievements.tsx # Awards and certifications
│   │   ├── Contact.tsx     # Contact form and info
│   │   ├── Navigation.tsx  # Top navigation
│   │   ├── BottomNavigation.tsx # Mobile bottom nav
│   │   ├── ThreeD.tsx      # 3D components library
│   │   └── ...             # Other components
│   ├── hooks/              # Custom React hooks
│   │   ├── useSwipeNavigation.ts
│   │   └── useTouchGestures.ts
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles and Tailwind config
├── public/                 # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── vite.config.ts         # Vite build configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Build for Production

```bash
npm run build
```

The optimized production build will be generated in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📦 Tech Stack

### Core Technologies
- **[React](https://react.dev/)** - UI library for building component-based interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Next-generation frontend build tool

### 3D Graphics & Animation
- **[Three.js](https://threejs.org/)** - 3D graphics library
- **[@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)** - React renderer for Three.js
- **[@react-three/drei](https://github.com/pmndrs/drei)** - Useful helpers for react-three-fiber
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready animation library

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Icons](https://react-icons.github.io/react-icons/)** - Popular icon library

### Additional Libraries
- **[canvas-confetti](https://www.npmjs.com/package/canvas-confetti)** - Celebration effects
- **[react-intersection-observer](https://www.npmjs.com/package/react-intersection-observer)** - Scroll-based animations

## 🎯 Key Components

### Hero Section
The hero section features an interactive 3D cube built with Three.js that responds to user interactions:
- Drag to rotate the cube
- Hover for visual feedback
- Smooth spring animations
- Floating particles and ambient glow effects

### Projects Showcase
Dynamic project cards with:
- Live demo links
- GitHub repository links
- Technology tags
- Hover animations and effects

### 3D Background Elements
Multiple layers of 3D graphics:
- **Gradient Mesh**: Animated gradient background
- **Particle System**: Floating particles with physics
- **Wireframe Geometry**: Abstract geometric shapes
- **Geometric Shapes**: Sphere and pyramid decorations

## 🎨 Customization

### Updating Content

1. **Personal Information**: Edit the content in respective component files
2. **Projects**: Update the projects array in `src/components/Projects.tsx`
3. **Skills**: Modify skills data in `src/components/Skills.tsx`
4. **Colors**: Customize the color scheme in `tailwind.config.js`
5. **3D Elements**: Adjust 3D configurations in `src/components/ThreeD.tsx`

### Styling

The project uses Tailwind CSS for styling. You can customize:
- Colors and gradients in `tailwind.config.js`
- Global styles in `src/index.css`
- Component-specific styles using Tailwind utility classes

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ IE11 (not supported)

## 🔧 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint for code quality |

