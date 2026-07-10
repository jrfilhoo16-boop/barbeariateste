---
name: Aurelian SaaS
colors:
  surface: '#111415'
  surface-dim: '#111415'
  surface-bright: '#373a3b'
  surface-container-lowest: '#0c0f10'
  surface-container-low: '#191c1d'
  surface-container: '#1d2021'
  surface-container-high: '#282a2b'
  surface-container-highest: '#323536'
  on-surface: '#e1e3e4'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e1e3e4'
  inverse-on-surface: '#2e3132'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#c8c6c7'
  on-secondary: '#303031'
  secondary-container: '#49494a'
  on-secondary-container: '#bab8b9'
  tertiary: '#cecece'
  on-tertiary: '#303030'
  tertiary-container: '#b3b3b3'
  on-tertiary-container: '#454545'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#e5e2e3'
  secondary-fixed-dim: '#c8c6c7'
  on-secondary-fixed: '#1b1b1c'
  on-secondary-fixed-variant: '#474647'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1b1b1b'
  on-tertiary-fixed-variant: '#474747'
  background: '#111415'
  on-background: '#e1e3e4'
  surface-variant: '#323536'
typography:
  display-lg:
    fontFamily: Poppins
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Poppins
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Poppins
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Poppins
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Poppins
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1440px
  gutter: 24px
  sidebar-width: 280px
  margin-desktop: 40px
---

## Brand & Style
The design system is engineered for a premium grooming-as-a-service experience. It targets high-end barbershops and luxury salons that require the precision of a modern SaaS platform with the prestige of a heritage brand.

The aesthetic fuses **Modern Minimalism** with **Glassmorphism** and **Corporate/Modern** reliability. It draws inspiration from industry leaders like Stripe and Linear, utilizing high-contrast typography, expansive whitespace, and meticulous attention to micro-details. The emotional response is one of total confidence, exclusivity, and technological sophistication. High-end hardware-like surfaces are used to make the software feel like a physical tool in a professional environment.

## Colors
This design system utilizes a deep "Obsidian" dark mode as its default state to evoke a premium nighttime or luxury lounge atmosphere.

- **Primary (Gold):** Used sparingly for high-intent actions, active states, and premium indicators. It represents the "gold standard" of service.
- **Secondary (Graphite):** The workhorse color for surfaces, cards, and sidebar backgrounds. It provides a softer alternative to pure black.
- **Neutral (Off-White):** Used for primary text and icons to ensure maximum readability against dark backgrounds.
- **Accents:** Use subtle gradients of Graphite to Black for depth, and 10% opacity Gold for hover states on interactive elements.

## Typography
The system utilizes **Poppins** for all primary communication to maintain a friendly yet geometric and modern feel. For technical data and UI labels, **Geist** is introduced to provide a high-performance, developer-centric legibility that aligns with the SaaS aesthetic.

Key principles:
- **Tight Kerning:** Large headlines should use negative letter spacing to feel more "locked-in" and editorial.
- **Contrast:** High contrast between primary headers (White) and secondary body text (60% Opacity White).
- **Scale:** Use the display-lg size for dashboard overviews and welcome screens to create an immediate sense of scale and luxury.

## Layout & Spacing
The system employs a **Fixed Grid** philosophy for desktop layouts. Content is centered within a 1440px container, while the sidebar remains fixed to the viewport.

- **The 8px Grid:** All margins and paddings are multiples of 8px to ensure mathematical harmony.
- **Sidebar:** A sleek, 280px Graphite sidebar with 1px border-right (#2D2D2E) separation.
- **Content Sections:** Use wide gutters (24px) between dashboard widgets to emphasize the "Linear-style" modularity. 
- **Information Density:** Maintain high density in data tables, but provide generous vertical breathing room in booking forms and user profiles.

## Elevation & Depth
Depth is created through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows.

- **Level 0 (Background):** Pure black (#000000).
- **Level 1 (Cards/Sidebar):** Graphite (#1A1A1B) with a subtle 1px border (#2D2D2E).
- **Level 2 (Popovers/Modals):** A lighter Graphite (#252526) with a soft 20px blur ambient shadow and a Gold-tinted border at 15% opacity.
- **Inner Glows:** Interactive components use a subtle 1px top-inner-stroke of white at 5% opacity to simulate light hitting the top edge of a physical button.

## Shapes
The system uses a **Rounded** language to soften the industrial nature of the dark palette.

- **Buttons & Inputs:** Standardized at 12px (0.75rem) to feel approachable.
- **Cards & Modals:** Standardized at 16px (1rem) for a more pronounced "SaaS container" feel.
- **Status Chips:** Full pill-shaped rounding for immediate visual distinction from buttons.

## Components

### Buttons
- **Primary:** Gold background with Black text. No shadow, but a slight scale-down (0.98) micro-animation on click.
- **Secondary:** Transparent with a 1px Graphite border. Gold text on hover.
- **Ghost:** No border or background. White text at 60% opacity, moving to 100% on hover.

### Input Fields
- **Default:** Dark Graphite background (#121213) with a subtle #2D2D2E border.
- **Focus State:** The border transitions to Gold (#D4AF37) with a 2px outer glow (ring) of Gold at 20% opacity.
- **Labels:** Use `label-sm` in Geist, positioned strictly above the field.

### Data Tables
- **Header:** Semi-transparent background with `label-md` Geist typography.
- **Rows:** 1px border-bottom separation. Hover state triggers a subtle background lighten to #252526.
- **Action Menu:** "..." (Meatball) icons that reveal a glassmorphic dropdown menu.

### Sleek Sidebar
- **Active State:** A vertical Gold bar (2px wide) on the far left of the active menu item.
- **Icons:** Thin-stroke (2pt) icons in Gold or White.

### High-Fidelity Cards
- **Header:** Clear separation using a 1px border-bottom.
- **Footer:** Use for primary card actions, right-aligned.
- **Content:** Aggressive whitespace (32px padding) to make the data feel premium.