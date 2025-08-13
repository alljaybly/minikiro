# MiniKiro Coding Standards

## TypeScript Conventions

### Type Definitions
- Use explicit interfaces for complex objects
- Prefer `interface` over `type` for object shapes
- Use generic types for reusable components
- Always define return types for functions

```typescript
interface CodeResponse {
  prompt: string;
  code: string;
  language: string;
}

function generateCode(prompt: string): CodeResponse {
  // Implementation
}
```

### React Components
- Use functional components with hooks
- Destructure props in function parameters
- Use TypeScript for prop types
- Implement proper error boundaries

```typescript
interface ComponentProps {
  title: string;
  onAction: () => void;
}

const Component: React.FC<ComponentProps> = ({ title, onAction }) => {
  // Implementation
};
```

### State Management
- Use `useState` for local component state
- Use `useEffect` for side effects
- Implement proper cleanup in effects
- Use custom hooks for complex logic

## Tailwind CSS Guidelines

### Class Organization
- Group classes by category: layout, spacing, colors, typography
- Use responsive prefixes consistently
- Prefer utility classes over custom CSS
- Use component classes for repeated patterns

```typescript
className="flex items-center justify-between p-4 bg-gray-900 text-green-400 font-press-start hover:scale-105 transform transition-all duration-200"
```

### Responsive Design
- Mobile-first approach
- Use Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Test on multiple screen sizes
- Ensure touch-friendly interactions

### Color Scheme
- Primary: gray-900 (background)
- Text: green-400 (primary), pink-400 (accent), purple-400 (secondary)
- Interactive: pink-500 to purple-600 gradients
- Effects: Custom neon glow shadows

### Typography
- Primary font: Press Start 2P (retro gaming)
- Fallback: font-mono for code blocks
- Consistent sizing: text-sm, text-lg, text-4xl
- Proper line heights for readability

## Accessibility Standards

### ARIA Implementation
- Use semantic HTML elements first
- Add ARIA labels for complex interactions
- Implement proper focus management
- Ensure screen reader compatibility

```typescript
<button
  aria-expanded={showCode}
  aria-controls="code-output"
  aria-label={showCode ? "Hide code" : "Show code"}
>
  {showCode ? 'Hide Code' : 'Show Code'}
</button>
```

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Implement proper tab order
- Use Enter and Space for activation
- Provide keyboard shortcuts where appropriate

### Color and Contrast
- Maintain WCAG AA contrast ratios
- Don't rely solely on color for information
- Provide alternative text for visual elements
- Test with color blindness simulators

## Testing Practices

### Unit Testing
- Test component rendering
- Test user interactions
- Test state changes
- Test accessibility features

```typescript
test('toggle button shows and hides code output', async () => {
  const user = userEvent.setup();
  render(<App />);
  
  // Test implementation
});
```

### Integration Testing
- Test complete user workflows
- Test API integrations
- Test error handling
- Test responsive behavior

### Accessibility Testing
- Use screen reader testing
- Test keyboard navigation
- Validate ARIA attributes
- Check color contrast

## Code Organization

### File Structure
```
src/
├── components/          # Reusable components
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── tests/              # Test files
└── App.tsx             # Main application
```

### Import Organization
1. React and third-party libraries
2. Internal components and hooks
3. Types and interfaces
4. Utility functions
5. Styles and assets

```typescript
import React, { useState, useEffect } from 'react';
import { SomeLibrary } from 'some-library';

import { CustomComponent } from './components/CustomComponent';
import { useCustomHook } from './hooks/useCustomHook';

import { CodeResponse } from './types/CodeResponse';
import { generateCode } from './utils/generateCode';

import './App.css';
```

## Performance Guidelines

### Bundle Optimization
- Use dynamic imports for code splitting
- Minimize bundle size with tree shaking
- Optimize images and assets
- Use production builds for deployment

### React Performance
- Use React.memo for expensive components
- Implement proper dependency arrays in hooks
- Avoid unnecessary re-renders
- Use callback optimization where needed

### CSS Performance
- Use Tailwind's purge feature
- Minimize custom CSS
- Optimize for critical rendering path
- Use efficient selectors

## Git Workflow

### Commit Messages
- Use conventional commit format
- Include scope when relevant
- Write descriptive commit bodies
- Reference issues and PRs

```
feat(ui): add code formatting button with agent hook integration

- Implement format button with loading state
- Add agent hook configuration for code formatting
- Include accessibility attributes and keyboard support
- Add comprehensive tests for formatting functionality

Closes #123
```

### Branch Naming
- `feature/description` for new features
- `fix/description` for bug fixes
- `docs/description` for documentation
- `refactor/description` for refactoring

### Code Review
- Review for functionality and logic
- Check accessibility compliance
- Verify test coverage
- Ensure coding standards adherence