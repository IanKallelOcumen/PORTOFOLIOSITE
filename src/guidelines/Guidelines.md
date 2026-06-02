# Design & Development Guidelines

Comprehensive guidelines for maintaining consistency, performance, and accessibility across the portfolio site.

## 🎨 Design System

### Color Palette

**Primary Colors**
- Accent: `#ccff00` (Lime Green) - Used for highlights, buttons, and interactive elements
- Background: `#050505` (Deep Black) - Main background color
- Text: `#ffffff` (White) - Primary text color

**Secondary Colors**
- Text Secondary: `#888888` - Muted text for descriptions
- Text Dark: `#666666` - Darker muted text
- Borders: `#333333` - Dark borders with lime overlay

**Opacity Variants**
- Strong: `opacity-40` (#ccff00/40) - For borders and dividers
- Medium: `opacity-20` (#ccff00/20) - For subtle backgrounds
- Light: `opacity-10` (#ccff00/10) - For very subtle effects

### Typography

**Font Family**
- Primary: `Sora, sans-serif` - Applied globally via inline style: `fontFamily: 'Sora, sans-serif'`
- Fallback: System sans-serif fonts

**Font Sizes**
```
Mobile (default):    text-sm (14px)
Tablet (md):         text-base (16px)
Desktop (lg):        text-lg+ (18px+)
Headings (h1/h2):    font-bold with scale increase
Large Headings (h1): text-3xl md:text-4xl lg:text-5xl
Medium Headings (h2): text-2xl md:text-3xl lg:text-4xl
```

**Font Weights**
- Regular: 400 (body text)
- Semibold: 600 (labels, highlights)
- Bold: 700 (headings, important text)

### Spacing System

**Padding** - Responsive padding for containers
```
Mobile:   px-4 py-4
Tablet:   md:px-6 md:py-6
Desktop:  lg:px-8 lg:py-8
```

**Gap/Margins** - Consistent spacing between elements
```
Tight:    gap-2 / gap-3
Normal:   gap-4 / gap-6
Loose:    gap-8 / gap-12
```

**Breakpoints**
```
sm:  640px  (small screens, phones)
md:  768px  (tablets, small laptops)
lg:  1024px (desktops, large screens)
```

### Border Radius

```
Small:   rounded-lg    (8px)
Medium:  rounded-xl    (12px)
Large:   rounded-2xl   (16px)
Full:    rounded-full  (50%)
```

### Shadows & Effects

**Backdrop Blur**
```
Light:   backdrop-blur-sm
Medium:  backdrop-blur-md (used on buttons)
Heavy:   backdrop-blur-lg
```

**Hover Shadows**
```
Button Hover: hover:shadow-[0_0_20px_rgba(204,255,0,0.3)]
Card Hover:   hover:shadow-lg
```

### Component Styling

**Buttons**
```tsx
// Default Button
className="px-6 py-2 bg-[#ccff00] text-black rounded-full font-semibold hover:bg-white transition-colors"

// Secondary Button  
className="px-6 py-2 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white/20 transition-colors"

// Ghost Button
className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"

// Mobile Touch-Friendly (min 44px)
className="min-h-[44px] min-w-[44px]"
```

**Cards**
```tsx
className="rounded-2xl bg-black/40 border border-[#ccff00]/20 backdrop-blur-md p-6 hover:border-[#ccff00]/40 transition-colors"
```

**Input Fields**
```tsx
className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-[#ccff00] focus:outline-none transition-colors"
```

## 🎬 Animation System

### Spring Physics Configuration

**Standard Spring** - Used for most animations
```tsx
transition={{ type: 'spring', damping: 25, stiffness: 300 }}
```

**Smooth Spring** - For subtle, gentle animations
```tsx
transition={{ type: 'spring', damping: 20, stiffness: 200 }}
```

### Common Animation Patterns

**Fade In/Out**
```tsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
```

**Scale Entry** (removed from BackToTop to prevent pop-in)
```tsx
initial={{ opacity: 0, scale: 0.8 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.8 }}
```

**Slide Up**
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: 20 }}
```

**Hover Effects**
```tsx
whileHover={{ scale: 1.05 }}  // Subtle scale
whileTap={{ scale: 0.95 }}    // Press feedback
```

### Stagger Configuration

**Card Entrance** - Fast stagger for lists
```tsx
variants={{
  container: { staggerChildren: 0.03, delayChildren: 0.05 }
}}
```

**Modal Animation** - Smooth entrance
```tsx
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.95 }}
transition={{ type: 'spring', damping: 25, stiffness: 300 }}
```

### Duration Guidelines

```
Quick:     150ms (micro-interactions)
Standard:  300ms (hover effects)
Slow:      500ms+ (page transitions)
Stagger:   0.03-0.05s between items
```

## ⚡ Performance Guidelines

### React Optimization

**Component Memoization**
```tsx
export const MyComponent = memo(function MyComponent(props: Props) {
  // Component code
});
```
Use `React.memo()` for:
- Components that receive same props frequently
- Expensive render operations
- List item components
- Pure presentational components

**useCallback for Event Handlers**
```tsx
const handleClick = useCallback((id: string) => {
  setTasks(tasks.filter(t => t.id !== id));
}, [tasks]);
```
Use when:
- Passing callback to memoized child components
- Using in useEffect dependencies
- Preventing function recreation on each render

**useMemo for Computed Values**
```tsx
const filteredTasks = useMemo(() => {
  return tasks.filter(t => t.priority === filterLevel);
}, [tasks, filterLevel]);
```
Use when:
- Computing expensive values
- Filtering/sorting large lists
- Creating new objects/arrays on each render

### Image Optimization

**Lazy Loading**
```tsx
<img 
  src={image} 
  alt="description"
  loading="lazy"
