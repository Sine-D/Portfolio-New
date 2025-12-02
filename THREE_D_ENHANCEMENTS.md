# 3D Animation Enhancements

This document outlines all the new 3D animation enhancements added to your website.

## 🎨 New Components

### 1. **ThreeDScene** (`src/components/ThreeDScene.tsx`)
A WebGL-powered 3D scene using Three.js with animated geometric shapes.

**Features:**
- Animated 3D spheres with distortion effects
- Floating 3D boxes with rotation
- Animated torus rings
- Interactive hover effects
- Customizable lighting and camera

**Usage:**
```tsx
import ThreeDScene from './components/ThreeDScene'

<ThreeDScene 
  showControls={false} 
  intensity={0.6}
  cameraPosition={[0, 0, 5]}
/>
```

### 2. **ThreeDMeshBackground** (`src/components/ThreeDMeshBackground.tsx`)
An interactive 3D mesh background with particle system.

**Features:**
- Wireframe icosahedron geometry
- 150+ animated particles
- Mouse-responsive rotation
- Smooth animations

**Usage:**
```tsx
import ThreeDMeshBackground from './components/ThreeDMeshBackground'

const [mouse, setMouse] = useState({ x: 0, y: 0 })

<div onMouseMove={(e) => setMouse({ x: ..., y: ... })}>
  <ThreeDMeshBackground mouse={mouse} />
</div>
```

### 3. **Scroll3DParallax** (`src/components/Scroll3DParallax.tsx`)
Scroll-based 3D parallax effects with multiple components.

**Components:**
- `Scroll3DParallax` - Main parallax wrapper
- `Card3DReveal` - 3D card reveal on scroll
- `Stack3D` - 3D stacking effect

**Usage:**
```tsx
import { Scroll3DParallax, Card3DReveal } from './components/Scroll3DParallax'

<Scroll3DParallax speed={0.8} depth={200} direction="up">
  <div>Your content</div>
</Scroll3DParallax>

<Card3DReveal direction="up" delay={0}>
  <div>Card content</div>
</Card3DReveal>
```

### 4. **Advanced 3D Text** (`src/components/ThreeDTextAdvanced.tsx`)
Multiple advanced 3D text effects.

**Components:**
- `AdvancedText3D` - Multi-layer 3D text with glow
- `WaveText3D` - Wave animation effect
- `TextReveal3D` - 3D reveal animation
- `GlitchText3D` - Glitch effect with 3D

**Usage:**
```tsx
import { AdvancedText3D, WaveText3D } from './components/ThreeDTextAdvanced'

<AdvancedText3D depth={60} layers={8} color="#06b6d4">
  HELLO WORLD
</AdvancedText3D>

<WaveText3D amplitude={30} frequency={0.03}>
  WAVE ANIMATION
</WaveText3D>
```

### 5. **3D Navigation** (`src/components/ThreeDNavigation.tsx`)
3D navigation components for menus and transitions.

**Components:**
- `PageTransition3D` - 3D page transitions
- `MenuItem3D` - 3D menu items with hover
- `Sidebar3D` - 3D sidebar animation
- `TabNav3D` - 3D tab navigation
- `Breadcrumb3D` - 3D breadcrumb navigation

**Usage:**
```tsx
import { MenuItem3D, TabNav3D } from './components/ThreeDNavigation'

<MenuItem3D active>
  <button>Home</button>
</MenuItem3D>

<TabNav3D tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
```

## 🚀 Integration Examples

### Adding 3D Scene to Hero Section

```tsx
import ThreeDScene from './components/ThreeDScene'

<section className="relative h-screen">
  <ThreeDScene className="opacity-50" />
  {/* Your hero content */}
</section>
```

### Adding Scroll Parallax to Sections

```tsx
import { Scroll3DParallax } from './components/Scroll3DParallax'

<section>
  <Scroll3DParallax speed={0.6} depth={150}>
    <div className="glass rounded-2xl p-8">
      <h2>Scroll to see 3D effect</h2>
    </div>
  </Scroll3DParallax>
</section>
```

### Using Advanced 3D Text

```tsx
import { AdvancedText3D } from './components/ThreeDTextAdvanced'

<h1>
  <AdvancedText3D 
    depth={80} 
    layers={10} 
    color="#06b6d4" 
    glowColor="#8b5cf6"
  >
    Your Title
  </AdvancedText3D>
</h1>
```

## 📦 Dependencies Added

- `three` - Core Three.js library
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Useful helpers for react-three/fiber

## 🎯 Performance Tips

1. **Use WebGL components sparingly** - They're GPU-intensive
2. **Limit particle counts** - Start with 50-100 particles
3. **Use `will-change` CSS** for animated elements
4. **Lazy load 3D scenes** - Only load when needed
5. **Reduce quality on mobile** - Use lower DPR settings

## 🔧 Customization

All components accept className and style props for easy customization:

```tsx
<ThreeDScene 
  className="opacity-30"
  intensity={0.4}
  cameraPosition={[0, 0, 8]}
/>
```

## 📱 Mobile Considerations

- 3D WebGL components may be heavy on mobile
- Consider using CSS-based 3D transforms instead
- Test performance on actual devices
- Provide fallbacks for low-end devices

## 🎨 Color Schemes

Components use your existing color palette:
- Primary: `#06b6d4` (cyan)
- Secondary: `#8b5cf6` (purple)
- Accent: `#ec4899` (pink)

Customize via props:
```tsx
<AdvancedText3D color="#your-color" glowColor="#your-glow" />
```

## 📚 Full Example

See `src/components/ThreeDExamples.tsx` for complete usage examples of all new components.

