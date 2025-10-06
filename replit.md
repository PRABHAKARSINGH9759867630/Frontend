# GD Goenka Public School Website

## Project Overview

A modern, fully responsive, vibrant school website for GD Goenka Public School (Pre-Primary to Grade 12). The website features dynamic content, smooth animations, interactive elements, and supports multiple languages (English/Hindi).

**Live URL**: https://[your-replit-url].replit.app

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion for animations
- **UI Components**: Shadcn/UI, Radix UI primitives
- **3D Graphics**: Three.js (installed, ready for integration)
- **Routing**: Wouter
- **State Management**: React Context API
- **Backend**: Express.js (minimal, for future API endpoints)
- **Database**: PostgreSQL (Neon) - available but not currently used

## Project Structure

```
client/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Header.tsx        # Main navigation with language toggle
│   │   ├── Footer.tsx        # Site footer
│   │   ├── ThemeProvider.tsx # Dark/Light mode context
│   │   ├── HeroSlider.tsx    # Homepage hero carousel
│   │   ├── PrincipalMessage.tsx
│   │   ├── KeyFeatures.tsx
│   │   ├── StudentSpotlight.tsx
│   │   ├── NewsSection.tsx
│   │   ├── EventsPreview.tsx
│   │   ├── VirtualTourSection.tsx
│   │   ├── StatsCounter.tsx
│   │   ├── Testimonials.tsx
│   │   ├── GalleryPreview.tsx
│   │   ├── ContactSection.tsx
│   │   ├── SearchModal.tsx
│   │   ├── AccessibilityWidget.tsx
│   │   └── ui/               # Shadcn UI primitives
│   ├── contexts/
│   │   └── LanguageContext.tsx  # Multilingual support
│   ├── pages/
│   │   ├── Home.tsx          # Homepage with all sections
│   │   ├── About.tsx         # Mission, vision, faculty
│   │   ├── Academics.tsx     # Curriculum, streams, programs
│   │   ├── Admissions.tsx    # Admission process, form
│   │   ├── Activities.tsx    # Clubs, sports, cultural
│   │   ├── Events.tsx        # School events calendar
│   │   ├── Gallery.tsx       # Photo and video gallery
│   │   ├── Achievements.tsx  # Student/teacher achievements
│   │   └── Contact.tsx       # Contact form and details
│   ├── App.tsx               # Main app with routing
│   └── index.css             # Global styles, theme colors
├── attached_assets/
│   └── generated_images/     # AI-generated school images
└── index.html

server/
├── index.ts                  # Express server
└── routes.ts                 # API routes (placeholder)

design_guidelines.md          # Comprehensive design system
```

## Features Implemented

### Core Features
- ✅ **Responsive Design**: Mobile-first, works on all devices
- ✅ **Dark/Light Mode**: Theme toggle with persistent preference
- ✅ **Multilingual Support**: English/Hindi language toggle
- ✅ **Vibrant Color Scheme**: Educational palette with gradients
- ✅ **Smooth Animations**: Framer Motion transitions and effects
- ✅ **Accessibility**: ARIA labels, keyboard navigation, contrast ratios

### Pages
1. **Home** - Comprehensive landing page with:
   - Hero slider with CTAs
   - Scrolling notices/announcements
   - Principal's message
   - Key features showcase
   - Student spotlight carousel
   - Latest news
   - Upcoming events
   - Virtual tour section
   - Stats counter with animations
   - Affiliations
   - Photo gallery preview
   - Testimonials
   - Quick action links
   - Contact section

2. **About Us**
   - Mission & Vision cards
   - Core values
   - School history timeline
   - Infrastructure facilities
   - Expert faculty profiles
   - Accreditations & affiliations

3. **Academics**
   - Curriculum overview (Pre-Primary to Grade 12)
   - Senior Secondary streams (Science, Commerce, Humanities)
   - Special programs (STEM, Arts, Sports, etc.)
   - Academic achievements stats

4. **Admissions**
   - 4-step admission process
   - Online application form
   - FAQs accordion
   - Document requirements

5. **Activities**
   - Clubs & societies
   - Sports facilities showcase
   - Cultural programs
   - Co-curricular activities

6. **Events**
   - Upcoming events calendar
   - Past events highlights
   - Event categories and filters

7. **Gallery**
   - Photo gallery with category filters
   - Video gallery
   - Interactive hover effects

8. **Achievements**
   - Student achievements
   - Teacher recognition
   - School rankings
   - Track record statistics

