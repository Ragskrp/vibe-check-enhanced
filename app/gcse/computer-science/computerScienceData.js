// GCSE Computer Science Topic Data — OCR Specific
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
  // ALGORITHMS & THINKING
  // ==============================================================

  'computational-thinking': {
    title: 'Computational Thinking',
    emoji: '🧠',
    color: '#00d4ff',
    category: 'Algorithms & Thinking',
    description: 'Decomposition, abstraction, pattern recognition, and robust data inputs.',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'Decomposition', content: 'Breaking down a complex problem into smaller, manageable sub-problems.', example: 'To code a game, you break it into: Graphics, Player Movement, Scoring, and Sound.' },
        { title: 'Abstraction', content: 'Removing unnecessary details to focus on the essential features.', example: 'A map is an abstraction of a city—it ignores every single tree to show just the roads.' },
        { title: 'Pattern Recognition', content: 'Finding similarities between problems to reuse solutions.', tip: 'If you have solved "sorting names", you can use the same logic for "sorting prices".' },
        { title: 'Algorithmic Thinking', content: 'Creating a step-by-step set of rules to solve any problem of a similar type.' }
      ],
      higher: [
        { title: 'Input Sanitisation', content: 'Cleaning data inputs to prevent security attacks like SQL injection. This involves removing special characters like ; or --.' },
        { title: 'Validation vs Verification', content: 'Validation: Does the data follow the rules (e.g. is it a number)? Verification: Is the data actually correct (e.g. double-entry)?' },
        { title: 'Casting', content: 'Changing a variable from one data type to another.', example: 'int("5") converts a String to an Integer.' },
        { title: 'Defensive Programming', content: 'Writing code that anticipates and handles errors or malicious inputs before they crash the system.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => makeMCQ('What is decomposition?', 'Breaking a problem down into smaller parts', ['Removing unnecessary details', 'Finding patterns', 'Writing code'], 'Think about decomposing organic matter (breaking down).', 'Decomposition breaks complex problems down to make them manageable.'),
          () => makeMCQ('What is abstraction?', 'Removing unnecessary details', ['Breaking problems down', 'Converting data types', 'Finding errors'], 'Subtracting the useless stuff.', 'Abstraction filters out non-essential characteristics.'),
          () => {
             const prob = pick(['baking a complex cake', 'programming a 3D video game', 'building a bicycle', 'planning a massive holiday']);
             return makeMCQ(`Breaking down the process of ${prob} into smaller, manageable sub-tasks is an example of what?`, 'Decomposition', ['Abstraction', 'Pattern Recognition', 'Algorithmic efficiency'], 'You are splitting a large task into small ones.', 'Decomposition is taking a complex whole and breaking it down into achievable parts.');
          },
          () => {
             const ignore = pick(['the exact color of a car', 'the manufacturer of a bicycle entirely', 'the specific names of players in a general physics engine']);
             return makeMCQ(`When modelling a system, deciding to ignore ${ignore} because it isn't relevant to the core logic is an example of what?`, 'Abstraction', ['Decomposition', 'Pattern Matching', 'Input Sanitisation'], 'You are removing details.', 'Abstraction hides or removes complex details that do not matter to the main problem.');
          }
        ];
        return pick(types)();
      } else {
        const types = [
          () => makeMCQ('What is the purpose of input sanitisation?', 'To clean data and prevent security attacks', ['To convert data types', 'To make code run faster', 'To find syntax errors'], 'Like hand sanitiser kills germs.', 'Input sanitisation strips malicious or invalid characters before processing.'),
          () => {
             const dt1 = pick(['String', 'Float', 'Char']);
             const dt2 = pick(['Integer', 'Boolean', 'Double']);
             return makeMCQ(`A programmer explicitly converts a variable stored as a ${dt1} into a ${dt2}. What is this process called?`, 'Casting', ['Sanitising', 'Parsing', 'Decomposing'], 'Think of "casting" iron into a new mold.', 'Casting forces the data type of a variable to change to a new specific type.');
          },
          () => {
             const attack = pick(['SQL injection', 'Cross-site scripting (XSS)', 'buffer overflow']);
             return makeMCQ(`Removing unauthorized symbols from user inputs helps prevent which type of vulnerability?`, 'SQL injection', ['Logic errors', 'Syntax errors', 'Infinite loops'], 'Hackers use special characters to break database queries.', 'Input sanitisation protects systems against code injection attacks like SQLi.');
          }
        ];
        return pick(types)();
      }
    },
  },

  'algorithms-tracing': {
    title: 'Algorithms & Tracing',
    emoji: '📝',
    color: '#00d4ff',
    category: 'Algorithms & Thinking',
    description: 'Pseudocode, dry runs, and predicting code outputs.',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'Pseudocode', content: 'Pseudocode is a way of writing algorithms that resembles programming languages but uses English-like syntax, making it easy for humans to read.' },
        { title: 'Dry Runs', content: 'A dry run is stepping through an algorithm manually to trace its execution and understand its behaviour before coding.' }
      ],
      higher: [
        { title: 'Trace Tables', content: 'Trace tables track the value of variables step-by-step as an algorithm executes. This helps spot exactly where logic goes wrong.' }
      ],
    },
    generateQuestion: (tier) => {
      const q1 = () => makeMCQ('What is the main benefit of a trace table?', 'Tracking variable values line by line', ['Translating code into machine code', 'Preventing syntax errors', 'Converting data types'], 'Think about "tracing" the data state.', 'Trace tables let you track exactly what variable holds what value at each line.');
      const q2 = () => makeMCQ('Why do we use pseudocode?', 'It is easy to read and language-independent', ['It runs faster on CPUs', 'It automatically compiles to Python', 'It prevents all logic errors'], 'Pseudo means fake/imitation.', 'Pseudocode bridges the gap between English and strict, rigid code syntax.');
      return pick([q1, q2])();
    },
  },

  'searching-algorithms': {
    title: 'Searching Algorithms',
    emoji: '🔍',
    color: '#00d4ff',
    category: 'Algorithms & Thinking',
    description: 'Linear search and Binary search methods.',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'Linear Search', content: 'Checks every item in a list one-by-one until the target is found. Works on UNSORTED lists.', tip: 'Simple to code, but very slow for large amounts of data.' },
        { title: 'How it works', content: '1. Start at index 0. 2. Is it the target? 3. If no, move to next. 4. If yes, stop. 5. If end reached, not found.' }
      ],
      higher: [
        { title: 'Binary Search', content: 'Continually splits a SORTED list in half. Much faster than linear search for large datasets.', tip: 'Data MUST be in order first!' },
        { title: 'The Process', content: '1. Compare middle item. 2. Too small? Discard left. 3. Too big? Discard right. 4. Repat with the remaining half.' },
        { title: 'Efficiency', content: 'Linear search is O(n) - time increases group-wise. Binary search is O(log n) - much more efficient.', tip: 'In a list of 1,000,000 items, Binary takes max 20 steps, Linear could take 1,000,000!' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return makeMCQ('Which search algorithm checks every single item consecutively?', 'Linear search', ['Binary search', 'Bubble sort', 'Merge search'], 'Line by line.', 'Linear search walks down the line, evaluating every single element.');
      } else {
        return makeMCQ('What is an essential requirement for a Binary Search to work?', 'The data must be sorted', ['The data must be integers', 'The list must be short', 'The data must be unordered'], 'You can’t guess "higher or lower" if it\'s scrambled.', 'Binary search relies on data being sequentially ordered to discard halves safely.');
      }
    },
  },

  'sorting-algorithms': {
    title: 'Sorting Algorithms',
    emoji: '📊',
    color: '#00d4ff',
    category: 'Algorithms & Thinking',
    description: 'Bubble sort, Insertion sort, and Merge sort.',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'Bubble Sort', content: 'Compares adjacent items and swaps them if out of order. Repeats until a full pass occurs with no swaps.' },
        { title: 'Insertion Sort', content: 'Takes each item and "inserts" it into the correct position in a sorted sub-list.', example: 'Excellent for small lists or lists that are already mostly sorted.' },
        { title: 'Which to use?', content: 'Bubble is easy to code but inefficient. Insertion is better for small data.' }
      ],
      higher: [
        { title: 'Merge Sort', content: 'A "Divide and Conquer" algorithm. Splits list down to individual items, then merges them back together in order.' },
        { title: 'Algorithm Efficiency', content: 'Merge Sort is O(n log n). This is much faster than Bubble Sort\'s O(n²) for large lists.' },
        { title: 'Recursion', content: 'Merge sort often uses recursion (a function calling itself) to handle the repeated splitting of the list.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => makeMCQ('Which algorithm compares adjacent pairs to swap them?', 'Bubble sort', ['Insertion sort', 'Merge sort', 'Selection sort'], 'Think of items bubbling up.', 'Bubble sort iterates through the array comparing adjacent pairs.'),
          () => makeMCQ('Explain Insertion Sort conceptually.', 'Taking one item and putting it in its right place in a sorted section', ['Splitting lists in half', 'Swapping pairs across the whole list randomly', 'Returning the smallest item first'], 'Like organising a hand of playing cards.', 'Insertion sort builds a sorted array one element at a time.'),
        ];
        return pick(types)();
      } else {
        return makeMCQ('Which algorithm uses an efficient "Divide and Conquer" approach?', 'Merge sort', ['Bubble sort', 'Insertion sort', 'Binary sort'], 'It literally splits data in half constantly.', 'Merge Sort divides the array down to single elements and merges them in sorted order.');
      }
    },
  },

  'flowcharts-algorithm-design': {
    title: 'Flowcharts',
    emoji: '🗺️',
    color: '#00d4ff',
    category: 'Algorithms & Thinking',
    description: 'Interpreting decision paths and drawing algorithmic diagrams.',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'Flowchart Symbols', visualId: 'cs-flowchart', content: 'Oval = Start/End. Parallelogram = Input/Output. Rectangle = Process. Diamond = Decision (Requires Yes/No lines).' }
      ],
      higher: [
        { title: 'Translating Real Scenarios', content: 'Flowcharts visually represent selection (diamonds) and iteration (arrows looping back up to a previous stage) to map complex systems.' }
      ],
    },
    generateQuestion: (tier) => {
      const q1 = () => makeMCQ('In a flowchart, what shape represents a Decision?', 'Diamond', ['Rectangle', 'Parallelogram', 'Oval'], 'A bright jewel splits light.', 'Decisions branch off via Yes/No paths so they use diamond shapes.');
      const q2 = () => makeMCQ('What does a parallelogram represent in a flowchart?', 'Input/Output', ['Process', 'Start/Stop', 'Decision'], 'Data coming in or out.', 'Parallelograms represent getting input or outputting data.');
      const q3 = () => {
         const act = pick(['calculating the sum of two numbers', 'formatting a string', 'changing a variables value']);
         return makeMCQ(`If an algorithm is ${act}, which flowchart symbol must be used?`, 'Rectangle', ['Diamond', 'Oval', 'Parallelogram'], 'It is a pure process taking place.', 'A rectangle block in a flowchart is used strictly for internal processes or calculations.');
      };
      const q4 = () => {
         const check = pick(['checking if health == 0', 'checking if a user is logged in', 'determining if an age is >= 18']);
         return makeMCQ(`A flowchart is ${check}. Which symbol determines the path?`, 'Diamond', ['Rectangle', 'Parallelogram', 'Circle'], 'It decides between true and false.', 'A diamond represents a decision boolean causing branch selection.');
      };
      return pick([q1, q2, q3, q4])();
    },
  },

  // ==============================================================
  // PROGRAMMING CONCEPTS
  // ==============================================================

  'programming-fundamentals': {
    title: 'Programming Fundamentals',
    emoji: '💻',
    color: '#00ff94',
    category: 'Programming Concepts',
    description: 'Variables, core data types, assignment statements, and operators.',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'Variables', content: 'A named memory location holding data that CAN change.', example: 'score = 10' },
        { title: 'Constants', content: 'A named memory location holding data that CANNOT change while program runs.', example: 'PI = 3.14', tip: 'Using constants makes code easier to update!' },
        { title: 'Data Types', content: 'Integer (Whole), Real/Float (Decimal), Boolean (True/False), Character (one symbol), String (Text).' }
      ],
      higher: [
        { title: 'Arithmetic Operators', content: '+, -, *, /. Also MOD (remainder) and DIV (integer division).', example: '10 MOD 3 = 1\n10 DIV 3 = 3' },
        { title: 'String Manipulation', content: '.length (counts letters), .upper (UPPERCASE), .lower (lowercase), .substring(start, length).' },
        { title: 'Logical Operators', content: '== (Equal to), != (Not equal), < (Less than), > (Greater than).', tip: 'Assignment is one "=" symbol, comparison is two "==" symbols.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => makeMCQ('Which data type stores text like "Hello"?', 'String', ['Integer', 'Boolean', 'Real'], 'Think of a line of characters.', 'A String holds a sequence of characters.'),
          () => makeMCQ('What is a variable?', 'A named memory location that stores changing data', ['A piece of data that never changes', 'A type of loop', 'A logic error'], 'It "varies".', 'Variables act as buckets holding changeable data.'),
        ];
        return pick(types)();
      } else {
        const types = [
          () => makeMCQ('What operator calculates the remainder of a division?', 'MOD (Modulo)', ['DIV', '/', '*'], 'Modular arithmetic focuses on remainders.', 'Modulo (often represented as % or MOD) gives the remainder (e.g. 10 MOD 3 = 1).'),
          () => makeMCQ('Which data type is best for the number 3.14?', 'Real / Float', ['Integer', 'String', 'Boolean'], 'It has a decimal point.', 'Real (or Float) numbers support decimal precision.'),
        ];
        return pick(types)();
      }
    },
  },

  'programming-constructs': {
    title: 'Programming Constructs',
    emoji: '🏗️',
    color: '#00ff94',
    category: 'Programming Concepts',
    description: 'Sequence, selection, iteration, and nested loops.',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'Sequence & Selection', content: 'Sequence: Running code line-by-line from top to bottom. Selection: Making decisions using IF, ELSE, and ELIF statements.' },
        { title: 'Iteration', content: 'Iteration means looping. FOR loops repeat a set number of times (count-controlled). WHILE loops repeat until a condition is met (condition-controlled).' }
      ],
      higher: [
        { title: 'Nested Loops', content: 'Running a loop inside another loop. If the outer loop runs 3 times, and the inner runs 5 times, the code inside the inner loop runs 15 times total.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => makeMCQ('What programming construct uses IF/ELSE statements?', 'Selection', ['Sequence', 'Iteration', 'Casting'], 'You "select" a pathway.', 'Selection alters the flow to choose specific blocks of code.'),
          () => makeMCQ('What does "Iteration" mean?', 'Looping code', ['Running code from top to bottom', 'Making a decision', 'Finding an error'], 'Iterating refers to repeating.', 'Iteration involves FOR or WHILE loops to repeat actions.'),
          () => {
             const codeType = pick(['A WHILE loop checking a password', 'A FOR loop printing 10 numbers']);
             return makeMCQ(`What programming construct is demonstrated by: ${codeType}?`, 'Iteration', ['Selection', 'Sequence', 'Declaration'], 'It repeats over and over.', 'Loops are synonymous with iteration.');
          }
        ];
        return pick(types)();
      } else {
        const types = [
           () => {
             const inner = r(3, 7);
             const outer = r(2, 5);
             return makeMCQ(`If a nested inner loop runs ${inner} times, and the outer loop runs ${outer} times, how many times total does the inner code execute?`, `${inner * outer}`, [`${inner + outer}`, `${inner}`, `${outer}`], `${inner} * ${outer}`, `Outer loop (${outer}) multiplied by Inner loop (${inner}) equals ${inner * outer} iterations.`);
           },
           () => {
             const t1 = pick(['count-controlled', 'condition-controlled']);
             const res = t1 === 'count-controlled' ? 'FOR loop' : 'WHILE loop';
             const wrg = t1 === 'count-controlled' ? ['WHILE loop', 'IF statement', 'SWITCH statement'] : ['FOR loop', 'IF statement', 'DO statement'];
             return makeMCQ(`Which construct is strictly referred to as a ${t1} iteration?`, res, wrg, `Depends on if it counts rigidly or loops until a state changes.`, `A FOR loop is purely count-controlled, a WHILE loop runs until a condition is broken.`);
           }
        ];
        return pick(types)();
      }
    },
  },

  'errors-in-programming': {
    title: 'Errors in Programming',
    emoji: '🐛',
    color: '#00ff94',
    category: 'Programming Concepts',
    description: 'Syntax vs Logic errors and runtime issues.',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'Syntax Errors', content: 'Mistakes in the rules/grammar of the language (e.g., missing a bracket, misspelling "print"). The code refuses to run.' },
        { title: 'Logic Errors', content: 'The program runs without crashing, but does the wrong thing (e.g., adding instead of subtracting).' }
      ],
      higher: [
        { title: 'Runtime Errors', content: 'An error occurs while the program is actually running, causing a crash. E.g., dividing by zero or trying to open a file that does not exist.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => makeMCQ('Which type of error stops the code from running/compiling at all?', 'Syntax error', ['Logic error', 'Human error', 'Network error'], 'It violates the language rules.', 'Syntax errors mean the computer literally cannot understand the code grammar.'),
          () => makeMCQ('If your calculator app says 2+2=5, what type of error is this?', 'Logic error', ['Syntax error', 'Runtime error', 'Casting error'], 'The code ran, but the logic was flawed.', 'A logic error produces unexpected output without crashing.'),
        ];
        return pick(types)();
      } else {
        return makeMCQ('Attempting to divide a number by a variable holding 0 will result in what type of error?', 'Runtime error', ['Syntax error', 'Logic error', 'Boolean error'], 'It crashes during execution.', 'Math exceptions trigger runtime errors when evaluating impossible calculations live.');
      }
    },
  },

  'data-structures': {
    title: 'Data Structures',
    emoji: '📦',
    color: '#00ff94',
    category: 'Programming Concepts',
    description: '1D Arrays, 2D Arrays, and indexing.',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'Arrays (1D)', content: 'An array stores multiple items of the SAME data type under one identifier/name. You access items using an Index, which usually starts at 0.' }
      ],
      higher: [
        { title: 'Traversing & 2D Arrays', content: 'Traversing means using a loop to visit every item in the array sequentially. A 2D array is an array of arrays (like a grid with rows and columns).' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return makeMCQ('In computing, what number do array indexes usually start at?', '0', ['1', '-1', 'It depends on the array length'], 'Zero-indexed.', 'Most programming languages start indices at 0 (e.g., array[0] is the 1st element).');
      } else {
        return makeMCQ('What is typically used to traverse through all elements of an array?', 'A FOR loop or WHILE loop', ['An IF statement', 'An SQL query', 'A Logic Gate'], 'You need to iterate.', 'Loops provide controlled iteration to process every index in an array.');
      }
    },
  },

  // ==============================================================
  // LOGIC & DATA
  // ==============================================================

  'boolean-logic': {
    title: 'Boolean Logic',
    emoji: '⚡',
    color: '#ff2d78',
    category: 'Logic & Data',
    description: 'AND, OR, NOT logic gates and truth tables.',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'Logic Gates', visualId: 'cs-logic-gates', content: 'AND: Output is True ONLY if both inputs are True. OR: Output is True if AT LEAST ONE input is True. NOT: Reverses the input.' },
        { title: 'Truth Tables', content: 'Mathematical tables showing all possible input combinations (0s and 1s) and the resulting output for a logic circuit.' }
      ],
      higher: [
        { title: 'Logic Diagrams', content: 'Constructing entire circuits or reading long Boolean expressions like "A AND (B OR NOT C)". Work from brackets outwards.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => makeMCQ('Which logic gate outputs True ONLY if BOTH inputs are True?', 'AND', ['OR', 'NOT', 'XOR'], 'Both conditions must be met.', 'The AND gate requires a 1 on Input A and a 1 on Input B to output 1.'),
          () => makeMCQ('If the input to a NOT gate is 1, what is the output?', '0', ['1', '-1', 'True'], 'It reverses the truth.', 'NOT inverts logical states.'),
          () => {
             const inputA = pick(['1', '0']);
             const inputB = inputA === '1' ? '0' : '1';
             return makeMCQ(`If Input A is ${inputA} and Input B is ${inputB}, what is the output of an OR gate?`, '1', ['0', '-1', 'Null'], 'An OR gate requires AT LEAST one input to be 1.', `Since one of the inputs is 1, the OR gate evaluates to 1.`);
          }
        ];
        return pick(types)();
      } else {
        const types = [
           () => {
              const b1 = pick(['True', 'False']);
              const b2 = pick(['True', 'False']);
              const ans = (b1 === 'True' && b2 === 'True') ? 'True' : 'False';
              const wrg = ans === 'True' ? 'False' : 'True';
              return makeMCQ(`Evaluate: ${b1} AND (False OR ${b2})`, ans, [wrg, 'Error', 'Null'], 'Work through the brackets first.', `False OR ${b2} is ${b2}. Then ${b1} AND ${b2} is ${ans}.`);
           },
           () => {
              const x = pick(['1', '0']);
              const ans = x === '1' ? '0' : '1';
              const wrg = ans === '1' ? '0' : '1';
              return makeMCQ(`Evaluate a NOT gate applied twice in a row to the input ${x} (e.g. NOT(NOT(${x}))).`, x, [ans, '-1', 'Error'], 'It flips, then flips back.', `A double negation returns the original state. Output is ${x}.`);
           }
        ];
        return pick(types)();
      }
    },
  },

  'mathematical-logic-in-programs': {
    title: 'Mathematical Logic',
    emoji: '⚙️',
    color: '#ff2d78',
    category: 'Logic & Data',
    description: 'Combining conditional inputs logically to write reliable code rules.',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'Using Conditions', content: 'Using operators like > (Greater than), < (Less than), == (Equal to), and != (Not equal to) in IF statements.' }
      ],
      higher: [
        { title: 'Combining Logic', content: 'You can chain conditionals: "IF age > 18 AND ticket == True". Translating complex real-world rules directly into algorithmic expressions.' }
      ],
    },
    generateQuestion: (tier) => {
      return makeMCQ('What symbol usually means "Not Equal To" in code?', '!=', ['==', '>=', '='], 'An exclamation of difference.', '!= is the standard logical operator for checking inequality.');
    },
  },

  'databases-sql': {
    title: 'Databases & SQL',
    emoji: '🗄️',
    color: '#ff2d78',
    category: 'Logic & Data',
    description: 'SELECT, FROM, WHERE clauses, and searching structured data.',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'The SQL Basics', content: 'SQL (Structured Query Language). SELECT: Columns. FROM: Table. WHERE: Filter.' },
        { title: 'Wildcards', content: 'SELECT * means select ALL columns from the table.' },
        { title: 'Searching Text', content: 'Use LIKE with % to find partial matches.', example: 'WHERE Name LIKE "A%" finds all names starting with A.' }
      ],
      higher: [
        { title: 'Complex Queries', content: 'Use AND/OR to combine multiple WHERE conditions.', example: 'WHERE Price > 10 AND Stock < 5' },
        { title: 'Updating Data', content: 'UPDATE table SET column = value WHERE condition.', tip: 'Always include the WHERE clause or you\'ll update every row!' },
        { title: 'Inserting & Deleting', content: 'INSERT INTO table VALUES (...). DELETE FROM table WHERE condition.' },
        { title: 'Sorting Results', content: 'ORDER BY column ASC/DESC allows you to sort your output.', example: 'SELECT * FROM games ORDER BY price DESC' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => makeMCQ('Which SQL command filters records to meet a specific condition?', 'WHERE', ['SELECT', 'FROM', 'INSERT'], 'Finding the location/condition.', 'WHERE applies logical conditions to pull specific rows.'),
          () => makeMCQ('What does the * wildcard do in "SELECT *"?', 'Selects all fields/columns', ['Multiplies constraints', 'Sorts everything alphabetically', 'Selects the primary key only'], 'A universal selector.', 'The asterisk returns all available attributes in the table.'),
        ];
        return pick(types)();
      } else {
        return makeMCQ('If an SQL query reads `WHERE Price > 50 OR Stock < 10`, what gets returned?', 'Items over 50 OR items running low', ['Only items meeting both rules', 'All items', 'An error'], 'It is an either-or inclusive filter.', 'The OR operator pulls any record mapping to at least one condition.');
      }
    },
  },

};

export function getTopicsByCategory() {
  const grouped = {};
  for (const [slug, topic] of Object.entries(TOPICS)) {
    if (!grouped[topic.category]) grouped[topic.category] = [];
    grouped[topic.category].push({ slug, ...topic });
  }
  return grouped;
}

export function getAllTopicSlugs() {
  return Object.keys(TOPICS);
}

export function getTopicData(slug) {
  return TOPICS[slug];
}
