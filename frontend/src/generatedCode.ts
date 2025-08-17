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
  },
  "draw a flying bird": {
    prompt: "draw a flying bird",
    code: `<div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #87CEEB, #98FB98); min-height: 200px;">
  <h3 style="color: #2F4F4F; margin-bottom: 20px; font-family: Arial, sans-serif;">🐦 Flying Bird Animation</h3>
  <svg width="300" height="150" viewBox="0 0 300 150" style="border: 2px solid #4682B4; border-radius: 10px; background: linear-gradient(to bottom, #87CEEB, #E0F6FF);">
    <!-- Clouds -->
    <ellipse cx="50" cy="30" rx="15" ry="8" fill="white" opacity="0.8"/>
    <ellipse cx="60" cy="25" rx="20" ry="10" fill="white" opacity="0.8"/>
    <ellipse cx="250" cy="40" rx="18" ry="9" fill="white" opacity="0.8"/>
    
    <!-- Flying Bird -->
    <g id="bird">
      <!-- Bird Body -->
      <ellipse cx="150" cy="75" rx="25" ry="15" fill="#8B4513" stroke="#654321" stroke-width="1"/>
      
      <!-- Bird Head -->
      <circle cx="125" cy="70" r="12" fill="#8B4513" stroke="#654321" stroke-width="1"/>
      
      <!-- Bird Eye -->
      <circle cx="120" cy="67" r="3" fill="white"/>
      <circle cx="119" cy="66" r="1.5" fill="black"/>
      
      <!-- Bird Beak -->
      <polygon points="108,70 115,68 115,72" fill="#FFA500"/>
      
      <!-- Bird Wings (animated) -->
      <g id="wings">
        <ellipse cx="140" cy="65" rx="20" ry="8" fill="#654321" stroke="#4A4A4A" stroke-width="1">
          <animateTransform attributeName="transform" type="rotate" 
            values="0 140 65;-20 140 65;0 140 65;20 140 65;0 140 65" 
            dur="0.5s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="160" cy="70" rx="18" ry="6" fill="#654321" stroke="#4A4A4A" stroke-width="1">
          <animateTransform attributeName="transform" type="rotate" 
            values="0 160 70;15 160 70;0 160 70;-15 160 70;0 160 70" 
            dur="0.5s" repeatCount="indefinite"/>
        </ellipse>
      </g>
      
      <!-- Bird Tail -->
      <ellipse cx="175" cy="80" rx="15" ry="5" fill="#654321" stroke="#4A4A4A" stroke-width="1"/>
      
      <!-- Flying Animation -->
      <animateTransform attributeName="transform" type="translate" 
        values="0,0;50,-10;100,-5;150,0;200,5;250,-10;300,0" 
        dur="8s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="translate" 
        values="0,5;0,-5;0,5" dur="1s" repeatCount="indefinite" additive="sum"/>
    </g>
    
    <!-- Ground -->
    <rect x="0" y="130" width="300" height="20" fill="#228B22"/>
    
    <!-- Sun -->
    <circle cx="270" cy="30" r="15" fill="#FFD700" stroke="#FFA500" stroke-width="2"/>
  </svg>
  <p style="color: #2F4F4F; margin-top: 15px; font-family: Arial, sans-serif;">Watch the bird fly across the sky! 🌤️</p>
</div>`,
    language: "html",
    points: 80
  },
  "draw a running horse": {
    prompt: "draw a running horse",
    code: `<div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #8FBC8F, #F0E68C); min-height: 200px;">
  <h3 style="color: #8B4513; margin-bottom: 20px; font-family: Arial, sans-serif;">🐎 Running Horse Animation</h3>
  <svg width="350" height="180" viewBox="0 0 350 180" style="border: 2px solid #8B4513; border-radius: 10px; background: linear-gradient(to bottom, #87CEEB, #98FB98);">
    <!-- Ground -->
    <rect x="0" y="140" width="350" height="40" fill="#228B22"/>
    <rect x="0" y="160" width="350" height="20" fill="#8B4513"/>
    
    <!-- Running Horse -->
    <g id="horse">
      <!-- Horse Body -->
      <ellipse cx="180" cy="100" rx="40" ry="20" fill="#8B4513" stroke="#654321" stroke-width="2"/>
      
      <!-- Horse Head -->
      <ellipse cx="130" cy="85" rx="18" ry="25" fill="#8B4513" stroke="#654321" stroke-width="2"/>
      
      <!-- Horse Mane -->
      <path d="M 115 70 Q 120 60 125 70 Q 130 55 135 65 Q 140 50 145 60" stroke="#654321" stroke-width="3" fill="none"/>
      
      <!-- Horse Eye -->
      <circle cx="125" cy="80" r="3" fill="black"/>
      
      <!-- Horse Nose -->
      <ellipse cx="115" cy="90" rx="4" ry="6" fill="#654321"/>
      
      <!-- Horse Ears -->
      <ellipse cx="135" cy="65" rx="4" ry="8" fill="#8B4513" stroke="#654321" stroke-width="1"/>
      <ellipse cx="140" cy="68" rx="4" ry="8" fill="#8B4513" stroke="#654321" stroke-width="1"/>
      
      <!-- Horse Legs (animated) -->
      <g id="legs">
        <!-- Front legs -->
        <rect x="155" y="115" width="6" height="25" fill="#8B4513">
          <animateTransform attributeName="transform" type="rotate" 
            values="0 158 115;15 158 115;0 158 115;-15 158 115;0 158 115" 
            dur="0.6s" repeatCount="indefinite"/>
        </rect>
        <rect x="165" y="115" width="6" height="25" fill="#8B4513">
          <animateTransform attributeName="transform" type="rotate" 
            values="0 168 115;-15 168 115;0 168 115;15 168 115;0 168 115" 
            dur="0.6s" repeatCount="indefinite"/>
        </rect>
        
        <!-- Back legs -->
        <rect x="195" y="115" width="6" height="25" fill="#8B4513">
          <animateTransform attributeName="transform" type="rotate" 
            values="0 198 115;-15 198 115;0 198 115;15 198 115;0 198 115" 
            dur="0.6s" repeatCount="indefinite"/>
        </rect>
        <rect x="205" y="115" width="6" height="25" fill="#8B4513">
          <animateTransform attributeName="transform" type="rotate" 
            values="0 208 115;15 208 115;0 208 115;-15 208 115;0 208 115" 
            dur="0.6s" repeatCount="indefinite"/>
        </rect>
      </g>
      
      <!-- Horse Tail -->
      <path d="M 220 95 Q 235 90 240 105 Q 235 120 225 115" fill="#654321" stroke="#4A4A4A" stroke-width="1">
        <animateTransform attributeName="transform" type="rotate" 
          values="0 220 95;10 220 95;-10 220 95;0 220 95" 
          dur="1s" repeatCount="indefinite"/>
      </path>
      
      <!-- Running Animation -->
      <animateTransform attributeName="transform" type="translate" 
        values="0,0;30,0;60,0;90,0;120,0;150,0;180,0" 
        dur="4s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="translate" 
        values="0,0;0,-3;0,0;0,-3;0,0" dur="0.6s" repeatCount="indefinite" additive="sum"/>
    </g>
    
    <!-- Dust clouds -->
    <g id="dust" opacity="0.6">
      <ellipse cx="200" cy="135" rx="8" ry="4" fill="#D2B48C">
        <animateTransform attributeName="transform" type="translate" 
          values="0,0;30,0;60,0;90,0;120,0;150,0;180,0" 
          dur="4s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="210" cy="138" rx="6" ry="3" fill="#D2B48C">
        <animateTransform attributeName="transform" type="translate" 
          values="0,0;30,0;60,0;90,0;120,0;150,0;180,0" 
          dur="4s" repeatCount="indefinite"/>
      </ellipse>
    </g>
    
    <!-- Sun -->
    <circle cx="300" cy="30" r="20" fill="#FFD700" stroke="#FFA500" stroke-width="2"/>
  </svg>
  <p style="color: #8B4513; margin-top: 15px; font-family: Arial, sans-serif;">Watch the horse gallop across the field! 🏃‍♂️</p>
</div>`,
    language: "html",
    points: 90
  },
  "make a soccer ball game": {
    prompt: "make a soccer ball game",
    code: `<div style="text-align: center; padding: 20px; background: #228B22; color: white;">
  <h3 style="margin-bottom: 20px;">⚽ Soccer Ball Game</h3>
  <canvas id="soccerGame" width="400" height="300" style="border: 2px solid #fff; background: #90EE90;"></canvas>
  <p style="margin-top: 10px; font-size: 14px;">Watch the ball bounce around the field!</p>
  <script>
    const canvas = document.getElementById('soccerGame');
    const ctx = canvas.getContext('2d');
    let x = 200, y = 150, dx = 3, dy = -2, radius = 15;
    
    function drawBall() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw soccer ball
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#000';
      ctx.fill();
      
      // Draw soccer ball pattern
      ctx.beginPath();
      ctx.arc(x, y, radius - 3, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      
      // Draw pentagon pattern
      ctx.beginPath();
      ctx.moveTo(x, y - 8);
      ctx.lineTo(x + 6, y - 3);
      ctx.lineTo(x + 4, y + 5);
      ctx.lineTo(x - 4, y + 5);
      ctx.lineTo(x - 6, y - 3);
      ctx.closePath();
      ctx.fillStyle = '#000';
      ctx.fill();
      
      // Update position
      x += dx;
      y += dy;
      
      // Bounce off walls
      if (x + dx > canvas.width - radius || x + dx < radius) dx = -dx;
      if (y + dy > canvas.height - radius || y + dy < radius) dy = -dy;
    }
    
    setInterval(drawBall, 16);
  </script>
</div>`,
    language: "html",
    points: 100
  },
  "move in the direction you swipe": {
    prompt: "move in the direction you swipe",
    code: `<div style="text-align: center; padding: 20px; background: #1a1a2e; color: #eee;">
  <h3 style="color: #00f5ff; margin-bottom: 20px;">👆 Swipe to Move Game</h3>
  <canvas id="swipeGame" width="400" height="300" style="border: 2px solid #00f5ff; background: #16213e; touch-action: none;"></canvas>
  <p style="margin-top: 10px; font-size: 14px; color: #00f5ff;">Swipe or drag to move the blue ball!</p>
  <script>
    const canvas = document.getElementById('swipeGame');
    const ctx = canvas.getContext('2d');
    let x = 200, y = 150, radius = 20;
    let isDragging = false;
    let lastX = 0, lastY = 0;
    
    function drawBall() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw glowing ball
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, '#00f5ff');
      gradient.addColorStop(0.7, '#0080ff');
      gradient.addColorStop(1, '#0040ff');
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add glow effect
      ctx.shadowColor = '#00f5ff';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(x, y, radius - 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    
    function getEventPos(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }
    
    // Mouse events
    canvas.addEventListener('mousedown', (e) => {
      const pos = getEventPos(e);
      const dist = Math.sqrt((pos.x - x) ** 2 + (pos.y - y) ** 2);
      if (dist <= radius) {
        isDragging = true;
        lastX = pos.x;
        lastY = pos.y;
      }
    });
    
    canvas.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const pos = getEventPos(e);
        x += (pos.x - lastX);
        y += (pos.y - lastY);
        x = Math.max(radius, Math.min(canvas.width - radius, x));
        y = Math.max(radius, Math.min(canvas.height - radius, y));
        lastX = pos.x;
        lastY = pos.y;
        drawBall();
      }
    });
    
    canvas.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    // Touch events
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const pos = getEventPos(e);
      const dist = Math.sqrt((pos.x - x) ** 2 + (pos.y - y) ** 2);
      if (dist <= radius) {
        isDragging = true;
        lastX = pos.x;
        lastY = pos.y;
      }
    });
    
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (isDragging) {
        const pos = getEventPos(e);
        x += (pos.x - lastX);
        y += (pos.y - lastY);
        x = Math.max(radius, Math.min(canvas.width - radius, x));
        y = Math.max(radius, Math.min(canvas.height - radius, y));
        lastX = pos.x;
        lastY = pos.y;
        drawBall();
      }
    });
    
    canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      isDragging = false;
    });
    
    drawBall();
  </script>
</div>`,
    language: "html",
    points: 100
  }
};

