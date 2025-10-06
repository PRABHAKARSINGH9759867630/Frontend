# Modern School Website - Design Guidelines

## Design Approach: Reference-Based + Educational Excellence

**Primary References**: Modern university websites (MIT, Stanford), educational platforms (Khan Academy, Coursera), and professional service sites (McKinsey, Deloitte) for trust-building elements.

**Design Philosophy**: Professional credibility meets approachable warmth. The design should inspire confidence in parents while exciting students about learning.

---

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Primary: 215 85% 25% (Deep academic blue - trust, knowledge)
- Secondary: 142 70% 45% (Success green - growth, achievement)
- Accent: 38 95% 50% (Warm gold - excellence, awards) - Used sparingly for achievement badges only
- Background: 210 20% 98% (Soft white)
- Surface: 0 0% 100% (Pure white cards)
- Text Primary: 215 25% 15%
- Text Secondary: 215 15% 45%

**Dark Mode:**
- Primary: 215 60% 55%
- Secondary: 142 50% 55%
- Background: 215 30% 8%
- Surface: 215 25% 12%
- Text Primary: 210 20% 95%
- Text Secondary: 210 15% 70%

### B. Typography

**Font Families** (Google Fonts):
- Headlines: 'Inter' - Weight 700-800 for impact
- Body: 'Inter' - Weight 400-500 for readability
- Accent/Stats: 'Space Grotesk' - Weight 600 for counters and highlights

**Scale**:
- Hero Headline: text-5xl md:text-7xl
- Section Headers: text-3xl md:text-5xl
- Subsections: text-2xl md:text-3xl
- Body Large: text-lg
- Body: text-base
- Small: text-sm

### C. Layout System

**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Section padding: py-16 md:py-24
- Component gaps: gap-6 md:gap-8
- Card padding: p-6 md:p-8
- Container: max-w-7xl mx-auto px-4

**Grid System**:
- Hero: Full width with max-w-7xl inner container
- Features: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Events/News: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Testimonials: Single column centered, max-w-4xl
- Stats: grid-cols-2 md:grid-cols-4

---

## Component Library & Section Design

### 1. Top Header (Sticky)
- Height: h-16, semi-transparent backdrop blur on scroll
- Left: School logo (h-10) + Name (text-lg font-semibold)
- Right: Quick links (Admissions, Careers, ERP Login) + Theme toggle
- Background: White/dark surface with shadow-sm

### 2. Navigation Menu
- Desktop: Horizontal with hover underline animation (border-b-2 transition)
- Mobile: Full-screen overlay with staggered fade-in items
- Active state: Primary color text + underline

### 3. Hero Section (Full-width Slider)
- Height: h-screen max-h-[800px]
- Overlay: gradient from transparent to dark (for text readability)
- Content: Centered, max-w-4xl
  - Tagline: text-6xl md:text-7xl font-bold
  - Subtext: text-xl md:text-2xl mt-4
  - CTA Buttons: Large (py-4 px-8), primary solid + secondary outline with backdrop-blur-sm
- Navigation: Elegant dots at bottom, auto-play 5s intervals

### 4. Scrolling Notices
- Marquee style: py-3 bg-gradient-to-r from-primary/10 to-secondary/10
- Icons: Bell icon for urgent, info circle for general
- Clickable items with hover:underline

### 5. Principal's Desk
- Layout: Two columns (lg:grid-cols-2)
- Left: Professional photo in rounded-2xl frame with subtle shadow-xl
- Right: Welcome message with signature font for name
- Quote marks decoration in primary color (opacity-20, text-6xl)

### 6. Welcome/Intro Section
- Centered layout, max-w-4xl
- Large headline with gradient text (bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent)
- Breathing room: py-20

### 7. Key Features/Why Choose Us
- Cards: Elevated (shadow-lg hover:shadow-2xl transition), rounded-2xl
- Icon area: w-16 h-16 rounded-full bg-primary/10 with primary colored icon
- Each card: p-8, hover:scale-105 transform transition
- Icons from Heroicons: AcademicCapIcon, TrophyIcon, BuildingOfficeIcon, UserGroupIcon, SparklesIcon

