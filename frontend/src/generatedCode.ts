// Mock vibe coding responses for MiniKiro
export interface CodeResponse {
  prompt: string;
  code: string;
  language: string;
}

export const mockVibeResponses: Record<string, CodeResponse> = {
  "create a red button": {
    prompt: "create a red button",
    code: `<button style="background-color: red; padding: 10px; border-radius: 5px; color: white; border: none; cursor: pointer;">
  Click Me
</button>`,
    language: "html"
  },
  "red button with hover": {
    prompt: "red button with hover",
    code: `<button 
  style="background-color: red; padding: 10px; border-radius: 5px; color: white; border: none; cursor: pointer;" 
  onmouseover="this.style.backgroundColor='darkred'" 
  onmouseout="this.style.backgroundColor='red'">
  Click Me
</button>`,
    language: "html"
  },
  "glowing navbar": {
    prompt: "glowing navbar",
    code: `<nav style="
  background: linear-gradient(45deg, #ff006e, #8338ec, #3a86ff);
  padding: 15px 30px;
  box-shadow: 0 0 20px rgba(255, 0, 110, 0.5), 0 0 40px rgba(131, 56, 236, 0.3);
  border-radius: 10px;
  margin: 20px;
  animation: glow 2s ease-in-out infinite alternate;
">
  <style>
    @keyframes glow {
      from { box-shadow: 0 0 20px rgba(255, 0, 110, 0.5), 0 0 40px rgba(131, 56, 236, 0.3); }
      to { box-shadow: 0 0 30px rgba(255, 0, 110, 0.8), 0 0 60px rgba(131, 56, 236, 0.6); }
    }
  </style>
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <h1 style="color: white; margin: 0; font-family: 'Press Start 2P', cursive; font-size: 16px;">MiniKiro</h1>
    <div style="display: flex; gap: 20px;">
      <a href="#" style="color: white; text-decoration: none; padding: 8px 16px; border-radius: 5px; transition: all 0.3s;">Home</a>
      <a href="#" style="color: white; text-decoration: none; padding: 8px 16px; border-radius: 5px; transition: all 0.3s;">About</a>
      <a href="#" style="color: white; text-decoration: none; padding: 8px 16px; border-radius: 5px; transition: all 0.3s;">Contact</a>
    </div>
  </div>
</nav>`,
    language: "html"
  },
  "blue div rounded corners": {
    prompt: "blue div rounded corners",
    code: `<div style="background-color: blue; width: 200px; height: 100px; border-radius: 15px; padding: 20px; color: white;">
  Blue rounded div
</div>`,
    language: "html"
  },
  "neon card": {
    prompt: "neon card",
    code: `<div style="
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border: 2px solid #00f5ff;
  border-radius: 15px;
  padding: 25px;
  margin: 20px;
  box-shadow: 
    0 0 20px rgba(0, 245, 255, 0.3),
    inset 0 0 20px rgba(0, 245, 255, 0.1);
  color: #00f5ff;
  font-family: 'Courier New', monospace;
  max-width: 300px;
">
  <h3 style="margin-top: 0; color: #ff00ff; text-shadow: 0 0 10px #ff00ff;">Cyber Card</h3>
  <p style="line-height: 1.6;">This is a futuristic neon-styled card with glowing borders and cyberpunk aesthetics.</p>
  <button style="
    background: linear-gradient(45deg, #ff00ff, #00f5ff);
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 0 15px rgba(255, 0, 255, 0.5);
  ">Action</button>
</div>`,
    language: "html"
  },
  "python hello world": {
    prompt: "python hello world",
    code: `def hello_world():
    print("Hello, World!")
    return "Hello, World!"

if __name__ == "__main__":
    hello_world()`,
    language: "python"
  },
  "javascript counter": {
    prompt: "javascript counter",
    code: `let counter = 0;

function increment() {
    counter++;
    document.getElementById('counter').textContent = counter;
}

function decrement() {
    counter--;
    document.getElementById('counter').textContent = counter;
}`,
    language: "javascript"
  },
  "animated loading spinner": {
    prompt: "animated loading spinner",
    code: `<div style="display: flex; justify-content: center; align-items: center; height: 100px;">
  <div style="
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #ff006e;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  "></div>
  <style>
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
</div>`,
    language: "html"
  }
};

export function generateCode(prompt: string): CodeResponse {
  const normalizedPrompt = prompt.toLowerCase().trim();
  
  // Find matching response
  for (const [key, response] of Object.entries(mockVibeResponses)) {
    if (normalizedPrompt.includes(key) || key.includes(normalizedPrompt)) {
      return response;
    }
  }
  
  // Default response for unknown prompts
  return {
    prompt: normalizedPrompt,
    code: `<!-- Generated code for: ${prompt} -->
<div style="padding: 20px; background-color: #f0f0f0; border-radius: 8px;">
  <p>Code generated for: "${prompt}"</p>
  <p>This is a placeholder implementation.</p>
</div>`,
    language: "html"
  };
}

export function formatCode(code: string, language: string): string {
  // Basic formatting logic
  switch (language) {
    case "javascript":
      return code
        .replace(/;(\s*\n)/g, ";\n")
        .replace(/\{\s*\n/g, "{\n  ")
        .replace(/\n\s*\}/g, "\n}")
        .replace(/let(\s+)(\w+)(\s*)=/g, "let $2 = ")
        .replace(/const(\s+)(\w+)(\s*)=/g, "const $2 = ");
    
    case "python":
      return code
        .replace(/def(\s+)(\w+)(\s*)\(/g, "def $2(")
        .replace(/:\s*\n/g, ":\n    ")
        .replace(/\n(\s*)(\w+)/g, "\n    $2");
    
    case "html":
      return code
        .replace(/></g, ">\n<")
        .replace(/\s+/g, " ")
        .trim();
    
    default:
      return code.trim();
  }
}