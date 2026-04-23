'use client';

const pick = (arr) => arr[Math.floor(arr.length * Math.random())];

const makeMCQ = (question, answer, distractors, hint, explanation) => ({
  display: question,
  answer,
  options: [answer, ...distractors].sort(() => Math.random() - 0.5),
  hint,
  explanation,
});

export const TOPICS = {
  // ==============================================================
  // PAPER 1: CREATIVE READING & WRITING
  // ==============================================================
  'language-analysis': {
    title: 'Language Analysis',
    emoji: '✍️',
    color: '#00e5a0',
    category: 'Paper 1 Reading',
    description: 'Analyzing how writers use language to create effects (AO2).',
    lessons: {
      foundation: [
        { title: 'The Basics of AO2', content: 'AO2 asks you to explain, comment on, and analyze how writers use language and structure to achieve effects.' },
        { title: 'Language Devices', content: 'Similes, Metaphors, Personification, and Onomatopoeia. These are your standard "tools".', tip: 'Don\'t just list them—explain WHY the writer used them.' },
        { title: 'Verbs and Adjectives', content: 'Focus on powerful verbs and evocative adjectives. How do they change the mood?', example: '"The wind howled" vs "The wind whispered".' },
        { title: 'Imagery', content: 'Creating a "word picture" for the reader. Look for sensory details (sight, sound, smell, touch, taste).' }
      ],
      higher: [
        { title: 'AO2: Advanced Terminology', content: 'Sibilance, Plosives, Juxtaposition, and Semantic Fields.', tip: 'Use these terms to show the examiner you have deep subject knowledge.' },
        { title: 'AO2: Patterns of Language', content: 'Look for "Semantic Fields"—groups of words related to a single theme (e.g., words related to war or nature).', tip: 'Identifying a pattern is better than identifying a single word.' },
        { title: 'The Effect on the Reader', content: 'The most important part! Does it create tension? Sympathy? Fear? Be specific.', example: 'Instead of "it makes the reader interested", try "it creates an ominous atmosphere that foreshadows danger".' },
        { title: 'AO2: Nuance and Connotation', content: 'Analyze the "shades of meaning" in a word. Why chose "crimson" instead of "red"?', tip: 'Think about the cultural or emotional associations of words.' }
      ],
    },
    generateQuestion: () => {
      const types = [
        () => makeMCQ('What is a "Semantic Field"?', 'A group of words related to a single theme', ['A type of metaphor', 'The literal meaning of a word', 'A rhyming pattern'], 'Think about themes.', 'A semantic field helps build a consistent mood or theme throughout a text.'),
        () => makeMCQ('Which device is: "The sun smiled down on the trees"?', 'Personification', ['Simile', 'Metaphor', 'Onomatopoeia'], 'Giving human traits.', 'Personification assigns human qualities to non-human things.')
      ];
      return pick(types)();
    },
  },

  'structure-analysis': {
    title: 'Structure Analysis',
    emoji: '🧱',
    color: '#00e5a0',
    category: 'Paper 1 Reading',
    description: 'How writers organize texts to interest the reader (AO2).',
    lessons: {
      foundation: [
        { title: 'What is Structure?', content: 'Structure is the order of ideas. How does the text start? What happens in the middle? How does it end?' },
        { title: 'Shifts in Focus', content: 'Look for where the writer moves from the setting to a character, or from the outside to the inside.', tip: 'Use phrases like "The writer shifts the focus from..."' },
        { title: 'Chronological Order', content: 'Events happening in the order they occurred. Simple but effective for narrative.' },
        { title: 'Punctuation for Effect', content: 'Short sentences create tension or speed. Long, complex sentences can feel overwhelming or descriptive.' }
      ],
      higher: [
        { title: 'AO2: Narrative Perspectives', content: 'First-person (I), third-person limited (focusing on one character), or third-person omniscient (knowing everything).', tip: 'How does the perspective affect our reliability on the narrator?' },
        { title: 'AO2: Cyclical Structure', content: 'When a text ends where it began, or returns to an initial idea/image.', tip: 'This often suggests a lack of change or a completion of a journey.' },
        { title: 'Structural Hubris', content: 'In fiction, look for where a character’s confidence reaches its peak before a structural shift (peripeteia) leads to their downfall.' },
        { title: 'AO2: Foreshadowing', content: 'Structural "clues" dropped early on about what will happen later.', example: 'Mentioning a storm or a broken object at the start of a story.' }
      ],
    },
    generateQuestion: () => makeMCQ('What does "Foreshadowing" mean?', 'Hints about future events in a story', ['Ending a story where it began', 'A shift from outside to inside', 'Repeating the same word'], 'Clues for later.', 'Foreshadowing builds anticipation or dread by hinting at what is to come.')
  },

  'evaluating-texts': {
    title: 'Evaluative Thinking',
    emoji: '🧐',
    color: '#ffe600',
    category: 'Paper 1 Reading',
    description: 'Evaluating how well a writer has achieved an effect (AO4).',
    lessons: {
      foundation: [
        { title: 'What is Evaluation?', content: 'Evaluation is forming an opinion based on evidence. Do you agree with the statement given in the question?' },
        { title: 'Agreeing with the Statement', content: 'It is almost always easier to AGREE with the statement in the exam. Look for evidence that supports it.', tip: 'Use phrases like "I fully agree that..." or "The writer successfully creates..." ' },
        { title: 'The "What, How, Why" of Evaluation', content: 'What is the effect? How did the writer create it? What is the impact on you as a reader?' },
        { title: 'Finding Methods', content: 'Evaluation often involves looking at both language and structure together to see how they work as a whole.' }
      ],
      higher: [
        { title: 'AO4: Perceptive Judgment', content: 'To get high marks, you need to show "perceptive" evaluation. Look for subtle ways the writer has influenced your opinion.', tip: 'Critically analyze how the writer uses character actions to support a theme.' },
        { title: 'AO4: Evaluating Impact', content: 'Analyze "how far" you agree. You might agree entirely, or you might agree with certain parts more than others.', tip: 'Use "Tentative Language" like "Perhaps", "Possibly", or "It could be argued that..."' },
        { title: 'The Writer’s Craft', content: 'Think about the writer\'s intention. Why did they want us to feel this way at this specific point in the story?', tip: 'Relate the evaluation back to the genre of the text (e.g., typical Gothic tropes).' },
        { title: 'Referencing the Text', content: 'Always support your evaluation with specific references. Detailed "embedded" quotes are best for high-level responses.' }
      ],
    },
    generateQuestion: () => makeMCQ('What does "Evaluation" mean in P1 Question 4?', 'Forming a critical opinion with evidence', ['Listing facts about the text', 'Summarizing the plot', 'Counting sentences'], 'Critically judging.', 'Evaluation (AO4) is about making an informed judgment on how successful a writer has been.')
  },

  'narrative-writing': {
    title: 'Narrative Writing',
    emoji: '🖋️',
    color: '#00d4ff',
    category: 'Paper 1 Writing',
    description: 'Writing engaging stories (AO5 & AO6).',
    lessons: {
      foundation: [
        { title: 'Plan Your Writing', content: 'Don\'t just start writing! Spend 5 minutes planning your beginning, middle, and end.' },
        { title: '"Show, Don\'t Tell"', content: 'Instead of saying "He was angry", describe his actions: "He slammed the door, his face turning a deep shade of purple."', tip: 'Engage the reader\'s senses.' },
        { title: 'TiPToP Paragraphing', content: 'Use paragraphs to organize your ideas. A new paragraph for a new Time, Place, Topic, or Person.' }
      ],
      higher: [
        { title: 'AO5/6: Pathetic Fallacy', content: 'When the weather or environment reflects the mood of a character.', example: 'Thunder crashing as a character loses their temper.' },
        { title: 'AO6: Advanced Punctuation', content: 'Use semi-colons (;) to link related ideas and colons (:) to introduce lists or explanations.', tip: 'Using a wide range of punctuation earns higher marks for AO6.' },
        { title: 'AO5: Structural Hooks', content: 'Start "in media res" (in the middle of the action) to grab the reader\'s attention immediately.', tip: 'A powerful opening is key to a top grade.' }
      ],
    },
    generateQuestion: () => makeMCQ('What does "in media res" mean?', 'Starting in the middle of the action', ['Starting slowly', 'Ending with a cliffhanger', 'Using lots of adjectives'], 'Latin term.', 'Starting "in media res" creates immediate tension and curiosity.')
  },

  // ==============================================================
  // PAPER 2: VIEWPOINTS & PERSPECTIVES
  // ==============================================================
  'comparison-skills': {
    title: 'Comparison Skills',
    emoji: '⚖️',
    color: '#ff6b35',
    category: 'Paper 2 Reading',
    description: 'Comparing viewpoints and perspectives across two texts (AO3).',
    lessons: {
      foundation: [
        { title: 'The Big Three', content: 'Compare the T-A-P: Topic, Audience, and Purpose.' },
        { title: 'Connectives of Comparison', content: 'Use "Similarly", "Likewise", and "Equally" to show points of connection.' },
        { title: 'Connectives of Contrast', content: 'Use "However", "In contrast", and "Conversely" to show points of difference.', tip: 'Always use connectives to link your two paragraphs.' }
      ],
      higher: [
        { title: 'AO3: Comparing Methods', content: 'Don\'t just compare WHAT they say, compare HOW they say it.', tip: 'Does one writer use irony while the other uses statistics?' },
        { title: 'AO1/3: Synthesis', content: 'Bringing information from both texts together to form a combined point. This is crucial for P2 Question 2.', tip: 'Synthesis is about creating a "joined up" summary of the two sources.' },
        { title: 'AO3: Nuancial Differences', content: 'Look for subtle differences. Both writers might be angry, but one might be angry at a person while the other is angry at an institution.', tip: 'Identify the SPECIFIC object of their emotion.' }
      ],
    },
    generateQuestion: () => makeMCQ('Which task requires you to compare VIEWPOINTS?', 'Paper 2 Question 4', ['Paper 1 Question 2', 'Paper 2 Question 2', 'Paper 1 Question 3'], 'The big comparison.', 'Question 4 on Paper 2 is the 16-mark comparison task focusing on viewpoints and perspectives.')
  },

  'transactional-writing': {
    title: 'Transactional Writing',
    emoji: '📬',
    color: '#ff2d78',
    category: 'Paper 2 Writing',
    description: 'Writing to persuade, argue, or advise (AO5 & AO6).',
    lessons: {
      foundation: [
        { title: 'PAF', content: 'Identify the Purpose, Audience, and Format *before* you start writing.' },
        { title: 'Letter Writing', content: 'Standard layout: Addresses in the top corners, "Dear...", and "Yours sincerely" (if you know them) or "Yours faithfully" (if you don\'t).' },
        { title: 'AFOREST', content: 'Alliteration, Facts, Opinions, Rhetorical Questions, Emotive Language, Statistics, Triplets.' }
      ],
      higher: [
        { title: 'AO5/6: Rhetorical Flourishes', content: 'Anaphora (repeating at the start), Epistrophe (repeating at the end), and Chiasmus (reversing the structure).', example: '"Ask not what your country can do for you, but what you can do for your country."' },
        { title: 'AO5: Tone and Register', content: 'Adapting your language perfectly to your audience. A letter to the Prime Minister needs a different tone than an article for a school magazine.', tip: 'Consistent tone is a requirement for Level 4 marks.' },
        { title: 'AO5: Counter-Arguments', content: 'Acknowledge the opposition and dismantle their point with logic or sarcasm. "While some may argue... the data clearly proves otherwise."' }
      ],
    },
    generateQuestion: () => makeMCQ('What does "PAF" stand for?', 'Purpose, Audience, Format', ['Paragraph, Adjective, Full stop', 'Pace, Action, Feedback', 'Persuade, Advice, Follow'], 'Preparation steps.', 'PAF helps you define your writing style before you begin.')
  },

  // ==============================================================
  // NON-EXAMINATION ASSESSMENT (NEA)
  // ==============================================================
  'spoken-language': {
    title: 'Spoken Language',
    emoji: '🎤',
    color: '#b14aed',
    category: 'Assessment',
    description: 'Skills for the Spoken Language presentation.',
    lessons: {
      foundation: [
        { title: 'The Task', content: 'You must prepare a formal presentation on a topic of your choice and answer questions from the audience.' },
        { title: 'Body Language', content: 'Maintain eye contact, stand tall, and use gestures to emphasize your points.', tip: 'Avoid reading directly from your script—use cue cards instead!' },
        { title: 'Clarity of Pitch', content: 'Speak clearly and at a pace the audience can follow. Don\'t rush!' }
      ],
      higher: [
        { title: 'Distinction level: Sophisticated Response', content: 'To get a "Distinction", you must respond to questions with detail and sophistication, showing you have thought deeply about your topic.' },
        { title: 'Engaging the Audience', content: 'Use rhetorical questions and direct address in your speech to keep the audience focused on your message.', tip: 'Vary your tone to heighten emotional impact at key moments.' }
      ],
    },
    generateQuestion: () => makeMCQ('What is the highest grade you can get in Spoken Language?', 'Distinction', ['A*', 'Pass', 'Merit'], 'Ranked: P, M, D.', 'The spoken language endorsement is graded as Pass, Merit, or Distinction.')
  }
};

export const getTopicsByCategory = () => {
  const categories = {};
  Object.keys(TOPICS).forEach(slug => {
    const topic = TOPICS[slug];
    if (!categories[topic.category]) categories[topic.category] = [];
    categories[topic.category].push({ ...topic, slug });
  });
  return categories;
};