/>
```
Always use `loading="lazy"` on images below the fold.

**Public Folder Assets**
```tsx
// For static images, use public folder path
image: '/ludovic-avice-yr-sW_x9aHk-unsplash.jpg'

// NOT ES6 imports for static assets
// import image from '@/assets/image.jpg'
```

### Scroll Performance

**Passive Event Listeners**
```tsx
window.addEventListener('scroll', handleScroll, { passive: true });
```
Always use `{ passive: true }` on scroll listeners to prevent blocking scrolling.

**RequestAnimationFrame Throttling**
```tsx
useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      // Update state
    });
  };
  
  window.addEventListener('mousemove', handleMouseMove);
  return () => window.removeEventListener('mousemove', handleMouseMove);
}, []);
```
Use RAF throttling for high-frequency events (mousemove, scroll).

### Bundle Size

**Code Splitting**
- Vite automatically handles code splitting
- Dynamic imports: `const Component = lazy(() => import('./Component'))`
- Each route gets its own chunk

**Tree Shaking**
- Use named exports instead of default exports when possible
- Import only what you need from libraries
- Avoid wildcard imports

## 📱 Mobile Optimization

### Responsive Design Pattern

**Mobile First Approach**
```tsx
// Base styles for mobile
// Then add md: and lg: prefixes for larger screens
className="px-4 md:px-6 lg:px-8 text-sm md:text-base lg:text-lg"
```

**Common Breakpoints**
```
Mobile:  (default, < 640px)
Tablet:  md: (640px - 1024px)
Desktop: lg: (1024px+)
```

### Touch-Friendly UI

**Minimum Touch Target Size**
```tsx
className="min-h-[44px] min-w-[44px]"  // WCAG AA standard
```
All interactive elements must be at least 44x44 pixels for touch.

**Touch Feedback**
```tsx
whileTap={{ scale: 0.95 }}  // Visual feedback when tapped
```

**Mobile Text Sizes**
```
Mobile:   text-sm   (14px)
Tablet:   text-base (16px)
Desktop:  text-lg   (18px+)
```

### Responsive Grid Layouts

```tsx
// Single column on mobile, scales up
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"

// Or use flex for more control
className="flex flex-col md:flex-row gap-4"
```

### Mobile Navigation

**Hamburger Menu Pattern**
```tsx
// Hide on mobile, show menu button
className="hidden md:flex"  // Hidden on mobile

// Show menu button on mobile
className="md:hidden"  // Only visible on mobile
```

## ♿ Accessibility Guidelines

### ARIA Labels

**All Interactive Elements**
```tsx
<button aria-label="Close modal">
  <X className="w-5 h-5" />
</button>
```

**Form Labels**
```tsx
<label htmlFor="task-input">Task Name</label>
<input id="task-input" type="text" />
```

### Semantic HTML

**Use Semantic Elements**
```tsx
// Good
<header><nav>...</nav></header>
<main>...</main>
<button onClick={handleClick}>Click</button>

