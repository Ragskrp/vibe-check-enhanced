// GCSE Maths Topic Data — All topic definitions for the dynamic route engine
// Each topic has: metadata, lesson cards (foundation + higher), and a question generator

const r = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[r(0, arr.length - 1)];
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

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

// ============================================================
// TOPIC DEFINITIONS
// ============================================================

const TOPICS = {

  // ─── NUMBER ────────────────────────────────────────────────

  'integers-place-value': {
    title: 'Integers & Place Value',
    emoji: '🔢',
    color: '#00e5a0',
    category: 'Number',
    description: 'Understand place value, ordering integers, and applying BIDMAS or operation hierarchies.',
    examWeight: 3,
    difficulty: 'low',
    estimatedMinutes: 8,
    prerequisites: [],
    questionTypes: ['mcq', 'numeric', 'ordering'],
    lessons: {
      foundation: [
        { title: 'Place Value Columns', content: 'Each position in a number represents a power of 10. Columns include Thousands, Hundreds, Tens, Units.', example: 'In 4,521, the 5 stands for 500.', tip: 'Use a place value grid if you find decimals or large numbers tricky.' },
        { title: 'BIDMAS / Order of Operations', content: 'Always perform calculations in this order: Brackets, Indices, Division/Multiplication (left to right), Addition/Subtraction (left to right).', formula: 'B -> I -> D/M -> A/S', example: '3 + 5 × 2 = 3 + 10 = 13', tip: 'Multiplication does NOT take priority over division; work left to right for those.' }
      ],
      higher: [
        { title: 'Complex Order of Operations', content: 'Apply index laws, algebraic groupings, and fractional boundaries within multi-step operation order problems.', example: '[3³ - (5 - 2)] ÷ 6 = [27 - 3] ÷ 6 = 24 ÷ 6 = 4', tip: 'Treat the top and bottom of a large fraction as if they are inside hidden brackets.' }
      ]
    },
    hacks: [
      { title: 'Left-to-Right Tiebreaker', content: 'When only addition/subtraction or multiplication/division remain, work strictly from left to right to prevent errors.' }
    ],
    advanced: [
      { title: 'Mathematical Proof Foundations', content: 'Use integer properties to demonstrate general arithmetic truths algebraically.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => {
            const num = r(1000, 9999);
            const digits = num.toString().split('');
            const pos = r(0, 3);
            const placeNames = ['units', 'tens', 'hundreds', 'thousands'];
            return { display: `In the number ${num}, what is the value of the digit in the ${placeNames[pos]} column?`, answer: parseInt(digits[3-pos]) * Math.pow(10, pos), hint: `The ${placeNames[pos]} column is 10^${pos}`, explanation: `The digit ${digits[3-pos]} in the ${placeNames[pos]} column represents ${parseInt(digits[3-pos]) * Math.pow(10, pos)}` };
          },
          () => {
            const a = r(2, 9); const b = r(2, 9); const c = r(2, 9);
            const ans = a + b * c;
            return { display: `Calculate: ${a} + ${b} × ${c}`, answer: ans, hint: 'BIDMAS: multiply first', explanation: `${b} × ${c} = ${b*c}, then ${a} + ${b*c} = ${ans}` };
          },
          () => {
            const nums = [r(10, 99), r(10, 99), r(10, 99), r(10, 99)];
            const sorted = [...nums].sort((a,b) => a-b);
            return { display: `Order from smallest to largest: ${nums.join(', ')}`, answer: sorted.join(', '), answerType: 'text', hint: 'Compare tens then units', explanation: `Sorted: ${sorted.join(', ')}`, type: 'ordering', items: nums };
          }
        ];
        return pick(types)();
      } else {
        const types = [
          () => {
            const a = r(2, 5); const b = r(2, 5); const c = r(2, 5); const d = r(2, 5);
            const inner = a * a - b;
            const outer = c * inner + d;
            return { display: `Evaluate: ${c} × (${a}² − ${b}) + ${d}`, answer: outer, hint: 'Brackets → Indices → Multiply → Add', explanation: `${a}² = ${a*a}, ${a*a} − ${b} = ${inner}, ${c} × ${inner} = ${c*inner}, + ${d} = ${outer}` };
          },
          () => {
            const num = r(2, 9) + r(1,9)/10 + r(1,9)/100;
            const rounded = Math.round(num * 10) / 10;
            return { display: `Round ${num} to 1 decimal place`, answer: rounded, hint: 'Look at the hundredths digit', explanation: `${num} → ${rounded} (hundredths digit is ${Math.round((num*100)%10)})` };
          }
        ];
        return pick(types)();
      }
    }
  },

  'primes-hcf-lcm': {
    title: 'Primes, HCF & LCM',
    emoji: '🌳',
    color: '#00e5a0',
    category: 'Number',
    description: 'Find prime factors, Highest Common Factors (HCF), and Lowest Common Multiples (LCM).',
    examWeight: 4,
    difficulty: 'medium',
    estimatedMinutes: 12,
    prerequisites: ['integers-place-value'],
    questionTypes: ['mcq', 'numeric', 'cloze'],
    lessons: {
      foundation: [
        { title: 'Prime Factor Decomposition', content: 'Break any number down into a product of prime numbers using a factor tree.', example: '24 = 2 × 2 × 2 × 3 = 2³ × 3', tip: 'Circle the prime numbers at the end of each branch so you do not lose them.' },
        { title: 'Listing for HCF and LCM', content: 'Find HCF by listing all factors and picking the highest. Find LCM by listing multiples and picking the lowest matching value.', example: 'Factors of 12: 1,2,3,4,6,12. Factors of 18: 1,2,3,6,9,18. HCF = 6.', tip: 'Listing works best for smaller numbers; use Venn diagrams for larger ones.' }
      ],
      higher: [
        { title: 'Venn Diagrams for HCF & LCM', content: 'Put common prime factors in the intersection of a Venn Diagram. HCF is the product of the center numbers. LCM is the product of ALL numbers in the circles.', example: '24 = 2³×3, 60 = 2²×3×5. Intersection has 2, 2, 3. HCF = 2×2×3 = 12. LCM = 2×12×5 = 120.', tip: 'Ensure numbers that appear multiple times are represented accurately in power sets.' }
      ]
    },
    hacks: [
      { title: 'The Product Formula', content: 'For any two numbers A and B: A × B = HCF(A,B) × LCM(A,B). If you know three values, you can find the fourth instantly.' }
    ],
    advanced: [
      { title: 'Cryptographic Primes', content: 'Understand how prime factor limits underpin modern digital security and RSA encryption keys.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => {
            const primes = [2, 3, 5, 7, 11, 13, 17, 19];
            const p = pick(primes);
            const mult = pick([2, 3, 4, 5, 6, 7, 8, 9]);
            const n = p * mult;
            return { display: `Which of these is a prime factor of ${n}?`, answer: p, options: [p, mult, p*mult, 1].filter(x => x !== p).slice(0,3), hint: 'Prime factors are prime numbers that divide exactly', explanation: `${n} = ${p} × ${mult}, so ${p} is a prime factor` };
          },
          () => {
            const pairs = [[12, 18, 6], [8, 12, 4], [15, 20, 5], [24, 36, 12], [14, 21, 7], [16, 24, 8]];
            const [a, b, hcf] = pick(pairs);
            return { display: `Find the HCF of ${a} and ${b}`, answer: hcf, hint: 'List the factors of both numbers', explanation: `Factors of ${a}: ${Array.from({length: a}, (_, i) => i + 1).filter(x => a % x === 0).join(', ')}\nFactors of ${b}: ${Array.from({length: b}, (_, i) => i + 1).filter(x => b % x === 0).join(', ')}\nHCF = ${hcf}` };
          },
          () => {
            const pairs = [[3, 4, 12], [4, 6, 12], [5, 6, 30], [3, 7, 21], [6, 8, 24], [4, 10, 20]];
            const [a, b, lcm] = pick(pairs);
            return { display: `Find the LCM of ${a} and ${b}`, answer: lcm, hint: 'List multiples until you find a match', explanation: `Multiples of ${a}: ${[1,2,3,4,5,6,7,8].map(x=>a*x).join(', ')}\nMultiples of ${b}: ${[1,2,3,4,5,6,7,8].map(x=>b*x).join(', ')}\nLCM = ${lcm}` };
          }
        ];
        return pick(types)();
      } else {
        const types = [
          () => {
            const pairs = [[24, 36, 12], [30, 45, 15], [48, 60, 12], [36, 84, 12], [42, 56, 14]];
            const [a, b, hcf] = pick(pairs);
            return { display: `Find the HCF of ${a} and ${b} using prime factorisation`, answer: hcf, hint: 'Break into prime factors first', explanation: `HCF(${a}, ${b}) = ${hcf}` };
          },
          () => {
            const pairs = [[12, 18, 36], [15, 20, 60], [8, 14, 56], [9, 12, 36], [10, 15, 30]];
            const [a, b, lcm] = pick(pairs);
            return { display: `Find the LCM of ${a} and ${b} using prime factorisation`, answer: lcm, hint: 'Use Venn diagram or prime factors', explanation: `LCM(${a}, ${b}) = ${lcm}` };
          },
          () => {
            const a = pick([12, 18, 24, 30, 36, 40, 48, 60]);
            const b = pick([8, 10, 14, 15, 20, 21, 25, 28]);
            const h = gcd(a, b);
            return { display: `HCF(${a}, ${b}) = ${h}. Find LCM(${a}, ${b})`, answer: (a * b) / h, hint: 'HCF × LCM = a × b', explanation: `LCM = (${a} × ${b}) ÷ ${h} = ${(a * b) / h}` };
          }
        ];
        return pick(types)();
      }
    }
  },

  'fractions-decimals-percentages': {
    title: 'Fractions, Decimals & Percentages',
    emoji: '🍰',
    color: '#00e5a0',
    category: 'Number',
    description: 'Convert, compare, and perform four-operation arithmetic across fractions, decimals, and percentages.',
    examWeight: 5,
    difficulty: 'medium',
    estimatedMinutes: 15,
    prerequisites: ['integers-place-value'],
    questionTypes: ['mcq', 'numeric', 'fraction', 'cloze', 'ordering'],
    lessons: {
      foundation: [
        { title: 'Adding & Subtracting Fractions', content: 'Find a common denominator first, adjust the numerators, combine them, and simplify.', formula: 'a/c + b/c = (a+b)/c', example: '1/4 + 2/3 = 3/12 + 8/12 = 11/12', tip: 'Multiplying the two denominators always gives a common denominator, though not always the lowest.' },
        { title: 'Multiplying & Dividing Fractions', content: 'Multiply straight across for multiplication. For division, flip the second fraction and multiply (Keep-Change-Flip).', formula: '(a/b) ÷ (c/d) = (a/b) × (d/c)', example: '2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6', tip: 'Simplify your fractions before multiplying to keep numbers smaller and easier to handle.' }
      ],
      higher: [
        { title: 'Recurring Decimals to Fractions', content: 'Set x equal to the decimal. Multiply by a power of 10 to shift one full repeating loop, subtract x to clear the recurrence, and solve.', example: 'x = 0.777... → 10x = 7.777... → 9x = 7 → x = 7/9', tip: 'The number of repeating digits tells you whether to multiply by 10, 100, or 1000.' }
      ]
    },
    hacks: [
      { title: 'The Cross-Multiplication Comparison', content: 'To see if a/b or c/d is larger, calculate a×d and b×c. Whichever product is bigger points to the larger fraction.' }
    ],
    advanced: [
      { title: 'Infinite Geometric Progressions', content: 'See how recurring decimals are actually sums of infinite geometric series where common ratios are fractions of 10.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => {
            const n1 = r(1, 8); const d1 = r(2, 9); const n2 = r(1, 8); const d2 = r(2, 9);
            const num = n1 * d2 + n2 * d1;
            const den = d1 * d2;
            const g = gcd(num, den);
            return { display: `${n1}/${d1} + ${n2}/${d2} = ?`, answer: `${num/g}/${den/g}`, answerType: 'fraction', hint: 'Find common denominator', explanation: `${n1}/${d1} + ${n2}/${d2} = ${n1*d2}/${d1*d2} + ${n2*d1}/${d1*d2} = ${num}/${den} = ${num/g}/${den/g}` };
          },
          () => {
            const n1 = r(1, 8); const d1 = r(2, 9); const n2 = r(1, 8); const d2 = r(2, 9);
            const num = n1 * n2;
            const den = d1 * d2;
            const g = gcd(num, den);
            return { display: `${n1}/${d1} × ${n2}/${d2} = ?`, answer: `${num/g}/${den/g}`, answerType: 'fraction', hint: 'Multiply straight across', explanation: `${n1}/${d1} × ${n2}/${d2} = ${num}/${den} = ${num/g}/${den/g}` };
          },
          () => {
            const frac = pick(['1/2', '1/4', '3/4', '1/5', '2/5', '3/5', '4/5', '1/8', '3/8', '5/8', '7/8']);
            const [n, d] = frac.split('/').map(Number);
            return { display: `Convert ${frac} to a decimal`, answer: n/d, hint: 'Divide numerator by denominator', explanation: `${n} ÷ ${d} = ${n/d}` };
          },
          () => {
            const p = r(10, 90);
            return { display: `Convert ${p}% to a fraction in simplest form`, answer: `${p/10}/${10}`, answerType: 'fraction', hint: 'Percentage means out of 100', explanation: `${p}% = ${p}/100 = ${p/10}/10` };
          }
        ];
        return pick(types)();
      } else {
        const types = [
          () => {
            const recurring = pick(['0.3...', '0.6...', '0.1...', '0.09...', '0.12...', '0.123...']);
            let answer, explanation;
            if (recurring === '0.3...') { answer = '1/3'; explanation = 'x = 0.333... → 10x = 3.333... → 9x = 3 → x = 1/3'; }
            else if (recurring === '0.6...') { answer = '2/3'; explanation = 'x = 0.666... → 10x = 6.666... → 9x = 6 → x = 2/3'; }
            else if (recurring === '0.1...') { answer = '1/9'; explanation = 'x = 0.111... → 10x = 1.111... → 9x = 1 → x = 1/9'; }
            else if (recurring === '0.09...') { answer = '1/11'; explanation = 'x = 0.0909... → 100x = 9.0909... → 99x = 9 → x = 1/11'; }
            else if (recurring === '0.12...') { answer = '4/33'; explanation = 'x = 0.1212... → 100x = 12.1212... → 99x = 12 → x = 4/33'; }
            else { answer = '41/333'; explanation = 'x = 0.123123... → 1000x = 123.123... → 999x = 123 → x = 41/333'; }
            return { display: `Convert ${recurring} to a fraction in simplest form`, answer, answerType: 'fraction', hint: 'Let x = the decimal, multiply to shift repeat', explanation };
          },
          () => {
            const n1 = r(1, 8); const d1 = r(2, 9); const n2 = r(1, 8); const d2 = r(2, 9);
            const num = n1 * d2;
            const den = d1 * n2;
            const g = gcd(num, den);
            return { display: `${n1}/${d1} ÷ ${n2}/${d2} = ?`, answer: `${num/g}/${den/g}`, answerType: 'fraction', hint: 'Keep-Change-Flip', explanation: `${n1}/${d1} ÷ ${n2}/${d2} = ${n1}/${d1} × ${d2}/${n2} = ${num}/${den} = ${num/g}/${den/g}` };
          }
        ];
        return pick(types)();
      }
    }
  },

  'indices-standard-form': {
    title: 'Indices & Standard Form',
    emoji: '🚀',
    color: '#00e5a0',
    category: 'Number',
    description: 'Master index laws, zero, negative, fractional indices, and reading/writing values in standard form.',
    examWeight: 4,
    difficulty: 'medium',
    estimatedMinutes: 15,
    prerequisites: ['integers-place-value'],
    questionTypes: ['mcq', 'numeric', 'cloze'],
    lessons: {
      foundation: [
        { title: 'Basic Laws of Indices', content: 'When multiplying, add powers. When dividing, subtract powers. When raising a power to a power, multiply them.', formula: 'x^a × x^b = x^(a+b), x^a ÷ x^b = x^(a-b), (x^a)^b = x^(ab)', example: 'y⁴ × y³ = y⁷', tip: 'These rules only work when the base numbers or variables are identical.' },
        { title: 'Converting Standard Form', content: 'Write numbers as a value between 1 and 10 multiplied by a power of 10.', formula: 'A × 10^n (where 1 ≤ A < 10)', example: '45,000 = 4.5 × 10⁴; 0.0032 = 3.2 × 10⁻³', tip: 'A positive index means a large number; a negative index means a tiny number closer to zero.' }
      ],
      higher: [
        { title: 'Negative & Fractional Indices', content: 'A negative index means the reciprocal. A fractional index means a root, where the denominator is the root and the numerator is the power.', formula: 'x^(-n) = 1/(x^n), x^(a/b) = b√(x^a)', example: '8^(-2/3) = 1 / (³√8)² = 1 / 2² = 1/4', tip: 'Deal with the root part first to keep numbers smaller before applying the power.' }
      ]
    },
    hacks: [
      { title: 'Power of Zero Rule', content: 'Anything to the power of 0 is always 1. x⁰ = 1, 5⁰ = 1, (123x)⁰ = 1. Do not let big expressions trick you!' }
    ],
    advanced: [
      { title: 'Exponential Equations', content: 'Solve equations where the unknown variable is an index by converting bases to identical prime foundations.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => {
            const b = r(2, 6); const m = r(2, 5); const n = r(2, 5);
            return makeMCQ(`${b}^${m} × ${b}^${n} = ${b}^?`, `${m + n}`, [`${m * n}`, `${Math.abs(m - n)}`, `${m + n + 1}`], 'Add the powers.', `${b}^${m + n}`);
          },
          () => {
            const b = r(2, 6); const m = r(6, 12); const n = r(2, 5);
            return makeMCQ(`${b}^${m} ÷ ${b}^${n} = ${b}^?`, `${m - n}`, [`${m / n}`, `${m + n}`, '0'], 'Subtract the powers.', `${b}^${m - n}`);
          },
          () => {
            const b = r(2, 10);
            return makeMCQ(`Evaluate ${b}⁰`, '1', ['0', `${b}`, `${b * 10}`], 'Anything to the power of 0 is...', '1');
          },
          () => {
            const a = r(1, 9); const p = r(2, 6);
            const num = a * Math.pow(10, p);
            return { display: `Write ${num.toLocaleString()} in standard form`, answer: `${a} × 10^${p}`, answerType: 'text', hint: 'Move decimal point', explanation: `${num.toLocaleString()} = ${a} × 10^${p}`, placeholder: 'e.g. 3.5 × 10^4' };
          },
          () => {
            const a = pick([1.2, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9]); const p = r(2, 5);
            return { display: `Convert ${a} × 10^${p} to an ordinary number`, answer: a * Math.pow(10, p), hint: 'Move decimal point right', explanation: `${a} × 10^${p} = ${a * Math.pow(10, p)}` };
          }
        ];
        return pick(types)();
      } else {
        const types = [
          () => {
            const b = r(2, 4); const m = r(2, 3); const n = r(2, 3);
            return makeMCQ(`(${b}^${m})^${n} = ${b}^?`, `${m * n}`, [`${m + n}`, `${m ** n}`, '1'], 'Multiply the powers.', `${b}^${m * n}`);
          },
          () => {
            const b = r(2, 9); const n = r(2, 4);
            return makeMCQ(`${b}^(-${n}) = ?`, `1/${b}^${n}`, [`-${b}^${n}`, `1/${b}^${n+1}`, `${b}^${n}`], 'Negative power = reciprocal', `1/${b}^${n}`);
          },
          () => {
            const b = r(2, 5); const p = r(2, 3); const q = r(2, 3);
            const root = Math.round(Math.pow(b, p/q) * 100) / 100;
            return makeMCQ(`${b}^(${p}/${q}) = ?`, `${root}`, [`${b}^${p*q}`, `${b}^${p+q}`, `${Math.round(Math.pow(b, q/p)*100)/100}`], 'Denominator = root, numerator = power', `${b}^(${p}/${q}) = ${root}`);
          },
          () => {
            const a1 = r(2, 5); const a2 = r(2, 4); const p1 = r(2, 4); const p2 = r(2, 4);
            let ra = a1 * a2; let rp = p1 + p2;
            if (ra >= 10) { rp += 1; ra /= 10; }
            return { display: `(${a1} × 10^${p1}) × (${a2} × 10^${p2}) = ? × 10^?`, answer: `${ra} × 10^${rp}`, answerType: 'text', hint: 'Multiply numbers, add powers', explanation: `${a1}×${a2}=${a1*a2}, 10^${p1}×10^${p2}=10^${p1+p2} = ${ra} × 10^${rp}`, placeholder: 'e.g. 6 × 10^7' };
          }
        ];
        return pick(types)();
      }
    }
  },

  'surds': {
    title: 'Surds & Irrational Numbers',
    emoji: '🧮',
    color: '#00e5a0',
    category: 'Number',
    description: 'Simplify surds, expand expressions containing surds, and rationalise denominators.',
    examWeight: 4,
    difficulty: 'high',
    estimatedMinutes: 15,
    prerequisites: ['primes-hcf-lcm', 'indices-standard-form'],
    questionTypes: ['mcq', 'numeric', 'fraction', 'cloze'],
    lessons: {
      foundation: [
        { title: 'Introduction to Square Roots', content: 'A square root of a number multiplied by itself gives the original number. Perfect squares have integer roots.', formula: '√a × √a = a', example: '√25 = 5', tip: 'Know your square numbers up to 15!' }
      ],
      higher: [
        { title: 'Simplifying Surds', content: 'Find the largest perfect square factor of the number under the root and take it outside.', formula: '√(ab) = √a × √b', example: '√18 = √(9×2) = 3√2', tip: 'Always look for 4, 9, 16, 25, or 36 as factors.' },
        { title: 'Rationalising Denominators', content: 'Multiply the top and bottom of the fraction by the surd on the bottom to remove the root from the denominator.', formula: 'a / √b = (a√b) / b', example: '5 / √3 = 5√3 / 3', tip: 'For denominators like a + √b, multiply by its conjugate a - √b.' }
      ]
    },
    hacks: [
      { title: 'Conjugate Pair Trick', content: 'Multiplying (a + √b)(a - √b) always results in an integer: a² - b. Eliminates the middle surd term completely.' }
    ],
    advanced: [
      { title: 'Algebraic Surds', content: 'Simplify expressions where variables are under roots using identical laws of indices and surds.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const squares = [4, 9, 16, 25, 36, 49, 64, 81, 100];
        const n = pick(squares);
        return { display: `√${n} = ?`, answer: Math.sqrt(n), hint: 'What number squared gives this?', explanation: `√${n} = ${Math.sqrt(n)} because ${Math.sqrt(n)}² = ${n}` };
      } else {
        const types = [
          () => {
            const squareFactors = [4, 9, 16, 25, 36];
            const factor = pick(squareFactors);
            const other = pick([2, 3, 5, 6, 7, 10, 11, 13, 14, 15, 17, 19]);
            const n = factor * other;
            const root = Math.sqrt(factor);
            return { display: `Simplify √${n}`, answer: `${root}√${other}`, answerType: 'text', hint: 'Find largest square factor', explanation: `√${n} = √(${factor} × ${other}) = √${factor} × √${other} = ${root}√${other}`, placeholder: 'e.g. 3√2' };
          },
          () => {
            const a = r(1, 9); const b = r(2, 9);
            return { display: `Rationalise: ${a} / √${b}`, answer: `${a}√${b} / ${b}`, answerType: 'text', hint: 'Multiply top and bottom by √b', explanation: `${a}/√${b} = ${a}√${b}/${b}`, placeholder: 'e.g. 5√3/3' };
          },
          () => {
            const a = r(1, 5); const b = r(2, 7);
            const num = a * a - b;
            return { display: `Simplify (${a} + √${b})(${a} - √${b})`, answer: num, hint: 'Difference of two squares', explanation: `(${a}+√${b})(${a}-√${b}) = ${a}² - ${b} = ${a*a} - ${b} = ${num}` };
          }
        ];
        return pick(types)();
      }
    }
  },

  'bounds-error-intervals': {
    title: 'Bounds & Error Intervals',
    emoji: '📏',
    color: '#00e5a0',
    category: 'Number',
    description: 'Calculate upper and lower bounds for rounded values and express structural error intervals.',
    examWeight: 3,
    difficulty: 'medium',
    estimatedMinutes: 12,
    prerequisites: ['integers-place-value'],
    questionTypes: ['mcq', 'numeric', 'cloze'],
    lessons: {
      foundation: [
        { title: 'Finding Single Bounds', content: 'To find upper and lower bounds, find half of the unit the value was rounded to, then add it for the upper bound and subtract it for the lower bound.', example: 'Mass = 70kg to the nearest 10kg. Half unit = 5kg. LB = 65kg, UB = 75kg.', tip: 'The upper bound is the limit the value cannot quite reach, written using inequalities like x < 75.' }
      ],
      higher: [
        { title: 'Calculations with Bounds', content: 'For maximum combined values: add UB+UB, multiply UB×UB, or divide UB÷LB. For minimum combined values: subtract LB-UB, or divide LB÷UB.', example: 'Speed = Distance ÷ Time. Max Speed = Max Distance ÷ Min Time.', tip: 'Always substitute the individual bounds into your formula before doing the arithmetic.' }
      ]
    },
    hacks: [
      { title: 'Division Bound Rule', content: 'To get the biggest value from a division, use the biggest numerator possible divided by the smallest denominator possible.' }
    ],
    advanced: [
      { title: 'Truncation vs Rounding Error Intervals', content: 'Contrast inequalities generated by standard decimal rounding rules against those built from absolute floor truncation systems.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => { const v = r(10, 90) * 10; return { display: `${v} is rounded to the nearest 10.\nWhat is the lower bound?`, answer: v - 5, hint: 'Subtract half the unit', explanation: `Lower bound = ${v} − 5 = ${v - 5}` }; },
          () => { const v = r(10, 90) * 10; return { display: `${v} is rounded to the nearest 10.\nWhat is the upper bound?`, answer: v + 5, hint: 'Add half the unit', explanation: `Upper bound = ${v} + 5 = ${v + 5}` }; },
          () => { const w = r(1, 9); const d = r(1, 9); const v = w + d / 10; return { display: `${v} is rounded to 1 d.p.\nWhat is the lower bound?`, answer: v - 0.05, hint: 'Subtract 0.05', explanation: `LB = ${v} − 0.05 = ${v - 0.05}` }; }
        ];
        return pick(types)();
      } else {
        const types = [
          () => { const v = r(10, 50) * 100; return { display: `${v} is rounded to the nearest 100.\nWrite the error interval.`, answer: `${v - 50} ≤ x < ${v + 50}`, answerType: 'text', hint: 'LB ≤ x < UB', explanation: `${v - 50} ≤ x < ${v + 50}`, placeholder: 'e.g. 150 ≤ x < 250' }; },
          () => { const l = r(3, 9) + r(1, 9) / 10; const w = r(2, 7) + r(1, 9) / 10; const maxA = ((l + 0.05) * (w + 0.05)); return { display: `l = ${l} cm, w = ${w} cm (1 d.p.)\nFind the maximum area (2 d.p.)`, answer: Math.round(maxA * 100) / 100, hint: 'Use upper bounds for both', explanation: `Max l = ${l + 0.05}, Max w = ${w + 0.05}\nArea = ${Math.round(maxA * 100) / 100}` }; }
        ];
        return pick(types)();
      }
    }
  },

  'expanding-simplifying': {
    title: 'Expanding & Simplifying',
    emoji: '🎒',
    color: '#00e5a0',
    category: 'Algebra',
    description: 'Collect like terms, multiply single or double brackets, and simplify algebraic terms.',
    examWeight: 5,
    difficulty: 'low',
    estimatedMinutes: 10,
    prerequisites: ['integers-place-value'],
    questionTypes: ['mcq', 'cloze'],
    lessons: {
      foundation: [
        { title: 'Collecting Like Terms', content: 'You can only add or subtract terms with identical variables and powers.', example: '3x + 4y - x + 2y = 2x + 6y', tip: 'Circle or underline like terms along with the operational sign right in front of them.' },
        { title: 'Single Bracket Expansion', content: 'Multiply the term on the outside of the bracket by every single term inside the bracket.', formula: 'a(b + c) = ab + ac', example: '4(2x - 3) = 8x - 12', tip: 'Be extremely careful when multiplying by a negative term outside brackets.' }
      ],
      higher: [
        { title: 'Triple Bracket Expansion', content: 'Expand two brackets first, simplify that result completely, and then multiply that new trinomial expression by the third remaining bracket.', example: '(x+1)(x+2)(x+3) = (x²+3x+2)(x+3) = x³ + 6x² + 11x + 6', tip: 'Keep your work clean and organized in rows to avoid missing cross-product terms.' }
      ]
    },
    hacks: [
      { title: 'FOIL Method for Double Brackets', content: 'Remember First, Outer, Inner, Last when expanding two brackets to ensure you check all four multiplication steps.' }
    ],
    advanced: [
      { title: 'Binomial Theorem Basics', content: 'Spot simple expansion coefficient patterns using combinations from Pascal\'s Triangle for higher powers.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => { const a = r(2, 6); const b = r(1, 10); const c = r(1, 10); return { display: `Expand: ${a}(${b}x + ${c})\nWhat is the coefficient of x?`, answer: a * b, hint: 'Multiply through', explanation: `${a} × ${b}x = ${a * b}x` }; },
          () => { const a = r(2, 8); const b = r(1, 10); return { display: `Expand: ${a}(x + ${b})\nWhat is the constant term?`, answer: a * b, hint: 'Multiply the constant', explanation: `${a} × ${b} = ${a * b}` }; },
          () => { const a = r(2, 8); const b = r(1, 6); const c = r(1, 8); const d = r(1, 4); return { display: `Simplify: ${a}x + ${b} + ${c}x − ${d}`, answer: `${a + c}x + ${b - d}`, answerType: 'text', hint: 'Collect x terms', explanation: `${a}x + ${c}x = ${a + c}x\n${b} − ${d} = ${b - d}\nAnswer: ${a + c}x + ${b - d}` }; }
        ];
        return pick(types)();
      } else {
        const types = [
          () => { const a = r(1, 6); const b = r(1, 6); return { display: `Expand (x + ${a})(x + ${b})\nWhat is the coefficient of x?`, answer: a + b, hint: 'FOIL — add inner and outer', explanation: `Outer: ${b}x, Inner: ${a}x\nTotal: ${a + b}x` }; },
          () => { const a = r(1, 6); const b = r(1, 6); return { display: `Expand (x + ${a})(x + ${b})\nWhat is the constant term?`, answer: a * b, hint: 'Last terms multiply', explanation: `${a} × ${b} = ${a * b}` }; },
          () => { const a = r(2, 8); return { display: `Expand (x + ${a})(x − ${a})\nWhat is the constant?`, answer: -(a * a), hint: 'Difference of two squares', explanation: `(x+${a})(x−${a}) = x² − ${a}² = x² − ${a * a}` }; }
        ];
        return pick(types)();
      }
    }
  },

  'factorising': {
    title: 'Factorising Expressions',
    emoji: '🗝️',
    color: '#00e5a0',
    category: 'Algebra',
    description: 'Extract common factors, factorise simple and complex quadratics, and recognize the difference of two squares.',
    examWeight: 6,
    difficulty: 'medium',
    estimatedMinutes: 15,
    prerequisites: ['expanding-simplifying'],
    questionTypes: ['mcq', 'cloze'],
    lessons: {
      foundation: [
        { title: 'Common Factor Extraction', content: 'Find the Highest Common Factor of numbers and letters, and pull it outside a single set of brackets.', example: '6x² + 9x = 3x(2x + 3)', tip: 'Check your answer by expanding it back out; it should match the original question.' },
        { title: 'Basic Quadratic Factorising', content: 'For quadratics like x² + bx + c, find two numbers that multiply to c and add to b to place inside two sets of brackets.', formula: 'x² + (p+q)x + pq = (x+p)(x+q)', example: 'x² + 5x + 6 = (x+2)(x+3)', tip: 'If c is negative, your two bracket numbers must have opposite signs.' }
      ],
      higher: [
        { title: 'Complex Quadratic Factorising', content: 'When a > 1 in ax² + bx + c, split the middle term bx using factors of (a × c) to complete factorisation by grouping.', example: '2x² + 5x + 2 = 2x² + 4x + x + 2 = 2x(x+2) + 1(x+2) = (2x+1)(x+2)', tip: 'Always verify if there is an overall common numerical factor you can pull out first to simplify things.' }
      ]
    },
    hacks: [
      { title: 'Difference of Two Squares (DOTS)', content: 'Whenever you see two perfect squares subtracted with no middle term, it factorises instantly into matching brackets with opposite signs: x² - a² = (x-a)(x+a).' }
    ],
    advanced: [
      { title: 'Factorising Higher Degree Polynomials', content: 'Apply algebraic remainder concepts to isolate matching terms out of advanced multi-variable expressions.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const a = r(2, 8); const b = r(1, 10); const c = r(1, 10);
        return { display: `Factorise: ${a * b}x + ${a * c}\nWhat is the common factor?`, answer: a, hint: 'HCF of both terms', explanation: `HCF of ${a * b} and ${a * c} = ${a}\n${a}(${b}x + ${c})` };
      } else {
        const types = [
          () => { const p = r(1, 8); const q = r(1, 8); return { display: `Factorise: x² + ${p + q}x + ${p * q}\nWhat is the smaller bracket number?`, answer: Math.min(p, q), hint: 'Two numbers multiply to give c, add to give b', explanation: `${Math.min(p, q)} × ${Math.max(p, q)} = ${p * q}\n${Math.min(p, q)} + ${Math.max(p, q)} = ${p + q}\n= (x + ${Math.min(p, q)})(x + ${Math.max(p, q)})` }; },
          () => { const a = r(2, 9); return { display: `Factorise: x² − ${a * a}`, answer: a, hint: 'Difference of two squares — what is the value that squares to give the constant?', explanation: `x² − ${a * a} = (x + ${a})(x − ${a})` }; }
        ];
        return pick(types)();
      }
    }
  },

  'linear-equations': {
    title: 'Linear Equations',
    emoji: '⚖️',
    color: '#00e5a0',
    category: 'Algebra',
    description: 'Solve linear equations with unknowns on one or both sides, including fractional configurations.',
    examWeight: 5,
    difficulty: 'low',
    estimatedMinutes: 12,
    prerequisites: ['expanding-simplifying'],
    questionTypes: ['numeric', 'cloze'],
    lessons: {
      foundation: [
        { title: 'Unknowns on One Side', content: 'Isolate the variable by doing inverse operations to both sides of the equation.', example: '3x - 4 = 11 -> 3x = 15 -> x = 5', tip: 'Always work backward against standard arithmetic operation priority.' },
        { title: 'Unknowns on Both Sides', content: 'Move all terms with variables to one side and numbers to the other, ideally moving the smaller coefficient.', example: '5x + 2 = 2x + 14 -> 3x + 2 = 14 -> 3x = 12 -> x = 4', tip: 'Subtracting the smaller variable term keeps your coefficients positive, avoiding minus sign slips.' }
      ],
      higher: [
        { title: 'Complex Fractional Linear Equations', content: 'Clear denominators completely by multiplying every term by the Lowest Common Multiple of all the denominators.', example: '(x/2) + ((x-1)/3) = 4 -> 3x + 2(x-1) = 24 -> 5x - 2 = 24 -> 5x = 26 -> x = 5.2', tip: 'Be sure to multiply single stand-alone constants by the LCM as well.' }
      ]
    },
    hacks: [
      { title: 'The Equal Balance Rule', content: 'Treat the equals sign like a balance scale. Whatever operation you apply to one side, you must apply to the other side to keep it true.' }
    ],
    advanced: [
      { title: 'Matrix Representations', content: 'Explore how multi-variable linear arrays map to transformation matrices used widely across computer physics software.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const x = r(2, 12); const a = r(2, 6); const b = r(1, 10); const c = a * x + b;
        return { display: `Solve: ${a}x + ${b} = ${c}`, answer: x, hint: 'Inverse operations', explanation: `${a}x = ${c} − ${b} = ${c - b}\nx = ${c - b} ÷ ${a} = ${x}` };
      } else {
        const x = r(2, 10); const d = r(2, 5); const b = r(1, 8); const c = x / d + b;
        return { display: `Solve: x/${d} + ${b} = ${c}`, answer: x, hint: 'Clear the fraction first', explanation: `x/${d} = ${c - b}\nx = ${d} × ${c - b} = ${x}` };
      }
    }
  },

  'rearranging-formulae': {
    title: 'Rearranging Formulae',
    emoji: '🔧',
    color: '#00e5a0',
    category: 'Algebra',
    description: 'Change the subject of a formula, including cases where the target variable appears multiple times.',
    examWeight: 4,
    difficulty: 'medium',
    estimatedMinutes: 12,
    prerequisites: ['linear-equations', 'factorising'],
    questionTypes: ['mcq', 'cloze'],
    lessons: {
      foundation: [
        { title: 'Simple Two-Step Rearranging', content: 'Isolate the target variable by performing matching inverse operations on both sides.', example: 'Make x the subject of y = 3x - 5. Add 5 -> y + 5 = 3x. Divide by 3 -> x = (y + 5)/3.', tip: 'Undo additions or subtractions before dealing with coefficients.' }
      ],
      higher: [
        { title: 'Subject Appearing Twice', content: 'Gather all terms containing the new subject on one side, move everything else to the opposite side, and factorise out the subject.', example: 'Make x the subject of ax + b = cx + d -> ax - cx = d - b -> x(a - c) = d - b -> x = (d - b)/(a - c)', tip: 'Factorising is the key step to turning two appearances of a variable into a single one.' }
      ]
    },
    hacks: [
      { title: 'Factorisation Pivot Trick', content: 'If the variable you want to make the subject is stuck inside multiple terms, group them together and factorise. This isolates it instantly.' }
    ],
    advanced: [
      { title: 'Inverting Composed Operator Sets', content: 'Formulate algebraic inverse rules across composite non-linear functions by carefully reversing operational paths.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const a = r(2, 6); const b = r(1, 10);
        return makeMCQ(`Make x the subject of: y = ${a}x + ${b}`, `x = (y - ${b}) / ${a}`, [`x = y - ${b}`, `x = ${a}y + ${b}`, `x = (y + ${b}) / ${a}`], 'Undo the operations in reverse order', `y = ${a}x + ${b} → y - ${b} = ${a}x → x = (y - ${b})/${a}`);
      } else {
        const a = r(2, 5); const b = r(2, 5); const c = r(1, 8);
        return makeMCQ(`Make x the subject: ${a}x + ${b} = ${c}x + d`, `x = (d - ${b}) / (${a} - ${c})`, [`x = d - ${b}`, `x = ${a} - ${c}`, `x = (d + ${b}) / (${a} + ${c})`], 'Collect x terms, factorise, divide', `${a}x - ${c}x = d - ${b} → x(${a} - ${c}) = d - ${b} → x = (d - ${b})/(${a} - ${c})`);
      }
    }
  },

  'quadratic-equations': {
    title: 'Quadratic Equations',
    emoji: '📐',
    color: '#00e5a0',
    category: 'Algebra',
    description: 'Solve quadratics by factorising, completing the square, and using the formula.',
    examWeight: 8,
    difficulty: 'high',
    estimatedMinutes: 15,
    prerequisites: ['expanding-simplifying', 'factorising'],
    questionTypes: ['mcq', 'numeric', 'cloze', 'ordering'],
    lessons: {
      foundation: [
        { title: 'What is a Quadratic?', content: 'A quadratic equation contains an x² term as its highest power. Standard form is ax² + bx + c = 0.', formula: 'ax² + bx + c = 0', example: 'x² + 5x + 6 = 0', tip: 'The coefficient \'a\' cannot be zero, or it becomes a linear equation.' },
        { title: 'Solving by Factorising', content: 'Factorise the quadratic into two brackets, set it to zero, and find the values that make each bracket zero.', formula: '(x+p)(x+q) = 0 -> x = -p or x = -q', example: 'x² + 5x + 6 = (x+2)(x+3) = 0 -> x = -2 or x = -3', tip: 'Always make sure the equation equals zero before you start factorising.' }
      ],
      higher: [
        { title: 'The Quadratic Formula', content: 'Use this formula to find solutions for any quadratic equation, especially when it will not factorise cleanly.', formula: 'x = [-b ± √(b² - 4ac)] / 2a', example: '2x² - 4x - 6 = 0 -> a=2, b=-4, c=-6 -> x = 3 or x = -1', tip: 'Remember to use brackets around negative numbers under the square root in your calculator.' },
        { title: 'Completing the Square', content: 'Rewrite a quadratic in vertex form by taking half of the middle coefficient.', formula: 'x² + bx + c = (x + b/2)² - (b/2)² + c', example: 'x² + 6x + 5 = (x + 3)² - 9 + 5 = (x + 3)² - 4', tip: 'This method is great for finding the coordinates of a graph\'s turning point.' }
      ]
    },
    hacks: [
      { title: 'Discriminant Check Shortcut', content: 'Look at b² - 4ac. If it is greater than 0, you get two real answers; if it equals 0, you get one answer; if it is less than 0, there are no real solutions.' }
    ],
    advanced: [
      { title: 'Hidden Quadratics', content: 'Solve complex equations like x⁴ - 5x² + 4 = 0 by substituting u = x² to make it a quadratic equation first.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => {
            const p = r(1, 8); const q = r(1, 8);
            return makeMCQ(`Solve: x² + ${p + q}x + ${p * q} = 0`, `x = -${p} or x = -${q}`, [`x = ${p} or x = ${q}`, `x = -${p} or x = ${q}`, `x = ${p} or x = -${q}`], 'Factorise: find two numbers that multiply to c and add to b', `(x+${p})(x+${q})=0 → x=-${p}, -${q}`);
          },
          () => {
            const a = r(2, 9);
            return makeMCQ(`Solve: x² - ${a * a} = 0`, `x = ${a} or x = -${a}`, [`x = ${a}`, `x = -${a}`, `x = ${a * a}`], 'Difference of two squares', `x² - ${a * a} = (x-${a})(x+${a}) = 0`);
          }
        ];
        return pick(types)();
      } else {
        const types = [
          () => {
            const a = r(2, 5); const b = r(-8, 8); let c = r(-10, 10);
            while (b*b - 4*a*c < 0) { c = r(-10, 10); }
            const disc = b*b - 4*a*c;
            const sqrtD = Math.sqrt(disc);
            const x1 = Math.round((-b + sqrtD) / (2*a) * 100) / 100;
            const x2 = Math.round((-b - sqrtD) / (2*a) * 100) / 100;
            return { display: `Solve: ${a}x² ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c} = 0\n(Answer to 2 d.p., smaller first)`, answer: `${Math.min(x1, x2)}, ${Math.max(x1, x2)}`, answerType: 'text', hint: 'Use quadratic formula', explanation: `a=${a}, b=${b}, c=${c}\nb²-4ac = ${disc}\nx = [${-b} ± √${disc}] / ${2*a}\nx = ${Math.min(x1, x2)} or ${Math.max(x1, x2)}`, placeholder: 'e.g. -2.5, 1.3' };
          },
          () => {
            const p = r(2, 8);
            return { display: `Complete the square: x² + ${2*p}x + 5`, answer: `(x + ${p})² - ${p*p - 5}`, answerType: 'text', hint: 'Half the x-coefficient, square it, adjust constant', explanation: `x² + ${2*p}x + 5 = (x + ${p})² - ${p*p} + 5 = (x + ${p})² - ${p*p - 5}`, placeholder: 'e.g. (x+3)² - 4' };
          }
        ];
        return pick(types)();
      }
    }
  },

  'simultaneous-equations': {
    title: 'Simultaneous Equations',
    emoji: '交叉',
    color: '#00e5a0',
    category: 'Algebra',
    description: 'Solve pairs of simultaneous linear or non-linear equations using elimination or substitution.',
    examWeight: 6,
    difficulty: 'high',
    estimatedMinutes: 18,
    prerequisites: ['linear-equations', 'quadratic-equations'],
    questionTypes: ['numeric', 'cloze'],
    lessons: {
      foundation: [
        { title: 'Elimination Method', content: 'Multiply one or both equations to make the coefficients of one variable match, then add or subtract the equations to eliminate that variable.', example: 'Eq1: 2x+y=7, Eq2: 3x-y=3. Add them -> 5x=10 -> x=2. Substitute x back in -> 4+y=7 -> y=3.', tip: 'If the signs of the matching coefficients are the Same, Subtract. If they are Opposite, Add (SSS: Same Signs Subtract).' }
      ],
      higher: [
        { title: 'Substitution with Linear and Non-Linear', content: 'Rearrange the linear equation to isolate one variable, then substitute that expression into the quadratic equation to solve it.', example: 'y = x + 1 and x² + y² = 5 -> x² + (x+1)² = 5 -> 2x² + 2x - 4 = 0 -> x = 1 or x = -2. Find corresponding y values.', tip: 'Quadratic simultaneous equations usually give you two pairs of matching x and y answers.' }
      ]
    },
    hacks: [
      { title: 'The Bracket Safeguard', content: 'When substituting a linear expression into a quadratic equation, always place brackets around it before squaring to avoid missing middle expansion terms.' }
    ],
    advanced: [
      { title: 'Intersection Interpretations', content: 'Understand how the solutions connect to real geometry, like a straight line intersecting or touching a circle.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const x = r(1, 8); const y = r(1, 8);
        const a1 = r(1, 4); const b1 = r(1, 4); const c1 = a1*x + b1*y;
        const a2 = r(1, 4); const b2 = r(1, 4); const c2 = a2*x + b2*y;
        return { display: `Solve:\n${a1}x + ${b1}y = ${c1}\n${a2}x + ${b2}y = ${c2}\nFind x`, answer: x, hint: 'Eliminate y', explanation: `Multiply eq1 by ${b2}, eq2 by ${b1}, subtract to eliminate y, solve for x = ${x}` };
      } else {
        const x = r(-3, 3); const y = x + r(-3, 3);
        const r1 = r(1, 5);
        const c = x*x + y*y;
        return { display: `Solve:\nx² + y² = ${c}\nx + y = ${x + y}\nFind x (smaller value first)`, answer: `${Math.min(x,y)}, ${Math.max(x,y)}`, answerType: 'text', hint: 'Substitute y = (x+y) - x into circle', explanation: `Substitute y = ${x+y} - x → x² + (${x+y}-x)² = ${c} → solve quadratic`, placeholder: 'e.g. -2, 3' };
      }
    }
  },

  'inequalities': {
    title: 'Inequalities',
    emoji: '⚠️',
    color: '#00e5a0',
    category: 'Algebra',
    description: 'Solve linear inequalities, represent solutions on graphs/number lines, and solve quadratic inequalities.',
    examWeight: 5,
    difficulty: 'high',
    estimatedMinutes: 15,
    prerequisites: ['linear-equations', 'quadratic-equations'],
    questionTypes: ['mcq', 'numeric', 'cloze'],
    lessons: {
      foundation: [
        { title: 'Linear Inequalities', content: 'Solve linear inequalities just like normal equations, but remember to flip the inequality sign if you multiply or divide by a negative number.', example: '-3x < 9 -> divide by -3 -> x > -3', tip: 'Use open circles for < or > on a number line, and solid circles for ≤ or ≥.' },
        { title: 'Shading Regions on Graphs', content: 'Draw boundary lines, then choose a test point like (0,0) to see which region matches the inequality before shading it.', tip: 'Use a dashed line for strict inequalities (<, >) and a solid line for inclusive ones (≤, ≥).' }
      ],
      higher: [
        { title: 'Quadratic Inequalities', content: 'Find the critical values by setting the inequality to an equation and solving it. Sketch the curve to see where it goes above or below the x-axis.', example: 'x² - 5x + 6 > 0 -> roots are 2 and 3. Parabola opens upward, so x < 2 or x > 3.', tip: 'Do not try to solve it like a linear inequality; always find the roots first.' }
      ]
    },
    hacks: [
      { title: 'The Negative Flip Alert', content: 'Whenever you multiply or divide both sides of an inequality by a negative number, turn the inequality sign around immediately.' }
    ],
    advanced: [
      { title: 'Linear Programming Optimization', content: 'Find maximum or minimum values over regional boundaries defined by a set of multiple linear inequalities.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const a = r(2, 6); const b = r(1, 10); const c = a * r(-5, 5) + b;
        const sign = pick(['<', '>', '≤', '≥']);
        return { display: `Solve: ${a}x + ${b} ${sign} ${c}`, answer: `x ${sign === '<' ? '>' : sign === '>' ? '<' : sign === '≤' ? '≥' : '≤'} ${(c - b) / a}`, answerType: 'text', hint: 'Isolate x, flip sign if dividing by negative', explanation: `${a}x ${sign} ${c - b} → x ${sign === '<' ? '>' : sign === '>' ? '<' : sign === '≤' ? '≥' : '≤'} ${(c - b) / a}` };
      } else {
        const p = r(1, 8); const q = r(1, 8);
        const roots = [p, q].sort((a,b) => a-b);
        const sign = pick(['>', '<']);
        return makeMCQ(`Solve: x² - ${p+q}x + ${p*q} ${sign} 0`, sign === '>' ? `x < ${roots[0]} or x > ${roots[1]}` : `${roots[0]} < x < ${roots[1]}`, [sign === '>' ? `${roots[0]} < x < ${roots[1]}` : `x < ${roots[0]} or x > ${roots[1]}`, `x < ${roots[0]}`, `x > ${roots[1]}`], 'Find roots, sketch parabola, check inequality direction', `(x-${roots[0]})(x-${roots[1]}) ${sign} 0`);
      }
    }
  },

  'iteration': {
    title: 'Numerical Methods & Iteration',
    emoji: '🔄',
    color: '#00e5a0',
    category: 'Algebra',
    description: 'Find approximate solutions to equations using iterative processes and recurrence relations.',
    examWeight: 3,
    difficulty: 'high',
    estimatedMinutes: 12,
    prerequisites: ['rearranging-formulae', 'quadratic-equations'],
    questionTypes: ['numeric', 'cloze'],
    lessons: {
      foundation: [],
      higher: [
        { title: 'Understanding Recurrence Relations', content: 'An iteration formula uses the current value x_n to find the next value x_{n+1}.', formula: 'x_{n+1} = f(x_n)', example: 'Given x_0 = 1 and x_{n+1} = √(x_n + 2), calculate x_1.', tip: 'Use the ANS key on your calculator to speed up inputs!' },
        { title: 'Locating Roots', content: 'If a continuous function changes sign between two values of x, a root lies between those values.', formula: 'f(a) > 0 and f(b) < 0 -> root between a and b', example: 'f(x) = x³ - x - 1. f(1) = -1, f(2) = 5. Change of sign proves root exists.', tip: 'Always explicitly state \'change of sign implies a root\' in exams.' }
      ]
    },
    hacks: [
      { title: 'Calculator ANS Key', content: 'Type the initial value x_0 and press equals. Then type the formula using the \'Ans\' button instead of x. Keep pressing \'=\' to generate x_1, x_2, x_3 instantly.' }
    ],
    advanced: [
      { title: 'Cobweb and Staircase Diagrams', content: 'Visualise convergence and divergence of iterations by drawing lines between y = x and the curve y = f(x).' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return { display: 'Iteration questions are Higher tier only.', answer: 'Higher tier only', hint: '', explanation: '' };
      } else {
        const types = [
          () => {
            const a = r(2, 5); const b = r(1, 5);
            const x0 = r(1, 3);
            const x1 = Math.sqrt(x0 + a);
            return { display: `Given x₀ = ${x0} and x_{n+1} = √(x_n + ${a})\nFind x₁ (2 d.p.)`, answer: Math.round(x1 * 100) / 100, hint: 'Substitute x₀ into formula', explanation: `x₁ = √(${x0} + ${a}) = √${x0 + a} = ${Math.round(x1 * 100) / 100}` };
          },
          () => {
            const a = r(1, 3); const b = r(1, 3);
            return { display: `f(x) = x³ - ${a}x - ${b}\nf(1) = ${1 - a - b}, f(2) = ${8 - 2*a - b}\nIs there a root between 1 and 2?`, answer: (1 - a - b) * (8 - 2*a - b) < 0 ? 'Yes' : 'No', hint: 'Check for sign change', explanation: `f(1) = ${1 - a - b}, f(2) = ${8 - 2*a - b}. ${(1 - a - b) * (8 - 2*a - b) < 0 ? 'Sign change → root exists' : 'No sign change'}` };
          }
        ];
        return pick(types)();
      }
    }
  },

  // ─── GEOMETRY ──────────────────────────────────────────────

  'angles': {
    title: 'Angle Properties & Parallel Lines',
    emoji: '📐',
    color: '#00e5a0',
    category: 'Geometry',
    description: 'Apply core angle facts, parallel lines rules, and find interior/exterior angles of polygons.',
    examWeight: 5,
    difficulty: 'low',
    estimatedMinutes: 10,
    prerequisites: [],
    questionTypes: ['mcq', 'numeric', 'cloze'],
    lessons: {
      foundation: [
        { title: 'Angles on Lines & Around Points', content: 'Angles on a straight line add up to 180°. Angles around a point add up to 360°. Vertically opposite angles are equal.', example: 'If two straight lines cross and one angle is 50°, the opposite angle is also 50°.', tip: 'Always double check your subtraction from 180 or 360.' },
        { title: 'Parallel Lines (F, Z, C Shapes)', content: 'Alternate angles are equal (Z shape). Corresponding angles are equal (F shape). Allied/Co-interior angles add up to 180° (C shape).', tip: 'Make sure you use the official exam terms like \'alternate\' or \'corresponding\' rather than letters like Z or F.' },
        { title: 'Angles in Polygons', content: 'Exterior angles of any polygon always add up to 360°. The sum of interior angles is found using a formula based on the number of sides.', formula: 'Sum of Interior Angles = (n - 2) × 180', example: 'For a hexagon (6 sides): (6 - 2) × 180 = 720°.', tip: 'For regular polygons, you can find a single interior angle easily by doing 180° minus the exterior angle.' }
      ],
      higher: [
        { title: 'Geometric Proof with Angles', content: 'Construct full algebraic proofs for polygon or line properties using parallel line theorems and variable forms.', tip: 'Link each step clearly to an official geometric reason.' }
      ]
    },
    hacks: [
      { title: 'The Exterior Shortcut', content: 'To find the number of sides of a regular polygon quickly, just divide 360 by the exterior angle: n = 360 / Exterior.' }
    ],
    advanced: [
      { title: 'Non-Euclidean Geometries', content: 'See how angle sum rules change when drawing shapes on curved surfaces instead of flat planes.' }
    ],
    generateQuestion: (tier) => {
      const types = [
        () => { const a = r(25, 155); return { display: `Parallel lines with a transversal.\nOne angle is ${a}°. Find the alternate angle.`, answer: a, hint: 'Z-angles are equal', explanation: `Alternate angles = ${a}°` }; },
        () => { const a = r(25, 155); return { display: `Parallel lines with a transversal.\nOne angle is ${a}°. Find the corresponding angle.`, answer: a, hint: 'F-angles are equal', explanation: `Corresponding angles = ${a}°` }; },
        () => { const a = r(40, 140); return { display: `Find the co-interior angle if one is ${a}°`, answer: 180 - a, hint: 'C-angles add to 180°', explanation: `180 − ${a} = ${180 - a}°` }; },
        () => { const n = r(5, 10); const names = { 5:'pentagon', 6:'hexagon', 7:'heptagon', 8:'octagon', 9:'nonagon', 10:'decagon' }; return { display: `Find the sum of interior angles of a ${names[n] || n+'-sided polygon'}`, answer: (n - 2) * 180, hint: '(n−2) × 180', explanation: `(${n}−2) × 180 = ${n - 2} × 180 = ${(n - 2) * 180}°` }; }
      ];
      return pick(types)();
    }
  },

  'perimeter-area-volume': {
    title: 'Perimeter, Area & Volume',
    emoji: '📦',
    color: '#00e5a0',
    category: 'Geometry',
    description: 'Calculate area and perimeter of 2D shapes, along with surface area and volume of prisms, cylinders, pyramids, and spheres.',
    examWeight: 6,
    difficulty: 'medium',
    estimatedMinutes: 15,
    prerequisites: ['fractions-decimals-percentages'],
    questionTypes: ['mcq', 'numeric', 'cloze'],
    lessons: {
      foundation: [
        { title: 'Area of Core 2D Shapes', content: 'Know the formulas for triangles, parallelograms, and trapeziums.', formula: 'Triangle = 0.5×b×h, Trapezium = 0.5×(a+b)×h', example: 'Trapezium with a=4cm, b=6cm, h=3cm: Area = 0.5 × (4+6) × 3 = 15 cm²', tip: 'Always look out for perpendicular heights; do not use slanted side lengths by mistake.' },
        { title: 'Volume of Prisms', content: 'The volume of any prism is the area of its cross-section multiplied by its length.', formula: 'Volume = Area of Cross-section × Length', example: 'A triangular prism with a cross-section area of 10 cm² and length 5 cm has a volume of 50 cm³.', tip: 'Remember that volume is measured in cubic units, like cm³ or m³.' }
      ],
      higher: [
        { title: 'Pyramids, Cones & Spheres', content: 'Apply the fractional volume formulas provided on the exam formulas sheet for advanced curved solids.', formula: 'Sphere Volume = (4/3)πr³, Cone Volume = (1/3)πr²h', example: 'Find the volume of a cone with radius 3cm and height 4cm: Vol = (1/3) × π × 3² × 4 = 12π cm³', tip: 'Leave your answers in terms of π if the question asks for an exact value.' }
      ]
    },
    hacks: [
      { title: 'The Net Breakdown Strategy', content: 'To find the surface area of any 3D object safely, sketch out its flat net first, calculate the individual area of each face, and add them up.' }
    ],
    advanced: [
      { title: 'Frustum Calculations', content: 'Find the volume of a truncated cone or pyramid by subtracting the volume of the smaller missing top cone from the original large cone shape.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => { const b = r(2, 10); const h = r(2, 10); return { display: `Triangle: base = ${b}cm, height = ${h}cm\nFind the area`, answer: (b * h) / 2, hint: '½ × base × height', explanation: `Area = ½ × ${b} × ${h} = ${(b * h) / 2} cm²` }; },
          () => { const a = r(2, 8); const b = r(2, 8); const h = r(2, 8); return { display: `Trapezium: a = ${a}cm, b = ${b}cm, h = ${h}cm\nFind the area`, answer: (a + b) * h / 2, hint: '½(a+b)×h', explanation: `Area = ½ × (${a}+${b}) × ${h} = ${(a+b)*h/2} cm²` }; },
          () => { const area = r(5, 20); const len = r(3, 10); return { display: `Prism: cross-section area = ${area}cm², length = ${len}cm\nFind the volume`, answer: area * len, hint: 'Area × length', explanation: `Volume = ${area} × ${len} = ${area * len} cm³` }; }
        ];
        return pick(types)();
      } else {
        const types = [
          () => { const r = r(2, 8); const vol = (4/3) * Math.PI * r**3; return { display: `Sphere: radius = ${r}cm\nFind the volume in terms of π`, answer: `${(4/3) * r**3}π`, answerType: 'text', hint: '(4/3)πr³', explanation: `Volume = (4/3)π(${r}³) = ${(4/3) * r**3}π cm³`, placeholder: 'e.g. 36π' }; },
          () => { const r = r(2, 6); const h = r(3, 10); const vol = (1/3) * Math.PI * r**2 * h; return { display: `Cone: radius = ${r}cm, height = ${h}cm\nFind the volume (1 d.p.)`, answer: Math.round(vol * 10) / 10, hint: '(1/3)πr²h', explanation: `Volume = (1/3) × π × ${r}² × ${h} = ${Math.round(vol * 10) / 10} cm³` }; }
        ];
        return pick(types)();
      }
    }
  },

  'right-angle-triangles': {
    title: 'Right-Angled Triangles',
    emoji: '📐',
    color: '#00e5a0',
    category: 'Geometry',
    description: 'Master Pythagoras\' Theorem and standard SOHCAHTOA trigonometry to find missing sides and angles.',
    examWeight: 7,
    difficulty: 'medium',
    estimatedMinutes: 15,
    prerequisites: ['linear-equations'],
    questionTypes: ['mcq', 'numeric', 'cloze'],
    lessons: {
      foundation: [
        { title: 'Pythagoras\' Theorem', content: 'In any right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides.', formula: 'a² + b² = c²', example: 'Sides 3cm and 4cm -> 3² + 4² = 9 + 16 = 25 -> √25 = 5cm', tip: 'The hypotenuse \'c\' is always the longest side, directly opposite the 90-degree angle.' },
        { title: 'SOHCAHTOA Trigonometry Sides', content: 'Label sides as Hypotenuse, Opposite, and Adjacent relative to a given angle, and use sine, cosine, or tangent ratios to find missing lengths.', formula: 'sin(θ)=O/H, cos(θ)=A/H, tan(θ)=O/A', example: 'Find Opposite if Hypotenuse=10m and angle=30°. O = 10 × sin(30°) = 5m.', tip: 'Set your scientific calculator to Degree mode (\'DEG\') before doing trig questions.' }
      ],
      higher: [
        { title: 'Exact Trigonometric Values', content: 'Memorise the exact non-decimal values for sine, cosine, and tangent for key angles like 0°, 30°, 45°, 60°, and 90°.', example: 'sin(30°) = 1/2, cos(45°) = √2/2, tan(60°) = √3', tip: 'You can use a simple hand trick or sketch quick triangles to remember these without a calculator.' }
      ]
    },
    hacks: [
      { title: 'The SOHCAHTOA Triangle Triangles', content: 'Cover the letter you want to find in formula triangles (like O over S×H) to quickly see whether you need to multiply or divide.' }
    ],
    advanced: [
      { title: '3D Pythagoras & Trigonometry', content: 'Find diagonals across 3D boxes by applying Pythagoras twice, or calculate angles between lines and planes inside pyramids.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => { const a = r(3, 12); const b = r(3, 12); const c = Math.sqrt(a*a + b*b); return { display: `Right triangle: sides ${a}cm and ${b}cm\nFind the hypotenuse (1 d.p.)`, answer: Math.round(c * 10) / 10, hint: 'a² + b² = c²', explanation: `${a}² + ${b}² = ${a*a} + ${b*b} = ${a*a+b*b}\nc = √${a*a+b*b} = ${Math.round(c * 10) / 10}` }; },
          () => { const h = r(5, 15); const a = r(20, 70); const opp = Math.round(h * Math.sin(a * Math.PI / 180) * 10) / 10; return { display: `Hypotenuse = ${h}cm, angle = ${a}°\nFind the opposite side (1 d.p.)`, answer: opp, hint: 'sin = O/H', explanation: `O = H × sin(${a}°) = ${h} × ${Math.round(Math.sin(a * Math.PI / 180) * 100) / 100} = ${opp}` }; },
          () => { const h = r(5, 15); const a = r(20, 70); const adj = Math.round(h * Math.cos(a * Math.PI / 180) * 10) / 10; return { display: `Hypotenuse = ${h}cm, angle = ${a}°\nFind the adjacent side (1 d.p.)`, answer: adj, hint: 'cos = A/H', explanation: `A = H × cos(${a}°) = ${h} × ${Math.round(Math.cos(a * Math.PI / 180) * 100) / 100} = ${adj}` }; }
        ];
        return pick(types)();
      } else {
        const types = [
          () => { const angle = pick([30, 45, 60]); const values = { 30: {sin: '1/2', cos: '√3/2', tan: '1/√3'}, 45: {sin: '√2/2', cos: '√2/2', tan: '1'}, 60: {sin: '√3/2', cos: '1/2', tan: '√3'} }; const fn = pick(['sin', 'cos', 'tan']); return makeMCQ(`What is the exact value of ${fn}(${angle}°)?`, values[angle][fn], Object.values(values[angle]).filter(v => v !== values[angle][fn]).slice(0,3), 'Exact value triangle', `${fn}(${angle}°) = ${values[angle][fn]}`); },
          () => { const a = r(3, 8); const b = r(3, 8); const c = Math.sqrt(a*a + b*b); return { display: `Cuboid: sides ${a}cm, ${b}cm, ${r(3,8)}cm\nFind the space diagonal (1 d.p.)`, answer: Math.round(Math.sqrt(a*a + b*b + r(3,8)**2) * 10) / 10, hint: 'Apply Pythagoras twice', explanation: `Diagonal = √(a² + b² + c²)` }; }
        ];
        return pick(types)();
      }
    }
  },

  'non-right-triangles': {
    title: 'Non-Right Triangles',
    emoji: '🔺',
    color: '#00e5a0',
    category: 'Geometry',
    description: 'Apply the Sine Rule, Cosine Rule, and the trigonometric area formula to find dimensions of non-right-angled triangles.',
    examWeight: 5,
    difficulty: 'high',
    estimatedMinutes: 15,
    prerequisites: ['right-angle-triangles'],
    questionTypes: ['mcq', 'numeric', 'cloze'],
    lessons: {
      foundation: [],
      higher: [
        { title: 'The Sine Rule', content: 'Use this rule when you have matching opposite pairs of sides and angles.', formula: 'a/sin(A) = b/sin(B) = c/sin(C)', example: 'Find side a when A=40°, b=10cm, B=60°. a = (10 × sin(40°)) ÷ sin(60°) = 7.42cm.', tip: 'Flip the formula upside down to sin(A)/a if you need to find an unknown angle instead of a side.' },
        { title: 'The Cosine Rule', content: 'Use this rule when you know two sides and the angle between them (SAS), or when you know all three sides (SSS).', formula: 'a² = b² + c² - 2bc·cos(A)', example: 'b=5, c=7, A=60°. a² = 5² + 7² - 2(5)(7)cos(60°) = 25 + 49 - 35 = 39 -> a = √39 = 6.24', tip: 'Remember to execute the multiplication 2bc·cos(A) completely before subtracting it from the earlier sum.' },
        { title: 'Trigonometric Area Formula', content: 'Calculate the area of any triangle given two sides and the included angle.', formula: 'Area = 0.5 × a × b × sin(C)', tip: 'The angle used must be trapped right between the two known sides.' }
      ]
    },
    hacks: [
      { title: 'Sine vs Cosine Decision Rule', content: 'If you have all three sides or a trapped angle (SAS), use the Cosine Rule. For any other combination, use the Sine Rule.' }
    ],
    advanced: [
      { title: 'The Ambiguous Case of the Sine Rule', content: 'Be aware that when finding an angle, sin⁻¹ gives an acute angle, but an obtuse option might also exist, found by doing 180° minus that angle.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return { display: 'Non-right triangle trigonometry is Higher tier only.', answer: 'Higher tier only', hint: '', explanation: '' };
      } else {
        const types = [
          () => { const a = r(5, 12); const A = r(30, 60); const B = r(30, 60); const C = 180 - A - B; if (C <= 0) return { display: 'Invalid triangle', answer: 'N/A', hint: '', explanation: '' }; const b = Math.round(a * Math.sin(B * Math.PI / 180) / Math.sin(A * Math.PI / 180) * 100) / 100; return { display: `Triangle ABC: a = ${a}cm, A = ${A}°, B = ${B}°\nUse Sine Rule to find side b (2 d.p.)`, answer: b, hint: 'a/sinA = b/sinB', explanation: `b = a × sin(B) / sin(A) = ${a} × sin(${B}°) / sin(${A}°) = ${b}` }; },
          () => { const b = r(4, 10); const c = r(4, 10); const A = r(40, 100); const a2 = b*b + c*c - 2*b*c*Math.cos(A * Math.PI / 180); const a = Math.round(Math.sqrt(Math.max(0, a2)) * 100) / 100; return { display: `Triangle ABC: b = ${b}cm, c = ${c}cm, A = ${A}°\nUse Cosine Rule to find side a (2 d.p.)`, answer: a, hint: 'a² = b² + c² - 2bc cosA', explanation: `a² = ${b}² + ${c}² - 2(${b})(${c})cos(${A}°) = ${Math.round(a2)} → a = ${a}` }; }
        ];
        return pick(types)();
      }
    }
  },

  'transformations': {
    title: 'Transformations',
    emoji: '🔄',
    color: '#00e5a0',
    category: 'Geometry',
    description: 'Perform and describe reflections, rotations, translations, and enlargements.',
    examWeight: 4,
    difficulty: 'medium',
    estimatedMinutes: 12,
    prerequisites: ['integers-place-value'],
    questionTypes: ['mcq', 'cloze'],
    lessons: {
      foundation: [
        { title: 'Translations & Reflections', content: 'Translations shift a shape using a column vector. Reflections flip a shape across a specific mirror line like x=2 or y=x.', example: 'Translating [3, -1] means moving 3 squares right and 1 square down.', tip: 'Count grid lines perpendicularly to the mirror line to keep reflections accurate.' },
        { title: 'Rotations', content: 'Turn a shape around a fixed coordinate point, using a specific angle direction (clockwise or anticlockwise).', tip: 'Always use tracing paper in the exam to check your rotations carefully.' }
      ],
      higher: [
        { title: 'Negative and Fractional Enlargements', content: 'Fractional scale factors shrink shapes closer to the center. Negative scale factors project the shape upside down on the opposite side of the center point.', example: 'Scale factor -2 doubles the size and flips the shape through the center point.', tip: 'Draw guidelines from the original corners through the center of enlargement to find the new positions.' }
      ]
    },
    hacks: [
      { title: 'Full Description Marks Checklist', content: 'To get full marks when describing a transformation: Translation needs a vector; Reflection needs a line; Rotation needs an angle, direction, and center; Enlargement needs a scale factor and center.' }
    ],
    advanced: [
      { title: 'Invariance Properties', content: 'Identify points or lines that do not move at all after a specific sequence of geometric transformations.' }
    ],
    generateQuestion: (tier) => {
      const types = [
        () => { const x = r(-5, 5); const y = r(-5, 5); const tx = r(-5, 5); const ty = r(-5, 5); return { display: `Point (${x}, ${y}) is translated by vector [${tx}, ${ty}]\nWhat are the new coordinates?`, answer: `(${x + tx}, ${y + ty})`, answerType: 'text', hint: 'Add vector to coordinates', explanation: `(${x} + ${tx}, ${y} + ${ty}) = (${x + tx}, ${y + ty})`, placeholder: '(x, y)' }; },
        () => { const line = pick(['x-axis', 'y-axis', 'y=x', 'y=-x']); const x = r(-5, 5); const y = r(-5, 5); let ans; if (line === 'x-axis') ans = `(${x}, ${-y})`; else if (line === 'y-axis') ans = `(${ -x}, ${y})`; else if (line === 'y=x') ans = `(${y}, ${x})`; else ans = `(${ -y}, ${ -x})`; return { display: `Point (${x}, ${y}) reflected in the ${line}\nNew coordinates?`, answer: ans, answerType: 'text', hint: 'Flip across the line', explanation: `Reflection in ${line}: (${x}, ${y}) → ${ans}`, placeholder: '(x, y)' }; },
        () => { const sf = pick([2, 3, -1, -2, '1/2', '1/3']); return makeMCQ(`An enlargement with scale factor ${sf} makes a shape...`, sf === -1 ? 'same size, rotated 180°' : sf === -2 ? 'double size, rotated 180°' : sf === '1/2' ? 'half size, same orientation' : sf === '1/3' ? 'third size, same orientation' : `${sf}× size, same orientation`, [sf === -1 ? 'double size, same orientation' : 'same size, same orientation', sf === -1 ? 'half size, rotated 180°' : 'double size, same orientation', sf === 2 ? 'half size, same orientation' : 'same size, rotated 180°'], 'Negative = rotation, fractional = shrink', `Scale factor ${sf}: ${sf < 0 ? 'rotation + size change' : sf < 1 ? 'shrink' : 'enlarge'}`); }
      ];
      return pick(types)();
    }
  },

  'similarity-congruence': {
    title: 'Similarity & Congruence',
    emoji: '♊',
    color: '#00e5a0',
    category: 'Geometry',
    description: 'Prove geometric congruence and calculate lengths, areas, and volumes for mathematically similar shapes.',
    examWeight: 5,
    difficulty: 'high',
    estimatedMinutes: 15,
    prerequisites: ['ratios', 'perimeter-area-volume'],
    questionTypes: ['mcq', 'numeric', 'cloze'],
    lessons: {
      foundation: [
        { title: 'Congruence Proof Criteria', content: 'Two shapes are congruent if they are identical in size and shape. For triangles, prove this using SSS, SAS, ASA, or RHS rules.', tip: 'Make sure you state the exact rule abbreviation (like SSS) as your reason to secure full marks.' }
      ],
      higher: [
        { title: 'Length, Area & Volume Scale Factors', content: 'If the linear scale factor is k, the area scale factor is k² and the volume scale factor is k³.', formula: 'ASF = LSF², VSF = LSF³', example: 'If a shape\'s length is doubled (LSF=2), its area increases by 4 (ASF=4) and its volume increases by 8 (VSF=8).', tip: 'Find the length scale factor first before trying to solve area or volume adjustments.' }
      ]
    },
    hacks: [
      { title: 'Scale Factor Root Trick', content: 'If you are given two areas, divide them to find the Area Scale Factor, then take the square root to find the Length Scale Factor.' }
    ],
    advanced: [
      { title: 'Formal Geometric Congruence Deductions', content: 'Construct multi-stage triangle alignment proofs within circle and tangent structures using formal mathematical notation.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return makeMCQ(`Which is NOT a valid congruence condition for triangles?`, 'AAA', ['SSS', 'SAS', 'ASA', 'RHS'], 'AAA only proves similarity', 'AAA gives same angles but not same size');
      } else {
        const types = [
          () => { const lsf = r(2, 5); const area1 = r(5, 30); return { display: `Two similar shapes have LSF = ${lsf}.\nArea of smaller = ${area1} cm².\nArea of larger?`, answer: area1 * lsf * lsf, hint: 'ASF = LSF²', explanation: `ASF = ${lsf}² = ${lsf*lsf}\nLarger area = ${area1} × ${lsf*lsf} = ${area1 * lsf * lsf}` }; },
          () => { const lsf = r(2, 4); const vol1 = r(10, 50); return { display: `Two similar solids have LSF = ${lsf}.\nVolume of smaller = ${vol1} cm³.\nVolume of larger?`, answer: vol1 * lsf * lsf * lsf, hint: 'VSF = LSF³', explanation: `VSF = ${lsf}³ = ${lsf*lsf*lsf}\nLarger volume = ${vol1} × ${lsf*lsf*lsf} = ${vol1 * lsf * lsf * lsf}` }; }
        ];
        return pick(types)();
      }
    }
  },

  'vectors': {
    title: 'Vectors',
    emoji: '↗️',
    color: '#00e5a0',
    category: 'Geometry',
    description: 'Understand column vectors, add/subtract vectors geometrically, and solve geometric proofs using vectors.',
    examWeight: 6,
    difficulty: 'high',
    estimatedMinutes: 20,
    prerequisites: ['angles', 'similarity-congruence'],
    questionTypes: ['mcq', 'numeric', 'cloze', 'ordering'],
    lessons: {
      foundation: [
        { title: 'Column Vectors', content: 'Vectors describe a movement with direction and size. The top number shows horizontal movement, the bottom shows vertical movement.', formula: 'a = [x, y]^T', example: '[2, -3] means move 2 units right and 3 units down.', tip: 'Multiplying a vector by a number scales both parts inside.' }
      ],
      higher: [
        { title: 'Vector Geometry Paths', content: 'To find an unknown vector route, construct an alternative pathway along known vectors from the start point to the endpoint.', example: 'Vector AB = AO + OB = -a + b', tip: 'Going against a vector arrow reverses its sign.' }
      ]
    },
    hacks: [
      { title: 'Collinear Proof Trick', content: 'To prove three points A, B, and C lie on a straight line, show that vector AB is a multiple of vector BC, and state that they share point B.' }
    ],
    advanced: [
      { title: 'Ratio Splitting', content: 'If a point P splits vector AB in the ratio 2:3, then vector AP = 2/5 of vector AB and PB = 3/5 of vector AB.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const x1 = r(-5, 5); const y1 = r(-5, 5); const x2 = r(-5, 5); const y2 = r(-5, 5);
        return { display: `Add vectors: [${x1}, ${y1}] + [${x2}, ${y2}] = ?`, answer: `[${x1 + x2}, ${y1 + y2}]`, answerType: 'text', hint: 'Add top components, add bottom components', explanation: `[${x1}+${x2}, ${y1}+${y2}] = [${x1+x2}, ${y1+y2}]`, placeholder: '[x, y]' };
      } else {
        const types = [
          () => { const a = r(1, 5); const b = r(1, 5); return { display: `Vector a = [${a}, ${b}]. What is 3a?`, answer: `[${3*a}, ${3*b}]`, answerType: 'text', hint: 'Multiply each component by 3', explanation: `3 × [${a}, ${b}] = [${3*a}, ${3*b}]`, placeholder: '[x, y]' }; },
          () => { const x = r(-5, 5); const y = r(-5, 5); return { display: `Vector AB = [${x}, ${y}]. What is vector BA?`, answer: `[${-x}, ${-y}]`, answerType: 'text', hint: 'Reverse the direction', explanation: `BA = -AB = [${-x}, ${-y}]`, placeholder: '[x, y]' }; }
        ];
        return pick(types)();
      }
    }
  },

  'circle-theorems': {
    title: 'Circle Theorems',
    emoji: '⭕',
    color: '#00e5a0',
    category: 'Geometry',
    description: 'Apply geometric properties and formal circle theorems to calculate unknown angles.',
    examWeight: 5,
    difficulty: 'high',
    estimatedMinutes: 18,
    prerequisites: ['angles'],
    questionTypes: ['mcq', 'numeric', 'cloze'],
    lessons: {
      foundation: [
        { title: 'Parts of a Circle', content: 'Identify radius, diameter, chord, tangent, arc, sector, and segment elements before performing proofs.', tip: 'A radius and a tangent meet at exactly 90 degrees.' }
      ],
      higher: [
        { title: 'Core Circle Theorems', content: '1. Angle at the centre is twice the angle at the circumference.\n2. Angle in a semi-circle is 90 degrees.\n3. Angles in the same segment are equal.', formula: 'Centre = 2 × Circumference', tip: 'Look for isosceles triangles created by drawing multiple radii from the centre.' },
        { title: 'Cyclic Quadrilaterals & Tangents', content: '4. Opposite angles in a cyclic quadrilateral sum to 180 degrees.\n5. Alternate Segment Theorem: The angle between a tangent and a chord equals the angle in the alternate segment.', tip: 'Always write out the exact phrasing of the theorem text as your reason in exams.' }
      ]
    },
    hacks: [
      { title: 'The \'Arrowhead\' Cue', content: 'Whenever you spot an arrowhead shape anchored to the circle perimeter and passing through the centre, instantly apply the \'double angle at centre\' rule.' }
    ],
    advanced: [
      { title: 'Geometric Proofs', content: 'Prove theorems algebraically by introducing variables like x and y alongside base triangle geometry constraints.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return makeMCQ(`A tangent meets a radius at what angle?`, '90°', ['45°', '60°', '180°'], 'Tangent ⟂ radius', 'Tangent is perpendicular to radius at point of contact');
      } else {
        const types = [
          () => { const angle = r(20, 70); return { display: `Angle at circumference = ${angle}°\nAngle at centre (subtended by same arc)?`, answer: angle * 2, hint: 'Centre = 2 × Circumference', explanation: `Centre angle = 2 × ${angle}° = ${angle * 2}°` }; },
          () => { const angle = r(30, 80); return { display: `Cyclic quadrilateral: one angle = ${angle}°\nOpposite angle?`, answer: 180 - angle, hint: 'Opposite angles sum to 180°', explanation: `180° - ${angle}° = ${180 - angle}°` }; },
          () => { const angle = r(20, 60); return { display: `Angle between tangent and chord = ${angle}°\nAngle in alternate segment?`, answer: angle, hint: 'Alternate segment theorem', explanation: `Alternate segment angle = ${angle}°` }; }
        ];
        return pick(types)();
      }
    }
  },

  // ─── STATISTICS ────────────────────────────────────────────

  'mean-median-mode': {
    title: 'Mean, Median & Mode',
    emoji: '📊',
    color: '#00e5a0',
    category: 'Statistics',
    description: 'Calculate and compare averages from list datasets or grouped frequency tables.',
    examWeight: 4,
    difficulty: 'low',
    estimatedMinutes: 10,
    prerequisites: ['integers-place-value'],
    questionTypes: ['mcq', 'numeric', 'cloze'],
    lessons: {
      foundation: [
        { title: 'Averages from Lists', content: 'Mean is the sum divided by the count. Median is the middle value when ordered. Mode is the most common number. Range is the high minus the low value.', example: 'List: 2, 2, 5, 7. Mean = 16/4 = 4. Median = 3.5. Mode = 2. Range = 5.', tip: 'Always sort your data list first before looking for the median.' },
        { title: 'Averages from Grouped Tables', content: 'Estimate the mean by multiplying each group midpoint by its frequency, adding them up, and dividing by the total frequency.', formula: 'Estimated Mean = Σ(fx) ÷ Σf', tip: 'Remember, this is an estimate because we do not know the exact raw values inside the groups.' }
      ],
      higher: [
        { title: 'Comparing Averages and Spread', content: 'Use an average (like median) to talk about central trend, and a spread measure (like range or IQR) to discuss consistency.', tip: 'Always mention context (e.g., test scores, race times) when writing comparison answers.' }
      ]
    },
    hacks: [
      { title: 'Total Frequency Divide Warning', content: 'When calculating the mean from a table, make sure you divide by the total frequency, NOT by the number of rows in the table.' }
    ],
    advanced: [
      { title: 'Skewness and Outliers', content: 'Analyse how extreme outlier data points distort the mean while leaving the median stable.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => { const arr = Array.from({length: r(5, 8)}, () => r(1, 20)).sort((a,b) => a-b); const mean = arr.reduce((a,b) => a+b, 0) / arr.length; return { display: `Find the mean: ${arr.join(', ')}`, answer: Math.round(mean * 10) / 10, hint: 'Sum ÷ count', explanation: `Sum = ${arr.reduce((a,b)=>a+b,0)}, Count = ${arr.length}\nMean = ${Math.round(mean * 10) / 10}` }; },
          () => { const arr = Array.from({length: r(5, 9)}, () => r(1, 20)).sort((a,b) => a-b); const mid = Math.floor(arr.length / 2); const median = arr.length % 2 ? arr[mid] : (arr[mid-1] + arr[mid]) / 2; return { display: `Find the median: ${arr.join(', ')}`, answer: median, hint: 'Middle value (or average of two middle)', explanation: `Sorted: ${arr.join(', ')}\nMedian = ${median}` }; },
          () => { const arr = Array.from({length: r(6, 10)}, () => pick([1,2,3,4,5,6])); const freq = {}; arr.forEach(x => freq[x] = (freq[x]||0)+1); const mode = parseInt(Object.entries(freq).sort((a,b)=>b[1]-a[1])[0][0]); return { display: `Find the mode: ${arr.join(', ')}`, answer: mode, hint: 'Most frequent value', explanation: `Mode = ${mode} (appears ${freq[mode]} times)` }; }
        ];
        return pick(types)();
      } else {
        const types = [
          () => { const groups = [[0,10,5],[10,20,8],[20,30,12],[30,40,7],[40,50,3]]; const fx = groups.reduce((sum, [lo, hi, f]) => sum + ((lo+hi)/2)*f, 0); const tf = groups.reduce((sum, [,,f]) => sum + f, 0); return { display: `Estimate the mean from this grouped table:\n0-10: 5\n10-20: 8\n20-30: 12\n30-40: 7\n40-50: 3`, answer: Math.round((fx/tf) * 10) / 10, hint: 'Use midpoints: Σ(fx) ÷ Σf', explanation: `Midpoints: 5,15,25,35,45\nΣfx = ${fx}, Σf = ${tf}\nMean = ${Math.round((fx/tf) * 10) / 10}` }; }
        ];
        return pick(types)();
      }
    }
  },

  'probability-trees': {
    title: 'Probability Trees & Diagrams',
    emoji: '🌲',
    color: '#00e5a0',
    category: 'Statistics',
    description: 'Calculate probabilities of single and combined events using sample spaces, Venn diagrams, and tree diagrams.',
    examWeight: 5,
    difficulty: 'medium',
    estimatedMinutes: 15,
    prerequisites: ['fractions-decimals-percentages'],
    questionTypes: ['mcq', 'numeric', 'fraction', 'cloze'],
    lessons: {
      foundation: [
        { title: 'Basic Probability Scale', content: 'Probabilities range from 0 (impossible) to 1 (certain). The probabilities of all mutually exclusive events add up to 1.', formula: 'P(Not A) = 1 - P(A)', tip: 'You can write probabilities as fractions, decimals, or percentages, but never as ratios.' },
        { title: 'Independent Tree Diagrams', content: 'Multiply probabilities along the branches to find the chance of combined outcomes.', example: 'Flipping two heads: 0.5 × 0.5 = 0.25', tip: 'Branches coming from the same node must always add up to 1.' }
      ],
      higher: [
        { title: 'Dependent Events (No Replacement)', content: 'Adjust the fractions on the second set of branches because the total number of items has decreased.', example: 'Pick 2 red counters out of a bag with 4 red and 6 blue: P(Red, Red) = 4/10 × 3/9 = 12/90.', tip: 'Look out for keywords like \'does not replace\' or \'takes another\'.' }
      ]
    },
    hacks: [
      { title: 'The \'And\' / \'Or\' Probability Rule', content: 'Multiply probabilities when you need one event AND another to happen. Add them when you want one event OR another outcome.' }
    ],
    advanced: [
      { title: 'Conditional Probability Proofs', content: 'Master formulaic representations for formal conditional systems, written as P(A given B).' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => { const p = pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]); return makeMCQ(`P(A) = ${p}. What is P(not A)?`, String(1 - p), [String(p), String(p/2), String(p*2)], 'Probabilities sum to 1', `1 - ${p} = ${1-p}`); },
          () => { const p = 0.5; return { display: `Fair coin flipped twice.\nP(Two heads)?`, answer: 0.25, hint: 'Multiply along branches', explanation: `0.5 × 0.5 = 0.25` }; },
          () => { const n = r(4, 10); const k = r(1, n-1); return { display: `Bag: ${k} red, ${n-k} blue counters.\nPick one, replace it, pick again.\nP(Both red)?`, answer: `${k*k}/${n*n}`, answerType: 'fraction', hint: 'Independent: multiply', explanation: `(${k}/${n}) × (${k}/${n}) = ${k*k}/${n*n}` }; }
        ];
        return pick(types)();
      } else {
        const types = [
          () => { const r = r(3, 8); const b = r(3, 8); const total = r + b; const p = `${r*r}/${total*total}`; const p2 = `${r*(r-1)}/${total*(total-1)}`; return makeMCQ(`Bag: ${r} red, ${b} blue. Pick 2 WITHOUT replacement.\nP(Both red)?`, p2, [p, `${r*b}/${total*(total-1)}`, `${b*(b-1)}/${total*(total-1)}`], 'No replacement: second pick has one less', `(${r}/${total}) × (${r-1}/${total-1}) = ${p2}`); },
          () => { const r = r(3, 8); const b = r(3, 8); const total = r + b; const p = `${r*b*2}/${total*(total-1)}`; return makeMCQ(`Bag: ${r} red, ${b} blue. Pick 2 WITHOUT replacement.\nP(One of each colour)?`, p, [`${r*(r-1)}/${total*(total-1)}`, `${b*(b-1)}/${total*(total-1)}`, `${r*b}/${total*total}`], 'Two orders: R then B, or B then R', `P(RB) + P(BR) = (${r}/${total}×${b}/${total-1}) + (${b}/${total}×${r}/${total-1}) = ${p}`); }
        ];
        return pick(types)();
      }
    }
  },

  'cumulative-frequency-box-plots': {
    title: 'Cumulative Frequency & Box Plots',
    emoji: '📦',
    color: '#00e5a0',
    category: 'Statistics',
    description: 'Construct and interpret cumulative frequency curves and box plots, and estimate the median and interquartile range (IQR).',
    examWeight: 4,
    difficulty: 'medium',
    estimatedMinutes: 15,
    prerequisites: ['mean-median-mode'],
    questionTypes: ['numeric', 'cloze'],
    lessons: {
      foundation: [],
      higher: [
        { title: 'Cumulative Frequency Curves', content: 'Add up frequencies as you go, plot the points at the UPPER class limits, and join them with a smooth S-shaped curve.', tip: 'Always read values carefully by drawing lines across from 25%, 50%, and 75% of the total frequency axis.' },
        { title: 'Reading Box Plots', content: 'A box plot summarizes data using five key values: Minimum, Lower Quartile (LQ), Median, Upper Quartile (UQ), and Maximum.', formula: 'Interquartile Range (IQR) = UQ - LQ', example: 'If UQ = 70 and LQ = 40, the Interquartile Range is 30.', tip: 'The box itself holds the middle 50% of the entire data sample.' }
      ]
    },
    hacks: [
      { title: 'The Upper Limit Plot Rule', content: 'Never plot cumulative frequency points at the midpoint of a group; always use the upper limit of that group interval.' }
    ],
    advanced: [
      { title: 'Identifying Outliers Algebraically', content: 'Classify extreme data points as formal outliers if they lie more than 1.5 times the IQR past either quartile line.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return { display: 'Cumulative frequency & box plots are Higher tier only.', answer: 'Higher tier only', hint: '', explanation: '' };
      } else {
        const types = [
          () => { const uq = r(60, 90); const lq = r(30, uq - 10); return { display: `Box plot: UQ = ${uq}, LQ = ${lq}\nFind the IQR`, answer: uq - lq, hint: 'UQ - LQ', explanation: `IQR = ${uq} - ${lq} = ${uq - lq}` }; },
          () => { const median = r(40, 60); const lq = median - r(5, 15); const uq = median + r(5, 15); return { display: `Box plot: Min=10, LQ=${lq}, Median=${median}, UQ=${uq}, Max=90\nWhat percentage of data lies between LQ and UQ?`, answer: 50, hint: 'The box holds the middle 50%', explanation: 'IQR covers the middle 50% of data' }; }
        ];
        return pick(types)();
      }
    }
  },

  'histograms': {
    title: 'Histograms',
    emoji: '📊',
    color: '#00e5a0',
    category: 'Statistics',
    description: 'Draw and interpret histograms for unequal class intervals using frequency density calculations.',
    examWeight: 4,
    difficulty: 'high',
    estimatedMinutes: 15,
    prerequisites: ['mean-median-mode'],
    questionTypes: ['mcq', 'numeric', 'cloze'],
    lessons: {
      foundation: [],
      higher: [
        { title: 'Frequency Density Formula', content: 'Histograms deal with continuous data in uneven groups. The area of each bar shows the frequency, not the height.', formula: 'Frequency Density = Frequency ÷ Class Width', example: 'A group spanning 0-10 has a frequency of 30. Frequency density = 30 / 10 = 3.', tip: 'Always label your vertical axis as \'Frequency Density\'.' },
        { title: 'Estimating the Median', content: 'Find the cumulative midpoint position, then calculate how far into a specific bar\'s width you need to go to reach that count.', tip: 'Assume the data values are spread out evenly across that specific group bar.' }
      ]
    },
    hacks: [
      { title: 'Area Equals Frequency Rule', content: 'Always remember: Area = Frequency. If a question asks for a count of items, find the combined area of those blocks.' }
    ],
    advanced: [
      { title: 'Interpreting Skewness', content: 'Analyze asymmetric shapes across histograms to describe real-world sample population patterns.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return { display: 'Histograms are Higher tier only.', answer: 'Higher tier only', hint: '', explanation: '' };
      } else {
        const types = [
          () => { const freq = r(10, 50); const width = r(5, 20); return { display: `Group: 0-${width}, Frequency = ${freq}\nFrequency density?`, answer: freq / width, hint: 'Frequency ÷ Class Width', explanation: `${freq} ÷ ${width} = ${freq / width}` }; },
          () => { const fd = r(1, 8); const width = r(5, 20); return { display: `Frequency density = ${fd}, Class width = ${width}\nFrequency?`, answer: fd * width, hint: 'Frequency = FD × Width', explanation: `${fd} × ${width} = ${fd * width}` }; }
        ];
        return pick(types)();
      }
    }
  },

  'scatter-graphs': {
    title: 'Scatter Graphs & Correlation',
    emoji: '📈',
    color: '#00e5a0',
    category: 'Statistics',
    description: 'Plot scatter data, identify correlation types, and draw lines of best fit to estimate missing values.',
    examWeight: 3,
    difficulty: 'low',
    estimatedMinutes: 10,
    prerequisites: ['integers-place-value'],
    questionTypes: ['mcq', 'numeric', 'cloze'],
    lessons: {
      foundation: [
        { title: 'Types of Correlation', content: 'Positive correlation means both values go up together. Negative correlation means as one goes up, the other goes down. No correlation means the points are scattered randomly.', example: 'Temperature and ice cream sales show a positive correlation.', tip: 'Correlation does not automatically mean that one thing caused the other to happen.' },
        { title: 'Line of Best Fit', content: 'Draw a straight line through the center of the points, keeping roughly the same number of dots above and below your line.', tip: 'Always use a ruler, and avoid forcing your line to pass through the origin (0,0) unless it naturally fits the data.' }
      ],
      higher: [
        { title: 'Extrapolation Dangers', content: 'Estimating values outside the range of your original data points is unreliable and should be avoided.', tip: 'State that estimates outside the data range are unreliable because trends can change.' }
      ]
    },
    hacks: [
      { title: 'The Mean Coordination Point', content: 'A perfect line of best fit should always pass exactly through the mean average coordinate of x and y from your dataset.' }
    ],
    advanced: [
      { title: 'Introduction to Linear Regression', content: 'Learn how computer algorithms find the absolute mathematically ideal line of best fit by minimizing squared distances.' }
    ],
    generateQuestion: (tier) => {
      const types = [
        () => makeMCQ(`As temperature increases, ice cream sales increase.\nWhat type of correlation?`, 'Positive', ['Negative', 'None', 'Curved'], 'Both variables increase together', 'Positive correlation'),
        () => makeMCQ(`A line of best fit should pass through which point?`, 'The mean point (x̄, ȳ)', ['The origin (0,0)', 'The first data point', 'The highest y-value'], 'Mean point property', 'Line of best fit passes through (mean of x, mean of y)'),
        () => { const x = r(10, 50); const y = r(10, 50); return { display: `Mean point: (${x}, ${y})\nLine of best fit passes through this point.\nIf x = ${x+10}, estimate y using the trend.`, answer: y + r(-5, 5), hint: 'Extrapolate carefully', explanation: 'Follow the line of best fit from the mean point' }; }
      ];
      return pick(types)();
    }
  },

  // ─── RATIO/PROPORTION ──────────────────────────────────────

  'ratios': {
    title: 'Ratios & Sharing',
    emoji: '🍕',
    color: '#00e5a0',
    category: 'Ratio/Proportion',
    description: 'Simplify ratios, convert ratios to fractions, and share quantities into given ratio parts.',
    examWeight: 5,
    difficulty: 'low',
    estimatedMinutes: 10,
    prerequisites: ['fractions-decimals-percentages'],
    questionTypes: ['mcq', 'numeric', 'cloze'],
    lessons: {
      foundation: [
        { title: 'Simplifying Ratios', content: 'Divide all parts of a ratio by their highest common factor until they cannot be divided further.', example: '15 : 20 simplifies to 3 : 4 by dividing both parts by 5.', tip: 'Make sure all units are exactly the same before you start simplifying a ratio.' },
        { title: 'Sharing an Amount', content: 'Add up the total parts, divide the total amount by this number to find the value of one part, then multiply to find each share.', example: 'Share £60 in the ratio 2:3. Total parts = 5. One part = 60/5 = £12. Shares are £24 and £36.', tip: 'Add your final shares back together to make sure they equal the original total amount.' }
      ],
      higher: [
        { title: 'Changing Ratios', content: 'Solve multi-step problems where adding or subtracting quantities shifts the ratio between variables.', example: 'Initial ratio 1:2. Add 5 to the first part, new ratio becomes 2:3. Set up an equation to find the original values.', tip: 'Convert ratios into algebraic fractions to solve these changing proportion puzzles easily.' }
      ]
    },
    hacks: [
      { title: 'The Three-Step Ratio Plan', content: 'Remember: Add parts, Divide total, Multiply shares (ADM: Add, Divide, Multiply) to solve sharing questions quickly.' }
    ],
    advanced: [
      { title: 'The Golden Ratio Relationship', content: 'Explore the unique properties of the golden ratio φ and its appearances across nature and geometry.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => { const a = r(2, 15); const b = r(2, 15); const g = gcd(a, b); return { display: `Simplify the ratio ${a} : ${b}`, answer: `${a/g} : ${b/g}`, answerType: 'text', hint: 'Divide by HCF', explanation: `HCF of ${a} and ${b} = ${g}\n${a}÷${g} : ${b}÷${g} = ${a/g} : ${b/g}`, placeholder: 'e.g. 3 : 4' }; },
          () => { const total = r(20, 100); const p1 = r(1, 5); const p2 = r(1, 5); const parts = p1 + p2; const share1 = total * p1 / parts; const share2 = total * p2 / parts; return { display: `Share ${total} in the ratio ${p1}:${p2}`, answer: `${share1} and ${share2}`, answerType: 'text', hint: 'Add parts, divide total, multiply', explanation: `Total parts = ${parts}\nOne part = ${total} ÷ ${parts} = ${total/parts}\nShares: ${share1} and ${share2}`, placeholder: 'e.g. 24 and 36' }; }
        ];
        return pick(types)();
      } else {
        const types = [
          () => { const p1 = r(1, 4); const p2 = r(1, 4); const add = r(2, 10); const newP1 = r(2, 5); const newP2 = r(2, 5); const total = r(20, 80); return { display: `Ratio ${p1}:${p2}. Add ${add} to first part → new ratio ${newP1}:${newP2}.\nOriginal total ${total}.\nFind original first part.`, answer: Math.round(total * p1 / (p1 + p2)), hint: 'Set up equation with original ratio', explanation: `Let original parts be ${p1}x and ${p2}x. Total = ${p1+p2}x = ${total} → x = ${total/(p1+p2)}\nFirst part = ${p1} × ${total/(p1+p2)} = ${Math.round(total * p1 / (p1 + p2))}` }; }
        ];
        return pick(types)();
      }
    }
  },

  'direct-inverse-proportion': {
    title: 'Direct & Inverse Proportion',
    emoji: '⚖️',
    color: '#00e5a0',
    category: 'Ratio/Proportion',
    description: 'Set up and solve algebraic direct and inverse proportion equations using a constant of proportionality k.',
    examWeight: 5,
    difficulty: 'high',
    estimatedMinutes: 15,
    prerequisites: ['rearranging-formulae', 'linear-equations'],
    questionTypes: ['mcq', 'numeric', 'cloze'],
    lessons: {
      foundation: [
        { title: 'Simple Unitary Proportion', content: 'Find the value of a single item first to scale quantities up or down accordingly.', example: 'If 5 apples cost £2, then 1 apple costs £0.40. Therefore, 8 apples cost 8 × £0.40 = £3.20.', tip: 'Keeping things clear with a table can help track units under exam pressure.' }
      ],
      higher: [
        { title: 'Algebraic Direct Proportion', content: 'Write the relationship using the proportionality symbol, convert it to an equation with a constant k, find k using given numbers, and write the final formula.', formula: 'y = kx or y = kx²', example: 'y is directly proportional to x². When x=2, y=12. So 12 = k(2²) -> k=3. Final formula: y = 3x².', tip: 'Read carefully to see if it is proportional to x, x², or the square root of x.' },
        { title: 'Algebraic Inverse Proportion', content: 'As one value goes up, the other goes down. Set up your formula with x on the bottom of the fraction.', formula: 'y = k / x', example: 'y is inversely proportional to x. When x=3, y=4. So 4 = k/3 -> k=12. Formula: y = 12/x.', tip: 'In inverse proportion, multiplying the two given x and y values gives you the constant k immediately.' }
      ]
    },
    hacks: [
      { title: 'The k-Constant Anchor', content: 'Never skip finding k. Treat finding the value of k as your primary goal, and write down the full formula before answering the rest of the question.' }
    ],
    advanced: [
      { title: 'Joint Proportion Systems', content: 'Handle complex scenarios where a variable depends on multiple other factors at the same time, like y = kxz / w.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const items = r(3, 10); const cost = r(5, 50); const newItems = r(items+1, 20);
        return { display: `${items} items cost £${cost}.\nHow much for ${newItems} items?`, answer: Math.round((cost / items) * newItems * 100) / 100, hint: 'Unitary method', explanation: `1 item = £${cost} ÷ ${items} = £${cost/items}\n${newItems} items = £${cost/items} × ${newItems} = £${Math.round((cost / items) * newItems * 100) / 100}` };
      } else {
        const types = [
          () => { const x = r(2, 5); const y = r(10, 50); const k = y / (x * x); const newX = r(3, 8); const newY = Math.round(k * newX * newX * 10) / 10; return { display: `y ∝ x². When x = ${x}, y = ${y}.\nFind y when x = ${newX}.`, answer: newY, hint: 'Find k first: y = kx²', explanation: `${y} = k × ${x}² → k = ${y} ÷ ${x*x} = ${k}\ny = ${k} × ${newX}² = ${newY}` }; },
          () => { const x = r(2, 6); const y = r(10, 50); const k = x * y; const newX = r(3, 10); const newY = Math.round(k / newX * 10) / 10; return { display: `y ∝ 1/x. When x = ${x}, y = ${y}.\nFind y when x = ${newX}.`, answer: newY, hint: 'Find k: y = k/x → k = xy', explanation: `k = ${x} × ${y} = ${k}\ny = ${k} ÷ ${newX} = ${newY}` }; }
        ];
        return pick(types)();
      }
    }
  },

  'capture-recapture': {
    title: 'Capture-Recapture Method',
    emoji: '🐟',
    color: '#00e5a0',
    category: 'Ratio/Proportion',
    description: 'Estimate overall population sizes in ecosystems using proportions from tagged sample sets.',
    examWeight: 2,
    difficulty: 'medium',
    estimatedMinutes: 10,
    prerequisites: ['ratios', 'probability-trees'],
    questionTypes: ['mcq', 'numeric', 'cloze'],
    lessons: {
      foundation: [
        { title: 'The Proportional Principle', content: 'Capture a sample, tag them, and release them. Capture a second sample later. The proportion of tagged items in the second sample helps estimate the total population.', formula: 'Total Population = (Sample 1 Count × Sample 2 Count) ÷ Tagged Recaptured Count', example: 'Catch and tag 20 fish. Next day catch 50 fish, finding 5 tagged. Total = (20 × 50) / 5 = 200 fish.', tip: 'Set up two equal fractions to double check your calculations safely.' }
      ],
      higher: [
        { title: 'Underlying Assumptions', content: 'This method assumes the population stays stable (no births, deaths, or migration), tags do not fall off, and tagged animals mix back in thoroughly.', tip: 'Be ready to list at least two of these assumptions in written exam answers.' }
      ]
    },
    hacks: [
      { title: 'Cross-Multiplication Layout', content: 'Write it as: Tagged/Total = Recaptured Tagged/Total Recaptured Sample. Cross multiply to isolate your unknown total value immediately.' }
    ],
    advanced: [
      { title: 'Bias and Errors', content: 'Evaluate how animal behavior (like being trap-shy or attracted to bait) can cause overestimates or underestimates of population sizes.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const s1 = r(15, 40); const s2 = r(20, 60); const tagged = r(3, 10);
        const total = Math.round(s1 * s2 / tagged);
        return { display: `Catch ${s1}, tag and release. Later catch ${s2}, ${tagged} tagged.\nEstimated total population?`, answer: total, hint: '(S1 × S2) ÷ Tagged', explanation: `(${s1} × ${s2}) ÷ ${tagged} = ${total}` };
      } else {
        return makeMCQ(`Capture-recapture assumes the population is...`, 'Closed (no births/deaths/migration)', ['Open', 'Increasing', 'Decreasing'], 'Key assumption', 'Population must be stable during the study');
      }
    }
  }
};

// ============================================================
// EXPORTS
// ============================================================

export function getTopicBySlug(slug) {
  return TOPICS[slug] || null;
}

export function getAllTopicSlugs() {
  return Object.keys(TOPICS);
}

export function getTopicsByCategory() {
  const categories = {};
  Object.entries(TOPICS).forEach(([slug, topic]) => {
    if (!categories[topic.category]) categories[topic.category] = [];
    categories[topic.category].push({ ...topic, slug });
  });
  return categories;
}