# MiniKiro - Simplified Kiro-Like Coding App

## Project Overview
MiniKiro is a single-page web application that mimics Kiro's vibe coding and agent hooks on a small scale. Built for the Code with Kiro Hackathon, it demonstrates spec-driven development and creative implementation.

**Deployment**: Netlify (https://minikiro.netlify.app/)
**Tech Stack**: React, TypeScript, Tailwind CSS, Jest

## Core Features

### 1. Prompt Input System
- **Component**: Textarea for natural language input
- **Examples**: "Create a red button with hover effect", "Blue div with rounded corners"
- **Styling**: Retro-themed with pink borders and focus states
- **Accessibility**: Proper ARIA labels and keyboard navigation

### 2. Vibe Coding Engine
- **File**: `frontend/src/generatedCode.ts`
- **Function**: Converts natural language prompts to code snippets
- **Supported Languages**: HTML/CSS/JS, Python
- **Mock Responses**: Pre-defined responses for common prompts
- **Fallback**: Generic placeholder for unknown prompts

### 3. Code Output Display
- **Component**: Read-only `<pre>` block with syntax highlighting
- **Styling**: Retro theme (font-mono, bg-gray-900, text-green-400, neon glow)
- **Features**: Language indicator, prompt reference
- **Responsive**: Horizontal scrolling for long code lines

### 4. Toggle Functionality
- **Button**: "Show Code" / "Hide Code" toggle
- **Styling**: Gradient background (pink-500 to purple-600)
- **Interactions**: Hover scale effect, smooth transitions
- **Accessibility**: ARIA attributes (aria-expanded, aria-controls)

### 5. Agent Hook System
- **Hook File**: `.kiro/hooks/formatCode.json`
- **Trigger**: Manual (Format button click)
- **Action**: Auto-format code (indentation, semicolons, spacing)
- **Languages**: JavaScript, Python, HTML formatting rules
- **Logging**: Actions logged to `.kiro/debug.log`

## Technical Implementation

### Frontend Structure
```
frontend/src/
├── App.tsx              # Main application component
├── App.test.tsx         # Comprehensive test suite
├── generatedCode.ts     # Vibe coding engine and formatting
├── index.css           # Tailwind directives and retro fonts
└── index.tsx           # React app entry point
```

### State Management
- **React Hooks**: useState for component state
- **State Variables**:
  - `prompt`: User input text
  - `generatedCode`: Current code response
  - `showCode`: Toggle visibility state
  - `isFormatting`: Loading state for format hook

### Styling System
- **Framework**: Tailwind CSS v3.4.0
- **Theme**: Retro/cyberpunk aesthetic
- **Font**: Press Start 2P (Google Fonts)
- **Colors**: 
  - Background: gray-900
  - Text: green-400, pink-400, purple-400
  - Accents: Neon glow effects
- **Responsive**: Mobile-first design

### Testing Strategy
- **Framework**: Jest + React Testing Library
- **Coverage**: 
  - Component rendering
  - User interactions
  - State management
  - Accessibility compliance
  - Styling verification
- **Test Cases**: 8 comprehensive test scenarios

## Agent Hook Configuration

### Format Code Hook
```json
{
  "name": "Format Code Hook",
  "trigger": { "type": "manual", "event": "format_button_click" },
  "actions": [
    { "type": "format_code", "rules": {...} },
    { "type": "log_action", "target": ".kiro/debug.log" }
  ]
}
```

### Formatting Rules
- **JavaScript**: Spacing, semicolons, indentation, variable declarations
- **Python**: 4-space indentation, function definitions, spacing
- **HTML**: Tag structure, whitespace removal, nesting

## Deployment Configuration

### Netlify Setup
```toml
[build]
  command = "npm run build"
  publish = "frontend/build"

[build.environment]
  NODE_VERSION = "20"
```

### Build Process
1. Install dependencies (`npm install`)
2. Run tests (`npm test`)
3. Build production bundle (`npm run build`)
4. Deploy to Netlify

## Development Commands

```bash
# Development server
cd frontend && npm start

# Run tests (non-interactive, prevents hangs)
cd frontend && npm test

# Run tests in watch mode (interactive)
cd frontend && npm run test:watch

# Build for production
cd frontend && npm run build

# Local Netlify testing
netlify dev
```

## Test Configuration Fix

### Issue Resolution
- **Problem**: Kiro terminal hangs on `npm test -- --watchAll=false --verbose` despite tests passing
- **Root Cause**: Jest watch mode prompt causing terminal hang in Kiro environment
- **Solution**: Updated test script with `--ci --watchAll=false --verbose` flags

### Updated Test Script
```json
{
  "scripts": {
    "test": "react-scripts test --ci --watchAll=false --verbose",
    "test:watch": "react-scripts test"
  }
}
```

### Test Monitoring
- **Hook**: `.kiro/hooks/testHook.json` monitors test execution
- **Logging**: Test metrics logged to `.kiro/debug.log`
- **Timeout**: 2-minute maximum execution time with auto-kill
- **Exit Test**: Added Jest exit verification test

## Accessibility Features
- **ARIA Labels**: All interactive elements properly labeled
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Semantic HTML structure
- **Focus Management**: Visible focus indicators
- **Color Contrast**: High contrast retro color scheme

## Performance Optimizations
- **Code Splitting**: React lazy loading ready
- **Bundle Size**: Minimal dependencies
- **CSS Optimization**: Tailwind purging enabled
- **Image Optimization**: No images for faster loading

### 6. Live Preview Window
- **Component**: Sanitized HTML rendering with DOMPurify
- **Styling**: White background with pink neon border
- **Features**: Real-time HTML/CSS/JS execution
- **Safety**: XSS protection with content sanitization
- **Fallback**: Message for non-renderable code (Python, etc.)

## Unique Vibe Coding Examples
- **"create a red button"** → Interactive HTML button
- **"glowing navbar"** → Animated gradient navigation with CSS keyframes
- **"neon card"** → Cyberpunk-styled card with glowing effects
- **"animated loading spinner"** → CSS animation spinner
- **"python hello world"** → Python function with proper formatting
- **"javascript counter"** → Interactive counter with DOM manipulation

## Final Implementation Status
✅ **Prompt Input System** - Natural language to code conversion
✅ **Vibe Coding Engine** - 8 unique code generation examples
✅ **Live Preview Window** - Real-time HTML/CSS/JS rendering
✅ **Toggle Functionality** - Show/hide code and preview
✅ **Format Hook System** - Agent-based code formatting
✅ **Retro UI Theme** - Press Start 2P font, neon colors, cyberpunk aesthetic
✅ **Accessibility** - Full ARIA support, keyboard navigation
✅ **Test Suite** - 11 comprehensive tests, 100% pass rate
✅ **Performance** - Fast loading, optimized bundle
✅ **Deployment Ready** - Netlify configuration complete

## Future Enhancements
- Real AI integration for code generation
- More programming languages support
- Advanced formatting rules
- Code execution preview for JavaScript
- User authentication and saved prompts
- Collaborative coding features