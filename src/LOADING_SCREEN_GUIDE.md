# Premium Loading Screen Implementation Guide

## Overview

A fully responsive, premium loading transition system has been integrated into your Easework Flow website. The loader automatically detects route changes and displays a smooth, visually appealing loading experience with modern animations.

## Features

✅ **Fully Responsive** - Works seamlessly on mobile, tablet, laptop, and desktop  
✅ **Smooth Animations** - Fade-in/fade-out transitions with premium motion  
✅ **Modern Design** - Dual-ring spinner with pulsing center dot  
✅ **Glassmorphism Effect** - Frosted glass background with blur  
✅ **Theme Aware** - Automatically adapts to light/dark theme  
✅ **Performance Optimized** - Lightweight animations with no lag  
✅ **Accessibility** - Respects prefers-reduced-motion  
✅ **Auto-stopping** - Prevents indefinite loading states (30s timeout)  
✅ **No White Flashes** - Smooth page transitions  

## File Structure

```
src/
├── providers/
│   └── LoadingContext.tsx       # Loading state management & context
├── components/
│   └── LoadingScreen.tsx         # Premium loader UI component
├── hooks/
│   └── useLoadingState.ts        # Hooks for easy usage
└── app/
    └── layout.tsx               # Root layout with provider integration
```

## How It Works

### 1. **Automatic Route Detection**

The loading screen automatically activates when:
- Users navigate between pages/routes
- Navigation bar links are clicked
- Browser back/forward buttons are used

No manual setup needed for basic functionality!

### 2. **Manual Loading Control**

For custom scenarios (API calls, data fetching), use the provided hooks:

```typescript
"use client";

import { useLoadingState, useLoadingWrapper } from "@/hooks/useLoadingState";

// Example 1: Start loading for 2 seconds
export function MyComponent() {
  const { isLoading, startLoading, stopLoading } = useLoadingState();

  const handleClick = () => {
    startLoading();
    setTimeout(stopLoading, 2000);
  };

  return <button onClick={handleClick}>Do Something</button>;
}

// Example 2: Wrap async operations
export function FormComponent() {
  const handleSubmit = useLoadingWrapper(async (formData) => {
    const response = await fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    return response.json();
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(new FormData(e.currentTarget));
    }}>
      {/* form fields */}
    </form>
  );
}
```

## Available Hooks

### `useLoadingState(initialState?, autoStopDelay?)`

Control loading state directly in components.

**Parameters:**
- `initialState` (boolean, optional) - Start loading immediately if true
- `autoStopDelay` (number, optional) - Auto-stop after specified milliseconds

**Returns:**
```typescript
{
  isLoading: boolean;           // Current loading state
  setIsLoading: (bool) => void; // Manually set state
  startLoading: () => void;     // Show loader
  stopLoading: () => void;      // Hide loader
}
```

**Example:**
```typescript
const { startLoading, stopLoading } = useLoadingState();

const fetchData = async () => {
  startLoading();
  try {
    const response = await fetch("/api/data");
    return response.json();
  } finally {
    stopLoading();
  }
};
```

### `useLoadingWrapper<T, R>(callback)`

Automatically manage loading state for async functions.

**Parameters:**
- `callback` - Async function to wrap

**Returns:**
- Wrapped async function that shows/hides loader automatically

**Example:**
```typescript
const submitForm = useLoadingWrapper(async (data) => {
  const response = await fetch("/api/form", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
});

// Use it like normal
await submitForm({ name: "John" });
// Loading screen shows during fetch, hides after completion
```

## Customization

### Change Loading Text

