# GD Goenka Public School Website - Design Guidelines

## Design Approach: Vibrant, Modern & 3D-Enhanced

**Primary References**: Modern educational platforms with vibrant aesthetics, 3D-enhanced university websites, and engaging learning platforms that balance professionalism with visual excitement.

**Design Philosophy**: Vibrant visual energy meets educational excellence. The design creates an immersive, engaging experience for Pre-Primary to Grade 12 students, while maintaining the trust and confidence expected by parents and educators.

---

## Core Design Elements

### A. Vibrant Color Palette

**Light Mode:**
- Primary: 215 95% 50% (Vibrant Academic Blue - energy, knowledge, trust)
- Secondary: 142 75% 48% (Success Green - growth, achievement, vitality)
- Accent: 38 98% 55% (Energetic Gold - excellence, awards, celebration)
- Chart-1: 280 75% 60% (Purple - creativity for younger grades)
- Chart-2: 340 82% 52% (Pink/Magenta - art and culture)
- Chart-3: 38 98% 55% (Gold - awards and rankings)
- Background: 210 30% 98% (Soft white with slight blue tint)
- Surface: 0 0% 100% (Pure white cards)
- Text Primary: 215 25% 12%
- Text Secondary: 215 15% 40%
- Text Tertiary: 215 10% 60%

**Dark Mode:**
- Primary: 215 85% 60%
- Secondary: 142 65% 55%
- Accent: 38 95% 60%
- Background: 215 35% 10%
- Surface: 215 28% 15%
- Text Primary: 210 20% 98%
- Text Secondary: 210 15% 75%
- Text Tertiary: 210 10% 60%

**Gradient Usage**:
- Hero backgrounds: from-primary to-chart-2
- Stats sections: from-primary via-secondary to-chart-2
- CTA buttons: from-primary to-chart-1
- Achievement badges: from-accent to-chart-3

### B. Typography

**Font Families** (Google Fonts):
- Headlines: 'Inter' - Weight 700-800 for impact
- Body: 'Inter' - Weight 400-500 for readability
- Stats/Accent: 'Space Grotesk' - Weight 600 for counters and highlights
- Younger Grades (Pre-Primary): Slightly rounder, friendlier presentation

**Scale**:
- Hero Headline: text-5xl md:text-7xl
- Section Headers: text-3xl md:text-5xl
- Subsections: text-2xl md:text-3xl
- Body Large: text-lg md:text-xl
- Body: text-base
- Small: text-sm

### C. 3D Integration

**3D Libraries**:
- Primary: Three.js for complex 3D scenes
- Alternative: Spline for design-focused 3D elements
- Animations: Lottie for lightweight 3D animations

**3D Elements**:
1. **Hero Section**: 3D rotating school building model (optional background)
2. **Key Features**: 3D icons that tilt/rotate on hover
3. **Activities Section**: 3D playground, sports equipment, lab models
4. **Interactive Buttons**: 3D depth effect on hover
5. **Stats Counters**: 3D animated number reveals
6. **Virtual Tour**: 3D campus map with clickable hotspots

**Performance Optimization**:
- Lazy load 3D models below fold
- Use compressed 3D assets
- Implement loading states for 3D elements
- Fallback to 2D on low-performance devices

### D. Layout System

**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Section padding: py-16 md:py-24
- Component gaps: gap-6 md:gap-8
- Card padding: p-6 md:p-8
- Container: max-w-7xl mx-auto px-4

**Grid System**:
- Hero: Full width with max-w-7xl inner container
- Features: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Events/News: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Gallery: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Stats: grid-cols-2 md:grid-cols-4

---

## Component Library & Section Design

### 1. Top Header (Sticky)
- Height: h-16, backdrop blur with vibrant primary background
- Left: School logo + "GD Goenka Public School" + tagline
- Top bar: Contact info, Admissions, Careers, ERP Login
- Right: Language toggle (EN/HI), Theme toggle, Search
- Background: Vibrant with transparency

### 2. Navigation Menu
- Desktop: Horizontal with animated underline (primary color)
- Mobile: Full-screen overlay with smooth animations
- Active state: Primary gradient text + 3D depth effect
- Pages: Home, About, Academics, Admissions, Activities, Events, Gallery, Achievements, Contact

### 3. Hero Section (3D-Enhanced Full-width Slider)
- Height: h-screen max-h-[800px]
- Background: 3D rotating school building (subtle, background)
- Overlay: Gradient for text readability
- Content: Centered, max-w-4xl
  - Tagline: text-6xl md:text-7xl font-bold with gradient
  - Subtext: text-xl md:text-2xl mt-4
  - CTA Buttons: Large with gradient backgrounds and 3D hover effects
- Navigation: Animated dots, auto-play 5s

### 4. Scrolling Notices/Marquee
- Vibrant gradient background (from-primary/15 to-chart-2/15)
- Smooth infinite scroll animation
- Icons: Bell (urgent), Info (general) in vibrant colors
- Hover effect: Scale and glow

### 5. Principal's Desk
- Layout: Two columns (lg:grid-cols-2)
- Left: Photo with 3D frame effect (shadow-2xl)
- Right: Welcome message, name, title
- 3D Quote marks decoration (primary gradient)

### 6. Welcome/About Section
- Gradient headline text (from-primary via-chart-1 to-chart-2)
- 3D animated icon elements
- Breathing room: py-20
- Smooth scroll-triggered animations

### 7. Key Features (3D-Enhanced Cards)
- Cards: Vibrant borders, 3D tilt on hover
- Icons: 3D animated (rotate, bounce on hover)
- Each card: Gradient accent border, shadow-xl hover:shadow-2xl
- Transform: 3D perspective on hover
- Icons: Academic, Sports, Infrastructure, Faculty, Activities

