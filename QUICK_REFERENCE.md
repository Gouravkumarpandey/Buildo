# Neobrutalist Design System - Quick Reference

## 🎨 Color System

```typescript
// Primary Colors
bg-blue-600      // Primary actions
bg-pink-600      // Featured/accent
bg-green-600     // Success
bg-orange-600    // Warning
bg-yellow-400    // Highlight
bg-purple-600    // Premium

// Borders
border-black     // Light mode borders
dark:border-white // Dark mode borders
```

## 🔘 Components Quick Start

### Button
```tsx
<NeoButton variant="primary|secondary|pink|green|orange|outline" size="sm|md|lg">
  Text
</NeoButton>

// With link
<NeoButton variant="primary" href="/page">Link Button</NeoButton>
```

### Card
```tsx
<NeoCard padding="sm|md|lg" shadow="sm|md|lg" bgColor="white|blue|pink|orange|green|gray" hover>
  Content here
</NeoCard>
```

### Input
```tsx
<NeoInput 
  label="Label" 
  type="email"
  placeholder="text"
  error="Error message"
/>

<NeoTextarea label="Message" rows={4} />
```

### Badge
```tsx
<NeoBadge variant="primary|secondary|pink|green|orange|yellow" size="sm|md|lg">
  Text
</NeoBadge>

<NeoTag color="blue|pink|green|orange">Tag</NeoTag>
```

### Decorative Elements
```tsx
<NeoCircle className="w-32 h-32 top-10 right-10" animate />
<NeoSquare className="w-24 h-24 bottom-20 left-5" />
<NeoTriangle className="top-1/3 left-1/4" />
<NeoSticker rotation={-8}>Content</NeoSticker>
```

## 📐 Common Patterns

### Hero Section
```tsx
<section className="py-20 md:py-32 border-b-4 border-black dark:border-white">
  <NeoHero
    title="Large Title"
    subtitle="Badge"
    description="Description text"
    bgColor="blue|white|black|gray"
    cta={{ text: "Button", href: "/" }}
  />
</section>
```

### Feature Grid
```tsx
<section className="py-24 border-b-4 border-black dark:border-white">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {items.map(item => (
      <NeoCard padding="lg" bgColor="white" hover>
        {item.content}
      </NeoCard>
    ))}
  </div>
</section>
```

### Pricing Cards
```tsx
<NeoCard padding="lg" bgColor={isPrimary ? "pink" : "white"} shadow="lg">
  <h3>${plan.price}</h3>
  <p>{plan.description}</p>
  <NeoButton variant={isPrimary ? "secondary" : "primary"} className="w-full">
    {plan.cta}
  </NeoButton>
  <ul className="space-y-2 mt-4">
    {plan.features.map(f => <li key={f}>✓ {f}</li>)}
  </ul>
</NeoCard>
```

### Form
```tsx
<NeoCard padding="lg">
  <form className="space-y-6">
    <NeoInput label="Email" type="email" />
    <NeoInput label="Password" type="password" />
    <NeoButton variant="primary" className="w-full">
      Submit
    </NeoButton>
  </form>
</NeoCard>
```

## 🔤 Typography

```tsx
// Main title
<h1 className="text-6xl font-display font-900">Title</h1>

// Section heading
<h2 className="text-4xl md:text-5xl font-display font-900">Heading</h2>

// Card title
<h3 className="font-display font-800 text-xl">Card Title</h3>

// Body text
<p className="text-lg font-medium">Body text</p>

// Button/Badge text
<button className="font-display font-800 uppercase tracking-widest text-xs">
  BUTTON TEXT
</button>
```

## 🌙 Dark Mode

All components support dark mode automatically:
```tsx
// Light mode (default)
className="bg-white text-black"

// Dark mode
className="bg-white dark:bg-black text-black dark:text-white"
```

## 🎬 Animations

```tsx
// Scroll animations in Tailwind
animate-slide-up      // Fade in from bottom
animate-slide-in-right // Slide in from left
animate-bounce-subtle  // Gentle bounce
```

## 📏 Spacing & Sizing

```typescript
// Use multiples of 4px
py-4  = 16px     // Small padding
py-8  = 32px     // Standard padding
py-12 = 48px     // Large padding
py-24 = 96px     // Extra large (section)

// Gaps
gap-4  = 16px
gap-6  = 24px
gap-8  = 32px
```

## 🎯 Layout Sections

```tsx
// Section with top border
<section className="py-24 px-4 md:px-8 border-t-4 border-black dark:border-white">
  <div className="max-w-6xl mx-auto">
    {/* Content */}
  </div>
</section>

// Section with bottom border
<section className="py-24 px-4 md:px-8 border-b-4 border-black dark:border-white">
  {/* Content */}
</section>
```

## ✅ Checklist When Creating Pages

- [ ] Fixed navbar with `border-b-4`
- [ ] Hero section with `NeoHero` component
- [ ] Sections separated by `border-b-4 border-black dark:border-white`
- [ ] Use `max-w-6xl mx-auto` for content width
- [ ] Grid layouts: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- [ ] Card interactivity with `hover` prop
- [ ] All buttons have `NeoButton` component
- [ ] Forms use `NeoInput` / `NeoTextarea`
- [ ] Dark mode classes for all elements
- [ ] Footer with `border-t-4`

## 🚀 Common Page Structure

```tsx
'use client';

import { NeoButton, NeoCard } from '@/components/Neo';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Navbar */}
      <nav className="border-b-4 border-black dark:border-white fixed top-0 w-full">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">Logo</Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero */}
      <NeoHero title="Title" bgColor="blue" />

      {/* Sections */}
      <section className="py-24 px-4 border-b-4 border-black dark:border-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-900">Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <NeoCard padding="lg">Content</NeoCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black dark:border-white py-12">
        {/* Footer content */}
      </footer>
    </div>
  );
}
```

---

**Quick Links:**
- Full Guide: `/NEOBRUTALIST_DESIGN_GUIDE.md`
- Component Showcase: `/components-showcase`
- Examples: Landing page, Login page
