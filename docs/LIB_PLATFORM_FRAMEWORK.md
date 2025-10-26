# Frontend Lib Platform Framework

## Overview

The `apps/frontend/src/lib/platform` directory contains a modular UI framework that provides reusable components, utilities, and patterns for the Sports Central application.

## Architecture

### Directory Structure
```
lib/platform/
├── carousel/          # Carousel type definitions only
│   ├── types.ts      # TypeScript interfaces for carousel implementations
│   └── index.ts      # Exports types only
├── navigation/        # Navigation components
│   └── index.ts      # Exports: BottomNavigation, AppDrawer, Header
├── ui/               # Core UI components
│   └── index.ts      # Re-exports from @/components/ui
└── index.ts          # Main barrel export
```

## Key Features

### 1. Carousel System (`/carousel`)
- **Types Only**: TypeScript interfaces for CarouselCard and CarouselCategory  
- **Purpose**: Provides type definitions for carousel implementations
- **Location**: Types are in `lib/platform/carousel/types.ts`; actual carousel components are in `app/components/`
- **Note**: This module only exports type definitions - no component exports

### 2. Navigation Components (`/navigation`)
Centralized navigation system with three main components:
- **BottomNavigation**: Mobile-optimized bottom navigation bar
- **AppDrawer**: Slide-out navigation drawer for additional menu items
- **Header**: Top navigation header with branding and quick actions

### 3. UI Components (`/ui`)
Core UI primitives exported from the component library:
- **Button**: Customizable button component with variants
- **Card**: Container component with styling presets
- **Skeleton**: Loading placeholder component

**Note**: Additional UI components (Input, Modal, Toast, layout components) are planned for future implementation.

## Usage Patterns

### Importing from Platform Library
```typescript
// Import navigation components
import { BottomNavigation, AppDrawer, Header } from '@/lib/platform';

// Import UI components  
import { Button, Card, Skeleton } from '@/lib/platform';

// Import carousel types
import type { CarouselCard, CarouselCategory } from '@/lib/platform/carousel';

// Import from specific modules
import { BottomNavigation } from '@/lib/platform/navigation';
import { Button } from '@/lib/platform/ui';
```

### Component Composition
The platform library encourages composition over configuration:

```typescript
// Example: Building a feature page
import { Button, Card } from '@/lib/platform';
import { BottomNavigation } from '@/lib/platform/navigation';

export function FeaturePage() {
  return (
    <div>
      <Card>
        <h2>Feature Content</h2>
        <Button variant="primary">Take Action</Button>
      </Card>
      <BottomNavigation />
    </div>
  );
}
```

## Design Principles

1. **Modularity**: Each component is self-contained and reusable
2. **TypeScript-First**: Full type safety with exported interfaces
3. **Composition**: Build complex UIs from simple primitives
4. **Performance**: Optimized for mobile with lazy loading where appropriate
5. **Consistency**: Shared design language across all platform components

## Vercel Build Compatibility

The platform library is optimized for Vercel deployment:
- **Tree-Shaking**: Barrel exports allow efficient tree-shaking
- **Code Splitting**: Components can be dynamically imported
- **SSR Compatible**: All components support Server-Side Rendering
- **Client Components**: Properly marked with "use client" directive where needed

## Integration with Main App

The platform library integrates with the main app through:
1. **Shared Components**: Reusable across all feature pages
2. **Consistent Styling**: Unified design system
3. **Type Safety**: Shared TypeScript interfaces
4. **Centralized Updates**: Single source of truth for UI components

## Benefits for Vercel Deployment

1. **Optimized Bundle Size**: Tree-shaking removes unused code
2. **Fast Build Times**: Modular structure enables parallel builds
3. **Edge-Ready**: Components designed for edge runtime
4. **Static Optimization**: Compatible with Next.js static generation
5. **Incremental Adoption**: Can adopt components gradually

## Next Steps

To leverage this framework in production:
1. Use platform components for consistent UI
2. Create feature-specific compositions
3. Extend with custom components as needed
4. Maintain type safety throughout
5. Optimize bundle size with dynamic imports
