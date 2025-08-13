import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { generateCode, formatCode, CodeResponse } from './generatedCode';

function App() {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState<CodeResponse | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isFormatting, setIsFormatting] = useState(false);
  const [sanitizedHTML, setSanitizedHTML] = useState('');

  const handleGenerateCode = () => {
    if (prompt.trim()) {
      const response = generateCode(prompt);
      setGeneratedCode(response);
      setShowCode(true);
      setShowPreview(true);
    }
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

  // Update sanitized HTML when code changes
  useEffect(() => {
    if (generatedCode && (generatedCode.language === 'html' || generatedCode.language === 'javascript')) {
      const sanitized = DOMPurify.sanitize(generatedCode.code, {
        ADD_TAGS: ['button', 'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        ADD_ATTR: ['style', 'class', 'onclick', 'onmouseover', 'onmouseout'],
        ALLOW_DATA_ATTR: false
      });
      setSanitizedHTML(sanitized);
    } else {
      setSanitizedHTML('');
    }
  }, [generatedCode]);

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-press-start p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            MiniKiro
          </h1>
          <p className="text-sm text-gray-400">
            A simplified Kiro-like coding app with vibe coding
          </p>
        </header>

        {/* Prompt Input Section */}
        <div className="mb-8">
          <label 
            htmlFor="prompt-input" 
            className="block text-sm mb-2 text-pink-400"
          >
            Enter your coding prompt:
          </label>
          <textarea
            id="prompt-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Create a red button with hover effect"
            className="w-full h-32 p-4 bg-gray-800 border border-pink-500 rounded-lg text-green-400 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
            aria-label="Code generation prompt input"
          />
          <button
            onClick={handleGenerateCode}
            disabled={!prompt.trim()}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            aria-label="Generate code from prompt"
          >
            Generate Code
          </button>
        </div>

        {/* Code Output and Preview Section */}
        {generatedCode && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg text-purple-400">Generated Code & Preview:</h2>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={toggleCodeVisibility}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transform transition-all duration-200"
                  aria-expanded={showCode}
                  aria-controls="code-output"
                  aria-label={showCode ? "Hide code" : "Show code"}
                >
                  {showCode ? 'Hide Code' : 'Show Code'}
                </button>
                <button
                  onClick={togglePreviewVisibility}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold rounded-lg hover:scale-105 transform transition-all duration-200"
                  aria-expanded={showPreview}
                  aria-controls="preview-output"
                  aria-label={showPreview ? "Hide preview" : "Show preview"}
                >
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>
                <button
                  onClick={handleFormatCode}
                  disabled={isFormatting}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:scale-105 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  aria-label="Format code using agent hook"
                >
                  {isFormatting ? 'Formatting...' : 'Format Code'}
                </button>
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
                  <div className="absolute top-2 right-2 text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded z-10">
                    {generatedCode.language}
                  </div>
                  <pre className="bg-gray-800 border border-green-500 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto shadow-neon min-h-[200px]">
                    <code>{generatedCode.code}</code>
                  </pre>
                  <div className="mt-2 text-xs text-gray-500">
                    Prompt: "{generatedCode.prompt}"
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
                  <div className="absolute top-2 right-2 text-xs text-gray-500 bg-white px-2 py-1 rounded z-10">
                    Preview
                  </div>
                  <div 
                    className="bg-white border-2 border-pink-500 rounded-lg p-4 min-h-[200px] shadow-neon"
                    dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
                  />
                  <div className="mt-2 text-xs text-gray-500">
                    Live preview of generated HTML/CSS/JS
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
                  <div className="bg-gray-800 border-2 border-yellow-500 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
                    <div className="text-center text-yellow-400">
                      <p className="text-sm mb-2">Preview not available</p>
                      <p className="text-xs text-gray-500">
                        Preview only supports HTML/CSS/JavaScript code
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
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
        <footer className="text-center text-xs text-gray-600 mt-12">
          <p>Built for Code with Kiro Hackathon</p>
          <p className="mt-1">Powered by React, TypeScript & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
