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
        { title: 'Sole Trader', content: 'A business owned and run by ONE person. Easy to set up but has UNLIMITED LIABILITY.', example: 'Local hairdresser or plumber.' },
        { title: 'Partnership', content: 'Owned by 2-20 people. Shared responsibility and capital. Also usually has unlimited liability.', tip: 'A Partnership Agreement document is vital to avoid arguments!' },
        { title: 'Unlimited Liability', content: 'The owner is legally the same as the business. They are personally responsible for all debts.', tip: 'Personal assets like your house could be taken to pay business bills.' },
        { title: 'Choosing a Name', content: 'Sole traders and partnerships usually trade under their own name or a "Trading As" (T/A) name.' }
      ],
      higher: [
        { title: 'Private Limited Company (Ltd)', content: 'Owned by shareholders (family/friends). Shares are NOT sold publicly. Has LIMITED LIABILITY.', tip: 'Ltds must register with Companies House and produce annual accounts.' },
        { title: 'Public Limited Company (Plc)', content: 'Shares are sold to the general public on the Stock Exchange. Can raise huge capital but risks hostile takeovers.' },
        { title: 'Franchising', content: 'Buying the right to use an established brand (e.g. McDonald\'s). Franchisee pays a fee and royalties to the Franchisor.', tip: 'Lower risk than starting from scratch, but less freedom.' },
        { title: 'Non-Profit / Social Enterprises', content: 'Businesses that aim to help society or the environment rather than just making profit for owners.', example: 'The Big Issue or a local charity shop.' },
        { title: 'Limited Liability', content: 'The company has a separate legal identity. Shareholders only lose the money they invested.', tip: 'This is the biggest advantage of being an Ltd or Plc!' }
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
        { title: 'Internal Stakeholders', content: 'People INSIDE the business, like the owners and the employees.' },
        { title: 'External Stakeholders', content: 'People OUTSIDE the business, like the customers, the local community, and the bank.' }
      ],
      higher: [
        { title: 'Stakeholder Conflict', content: 'Different groups want different things. Owners want high profit (higher prices), while Customers want low prices.', tip: 'Compromise is often needed to keep all groups happy.' },
        { title: 'Pressure Groups', content: 'Groups like Greenpeace that influence business decisions by organising boycotts or protests to force social change.', example: 'Protesting against a business for using too much plastic packaging.' },
        { title: 'Government Influence', content: 'The govt affects business through laws (minimum wage), taxes (VAT), and grants.', tip: 'Governments want businesses to grow to provide jobs and tax revenue.' }
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
        { title: 'Job Production', content: 'Making unique, one-off items to a specific customer requirement.', example: 'A bespoke wedding dress or a luxury custom guitar.' },
        { title: 'Flow Production', visualId: 'bus-supply-chain', content: 'Continuous production of identical items on an assembly line.', example: 'Cans of Coca-Cola or Bic pens.', tip: 'High start-up costs for machinery but low cost per item (economies of scale).' },
        { title: 'Batch Production', content: 'Making a specific group (batch) of identical products, then switching to a different batch.', example: 'A bakery making 50 loaves of white bread, then 50 loaves of brown bread.' }
      ],
      higher: [
        { title: 'Lean Production', content: 'Reducing waste (time, materials, movement) to improve efficiency. JIT (Just-in-Time) is a key part of this.', tip: 'JIT means holding very little stock, so it saves on storage costs.' },
        { title: 'Quality Control vs Assurance', content: 'Control: Checking the final product at the end. Assurance: Checking quality at every stage of production.', tip: 'Assurance reduces waste as errors are found earlier.' },
        { title: 'Technology in Operations', content: 'CAD (Computer Aided Design) and CAM (Computer Aided Manufacture) speed up production and improve precision.' }
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
        { title: 'Financial Methods', content: 'Salary (fixed monthly), Wages (hourly), Commission (paid per sale), and Profit Sharing.' },
        { title: 'Commission', content: 'An extra payment based on how many sales an employee makes. Great for motivating sales teams.', example: 'A car salesman getting £100 for every car sold.' },
        { title: 'Fringe Benefits', content: 'Non-cash perks given to staff.', example: 'Free gym membership, company car, or private healthcare.' }
      ],
      higher: [
        { title: 'Non-Financial Methods', content: 'Job rotation, job enrichment, and job enlargement. Giving staff more responsibility and variety.', tip: 'These focus on "Intrinsic Motivation"—making the work itself satisfying.' },
        { title: 'Motivation Theorists', content: 'Maslow (Hierarchy of Needs) and Herzberg (Two-Factor Theory: Hygiene vs Motivators).', tip: 'Higher tier exams often ask how a manager might apply Maslow to their team.' },
        { title: 'Autonomy', content: 'Giving employees freedom to make their own decisions. This is part of the "Modern" approach to motivation.' }
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
