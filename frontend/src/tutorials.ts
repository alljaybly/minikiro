// Tutorial prompts for MiniKiro
export interface Tutorial {
  name: string;
  prompt: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export const tutorials = {
  kid: [
    {
      name: "Learn to Draw a Star",
      prompt: "draw a red star",
      description: "Create your first SVG star shape!",
      difficulty: 'easy' as const,
      points: 10
    },
    {
      name: "Make a Happy Face",
      prompt: "create a smiley face",
      description: "Draw a cheerful smiley face with SVG!",
      difficulty: 'easy' as const,
      points: 15
    },
    {
      name: "Create a Rainbow",
      prompt: "draw a rainbow",
      description: "Paint a beautiful rainbow with all the colors!",
      difficulty: 'medium' as const,
      points: 20
    },
    {
      name: "Bouncing Ball Fun",
      prompt: "make a bouncing ball",
      description: "Watch a ball bounce up and down with animation!",
      difficulty: 'medium' as const,
      points: 25
    },
    {
      name: "Simple Pixel Game",
      prompt: "make a pixel art game",
      description: "Create your first interactive pixel game!",
      difficulty: 'hard' as const,
      points: 100
    }
  ],
  pro: [
    {
      name: "Build a Navbar",
      prompt: "create a glowing navbar",
      description: "Design a professional navigation bar with glow effects",
      difficulty: 'medium' as const,
      points: 50
    },
    {
      name: "Make a Soccer Ball Game",
      prompt: "make a soccer ball game",
      description: "Create an animated soccer ball bouncing game",
      difficulty: 'hard' as const,
      points: 100
    },
    {
      name: "Swipe to Move",
      prompt: "move in the direction you swipe",
      description: "Build an interactive touch/swipe game with canvas",
      difficulty: 'hard' as const,
      points: 100
    },
    {
      name: "REST API Client",
      prompt: "build a rest api client",
      description: "Create a professional API testing interface",
      difficulty: 'hard' as const,
      points: 75
    },
    {
      name: "Data Dashboard",
      prompt: "create a data dashboard",
      description: "Build a metrics dashboard with multiple cards",
      difficulty: 'hard' as const,
      points: 75
    }
  ]
};

export const getTutorialByPrompt = (prompt: string): Tutorial | undefined => {
  const allTutorials = [...tutorials.kid, ...tutorials.pro];
  return allTutorials.find(tutorial => 
    tutorial.prompt.toLowerCase() === prompt.toLowerCase()
  );
};

export const getTutorialsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard', isKidMode: boolean): Tutorial[] => {
  const relevantTutorials = isKidMode ? tutorials.kid : tutorials.pro;
  return relevantTutorials.filter(tutorial => tutorial.difficulty === difficulty);
};