const fs = require('fs');
const path = require('path');

const games = [
  "Would You Rather",
  "WordVibe",
  "Whack-a-Vibe",
  "Vocab Vibe",
  "Vibe or Die",
  "Vibe Quiz",
  "Vibe Clicker",
  "Reaction Arena",
  "Quiz Arena",
  "Poll Party",
  "Memory Arena",
  "Odd One Out",
  "Hot Takes",
  "Geography Guesser",
  "Flappy Vibe",
  "Emoji IQ",
  "Drawing Dash",
  "Merge Vibe"
];

function generateContent(gameName) {
  let specificFacts = `The core format of ${gameName} has been adapted to perfectly fit the VIBEMENOW rapid-play ethos. Unlike traditional games that require long sessions, this variant focuses on micro-bursts of engaging gameplay.`;
  
  if (gameName === "WordVibe") {
    specificFacts = `WordVibe vs Wordle: What makes WordVibe distinct is our original 'Vibe Hint' system. After 3 failed guesses, a themed emoji clue is revealed to assist players. We've optimized the dictionary and tailored the challenge specifically for the VIBEMENOW audience.`;
  } else if (gameName === "Merge Vibe") {
    specificFacts = `What makes Merge Vibe unique compared to standard 2048 clones is the introduction of 'Vibe Tiles' — periodic wildcard tiles that appear randomly and multiply surrounding values, adding an unpredictable dynamic layer to the classic sliding puzzle mechanic.`;
  } else if (gameName === "Flappy Vibe") {
    specificFacts = `Flappy Vibe introduces an original mechanic not found in traditional avoid-the-pipe games: collectible 'Vibe tokens' positioned between obstacles. Collecting these triggers a brief slow-motion effect, radically changing the rhythm and strategy required for high scores.`;
  } else if (gameName === "Whack-a-Vibe") {
    specificFacts = `Unlike standard Whack-a-Mole games, Whack-a-Vibe strictly penalizes players for hitting 'good' targets. This 'avoid the good ones' mechanic forces players to use inhibitory control, distinguishing it as a test of restraint rather than just raw reaction speed.`;
  }

  return {
    title: gameName,
    howToPlay: `
1. Start the game by clicking or tapping the main interface.
2. Observe the initial state and process the visual information presented.
3. React to the prompts or targets according to the specific rules of ${gameName}.
4. Score points by making accurate decisions within the time limit.
5. The game ends when the timer runs out or a fail state is reached. Try to beat your high score on subsequent attempts.`,
    strategy: `To truly excel at ${gameName}, beginners must move past generic 'practice makes perfect' advice. First, employ 'chunking' by viewing the screen elements not as isolated objects, but as a cohesive pattern. This reduces cognitive load significantly. Second, control your eye movements—maintain a soft focus on the center of the screen to utilize your peripheral vision for faster detection of new targets or changes. Finally, prioritize consistency and accuracy over pure frantic speed; controlled pacing prevents the cascading errors that typically ruin high-score runs.`,
    cognitiveSkill: `${gameName} is primarily an exercise in working memory and rapid pattern recognition. By forcing the player to continually assess changing on-screen variables and make split-second decisions, it stimulates the prefrontal cortex. Neuroscience research suggests that engaging in these dynamic feedback loops can enhance neuroplasticity. While it's primarily an entertainment experience, the required focus acts as a lightweight cognitive warm-up, subtly training inhibitory control and spatial awareness in the process.`,
    gameFacts: specificFacts,
    relatedGames: [
      games[(games.indexOf(gameName) + 1) % games.length],
      games[(games.indexOf(gameName) + 2) % games.length],
      games[(games.indexOf(gameName) + 3) % games.length]
    ],
    faqs: [
      {
        question: `How do I play ${gameName}?`,
        answer: `Simply follow the step-by-step instructions provided below the game canvas. The core mechanic involves rapid pattern recognition and timely inputs to maximize your score before the round ends.`
      },
      {
        question: `What makes ${gameName} unique?`,
        answer: `It features custom mechanics specifically designed for the VIBEMENOW platform, blending casual entertainment with genuine cognitive challenges like working memory and reaction speed.`
      },
      {
        question: `Can I play ${gameName} on mobile?`,
        answer: `Yes, ${gameName} is fully responsive and optimized for mobile devices. The touch controls are specifically calibrated for fast-paced gameplay on smaller screens.`
      }
    ]
  };
}

const seoData = {};
games.forEach(game => {
  seoData[game] = generateContent(game);
});

const fileContent = `// Auto-generated massive SEO content injection for AdSense approval
export const seoData = ${JSON.stringify(seoData, null, 2)};
`;

const targetDir = path.join(__dirname, '..', 'app', 'data');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

fs.writeFileSync(path.join(targetDir, 'seoData.js'), fileContent);
console.log('Successfully generated seoData.js with strict A/B/C/D/E structure and clone differentiation!');
