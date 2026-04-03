# Buildo - Neobrutalist UI Design System

## Overview
This is a comprehensive Neobrutalist UI design system for the Buildo project. The design emphasizes **bold typography**, **strong borders**, **bright colors**, **geometric shapes**, and **high contrast** for a modern, playful yet professional aesthetic.

## Color Palette

### Primary Colors
- **Neo Blue**: `#0066FF` - Primary action color
- **Neo Pink**: `#FF1493` - Accent/secondary action
- **Neo Orange**: `#FF6B35` - Tertiary accent
- **Neo Green**: `#00D084` - Success/positive state
- **Neo Yellow**: `#FFD700` - Warning/highlight
- **Neo Purple**: `#A020F0` - Premium/special

### Neutral Colors
- **Black**: `#000000` - Borders, text (dark)
- **White**: `#FFFFFF` - Background, text (light)
- **Gray**: `#F5F5F5` - Secondary background
- **Dark Gray**: `#1A1A1A` - Dark mode element

## Typography

### Font Families
- **Display**: `Rubik` - Bold headings and labels (weight: 800/900)
- **Body**: `Inter` - Regular text (weight: 400/500/600)
- **Mono**: `JetBrains Mono` - Code blocks

### Font Sizes
- **H1**: 48px, weight 900, letter-spacing -0.02em
- **H2**: 40px, weight 800
- **H3**: 32px, weight 800
- **Body**: 16px, weight 500
- **Button**: 14px, weight 800, UPPERCASE

## Key Design Elements

### 1. Borders & Strokes
- Use **4px solid borders** for main components
- Use **3px borders** for badges and smaller elements
- Use **2px borders** for subtle elements
- Color: Matches text color (black/white depending on mode)

### 2. Border Radius
- **12px** (rounded-neo) - Default border radius
- **16px** (rounded-neo-lg) - Larger components
- **24px** (rounded-neo-xl) - Hero sections
- **0px** (no radius) - Strict rectangular buttons (optional)

### 3. Shadows
- **Shadow-neo-sm**: 3px 3px offset
- **Shadow-neo**: 4px 4px offset
- **Shadow-neo-lg**: 6px 6px offset
- **Shadow-neo-xl**: 8px 8px offset
- All shadows use 25% black opacity

### 4. Spacing
- Use multiples of 4px
- Padding: 16px (standard), 24px (large), 12px (small)
- Gaps between elements: 16px, 24px, 32px

## Core Components

### NeoButton
Bold, rectangular buttons with thick borders.

**Variants:**
- `primary` - Blue background
- `secondary` - White/black background
- `pink` - Pink background
- `green` - Green background
- `orange` - Orange background
- `outline` - Transparent with border

**Sizes:**
- `sm` - 12px text, compact padding
- `md` - 14px text, standard padding
- `lg` - 16px text, generous padding

**Features:**
- Thick 4px borders
- Active state: moves 1px down-right (pressed effect)
- Hover: increases shadow
- UPPERCASE text with wide letter-spacing

### NeoCard
Container component with strong borders.

**Props:**
- `padding`: sm | md | lg
- `shadow`: sm | md | lg
- `bgColor`: white | blue | pink | orange | green | gray
- `hover`: enables hover effect with scale

**Features:**
- Always 4px border
- Optional shadow
- Hover state: scale up slightly + increase shadow
- Color options with text contrast

### NeoInput & NeoTextarea
Form inputs with neobrutalist styling.

**Features:**
- 4px borders
- Bold, monospace labels (optional)
- Error states with red borders
- Focus state: shadow-neo-lg

### NeoBadge
Small, inline emphasis elements.

**Sizes:**
- `sm` - 12px
- `md` - 14px
- `lg` - 16px

### NeoHero
Full-width hero section for landing pages.

**Features:**
- Large bold title (up to 7xl on desktop)
- Subtitle badge
- Description text
- CTA buttons
- Optional decorative shapes
- Background color options

### Decorative Elements
- **NeoCircle** - Hollow circles
- **NeoSquare** - Hollow squares
- **NeoTriangle** - Hollow triangles
- **NeoWavyLine** - Decorative SVG line
- **NeoSticker** - Rotated badge-like element with shadow

## Design Principles

### 1. **Bold & Confident**
- No subtle effects
- Strong, clear visual hierarchy
- High contrast between elements

### 2. **Playful Yet Professional**
- Use geometric decorations sparingly
- Balance rigid rectangles with playful colors
- Maintain readability at all costs

### 3. **Consistency**
- All buttons should have consistent border width
- Use the same border thickness across related components
- Maintain color palette across all pages

