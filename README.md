# 🎨 MiniKiro - A Coding Tool for Total Beginners

MiniKiro is a coding tool designed for total beginners (ages 6-16) and pros (17+) with real-time animated previews. Create amazing interactive projects just by typing what you want - no coding knowledge required!

## ✨ What Makes MiniKiro Special?

### 🎨 Kid Mode (Ages 6-16)
- **Colorful Interface**: Bright gradients and fun animations
- **Simple Prompts**: "Draw a red star", "Make a cartoon button"
- **Achievement Badges**: Unlock Star Coder, Button Master, and more!
- **Learning Tips**: Kid-friendly explanations that pop up as you code
- **Easter Eggs**: Surprise animations to keep things exciting!

### 💻 Pro Mode (Ages 17+)
- **Professional Theme**: Dark interface with terminal colors
- **Advanced Prompts**: "Create a glowing navbar", "Build a REST API client"
- **Code Export**: Download your creations as HTML files
- **Technical Tips**: Advanced development guidance
- **Real-time Preview**: See your code come to life instantly

## 🚀 Quick Start Guide

### Prerequisites
Before you begin, make sure you have these installed:

1. **Node.js (v20 LTS)** - Download from [nodejs.org](https://nodejs.org/)
2. **Git** - Download from [git-scm.com](https://git-scm.com/)
3. **VS Code** (recommended) - Download from [code.visualstudio.com](https://code.visualstudio.com/)
4. **Hugging Face API Token** (optional) - Get from [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)

### 📥 Setup

#### Prerequisites
- Install [Node.js (v20 LTS)](https://nodejs.org)
- Install [Git](https://git-scm.com)
- Install [VS Code](https://code.visualstudio.com) (recommended)
- Get a [Hugging Face API token](https://huggingface.co/settings/tokens) (optional)

#### Quick Setup
1. **Clone:** `git clone https://github.com/alljaybly/minikiro.git`
2. **Navigate:** `cd minikiro/frontend`
3. **Install:** `npm install`
4. **Configure Tailwind:** `npx tailwindcss init -p`
5. **Add Hugging Face token:** Create `.env` with `REACT_APP_HF_TOKEN=your_token`
6. **Run:** `npm start`

#### Automatic Setup (Recommended for Beginners)
```powershell
.\frontend\setup.ps1
```
This will automatically install everything and start the app!

## 🎯 Using MiniKiro

### Kid Mode (Ages 6-16):
- **Type "Draw a running horse"** to see an animated horse galloping across the screen
- **Type "Draw a flying bird"** to watch a bird fly across the sky with flapping wings
- **Type "Make a bouncing ball"** for a colorful bouncing animation
- **Type "Draw a rainbow"** to create a beautiful multi-colored rainbow

### Pro Mode (Ages 17+):
- **Type "Make a soccer ball game"** for an interactive bouncing soccer ball
- **Type "Move in the direction you swipe"** for a touch-controlled game
- **Type "Create a glowing navbar"** for a professional navigation bar
- **Type "Build a REST API client"** for an interactive API testing tool

### Custom Prompts:
- Add your own ideas (e.g., "Draw a green circle", "Make a dancing cat")
- See real-time animations and games in the preview window
- All code works offline - download complete HTML files to share

### Accessibility:
- Use keyboard navigation and screen readers for ease of use
- All features designed for total beginners with zero coding knowledge

### 🌐 Using Downloaded HTML Files:
1. **Generate Code**: Type any prompt and click "Generate Code"
2. **Download**: Click "Download HTML" to save the complete file
3. **Open Offline**: Double-click the `.html` file to open in your browser
4. **Share**: Send the file to friends - it works without internet!
5. **Games Work**: Interactive games (soccer ball, swipe) work perfectly offline

### 🎮 Interactive Games:
- **Swipe Game**: Try "move in the direction you swipe" for a touch-controlled game
- **Soccer Ball**: "make a soccer ball game" creates a bouncing ball animation
- **Pixel Art**: "make a pixel art game" builds a retro-style game with controls

### 📤 Share & Download:
- **HTML Download**: Click "Download HTML" to save complete, self-contained HTML files
- **Offline Ready**: Downloaded files work offline in any browser (Chrome, Firefox, Safari)
- **Complete Code**: Includes all CSS and JavaScript inline - no external dependencies
- **Kid-Friendly**: Simple one-click download for sharing creations with friends

## 🏆 Features Overview

### 🎨 Creative Tools
- **Real-time Code Generation**: Type what you want, get instant code
- **Live Preview Window**: See your creations come to life
- **Code Cards**: Share your work as beautiful images
- **Prompt Library**: Pre-made suggestions for both modes

### 🎓 Learning Features
- **Achievement System**: Earn badges as you learn
- **Learning Tips**: Contextual help that appears as you code
- **Progress Tracking**: See how much you've learned
- **Mode Switching**: Grow from Kid Mode to Pro Mode

### 🛠 Technical Features
- **Format Hook**: Auto-format your code with AI assistance
- **Export Options**: Download code as HTML files (Pro Mode)
- **Accessibility**: Full keyboard navigation and screen reader support
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🔧 Troubleshooting

### Common Issues and Solutions:

#### "npm command not found"
- **Solution**: Install Node.js from [nodejs.org](https://nodejs.org/)
- **Check**: Run `node -v` in your terminal

#### "Module not found" errors
- **Solution**: Delete `node_modules` and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

#### Tailwind styles not working
- **Solution**: Restart the development server:
  ```bash
  npm start
  ```

#### Port 3000 already in use
- **Solution**: Kill existing processes or use a different port:
  ```bash
  npx kill-port 3000
  # or
  npm start -- --port 3001
  ```

#### Build errors
- **Solution**: Clear npm cache and rebuild:
  ```bash
  npm cache clean --force
  npm run build
  ```

#### Swipe game not working
- **Solution**: Make sure you're using a touch device or mouse drag
- **Check**: Verify the iframe preview window is large enough
- **Note**: Some games work better on mobile devices

#### API errors (Hugging Face)
- **Solution**: Check your `REACT_APP_HF_TOKEN` in `.env` file
- **Fallback**: App works without API token using local generation
- **Verify**: Token should start with `hf_`

#### Custom prompts not saving
- **Solution**: Check browser's local storage permissions
- **Clear**: Try clearing browser cache and localStorage
- **Fallback**: Use incognito mode to test

### Still Having Issues?
1. Check the [Issues page](https://github.com/alljaybly/minikiro/issues) on GitHub
2. Make sure you're using Node.js v20 LTS
3. Try running the setup script again: `.\frontend\setup.ps1`
4. Test with different prompts to isolate the issue

## 📁 Project Structure

```
minikiro/
├── frontend/                 # React application
│   ├── src/
│   │   ├── App.tsx          # Main application component
│   │   ├── generatedCode.ts # Code generation engine
│   │   └── App.test.tsx     # Test suite
│   ├── public/              # Static assets
│   ├── package.json         # Dependencies and scripts
│   └── setup.ps1           # Automated setup script
├── .kiro/                   # Kiro IDE configuration
│   ├── hooks/              # Agent hooks
│   ├── steering/           # Coding standards
│   └── requirements.md     # Project specifications
├── netlify.toml            # Deployment configuration
└── README.md               # This file!
```

## 🧪 Testing

Run the test suite to make sure everything works:

```bash
cd frontend
npm test
```

All tests should pass! The test suite includes:
- Component rendering tests
- User interaction tests
- Code generation tests
- Accessibility tests
- Mode switching tests

## 🌐 Deployment

MiniKiro is configured for easy deployment to Netlify:

1. **Fork this repository** on GitHub
2. **Connect to Netlify**: Link your GitHub account
3. **Deploy**: Netlify will automatically build and deploy your app
4. **Share**: Your app will be live at `https://your-app-name.netlify.app`

## 🤝 Contributing

We'd love your help making MiniKiro even better! Here's how you can contribute:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b amazing-feature`
3. **Make your changes** and test them
4. **Commit your changes**: `git commit -m "Add amazing feature"`
5. **Push to your branch**: `git push origin amazing-feature`
6. **Open a Pull Request**

### Ideas for Contributions:
- New code generation examples
- Additional learning tips
- More achievement badges
- UI improvements
- Bug fixes
- Documentation improvements

## 📚 Learn More

### About the Technology:
- **React**: User interface framework
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Jest**: Testing framework
- **html2canvas**: Code card generation
- **DOMPurify**: Safe HTML rendering

### Educational Resources:
- [React Tutorial](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)

## 🎉 Built for Code with Kiro Hackathon

MiniKiro was created as part of the Code with Kiro Hackathon to showcase:
- **Spec-driven development** with complete `.kiro` configuration
- **AI-assisted coding** with agent hooks and format automation
- **Creative implementation** of educational coding tools
- **Accessibility-first design** for inclusive learning

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Kiro IDE Team** for inspiring this project
- **React Community** for the amazing framework
- **Tailwind CSS** for making styling fun
- **All contributors** who help make coding accessible to everyone

---

**Ready to start coding?** Run `.\frontend\setup.ps1` and let the magic begin! ✨

**Questions?** Open an issue on [GitHub](https://github.com/alljaybly/minikiro/issues) - we're here to help! 🤗