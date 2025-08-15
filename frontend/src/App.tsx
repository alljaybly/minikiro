import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import html2canvas from 'html2canvas';
import { generateCode, formatCode, CodeResponse, realTimeCodeMap } from './generatedCode';

interface Badge {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  icon: string;
}

function App() {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState<CodeResponse | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isFormatting, setIsFormatting] = useState(false);
  const [sanitizedHTML, setSanitizedHTML] = useState('');
  const [isKidMode, setIsKidMode] = useState(true);
  const [showPromptLibrary, setShowPromptLibrary] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState('');
  const [badges, setBadges] = useState<Badge[]>([
    { id: '1', name: 'Star Coder', description: 'Created your first star!', earned: false, icon: '⭐' },
    { id: '2', name: 'Button Master', description: 'Made an awesome button!', earned: false, icon: '🔘' },
    { id: '3', name: 'Rainbow Artist', description: 'Drew a beautiful rainbow!', earned: false, icon: '🌈' },
    { id: '4', name: 'Pro Developer', description: 'Switched to Pro Mode!', earned: false, icon: '💻' },
    { id: '5', name: 'Code Sharer', description: 'Shared your first code card!', earned: false, icon: '📤' }
  ]);
  const [easterEggActive, setEasterEggActive] = useState(false);

  const handleGenerateCode = () => {
    if (prompt.trim()) {
      const response = generateCode(prompt);
      setGeneratedCode(response);
      setShowCode(true);
      setShowPreview(true);
      
      // Award badges based on prompt
      const normalizedPrompt = prompt.toLowerCase();
      if (normalizedPrompt.includes('star')) {
        awardBadge('1');
        showLearningTip(isKidMode ? 'SVG draws shapes! ⭐' : 'SVG is great for scalable graphics!');
      } else if (normalizedPrompt.includes('button')) {
        awardBadge('2');
        showLearningTip(isKidMode ? 'CSS adds colors! 🎨' : 'Use CSS transitions for smooth animations!');
      } else if (normalizedPrompt.includes('rainbow')) {
        awardBadge('3');
        showLearningTip(isKidMode ? 'Colors make everything pretty! 🌈' : 'SVG paths create smooth curves!');
      }
      
      // Random easter egg trigger (5% chance)
      if (Math.random() < 0.05) {
        triggerEasterEgg();
      }
    }
  };

  const awardBadge = (badgeId: string) => {
    setBadges(prev => prev.map(badge => 
      badge.id === badgeId ? { ...badge, earned: true } : badge
    ));
  };

  const showLearningTip = (tip: string) => {
    setCurrentTip(tip);
    setShowTip(true);
    setTimeout(() => setShowTip(false), 3000);
  };

  const triggerEasterEgg = () => {
    setEasterEggActive(true);
    setTimeout(() => setEasterEggActive(false), 3000);
  };

  const handleFormatCode = async () => {
    if (generatedCode) {
      setIsFormatting(true);
      // Simulate agent hook processing
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const formattedCode = formatCode(generatedCode.code, generatedCode.language);
      setGeneratedCode({
        ...generatedCode,
        code: formattedCode
      });
      setIsFormatting(false);
      
      // Log hook action
      console.log('Format hook triggered:', {
        timestamp: new Date().toISOString(),
        action: 'format_code',
        language: generatedCode.language
      });
    }
  };

  const toggleCodeVisibility = () => {
    setShowCode(!showCode);
  };

  const togglePreviewVisibility = () => {
    setShowPreview(!showPreview);
  };

  const toggleMode = () => {
    setIsKidMode(!isKidMode);
    if (!isKidMode) {
      awardBadge('4'); // Pro Developer badge
    }
    showLearningTip(isKidMode ? 'Welcome to Pro Mode! 💻' : 'Welcome to Kid Mode! 🎨');
  };

  const handlePromptSelect = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
    setShowPromptLibrary(false);
  };

  const shareCodeCard = async () => {
    if (!generatedCode) return;
    
    try {
      const element = document.getElementById('preview-output');
      if (element) {
        const canvas = await html2canvas(element);
        const link = document.createElement('a');
        link.download = `minikiro-code-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
        awardBadge('5'); // Code Sharer badge
        showLearningTip('Code card saved! 📤');
      }
    } catch (error) {
      console.error('Error generating code card:', error);
    }
  };

  const downloadCode = () => {
    if (!generatedCode) return;
    
    const blob = new Blob([generatedCode.code], { type: 'text/html' });
    const link = document.createElement('a');
    link.download = `minikiro-code-${Date.now()}.html`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  // Update sanitized HTML when code changes
  useEffect(() => {
    if (generatedCode && (generatedCode.language === 'html' || generatedCode.language === 'javascript')) {
      const sanitized = DOMPurify.sanitize(generatedCode.code, {
        ADD_TAGS: ['button', 'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'svg', 'polygon', 'circle', 'path', 'text', 'nav', 'ul', 'li', 'a', 'style', 'input', 'textarea', 'select', 'option', 'label'],
        ADD_ATTR: ['style', 'class', 'onclick', 'onmouseover', 'onmouseout', 'width', 'height', 'viewBox', 'points', 'fill', 'stroke', 'stroke-width', 'cx', 'cy', 'r', 'd', 'x', 'y', 'text-anchor', 'font-family', 'font-size', 'href', 'type', 'placeholder'],
        ALLOW_DATA_ATTR: false
      });
      setSanitizedHTML(sanitized);
    } else {
      setSanitizedHTML('');
    }
  }, [generatedCode]);

  const kidPrompts = [
    'draw a red star',
    'make a cartoon button', 
    'draw a rainbow',
    'create a smiley face',
    'make a bouncing ball'
  ];

  const proPrompts = [
    'create a glowing navbar',
    'build a rest api client',
    'create a data dashboard',
    'animated loading spinner',
    'neon card'
  ];

  return (
    <div className={`min-h-screen p-6 transition-all duration-500 ${
      isKidMode 
        ? 'bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-500 text-white' 
        : 'bg-gray-900 text-green-400'
    } font-press-start`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 relative">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setShowBadges(!showBadges)}
              className="px-4 py-2 bg-yellow-500 text-black rounded-full hover:scale-105 transform transition-all duration-200"
            >
              🏆 Badges ({badges.filter(b => b.earned).length})
            </button>
            
            <h1 className={`text-4xl ${
              isKidMode 
                ? 'text-white drop-shadow-lg' 
                : 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600'
            }`}>
              MiniKiro
            </h1>
            
            <button
              onClick={toggleMode}
              className={`px-6 py-3 rounded-full text-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                isKidMode
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-gradient-to-r from-yellow-400 to-pink-400 text-black'
              }`}
            >
              {isKidMode ? '🎓 Pro Mode' : '🎨 Kid Mode'}
            </button>
          </div>
          
          <p className={`text-sm ${isKidMode ? 'text-white' : 'text-gray-400'}`}>
            {isKidMode 
              ? '🌟 Kid Mode (Ages 6-16) - Learn coding with fun!' 
              : '💻 Pro Mode (Ages 17+) - Advanced development tools'
            }
          </p>
        </header>

        {/* Badges Modal */}
        {showBadges && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">🏆 Your Badges</h3>
                <button 
                  onClick={() => setShowBadges(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >×</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {badges.map(badge => (
                  <div key={badge.id} className={`p-4 rounded-lg text-center ${
                    badge.earned ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-gray-100'
                  }`}>
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <div className={`font-bold text-sm ${badge.earned ? 'text-yellow-800' : 'text-gray-500'}`}>
                      {badge.name}
                    </div>
                    <div className={`text-xs ${badge.earned ? 'text-yellow-600' : 'text-gray-400'}`}>
                      {badge.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Learning Tip */}
        {showTip && (
          <div className="fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-40 animate-bounce">
            <div className="flex items-center">
              <span className="text-2xl mr-2">💡</span>
              <span>{currentTip}</span>
            </div>
          </div>
        )}

        {/* Easter Egg */}
        {easterEggActive && (
          <div className="fixed inset-0 pointer-events-none z-30">
            <div className="absolute top-10 left-10 text-6xl animate-ping">🚀</div>
            <div className="absolute top-20 right-20 text-4xl animate-bounce">⭐</div>
            <div className="absolute bottom-20 left-20 text-5xl animate-spin">🎮</div>
            <style>{`
              @keyframes fly {
                0% { transform: translateX(-100px) translateY(0px); }
                100% { transform: translateX(100vw) translateY(-50px); }
              }
            `}</style>
          </div>
        )}

        {/* Prompt Input Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <label 
              htmlFor="prompt-input" 
              className={`block text-sm ${isKidMode ? 'text-white' : 'text-pink-400'}`}
            >
              {isKidMode ? '🎨 What do you want to create?' : '💻 Enter your coding prompt:'}
            </label>
            <button
              onClick={() => setShowPromptLibrary(!showPromptLibrary)}
              className={`px-4 py-2 rounded-lg font-bold transition-all duration-200 hover:scale-105 ${
                isKidMode 
                  ? 'bg-white text-purple-600' 
                  : 'bg-purple-600 text-white'
              }`}
            >
              📚 Prompt Library
            </button>
          </div>

          {/* Prompt Library */}
          {showPromptLibrary && (
            <div className={`mb-4 p-4 rounded-lg ${
              isKidMode ? 'bg-white bg-opacity-20' : 'bg-gray-800'
            }`}>
              <h4 className={`font-bold mb-3 ${isKidMode ? 'text-white' : 'text-green-400'}`}>
                {isKidMode ? '🎨 Fun Prompts for Kids:' : '💻 Pro Prompts:'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {(isKidMode ? kidPrompts : proPrompts).map((promptText, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptSelect(promptText)}
                    className={`p-3 rounded-lg text-left transition-all duration-200 hover:scale-105 ${
                      isKidMode 
                        ? 'bg-white bg-opacity-30 text-white hover:bg-opacity-40' 
                        : 'bg-gray-700 text-green-400 hover:bg-gray-600'
                    }`}
                  >
                    {promptText}
                  </button>
                ))}
              </div>
            </div>
          )}

          <textarea
            id="prompt-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={isKidMode ? "e.g., draw a red star" : "e.g., Create a glowing navbar"}
            className={`w-full h-32 p-4 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:border-transparent resize-none transition-all duration-200 ${
              isKidMode 
                ? 'bg-white bg-opacity-20 border-2 border-white text-white placeholder-white placeholder-opacity-70 focus:ring-white focus:bg-opacity-30' 
                : 'bg-gray-800 border border-pink-500 text-green-400 focus:ring-pink-500'
            }`}
            aria-label="Code generation prompt input"
          />
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleGenerateCode}
              disabled={!prompt.trim()}
              className={`px-6 py-3 font-bold rounded-lg hover:scale-105 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                isKidMode 
                  ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white' 
                  : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
              }`}
              aria-label="Generate code from prompt"
            >
              {isKidMode ? '✨ Create Magic!' : '🚀 Generate Code'}
            </button>
          </div>
        </div>

        {/* Code Output and Preview Section */}
        {generatedCode && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <h2 className={`text-lg ${isKidMode ? 'text-white' : 'text-purple-400'}`}>
                {isKidMode ? '🎨 Your Creation:' : '💻 Generated Code & Preview:'}
              </h2>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={toggleCodeVisibility}
                  className={`px-4 py-2 font-bold rounded-lg hover:scale-105 transform transition-all duration-200 ${
                    isKidMode 
                      ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white' 
                      : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  }`}
                  aria-expanded={showCode}
                  aria-controls="code-output"
                  aria-label={showCode ? "Hide code" : "Show code"}
                >
                  {showCode ? (isKidMode ? '🙈 Hide Code' : 'Hide Code') : (isKidMode ? '👀 Show Code' : 'Show Code')}
                </button>
                <button
                  onClick={togglePreviewVisibility}
                  className={`px-4 py-2 font-bold rounded-lg hover:scale-105 transform transition-all duration-200 ${
                    isKidMode 
                      ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' 
                      : 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
                  }`}
                  aria-expanded={showPreview}
                  aria-controls="preview-output"
                  aria-label={showPreview ? "Hide preview" : "Show preview"}
                >
                  {showPreview ? (isKidMode ? '🙈 Hide Preview' : 'Hide Preview') : (isKidMode ? '✨ Show Preview' : 'Show Preview')}
                </button>
                <button
                  onClick={handleFormatCode}
                  disabled={isFormatting}
                  className={`px-4 py-2 font-bold rounded-lg hover:scale-105 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    isKidMode 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                  }`}
                  aria-label="Format code using agent hook"
                >
                  {isFormatting ? '⏳ Formatting...' : (isKidMode ? '✨ Make Pretty' : 'Format Code')}
                </button>
                <button
                  onClick={shareCodeCard}
                  className={`px-4 py-2 font-bold rounded-lg hover:scale-105 transform transition-all duration-200 ${
                    isKidMode 
                      ? 'bg-gradient-to-r from-pink-400 to-red-500 text-white' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                  }`}
                  aria-label="Share code as image"
                >
                  {isKidMode ? '📸 Share Card' : '📤 Share Code'}
                </button>
                {!isKidMode && (
                  <button
                    onClick={downloadCode}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transform transition-all duration-200"
                    aria-label="Download code as HTML file"
                  >
                    💾 Download
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Code Output */}
              {showCode && (
                <div 
                  id="code-output"
                  className="relative"
                  role="region"
                  aria-label="Generated code output"
                >
                  <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded z-10 ${
                    isKidMode ? 'text-white bg-purple-500' : 'text-gray-500 bg-gray-800'
                  }`}>
                    {generatedCode.language}
                  </div>
                  <pre className={`rounded-lg p-4 font-mono text-sm overflow-x-auto min-h-[200px] ${
                    isKidMode 
                      ? 'bg-white bg-opacity-20 border-2 border-white text-white shadow-lg' 
                      : 'bg-gray-800 border border-green-500 text-green-400 shadow-neon'
                  }`}>
                    <code>{generatedCode.code}</code>
                  </pre>
                  <div className={`mt-2 text-xs ${isKidMode ? 'text-white' : 'text-gray-500'}`}>
                    {isKidMode ? '🎨 Created from: ' : 'Prompt: '}"{generatedCode.prompt}"
                  </div>
                </div>
              )}

              {/* Preview Window */}
              {showPreview && (generatedCode.language === 'html' || generatedCode.language === 'javascript') && (
                <div 
                  id="preview-output"
                  className="relative"
                  role="region"
                  aria-label="Code preview output"
                >
                  <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded z-10 ${
                    isKidMode ? 'text-purple-600 bg-white' : 'text-gray-500 bg-white'
                  }`}>
                    {isKidMode ? '✨ Magic!' : 'Preview'}
                  </div>
                  <div 
                    className={`bg-white rounded-lg p-4 min-h-[200px] ${
                      isKidMode 
                        ? 'border-4 border-yellow-400 shadow-xl' 
                        : 'border-2 border-pink-500 shadow-neon'
                    }`}
                    dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
                  />
                  <div className={`mt-2 text-xs ${isKidMode ? 'text-white' : 'text-gray-500'}`}>
                    {isKidMode ? '🌟 Your creation comes to life!' : 'Live preview of generated HTML/CSS/JS'}
                  </div>
                </div>
              )}

              {/* Python/Other Code Message */}
              {showPreview && generatedCode.language !== 'html' && generatedCode.language !== 'javascript' && (
                <div 
                  id="preview-output"
                  className="relative"
                  role="region"
                  aria-label="Code preview output"
                >
                  <div className={`rounded-lg p-4 min-h-[200px] flex items-center justify-center ${
                    isKidMode 
                      ? 'bg-white bg-opacity-20 border-2 border-yellow-400' 
                      : 'bg-gray-800 border-2 border-yellow-500'
                  }`}>
                    <div className={`text-center ${isKidMode ? 'text-white' : 'text-yellow-400'}`}>
                      <p className="text-sm mb-2">
                        {isKidMode ? '🤖 This code runs in the computer!' : 'Preview not available'}
                      </p>
                      <p className={`text-xs ${isKidMode ? 'text-white' : 'text-gray-500'}`}>
                        {isKidMode 
                          ? 'Some code needs special programs to show pictures!' 
                          : 'Preview only supports HTML/CSS/JavaScript code'
                        }
                      </p>
                      <p className={`text-xs mt-1 ${isKidMode ? 'text-white' : 'text-gray-500'}`}>
                        Current language: {generatedCode.language}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className={`text-center text-xs mt-12 ${isKidMode ? 'text-white' : 'text-gray-600'}`}>
          <p>{isKidMode ? '🎉 Built for Code with Kiro Hackathon 🎉' : 'Built for Code with Kiro Hackathon'}</p>
          <p className="mt-1">
            {isKidMode ? '✨ Made with React, TypeScript & Tailwind CSS ✨' : 'Powered by React, TypeScript & Tailwind CSS'}
          </p>
          <p className="mt-2">
            {isKidMode ? '🌟 Keep coding and creating amazing things! 🌟' : '💻 Showcasing the future of AI-assisted development'}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