### 4. **Interaction Feedback**
- Buttons: slight translate on click (1px down)
- Cards: scale + shadow on hover
- Inputs: shadow glow on focus
- All transitions: 200ms duration

### 5. **Accessibility**
- Ensure 4.5:1 contrast ratio for text
- Large touch targets (44px minimum)
- Clear focus states
- Bold typography for readability

## Layout Patterns

### Hero Section
```
┌─────────────────────────────────────────┐
│                                         │
│        MAIN TITLE IN BLUE              │
│        Subtitle Badge with Border       │
│                                         │
│        Description text here            │
│        [Primary Button] [Secondary]     │
│                                         │
└─────────────────────────────────────────┘
```

### Feature Grid
```
┌──────────┐  ┌──────────┐  ┌──────────┐
│ FEATURE  │  │ FEATURE  │  │ FEATURE  │
│ Icon     │  │ Icon     │  │ Icon     │
│ Content  │  │ Content  │  │ Content  │
└──────────┘  └──────────┘  └──────────┘
```

### Pricing Cards
```
┌─────────────────┐
│ sPECIAL BADGE   │
│ ┌─────────────┐ │
│ │ Plan Name   │ │
│ │ $XX/month   │ │
│ │ Description │ │
│ │ [CTA Button]│ │
│ │ • Feature   │ │
│ │ • Feature   │ │
│ └─────────────┘ │
└─────────────────┘
```

## Dark Mode

All components support both light and dark modes using the `dark:` Tailwind prefix:
- Light: White backgrounds, black text/borders
- Dark: Black backgrounds, white text/borders
- Colors remain consistent across modes

## Animation & Motion

### Transitions
- Default: `200ms cubic-bezier(0.34, 1.56, 0.64, 1)`
- Easing: Spring-like curve for playful feel

### Keyframe Animations
- `bounceNeo` - Vertical bounce
- `float` - Gentle floating motion
- `pulseNeo` - Subtle opacity pulse
- `slideUp` - Entrance animation

## Implementation Notes

### Tailwind Configuration
Extended Tailwind config includes:
- Custom colors in `neo-*` namespace
- Custom border radius in `rounded-neo-*`
- Custom shadows in `shadow-neo-*`
- Custom animations
- Font sizes and weights

### Component Usage
```tsx
import { NeoButton, NeoCard, NeoInput, NeoBadge } from '@/components/Neo';

// Example
<NeoCard padding="lg" shadow="lg" bgColor="white" hover>
  <h3>Hello Neobrutalism!</h3>
  <p>This is a card with a thick border and shadow.</p>
  <NeoButton variant="primary" size="md">
    Click Me
  </NeoButton>
</NeoCard>
```

## Pages Implemented

### ✅ Landing Page
- Hero section with decorative elements
- Features grid
- Pricing section with highlighted plan
- Stats section
- Call-to-action sections
- Footer with social links

### ✅ Login Page
- Neobrutalist form card
- Email/password inputs
- Social login buttons (GitHub, Google)
- Forgot password link
- Sign up link

### 📋 To Implement
- Register page
- Dashboard
- Deployment history
- Repository browser
- Settings page
- Profile page

## Color Usage Guide

| Purpose | Color | Usage |
|---------|-------|-------|
| Primary Actions | Neo Blue | Buttons, links, highlights |
| Important Info | Neo Pink | Badges, alerts, emphasis |
| Success | Neo Green | Confirmations, success states |
| Warning | Neo Yellow | Alerts, warnings |
| Premium/Special | Neo Purple | Premium features, badges |
| Borders | Black/White | All component borders |
| Text | Black/White | Body text, depends on mode |

## Typography Usage

| Element | Font | Weight | Size | Case |
|---------|------|--------|------|------|
| Page Title | Rubik | 900 | 2.5-4rem | Sentence |
| Section Head | Rubik | 800 | 1.5-2.5rem | Sentence |
| Card Title | Rubik | 800 | 1.25rem | Sentence |
| Button | Rubik | 800 | 0.875-1rem | UPPERCASE |
| Badge | Rubik | 800 | 0.75rem | UPPERCASE |
| Body Text | Inter | 500 | 1rem | Sentence |
| Code | JetBrains Mono | 400 | 0.875rem | Mixed |

## Resources

- **Tailwind Config**: `tailwind.config.ts`
- **Global Styles**: `src/app/globals.css`
- **Components**: `src/components/Neo/`
- **Examples**: Landing page, Login page

---

**Last Updated**: April 2024
**Design System Version**: 1.0
**Tailwind Version**: 3.x+