9. **Contact**
   - Contact form
   - Location details
   - Phone and email
   - Map integration ready

### UI Components

All components follow the design system in `design_guidelines.md`:

- **Interactive Elements**: Hover effects, active states, 3D-ready
- **Color System**: Primary (vibrant blue), Secondary (green), Accent (gold)
- **Typography**: Inter for body, Space Grotesk for accents
- **Animations**: Scroll-triggered reveals, hover lifts, smooth transitions
- **Data Display**: Cards, badges, stats counters, timelines

### Multilingual Support

The website supports English and Hindi through a translation context:
- Language toggle in header
- Translations for navigation and UI elements
- Persistent language preference in localStorage
- Easy to extend with more languages

## Design System

### Color Palette

**Light Mode:**
- Primary: `215 95% 50%` (Vibrant Academic Blue)
- Chart-2: `142 75% 48%` (Success Green)
- Accent: `38 98% 55%` (Energetic Gold)
- Additional charts for various elements

**Dark Mode:**
- Automatically adjusted for optimal contrast
- Same color palette with appropriate lightness values

### Key Design Principles

1. **Vibrant & Professional**: Balance energy with credibility
2. **Consistent Spacing**: 4, 6, 8, 12, 16, 20, 24px system
3. **Smooth Animations**: Purposeful, not decorative
4. **Accessibility First**: WCAG AAA compliance
5. **Mobile-First**: Responsive from 320px to 4K

## Getting Started

### Development

```bash
npm run dev
```

The application runs on port 5000 with:
- Frontend: Vite dev server with HMR
- Backend: Express server
- Auto-reload on file changes

### Environment Variables

Required secrets (managed by Replit):
- `DATABASE_URL` - PostgreSQL connection (available but not used)
- `SESSION_SECRET` - For future auth implementation

### Adding New Pages

1. Create page component in `client/src/pages/`
2. Add route in `client/src/App.tsx`
3. Update navigation in `client/src/components/Header.tsx`
4. Add translations in `client/src/contexts/LanguageContext.tsx`

### Extending Translations

Add new translation keys in `LanguageContext.tsx`:

```typescript
const translations: Record<Language, Record<string, string>> = {
  en: { "key": "English text" },
  hi: { "key": "Hindi text" }
};
```

Use in components: `{t("key")}`

## 3D Integration (Ready)

Three.js is installed and ready for:
- 3D rotating school building model
- Interactive campus map
- 3D icons and elements
- Animated 3D backgrounds

To add 3D elements, import Three.js in components and create scenes.

## Future Enhancements

### Planned Features
- [ ] CMS integration (Strapi/Contentful) for dynamic content
- [ ] Full 3D campus tour with interactive hotspots
- [ ] Student/Parent portal with authentication
- [ ] Online fee payment integration
- [ ] Live chat support
- [ ] Push notifications for announcements
- [ ] Advanced search functionality
- [ ] Blog/News CMS
- [ ] Alumni portal
- [ ] E-learning integration

### Technical Improvements
- [ ] Add more comprehensive translations
- [ ] Implement server-side rendering (SSR)
- [ ] Add Progressive Web App (PWA) features
- [ ] Optimize images with WebP
- [ ] Implement lazy loading for all images
- [ ] Add analytics integration
- [ ] SEO optimization with meta tags
- [ ] Performance monitoring

## Testing

The website has been designed with testability in mind:
- All interactive elements have `data-testid` attributes
- Semantic HTML for accessibility testing
- Component-based architecture for unit testing
- Ready for E2E testing with Playwright

## Deployment

The website is deployment-ready for:
- **Replit**: Already configured
- **Vercel**: Add `vercel.json` config
- **Netlify**: Works out of the box
- **Custom Server**: Node.js with Express

## Support & Maintenance

### Common Tasks

**Update School Information**:
- Edit content in respective page components
- Update images in `attached_assets/`
- Modify colors in `client/src/index.css`

**Add New Language**:
- Add language code to `Language` type
- Add translations in `LanguageContext.tsx`
- Update language selector in Header

**Customize Theme**:
- Modify CSS variables in `index.css`
- Follow design guidelines in `design_guidelines.md`
- Maintain color contrast ratios

## Credits

- **Design System**: Custom educational design
- **UI Framework**: Shadcn/UI
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Inter, Space Grotesk)
- **Images**: AI-generated educational imagery

## License

Proprietary - GD Goenka Public School

---

**Last Updated**: October 2025
**Version**: 1.0.0
**Maintainer**: Development Team