// Avoid
<div onClick={handleClick}>Click</div>  // Not semantic
```

**Heading Hierarchy**
```tsx
<h1>Main Title</h1>        // Only one per page
<h2>Section Title</h2>     // Major sections
<h3>Subsection</h3>        // Subsections
<p>Body text</p>           // Paragraphs for content
```

### Keyboard Navigation

**Focus States**
```tsx
className="focus:outline-none focus:ring-2 focus:ring-[#ccff00]"
```

**Tab Order**
- Natural tab order in DOM (left to right, top to bottom)
- Use `tabIndex={-1}` for elements that shouldn't be tabbed
- Avoid `tabIndex > 0` (disrupts natural order)

### Color Contrast

**Text Contrast Ratio** (WCAG AA)
- Normal text: 4.5:1 minimum
- Large text (18pt+): 3:1 minimum

**Current Implementation**
- Dark text (#333-#888) on light backgrounds ✅
- White text on dark backgrounds ✅
- Lime accent (#ccff00) with opacity used for decorative borders ✅

## 🔧 Component Patterns

### Project Cards

**Standard Card Structure**
```tsx
<motion.div
  className="rounded-2xl bg-black/40 border border-[#ccff00]/20 backdrop-blur-md p-6 hover:border-[#ccff00]/40 transition-colors"
  variants={cardVariants}
>
  {/* Card content */}
</motion.div>
```

### Modal Dialogs

**Modal Container**
```tsx
<motion.div
  className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50"
  onClick={onClose}  // Close on backdrop click
>
  <motion.div
    className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
    onClick={(e) => e.stopPropagation()}  // Prevent backdrop click
  >
    {/* Modal content */}
  </motion.div>
</motion.div>
```

### List Items with Search/Filter

**Implementation Pattern**
```tsx
const [searchQuery, setSearchQuery] = useState('');
const [filter, setFilter] = useState('all');

const filteredItems = useMemo(() => {
  return items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || item.category === filter;
    return matchesSearch && matchesFilter;
  });
}, [items, searchQuery, filter]);
```

## 🚀 Development Workflow

### File Organization

**Component Structure**
```
components/
├── ComponentName.tsx      // Component file
├── useComponentHook.ts    // Custom hooks
└── types.ts              // TypeScript types
```

**Keep Components Focused**
- One main component per file
- Extract sub-components to separate files if reusable
- Co-locate hooks and types with their component

### Naming Conventions

**Components** - PascalCase
```tsx
export const ProjectBoard = memo(function ProjectBoard(props) { ... });
export const RecipeCard = memo(function RecipeCard(props) { ... });
```

**Hooks** - camelCase with 'use' prefix
```tsx
const useTaskFiltering = (tasks) => { ... };
const useScrollDetection = () => { ... };
```

**Variables & Functions** - camelCase
```tsx
const handleTaskDelete = useCallback((id) => { ... }, []);
const filteredTasks = useMemo(() => { ... }, [tasks]);
```

**Constants** - UPPER_SNAKE_CASE
```tsx
const MAX_TASK_TITLE_LENGTH = 100;
const ANIMATION_DURATION_MS = 300;
```

### Code Style

**Use TypeScript Interfaces**
```tsx
interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'todo' | 'in-progress' | 'review' | 'done';
}
```

**Avoid `any`**
- Use proper types for type safety
- Use `unknown` if type is truly unknown
- Use generics for flexible components

**Props Destructuring**
```tsx
export const TaskCard = memo(function TaskCard({ 
  id, 
  title, 
  priority, 
  onDelete 
}: TaskCardProps) {
  // Component code
});
```

## 📚 Documentation Standards

**Component Comments**
```tsx
/**
 * ProjectBoard - Interactive Kanban task management
 * @param {ProjectBoardProps} props
 * - tasks: Task array to manage
 * - onUpdate: Callback when tasks change
 * @example
 * <ProjectBoard tasks={tasks} onUpdate={setTasks} />
 */
export const ProjectBoard = memo(function ProjectBoard({ ... }) {
```

**Complex Logic Comments**
```tsx
// Filter tasks by status and then sort by priority
const getTasksByStatus = useCallback((status: string) => {
  return tasks
    .filter(t => t.status === status)
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}, [tasks]);
```

## 🎯 Best Practices Summary

✅ Use React.memo for components that don't change often
✅ Use useCallback for callbacks passed to memoized children
✅ Use useMemo for expensive computations
✅ Apply Sora font globally to all components
✅ Use responsive breakpoints (sm:, md:, lg:)
✅ Ensure minimum 44px touch targets on mobile
✅ Use passive scroll listeners for performance
✅ Lazy load images below the fold
✅ Use semantic HTML for accessibility
✅ Add ARIA labels to interactive elements
✅ Test keyboard navigation (Tab, Enter, Escape)
✅ Maintain consistent color scheme (dark + lime accents)
✅ Use spring animations for natural motion
✅ Keep animations under 300ms for responsiveness
✅ Document complex components and hooks
