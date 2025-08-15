// Mock vibe coding responses for MiniKiro
export interface CodeResponse {
  prompt: string;
  code: string;
  language: string;
  points?: number;
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

// Real-time code generation mapping
export const realTimeCodeMap: Record<string, CodeResponse> = {
  // Kid Mode Prompts (Ages 6-16)
  "draw a red star": {
    prompt: "draw a red star",
    code: `<svg width="100" height="100" viewBox="0 0 100 100">
  <polygon points="50,10 20,90 95,35 5,35 80,90" fill="red" stroke="darkred" stroke-width="2"/>
  <text x="50" y="105" text-anchor="middle" fill="red" font-family="Arial" font-size="12">Red Star!</text>
</svg>`,
    language: "html",
    points: 10
  },
  "make a cartoon button": {
    prompt: "make a cartoon button",
    code: `<button style="
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  border: 3px solid #ff9ff3;
  border-radius: 25px;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  box-shadow: 0 8px 15px rgba(0,0,0,0.1);
  transform: scale(1);
  transition: all 0.3s ease;
" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
  🎉 Click Me! 🎉
</button>`,
    language: "html"
  },
  "draw a rainbow": {
    prompt: "draw a rainbow",
    code: `<svg width="200" height="100" viewBox="0 0 200 100">
  <path d="M 20 80 Q 100 20 180 80" stroke="red" stroke-width="8" fill="none"/>
  <path d="M 20 85 Q 100 25 180 85" stroke="orange" stroke-width="8" fill="none"/>
  <path d="M 20 90 Q 100 30 180 90" stroke="yellow" stroke-width="8" fill="none"/>
  <path d="M 20 95 Q 100 35 180 95" stroke="green" stroke-width="8" fill="none"/>
  <path d="M 20 100 Q 100 40 180 100" stroke="blue" stroke-width="8" fill="none"/>
  <path d="M 20 105 Q 100 45 180 105" stroke="indigo" stroke-width="8" fill="none"/>
  <path d="M 20 110 Q 100 50 180 110" stroke="violet" stroke-width="8" fill="none"/>
  <text x="100" y="130" text-anchor="middle" fill="#333" font-family="Arial" font-size="14">🌈 Rainbow! 🌈</text>
</svg>`,
    language: "html"
  },
  "create a smiley face": {
    prompt: "create a smiley face",
    code: `<svg width="120" height="120" viewBox="0 0 120 120">
  <circle cx="60" cy="60" r="50" fill="yellow" stroke="orange" stroke-width="3"/>
  <circle cx="45" cy="45" r="5" fill="black"/>
  <circle cx="75" cy="45" r="5" fill="black"/>
  <path d="M 40 75 Q 60 95 80 75" stroke="black" stroke-width="3" fill="none"/>
  <text x="60" y="140" text-anchor="middle" fill="orange" font-family="Arial" font-size="16">😊 Happy!</text>
</svg>`,
    language: "html"
  },
  "make a bouncing ball": {
    prompt: "make a bouncing ball",
    code: `<div style="position: relative; height: 200px; overflow: hidden;">
  <div style="
    width: 50px;
    height: 50px;
    background: radial-gradient(circle at 30% 30%, #ff6b6b, #ee5a52);
    border-radius: 50%;
    position: absolute;
    animation: bounce 2s infinite;
    box-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
  "></div>
  <style>
    @keyframes bounce {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(150px); }
    }
  </style>
  <p style="margin-top: 220px; text-align: center; color: #ff6b6b; font-weight: bold;">⚽ Bouncing Ball!</p>
</div>`,
    language: "html"
  },

  // Pro Mode Prompts (Ages 17+)
  "create a glowing navbar": {
    prompt: "create a glowing navbar",
    code: `<nav style="
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 15px 30px;
  box-shadow: 
    0 0 20px rgba(102, 126, 234, 0.5),
    0 0 40px rgba(118, 75, 162, 0.3),
    0 4px 15px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  margin: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
">
  <ul style="
    list-style: none;
    display: flex;
    justify-content: space-around;
    margin: 0;
    padding: 0;
    align-items: center;
  ">
    <li><a href="#" style="
      color: white;
      text-decoration: none;
      font-weight: 600;
      padding: 10px 20px;
      border-radius: 8px;
      transition: all 0.3s ease;
      position: relative;
    " onmouseover="this.style.background='rgba(255,255,255,0.1)'; this.style.transform='translateY(-2px)'" 
       onmouseout="this.style.background='transparent'; this.style.transform='translateY(0)'">Home</a></li>
    <li><a href="#" style="
      color: white;
      text-decoration: none;
      font-weight: 600;
      padding: 10px 20px;
      border-radius: 8px;
      transition: all 0.3s ease;
    " onmouseover="this.style.background='rgba(255,255,255,0.1)'; this.style.transform='translateY(-2px)'" 
       onmouseout="this.style.background='transparent'; this.style.transform='translateY(0)'">About</a></li>
    <li><a href="#" style="
      color: white;
      text-decoration: none;
      font-weight: 600;
      padding: 10px 20px;
      border-radius: 8px;
      transition: all 0.3s ease;
    " onmouseover="this.style.background='rgba(255,255,255,0.1)'; this.style.transform='translateY(-2px)'" 
       onmouseout="this.style.background='transparent'; this.style.transform='translateY(0)'">Contact</a></li>
  </ul>
</nav>`,
    language: "html",
    points: 50
  },
  "build a rest api client": {
    prompt: "build a rest api client",
    code: `<div style="max-width: 600px; margin: 20px auto; padding: 20px; background: #1a1a2e; border-radius: 12px; color: #eee;">
  <h3 style="color: #00f5ff; margin-bottom: 20px;">🚀 REST API Client</h3>
  <div style="margin-bottom: 15px;">
    <label style="display: block; margin-bottom: 5px; color: #00f5ff;">Method:</label>
    <select style="width: 100%; padding: 10px; background: #16213e; color: white; border: 1px solid #00f5ff; border-radius: 6px;">
      <option>GET</option>
      <option>POST</option>
      <option>PUT</option>
      <option>DELETE</option>
    </select>
  </div>
  <div style="margin-bottom: 15px;">
    <label style="display: block; margin-bottom: 5px; color: #00f5ff;">URL:</label>
    <input type="text" placeholder="https://api.example.com/users" style="width: 100%; padding: 10px; background: #16213e; color: white; border: 1px solid #00f5ff; border-radius: 6px;">
  </div>
  <div style="margin-bottom: 20px;">
    <label style="display: block; margin-bottom: 5px; color: #00f5ff;">Headers:</label>
    <textarea placeholder='{"Content-Type": "application/json"}' style="width: 100%; height: 80px; padding: 10px; background: #16213e; color: white; border: 1px solid #00f5ff; border-radius: 6px; font-family: monospace;"></textarea>
  </div>
  <button style="
    background: linear-gradient(45deg, #ff00ff, #00f5ff);
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 0 15px rgba(255, 0, 255, 0.3);
  " onclick="alert('API request would be sent!')">Send Request</button>
</div>`,
    language: "html"
  },
  "create a data dashboard": {
    prompt: "create a data dashboard",
    code: `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; padding: 20px; background: #0f0f23; min-height: 400px;">
  <div style="background: linear-gradient(135deg, #1e3c72, #2a5298); padding: 20px; border-radius: 12px; color: white;">
    <h3 style="margin: 0 0 15px 0; color: #64ffda;">📊 Sales</h3>
    <div style="font-size: 2.5em; font-weight: bold; margin-bottom: 10px;">$24,567</div>
    <div style="color: #4caf50;">↗ +12.5% from last month</div>
  </div>
  <div style="background: linear-gradient(135deg, #134e5e, #71b280); padding: 20px; border-radius: 12px; color: white;">
    <h3 style="margin: 0 0 15px 0; color: #64ffda;">👥 Users</h3>
    <div style="font-size: 2.5em; font-weight: bold; margin-bottom: 10px;">1,234</div>
    <div style="color: #4caf50;">↗ +8.3% from last week</div>
  </div>
  <div style="background: linear-gradient(135deg, #2c1810, #8b4513); padding: 20px; border-radius: 12px; color: white;">
    <h3 style="margin: 0 0 15px 0; color: #64ffda;">⚡ Performance</h3>
    <div style="font-size: 2.5em; font-weight: bold; margin-bottom: 10px;">98.7%</div>
    <div style="color: #4caf50;">↗ +2.1% uptime</div>
  </div>
  <div style="background: linear-gradient(135deg, #4a148c, #7b1fa2); padding: 20px; border-radius: 12px; color: white;">
    <h3 style="margin: 0 0 15px 0; color: #64ffda;">🎯 Conversion</h3>
    <div style="font-size: 2.5em; font-weight: bold; margin-bottom: 10px;">3.4%</div>
    <div style="color: #ff9800;">↘ -0.5% from target</div>
  </div>
</div>`,
    language: "html",
    points: 75
  },
  "make a pixel art game": {
    prompt: "make a pixel art game",
    code: `<div style="text-align: center; padding: 20px; background: #000; color: #0f0;">
  <h3 style="color: #0f0; font-family: monospace; margin-bottom: 20px;">🎮 Pixel Art Game</h3>
  <canvas id="game" width="200" height="200" style="border: 2px solid #0f0; background: #111;"></canvas>
  <div style="margin-top: 15px;">
    <button onclick="movePlayer(-10, 0)" style="background: #0f0; color: #000; border: none; padding: 10px; margin: 5px; font-weight: bold;">←</button>
    <button onclick="movePlayer(10, 0)" style="background: #0f0; color: #000; border: none; padding: 10px; margin: 5px; font-weight: bold;">→</button>
    <button onclick="movePlayer(0, -10)" style="background: #0f0; color: #000; border: none; padding: 10px; margin: 5px; font-weight: bold;">↑</button>
    <button onclick="movePlayer(0, 10)" style="background: #0f0; color: #000; border: none; padding: 10px; margin: 5px; font-weight: bold;">↓</button>
  </div>
  <script>
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    let playerX = 95, playerY = 95;
    
    function drawGame() {
      ctx.clearRect(0, 0, 200, 200);
      // Draw player (red pixel)
      ctx.fillStyle = '#f00';
      ctx.fillRect(playerX, playerY, 10, 10);
      // Draw collectible (yellow pixel)
      ctx.fillStyle = '#ff0';
      ctx.fillRect(50, 50, 10, 10);
    }
    
    function movePlayer(dx, dy) {
      playerX = Math.max(0, Math.min(190, playerX + dx));
      playerY = Math.max(0, Math.min(190, playerY + dy));
      drawGame();
    }
    
    drawGame();
  </script>
</div>`,
    language: "html",
    points: 100
  }
};

export function generateCode(prompt: string): CodeResponse {
  const normalizedPrompt = prompt.toLowerCase().trim();
  
  // Check real-time code map first
  if (realTimeCodeMap[normalizedPrompt]) {
    return realTimeCodeMap[normalizedPrompt];
  }
  
  // Check existing mock responses
  for (const [key, response] of Object.entries(mockVibeResponses)) {
    if (normalizedPrompt.includes(key) || key.includes(normalizedPrompt)) {
      return response;
    }
  }
  
  // Generate dynamic code based on keywords
  if (normalizedPrompt.includes('button')) {
    return {
      prompt: normalizedPrompt,
      code: `<button style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border: none; padding: 12px 24px; border-radius: 8px; color: white; font-weight: bold; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.2);" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
  ${prompt}
</button>`,
      language: "html"
    };
  }
  
  if (normalizedPrompt.includes('card')) {
    return {
      prompt: normalizedPrompt,
      code: `<div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 8px 25px rgba(0,0,0,0.1); max-width: 300px; margin: 20px;">
  <h3 style="color: #333; margin-bottom: 15px;">Card Title</h3>
  <p style="color: #666; line-height: 1.6;">This is a beautiful card component generated for: "${prompt}"</p>
  <button style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; margin-top: 15px;">Action</button>
</div>`,
      language: "html"
    };
  }
  
  // Default response for unknown prompts
  return {
    prompt: normalizedPrompt,
    code: `<div style="padding: 20px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; color: white; text-align: center; max-width: 400px; margin: 20px auto;">
  <h3 style="margin-bottom: 15px;">✨ Custom Code Generated</h3>
  <p style="margin-bottom: 15px;">Generated for: "${prompt}"</p>
  <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; font-family: monospace;">
    // Your custom implementation here
    console.log("${prompt}");
  </div>
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