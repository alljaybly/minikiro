import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { HfInference } from '@huggingface/inference';
import { generateCode, formatCode, CodeResponse } from './generatedCode';

interface Badge {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  icon: string;
}

interface CustomPrompt {
  id: string;
  title: string;
  description: string;
  language: string;
  createdAt: string;
  isKidMode: boolean;
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
    { id: '5', name: 'Code Sharer', description: 'Shared your first code card!', earned: false, icon: '📤' },
    { id: '6', name: 'Prompt Creator', description: 'Created your first custom prompt!', earned: false, icon: '✨' },
    { id: '7', name: 'Bird Artist', description: 'Created a flying bird animation!', earned: false, icon: '🐦' },
    { id: '8', name: 'Horse Animator', description: 'Created a running horse animation!', earned: false, icon: '🐎' }
  ]);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [customPrompts, setCustomPrompts] = useState<CustomPrompt[]>([]);
  const [showAddPrompt, setShowAddPrompt] = useState(false);
  const [newPromptTitle, setNewPromptTitle] = useState('');
  const [newPromptDescription, setNewPromptDescription] = useState('');
  const [newPromptLanguage, setNewPromptLanguage] = useState('html');
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiError, setApiError] = useState('');

  // Initialize Hugging Face client
  const hfClient = process.env.REACT_APP_HF_TOKEN ? new HfInference(process.env.REACT_APP_HF_TOKEN) : null;

  const handleGenerateCode = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setApiError('');
    
    try {
      let response: CodeResponse;
      const correctedPrompt = correctTypos(prompt);
      
      // Try local generation first
      response = generateCode(correctedPrompt);
      
      // If it's a generic response and we have API access, try Hugging Face
      if (response && response.code.includes('Interactive Creation') && hfClient && process.env.REACT_APP_HF_TOKEN) {
        try {
          const apiPrompt = `Generate complete, self-contained HTML/CSS/JS code (no external dependencies) for: ${correctedPrompt}

Requirements:
- Include all CSS inline in <style> tags
- Include all JavaScript inline in <script> tags
- Make it interactive and functional
- Use canvas for games if needed
- Ensure it works offline in any browser

Code:`;

          const result = await hfClient.textGeneration({
            model: 'bigcode/starcoder',
            inputs: apiPrompt,
            parameters: {
              max_new_tokens: 800,
              temperature: 0.3,
              return_full_text: false,
              stop: ['</html>', '```']
            }
          });
          
          let generatedText = result.generated_text || '';
          
          // Clean up the generated code
          generatedText = generatedText
            .replace(/```[\s\S]*?```/g, '') // Remove markdown code blocks
            .replace(/^[\s\S]*?(<[^>]+>)/m, '$1') // Start from first HTML tag
            .trim();
          
          // If it doesn't look like HTML, wrap it
          if (!generatedText.includes('<') || !generatedText.includes('>')) {
            generatedText = `<div style="padding: 20px; font-family: Arial, sans-serif;">
  <h3>Generated Code</h3>
  <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px;">${generatedText}</pre>
</div>`;
          }
          
          response = {
            prompt: correctedPrompt,
            code: generatedText,
            language: detectLanguage(generatedText) || 'html',
            points: calculatePoints(correctedPrompt)
          };
          
          // Store custom prompt in localStorage
          const updatedCustomPrompts = [...customPrompts, {
            id: Date.now().toString(),
            title: correctedPrompt,
            description: correctedPrompt,
            language: response.language,
            createdAt: new Date().toISOString(),
            isKidMode: isKidMode
          }];
          setCustomPrompts(updatedCustomPrompts);
          localStorage.setItem('minikiro_custom_prompts', JSON.stringify(updatedCustomPrompts));
          
        } catch (apiErr) {
          console.warn('Hugging Face API failed, using local fallback:', apiErr);
          // Keep the local response
        }
      }
      
      setGeneratedCode(response);
      setShowCode(true);
      setShowPreview(true);
      
      // Award badges based on prompt
      const normalizedPrompt = correctedPrompt.toLowerCase();
      if (normalizedPrompt.includes('star')) {
        awardBadge('1');
        showLearningTip(isKidMode ? 'SVG draws shapes! ⭐' : 'SVG is great for scalable graphics!');
      } else if (normalizedPrompt.includes('button')) {
        awardBadge('2');
        showLearningTip(isKidMode ? 'CSS adds colors! 🎨' : 'Use CSS transitions for smooth animations!');
      } else if (normalizedPrompt.includes('rainbow')) {
        awardBadge('3');
        showLearningTip(isKidMode ? 'Colors make everything pretty! 🌈' : 'SVG paths create smooth curves!');
      } else if (normalizedPrompt.includes('bird') || normalizedPrompt.includes('flying')) {
        awardBadge('7');
        showLearningTip(isKidMode ? 'Animations make things come alive! 🐦' : 'SVG animations use SMIL for smooth motion!');
      } else if (normalizedPrompt.includes('horse') || normalizedPrompt.includes('running')) {
        awardBadge('8');
        showLearningTip(isKidMode ? 'Horses can run so fast! 🐎' : 'Complex SVG animations with multiple moving parts!');
      }
      
      // Random easter egg trigger (5% chance)
      if (Math.random() < 0.05) {
        triggerEasterEgg();
      }
    } catch (error) {
      console.error('Code generation failed:', error);
      setApiError('Failed to generate code. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Add typo correction function
  const correctTypos = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\bim\b/g, 'in')
      .replace(/\bdirecion\b/g, 'direction')
      .replace(/\bdireciton\b/g, 'direction')
      .replace(/\bswype\b/g, 'swipe')
      .replace(/\bmove\s+im\s+the\s+direcion/g, 'move in the direction')
      .replace(/\bmove\s+in\s+the\s+direcion/g, 'move in the direction')
      .replace(/\bcreat\b/g, 'create')
      .replace(/\bmak\b/g, 'make')
      .replace(/\bbuton\b/g, 'button')
      .replace(/\bnavbr\b/g, 'navbar')
      .replace(/\bnavigaton\b/g, 'navigation')
      .replace(/\banimaton\b/g, 'animation')
      .replace(/\binteractiv\b/g, 'interactive')
      .replace(/\bgam\b/g, 'game')
      .replace(/\bsoccer\s+bal\b/g, 'soccer ball')
      .replace(/\bfootbal\b/g, 'football')
      .replace(/\bcanvs\b/g, 'canvas')
      .replace(/\bpixl\b/g, 'pixel')
      .replace(/\bart\b/g, 'art');
  };

  const detectLanguage = (code: string): string => {
    if (code.includes('<') && code.includes('>')) return 'html';
    if (code.includes('def ') || code.includes('import ')) return 'python';
    if (code.includes('function') || code.includes('const ') || code.includes('let ')) return 'javascript';
    return 'html';
  };

  const calculatePoints = (prompt: string): number => {
    const complexity = prompt.split(' ').length;
    if (complexity <= 3) return 10;
    if (complexity <= 6) return 25;
    if (complexity <= 10) return 50;
    return 100;
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
      // Create complete HTML file with embedded CSS and JS
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MiniKiro Generated Code - ${generatedCode.prompt}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
    
    body {
      font-family: 'Press Start 2P', cursive;
      margin: 0;
      padding: 20px;
      background: linear-gradient(135deg, #1a202c, #2d3748);
      color: #48bb78;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .container {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 0 20px rgba(72, 187, 120, 0.3);
      max-width: 800px;
      width: 100%;
    }
    
    .header {
      text-align: center;
      margin-bottom: 20px;
      color: #ed64a6;
      font-size: 12px;
    }
    
    .content {
      background: white;
      border-radius: 8px;
      padding: 20px;
      color: #333;
      font-family: Arial, sans-serif;
    }
    
    canvas {
      border: 2px solid #ed64a6;
      border-radius: 8px;
      box-shadow: 0 0 15px rgba(237, 100, 166, 0.5);
    }
    
    button {
      font-family: 'Press Start 2P', cursive;
      font-size: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎮 MiniKiro Generated Code</h1>
      <p>Prompt: "${generatedCode.prompt}"</p>
      <p>Generated on: ${new Date().toLocaleDateString()}</p>
    </div>
    <div class="content">
      ${DOMPurify.sanitize(generatedCode.code, {
        ADD_TAGS: ['script', 'canvas', 'button', 'div', 'span', 'p', 'h1', 'h2', 'h3', 'svg', 'polygon', 'circle', 'path', 'text', 'nav', 'ul', 'li', 'a', 'style', 'ellipse', 'rect', 'g', 'animate', 'animateTransform'],
        ADD_ATTR: ['id', 'style', 'width', 'height', 'onclick', 'onmouseover', 'onmouseout', 'onmousedown', 'onmouseup', 'onmousemove', 'ontouchstart', 'ontouchmove', 'ontouchend', 'class', 'viewBox', 'points', 'fill', 'stroke', 'stroke-width', 'cx', 'cy', 'r', 'd', 'x', 'y', 'text-anchor', 'font-family', 'font-size', 'href', 'touch-action', 'rx', 'ry', 'opacity', 'attributeName', 'attributeType', 'type', 'from', 'to', 'dur', 'repeatCount', 'values', 'additive', 'transform'],
        ALLOW_DATA_ATTR: false,
        ALLOW_UNKNOWN_PROTOCOLS: false
      })}
    </div>
    <div class="header" style="margin-top: 20px; font-size: 8px;">
      <p>Created with MiniKiro - Learn coding with fun!</p>
      <p>Visit: https://github.com/alljaybly/minikiro</p>
    </div>
  </div>
</body>
</html>`;

      // Create and download the HTML file
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `minikiro-${generatedCode.prompt.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      awardBadge('5'); // Code Sharer badge
      showLearningTip(isKidMode ? 'HTML file saved! Open it in your browser! 🌐' : 'Complete HTML file downloaded! 📤');
    } catch (error) {
      console.error('Error generating HTML file:', error);
      setApiError('Failed to create HTML file. Please try again.');
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

  const handleAddCustomPrompt = () => {
    if (!newPromptTitle.trim() || !newPromptDescription.trim()) return;
    
    const newPrompt: CustomPrompt = {
      id: Date.now().toString(),
      title: newPromptTitle.trim(),
      description: newPromptDescription.trim(),
      language: newPromptLanguage,
      createdAt: new Date().toISOString(),
      isKidMode: isKidMode
    };
    
    const updatedPrompts = [...customPrompts, newPrompt];
    setCustomPrompts(updatedPrompts);
    localStorage.setItem('minikiro_custom_prompts', JSON.stringify(updatedPrompts));
    
    // Award badge for creating first custom prompt
    awardBadge('6');
    showLearningTip(isKidMode ? 'You created your own prompt! 🌟' : 'Custom prompt added to library! ✨');
    
    // Reset form
    setNewPromptTitle('');
    setNewPromptDescription('');
    setNewPromptLanguage('html');
    setShowAddPrompt(false);
  };

  const handleSelectCustomPrompt = (customPrompt: CustomPrompt) => {
    setPrompt(customPrompt.description);
    setNewPromptLanguage(customPrompt.language);
    setShowPromptLibrary(false);
  };

  // Load custom prompts from localStorage on component mount
  useEffect(() => {
    const savedPrompts = localStorage.getItem('minikiro_custom_prompts');
    if (savedPrompts) {
      try {
        setCustomPrompts(JSON.parse(savedPrompts));
      } catch (error) {
        console.error('Failed to load custom prompts:', error);
      }
    }
  }, []);

  // Update sanitized HTML when code changes
  useEffect(() => {
    if (generatedCode && (generatedCode.language === 'html' || generatedCode.language === 'javascript')) {
      const sanitized = DOMPurify.sanitize(generatedCode.code, {
        ADD_TAGS: ['button', 'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'svg', 'polygon', 'circle', 'path', 'text', 'nav', 'ul', 'li', 'a', 'style', 'input', 'textarea', 'select', 'option', 'label', 'canvas', 'script', 'ellipse', 'rect', 'g', 'animate', 'animateTransform'],
        ADD_ATTR: ['style', 'class', 'onclick', 'onmouseover', 'onmouseout', 'onmousedown', 'onmouseup', 'onmousemove', 'ontouchstart', 'ontouchmove', 'ontouchend', 'width', 'height', 'viewBox', 'points', 'fill', 'stroke', 'stroke-width', 'cx', 'cy', 'r', 'd', 'x', 'y', 'text-anchor', 'font-family', 'font-size', 'href', 'type', 'placeholder', 'id', 'touch-action', 'rx', 'ry', 'opacity', 'attributeName', 'attributeType', 'type', 'from', 'to', 'dur', 'repeatCount', 'values', 'additive', 'transform'],
        ALLOW_DATA_ATTR: false,
        ALLOW_UNKNOWN_PROTOCOLS: false
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
    'make a bouncing ball',
    'draw a flying bird',
    'draw a running horse'
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
            <div className="flex gap-2">
              <button
                onClick={() => setShowBadges(!showBadges)}
                className="px-4 py-2 bg-yellow-500 text-black rounded-full hover:scale-105 transform transition-all duration-200"
              >
                🏆 Badges ({badges.filter(b => b.earned).length})
              </button>
              <a
                href="https://github.com/alljaybly/minikiro/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:scale-105 transform transition-all duration-200"
                aria-label="Open setup guide in new tab"
              >
                📚 Setup Guide
              </a>
            </div>
            
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
              <div className="flex justify-between items-center mb-3">
                <h4 className={`font-bold ${isKidMode ? 'text-white' : 'text-green-400'}`}>
                  {isKidMode ? '🎨 Fun Prompts for Kids:' : '💻 Pro Prompts:'}
                </h4>
                <button
                  onClick={() => setShowAddPrompt(!showAddPrompt)}
                  className={`px-3 py-1 rounded-lg text-sm font-bold transition-all duration-200 hover:scale-105 ${
                    isKidMode 
                      ? 'bg-yellow-400 text-purple-800' 
                      : 'bg-purple-600 text-white'
                  }`}
                >
                  {showAddPrompt ? '❌ Cancel' : '➕ Add Prompt'}
                </button>
              </div>

              {/* Add Custom Prompt Form */}
              {showAddPrompt && (
                <div className={`mb-4 p-4 rounded-lg border-2 ${
                  isKidMode ? 'bg-white bg-opacity-10 border-yellow-400' : 'bg-gray-700 border-purple-500'
                }`}>
                  <h5 className={`font-bold mb-3 ${isKidMode ? 'text-white' : 'text-purple-400'}`}>
                    {isKidMode ? '✨ Create Your Own Prompt!' : '🛠 Create Custom Prompt'}
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm mb-1 ${isKidMode ? 'text-white' : 'text-gray-300'}`}>
                        {isKidMode ? '🏷 Name:' : 'Title:'}
                      </label>
                      <input
                        type="text"
                        value={newPromptTitle}
                        onChange={(e) => setNewPromptTitle(e.target.value)}
                        placeholder={isKidMode ? "My Cool Idea" : "Custom Prompt Title"}
                        className={`w-full p-2 rounded text-sm ${
                          isKidMode 
                            ? 'bg-white bg-opacity-30 text-white placeholder-white placeholder-opacity-70' 
                            : 'bg-gray-600 text-white placeholder-gray-400'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm mb-1 ${isKidMode ? 'text-white' : 'text-gray-300'}`}>
                        {isKidMode ? '🎨 Type:' : 'Language:'}
                      </label>
                      <select
                        value={newPromptLanguage}
                        onChange={(e) => setNewPromptLanguage(e.target.value)}
                        className={`w-full p-2 rounded text-sm ${
                          isKidMode 
                            ? 'bg-white bg-opacity-30 text-white' 
                            : 'bg-gray-600 text-white'
                        }`}
                      >
                        <option value="html">{isKidMode ? '🌐 Web Page' : 'HTML/CSS'}</option>
                        <option value="javascript">{isKidMode ? '⚡ Interactive' : 'JavaScript'}</option>
                        <option value="python">{isKidMode ? '🐍 Python' : 'Python'}</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className={`block text-sm mb-1 ${isKidMode ? 'text-white' : 'text-gray-300'}`}>
                      {isKidMode ? '📝 What should it do?' : 'Description:'}
                    </label>
                    <textarea
                      value={newPromptDescription}
                      onChange={(e) => setNewPromptDescription(e.target.value)}
                      placeholder={isKidMode ? "Make a dancing cat with rainbow colors" : "Create a responsive navigation bar with hover effects"}
                      className={`w-full p-2 rounded text-sm h-20 resize-none ${
                        isKidMode 
                          ? 'bg-white bg-opacity-30 text-white placeholder-white placeholder-opacity-70' 
                          : 'bg-gray-600 text-white placeholder-gray-400'
                      }`}
                    />
                  </div>
                  <button
                    onClick={handleAddCustomPrompt}
                    disabled={!newPromptTitle.trim() || !newPromptDescription.trim()}
                    className={`mt-3 px-4 py-2 rounded-lg font-bold transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                      isKidMode 
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                    }`}
                  >
                    {isKidMode ? '🎉 Create It!' : '✨ Add Prompt'}
                  </button>
                </div>
              )}

              {/* Built-in Prompts */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
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

              {/* Custom Prompts */}
              {customPrompts.length > 0 && (
                <>
                  <h5 className={`font-bold mb-3 ${isKidMode ? 'text-white' : 'text-purple-400'}`}>
                    {isKidMode ? '🌟 Your Amazing Creations:' : '🛠 Your Custom Prompts:'}
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                    {customPrompts
                      .filter(cp => isKidMode ? cp.isKidMode : !cp.isKidMode)
                      .map((customPrompt) => (
                      <button
                        key={customPrompt.id}
                        onClick={() => handleSelectCustomPrompt(customPrompt)}
                        className={`p-3 rounded-lg text-left transition-all duration-200 hover:scale-105 border-2 ${
                          isKidMode 
                            ? 'bg-yellow-400 bg-opacity-20 text-white border-yellow-400 hover:bg-opacity-30' 
                            : 'bg-purple-600 bg-opacity-20 text-purple-300 border-purple-500 hover:bg-opacity-30'
                        }`}
                      >
                        <div className="font-bold text-sm">{customPrompt.title}</div>
                        <div className="text-xs opacity-80 mt-1">{customPrompt.description}</div>
                        <div className="text-xs opacity-60 mt-1">
                          {customPrompt.language.toUpperCase()} • {new Date(customPrompt.createdAt).toLocaleDateString()}
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
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
              disabled={!prompt.trim() || isGenerating}
              className={`px-6 py-3 font-bold rounded-lg hover:scale-105 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                isKidMode 
                  ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white' 
                  : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
              }`}
              aria-label="Generate code from prompt"
            >
              {isGenerating ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isKidMode ? 'Creating...' : 'Generating...'}
                </span>
              ) : (
                isKidMode ? '✨ Create Magic!' : '🚀 Generate Code'
              )}
            </button>
            {process.env.REACT_APP_HF_TOKEN && (
              <div className={`text-xs px-2 py-1 rounded ${isKidMode ? 'text-white' : 'text-green-400'}`}>
                🤖 AI-Powered
              </div>
            )}
          </div>
          
          {/* API Error Display */}
          {apiError && (
            <div className="mt-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg">
              <p className="text-red-400 text-sm">❌ {apiError}</p>
            </div>
          )}
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
                  aria-label="Download complete HTML file"
                >
                  {isKidMode ? '🌐 Save HTML' : '📤 Download HTML'}
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
                  <iframe
                    srcDoc={sanitizedHTML}
                    sandbox="allow-scripts allow-same-origin allow-pointer-lock"
                    className={`w-full bg-white rounded-lg min-h-[300px] ${
                      isKidMode 
                        ? 'border-4 border-yellow-400 shadow-xl' 
                        : 'border-2 border-pink-500 shadow-neon'
                    }`}
                    title="Code Preview"
                    style={{ minHeight: '300px' }}
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