### 8. Student/Alumni Spotlight
- 3D card carousel with depth
- Photo with gradient overlay
- Achievement badges with 3D pop effect
- Quote with animated reveal

### 9. Achievements/News Section
- 3D card grid with hover lift
- Category badges: Vibrant gradient pills
- Image with 3D depth on hover
- Animated date badges

### 10. Upcoming Events (3D Timeline)
- 3D interactive timeline or calendar view
- Event cards: 3D depth with vibrant accent borders
- Date bubble: 3D circular badge with primary gradient
- Hover: Card lifts with shadow

### 11. Virtual Campus Tour (3D Interactive)
- Full-width with gradient background
- 3D preview thumbnail with play overlay
- Modal: Embedded 360° tour or 3D campus map
- Interactive hotspots for different areas

### 12. Activities Section (3D Models)
- 3D playground model for sports
- 3D lab equipment for STEM
- 3D stage for arts & cultural
- Interactive 3D cards for each activity

### 13. Stats Counter (3D Animated)
- Gradient background (from-primary to-chart-2)
- 3D animated counters (pop and reveal)
- Icons with 3D depth
- Smooth count-up animation

### 14. Academics (3D Curriculum Timeline)
- 3D animated timeline from Pre-Primary to Grade 12
- 3D subject cards (Science, Commerce, Arts)
- Interactive 3D stream selection
- Special programs with 3D icons

### 15. Gallery Preview (3D Grid)
- 3D masonry grid with depth
- Images: 3D zoom on hover
- Categories: Animated filter buttons with 3D effect
- Lightbox with 3D transitions

### 16. Testimonials (3D Cards)
- 3D rotating testimonial cards
- Author photo: 3D circular frame
- Star ratings: Animated 3D stars
- Smooth carousel with 3D depth

### 17. Quick Actions/CTA (3D Interactive)
- 3D action cards with vibrant gradients
- Icons with 3D animation on hover
- Transform: Lift and tilt effect
- Gradient borders with glow

### 18. Admissions Page
- 3D step-by-step process illustration
- Interactive 3D progress indicators for forms
- 3D accordion for FAQs
- Fee structure: 3D popup cards

### 19. Contact Section (3D Form)
- 3D form fields with depth
- Interactive 3D map with markers
- Contact cards: 3D hover effects
- Submit button: 3D with gradient

### 20. Footer
- Dark gradient background (from-slate-900 to-slate-950)
- 3D social media icons
- Newsletter signup with 3D button
- Vibrant accent borders

### 21. Global Search (3D Modal)
- 3D modal overlay with depth
- Search results: 3D cards with categories
- Keyboard shortcut indicator
- Smooth 3D transitions

### 22. Accessibility Widget (3D Floating)
- 3D floating button (bottom-right)
- Panel with 3D depth
- Font controls, contrast toggle
- Language switcher (EN/HI)

### 23. Multilingual Support
- Language toggle in header (EN/HI)
- Smooth content switching
- RTL support ready (for future languages)
- Localized date/time formats

---

## Animation & Interaction

**Scroll-triggered animations**:
- Fade-in with slide-up (opacity-0 translate-y-8 to opacity-100 translate-y-0)
- 3D element reveals (scale-95 to scale-100 with rotation)
- Counter animations on stats section
- Parallax effects on hero section

**Hover interactions**:
- 3D tilt and lift effects (transform: perspective(1000px) rotateX(5deg))
- Gradient border glow
- Icon bounce and rotate
- Card depth increase (shadow-lg to shadow-2xl)

**Page transitions**:
- Smooth fade with 3D depth
- Loading states for 3D models
- Skeleton screens with shimmer

**Button animations**:
- 3D press effect on click
- Gradient shift on hover
- Ripple effect from click point
- Loading spinner for async actions

---

## Images & Assets

**Hero Section**: 
- Large vibrant campus/student images (1920x800px)
- 3D school building model (optimized .gltf or .glb)
- Gradient overlays for text

**Principal's Desk**: 
- Professional portrait (800x800px)
- 3D frame effects

**Activities**: 
- 3D models for playground, labs, stage
- Sports equipment 3D icons
- Art and cultural 3D elements

**Gallery**: 
- Vibrant event photos (500x500px)
- 3D hover effects and transitions

**3D Assets**:
- School building exterior model
- Classroom interior models
- Sports facilities 3D representations
- Lab equipment 3D icons

---

## Performance & Optimization

**3D Model Loading**:
- Lazy load models below fold
- Progressive enhancement (2D fallback)
- Compressed .glb format
- Loading states with progress

**Image Optimization**:
- WebP format with fallbacks
- Responsive images (srcset)
- Lazy loading below fold
- Compressed vibrant images

**Code Splitting**:
- Route-based code splitting
- Lazy load 3D libraries
- Dynamic imports for heavy components

---

## Accessibility

**Visual**:
- High contrast ratios (WCAG AAA)
- Vibrant colors with sufficient contrast
- Alt text for all images
- 3D elements don't rely on motion

**Interaction**:
- Keyboard navigation for all elements
- Focus indicators (vibrant primary ring)
- Skip to content links
- Reduced motion option (disables 3D)

**Language**:
- Bilingual support (EN/HI)
- Clear language toggle
- Screen reader friendly
- Semantic HTML structure

---

This design creates an immersive, vibrant, and engaging educational website that balances modern 3D aesthetics with accessibility and performance, catering to students from Pre-Primary to Grade 12 while maintaining trust with parents and educators.
