# Portfolio Site

A modern, interactive portfolio website built with React, TypeScript, and Vite. Features a sleek dark design with smooth animations, performance optimizations, and fully responsive mobile-friendly UI.

## ✨ Features

### Core Features
- **Back-to-Top Button** - Smooth scroll utility that appears after scrolling 100px, available on PC and mobile with fade-in animation
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop with touch-friendly UI (44px minimum touch targets)
- **Interactive Components** - Smooth animations and transitions with Framer Motion spring physics
- **Project Showcases** - 6 interactive project demos with full CRUD functionality
- **Dark Theme** - Modern dark interface with lime-green accents (#ccff00)
- **Accessibility** - ARIA labels, semantic HTML, keyboard navigation, passive scroll listeners

### Performance Optimizations
- **React.memo** - Memoized components prevent unnecessary re-renders across 11 components
- **useCallback & useMemo** - Optimized event handlers and computed values throughout
- **Lazy Loading** - Images load only when needed
- **Fast Load Times** - Powered by Vite for instant HMR and optimized builds
- **Passive Scroll Listeners** - Non-blocking scroll events for smooth mobile performance

### Mobile Compatibility
- Touch-friendly button sizing (min 44x44px per accessibility standards)
- Responsive typography (text-sm on mobile → text-base on tablet → text-lg on desktop)
- Flexible layouts with mobile-first breakpoints (sm:, md:, lg:)
- Modal overflow handling (max-h-[90vh] overflow-y-auto for mobile scrolling)
- Tap feedback animations (scale on touch for tactile response)

## 🎯 Project Components

### Main Projects (6 Interactive Apps)

1. **ProjectBoard** - Kanban task management dashboard
   - Features: Create/Read/Update/Delete tasks, search, filter by priority, edit inline
   - Search filters: title, description, tags
   - Drag-and-drop status management (Todo/In Progress/Review/Done)
   - Priority levels: Low, Medium, High, Critical
   - Fully memoized for performance

2. **RecipeApp** - Recipe discovery and favorites
   - Features: Browse recipes, toggle favorites, filter by category
   - Image lazy loading for performance
   - Responsive recipe card grid
   - Hummus platter image with public folder serving

3. **EcommerceStore** - Product browsing and management
   - Features: Product listing, cart functionality, price display
   - Responsive product grid with lazy loading

4. **TodoApp** - Task management with priorities
   - Features: Add/delete/complete tasks
   - Priority-based organization
   - Real-time task updates

5. **WeatherDashboard** - Weather information display
   - Features: City weather lookup, current conditions
   - Real-time weather data
   - Responsive weather card layout

6. **PersonalLandingPage** - Professional landing page
   - Features: Contact form, CTA buttons, skill showcase
   - Responsive design with email integration

### Utility Components

- **HomeView** - Landing page with project showcase and skills display (memoized)
- **Navigation** - Top nav with back button, responsive menu on mobile (memoized)
- **BackToTop** - Global scroll-to-top button with smooth fade-in animation
- **BackgroundEffects** - Animated grid background with scanline effects (memoized)
- **FloatingElements** - Floating code symbols and decorative shapes (mobile-optimized)
- **CursorEffects** - Custom cursor trails and click ripples (requestAnimationFrame throttled)
- **Resume** - Professional resume/CV view
- **Footer** - Footer with contact information and links

## Tech Stack

- **React 18.3.1** - UI library with hooks and memo optimization
- **TypeScript** - Type-safe JavaScript throughout
- **Vite 6.4.1** - Build tool with instant HMR
- **Tailwind CSS 4.1.3** - Utility-first CSS with responsive breakpoints
- **Framer Motion** - Animation library with spring physics (damping: 25, stiffness: 300)
- **Radix UI** - Headless component primitives
- **shadcn/ui** - 30+ high-quality UI components
- **Recharts** - Data visualization charts
- **Lucide React** - Icon library with 400+ icons
- **Sora Font** - Custom typography throughout

## 🎨 Design System

### Color Palette
- **Primary Accent** - Lime Green (#ccff00)
- **Background** - Deep Black (#050505)
- **Text Primary** - White
- **Text Secondary** - Gray-700 to Gray-900
- **Borders** - Lime accents with 0.2-0.4 opacity

### Typography
- **Font Family** - Sora, sans-serif applied globally via inline styles
- **Mobile** - text-sm (14px)
- **Tablet** - text-base (16px)
- **Desktop** - text-lg+ (18px+)
- **Headings** - font-bold with responsive sizes

### Spacing & Breakpoints
- **Mobile First** - Base styles for mobile, then scale up
- **sm:** - Small screens (640px)
- **md:** - Medium screens (768px)
- **lg:** - Large screens (1024px)
- **Padding** - px-4 on mobile, md:px-6, md:px-8 on larger screens
- **Gap Spacing** - Consistent gap-3 to gap-6 between elements

### Animations
- **Spring Physics** - damping: 25, stiffness: 300 for natural movement
- **Stagger Delays** - 0.03-0.05s for card animations
- **Smooth Scroll** - behavior: 'smooth' for scroll-to-top
- **Hover Effects** - Scale 1.1 on hover, 0.9 on tap
- **Fade Animations** - Opacity transitions for entry/exit

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3001` (or next available port)

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── App.tsx - Main application router with view management
│   ├── HomeView.tsx - Landing page with project showcase (memoized)
│   ├── Navigation.tsx - Top navigation bar (memoized)
│   ├── BackToTop.tsx - Scroll-to-top utility button with smooth fade
│   ├── BackgroundEffects.tsx - Animated grid background (memoized)
│   ├── FloatingElements.tsx - Decorative floating code symbols (mobile-optimized)
│   ├── CursorEffects.tsx - Custom cursor trails and ripples (throttled)
│   ├── Footer.tsx - Footer with links and info
│   ├── Resume.tsx - Resume/CV view
│   ├── Card.tsx - Reusable card component
│   ├── projects/ - Project showcase components (all memoized)
│   │   ├── ProjectBoard.tsx - Kanban task manager with CRUD
│   │   ├── RecipeApp.tsx - Recipe discovery app
│   │   ├── EcommerceStore.tsx - E-commerce demo
│   │   ├── TodoApp.tsx - Todo list
│   │   ├── WeatherDashboard.tsx - Weather app
│   │   └── PersonalLandingPage.tsx - Landing page demo
│   ├── demos/ - Demo components
│   │   ├── EcommerceDemo.tsx
│   │   ├── SourcingDemo.tsx
│   │   └── SportsDemo.tsx
│   ├── figma/ - Figma integration
│   │   └── ImageWithFallback.tsx
│   ├── ui/ - shadcn/ui components (30+ components)
│   │   ├── button.tsx, card.tsx, input.tsx, etc.
│   │   └── utils.ts - Utility functions
│   └── guidelines/ - Design documentation
├── styles/
│   ├── globals.css - Global Tailwind styles and custom CSS
│   └── index.css - Additional component styles
├── assets/ - Images and static files
│   └── ludovic-avice-yr-sW_x9aHk-unsplash.jpg (hummus platter image)
├── public/ - Public static assets (served by Vite)
│   └── ludovic-avice-yr-sW_x9aHk-unsplash.jpg (copy for public serving)
├── main.tsx - Application entry point
└── index.html - HTML template
```

## 📋 Features by Component

### ProjectBoard Features
✅ Full CRUD operations (Create, Read, Update, Delete)
✅ Search by title, description, or tags
✅ Filter by priority level (All/Low/Medium/High)
✅ Inline task editing with modal
✅ Status management (Todo/In Progress/Review/Done)
✅ Animated task card entrance/exit
✅ Stats dashboard showing task counts
✅ useCallback optimizations for getTasksByStatus
✅ useMemo optimizations for filtered data
✅ Memoized TaskCard component

### Mobile Optimizations
✅ Touch-friendly button sizing (44px minimum per WCAG)
✅ Responsive text sizes with breakpoints (text-sm → md:text-base)
✅ Hamburger menu on small screens
✅ Modal overflow handling for small screens (max-h-[90vh])
✅ Tap animations for tactile feedback (whileTap)
✅ Optimized images with lazy loading (loading="lazy")
✅ Flexible grid layouts (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
✅ Hidden desktop-only text on mobile (hidden sm:inline)
✅ Passive scroll listeners to avoid blocking

### Performance Features
✅ React.memo on 11 components (prevents re-renders)
✅ useCallback for event handlers (prevents recreation)
✅ useMemo for computed values (caches calculations)
✅ Reduced animation stagger (0.03-0.05s vs 0.1s)
✅ Passive scroll listeners (addEventListener with {passive: true})
✅ Code splitting with Vite
✅ HMR (Hot Module Replacement) for instant updates
✅ RequestAnimationFrame throttling for mouse events
✅ Lazy loading for images and code splitting

## 🔒 Accessibility

- **ARIA Labels** - All interactive elements have proper aria-label attributes
- **Semantic HTML** - Proper heading hierarchy (h1, h2, h3) and button elements
- **Keyboard Navigation** - All features accessible via keyboard (Tab, Enter, Escape)
- **Touch Targets** - Minimum 44x44px for mobile interaction (touch-manipulation class)
- **Color Contrast** - Dark text on light backgrounds (WCAG AA compliant)
- **Passive Listeners** - Scroll events with {passive: true} don't block user interactions
- **Focus States** - Visible focus indicators on buttons and inputs
- **Alt Text** - Images have descriptive alt text for screen readers

## 🎯 Component Optimization Summary

| Component | Optimization | Performance Gain |
|-----------|--------------|-----------------|
| HomeView | memo() + useCallback | Prevents re-render on App updates |
| Navigation | memo() | Static nav doesn't re-render |
| ProjectBoard | memo() + useCallback + useMemo | Efficient task filtering |
| RecipeApp | memo() + useMemo | Cached recipe filtering |
| BackgroundEffects | memo() | Static background optimization |
| FloatingElements | memo() + mobile check | Fewer elements on mobile |
| CursorEffects | memo() + requestAnimationFrame | Throttled mouse updates |
| All Projects | Lazy loading on images | Images load on demand |
| Animations | Reduced stagger 0.03-0.05s | Faster entrance animations |
| Scroll | Passive listeners | Smooth 60fps scrolling |

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Attributions

See [ATTRIBUTIONS.md](src/Attributions.md) for credits and licenses of third-party libraries and assets.
