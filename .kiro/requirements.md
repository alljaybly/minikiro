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

## Git Command Integration Fix

### Issue Resolution
- **Problem**: Kiro terminal hangs on `git log --oneline -5` and other Git commands
- **Root Cause**: VS Code terminal integration issues on Windows similar to Jest hang
- **Solution**: Git command logging hook with PowerShell fallback script

### Git Command Hook
```json
{
  "name": "Git Command Logging Hook",
  "trigger": { "type": "command", "event": "git_command_execution" },
  "actions": [
    { "type": "intercept_command", "redirect_to": ".kiro/scripts/git_fallback.ps1" },
    { "type": "log_execution", "target": ".kiro/debug.log" }
  ]
}
```

### PowerShell Fallback
- **Script**: `.kiro/scripts/git_fallback.ps1` handles Git commands
- **Usage**: `powershell -ExecutionPolicy Bypass -File ".kiro/scripts/git_fallback.ps1" "status"`
- **Logging**: All Git operations logged with timestamps and execution time
- **Timeout**: 30-second maximum execution time with error handling

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
✅ **Kid Mode (Ages 6-16)** - Colorful UI, simple prompts, badges, learning tips
✅ **Pro Mode (Ages 17+)** - Advanced UI, complex prompts, code export
✅ **Prompt Input System** - Natural language to code conversion
✅ **Real-Time Code Generation** - 8+ unique examples with client-side mapping
✅ **Live Preview Window** - Real-time HTML/CSS/JS rendering with DOMPurify
✅ **Toggle Functionality** - Show/hide code and preview
✅ **Format Hook System** - Agent-based code formatting
✅ **Badges System** - 5 achievement badges with animations
✅ **Prompt Library** - 5 kid prompts + 5 pro prompts
✅ **Code Cards** - Shareable images with html2canvas
✅ **Easter Eggs** - Random 8-bit animations (5% chance)
✅ **Learning Tips** - Context-aware educational pop-ups
✅ **Retro UI Theme** - Press Start 2P font, neon colors, mode-specific aesthetics
✅ **Accessibility** - Full ARIA support, keyboard navigation
✅ **Test Suite** - 18 comprehensive tests, 100% pass rate
✅ **Performance** - Fast loading, optimized bundle
✅ **Git Integration** - Hang-free Git operations with PowerShell fallback
✅ **Deployment Ready** - Netlify configuration complete

## Unique Features Implemented

### Kid Mode Features
- 🎨 Colorful gradient backgrounds (yellow → pink → purple)
- ✨ Fun button text ("Create Magic!", "Make Pretty")
- 🌟 Simple prompts (draw a red star, make a cartoon button)
- 🏆 Achievement badges with bounce animations
- 💡 Kid-friendly learning tips
- 📸 Code card sharing

### Pro Mode Features  
- 💻 Dark theme (gray-900 background, green-400 text)
- 🚀 Professional button text ("Generate Code", "Format Code")
- 🔧 Advanced prompts (glowing navbar, REST API client, data dashboard)
- 💾 Code export as HTML files
- 📊 Complex UI components
- 🎯 Technical learning tips

### Real-Time Code Generation Examples
- **"draw a red star"** → SVG polygon with red fill and stroke (10 points)
- **"make a cartoon button"** → Gradient button with hover animations (15 points)
- **"draw a rainbow"** → Multi-colored SVG arc paths (20 points)
- **"create a smiley face"** → SVG circle with facial features (15 points)
- **"make a bouncing ball"** → CSS keyframe animation (25 points)
- **"create a glowing navbar"** → Gradient nav with box-shadow effects (50 points)
- **"build a rest api client"** → Interactive form with method selection (60 points)
- **"create a data dashboard"** → Grid layout with metric cards (75 points)
- **"make a pixel art game"** → Interactive canvas game with controls (100 points)

## Beginner's Setup Guide

### 📚 Comprehensive Documentation
- **README.md**: Complete setup guide with prerequisites, installation steps, and troubleshooting
- **PowerShell Script**: Automated setup script (`frontend/setup.ps1`) for Windows users
- **Setup Guide Link**: Integrated into the app UI for easy access

### 🛠 Setup Features
- **Prerequisite Checking**: Verifies Node.js installation before proceeding
- **Automated Installation**: Installs all dependencies with error handling
- **Configuration Setup**: Creates Tailwind and PostCSS configuration files
- **Test Verification**: Runs test suite to ensure proper setup
- **Development Server**: Automatically starts the app after setup

