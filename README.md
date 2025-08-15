# 🎨 MiniKiro - Learn Coding with Fun!

MiniKiro is a simplified Kiro-like coding app that makes programming fun and accessible for everyone! Whether you're 6 or 60, MiniKiro helps you create amazing code with natural language prompts.

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

### 📥 Installation Steps

#### Option 1: Automatic Setup (Recommended for Beginners)
1. **Clone the repository:**
   ```bash
   git clone https://github.com/alljaybly/minikiro.git
   cd minikiro
   ```

2. **Run the setup script:**
   ```powershell
   .\frontend\setup.ps1
   ```
   This will automatically install everything and start the app!

3. **Configure AI Features (Optional):**
   - The setup script creates a `.env` file
   - Replace `your_huggingface_token_here` with your actual token
   - This enables real-time AI code generation

#### Option 2: Manual Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/alljaybly/minikiro.git
   cd minikiro/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Tailwind CSS:**
   ```bash
   npx tailwindcss init -p
   ```

4. **Add Hugging Face token (Optional):**
   Create `.env` file with:
   ```
   REACT_APP_HF_TOKEN=your_token_here
   ```

5. **Start the development server:**
   ```bash
   npm start
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Try These Fun Prompts!

### Kid Mode Examples:
- `"draw a red star"` → Creates a beautiful SVG star
- `"make a cartoon button"` → Builds a colorful animated button
- `"draw a rainbow"` → Generates a multi-colored rainbow
- `"create a smiley face"` → Makes a happy SVG face
- `"make a bouncing ball"` → Creates a CSS animation
- `"make a pixel art game"` → Interactive pixel game with controls

### Pro Mode Examples:
- `"create a glowing navbar"` → Builds a professional navigation bar
- `"build a rest api client"` → Creates an interactive API testing tool
- `"create a data dashboard"` → Generates a metrics dashboard
- `"make a soccer ball game"` → Animated bouncing soccer ball
- `"move in the direction you swipe"` → Interactive touch/swipe game
- `"neon card"` → Creates a cyberpunk-styled card component

### 🎮 Interactive Games:
- **Swipe Game**: Try "move in the direction you swipe" for a touch-controlled game
- **Soccer Ball**: "make a soccer ball game" creates a bouncing ball animation
- **Pixel Art**: "make a pixel art game" builds a retro-style game with controls

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