// Typo correction function
function correctTypos(prompt: string): string {
  return prompt
    .toLowerCase()
    .trim()
    // Common typos
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
}

export function generateCode(prompt: string): CodeResponse {
  const correctedPrompt = correctTypos(prompt);
  
  // Check real-time code map first
  if (realTimeCodeMap[correctedPrompt]) {
    return realTimeCodeMap[correctedPrompt];
  }
  
  // Check existing mock responses
  for (const [key, response] of Object.entries(mockVibeResponses)) {
    if (correctedPrompt.includes(key) || key.includes(correctedPrompt)) {
      return response;
    }
  }
  
  // Generate dynamic code based on keywords
  if (correctedPrompt.includes('button')) {
    return {
      prompt: correctedPrompt,
      code: `<div style="text-align: center; padding: 20px;">
  <button style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border: none; padding: 12px 24px; border-radius: 8px; color: white; font-weight: bold; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.2); transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" onclick="this.innerHTML='Clicked! 🎉'">
    ${correctedPrompt.charAt(0).toUpperCase() + correctedPrompt.slice(1)}
  </button>
  <p style="margin-top: 15px; color: #666;">Click the button to see the magic! ✨</p>
</div>`,
      language: "html",
      points: 15
    };
  }
  
  if (correctedPrompt.includes('card')) {
    return {
      prompt: correctedPrompt,
      code: `<div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 8px 25px rgba(0,0,0,0.1); max-width: 300px; margin: 20px auto; border: 1px solid #e0e0e0;">
  <div style="width: 100%; height: 120px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 8px; margin-bottom: 15px; display: flex; align-items: center; justify-content: center;">
    <span style="color: white; font-size: 24px;">🎨</span>
  </div>
  <h3 style="color: #333; margin-bottom: 15px; font-family: Arial, sans-serif;">Beautiful Card</h3>
  <p style="color: #666; line-height: 1.6; font-size: 14px;">This is a beautiful card component with a gradient header and clean design, generated for: "${correctedPrompt}"</p>
  <button style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; margin-top: 15px; transition: background 0.2s;" onmouseover="this.style.background='#0056b3'" onmouseout="this.style.background='#007bff'">Learn More</button>
</div>`,
      language: "html",
      points: 25
    };
  }
  
  if (correctedPrompt.includes('game') || correctedPrompt.includes('interactive')) {
    return {
      prompt: correctedPrompt,
      code: `<div style="text-align: center; padding: 20px; background: #2c3e50; color: white; border-radius: 12px; max-width: 400px; margin: 20px auto;">
  <h3 style="margin-bottom: 20px; color: #3498db;">🎮 Interactive Game</h3>
  <canvas id="gameCanvas" width="300" height="200" style="border: 2px solid #3498db; background: #34495e; border-radius: 8px;"></canvas>
  <div style="margin-top: 15px;">
    <button onclick="startGame()" style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 5px; transition: background 0.2s;" onmouseover="this.style.background='#2980b9'" onmouseout="this.style.background='#3498db'">Start Game</button>
    <button onclick="resetGame()" style="background: #e74c3c; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 5px; transition: background 0.2s;" onmouseover="this.style.background='#c0392b'" onmouseout="this.style.background='#e74c3c'">Reset</button>
  </div>
  <p style="margin-top: 10px; font-size: 12px; color: #bdc3c7;">Click Start to begin the colorful animation!</p>
  <script>
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    let gameRunning = false;
    let animationId;
    let particles = [];
    
    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4,
        color: \`hsl(\${Math.random() * 360}, 70%, 60%)\`,
        size: Math.random() * 10 + 5
      };
    }
    
    function startGame() {
      gameRunning = !gameRunning;
      if (gameRunning) {
        for (let i = 0; i < 10; i++) {
          particles.push(createParticle());
        }
        drawGame();
      } else {
        cancelAnimationFrame(animationId);
      }
    }
    
    function resetGame() {
      gameRunning = false;
      cancelAnimationFrame(animationId);
      particles = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    function drawGame() {
      if (!gameRunning) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        particle.x += particle.dx;
        particle.y += particle.dy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.dx = -particle.dx;
        if (particle.y < 0 || particle.y > canvas.height) particle.dy = -particle.dy;
      });
      
      animationId = requestAnimationFrame(drawGame);
    }
  </script>
</div>`,
      language: "html",
      points: 75
    };
  }
  
  if (correctedPrompt.includes('animal') || correctedPrompt.includes('cat') || correctedPrompt.includes('dog')) {
    return {
      prompt: correctedPrompt,
      code: `<div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #FFE5B4, #FFCCCB); border-radius: 15px; max-width: 300px; margin: 20px auto;">
  <h3 style="color: #8B4513; margin-bottom: 20px;">🐾 Cute Animal</h3>
  <svg width="150" height="150" viewBox="0 0 150 150">
    <!-- Animal face -->
    <circle cx="75" cy="75" r="60" fill="#DEB887" stroke="#8B4513" stroke-width="2"/>
    <!-- Eyes -->
    <circle cx="60" cy="60" r="8" fill="white"/>
    <circle cx="90" cy="60" r="8" fill="white"/>
    <circle cx="60" cy="60" r="4" fill="black"/>
    <circle cx="90" cy="60" r="4" fill="black"/>
    <!-- Nose -->
    <ellipse cx="75" cy="80" rx="6" ry="4" fill="#FF69B4"/>
    <!-- Mouth -->
    <path d="M 65 95 Q 75 105 85 95" stroke="#8B4513" stroke-width="2" fill="none"/>
    <!-- Ears -->
    <ellipse cx="50" cy="35" rx="15" ry="25" fill="#DEB887" stroke="#8B4513" stroke-width="2"/>
    <ellipse cx="100" cy="35" rx="15" ry="25" fill="#DEB887" stroke="#8B4513" stroke-width="2"/>
  </svg>
  <p style="color: #8B4513; margin-top: 15px; font-family: Arial, sans-serif;">A friendly animal says hello! 👋</p>
</div>`,
      language: "html",
      points: 30
    };
  }
  
  if (correctedPrompt.includes('flower') || correctedPrompt.includes('plant')) {
    return {
      prompt: correctedPrompt,
      code: `<div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #98FB98, #90EE90); border-radius: 15px; max-width: 300px; margin: 20px auto;">
  <h3 style="color: #228B22; margin-bottom: 20px;">🌸 Beautiful Flower</h3>
  <svg width="150" height="180" viewBox="0 0 150 180">
    <!-- Stem -->
    <rect x="72" y="100" width="6" height="70" fill="#228B22"/>
    <!-- Leaves -->
    <ellipse cx="60" cy="120" rx="15" ry="8" fill="#32CD32" transform="rotate(-30 60 120)"/>
    <ellipse cx="90" cy="140" rx="15" ry="8" fill="#32CD32" transform="rotate(30 90 140)"/>
    <!-- Flower petals -->
    <ellipse cx="75" cy="60" rx="20" ry="35" fill="#FF69B4" transform="rotate(0 75 60)"/>
    <ellipse cx="75" cy="60" rx="20" ry="35" fill="#FF1493" transform="rotate(45 75 60)"/>
    <ellipse cx="75" cy="60" rx="20" ry="35" fill="#FF69B4" transform="rotate(90 75 60)"/>
    <ellipse cx="75" cy="60" rx="20" ry="35" fill="#FF1493" transform="rotate(135 75 60)"/>
    <ellipse cx="75" cy="60" rx="20" ry="35" fill="#FF69B4" transform="rotate(180 75 60)"/>
    <ellipse cx="75" cy="60" rx="20" ry="35" fill="#FF1493" transform="rotate(225 75 60)"/>
    <ellipse cx="75" cy="60" rx="20" ry="35" fill="#FF69B4" transform="rotate(270 75 60)"/>
    <ellipse cx="75" cy="60" rx="20" ry="35" fill="#FF1493" transform="rotate(315 75 60)"/>
    <!-- Flower center -->
    <circle cx="75" cy="60" r="12" fill="#FFD700"/>
  </svg>
  <p style="color: #228B22; margin-top: 15px; font-family: Arial, sans-serif;">A blooming flower in the garden! 🌱</p>
</div>`,
      language: "html",
      points: 35
    };
  }
  
  // Default response for unknown prompts - create a complete interactive element
  return {
    prompt: correctedPrompt,
    code: `<div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; color: white; max-width: 400px; margin: 20px auto; box-shadow: 0 8px 25px rgba(0,0,0,0.2);">
  <h3 style="margin-bottom: 20px; color: #FFD700;">🎨 Interactive Creation</h3>
  <p style="margin-bottom: 20px; font-size: 16px;">Created for: "${correctedPrompt}"</p>
  
  <!-- Interactive Canvas -->
  <canvas id="customCanvas" width="300" height="200" style="border: 2px solid #FFD700; border-radius: 8px; background: rgba(255,255,255,0.1); cursor: pointer;"></canvas>
  
  <div style="margin-top: 15px;">
    <button onclick="startAnimation()" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer; font-weight: bold; margin: 5px; transition: all 0.3s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
      Start Animation
    </button>
    <button onclick="changeColors()" style="background: #17a2b8; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer; font-weight: bold; margin: 5px; transition: all 0.3s;" onmouseover="this.style.background='#138496'" onmouseout="this.style.background='#17a2b8'">
      Change Colors
    </button>
    <button onclick="clearCanvas()" style="background: #dc3545; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer; font-weight: bold; margin: 5px; transition: all 0.3s;" onmouseover="this.style.background='#c82333'" onmouseout="this.style.background='#dc3545'">
      Clear
    </button>
  </div>
  
  <p style="margin-top: 15px; font-size: 12px; opacity: 0.8;">Click the canvas to add colorful shapes!</p>
  
  <script>
    const canvas = document.getElementById('customCanvas');
    const ctx = canvas.getContext('2d');
    let animationRunning = false;
    let animationId;
    let shapes = [];
    let colorIndex = 0;
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
    
    function addShape(x, y) {
      shapes.push({
        x: x,
        y: y,
        size: Math.random() * 20 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2
      });
    }
    
    function drawShapes() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      shapes.forEach((shape, index) => {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2);
        ctx.fillStyle = shape.color;
        ctx.fill();
        
        if (animationRunning) {
          shape.x += shape.dx;
          shape.y += shape.dy;
          
          if (shape.x < 0 || shape.x > canvas.width) shape.dx = -shape.dx;
          if (shape.y < 0 || shape.y > canvas.height) shape.dy = -shape.dy;
        }
      });
      
      if (animationRunning) {
        animationId = requestAnimationFrame(drawShapes);
      }
    }
    
    function startAnimation() {
      animationRunning = !animationRunning;
      if (animationRunning) {
        drawShapes();
      } else {
        cancelAnimationFrame(animationId);
      }
    }
    
    function changeColors() {
      shapes.forEach(shape => {
        shape.color = colors[Math.floor(Math.random() * colors.length)];
      });
      drawShapes();
    }
    
    function clearCanvas() {
      shapes = [];
      animationRunning = false;
      cancelAnimationFrame(animationId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      addShape(x, y);
      drawShapes();
    });
    
    // Add some initial shapes
    addShape(150, 100);
    addShape(100, 80);
    addShape(200, 120);
    drawShapes();
  </script>
  
  <style>
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  </style>
</div>`,
    language: "html",
    points: 50
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