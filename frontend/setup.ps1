# MiniKiro Setup Script
# Automated setup for Windows users

Write-Host "🎨 Welcome to MiniKiro Setup!" -ForegroundColor Cyan
Write-Host "Setting up your coding playground..." -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
Write-Host "🔍 Checking Node.js installation..." -ForegroundColor Yellow
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js not found!" -ForegroundColor Red
    Write-Host "Please download and install Node.js v20 LTS from: https://nodejs.org" -ForegroundColor Yellow
    Write-Host "After installation, restart PowerShell and run this script again." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

$nodeVersion = node -v
Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ package.json not found!" -ForegroundColor Red
    Write-Host "Please make sure you're running this script from the frontend/ directory" -ForegroundColor Yellow
    Write-Host "Expected path: minikiro/frontend/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
Write-Host "This might take a few minutes..." -ForegroundColor Gray

# Install dependencies
try {
    npm install
    if ($LASTEXITCODE -ne 0) {
        throw "npm install failed"
    }
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    Write-Host "Trying to fix with cache clean..." -ForegroundColor Yellow
    npm cache clean --force
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Installation failed. Please check your internet connection and try again." -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

Write-Host ""
Write-Host "🎨 Configuring Tailwind CSS..." -ForegroundColor Yellow

# Create tailwind.config.js
$tailwindConfig = @"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
      },
      boxShadow: {
        neon: '0 0 10px rgba(236, 72, 153, 0.7), 0 0 20px rgba(236, 72, 153, 0.5)',
      },
    },
  },
  plugins: [],
};
"@

Set-Content -Path "tailwind.config.js" -Value $tailwindConfig -Encoding UTF8
Write-Host "✅ tailwind.config.js configured" -ForegroundColor Green

# Create postcss.config.js
$postcssConfig = @"
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
"@

Set-Content -Path "postcss.config.js" -Value $postcssConfig -Encoding UTF8
Write-Host "✅ postcss.config.js configured" -ForegroundColor Green

# Update src/index.css
$indexCSS = @"
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
"@

Set-Content -Path "src/index.css" -Value $indexCSS -Encoding UTF8
Write-Host "✅ index.css updated with Tailwind directives" -ForegroundColor Green

Write-Host ""
Write-Host "🧪 Running tests to verify setup..." -ForegroundColor Yellow

# Run tests
try {
    npm test 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ All tests passed!" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Some tests failed, but setup is complete" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  Could not run tests, but setup should be complete" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Starting MiniKiro..." -ForegroundColor Cyan
Write-Host "Your app will open at: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Try these fun prompts:" -ForegroundColor Magenta
Write-Host "  Kid Mode: 'draw a red star', 'make a cartoon button'" -ForegroundColor White
Write-Host "  Pro Mode: 'create a glowing navbar', 'build a rest api client'" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop the server when you're done coding!" -ForegroundColor Gray
Write-Host ""

# Start the development server
try {
    npm start
} catch {
    Write-Host ""
    Write-Host "❌ Failed to start the development server" -ForegroundColor Red
    Write-Host "You can try starting it manually with: npm start" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}