Edit [LoadingScreen.tsx](../../components/LoadingScreen.tsx#L100):

```typescript
// Current: "Loading Experience"
<motion.p ...>
  Loading Experience  // ← Change this
</motion.p>
```

### Adjust Animation Speed

Modify animation durations in [LoadingScreen.tsx](../../components/LoadingScreen.tsx):

```typescript
// Outer ring rotation (default: 2s)
animate={{ rotate: 360 }}
transition={{
  duration: 2,  // ← Adjust here (lower = faster)
  repeat: Infinity,
}}

// Pulsing animation (default: 3s)
animate={{ y: [0, -8, 0] }}
transition={{
  duration: 3,  // ← Adjust here
  repeat: Infinity,
}}
```

### Change Colors

The loader automatically uses your theme colors. To customize:

**Light Theme Color:**
```typescript
// In LoadingScreen.tsx
color: isDark ? "#0ea5e9" : "#3b82f6",  // ← Change "#3b82f6"
```

**Dark Theme Color:**
```typescript
color: isDark ? "#0ea5e9" : "#3b82f6",  // ← Change "#0ea5e9"
```

### Modify Auto-Stop Timeout

Edit [LoadingContext.tsx](../../providers/LoadingContext.tsx#L26):

```typescript
const timeout = setTimeout(() => {
  setIsLoading(false);
}, 30000);  // ← Adjust milliseconds (default: 30 seconds)
```

## Integration with API Calls

### Example: Blog Data Fetching

```typescript
"use client";

import { useLoadingWrapper } from "@/hooks/useLoadingState";

export default function BlogPage() {
  const fetchBlogs = useLoadingWrapper(async () => {
    const response = await fetch("/api/sanity/query", {
      method: "POST",
      body: JSON.stringify({ query: "*[_type == 'blog']" }),
    });
    return response.json();
  });

  useEffect(() => {
    fetchBlogs().catch(console.error);
  }, []);

  return <div>Blog content...</div>;
}
```

### Example: Form Submission

```typescript
"use client";

import { useLoadingWrapper } from "@/hooks/useLoadingState";

export default function ContactForm() {
  const handleSubmit = useLoadingWrapper(async (formData) => {
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    return response.json();
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSubmit(Object.fromEntries(new FormData(e.target)));
      // Show success message
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return <form onSubmit={onSubmit}>...</form>;
}
```

## Styling & Theme Awareness

The loading screen respects your existing theme system:

- **Light Theme**: Soft gradient background with blue accents
- **Dark Theme**: Dark gradient with cyan accents

Colors automatically align with CSS variables:
- `--primary: #0ea5e9` (cyan)
- `--secondary: #3b82f6` (blue)
- `--accent: #60a5fa` (light blue)

## Performance Considerations

### Optimized For:
- ✅ Smooth 60fps animations
- ✅ No layout shifts or repaints
- ✅ Minimal bundle size
- ✅ GPU-accelerated transforms
- ✅ Framer Motion optimization

### Best Practices:
1. Keep loading duration under 5 seconds when possible
2. Use `stopLoading()` as soon as content is ready
3. Avoid showing loader on very fast operations (< 300ms)
4. Test on low-end devices and slow networks

## Accessibility

### Features:
- ✅ Respects `prefers-reduced-motion` for users who prefer minimal animations
- ✅ Semantic HTML structure
- ✅ Proper z-index layering
- ✅ No focus trapping
- ✅ Screen reader compatible

### Testing:
To verify accessibility, check:
```bash
# Enable prefers-reduced-motion in your browser DevTools
# The loader should still work but with reduced motion
```

## Troubleshooting

### Loader Not Showing

**Problem:** Loading screen doesn't appear during navigation

**Solution:**
1. Check that `LoadingProvider` wraps all content in [layout.tsx](../../app/layout.tsx)
2. Verify `LoadingScreen` component is imported
3. Check browser console for errors

### Loader Stuck

**Problem:** Loading screen doesn't disappear

**Solution:**
1. The system auto-stops after 30 seconds (safety net)
2. Call `stopLoading()` manually in your code:

```typescript
const { stopLoading } = useLoadingState();
// ... after your operation completes
stopLoading();
```

### Animation Stuttering

**Problem:** Animations are not smooth

**Solution:**
1. Check DevTools Performance tab for long-running tasks
2. Reduce animation complexity in LoadingScreen.tsx
3. Verify GPU acceleration is enabled (check DevTools)

### Theme Not Applied

**Problem:** Loading screen shows wrong colors

**Solution:**
1. Ensure `ThemeProvider` is above `LoadingProvider` in [layout.tsx](../../app/layout.tsx)
2. Check that theme is properly initialized

## Browser Support

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Next Steps

### Optional Enhancements:

1. **Custom Spinner Variants**
   - Create alternative loader designs
   - Use different animations per page type

2. **Loading Progress Tracking**
   - Show actual progress percentage
   - Integrate with file uploads

3. **Analytics Integration**
   - Track loading duration
   - Monitor performance metrics

4. **Advanced Theme Modes**
   - Create custom gradients per section
   - Add seasonal variants

## Support & Questions

For implementation help, refer to:
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Next.js 16 Navigation](https://nextjs.org/docs/app/api-reference/hooks/use-router)
- This file's examples above

---

**Last Updated:** May 12, 2026  
**Version:** 1.0 (Initial Release)
