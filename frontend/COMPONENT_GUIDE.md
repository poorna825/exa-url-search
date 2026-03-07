# 🎨 Component Showcase & Usage Guide

## Component Overview

This document provides detailed usage examples for all UI components in the modern AI search interface.

---

## 1. SearchBar

### Features
- Floating sticky positioning
- Keyboard shortcut (/) to focus
- Glassmorphism with backdrop blur
- Animated border on focus
- Loading state indicator

### Props
```typescript
interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}
```

### Usage Example
```tsx
<SearchBar 
  onSearch={(query) => handleSearch(query)} 
  loading={isSearching}
/>
```

### Styling
- Sticky positioning with `top-4`
- Purple accent on focus
- Backdrop blur: `backdrop-blur-xl`
- Rounded corners: `rounded-2xl`

---

## 2. ResultCard

### Features
- Glassmorphic card design
- Platform icon integration
- AI summary highlighting
- Hover lift animation
- External link indicator
- Snippet preview

### Props
```typescript
interface ResultCardProps {
  title: string;
  url: string;
  snippet: string;
  summary: string;
  domain: string;
  index: number;
}
```

### Usage Example
```tsx
<ResultCard
  title="How to Build React Apps"
  url="https://example.com"
  snippet="A comprehensive guide..."
  summary="This article covers..."
  domain="medium.com"
  index={0}
/>
```

### Animations
- Staggered entrance: `delay: index * 0.1`
- Hover lift: `whileHover={{ y: -4 }}`
- Fade in: `initial={{ opacity: 0, y: 20 }}`

---

## 3. InsightPanel

### Features
- AI-themed design
- Search statistics display
- Quality metrics
- Gradient background
- Glassmorphism effect

### Props
```typescript
interface InsightPanelProps {
  query: string;
  resultCount: number;
  domains: string[];
}
```

### Usage Example
```tsx
<InsightPanel
  query="machine learning"
  resultCount={15}
  domains={['youtube', 'github', 'medium']}
/>
```

### Metrics Displayed
- Result count
- Number of platforms searched
- Quality score
- Estimated search time

---

## 4. Sidebar

### Features
- Sticky positioning
- Branding section
- Platform filters container
- Platform selection counter
- Pro tip section

### Props
```typescript
interface SidebarProps {
  availableDomains: Array<{ key: string; url: string; label: string }>;
  selectedDomains: string[];
  onDomainToggle: (domainKey: string) => void;
}
```

### Usage Example
```tsx
<Sidebar
  availableDomains={domains}
  selectedDomains={['youtube', 'reddit']}
  onDomainToggle={(key) => toggleDomain(key)}
/>
```

### Layout
- Width: `w-72` (288px)
- Sticky at: `top-24`
- Background: Glassmorphic dark card

---

## 5. PlatformFilter

### Features
- Toggle button for platforms
- Platform icon display
- Selected state indicator
- Smooth animations
- Hover effects

### Props
```typescript
interface PlatformFilterProps {
  domain: {
    key: string;
    url: string;
    label: string;
  };
  isSelected: boolean;
  onToggle: () => void;
}
```

### Usage Example
```tsx
<PlatformFilter
  domain={{ key: 'youtube', url: 'https://youtube.com', label: 'YouTube' }}
  isSelected={true}
  onToggle={() => handleToggle('youtube')}
/>
```

### Visual States
- **Unselected**: `bg-gray-800/50`
- **Selected**: `bg-purple-500/20` with check mark
- **Hover**: Slides right slightly

---

## 6. PlatformIcon

### Features
- Domain-to-icon mapping
- Color-coded backgrounds
- Consistent sizing
- Fallback icon

### Props
```typescript
interface PlatformIconProps {
  domain: string;
}
```

### Usage Example
```tsx
<PlatformIcon domain="youtube.com" />
```

### Supported Platforms
| Platform | Icon | Color |
|----------|------|-------|
| YouTube | Youtube | Red |
| Twitter | Twitter | Blue |
| GitHub | Github | Gray |
| Reddit | MessageCircle | Orange |
| Medium | FileText | Green |
| TikTok | TrendingUp | Pink |
| Default | FileText | Gray |

---

## 7. LoadingState

### Features
- Animated skeleton cards
- Pulsing elements
- Rotating sparkles
- Realistic loading preview

### Props
None - fully self-contained

### Usage Example
```tsx
{loading && <LoadingState />}
```