### 📖 User-Friendly Documentation
- **Simple Language**: Written for beginners with clear explanations
- **Visual Structure**: Well-organized sections with emojis and formatting
- **Troubleshooting Section**: Common issues and solutions
- **Example Prompts**: Ready-to-try examples for both Kid and Pro modes
- **Contributing Guide**: Instructions for community contributions

### 🔧 PowerShell Setup Script Features
- **Environment Validation**: Checks Node.js version and directory structure
- **Dependency Management**: Handles npm installation with cache cleaning fallback
- **Configuration Generation**: Creates all necessary config files automatically
- **Error Handling**: Provides clear error messages and recovery suggestions
- **User Feedback**: Colorful console output with progress indicators

## Infinitely Adding Prompts Feature

### ✨ Custom Prompt Creation
- **Add Prompt Button**: Integrated into prompt library for easy access
- **Smart Form**: Mode-specific UI (colorful for kids, professional for pros)
- **Language Selection**: HTML/CSS, JavaScript, Python options
- **Local Storage**: Persistent storage of custom prompts across sessions
- **Infinite Scrolling**: Unlimited custom prompts with scrollable interface

### 🤖 Hugging Face API Integration
- **Real-time Generation**: Uses bigcode/starcoder model for code generation
- **Fallback System**: Local generation when API is unavailable
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Graceful degradation with user-friendly error messages
- **Token Management**: Secure API token handling via environment variables

### 🎯 Enhanced User Experience
- **Dynamic Points**: Calculated based on prompt complexity (10-100 points)
- **Language Detection**: Automatic language detection from generated code
- **Secure Preview**: iframe-based rendering with sandbox security
- **Badge System**: "Prompt Creator" badge for first custom prompt
- **Mode-Specific Filtering**: Custom prompts filtered by Kid/Pro mode

### 🛠 Technical Implementation
- **TypeScript Interfaces**: Strongly typed custom prompt structure
- **React Hooks**: useState and useEffect for state management
- **Local Storage API**: Persistent data storage with error handling
- **Hugging Face Client**: @huggingface/inference integration
- **Security**: DOMPurify sanitization and iframe sandboxing

### 📊 Custom Prompt Features
- **Metadata Tracking**: Creation date, mode, language, and description
- **Visual Indicators**: Different styling for custom vs built-in prompts
- **Search & Filter**: Mode-specific prompt filtering
- **Export Ready**: Custom prompts work with all existing features (preview, format, share)

## Enhanced Interactive Games & Typo Correction

### 🎮 Interactive Game Examples
- **Swipe Game**: "move in the direction you swipe" creates touch/mouse controlled ball game
- **Soccer Ball Game**: "make a soccer ball game" generates animated bouncing soccer ball
- **Pixel Art Game**: Enhanced with better controls and collision detection
- **Canvas Integration**: All games use HTML5 Canvas with proper event handling

### 🔧 Typo Correction System
- **Common Typos**: Automatically corrects "im" → "in", "direcion" → "direction"
- **Smart Matching**: Handles variations like "creat" → "create", "buton" → "button"
- **Phrase Correction**: Fixes complex phrases like "move im the direcion" → "move in the direction"
- **Seamless UX**: Users don't need to worry about perfect spelling

### 🛡️ Enhanced Security & Compatibility
- **DOMPurify Configuration**: Allows script and canvas tags for interactive content
- **iframe Sandbox**: Enhanced with "allow-pointer-lock" for better game interaction
- **Touch Events**: Full support for touchstart, touchmove, touchend events
- **Cross-Platform**: Works on desktop (mouse) and mobile (touch) devices

### 📚 Tutorial System
- **Structured Learning**: Progressive difficulty from easy to hard
- **Mode-Specific**: Different tutorials for Kid and Pro modes
- **Points Integration**: Each tutorial awards appropriate points
- **Interactive Examples**: All tutorials generate working, interactive code

### 🔄 Improved Code Generation
- **Dynamic Points**: 5-100 points based on complexity and features
- **Language Detection**: Better automatic language detection
- **Fallback System**: Graceful degradation when API is unavailable
- **Error Handling**: User-friendly error messages with recovery suggestions

## Future Enhancements
- Real AI integration for code generation
- More programming languages support
- Advanced formatting rules
- Code execution preview for JavaScript
- User authentication and saved prompts
- Collaborative coding features