### 8. Student/Alumni Spotlight
- Carousel with 3 visible cards (1 on mobile)
- Card design: Photo (aspect-video, rounded-t-2xl) + gradient overlay + achievement text
- Quote in italic with large quote marks

### 9. Achievements/News Section
- Masonry-style grid for visual interest
- Cards: Image + category badge + headline + excerpt + date
- Hover: Lift effect (hover:-translate-y-2)

### 10. Upcoming Events
- Timeline-style on desktop, cards on mobile
- Each event: Date bubble (rounded-full, primary bg) + connecting line + event card
- Event card: rounded-xl, border-l-4 border-primary

### 11. Virtual Campus Tour
- Full-width section with dark background
- Large preview thumbnail with play icon overlay
- Modal opens for 360° tour embed
- Supporting text: "Explore our world-class facilities"

### 12. Blog/Articles Preview
- Large featured article (left) + 2 smaller articles (right, stacked)
- Featured: Large image (aspect-video) + overlay text
- Category tags: Small pills with secondary color

### 13. Stats Counter (School at a Glance)
- Background: Gradient primary to secondary, text-white
- 4 columns: Each with animated counter (text-5xl font-bold) + label below
- Use react-countup for smooth animation on scroll

### 14. Affiliations Bar
- Grayscale logos on light bg, color on dark mode
- Grid: grid-cols-3 md:grid-cols-6 gap-8
- Logos: opacity-60 hover:opacity-100 transition

### 15. Calendar Highlights
- Clean list design with date badges (rounded-lg bg-primary/10)
- Icons for event types (CalendarIcon, BookOpenIcon, etc.)

### 16. Gallery Preview
- 3x3 grid (2x2 on tablet, 1 column mobile)
- Lightbox on click with smooth zoom animation
- Last tile: "View Full Gallery" overlay with arrow

### 17. Testimonials
- Centered cards with large quote marks
- Author photo: Small rounded-full to the left of quote
- Rating stars in gold/accent color
- Carousel with elegant fade transitions

### 18. Quick Links/CTA Blocks
- 2x2 grid of action cards
- Each: Icon + Title + Arrow, hover:bg-primary hover:text-white transition
- Icons: LoginIcon, CreditCardIcon, DocumentDownloadIcon, BriefcaseIcon

### 19. Contact/Location
- Split layout: Form (left) + Map embed (right)
- Form: Clean inputs with focus:ring-primary
- Contact details: Icons + text stack

### 20. Footer
- Three columns: Links, Newsletter signup, Social
- Dark background (bg-slate-900 dark:bg-slate-950)
- Subtle top border with primary color

### 21. Global Search
- Keyboard shortcut: Cmd+K badge in header
- Modal: Full-screen overlay with centered search box
- Results: Categorized (News, Events, Pages) with icons

### 22. Accessibility Widget
- Fixed bottom-right position
- Circular button with AccessibilityIcon
- Panel slides up with font controls, contrast toggle

---

## Images

**Hero Section**: 
- Large, inspiring image of students in classroom/campus (happy, diverse, engaged in learning)
- Dimensions: 1920x800px minimum
- Treatment: Subtle overlay gradient for text readability

**Principal's Desk**: 
- Professional portrait photo (800x800px)
- Background: Blurred office/school setting

**Virtual Tour Thumbnail**: 
- Campus building exterior or modern classroom (1600x900px)

**Student Spotlight**: 
- Student achievement photos (600x400px per card)
- Candid, authentic moments

**Gallery Preview**: 
- Mix of events, facilities, student activities (500x500px)

**News/Blog**: 
- Relevant educational imagery (800x500px)

**Testimonial Authors**: 
- Small circular photos (100x100px)

---

## Interaction & Animation

- Scroll-triggered fade-ins: opacity-0 to opacity-100 with translate-y-4 to translate-y-0
- Hover states: Subtle scale (scale-105) and shadow increases
- Page transitions: Smooth fade (no jarring effects)
- Counter animations: Smooth increment on scroll into view
- Carousel: 300ms ease-in-out transitions

**Critical**: Animations are purposeful, not decorative. Educational institutions need to feel stable and trustworthy.

---

This design balances modern web aesthetics with the gravitas expected of educational institutions, creating an experience that builds trust with parents while inspiring students.