### Animation Details
- Skeleton cards: 3 cards with staggered fade-in
- Pulse animation on all skeleton elements
- Rotating Sparkles icon (360° every 2s)
- Spinning Loader2 icon

---

## 8. EmptyState

### Features
- Two display modes (initial/no results)
- Animated welcome message
- Feature highlights
- Keyboard shortcut hint

### Props
```typescript
interface EmptyStateProps {
  hasSearched: boolean;
  query?: string;
}
```

### Usage Examples

**Initial State:**
```tsx
<EmptyState hasSearched={false} />
```

**No Results State:**
```tsx
<EmptyState hasSearched={true} query="machine learning" />
```

### Animations
- Rotating gradient icon
- Scale pulse effect
- Feature cards fade in sequentially

---

## 9. TrendWidget

### Features
- Trending topics display
- Growth indicators
- Last updated timestamp
- Animated topic items

### Props
None - currently displays static trending data

### Usage Example
```tsx
<TrendWidget />
```

### Display Items
- Topic name
- Growth percentage
- Pulsing indicator dot
- Update time

---

## 🎨 Common Styling Patterns

### Glassmorphism Cards
```css
backdrop-blur-xl 
bg-gradient-to-br from-gray-900/90 to-gray-800/90 
border border-gray-700/50 
rounded-xl 
shadow-xl
```

### Gradient Text
```css
bg-gradient-to-r from-purple-400 to-pink-400 
bg-clip-text 
text-transparent
```

### Hover Lift Effect
```tsx
<motion.div
  whileHover={{ y: -4 }}
  className="transition-all"
>
```

### Fade In Animation
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
>
```

---

## 🎯 Animation Timing Guide

| Animation | Duration | Easing |
|-----------|----------|--------|
| Fade In | 200-300ms | ease-out |
| Hover | 150-200ms | ease |
| Page Transition | 300-500ms | ease-in-out |
| Skeleton Pulse | 2000ms | cubic-bezier |
| Icon Rotation | 2000ms | linear |

---

## 🔧 Customization Tips

### Changing Card Spacing
```tsx
// In App.tsx
<div className="space-y-4"> {/* Change 4 to desired spacing */}
```

### Modifying Sidebar Width
```tsx
// In Sidebar.tsx
<aside className="w-72"> {/* Change to w-64, w-80, etc */}
```

### Adjusting Animation Speed
```tsx
// In any component
transition={{ duration: 0.3 }} // Change duration value
```

### Custom Platform Colors
```tsx
// In PlatformIcon.tsx
if (lowerDomain.includes('yourplatform')) {
  return { 
    icon: YourIcon, 
    color: 'text-your-color', 
    bg: 'bg-your-color/10' 
  };
}
```

---

## 📱 Responsive Behavior

### Sidebar
- **Desktop (1024px+)**: Always visible
- **Tablet (768px-1023px)**: Collapsible
- **Mobile (<768px)**: Hidden, accessible via menu

### TrendWidget  
- **XL (1280px+)**: Visible
- **Large (<1280px)**: Hidden

### ResultCards
- **All sizes**: Full width of container
- Padding adjusts based on screen size

---

## ⚡ Performance Optimization

### Best Practices
1. **Use `memo` for static components**
```tsx
export const ResultCard = memo(ResultCardComponent);
```

2. **Lazy load images if added**
```tsx
<img loading="lazy" ... />
```

3. **Debounce search input**
```tsx
const debouncedSearch = debounce(handleSearch, 300);
```

4. **Virtual scrolling for long lists**
```tsx
// Consider react-window for 50+ items
```

---

## 🎓 Accessibility Features

### Implemented
- ✅ Keyboard navigation (Tab, Enter, /)
- ✅ ARIA labels on interactive elements
- ✅ Focus indicators on all inputs
- ✅ Semantic HTML structure
- ✅ Screen reader friendly

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `/` | Focus search bar |
| `Enter` | Submit search |
| `Tab` | Navigate between elements |
| `Esc` | Close modals (future) |

---

## 🧪 Testing Components

### Example Unit Test
```tsx
import { render, screen } from '@testing-library/react';
import { ResultCard } from './ResultCard';

test('renders result card with title', () => {
  render(
    <ResultCard
      title="Test Title"
      url="https://test.com"
      snippet="Test snippet"
      summary="Test summary"
      domain="test.com"
      index={0}
    />
  );
  
  expect(screen.getByText('Test Title')).toBeInTheDocument();
});
```

---

## 📚 Additional Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

---

**Last Updated**: March 2026  
**Version**: 1.0.0
