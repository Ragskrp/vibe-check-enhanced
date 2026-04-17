// GCSE Business Topic Data — AQA Specific
const r = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[r(0, arr.length - 1)];

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function makeMCQ(display, answer, wrongOptions, hint, explanation) {
  const options = shuffle([answer, ...wrongOptions.slice(0, 3)]);
  return { display, answer, answerType: 'text', options, hint, explanation };
}

export const TOPICS = {
  // ==============================================================
  // 3.1 BUSINESS IN THE REAL WORLD
  // ==============================================================

  'business-ownership': {
    title: 'Business Ownership',
    emoji: '🏢',
    color: '#ff6b35',
    category: 'Real World',
    description: 'Sole traders, Partnerships, Ltd, and Plc structures.',
    lessons: {
      foundation: [
        { title: 'Sole Trader', content: 'A business owned and run by one person. Easy to set up but has UNLIMITED LIABILITY (the owner is responsible for all debts).' },
        { title: 'Partnership', content: 'Owned by 2-20 people. Shared responsibility and capital, but also has unlimited liability.' },
      ],
      higher: [
        { title: 'Private Limited Company (Ltd)', content: 'Owned by shareholders (often family/friends). Shares cannot be sold on the stock exchange. Has LIMITED LIABILITY.' },
        { title: 'Public Limited Company (Plc)', content: 'Shares are sold to the general public on the Stock Exchange. Can raise massive capital but risks hostile takeovers.' },
      ],
    },
    generateQuestion: () => {
      const types = [
        () => makeMCQ('What is the main risk for a Sole Trader?', 'Unlimited Liability', ['Limited Liability', 'Dividend payments', 'Hostile takeover'], 'The owner and business are the same legal entity.', 'Unlimited liability means personal assets (like your house) could be seized to pay business debts.'),
        () => makeMCQ('Which business type can sell shares to the general public on the Stock Exchange?', 'Public Limited Company (Plc)', ['Private Limited Company (Ltd)', 'Partnership', 'Sole Trader'], 'Think "Public".', 'Plcs can raise huge funds by selling shares publicly.'),
        () => {
           const type = pick(['Ltd', 'Plc']);
           return makeMCQ(`What is a major benefit of being an ${type}?`, 'Limited Liability', ['Keep all profits', 'Total control', 'Easy to set up'], 'Owners only lose what they invest.', `Both Ltds and Plcs offer Limited Liability, protecting the owners' personal wealth.`);
        }
      ];
      return pick(types)();
    },
  },

  'stakeholders': {
    title: 'Stakeholders',
    emoji: '🤝',
    color: '#ff6b35',
    category: 'Real World',
    description: 'Groups affected by a business and their conflicting interests.',
    lessons: {
      foundation: [
        { title: 'Who are Stakeholders?', visualId: 'bus-stakeholders', content: 'Anyone with an interest in the business: Employees, Customers, Suppliers, Local Community, and Government.' },
      ],
      higher: [
        { title: 'Stakeholder Conflict', content: 'Different groups want different things. Owners want high profit (higher prices), while Customers want low prices.' },
      ],
    },
    generateQuestion: () => {
      const groups = [
        { name: 'Employees', want: 'High wages', conflict: 'Owners (who want lower costs)' },
        { name: 'Customers', want: 'Low prices', conflict: 'Owners (who want high profit)' },
        { name: 'Local Community', want: 'Less pollution', conflict: 'Owners (who want to expand the factory)' }
      ];
      const g = pick(groups);
      return makeMCQ(`Which group is most likely to conflict with ${g.name} regarding "${g.want}"?`, g.conflict.split(' (')[0], ['Suppliers', 'Government', 'Banks'], `Who would lose out if ${g.name} got what they wanted?`, `${g.name} want ${g.want}, while ${g.conflict}.`);
    },
  },

  // ==============================================================
  // 3.3 BUSINESS OPERATIONS
  // ==============================================================

  'production-methods': {
    title: 'Production Methods',
    emoji: '🏭',
    color: '#ff6b35',
    category: 'Operations',
    description: 'Job and Flow production methods.',
    lessons: {
      foundation: [
        { title: 'Job Production', content: 'Making unique, one-off items to a customer\'s specific requirements (e.g., a wedding cake or bridge).' },
        { title: 'Flow Production', visualId: 'bus-supply-chain', content: 'Continuous production of identical items in large quantities (e.g., cans of cola or pens).' },
      ],
      higher: [
        { title: 'Lean Production', content: 'Focuses on reducing waste and increasing efficiency. Just-in-Time (JIT) is a common lean method.' },
      ],
    },
    generateQuestion: () => {
      const types = [
        () => makeMCQ('Which method is best for mass-producing identical ballpoint pens?', 'Flow Production', ['Job Production', 'Niche Production', 'Recycling'], 'Continuous and identical.', 'Flow production uses assembly lines for mass-market goods.'),
        () => makeMCQ('A tailor making a bespoke suit for a specific client is using which method?', 'Job Production', ['Flow Production', 'Mass Production', 'Standardisation'], 'One-off and unique.', 'Job production is tailored to individual customer needs.')
      ];
      return pick(types)();
    },
  },

  'business-location': {
     title: 'Business Location',
     emoji: '📍',
     color: '#ff6b35',
     category: 'Real World',
     description: 'Factors affecting where a business chooses to set up.',
     lessons: {
       foundation: [
         { title: 'Location Factors', content: 'Proximity to market, availability of raw materials, cost of labour, and transport links.' }
       ]
     },
     generateQuestion: () => makeMCQ('Why might a heavy manufacturing plant locate near a port?', 'To reduce transport costs for raw materials', ['To be near a shopping mall', 'To attract more tourists', 'To avoid paying taxes'], 'Logistics and heavy goods.', 'Ports provide easy access for shipping heavy raw materials or finished products globally.')
  },

  // ==============================================================
  // 3.4 HUMAN RESOURCES
  // ==============================================================

  'org-structures': {
    title: 'Organizational Structures',
    emoji: '📐',
    color: '#ff6b35',
    category: 'Human Resources',
    description: 'Tall vs Flat structures and chains of command.',
    lessons: {
      foundation: [
        { title: 'Tall Structures', visualId: 'bus-org-chart', content: 'Many layers of management. Narrow span of control, long chain of command. Slow communication.' },
        { title: 'Flat Structures', content: 'Few layers of management. Wide span of control, short chain of command. Faster communication.' },
      ],
      higher: [
        { title: 'Delegation', content: 'Passing authority down to subordinates. Helps motivate employees and frees up management time.' },
      ],
    },
    generateQuestion: () => {
      const types = [
        () => makeMCQ('Which structure has a "Long Chain of Command"?', 'Tall Structure', ['Flat Structure', 'Matrix Structure', 'Circular Structure'], 'Many layers high.', 'A tall structure has many hierarchical layers, making the chain of command long.'),
        () => makeMCQ('What is a "Span of Control"?', 'The number of subordinates directly reporting to a manager', ['The length of the office building', 'The total number of employees', 'The business profit margin'], 'Who do you control?', 'Span of control refers to how many people a manager manages directly.')
      ];
      return pick(types)();
    },
  },

  'recruitment': {
    title: 'Recruitment & Selection',
    emoji: '📝',
    color: '#ff6b35',
    category: 'Human Resources',
    description: 'Induction, internal and external recruitment.',
    lessons: {
      foundation: [
        { title: 'Internal vs External', content: 'Internal: Hiring from within (cheaper, motivates staff). External: Hiring from outside (new ideas, larger pool of talent).' },
        { title: 'Job Description vs Person Spec', content: 'Job Description = The Role (tasks, salary). Person Specification = The Candidate (skills, experience, qualities).' }
      ]
    },
    generateQuestion: () => makeMCQ('Which document describes the SKILLS and QUALITIES a candidate needs?', 'Person Specification', ['Job Description', 'Application Form', 'Contract of Employment'], 'Focus on the "Person".', 'The Person Specification outlines the human requirements for the job.')
  },

  'motivation': {
    title: 'Motivation',
    emoji: '🚀',
    color: '#ff6b35',
    category: 'Human Resources',
    description: 'Financial and non-financial ways to motivate staff.',
    lessons: {
      foundation: [
        { title: 'Financial Methods', content: 'Salary (fixed monthly), Wages (hourly), Commission (per sale), and Profit Sharing.' },
      ],
      higher: [
        { title: 'Non-Financial Methods', content: 'Job rotation, job enrichment, and fringe benefits (perks like free gym or car).' },
      ],
    },
    generateQuestion: () => {
      const types = [
        () => makeMCQ('A salesperson earns £5 for every item they sell. This is called...', 'Commission', ['Salary', 'Wages', 'Fringe Benefit'], 'Paid per unit/sale.', 'Commission is a financial incentive based on sales performance.'),
        () => makeMCQ('What is "Job Rotation"?', 'Swapping between different tasks to reduce boredom', ['Getting a pay rise', 'Working longer hours', 'Quitting the job'], 'Rotating around roles.', 'Job rotation keeps staff motivated by varying their daily activities.')
      ];
      return pick(types)();
    },
  }
};

export function getTopicsByCategory() {
  const cats = {};
  Object.entries(TOPICS).forEach(([slug, data]) => {
    if (!cats[data.category]) cats[data.category] = [];
    cats[data.category].push({ slug, ...data });
  });
  return cats;
}

export function getTopicBySlug(slug) { return TOPICS[slug] || null; }
export function getAllTopicSlugs() { return Object.keys(TOPICS); }

export default TOPICS;
