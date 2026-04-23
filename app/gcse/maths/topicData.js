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

  'laws-of-indices': {
    title: 'Laws of Indices',
    emoji: '🔢',
    color: '#00e5a0',
    category: 'Number',
    description: 'Simplify expressions using index laws — multiply, divide, and raise powers.',
    lessons: {
      foundation: [
        { title: 'Multiplying Powers', visualId: 'math-indices', content: 'When multiplying powers with the same base, add the indices.', formula: 'aᵐ × aⁿ = aᵐ⁺ⁿ', example: '3² × 3⁴ = 3⁶ = 729' },
        { title: 'Dividing Powers', content: 'When dividing powers with the same base, subtract the indices.', formula: 'aᵐ ÷ aⁿ = aᵐ⁻ⁿ', example: '5⁷ ÷ 5³ = 5⁴ = 625' },
        { title: 'Power of Zero', content: 'Any number raised to the power of 0 equals 1.', formula: 'a⁰ = 1', example: '7⁰ = 1\n100⁰ = 1', tip: 'This works for ANY non-zero number.' },
        { title: 'Power of One', content: 'Any number to the power of 1 is just the number itself.', formula: 'a¹ = a', example: '15¹ = 15' },
        { title: 'Common Mistake', content: 'Index laws ONLY work when the base (the big number) is the same.', tip: 'You cannot simplify 2³ × 5² using index laws!' },
        { title: 'Base 10 Powers', content: 'Powers of 10 follow a simple pattern: 10ⁿ is 1 followed by n zeros.', example: '10³ = 1000\n10⁶ = 1,000,000', tip: 'Count the zeros to find the power!' },
        { title: 'Squaring and Cubing', content: 'Index 2 means square (multiply by itself once). Index 3 means cube (multiply by itself twice).', formula: 'x² = x × x, x³ = x × x × x', example: '5³ = 5 × 5 × 5 = 125' }
      ],
      higher: [
        { title: 'Negative Indices', content: 'A negative index means the reciprocal (1 over) the positive power.', formula: 'a⁻ⁿ = 1/aⁿ', example: '2⁻³ = 1/2³ = 1/8' },
        { title: 'Fractional Indices (Roots)', content: 'The denominator is the root, the numerator is the power.', formula: 'a^(1/n) = ⁿ√a', example: '9^(1/2) = √9 = 3\n64^(1/3) = ³√64 = 4' },
        { title: 'Complex Fractional Indices', content: 'Apply the root first (bottom number), then the power (top number).', formula: 'a^(m/n) = (ⁿ√a)ᵐ', example: '27^(2/3) = (³√27)² = 3² = 9' },
        { title: 'Power of a Power', content: 'When raising a power to another power, multiply the indices.', formula: '(aᵐ)ⁿ = aᵐˣⁿ', example: '(2³)⁴ = 2¹² = 4096' },
        { title: 'Fractional Bases', content: 'Apply the power to both numerator and denominator.', example: '(2/3)⁻² = (3/2)² = 9/4' },
        { title: 'Combining Laws', content: 'In complex questions, follow BIDMAS. Apply power-to-power first, then multiply/divide.', example: '(x²)³ × x⁴ = x⁶ × x⁴ = x¹⁰' },
        { title: 'Base Conversion', content: 'Sometimes you need to change the base to use index laws.', example: '9⁴ = (3²)⁴ = 3⁸', tip: 'Recognise powers of 2, 3, 5, and 10!' }
      ],
    },
    generateQuestion: (tier) => {
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
           const b = r(2, 4); const m = r(2, 3); const n = r(2, 3);
           return makeMCQ(`(${b}^${m})^${n} = ${b}^?`, `${m * n}`, [`${m + n}`, `${m ** n}`, '1'], 'Multiply the powers.', `${b}^${m * n}`);
        }
      ];
      return pick(types)();
    },
  },

  'prime-factors': {
    title: 'Prime Factors, HCF & LCM',
    emoji: '🔍',
    color: '#ff6b35',
    category: 'Number',
    description: 'Break numbers into prime factors and find HCF and LCM.',
    lessons: {
      foundation: [
        { title: 'What Are Prime Factors?', content: 'Prime factors are the prime numbers that multiply together to make a number.', formula: '12 = 2 × 2 × 3 = 2² × 3', example: '30 = 2 × 3 × 5\n60 = 2² × 3 × 5' },
        { title: 'Factor Trees', content: 'Split the number into factors, then split those until only primes (circles) remain.', tip: 'Multiply all the circled primes to check your answer!' },
        { title: 'HCF (Highest Common Factor)', content: 'The largest number that divides into both numbers.', example: 'HCF of 12 & 18 is 6.' },
        { title: 'LCM (Lowest Common Multiple)', content: 'The smallest number in both times tables.', example: 'LCM of 4 & 6 is 12.' },
        { title: 'Prime Numbers', content: 'A number with exactly two factors: 1 and itself.', example: '2, 3, 5, 7, 11, 13, 17, 19...', tip: '1 is NOT a prime number! 2 is the ONLY even prime.' },
        { title: 'Checking with Multiplication', content: 'To check your prime factorisation, multiply all the primes together. It should equal the original number.', example: '2² × 3 × 5 = 4 × 3 × 5 = 60 ✓' }
      ],
      higher: [
        { title: 'Venn Diagram Method', visualId: 'math-venn', content: 'Put prime factors in a Venn diagram. HCF is the intersection (center). LCM is the union (everything inside).', example: '12: 2, 2, 3\n18: 2, 3, 3\nMiddle: 2, 3 (HCF=6)\nOuter: 2 & 3 (LCM=2×2×3×3=36)' },
        { title: 'Product of Primes', content: 'Write any number as a product of its prime factors using index notation.', formula: '360 = 2³ × 3² × 5', example: '360 ÷ 2 = 180... keeps going until 1.' },
        { title: 'HCF × LCM Rule', content: 'For any two numbers a and b: HCF × LCM = a × b.', formula: 'HCF × LCM = Product of Numbers', example: 'a=6, b=10\nHCF=2, LCM=30\n2 × 30 = 60; 6 × 10 = 60 ✓' },
        { title: 'Exam Tip', content: 'If asked for HCF of large numbers, always use the Venn Diagram method to avoid missing factors.' },
        { title: 'HCF of Three Numbers', content: 'Find the prime factors of all three. The HCF is the product of primes shared by ALL three lists.', example: '12, 18, 30: All share a 2 and a 3. HCF = 6.' },
        { title: 'Problem Solving', content: 'HCF is used for "cutting into equal pieces". LCM is used for "when things happen at the same time again".', tip: 'Look for keywords like "smallest length" (LCM) or "biggest possible" (HCF).' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => { const primes = [2, 3, 5, 7, 11, 13]; const p = pick(primes); const n = p * pick([2, 3, 4, 5, 6]); return { display: `Is ${n} divisible by ${p}?`, answer: n % p === 0 ? 1 : 2, hint: '1 = Yes, 2 = No', explanation: `${n} ÷ ${p} = ${n / p}, so yes it is divisible.` }; },
          () => {
            const pairs = [[12, 18, 6], [8, 12, 4], [15, 20, 5], [24, 36, 12], [14, 21, 7], [16, 24, 8]];
            const [a, b, hcf] = pick(pairs);
            return { display: `Find the HCF of ${a} and ${b}`, answer: hcf, hint: 'Highest Common Factor', explanation: `Factors of ${a}: ${Array.from({length: a}, (_, i) => i + 1).filter(x => a % x === 0).join(', ')}\nFactors of ${b}: ${Array.from({length: b}, (_, i) => i + 1).filter(x => b % x === 0).join(', ')}\nHCF = ${hcf}` };
          },
          () => {
            const pairs = [[3, 4, 12], [4, 6, 12], [5, 6, 30], [3, 7, 21], [6, 8, 24], [4, 10, 20]];
            const [a, b, lcm] = pick(pairs);
            return { display: `Find the LCM of ${a} and ${b}`, answer: lcm, hint: 'Lowest Common Multiple', explanation: `Multiples of ${a}: ${[1,2,3,4,5,6,7,8].map(x=>a*x).join(', ')}\nMultiples of ${b}: ${[1,2,3,4,5,6,7,8].map(x=>b*x).join(', ')}\nLCM = ${lcm}` };
          },
        ];
        return pick(types)();
      } else {
        const types = [
          () => {
            const pairs = [[24, 36, 12], [30, 45, 15], [48, 60, 12], [36, 84, 12], [42, 56, 14]];
            const [a, b, hcf] = pick(pairs);
            return { display: `Find the HCF of ${a} and ${b}`, answer: hcf, hint: 'Use prime factorisation', explanation: `HCF(${a}, ${b}) = ${hcf}` };
          },
          () => {
            const pairs = [[12, 18, 36], [15, 20, 60], [8, 14, 56], [9, 12, 36], [10, 15, 30]];
            const [a, b, lcm] = pick(pairs);
            return { display: `Find the LCM of ${a} and ${b}`, answer: lcm, hint: 'Use prime factorisation', explanation: `LCM(${a}, ${b}) = ${lcm}` };
          },
          () => {
            const a = pick([12, 18, 24, 30, 36, 40, 48, 60]);
            const b = pick([8, 10, 14, 15, 20, 21, 25, 28]);
            const h = gcd(a, b);
            return { display: `HCF(${a}, ${b}) = ${h}. Find LCM(${a}, ${b})`, answer: (a * b) / h, hint: 'HCF × LCM = a × b', explanation: `LCM = (${a} × ${b}) ÷ ${h} = ${(a * b) / h}` };
          },
        ];
        return pick(types)();
      }
    },
  },

  'standard-form': {
    title: 'Standard Form',
    emoji: '🔬',
    color: '#b14aed',
    category: 'Number',
    description: 'Write very large and very small numbers using standard form (a × 10ⁿ).',
    lessons: {
      foundation: [
        { title: 'What is Standard Form?', content: 'A number written as a × 10ⁿ, where 1 ≤ a < 10 and n is an integer.', formula: 'a × 10ⁿ  (1 ≤ a < 10)', example: '3500 = 3.5 × 10³\n0.006 = 6 × 10⁻³' },
        { title: 'Large Numbers', content: 'Count how many places the decimal point moves to the LEFT. This is your positive power.', example: '45000 → 4.5 × 10⁴' },
        { title: 'Small Numbers', content: 'Count how many places the decimal point moves to the RIGHT. This is your negative power.', example: '0.0032 → 3.2 × 10⁻³', tip: 'Small numbers = negative powers.' },
        { title: 'The Rule of A', content: 'The leading number MUST be between 1 and 10. 12 × 10³ is NOT in standard form.', tip: 'Always check if your final answer is between 1 and 10!' },
        { title: 'Comparing Sizes', content: 'First compare the powers of 10. If the powers are the same, compare the leading numbers.', example: '2 × 10⁵ > 9 × 10⁴ because 10⁵ is larger than 10⁴.' }
      ],
      higher: [
        { title: 'Multiplication', content: 'Multiply the numbers and add the powers of 10.', formula: '(A × 10ᵃ) × (B × 10ᵇ) = (A×B) × 10ᵃ⁺ᵇ', example: '(3 × 10⁴) × (2 × 10³) = 6 × 10⁷' },
        { title: 'Division', content: 'Divide the numbers and subtract the powers of 10.', formula: '(A × 10ᵃ) ÷ (B × 10ᵇ) = (A/B) × 10ᵃ⁻ᵇ', example: '(8 × 10⁶) ÷ (2 × 10²) = 4 × 10⁴' },
        { title: 'Addition & Subtraction', content: 'Convert both numbers to the SAME power of 10 before adding or subtracting.', example: '(3 × 10⁴) + (5 × 10³) = (30 × 10³) + (5 × 10³) = 35 × 10³ = 3.5 × 10⁴' },
        { title: 'Adjusting the Answer', content: 'If your calculation result isn\'t between 1 and 10, shift the decimal and adjust the power.', example: '20 × 10⁵ = 2 × 10⁶' },
        { title: 'Negative Powers in Division', content: 'Be careful: subtracting a negative power means ADDING.', example: '10⁵ ÷ 10⁻³ = 10⁸' },
        { title: 'Standard Form on Calcs', content: 'Use the ×10ˣ or EXP button. Be careful with brackets during division!', tip: 'If your calc says 5.2E04, it means 5.2 × 10⁴.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => { const a = r(1, 9); const p = r(2, 6); const num = a * Math.pow(10, p); return { display: `Write ${num.toLocaleString()} in standard form.\nAnswer as: a × 10^n (e.g. 3.5 × 10^4)`, answer: `${a} × 10^${p}`, answerType: 'text', hint: 'Standard form', explanation: `${num.toLocaleString()} = ${a} × 10^${p}`, placeholder: 'e.g. 3 × 10^5' }; },
          () => { const a = pick([1.2, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9]); const p = r(2, 5); return { display: `Convert ${a} × 10^${p} to an ordinary number`, answer: a * Math.pow(10, p), hint: 'Expand', explanation: `${a} × 10^${p} = ${a * Math.pow(10, p)}` }; },
          () => { const p = r(2, 5); const val = r(1, 9); return { display: `What is the power of 10 in:\n${val} × 10^? = ${val * Math.pow(10, p)}`, answer: p, hint: 'Count the zeros', explanation: `${val * Math.pow(10, p)} = ${val} × 10^${p}` }; },
        ];
        return pick(types)();
      } else {
        const types = [
          () => { const a1 = r(2, 5); const a2 = r(2, 4); const p1 = r(2, 4); const p2 = r(2, 4); let ra = a1 * a2; let rp = p1 + p2; if (ra >= 10) { rp += 1; ra /= 10; } return { display: `(${a1} × 10^${p1}) × (${a2} × 10^${p2}) = ? × 10^?`, answer: `${ra} × 10^${rp}`, answerType: 'text', hint: 'Multiply & add powers', explanation: `${a1}×${a2} = ${a1*a2}, 10^${p1}×10^${p2} = 10^${p1+p2}\n= ${ra} × 10^${rp}`, placeholder: 'e.g. 6 × 10^7' }; },
          () => { const a1 = pick([4, 6, 8, 9]); const a2 = pick([2, 3, 4]); const p1 = r(4, 8); const p2 = r(1, 3); const ra = a1 / a2; const rp = p1 - p2; return { display: `(${a1} × 10^${p1}) ÷ (${a2} × 10^${p2})`, answer: `${ra} × 10^${rp}`, answerType: 'text', hint: 'Divide & subtract powers', explanation: `${a1}÷${a2} = ${ra}, 10^${p1}÷10^${p2} = 10^${rp}\n= ${ra} × 10^${rp}`, placeholder: 'e.g. 2 × 10^3' }; },
        ];
        return pick(types)();
      }
    },
    fractionInput: true,
  },

  'estimating': {
    title: 'Estimating',
    emoji: '🎯',
    color: '#ff2d78',
    category: 'Number',
    description: 'Round numbers to one significant figure and estimate calculations.',
    lessons: {
      foundation: [
        { title: 'Decimal Places (d.p.)', content: 'Look at the digit directly after your cut-off. If 5 or more, round the previous digit UP.', example: '3.47 to 1 d.p. → 3.5\n0.124 to 2 d.p. → 0.12' },
        { title: '1 Significant Figure (s.f.)', content: 'Keep only the first non-zero digit. Zeros at the start don\'t count!', example: '382 → 400\n0.0068 → 0.007' },
        { title: 'Estimating Calculations', content: 'Round every number to 1 significant figure first, then calculate.', formula: 'Round → Calculate', example: 'Estimate 39 × 5.1\n≈ 40 × 5 = 200' },
        { title: 'Money Estimates', content: 'Real-world checks: Usually round costs to the nearest whole pound.', tip: 'If you round UP, your estimate will be higher than the real answer.' },
        { title: 'Significant Figures vs Decimals', content: 's.f. counts from the first non-zero digit. d.p. counts from the decimal point.', example: '0.0053 is 2 s.f. but 4 d.p.' }
      ],
      higher: [
        { title: 'Rounding in Division', content: 'Round each number to 1 s.f. before dividing.', example: 'Estimate 412 ÷ 19 \n≈ 400 ÷ 20 = 20' },
        { title: 'Estimating Complex Expressions', content: 'Follow BIDMAS: Brackets, Indices, Division/Multiplication, then Addition/Subtraction.', example: 'Estimate (48.7 × 11.2) ÷ 4.9\n≈ (50 × 10) ÷ 5 = 100' },
        { title: 'Deciding Accuracy', content: 'If a question specifies "reasonable accuracy", 1 or 2 s.f. is usually target.', tip: 'Always show your rounded numbers so the examiner knows how you estimated!' },
        { title: 'Upper/Lower Estimates', content: 'To get the MAXIMUM estimate for a fraction, use the Upper Bound for the top and Lower Bound for the bottom.' },
        { title: 'Reasonableness', content: 'After estimating, ask: "Does this answer make sense?" If you estimated 40 × 5, the answer should be near 200, not 2000.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => { const a = r(2, 9) * 10 + r(1, 9); const b = r(2, 9); const est = Math.round(a / 10) * 10 * b; return { display: `Estimate ${a} × ${b}`, answer: est, hint: 'Round to 1 s.f. first', explanation: `${a} ≈ ${Math.round(a / 10) * 10}\n${Math.round(a / 10) * 10} × ${b} = ${est}` }; },
          () => { const n = r(1, 9) * 100 + r(1, 9) * 10 + r(1, 9); const rounded = Math.round(n / 100) * 100; return { display: `Round ${n} to 1 significant figure`, answer: rounded, hint: '1 s.f.', explanation: `${n} → ${rounded}` }; },
        ];
        return pick(types)();
      } else {
        const types = [
          () => { const a = r(20, 50) * 10 + r(1, 9); const b = r(2, 9) * 10 + r(1, 9); const ea = Math.round(a / 100) * 100; const eb = Math.round(b / 10) * 10; return { display: `Estimate ${a} ÷ ${b}`, answer: Math.round(ea / eb), hint: 'Round to 1 s.f. first', explanation: `${a} ≈ ${ea}, ${b} ≈ ${eb}\n${ea} ÷ ${eb} = ${Math.round(ea / eb)}` }; },
          () => { const a = r(3, 9) * 10 + r(1, 9); const b = r(2, 9); const c = r(2, 5); const ea = Math.round(a / 10) * 10; return { display: `Estimate (${a} × ${b}) ÷ ${c}`, answer: Math.round((ea * b) / c), hint: 'Round then calculate', explanation: `${a} ≈ ${ea}\n(${ea} × ${b}) ÷ ${c} = ${Math.round((ea * b) / c)}` }; },
        ];
        return pick(types)();
      }
    },
  },

  'error-intervals': {
    title: 'Error Intervals',
    emoji: '📏',
    color: '#00d4ff',
    category: 'Number',
    description: 'Find upper and lower bounds for rounded measurements.',
    lessons: {
      foundation: [
        { title: 'What Are Bounds?', content: 'A range where the true value lies. The Lower Bound (LB) is the smallest possible value; the Upper Bound (UB) is the first value that rounds into the next category.', formula: 'LB ≤ x < UB', example: '5.3 cm (to 1 d.p.)\nLB = 5.25, UB = 5.35' },
        { title: 'Finding LB and UB', content: 'Add and subtract HALF the degree of accuracy.', tip: 'If rounded to nearest 10, accuracy is 10. Half is 5. So +/- 5.' },
        { title: 'Error Interval Notation', content: 'Always uses a ≤ for the lower bound and a < for the upper bound.', formula: 'LB ≤ x < UB', example: '120 rounded to nearest 10:\n115 ≤ x < 125' },
        { title: 'Truncation', content: 'Truncating is different from rounding. Truncating to 1 d.p. means simply "cutting off" the extra digits.', example: '5.39 truncated to 1 d.p. is 5.3 (LB=5.3, UB=5.4)' },
        { title: 'Half-Unit Rule', content: 'The range is always ± half of the rounding unit.', example: 'To nearest 0.1 → ± 0.05\nTo nearest 100 → ± 50' }
      ],
      higher: [
        { title: 'Bounds in Area', content: 'Max Area = UB_length × UB_width. Min Area = LB_length × LB_width.', example: 'l=5.3, w=3.1 (both 1 d.p.)\nMax = 5.35 × 3.15 = 16.8525' },
        { title: 'Bounds in Fractions', content: 'To get the MAX result: Max ÷ Min. To get the MIN result: Min ÷ Max.', formula: 'Upper = UB_top / LB_bottom\nLower = LB_top / UB_bottom', tip: 'This is the most common Higher tier exam question on bounds!' },
        { title: 'Significant Figure Bounds', content: 'If a number is 400 to 1 s.f., the degree of accuracy is 100. Half is 50.', example: 'LB = 350, UB = 450' },
        { title: 'Complex Calculation Bounds', content: 'Calculate each part separately using its specific bound, then combine using the rules of arithmetic.' },
        { title: 'Bounds in Subtraction', content: 'To get the MAX difference: UB_first − LB_second. To get the MIN difference: LB_first − UB_second.', tip: 'Think: "Biggest minus Smallest = Maximum gap".' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => { const v = r(10, 90) * 10; return { display: `${v} is rounded to the nearest 10.\nWhat is the lower bound?`, answer: v - 5, hint: 'Subtract half the unit', explanation: `Lower bound = ${v} − 5 = ${v - 5}` }; },
          () => { const v = r(10, 90) * 10; return { display: `${v} is rounded to the nearest 10.\nWhat is the upper bound?`, answer: v + 5, hint: 'Add half the unit', explanation: `Upper bound = ${v} + 5 = ${v + 5}` }; },
          () => { const w = r(1, 9); const d = r(1, 9); const v = w + d / 10; return { display: `${v} is rounded to 1 d.p.\nWhat is the lower bound?`, answer: v - 0.05, hint: 'Subtract 0.05', explanation: `LB = ${v} − 0.05 = ${v - 0.05}` }; },
        ];
        return pick(types)();
      } else {
        const types = [
          () => { const v = r(10, 50) * 100; return { display: `${v} is rounded to the nearest 100.\nWrite the error interval.`, answer: `${v - 50} ≤ x < ${v + 50}`, answerType: 'text', hint: 'LB ≤ x < UB', explanation: `${v - 50} ≤ x < ${v + 50}`, placeholder: 'e.g. 150 ≤ x < 250' }; },
          () => { const l = r(3, 9) + r(1, 9) / 10; const w = r(2, 7) + r(1, 9) / 10; const maxA = ((l + 0.05) * (w + 0.05)); return { display: `l = ${l} cm, w = ${w} cm (1 d.p.)\nFind the maximum area (2 d.p.)`, answer: Math.round(maxA * 100) / 100, hint: 'Use upper bounds for both', explanation: `Max l = ${l + 0.05}, Max w = ${w + 0.05}\nArea = ${Math.round(maxA * 100) / 100}` }; },
        ];
        return pick(types)();
      }
    },
    fractionInput: true,
  },

  'product-rule-counting': {
    title: 'Product Rule for Counting',
    emoji: '🔢',
    color: '#ffe600',
    category: 'Number',
    description: 'Calculate the number of possible outcomes using the product rule.',
    lessons: {
      foundation: [
        { title: 'The Product Rule', content: 'If there are m ways to do one thing and n ways to do another, the total number of outcomes is m × n.', formula: 'Total = m × n', example: '3 shirts and 4 trousers:\nTotal outfits = 3 × 4 = 12' },
        { title: 'Multiple Choices', content: 'Extend the rule: just keep multiplying for each additional choice.', example: '3 starters, 5 mains, 4 desserts:\nTotal meals = 3 × 5 × 4 = 60' },
        { title: 'Making Lists', content: 'You can check your answer by listing pairs (e.g., S1T1, S1T2...), but the product rule is much faster.', tip: 'Good for small sets!' },
        { title: 'Tree Diagrams', content: 'Each branch represents a choice. Total outcomes = total branches at the end.' }
      ],
      higher: [
        { title: 'Codes and Passwords', content: 'Each position in a code has a number of choices. Multiply them all.', example: '4-digit PIN (digits 0-9):\n10 × 10 × 10 × 10 = 10,000' },
        { title: 'Without Repetition', content: 'If items cannot be reused, the choices reduce by 1 each time.', example: '3-letter code from 26 letters (no repeats):\n26 × 25 × 24 = 15,600' },
        { title: 'Arranging Items', content: 'The number of ways to arrange n distinct items is n!', formula: 'n! = n × (n-1) × ... × 1', example: 'Ways to arrange 5 books = 5 × 4 × 3 × 2 × 1 = 120' },
        { title: 'Fixed Positions', content: 'If some choices are fixed (e.g. "code must start with A"), that position only has 1 choice.', example: '4-letter code starting with A: 1 × 26 × 26 × 26' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return (() => { const a = r(2, 8); const b = r(2, 8); const items = [['shirts', 'trousers'], ['starters', 'mains'], ['hats', 'scarves']]; const [i1, i2] = pick(items); return { display: `${a} ${i1} and ${b} ${i2}.\nHow many combinations?`, answer: a * b, hint: 'Product rule', explanation: `${a} × ${b} = ${a * b}` }; })();
      } else {
        const types = [
          () => { const d = r(3, 5); return { display: `A ${d}-digit PIN using digits 0-9.\nHow many possible PINs?`, answer: Math.pow(10, d), hint: 'Each digit has 10 choices', explanation: `${'10 × '.repeat(d - 1)}10 = ${Math.pow(10, d).toLocaleString()}` }; },
          () => { const n = r(3, 5); const letters = 26; let ans = 1; const parts = []; for (let i = 0; i < n; i++) { ans *= (letters - i); parts.push(letters - i); } return { display: `A ${n}-letter code from A–Z, no repeats.\nHow many possible codes?`, answer: ans, hint: 'Decreasing choices', explanation: `${parts.join(' × ')} = ${ans.toLocaleString()}` }; },
        ];
        return pick(types)();
      }
    },
  },

  // ─── ALGEBRA ───────────────────────────────────────────────

  'expanding-simplifying': {
    title: 'Expanding & Simplifying',
    emoji: '📖',
    color: '#00e5a0',
    category: 'Algebra',
    description: 'Expand brackets and collect like terms.',
    lessons: {
      foundation: [
        { title: 'Expanding Single Brackets', content: 'Multiply the term outside by EVERYTHING inside.', formula: 'a(b + c) = ab + ac', example: '3(x + 4) = 3x + 12\n-2(5y - 3) = -10y + 6' },
        { title: 'Collecting Like Terms', content: 'Combine parts with identical letters and powers.', example: '3x + 2y + 5x - y = 8x + y' },
        { title: 'Negative Terms', content: 'Be extremely careful with negatives when expanding.', tip: 'A negative outside times a negative inside becomes POSITIVE.' },
        { title: 'Multi-term Brackets', content: 'The rule is the same regardless of how many terms are inside.', example: '5(x + y - z) = 5x + 5y - 5z' },
        { title: 'Algebraic Terms Outside', content: 'When a variable is outside, remember x × x = x².', example: 'x(x + 3) = x² + 3x' }
      ],
      higher: [
        { title: 'Double Brackets (FOIL)', content: 'First, Outer, Inner, Last.', formula: '(a+b)(c+d) = ac + ad + bc + bd', example: '(x + 3)(x + 5) = x² + 8x + 15' },
        { title: 'Triple Brackets', content: 'Expand two brackets first, then multiply the result by the third.', tip: 'Do it in steps to avoid losing terms!' },
        { title: 'Difference of Two Squares (DOTS)', content: 'Middle terms cancel out. Always gives x² - n².', formula: '(x+a)(x-a) = x² - a²', example: '(x+5)(x-5) = x² - 25' },
        { title: 'Squaring a Bracket', content: 'It means multiplying it by itself. (x+3)² is NOT x²+9.', formula: '(a+b)² = a² + 2ab + b²', example: '(x+3)² = (x+3)(x+3) = x² + 6x + 9' },
        { title: 'Negative Coefficients', content: 'Be careful with (x−3)². It expands to x² − 6x + 9.', tip: 'The constant term is always positive when squaring a real bracket!' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => { const a = r(2, 6); const b = r(1, 10); const c = r(1, 10); return { display: `Expand: ${a}(${b}x + ${c})\nWhat is the coefficient of x?`, answer: a * b, hint: 'Multiply through', explanation: `${a} × ${b}x = ${a * b}x` }; },
          () => { const a = r(2, 8); const b = r(1, 10); return { display: `Expand: ${a}(x + ${b})\nWhat is the constant term?`, answer: a * b, hint: 'Multiply the constant', explanation: `${a} × ${b} = ${a * b}` }; },
          () => { const a = r(2, 8); const b = r(1, 6); const c = r(1, 8); const d = r(1, 4); return { display: `Simplify: ${a}x + ${b} + ${c}x − ${d}`, answer: a + c, hint: 'Collect x terms', explanation: `${a}x + ${c}x = ${a + c}x\n${b} − ${d} = ${b - d}\nAnswer: ${a + c}x + ${b - d}` }; },
        ];
        return pick(types)();
      } else {
        const types = [
          () => { const a = r(1, 6); const b = r(1, 6); return { display: `Expand (x + ${a})(x + ${b})\nWhat is the coefficient of x?`, answer: a + b, hint: 'FOIL — add inner and outer', explanation: `Outer: ${b}x, Inner: ${a}x\nTotal: ${a + b}x` }; },
          () => { const a = r(1, 6); const b = r(1, 6); return { display: `Expand (x + ${a})(x + ${b})\nWhat is the constant term?`, answer: a * b, hint: 'Last terms multiply', explanation: `${a} × ${b} = ${a * b}` }; },
          () => { const a = r(2, 8); return { display: `Expand (x + ${a})(x − ${a})\nWhat is the constant?`, answer: -(a * a), hint: 'Difference of two squares', explanation: `(x+${a})(x−${a}) = x² − ${a}² = x² − ${a * a}` }; },
        ];
        return pick(types)();
      }
    },
  },

  'factorising': {
    title: 'Factorising',
    emoji: '🧩',
    color: '#00d4ff',
    category: 'Algebra',
    description: 'Factorise expressions by finding common factors or using quadratic methods.',
    lessons: {
      foundation: [
        { title: 'Common Factor', content: 'Find the highest common factor of all terms and put it outside a bracket.', formula: 'ab + ac = a(b + c)', example: '6x + 12 = 6(x + 2)\n4x² + 8x = 4x(x + 2)' },
        { title: 'Fully Factorise', content: 'Examiners want the HIGHEST common factor. 2(2x+4) is factorised, but 4(x+2) is FULLY factorised.', tip: 'Always check if the terms inside the bracket still have a common factor.' },
        { title: 'Checking with Expansion', content: 'You can check your factorisation by multiplying the brackets out again.', tip: 'If you don\'t get your original expression, something went wrong!' },
        { title: 'Letters as Factors', content: 'Sometimes the common factor is a letter or both a number and a letter.', example: '5x² - 10x = 5x(x - 2)' }
      ],
      higher: [
        { title: 'Factorising Quadratics', content: 'Find two numbers that multiply to give c and add to give b in x² + bx + c.', formula: 'x² + bx + c = (x + p)(x + q)\nwhere p × q = c and p + q = b', example: 'x² + 7x + 12\nNumbers: 3 and 4 (3×4=12, 3+4=7)\n= (x + 3)(x + 4)' },
        { title: 'Difference of Two Squares', content: 'If the expression is a² − b², it factorises to (a+b)(a−b).', formula: 'a² − b² = (a + b)(a − b)', example: 'x² − 25 = (x + 5)(x − 5)\n4x² − 9 = (2x + 3)(2x − 3)' },
        { title: 'Quadratics with a > 1', content: 'For ax² + bx + c where a > 1, use the "split the middle" method or trial and improvement.', example: '2x² + 5x + 3 = (2x + 3)(x + 1)' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const a = r(2, 8); const b = r(1, 10); const c = r(1, 10);
        return { display: `Factorise: ${a * b}x + ${a * c}\nWhat is the common factor?`, answer: a, hint: 'HCF of both terms', explanation: `HCF of ${a * b} and ${a * c} = ${a}\n${a}(${b}x + ${c})` };
      } else {
        const types = [
          () => { const p = r(1, 8); const q = r(1, 8); return { display: `Factorise: x² + ${p + q}x + ${p * q}\nWhat is the smaller bracket number?`, answer: Math.min(p, q), hint: 'Two numbers multiply to give c, add to give b', explanation: `${Math.min(p, q)} × ${Math.max(p, q)} = ${p * q}\n${Math.min(p, q)} + ${Math.max(p, q)} = ${p + q}\n= (x + ${Math.min(p, q)})(x + ${Math.max(p, q)})` }; },
          () => { const a = r(2, 9); return { display: `Factorise: x² − ${a * a}`, answer: a, hint: 'Difference of two squares — what is the value that squares to give the constant?', explanation: `x² − ${a * a} = (x + ${a})(x − ${a})` }; },
        ];
        return pick(types)();
      }
    },
  },

  'substitution': {
    title: 'Substitution',
    emoji: '🔄',
    color: '#ff6b35',
    category: 'Algebra',
    description: 'Substitute values into algebraic expressions and formulae.',
    lessons: {
      foundation: [
        { title: 'Basic Substitution', content: 'Replace the letter with the number, then calculate.', example: 'If a = 3, find 2a + 5\n= 2(3) + 5 = 11' },
        { title: 'Negative Numbers', content: 'Use brackets when substituting negatives to keep the sign safe.', example: 'If x = -2, 3x becomes 3(-2) = -6' },
        { title: 'Squared Values', content: 'Square the value before multiplying by other coefficients.', tip: 'Calculate powers before addition/subtraction!' },
        { title: 'Using Brackets', content: 'On a calculator, always put your substituted number in brackets.', example: 'If x = -2, type (-2)² not -2².' }
      ],
      higher: [
        { title: 'With Negative Square Powers', content: 'Squaring a negative always gives a POSITIVE result.', example: 'If x = -2, x² = (-2)² = 4', tip: 'Common error alert: -2² is -4 on many calcs, but (-2)² is 4!' },
        { title: 'Kinematics Formulae', content: 'Substitute values into physics-style equations like v = u + at.', example: 'u=5, a=2, t=3:\nv = 5 + (2×3) = 11' },
        { title: 'Subject of the Formula', content: 'Sometimes you must substitute, THEN solve for a different variable.', example: 'y = 2x + 1. If y=9, what is x?\n9 = 2x + 1 → 2x = 8 → x = 4' },
        { title: 'Fractional Substitution', content: 'Carefully calculate the numerator and denominator separately before dividing.' },
        { title: 'Rearranging First', content: 'Sometimes it is easier to simplify or rearrange an expression before substituting the values in.', tip: 'Always check if you can simplify first!' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => { const a = r(2, 6); const x = r(1, 8); const b = r(1, 10); return { display: `If x = ${x}, find ${a}x + ${b}`, answer: a * x + b, hint: 'Replace x', explanation: `${a}(${x}) + ${b} = ${a * x} + ${b} = ${a * x + b}` }; },
          () => { const x = r(2, 6); const y = r(1, 5); const a = r(2, 5); return { display: `If x = ${x}, y = ${y}\nFind ${a}x + y`, answer: a * x + y, hint: 'Replace both', explanation: `${a}(${x}) + ${y} = ${a * x + y}` }; },
        ];
        return pick(types)();
      } else {
        const types = [
          () => { const x = r(2, 6); const a = r(1, 4); return { display: `If x = ${x}, find x² + ${a}x`, answer: x * x + a * x, hint: 'Square first', explanation: `${x}² + ${a}(${x}) = ${x * x} + ${a * x} = ${x * x + a * x}` }; },
          () => { const x = -r(2, 5); const a = r(2, 4); return { display: `If x = ${x}, find x² − ${a}x`, answer: x * x - a * x, hint: 'Careful with negatives', explanation: `(${x})² − ${a}(${x}) = ${x * x} − (${a * x}) = ${x * x - a * x}` }; },
        ];
        return pick(types)();
      }
    },
  },

  'setting-up-equations': {
    title: 'Setting Up & Solving Equations',
    emoji: '⚖️',
    color: '#00ff94',
    category: 'Algebra',
    description: 'Form equations from word problems and solve them.',
    lessons: {
      foundation: [
        { title: 'Forming Equations', content: 'Translate words into algebra: "a number" = x, "three more" = + 3, "twice" = 2x.', example: '"I think of a number, double it and add 5. The answer is 17."\n2x + 5 = 17' },
        { title: 'Solving (2 Steps)', content: 'Use inverse operations to find x. Do the addition/subtraction first!', example: '2x + 5 = 17\n2x = 12\nx = 6' },
        { title: 'Variable on Both Sides', content: 'Collect all x terms on one side (the side with more x) and numbers on the other.', example: '5x + 3 = 2x + 12\n3x + 3 = 12\n3x = 9 → x = 3' },
        { title: 'Equations with Brackets', content: 'Expand the brackets first, then solve as normal.', example: '3(x + 4) = 18\n3x + 12 = 18\n3x = 6 → x = 2' },
        { title: 'Balancing Method', content: 'Whatever you do to one side, you MUST do to the other side to keep it equal.', tip: 'Think of a pair of scales.' }
      ],
      higher: [
        { title: 'Equations from Shapes', content: 'Use properties like "angles in a triangle = 180°" to form equations.', example: 'Angles: x, 2x, 3x\nx + 2x + 3x = 180\n6x = 180\nx = 30' },
        { title: 'Equations with Fractions', content: 'Multiply through by the common denominator to clear all fractions.', example: 'x/3 + x/2 = 10\nMultiply by 6: 2x + 3x = 60\n5x = 60 → x = 12' },
        { title: 'Solving Quadratics by Factorising', content: 'Set the equation to zero, factorise, then find the x values that make each bracket zero.', formula: '(x+p)(x+q) = 0 → x = -p or x = -q', example: 'x² - 5x + 6 = 0\n(x-2)(x-3) = 0 → x=2 or x=3' },
        { title: 'The Quadratic Formula', content: 'Used when you can\'t factorise. Always round to given accuracy.', formula: 'x = [-b ± √(b² - 4ac)] / 2a', tip: 'Be careful with the -b if b is already negative!' },
        { title: 'Iterative Methods', content: 'Use a formula repeatedly to find increasingly accurate approximations for a root.', tip: 'Often used with a calculator ANS button.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const x = r(2, 12); const a = r(2, 6); const b = r(1, 10); const c = a * x + b;
        return { display: `Solve: ${a}x + ${b} = ${c}`, answer: x, hint: 'Inverse operations', explanation: `${a}x = ${c} − ${b} = ${c - b}\nx = ${c - b} ÷ ${a} = ${x}` };
      } else {
        const types = [
          () => { const x = r(10, 50); const a = r(1, 3); const b = r(1, 4); return { display: `Triangle angles: ${a}x°, ${b}x°, ${(6 - a - b)}x°\nFind x`, answer: Math.round(180 / 6) === x ? x : (() => { const sum = a + b + (6 - a - b); return Math.round(180 / sum); })(), hint: 'Angles add to 180°', explanation: `${a}x + ${b}x + ${6 - a - b}x = 180\n6x = 180\nx = 30` }; },
          () => { const x = r(2, 10); const d = r(2, 5); const b = r(1, 8); const c = x / d + b; return { display: `Solve: x/${d} + ${b} = ${c}`, answer: x, hint: 'Clear the fraction', explanation: `x/${d} = ${c - b}\nx = ${d} × ${c - b} = ${x}` }; },
        ];
        // Simpler fallback
        const x2 = r(2, 15); const a2 = r(2, 6); const b2 = r(1, 15); const c2 = a2 * x2 - b2;
        return { display: `Solve: ${a2}x − ${b2} = ${c2}`, answer: x2, hint: 'Add, then divide', explanation: `${a2}x = ${c2} + ${b2} = ${c2 + b2}\nx = ${(c2 + b2)} ÷ ${a2} = ${x2}` };
      }
    },
  },

  'straight-line-graphs': {
    title: 'Straight Line Graphs',
    emoji: '📈',
    color: '#b14aed',
    category: 'Algebra',
    description: 'Work with y = mx + c — find gradients, intercepts, and equations.',
    lessons: {
      foundation: [
        { title: 'y = mx + c', visualId: 'math-gradients', content: 'm is the gradient (steepness) and c is the y-intercept (where the line crosses the y-axis).', formula: 'y = mx + c', example: 'y = 3x + 2\nGradient = 3, y-intercept = 2' },
        { title: 'Finding the Gradient', content: 'Gradient = rise ÷ run = change in y ÷ change in x.', formula: 'm = (y₂ − y₁) / (x₂ − x₁)', example: 'Points (1, 3) and (3, 7):\nm = (7−3)/(3−1) = 4/2 = 2' },
        { title: 'Drawing from a Table', content: 'Substitute x values into the equation to find y values, then plot the points.', tip: 'Always pick simple x values like -1, 0, 1, 2.' },
        { title: 'x = a and y = b', content: 'x = a is a VERTICAL line through a. y = b is a HORIZONTAL line through b.', example: 'x = 3 is a vertical line.' },
        { title: 'Intercepts', content: 'x-intercept is where y=0. y-intercept is where x=0.' }
      ],
      higher: [
        { title: 'Finding the Equation', content: 'If you know the gradient and a point, substitute into y = mx + c to find c.', example: 'Gradient 2, passes through (3, 8):\n8 = 2(3) + c\nc = 2\ny = 2x + 2' },
        { title: 'Parallel Lines', content: 'Lines are parallel if they have the SAME gradient.', example: 'y = 2x + 5 and y = 2x - 3 are parallel.' },
        { title: 'Perpendicular Lines', content: 'Parallel lines have gradients that multiply to −1. (Negative reciprocal).', formula: 'm₁ × m₂ = −1', example: 'Line: y = 3x + 1\nPerpendicular: m = −1/3' },
        { title: 'Real World Graphs', content: 'The gradient represents the rate of change (e.g. speed on a distance-time graph).', tip: 'Check the units on the axes!' },
        { title: 'Midpoints & Lengths', content: 'Find the midpoint between two points by averaging the x and y coordinates.', formula: 'Midpoint = [(x1+x2)/2 , (y1+y2)/2]' }
      ],
    },
    generateQuestion: (tier) => {
      const types = [
        () => {
           const m = r(1, 6); const c = r(-5, 10);
           return makeMCQ(`In the equation y = ${m}x + ${c}, what is the gradient?`, `${m}`, [`${c}`, `${m + 1}`, '1'], 'The gradient is the multiplier of x.', `${m}`);
        },
        () => {
           const x1 = r(0, 3); const m = r(1, 5); const x2 = x1 + r(1, 4);
           const y1 = r(0, 10); const y2 = y1 + m * (x2 - x1);
           return makeMCQ(`Find the gradient of the line passing through (${x1}, ${y1}) and (${x2}, ${y2})`, `${m}`, [`${m + 2}`, `${y2 - y1}`, `${x2 - x1}`], 'Rise over Run.', `(${y2} - ${y1}) / (${x2} - ${x1}) = ${m}`);
        },
        () => {
           const m = r(2, 6);
           return makeMCQ(`A line has gradient ${m}. What is the gradient of a parallel line?`, `${m}`, [`${-1/m}`, '1', '0'], 'Parallel lines have the same gradient.', `${m}`);
        }
      ];
      return pick(types)();
    },
    fractionInput: true,
  },

  // ─── GEOMETRY ──────────────────────────────────────────────

  'angles-polygons': {
    title: 'Angles in Polygons',
    emoji: '🔷',
    color: '#00d4ff',
    category: 'Geometry',
    description: 'Find interior and exterior angles of regular and irregular polygons.',
    lessons: {
      foundation: [
        { title: 'Interior Angles Sum', content: 'Sum of interior angles = (n − 2) × 180° where n is sides.', formula: '(n-2) × 180', example: 'Pentagon (5 sides):\n(5-2)×180 = 540°' },
        { title: 'Exterior Angles Sum', content: 'Exterior angles always sum to 360° for ANY polygon.', formula: 'Sum = 360°', example: 'Regular Hexagon:\nEach exterior = 360/6 = 60°' },
        { title: 'Regular Polygons', content: 'All sides and angles are equal. Each interior angle = Sum ÷ n.', formula: 'Int = (n-2)×180 / n' }
      ],
      higher: [
        { title: 'Finding Number of Sides', content: 'If you know the exterior angle, n = 360 ÷ exterior angle.', formula: 'n = 360 / ext', example: 'Exterior = 40°\nn = 360/40 = 9 sides' },
        { title: 'Interior + Exterior', content: 'At any vertex, the interior and exterior angles add to 180° (straight line).', formula: 'Int + Ext = 180°', example: 'Ext = 36° → Int = 144°' },
        { title: 'Tessellation', content: 'Regular polygons tessellate if their interior angle divides exactly into 360°.', tip: 'Equilateral triangles, squares, and hexagons tessellate!' },
        { title: 'Irregular Polygons', content: 'Sum rules still apply, but individual angles vary based on the specifics of the shape.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const n = r(5, 10); const names = { 5:'pentagon', 6:'hexagon', 7:'heptagon', 8:'octagon', 9:'nonagon', 10:'decagon' };
        return { display: `Find the sum of interior angles of a ${names[n] || n+'-sided polygon'}`, answer: (n - 2) * 180, hint: '(n−2) × 180', explanation: `(${n}−2) × 180 = ${n - 2} × 180 = ${(n - 2) * 180}°` };
      } else {
        const types = [
          () => { const n = r(5, 12); return { display: `Each exterior angle of a regular polygon is ${360 / n}°.\nHow many sides?`, answer: n, hint: '360 ÷ exterior', explanation: `360 ÷ ${360 / n} = ${n} sides` }; },
          () => { const n = r(5, 10); const each = ((n - 2) * 180) / n; return { display: `Find each interior angle of a regular ${n}-sided polygon`, answer: Math.round(each), hint: '(n−2)×180 ÷ n', explanation: `(${n}−2)×180 ÷ ${n} = ${(n - 2) * 180} ÷ ${n} = ${Math.round(each)}°` }; },
        ];
        return pick(types)();
      }
    },
  },

  'angles-parallel-lines': {
    title: 'Angles on Parallel Lines',
    emoji: '↗️',
    color: '#ff6b35',
    category: 'Geometry',
    description: 'Identify and calculate alternate, corresponding, and co-interior angles.',
    lessons: {
      foundation: [
        { title: 'Alternate Angles (Z)', content: 'Alternate angles are equal. They form a Z shape between parallel lines.', formula: 'Alternate angles are equal', example: 'Angle = 65° → Alternate = 65°' },
        { title: 'Corresponding Angles (F)', content: 'Corresponding angles are equal. They form an F shape.', formula: 'Corresponding angles are equal', example: 'Angle = 110° → Corresponding = 110°' },
        { title: 'Co-interior Angles (C)', content: 'Co-interior (allied) angles add up to 180°. They form a C or U shape.', formula: 'Co-interior add to 180°', example: 'Angle = 70° → Co-interior = 110°' },
        { title: 'Vertically Opposite', content: 'Angles opposite each other when two lines cross are ALWAYS equal.' },
        { title: 'Angles on a Point', content: 'Angles around a point add up to 360°.' }
      ],
      higher: [
        { title: 'Multi-Step Problems', content: 'Combine angle rules: use alternate, corresponding, vertically opposite, and angles on a line together.', example: 'If angle a = 55° (alternate)\nAngle b = 180° − 55° = 125° (straight line)' },
        { title: 'Proofs', content: 'You may be asked to prove that lines are parallel by showing that alternate or corresponding angles are equal.', tip: 'Always state the full reason (e.g. "Alternate angles are equal").' },
        { title: 'Geometric Reasonings', content: 'In Higher tier, you often need to provide a chain of reasons for every step in an angle calculation.' },
        { title: 'Parallel Lines in Shapes', content: 'Parallel lines properties often appear inside parallelograms, rhombuses and trapezia.' }
      ],
    },
    generateQuestion: (tier) => {
      const types = [
        () => { const a = r(25, 155); return { display: `Parallel lines with a transversal.\nOne angle is ${a}°. Find the alternate angle.`, answer: a, hint: 'Z-angles are equal', explanation: `Alternate angles = ${a}°` }; },
        () => { const a = r(25, 155); return { display: `Parallel lines with a transversal.\nOne angle is ${a}°. Find the corresponding angle.`, answer: a, hint: 'F-angles are equal', explanation: `Corresponding angles = ${a}°` }; },
        () => { const a = r(40, 140); return { display: `Find the co-interior angle if one is ${a}°`, answer: 180 - a, hint: 'C-angles add to 180°', explanation: `180 − ${a} = ${180 - a}°` }; },
      ];
      return pick(types)();
    },
  },

  'area-2d-shapes': {
    title: 'Area of 2D Shapes',
    emoji: '📐',
    color: '#00e5a0',
    category: 'Geometry',
    description: 'Calculate areas of triangles, rectangles, trapeziums, circles, and more.',
    lessons: {
      foundation: [
        { title: 'Rectangle', formula: 'A = length × width', example: '8 × 5 = 40 cm²' },
        { title: 'Triangle', content: 'Half of base times height.', formula: 'A = ½ × base × height', example: 'b=10, h=6: A = ½ × 10 × 6 = 30 cm²' },
        { title: 'Trapezium', content: 'Average of parallel sides times height.', formula: 'A = ½(a + b) × h', example: 'a=4, b=8, h=5: A = ½(12) × 5 = 30 cm²' },
      ],
      higher: [
        { title: 'Circle', formula: 'A = πr²', example: 'r = 5: A = π × 25 = 78.5 cm² (1 d.p.)' },
        { title: 'Sector', content: 'A fraction of the full circle area.', formula: 'A = (θ/360) × πr²', example: 'r=6, θ=90°: A = (90/360) × π × 36 = 28.3 cm²' },
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => { const l = r(3, 15); const w = r(2, 10); return { display: `Rectangle: length ${l} cm, width ${w} cm.\nFind the area.`, answer: l * w, hint: 'l × w', explanation: `${l} × ${w} = ${l * w} cm²` }; },
          () => { const b = r(4, 14); const h = r(3, 10); return { display: `Triangle: base ${b} cm, height ${h} cm.\nFind the area.`, answer: (b * h) / 2, hint: '½ × b × h', explanation: `½ × ${b} × ${h} = ${(b * h) / 2} cm²` }; },
          () => { const a = r(3, 10); const b = r(a, a + 8); const h = r(3, 8); return { display: `Trapezium: a=${a}, b=${b}, h=${h}.\nFind the area.`, answer: ((a + b) * h) / 2, hint: '½(a+b)×h', explanation: `½(${a}+${b}) × ${h} = ${((a + b) * h) / 2} cm²` }; },
        ];
        return pick(types)();
      } else {
        const rad = r(3, 10);
        const area = Math.round(Math.PI * rad * rad * 10) / 10;
        return { display: `Circle: radius ${rad} cm.\nFind the area (1 d.p., use π = 3.14159)`, answer: area, hint: 'πr²', explanation: `π × ${rad}² = π × ${rad * rad} = ${area} cm²` };
      }
    },
  },

  'bearings': {
    title: 'Bearings',
    emoji: '🧭',
    color: '#ffe600',
    category: 'Geometry',
    description: 'Work with three-figure bearings measured clockwise from North.',
    lessons: {
      foundation: [
        { title: 'What is a Bearing?', content: 'A bearing is an angle measured clockwise from North. Always written as 3 digits.', formula: 'Always 3 digits, measured clockwise from N', example: 'Due East = 090°\nDue South = 180°\nNorth-East ≈ 045°' },
        { title: 'Reading Bearings', content: 'Start at North, turn clockwise to the direction you want.', example: 'South-West = 225°\nNorth-West = 315°' },
      ],
      higher: [
        { title: 'Back Bearings', content: 'The bearing from B back to A is the reverse bearing. Add or subtract 180°.', formula: 'Back bearing = bearing ± 180°', example: 'Bearing A→B = 060°\nBearing B→A = 060 + 180 = 240°', tip: 'If < 180, add 180. If ≥ 180, subtract 180.' },
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const dirs = [['North', 0], ['East', 90], ['South', 180], ['West', 270], ['North-East', 45], ['South-East', 135], ['South-West', 225], ['North-West', 315]];
        const [name, bearing] = pick(dirs);
        return { display: `What is the bearing of ${name}?\n(3 digits)`, answer: bearing, hint: 'Clockwise from North', explanation: `${name} = ${String(bearing).padStart(3, '0')}°` };
      } else {
        const b = r(10, 35) * 10;
        const back = b < 180 ? b + 180 : b - 180;
        return { display: `Bearing A to B = ${String(b).padStart(3, '0')}°.\nFind the bearing from B to A.`, answer: back, hint: 'Add or subtract 180', explanation: `${b} ${b < 180 ? '+' : '−'} 180 = ${back}°` };
      }
    },
  },

  'pythagoras-theorem': {
    title: "Pythagoras' Theorem",
    emoji: '📐',
    color: '#ff2d78',
    category: 'Geometry',
    description: 'Find missing sides in right-angled triangles.',
    lessons: {
      foundation: [
        { title: "Pythagoras' Theorem", visualId: 'math-triangles', content: 'In a right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides.', formula: 'a² + b² = c²', example: 'a=3, b=4:\nc² = 9 + 16 = 25\nc = √25 = 5' },
        { title: 'Finding the Hypotenuse', content: 'Square both sides, add, then square root.', formula: 'c = √(a² + b²)', example: 'a=5, b=12:\nc = √(25 + 144) = √169 = 13' },
      ],
      higher: [
        { title: 'Finding a Shorter Side', content: 'Rearrange: a² = c² − b²', formula: 'a = √(c² − b²)', example: 'c=10, b=6:\na = √(100 − 36) = √64 = 8' },
        { title: '3D Pythagoras', content: 'Find the space diagonal: d² = a² + b² + c².', formula: 'd = √(a² + b² + c²)', example: 'Cuboid 3×4×12:\nd = √(9+16+144) = √169 = 13' },
      ],
    },
    generateQuestion: (tier) => {
      const triples = [[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]];
      const t = pick(triples);
      const types = [
        () => makeMCQ(`In a right triangle, sides are ${t[0]} and ${t[1]}. Find the hypotenuse.`, `${t[2]}`, [`${t[0]+t[1]}`, `${t[2]+1}`, '10'], 'a² + b² = c²', `${t[0]}² + ${t[1]}² = ${t[2]}²`),
        () => makeMCQ(`In a right triangle, the hypotenuse is ${t[2]} and one side is ${t[0]}. Find the other side.`, `${t[1]}`, [`${t[2]-t[0]}`, `${t[1]-1}`, '5'], 'c² - a² = b²', `${t[2]}² - ${t[0]}² = ${t[1]}²`)
      ];
      return pick(types)();
    },
  },

  'volume': {
    title: 'Volume',
    emoji: '📦',
    color: '#00ff94',
    category: 'Geometry',
    description: 'Calculate volumes of cuboids, prisms, cylinders, and spheres.',
    lessons: {
      foundation: [
        { title: 'Cuboid', formula: 'V = l × w × h', example: '5 × 3 × 4 = 60 cm³' },
        { title: 'Prism', content: 'Volume = area of cross-section × length.', formula: 'V = A × l', example: 'Triangular prism:\nA = ½ × 6 × 4 = 12\nV = 12 × 10 = 120 cm³' },
      ],
      higher: [
        { title: 'Cylinder', formula: 'V = πr²h', example: 'r=3, h=10: V = π(9)(10) = 282.7 cm³' },
        { title: 'Sphere', formula: 'V = ⁴⁄₃πr³', example: 'r=6: V = ⁴⁄₃ × π × 216 = 904.8 cm³' },
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const l = r(3, 10); const w = r(2, 8); const h = r(2, 7);
        return { display: `Cuboid: ${l} × ${w} × ${h} cm.\nFind the volume.`, answer: l * w * h, hint: 'l × w × h', explanation: `${l} × ${w} × ${h} = ${l * w * h} cm³` };
      } else {
        const types = [
          () => { const ra = r(2, 8); const h = r(5, 15); const v = Math.round(Math.PI * ra * ra * h * 10) / 10; return { display: `Cylinder: r=${ra}, h=${h}.\nVolume? (1 d.p.)`, answer: v, hint: 'πr²h', explanation: `π × ${ra}² × ${h} = ${v} cm³` }; },
          () => { const l = r(3, 10); const w = r(2, 8); const h = r(2, 7); return { display: `Cuboid: ${l} × ${w} × ${h} cm.\nFind the volume.`, answer: l * w * h, hint: 'l × w × h', explanation: `${l} × ${w} × ${h} = ${l * w * h} cm³` }; },
        ];
        return pick(types)();
      }
    },
  },

  'surface-area': {
    title: 'Surface Area',
    emoji: '🎁',
    color: '#00d4ff',
    category: 'Geometry',
    description: 'Calculate surface areas of cuboids and spheres.',
    lessons: {
      foundation: [
        { title: 'Cuboid Surface Area', content: 'Add up the area of all 6 faces (3 pairs of rectangles).', formula: 'SA = 2(lw + lh + wh)', example: '3 × 4 × 5:\nSA = 2(12 + 15 + 20) = 2(47) = 94 cm²' },
      ],
      higher: [
        { title: 'Sphere Surface Area', formula: 'SA = 4πr²', example: 'r = 5:\nSA = 4π(25) = 314.2 cm²' },
        { title: 'Hemisphere', content: 'Curved surface + flat circular base.', formula: 'SA = 3πr²', example: 'r=4: SA = 3π(16) = 150.8 cm²' },
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const l = r(2, 8); const w = r(2, 6); const h = r(2, 5);
        return { display: `Cuboid: ${l} × ${w} × ${h}.\nFind the surface area.`, answer: 2 * (l * w + l * h + w * h), hint: '2(lw + lh + wh)', explanation: `2(${l*w} + ${l*h} + ${w*h}) = 2(${l*w+l*h+w*h}) = ${2*(l*w+l*h+w*h)} cm²` };
      } else {
        const ra = r(2, 8);
        const sa = Math.round(4 * Math.PI * ra * ra * 10) / 10;
        return { display: `Sphere: radius ${ra}.\nSurface area? (1 d.p.)`, answer: sa, hint: '4πr²', explanation: `4π × ${ra}² = 4π × ${ra*ra} = ${sa} cm²` };
      }
    },
  },

  'plans-elevations': {
    title: 'Plans and Elevations',
    emoji: '🏗️',
    color: '#ff6b35',
    category: 'Geometry',
    description: 'Understand views of 3D shapes from different directions.',
    lessons: {
      foundation: [
        { title: 'What Are Plans and Elevations?', content: 'Plan = view from above. Front elevation = view from the front. Side elevation = view from the side.' },
        { title: 'Common Shapes', content: 'Cube: all views are squares. Cylinder: plan is a circle, elevations are rectangles. Cone: plan is a circle, elevation is a triangle.' },
      ],
      higher: [
        { title: 'Drawing from 3D', content: 'Identify which faces you can see from each direction. Hidden edges are shown as dashed lines.' },
      ],
    },
    generateQuestion: (tier) => {
      const shapes = [
        { name: 'cube', plan: 'square', front: 'square', side: 'square' },
        { name: 'cylinder', plan: 'circle', front: 'rectangle', side: 'rectangle' },
        { name: 'cone', plan: 'circle', front: 'triangle', side: 'triangle' },
        { name: 'sphere', plan: 'circle', front: 'circle', side: 'circle' },
        { name: 'triangular prism', plan: 'rectangle', front: 'triangle', side: 'rectangle' },
      ];
      const s = pick(shapes);
      const views = [['plan (from above)', s.plan], ['front elevation', s.front], ['side elevation', s.side]];
      const [viewName, answer] = pick(views);
      return { display: `What shape is the ${viewName} of a ${s.name}?`, answer, answerType: 'text', hint: 'Think about the view direction', explanation: `The ${viewName} of a ${s.name} is a ${answer}`, placeholder: 'e.g. circle' };
    },
    fractionInput: true,
  },

  // ─── RATIO & PROPORTION ───────────────────────────────────

  'percentages': {
    title: 'Percentages',
    emoji: '💯',
    color: '#ff2d78',
    category: 'Number',
    description: 'Percentage increase, decrease, reverse percentages, and compound interest.',
    lessons: {
      foundation: [
        { title: 'Finding a Percentage', formula: '% out of total = (% ÷ 100) × total', example: '15% of 80 = 0.15 × 80 = 12' },
        { title: 'Multiplier Method', content: 'Convert back and forth between percentages and decimals.', example: '15% = 0.15 multiplier\n7% = 0.07 multiplier' },
        { title: 'Increase/Decrease', content: 'Add/subtract the amount or use an adjusted multiplier.', formula: 'Increase 20%: x 1.2\nDecrease 20%: x 0.8', example: '£60 decrease 10%:\n60 × 0.9 = £54' },
        { title: 'Percentage Change', formula: '(Change / Original) × 100', example: 'Bought for £8, sold for £10:\n(2 / 8) × 100 = 25% profit' }
      ],
      higher: [
        { title: 'Reverse Percentages', content: 'Find original amount BEFORE a change happened.', formula: 'Original = Result ÷ Multiplier', example: 'After 20% increase, price is £72.\n72 ÷ 1.2 = £60', tip: 'NEVER just subtract the percentage from the finish value!' },
        { title: 'Compound Interest', content: 'Interest is added each year, and the next year\'s interest is calculated on the NEW total.', formula: 'Final = P × (Multiplier)ⁿ', example: '£1000 at 3% for 5 years:\n1000 × 1.03⁵ = £1159.27' },
        { title: 'Depreciation', content: 'Value decreases by a percentage each year.', example: 'Car £20k loses 15% yearly.\nValue after 3 years: 20000 × 0.85³ = £12,282.50' },
        { title: 'Repeated Changes', content: 'Keep multiplying by each specific change multiplier in sequence.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => { const p = pick([10, 15, 20, 25, 30, 50]); const a = r(4, 20) * 10; return { display: `${p}% of ${a}`, answer: (p / 100) * a, hint: 'Divide % by 100, multiply', explanation: `${p}/100 × ${a} = ${(p / 100) * a}` }; },
          () => { const a = r(5, 20) * 10; const p = pick([10, 20, 25, 50]); return { display: `Increase ${a} by ${p}%`, answer: a * (1 + p / 100), hint: 'Multiply by (1 + %/100)', explanation: `${a} × ${1 + p / 100} = ${a * (1 + p / 100)}` }; },
        ];
        return pick(types)();
      } else {
        const pct = pick([10, 20, 25]); const orig = r(4, 20) * 10; const after = orig * (1 + pct / 100);
        return { display: `After ${pct}% increase, price is £${after}.\nFind the original price.`, answer: orig, hint: 'Divide by multiplier', explanation: `£${after} ÷ ${1 + pct / 100} = £${orig}` };
      }
    },
  },

  'fractions-operations': {
    title: 'Fractions',
    emoji: '🥧',
    color: '#00d4ff',
    category: 'Number',
    description: 'Add, subtract, multiply and divide fractions.',
    lessons: {
      foundation: [
        { title: 'Adding & Subtracting', content: 'Find a Common Denominator before adding or subtracting numerators.', example: '1/3 + 1/4 = 4/12 + 3/12 = 7/12', tip: 'Never add the denominators!' },
        { title: 'Multiplying Fractions', content: 'Multiply across (top-top, bottom-bottom).', formula: 'a/b × c/d = ac/bd', example: '2/3 × 4/5 = 8/15' },
        { title: 'Dividing Fractions', content: 'Keep the first, Change sign to multiply, Flip the second (KCF).', example: '1/2 ÷ 3/4 = 1/2 × 4/3 = 4/6 = 2/3' },
        { title: 'Simplifying', content: 'Divide top and bottom by their HCF.', example: '10/25 = 2/5 (Divide by 5)' }
      ],
      higher: [
        { title: 'Mixed Numbers', content: 'Convert to improper fractions first.', example: '1 ½ = 3/2\n2 ¾ = 11/4', tip: 'Do the arithmetic, then convert back to mixed if requested.' },
        { title: 'Complex Subtraction', content: 'Mixed number subtraction: borrow from the whole number or convert all to improper.', example: '2 ¼ - 1 ¾ = 9/4 - 7/4 = 2/4 = 1/2' },
        { title: 'Algebraic Fractions', content: 'The rules are identical. Find common denominators using algebra.', example: '1/x + 1/2x = 2/2x + 1/2x = 3/2x' },
        { title: 'Recurring Decimals', content: 'Convert recurring decimals to fractions using algebra (see specific topic).' }
      ],
    },
    generateQuestion: (tier) => {
      const d1 = r(2, 6); const d2 = r(2, 6);
      const n1 = r(1, d1 - 1); const n2 = r(1, d2 - 1);
      const common = d1 * d2;
      const numSum = (n1 * d2) + (n2 * d1);
      const commonGcd = gcd(numSum, common);
      
      const types = [
        () => makeMCQ(`${n1}/${d1} + ${n2}/${d2}`, `${numSum/commonGcd}/${common/commonGcd}`, [`${n1+n2}/${d1+d2}`, `${numSum}/${common + 1}`, '1/2'], 'Find a common denominator first.', `${numSum/commonGcd}/${common/commonGcd}`),
        () => {
           const multNum = n1 * n2; const multDen = d1 * d2;
           const multGcd = gcd(multNum, multDen);
           return makeMCQ(`${n1}/${d1} × ${n2}/${d2}`, `${multNum/multGcd}/${multDen/multGcd}`, [`${n1+n2}/${d1+d2}`, '1/10', '0'], 'Multiply top with top, bottom with bottom.', `${multNum/multGcd}/${multDen/multGcd}`);
        }
      ];
      return pick(types)();
    },
    fractionInput: true,
    inputHint: 'Type fractions as a/b (e.g. 7/12). Always simplify your answer.',
  },

  'recurring-decimals': {
    title: 'Recurring Decimals to Fractions',
    emoji: '🔁',
    color: '#b14aed',
    category: 'Number',
    description: 'Convert recurring decimals into fractions using algebra.',
    lessons: {
      foundation: [
        { title: 'Common Recurring Decimals', content: 'Learn these standard conversions.', example: '0.333... = 1/3\n0.666... = 2/3\n0.111... = 1/9\n0.1666... = 1/6' },
      ],
      higher: [
        { title: 'Algebraic Method', content: 'Let x = the decimal. Multiply by 10 (or 100) to shift the recurring part. Subtract to eliminate it.', example: 'x = 0.272727...\n100x = 27.2727...\n100x − x = 27\n99x = 27\nx = 27/99 = 3/11' },
        { title: 'Single Recurring Digit', content: 'For 0.aaa... where one digit repeats, the fraction is a/9.', formula: '0.ṙ = r/9', example: '0.444... = 4/9\n0.777... = 7/9' },
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const pairs = [['0.333...', '1/3'], ['0.666...', '2/3'], ['0.111...', '1/9'], ['0.1666...', '1/6'], ['0.25', '1/4'], ['0.125', '1/8']];
        const [dec, frac] = pick(pairs);
        return { display: `Convert ${dec} to a fraction`, answer: frac, answerType: 'fraction', hint: 'Standard conversion', explanation: `${dec} = ${frac}`, placeholder: 'e.g. 1/3' };
      } else {
        const d = r(1, 9);
        return { display: `Convert 0.${d}${d}${d}... to a fraction`, answer: `${d}/9`, answerType: 'fraction', hint: 'Single repeating digit = ?/9', explanation: `0.${d}${d}${d}... = ${d}/9`, placeholder: 'e.g. 4/9' };
      }
    },
    fractionInput: true,
    inputHint: 'Type fractions as a/b (e.g. 1/3)',
  },

  'converting-fdp': {
    title: 'Converting FDP',
    emoji: '🔄',
    color: '#ffe600',
    category: 'Number',
    description: 'Convert between fractions, decimals, and percentages.',
    lessons: {
      foundation: [
        { title: 'Fraction → Decimal', content: 'Divide numerator by denominator.', formula: 'a/b = a ÷ b', example: '3/4 = 3 ÷ 4 = 0.75' },
        { title: 'Decimal → Percentage', formula: 'decimal × 100', example: '0.35 × 100 = 35%' },
        { title: 'Percentage → Fraction', content: 'Put over 100 and simplify.', example: '45% = 45/100 = 9/20' },
      ],
      higher: [
        { title: 'Complex Conversions', example: '3/8 = 0.375 = 37.5%\n7/20 = 0.35 = 35%' },
      ],
    },
    generateQuestion: (tier) => {
      const types = [
        () => { const n = r(1, 9); const d = pick([2, 4, 5, 8, 10, 20]); const g = gcd(n, d); const sn = n / g; const sd = d / g; if (sn >= sd) return { display: `Convert 50% to a decimal`, answer: 0.5, hint: 'Divide by 100', explanation: '50 ÷ 100 = 0.5' }; return { display: `Convert ${sn}/${sd} to a decimal`, answer: Math.round((sn / sd) * 1000) / 1000, hint: 'Divide top by bottom', explanation: `${sn} ÷ ${sd} = ${Math.round((sn / sd) * 1000) / 1000}` }; },
        () => { const p = pick([10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 75, 80]); return { display: `Convert ${p}% to a decimal`, answer: p / 100, hint: 'Divide by 100', explanation: `${p} ÷ 100 = ${p / 100}` }; },
      ];
      return pick(types)();
    },
  },

  // ─── STATISTICS ────────────────────────────────────────────

  'frequency-polygons': {
    title: 'Frequency Polygons',
    emoji: '📊',
    color: '#00d4ff',
    category: 'Statistics',
    description: 'Read and interpret frequency tables and calculate averages from grouped data.',
    lessons: {
      foundation: [
        { title: 'Reading Frequency Tables', content: 'A frequency table shows how often each value or range occurs. Total frequency = total number of data items.' },
        { title: 'Midpoint', content: 'For grouped data, use the midpoint of each class to estimate the mean.', formula: 'Midpoint = (lower + upper) / 2', example: 'Class 10-20: midpoint = 15' },
      ],
      higher: [
        { title: 'Estimated Mean from Grouped Data', content: 'Multiply each midpoint by its frequency, sum these, then divide by total frequency.', formula: 'Mean ≈ Σ(fx) / Σf', example: 'Scores 0-10 (f=3), 10-20 (f=7):\nΣfx = 5×3 + 15×7 = 120\nMean = 120/10 = 12' },
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const freqs = [r(2, 8), r(3, 10), r(1, 7), r(2, 9)];
        const total = freqs.reduce((s, v) => s + v, 0);
        return { display: `Frequencies: ${freqs.join(', ')}\nFind the total frequency.`, answer: total, hint: 'Add all frequencies', explanation: `${freqs.join(' + ')} = ${total}` };
      } else {
        const f1 = r(3, 8); const f2 = r(4, 10); const f3 = r(2, 7);
        const sum = 5 * f1 + 15 * f2 + 25 * f3;
        const total = f1 + f2 + f3;
        const mean = Math.round((sum / total) * 10) / 10;
        return { display: `Groups: 0-10(f=${f1}), 10-20(f=${f2}), 20-30(f=${f3})\nEstimate the mean (1 d.p.)`, answer: mean, hint: 'Σ(midpoint × f) ÷ Σf', explanation: `(5×${f1} + 15×${f2} + 25×${f3}) ÷ ${total}\n= ${sum} ÷ ${total} = ${mean}` };
      }
    },
  },

  'parallel-perpendicular-lines': {
    title: 'Parallel & Perpendicular Lines',
    emoji: '➕',
    color: '#00ff94',
    category: 'Algebra',
    description: 'Identify parallel and perpendicular lines from their equations.',
    lessons: {
      foundation: [
        { title: 'Parallel Lines', content: 'Parallel lines have the same gradient.', example: 'y = 3x + 1 and y = 3x − 5 are parallel (both m = 3)' },
      ],
      higher: [
        { title: 'Perpendicular Lines', content: 'Perpendicular gradients multiply to −1.', formula: 'm₁ × m₂ = −1', example: 'y = 2x + 1 → perpendicular m = −1/2' },
        { title: 'Finding Equations', content: 'Use y − y₁ = m(x − x₁) with the perpendicular gradient and a given point.', example: 'Perpendicular to y = 3x, through (6, 1):\nm = −1/3\ny − 1 = −1/3(x − 6)\ny = −x/3 + 3' },
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const m = r(1, 6); const c1 = r(-5, 5); const c2 = r(-5, 5);
        return { display: `Are y = ${m}x + ${c1} and y = ${m}x + ${c2} parallel?`, answer: 1, hint: '1=Yes, 2=No — compare gradients', explanation: `Both have gradient ${m}, so YES — they are parallel.` };
      } else {
        const m = r(2, 6);
        return { display: `Line: y = ${m}x + 3\nWhat is the gradient of a perpendicular line?`, answer: `-1/${m}`, answerType: 'fraction', hint: 'm₁ × m₂ = −1', explanation: `Perpendicular gradient = −1/${m}`, placeholder: 'e.g. -1/3' };
      }
    },
    fractionInput: true,
  },


  // ==============================================================
  // CALCULATOR TOPICS (Added dynamically based on Calculator prompts)
  // ==============================================================

  'angle-bisectors': {
    title: 'Angle Bisectors',
    emoji: '📐',
    category: 'Geometry',
    description: 'Using compasses to bisect angles and lines.',
    lessons: {
      foundation: [{ title: 'Bisecting an Angle', visualId: 'math-polygons', content: 'Place compass on the vertex. Draw an arc crossing both lines. From these two points, draw two more arcs inside the angle. Draw a line from the vertex through where the arcs cross.' }],
      higher: [{ title: 'Loci', content: 'The angle bisector is the locus of points equidistant from two intersecting lines.' }]
    },
    generateQuestion: () => makeMCQ('What tool is essential for an accurate angle bisector?', 'Compass', ['Protractor only', 'Ruler only', 'Set square'], 'Used to draw arcs', 'A compass is required to draw the intersecting arcs accurately.')
  },

  'area-money-problems': {
    title: 'Area & Money Problems',
    emoji: '💷',
    category: 'Geometry',
    description: 'Calculating costs based on area (e.g. flooring or painting).',
    lessons: {
      foundation: [{ title: 'Cost per Square Metre', content: 'First calculate the total area in m². Then multiply by the cost per m².' }],
      higher: [{ title: 'Complex Costing', content: 'Sometimes you must buy items in fixed batches (e.g. tins of paint covering 5m²). Deal with remainders by rounding up to the next whole tin!' }]
    },
    generateQuestion: () => {
      const w = r(4, 8); const h = r(3, 5); const c = r(12, 20);
      return { display: `A room is ${w}m by ${h}m.\nCarpet costs £${c} per m².\nTotal cost?`, answer: w * h * c, answerType: 'number' };
    }
  },

  'area-2d-shapes-calc': {
    title: 'Area of 2D Shapes (Calc)',
    emoji: '🟢',
    category: 'Geometry',
    description: 'Using formulas for trapezium, circles, etc. with a calculator.',
    lessons: {
      foundation: [{ title: 'Trapezium Area', content: 'Area = 1/2 × (a + b) × h' }],
      higher: [{ title: 'Circle Area', content: 'Area = π × r² (Use the π button on your calculator for precision).' }]
    },
    generateQuestion: () => {
      const a = r(4, 10); const b = r(6, 14); const h = r(5, 12);
      return { display: `Trapezium parallel sides: ${a}cm, ${b}cm.\nHeight: ${h}cm.\nArea?`, answer: 0.5 * (a + b) * h, answerType: 'number' };
    }
  },
  'estimated-mean-calc': {
    title: 'Estimated Mean (Calc)',
    emoji: '🧮',
    category: 'Statistics',
    description: 'Calculate an estimate of the mean from grouped data using midpoints.',
    lessons: {
      foundation: [{ title: 'Midpoints', content: 'Use the middle value of each class.' }],
      higher: [{ title: 'Σfx / Σf', content: 'Multiply midpoints by frequencies and sum them.' }]
    },
    generateQuestion: () => {
       const freqs = [r(2, 6), r(3, 10), r(1, 5)];
       const midpoints = [5, 15, 25];
       const totalF = freqs.reduce((a,b) => a+b, 0);
       const sumFX = freqs.reduce((total, f, i) => total + (f * midpoints[i]), 0);
       const mean = (sumFX / totalF).toFixed(1);
       return { 
         display: `Estimated Mean Calculation:\nSums: (5×${freqs[0]}) + (15×${freqs[1]}) + (25×${freqs[2]})\nTotal Frequency: ${totalF}\nWhat is the estimated mean?`, 
         answer: mean, 
         answerType: 'number',
         hint: 'Σ(fx) / Σf',
         explanation: `Total fx = ${sumFX}. Total frequency = ${totalF}. Mean = ${sumFX}/${totalF} = ${mean}`
       };
    }
  },

  'bounds': {
    title: 'Bounds (Upper & Lower)',
    emoji: '📏',
    category: 'Number',
    description: 'Upper and lower bounds of rounded measurements.',
    lessons: {
      foundation: [{ title: 'Error Intervals', content: 'If rounded to the nearest 10, the error is ±5. If 40 (nearest 10), lower bound is 35, upper bound is 45.' }],
      higher: [{ title: 'Calculating with Bounds', content: 'To find the MAXIMUM possible result of division: Upper Bound ÷ Lower Bound.' }]
    },
    generateQuestion: (t) => {
      if (t === 'foundation') return { display: 'A length is 15cm to the nearest cm.\nWhat is the lower bound?', answer: 14.5, answerType: 'number' };
      return { display: 'd = f / g.\nMax value configuration?', answerType: 'text', options: ['f(UB) / g(LB)', 'f(LB) / g(UB)', 'f(UB) / g(UB)', 'f(LB) / g(LB)'] };
    }
  },

  'changing-subject': {
    title: 'Changing the Subject',
    emoji: '🔄',
    category: 'Algebra',
    description: 'Rearranging formulas to make a different variable the subject.',
    lessons: {
      foundation: [{ title: 'Rearranging Basic Equations', content: 'Do the inverse operation to move terms across the equals sign. E.g. v = u + at ➔ at = v - u' }],
      higher: [{ title: 'Subject Appears Twice', content: 'If the target variable appears twice, move all terms containing it to one side, FACTORISE it out, then divide.' }]
    },
    generateQuestion: () => makeMCQ('Make x the subject: y = mx + c', 'x = (y - c) / m', ['x = y - mc', 'x = (y + c) / m', 'x = m / (y - c)'], 'Subtract c first', 'Subtract c: y - c = mx. Then divide by m.')
  },

  'distance-time-graphs': {
    title: 'Distance-Time Graphs',
    emoji: '📈',
    category: 'Algebra',
    description: 'Interpreting speed and gradients from graphs.',
    lessons: {
      foundation: [{ title: 'Gradients', content: 'The steepness of the line represents the Speed. A flat horizontal line means the object is stationary (not moving).' }],
      higher: [{ title: 'Average Speed', content: 'Average Speed = Total Distance ÷ Total Time. E.g. 100km total over 2 hours = 50km/h.' }]
    },
    generateQuestion: () => makeMCQ('In a distance-time graph, what does a flat, horizontal line mean?', 'Stationary (stopped)', ['Constant speed', 'Accelerating', 'Returning to start'], 'Distance isn\'t changing', 'Since distance is not changing over time, speed is zero.')
  },

  'expanding-factorising-calc': {
    title: 'Expanding & Factorising (Calc)',
    emoji: '🧮',
    category: 'Algebra',
    description: 'Expanding double brackets and extracting common factors.',
    lessons: {
      foundation: [{ title: 'Single Brackets', content: 'Multiply the outside term by EVERYTHING inside. 3x(x - 4) = 3x² - 12x.' }],
      higher: [{ title: 'Double Brackets (FOIL)', content: 'First, Outer, Inner, Last. (x+2)(x+3) = x² + 3x + 2x + 6 = x² + 5x + 6.' }]
    },
    generateQuestion: () => makeMCQ('Expand and simplify: (x - 3)(x + 4)', 'x² + x - 12', ['x² - 12', 'x² - x - 12', 'x² + 7x - 12'], 'Combine x terms', 'x² + 4x - 3x - 12 = x² + x - 12')
  },

  'factorising-quadratics': {
    title: 'Factorising Quadratics',
    emoji: '✖️',
    category: 'Algebra',
    description: 'Factorising expressions of the form ax² + bx + c.',
    lessons: {
      foundation: [{ title: 'Sum and Product', content: 'For x² + bx + c: Find two numbers that Multiply to give c, and Add to give b.' }],
      higher: [{ title: 'Difference of Two Squares', content: 'x² - y² = (x + y)(x - y). Example: x² - 25 = (x + 5)(x - 5).' }]
    },
    generateQuestion: () => makeMCQ('Factorise completely: x² - 9', '(x - 3)(x + 3)', ['(x - 9)(x + 1)', '(x - 3)²', 'x(x - 9)'], 'Difference of two squares', '9 is 3 squared. (x-3)(x+3).')
  },

  'fractions-calc': {
    title: 'Fractions (Calculator)',
    emoji: '➗',
    category: 'Number',
    description: 'Advanced fraction manipulation with mixed numbers on a calc.',
    lessons: {
      foundation: [{ title: 'Using calc fractions', content: 'Use the `[ab/c]` or fraction button to input mixed numbers quickly to prevent BODMAS errors.' }],
      higher: [{ title: 'Complex Fraction problems', content: 'You can use the calculator to rapidly find equivalent portions when solving density/mass/volume layered fraction queries.' }]
    },
    generateQuestion: () => makeMCQ('Which button converts a decimal to a fraction on most scientific calculators?', 'S⇔D', ['MODE', 'SHIFT', 'ENG'], 'Standard to Decimal', 'The S⇔D button toggles between fraction and decimal representations.')
  },

  'hcf-lcm': {
    title: 'HCF and LCM',
    emoji: '🔢',
    category: 'Number',
    description: 'Highest Common Factor & Lowest Common Multiple using Venn diagrams or lists.',
    lessons: {
      foundation: [{ title: 'LCM', content: 'Lowest Common Multiple: the smallest number in both times tables. LCM of 4 & 6 = 12.' }],
      higher: [{ title: 'Prime Factor Trees', visualId: 'math-venn', content: 'Find HCF by multiplying overlapping prime factors in a Venn diagram. Find LCM by multiplying all numbers in the diagram.' }]
    },
    generateQuestion: () => {
      const a = pick([4, 6, 8]); const b = pick([10, 12, 14]);
      // Calculate LCM
      const gcd = (x, y) => (!y ? x : gcd(y, x % y));
      const lcm = (a * b) / gcd(a, b);
      return { display: `Find the Lowest Common Multiple (LCM) of ${a} and ${b}`, answer: lcm, answerType: 'number' };
    }
  },

  'histograms': {
    title: 'Histograms',
    emoji: '📊',
    category: 'Statistics',
    description: 'Frequency density and unequal class widths.',
    lessons: {
      foundation: [{ title: 'Bar Charts vs Histograms', content: 'Bar charts have equal gaps and widths. Histograms have NO gaps and often have unequal class widths.' }],
      higher: [{ title: 'Frequency Density', content: 'Frequency Density = Frequency ÷ Class Width. Area of the bar equals the frequency!' }]
    },
    generateQuestion: () => makeMCQ('In a histogram, what does the AREA of the bar represent?', 'Frequency', ['Frequency Density', 'Class Width', 'Cumulative Frequency'], 'Area = width × height', 'The area of the bar always represents the frequency.')
  },

  'iteration': {
    title: 'Iteration',
    emoji: '🔁',
    category: 'Algebra',
    description: 'Using iterative formulas to approximate roots of equations.',
    lessons: {
      foundation: [{ title: 'What is iteration?', content: 'Repeating a process using the previous answer. We use x₁ to find x₂, then x₂ to find x₃.' }],
      higher: [{ title: 'Calculator Trick', content: 'Type your starting value (e.g. 5) and press =. Then type the formula using the `ANS` button. Keep pressing = to find successive iterations!' }]
    },
    generateQuestion: () => makeMCQ('Which calculator button is most helpful when doing repeated iterations?', 'ANS', ['MODE', 'M+', 'SHIFT'], 'Uses previous output', 'The ANS button automatically plugs the last output into the next cycle.')
  },

  'laws-of-indices-calc': {
    title: 'Laws of Indices (Calc)',
    emoji: 'ⁿ',
    category: 'Number',
    description: 'Using fractional and negative powers with a scientific calculator.',
    lessons: {
      foundation: [{ title: 'Negative Indices', content: 'A negative power means "1 over". E.g., x⁻² = 1/x².' }],
      higher: [{ title: 'Fractional Indices', content: 'x^(1/2) means the square root of x. x^(1/3) means the cube root.' }]
    },
    generateQuestion: () => makeMCQ('What is 25 to the power of 1/2?', '5', ['12.5', '50', '625'], '1/2 power = square root', 'The 1/2 power is exactly the same as taking the square root.')
  },

  'metric-conversions': {
    title: 'Metric Conversions',
    emoji: '⚖️',
    category: 'Number',
    description: 'Converting distance, mass, and complex units like m² to cm².',
    lessons: {
      foundation: [{ title: 'Basic Units', content: '1km = 1000m. 1m = 100cm. 1kg = 1000g. 1 litre = 1000ml.' }],
      higher: [{ title: 'Area and Volume Units', content: '1m² = 10,000cm² (because 100 × 100). 1m³ = 1,000,000cm³ (100 × 100 × 100).' }]
    },
    generateQuestion: (t) => {
      if (t === 'foundation') {
        const km = r(2, 9);
        return { display: `Convert ${km} km into metres`, answer: km * 1000, answerType: 'number' };
      }
      return { display: 'Convert 3 m² into cm².', answer: 30000, answerType: 'number' };
    }
  },
  'compound-interest-calc': {
    title: 'Compound Interest',
    emoji: '📈',
    color: '#00ff94',
    category: 'Number',
    description: 'Using multipliers to calculate compound interest and exponential growth.',
    hubPath: '/gcse/maths',
    backLabel: 'Back to Maths',
    lessons: {
      foundation: [
        { title: 'Multipliers', content: 'Transform a percentage increase into a decimal multiplier.', example: 'Increase by 5% → 100% + 5% = 105% → × 1.05.\nDecrease by 10% → 100% - 10% = 90% → × 0.9' },
        { title: 'Step-by-Step Method', content: 'For a 2-year increase, multiply the principal by the multiplier, then multiply the result by the multiplier again.', tip: 'Good for checking your answer manually!' },
        { title: 'Simple vs Compound', content: 'Simple interest only pays on the original amount. Compound interest pays on the NEW total every year.', tip: 'Compound interest grows much faster!' },
        { title: 'Reverse Percentages', content: 'To find the original value AFTER a change, divide by the multiplier.', example: 'Sale price £90 (10% off) → 90 ÷ 0.9 = £100 original.' }
      ],
      higher: [
        { title: 'The Power Formula', content: 'Calculate compound interest for many years in one step.', formula: 'Total = P × (multiplier)ⁿ', example: '£1000 for 5 years at 3%:\n1000 × 1.03⁵ = £1159.27' },
        { title: 'Exponential Decay', content: 'Use a multiplier less than 1 to model things losing value over time (depreciation).', example: 'Car losing 20% value per year for 3 years: P × 0.8³' },
        { title: 'Financial Interest Problems', content: 'Interest is often calculated monthly or quarterly. The period (n) must match the interest rate frequency.', tip: 'N is the total number of times the interest is applied.' },
        { title: 'Comparing Deals', content: 'Work out the final amount for two different interest options to see which is the better deal over a set number of years.' }
      ],
    },
    generateQuestion: () => {
       const principal = r(1, 10) * 100;
       const rate = r(1, 6);
       const multiplier = (1 + rate / 100).toFixed(2);
       return makeMCQ(`To increase £${principal} by ${rate}% per year, what multiplier is used?`, `${multiplier}`, [`${rate}`, `${(rate/100).toFixed(2)}`, `${(1 - rate/100).toFixed(2)}`], 'Add the rate to 100% and convert to decimal.', `${multiplier}`);
    }
  },

  'pie-charts-calc': {
    title: 'Pie Charts (Calc)',
    emoji: '🍕',
    category: 'Statistics',
    description: 'Calculate angles for pie chart slices using a multiplier.',
    lessons: {
      foundation: [{ title: 'Multiplier', content: '360 ÷ Total Frequency.' }],
      higher: [{ title: 'Angles', content: 'Frequency × Multiplier.' }]
    },
    generateQuestion: () => {
       const total = pick([36, 72, 120, 180, 240]);
       const freq = pick([5, 10, 15, 20]);
       const angle = (360 / total) * freq;
       return { 
         display: `Total data frequency = ${total}.\nA category has frequency ${freq}.\nHow many degrees (°) is the slice?`, 
         answer: angle, 
         answerType: 'number',
         hint: '(360 / Total) × Frequency',
         explanation: `Multiplier = 360 / ${total} = ${360/total} per unit.\nAngle = ${360/total} × ${freq} = ${angle}°`
       };
    }
  },

  'rounding': {
    title: 'Rounding & Sig Figs',
    emoji: '🎯',
    color: '#ff2d78',
    category: 'Number',
    description: 'Rounding to decimal places and significant figures.',
    hubPath: '/gcse/maths',
    backLabel: 'Back to Maths',
    lessons: {
      foundation: [
        { title: 'Decimal Places (d.p.)', content: 'Count the digits AFTER the decimal point. Look at the next digit to decide whether to round up.', example: '3.1415 to 2 d.p. → 3.14 (the next digit 1 is less than 5).' },
        { title: 'Rounding Up', content: 'If the next digit is 5, 6, 7, 8, or 9, add 1 to your target digit.', example: '7.86 to 1 d.p. → 7.9' },
        { title: 'Nearest Unit', content: 'Rounding to the nearest whole number, ten, hundred, etc.', example: '382 to nearest 10 → 380\n382 to nearest 100 → 400' },
        { title: 'Large Numbers', content: 'When rounding to nearest 10/100, replace the dropped digits with zeros to keep the size correct!', tip: '382 rounded to nearest 100 is NOT 4!' }
      ],
      higher: [
        { title: 'Significant Figures (s.f.)', content: 'The first significant figure is the first NON-ZERO digit from the left. Zeros at the start don\'t count!', example: '0.00456 to 2 s.f. → 0.0046' },
        { title: 'Zero as Significant', content: 'Once you start counting s.f., all zeros AFTER that are significant.', example: '5.03 is 3 s.f. Zeros in the middle or at the end count if they follow a non-zero digit.' },
        { title: 'Scientific Notation Link', content: 'Significant figures are related to Standard Form. 3.4 × 10⁵ is 2 s.f.', tip: 'Exam papers usually expect answers to 2 or 3 s.f. unless stated otherwise.' },
        { title: 'Estimation Consistency', content: 'Always round to 1 s.f. when estimating a calculation result.', tip: 'Consistency in rounding prevents compounding errors.' }
      ],
    },
    generateQuestion: () => makeMCQ('Round 0.0456 to 2 significant figures', '0.046', ['0.05', '0.04', '0.045'], 'Find the first non-zero', 'The 4 is the 1st s.f., the 5 is the 2nd. The 6 rounds the 5 up to 6 ➔ 0.046.')
  },

  'scatter-graphs': {
    title: 'Scatter Graphs',
    emoji: '📈',
    color: '#ffe600',
    category: 'Statistics',
    description: 'Lines of best fit and correlation.',
    hubPath: '/gcse/maths',
    backLabel: 'Back to Maths',
    lessons: {
      foundation: [
        { title: 'Correlation', content: 'Positive correlation goes up. Negative goes down. No correlation has no pattern.', tip: 'The closer the points are to a straight line, the stronger the correlation.' },
        { title: 'Line of Best Fit', content: 'A straight line drawn through the middle of the plots, with roughly equal numbers of points on both sides.', tip: 'Always use a ruler!' },
        { title: 'Outliers', content: 'Points that don\'t fit the general trend. They should be ignored when drawing the line of best fit.' },
        { title: 'Reading from the Line', content: 'Use your line of best fit to estimate one value given another (Interpolation).' }
      ],
      higher: [
        { title: 'Interpolation vs Extrapolation', content: 'Interpolation (estimating inside your data range) is reliable. Extrapolation (going beyond the range) is risky and often unreliable.', tip: 'Reasons for unreliability: trends might change or have physical limits.' },
        { title: 'Causation vs Correlation', content: 'Just because two things are correlated doesn\'t mean one CAUSES the other.', example: 'Ice cream sales and shark attacks are correlated, but both are caused by hot weather!' },
        { title: 'Equation of Best Fit', content: 'Sometimes you might be asked to find the equation (y = mx + c) of your trend line.' }
      ]
    },
    generateQuestion: () => makeMCQ('Why is it risky to estimate a value far outside the range of the scatter graph data?', 'Extrapolation is unreliable', ['The line bends', 'It causes negative correlation', 'The calculator will break'], 'Going beyond the bounds', 'This is called extrapolation. The established trend might not continue beyond the collected data.')
  },

  'sectors': {
    title: 'Area & Arc of Sectors',
    emoji: '🍰',
    color: '#00d4ff',
    category: 'Geometry',
    description: 'Calculating arc lengths and sector areas of circles.',
    hubPath: '/gcse/maths',
    backLabel: 'Back to Maths',
    lessons: {
      foundation: [
        { title: 'Fractions of a Circle', content: 'If the angle is 90°, it is 90/360 or 1/4 of the circle. Calculate the full circle area, then multiply by the fraction.', example: 'Full area 40, angle 90° → Sector area = 10.' },
        { title: 'Semicircles & Quadrants', content: 'A semicircle is half a circle (180°). A quadrant is a quarter (90°).', tip: 'These are the most common sectors in foundation exams!' },
        { title: 'Perimeter of a Sector', content: 'The total boundary: arc length + TWO radii. Don\'t forget the straight edges!', example: 'Arc 10cm, Radius 5cm → Perimeter = 20cm.' }
      ],
      higher: [
        { title: 'Arc Length Formula', formula: 'L = (θ / 360) × π × d', tip: 'Use d = 2r.' },
        { title: 'Sector Area Formula', formula: 'A = (θ / 360) × π × r²', example: 'r=6, θ=60°: (60/360) × 36π = 6π ≈ 18.8 cm²' },
        { title: 'Segments (Tricky!)', content: 'Area of segment = Area of sector − Area of triangle.', tip: 'Often requires trigonometry (1/2 ab sin C) to find the triangle area.' },
        { title: 'Working Backwards', content: 'Given the sector area and radius, find the angle by rearranging the formula.', example: 'θ = (Area × 360) / (πr²)' }
      ],
    },
    generateQuestion: () => makeMCQ('What is the formula for the AREA of a sector?', '(Angle/360) × πr²', ['(Angle/360) × πd', 'πr² ÷ Angle', 'πd ÷ 360'], 'Fraction of circle area', 'It is the fraction of the full circle (Angle/360) multiplied by the circle area formula (πr²).')
  },

  'standard-form-calc': {
    title: 'Standard Form (Calc)',
    emoji: '🔟',
    category: 'Number',
    description: 'Calculating large numbers using the x10^x button on calcs.',
    lessons: {
      foundation: [{ title: 'Writing Standard Form', visualId: 'math-standard-form', content: 'A number between 1 and 10, multiplied by a power of 10. E.g. 4500 = 4.5 × 10³.' }],
      higher: [{ title: 'Calculator Buttons', content: 'Use the [EXP] or [×10^x] button on your calculator, NOT the regular multiply button, when doing standard form calculations.' }]
    },
    generateQuestion: () => makeMCQ('Which value is correct Standard Form?', '3.4 × 10⁵', ['34 × 10⁴', '0.34 × 10⁶', '3.4³'], 'Front number must be 1 ≤ x < 10', 'The number in front must be between 1 and 9.99.')
  },

  'substitution-calc': {
    title: 'Substitution (Calc)',
    emoji: '🔍',
    category: 'Algebra',
    description: 'Substituting decimals and negatives into complex equations.',
    lessons: {
      foundation: [{ title: 'Using Brackets', content: 'When substituting negative numbers into a calculator, ALWAYS put them in brackets. E.g. (-3)².' }],
      higher: [{ title: 'Kinematics Equations', content: 'Substituting values into v² = u² + 2as. Remember to square root at the very end to find v!' }]
    },
    generateQuestion: () => makeMCQ('Why should you use brackets when squaring a negative number on a calculator?', 'To prevent getting a negative result', ['It looks neater', 'The calculator will freeze', 'It ignores BODMAS'], '-3² vs (-3)²', 'Without brackets, the calc does -(3²)=-9. With brackets, (-3)²=9.')
  },

  'surds': {
    title: 'Surds',
    emoji: '√',
    color: '#ff6b35',
    category: 'Number',
    description: 'Simplifying surds and rationalising denominators.',
    hubPath: '/gcse/maths',
    backLabel: 'Back to Maths',
    lessons: {
      foundation: [
        { title: 'What is a Surd?', content: 'A root that cannot be written as a whole number or simple fraction. e.g. √2.', tip: '√9 is NOT a surd because it equals 3 (it is a rational number).' },
        { title: 'Multiplying Surds', formula: '√a × √b = √ab', example: '√2 × √3 = √6' },
        { title: 'Dividing Surds', formula: '√a ÷ √b = √(a / b)', example: '√10 ÷ √2 = √5' },
        { title: 'Squares and Roots', content: 'Squaring a square root cancels it out!', example: '(√7)² = 7' }
      ],
      higher: [
        { title: 'Simplifying Surds', content: 'Find a square factor (4, 9, 16, 25...) and take its root out.', example: '√75 = √(25 × 3) = √25 × √3 = 5√3' },
        { title: 'Adding/Subtracting', content: 'You can only combine "like" surds. 5√2 + 3√2 = 8√2.', tip: 'Always simplify before adding/subtracting!' },
        { title: 'Rationalising Denominators', content: 'Multiply top and bottom by the root to remove it from the bottom.', example: '1 / √2 = (1 × √2) / (√2 × √2) = √2 / 2' },
        { title: 'Expanding Surd Brackets', content: 'Use FOIL just like algebra.', example: '(2 + √3)(2 - √3) = 4 - 2√3 + 2√3 - 3 = 1' }
      ],
    },
    generateQuestion: () => makeMCQ('Simplify: √12', '2√3', ['3√2', '4√3', '6'], 'Look for a square factor', '√12 = √(4 × 3) = √4 × √3 = 2√3.')
  },

  'surface-area-cones': {
    title: 'Surface Area of Cones/Spheres',
    emoji: '🍦',
    category: 'Geometry',
    description: 'Using complex surface area formulas (often given in exams).',
    lessons: {
      foundation: [{ title: 'Using the Formula Sheet', content: 'Many advanced shape formulas are provided. Your job is to carefully substitute the radius and height into them.' }],
      higher: [{ title: 'Formulas', content: 'Curved SA of Cone = πrl (where l is slant height).\nSA of Sphere = 4πr².' }]
    },
    generateQuestion: () => makeMCQ('In the cone formula A = πrl, what does "l" stand for?', 'Slant height', ['Vertical length', 'Lateral force', 'Locus'], 'The slanted edge', 'The "l" stands for the slanted height down the side of the cone.')
  },

  'two-way-tables': {
    title: 'Two-Way Tables',
    emoji: '🧮',
    color: '#ff2d78',
    category: 'Statistics',
    description: 'Extracting and filling probability tables linking two variables.',
    hubPath: '/gcse/maths',
    backLabel: 'Back to Maths',
    lessons: {
      foundation: [
        { title: 'The Layout', content: 'A grid that compares two categories (e.g. Boys/Girls vs Bus/Walk/Car).' },
        { title: 'Totals Check', content: 'The totals of the rows must add up perfectly to the grand total, and the totals of the columns must do exactly the same.', tip: 'Always start with the rows/columns where only one box is missing.' },
        { title: 'Finding Probabilities', content: 'Probability = (Cell Value) / (Grand Total).', example: '10 boys walk out of 50 total students → 10/50 = 1/5.' }
      ],
      higher: [
        { title: 'Conditional Probability', content: 'Watch out for questions saying "Given that...". This means you only look at one specific row or column, not the grand total!', tip: 'The denominator changes!' },
        { title: 'Combined Categories', content: 'You may need to add multiple cells together before dividing by the total.' },
        { title: 'Setting Up from Words', content: 'Read the story carefully and fill in the known values. Usually, you have to find several "hidden" values to solve the final part.' }
      ],
    },
    generateQuestion: () => {
      const a = r(10, 20); const b = r(5, 15);
      return { display: `Row total is 40.\nOne cell is ${a}, the second is ${b}.\nWhat is the third cell?`, answer: 40 - a - b, answerType: 'number' };
    }
  },

  'simultaneous-equations': {
    title: 'Simultaneous Equations',
    emoji: '🔗',
    color: '#00ff94',
    category: 'Algebra',
    description: 'Find the values of x and y that satisfy two equations at once.',
    hubPath: '/gcse/maths',
    backLabel: 'Back to Maths',
    lessons: {
      foundation: [
        { title: 'Method of Elimination', content: 'Add or subtract the equations to get rid of one variable.', example: 'Eq1: x+y=10, Eq2: x-y=2\nAdd them: 2x = 12 → x = 6. Then 6+y=10 → y=4.' },
        { title: 'Scaling Equations', content: 'If the coefficients don\'t match, multiply one or both equations by a number so they do.', example: '3x + y = 11, x + 2y = 7\nMultiply Eq1 by 2: 6x + 2y = 22. Now subtract Eq2!' },
        { title: 'Same Sign Subtract (SSS)', content: 'If the matching coefficients have the same sign (e.g. both +2y), SUBTRACT the equations. If signs are different, ADD.', tip: 'SSS = Same Sign Subtract.' }
      ],
      higher: [
        { title: 'Substitution Method', content: 'Rearrange one equation to make x or y the subject, then substitute it into the other.', tip: 'Best used when one x or y is already "on its own".' },
        { title: 'Quadratic & Linear', content: 'One equation is a straight line, one is a circle or curve. Always use substitution.', example: 'y = x² and y = x+2\nx² = x + 2 → x² - x - 2 = 0' },
        { title: 'Graphical Solution', content: 'The solutions are the coordinates (x, y) where the two lines INTERSECT.' },
        { title: 'Word Problems', content: 'Set up two equations from a scenario (e.g. 2 adults and 3 children cost £25) and solve to find individual prices.' }
      ],
    },
    generateQuestion: () => {
      const x = r(2, 6); const y = r(1, 4);
      const a = r(1, 3); const b = 1; const c1 = a * x + b * y;
      const d = 1; const e = -1; const c2 = d * x + e * y;
      return { 
        display: `Solve:\n${a}x + y = ${c1}\nx - y = ${c2}\nFind x`, 
        answer: x, 
        hint: 'Add the equations together', 
        explanation: `Summing them: (${a}x + x) + (y - y) = ${c1} + ${c2}\n${a+1}x = ${c1+c2}\nx = ${(c1+c2)/(a+1)}`
      };
    }
  },

  'pythagoras-trig': {
    title: 'Pythagoras & SOHCAHTOA',
    emoji: '📐',
    color: '#00d4ff',
    category: 'Geometry',
    description: 'Calculate lengths and angles in right-angled triangles.',
    hubPath: '/gcse/maths',
    backLabel: 'Back to Maths',
    lessons: {
      foundation: [
        { title: 'Pythagoras\' Theorem', formula: 'a² + b² = c²', content: 'c is always the hypotenuse (the longest side).', example: 'Sides 3 and 4: 3² + 4² = 25. √25 = 5.' },
        { title: 'Finding a Shorter Side', content: 'Subtract the squares: c² - a² = b².', example: 'Hyp=13, side=5: 169 - 25 = 144. √144 = 12.' },
        { title: 'Trigonometry (SOH CAH TOA)', content: 'Links angles and sides. Label sides: Opposite (from angle), Adjacent (next to), Hypotenuse (longest).', formula: 'sin θ = O/H, cos θ = A/H, tan θ = O/A' },
        { title: 'Finding a Length', content: 'Pick Sin, Cos, or Tan based on what you have and what you want. Rearrange the formula.', tip: 'Use the trig triangles if you find rearranging hard!' }
      ],
      higher: [
        { title: 'Finding an Angle', content: 'Use the inverse trig buttons (sin⁻¹, cos⁻¹, tan⁻¹).', example: 'sin θ = 0.5 → θ = sin⁻¹(0.5) = 30°' },
        { title: 'Pythagoras in 3D', content: 'Apply a² + b² + c² = d² to find diagonals across rooms or pyramids.', example: 'Box 3x4x12: √(3²+4²+12²) = √169 = 13.' },
        { title: 'Exact Trig Values', content: 'You must memorize sin/cos/tan for 0, 30, 45, 60, 90.', tip: 'sin 30 = 0.5, cos 60 = 0.5, tan 45 = 1.' },
        { title: 'Trig Graphs', content: 'Know the shapes of Sine, Cosine, and Tangent waves from 0° to 360°.' }
      ],
    },
    generateQuestion: () => {
       const a = 3; const b = 4;
       return makeMCQ('In a right triangle, sides are 3cm and 4cm. What is the hypotenuse?', '5cm', ['6cm', '7cm', '12cm'], '3² + 4² = x²', '9 + 16 = 25. √25 = 5.');
    }
  },

  'vectors': {
    title: 'Vectors',
    emoji: '➗',
    color: '#ff6b35',
    category: 'Geometry',
    description: 'Work with movement and direction as column vectors.',
    hubPath: '/gcse/maths',
    backLabel: 'Back to Maths',
    lessons: {
      foundation: [
        { title: 'Column Vectors', content: 'Written as [x, y]. Top number is horizontal movement, bottom is vertical.', example: '[3, -2] means 3 right, 2 down.' },
        { title: 'Adding & Subtracting', content: 'Just add/subtract the top numbers and the bottom numbers separately.', example: '[1, 2] + [3, 4] = [4, 6]' },
        { title: 'Scalar Multipliers', content: 'Multiply both numbers by the scalar.', example: '3 × [2, 5] = [6, 15]' },
        { title: 'Resultant Vectors', content: 'The single vector that replaces multiple movements. Geometrically, it\'s the "shortcut".' }
      ],
      higher: [
        { title: 'Geometric Vectors', content: 'Vectors like a and b on a diagram. Go "the long way round" using known paths.', tip: 'Going against an arrow makes the vector negative!' },
        { title: 'Midpoints & Ratios', content: 'Find points a fraction of the way along a line. E.g. M is the midpoint of AB: OM = OA + 0.5AB.' },
        { title: 'Parallel Vectors', content: 'Vectors are parallel if one is a multiple of the other.', example: '[2, 3] is parallel to [4, 6] because [4, 6] = 2 × [2, 3].' },
        { title: 'Collinear Points', content: 'To prove points A, B, and C lie on a straight line: show AB is parallel to BC and they share point B.' }
      ],
    },
    generateQuestion: () => {
      return makeMCQ('If a = [2, 3] and b = [1, -5], what is a + b?', '[3, -2]', ['[3, 8]', '[1, 8]', '[2, -15]'], 'Add tops, add bottoms.', '[2+1, 3+(-5)] = [3, -2]');
    }
  },

  'circle-theorems': {
    title: 'Circle Theorems',
    emoji: '⭕',
    color: '#b14aed',
    category: 'Geometry',
    description: 'The geometric laws governing angles in circles.',
    hubPath: '/gcse/maths',
    backLabel: 'Back to Maths',
    lessons: {
      foundation: [
        { title: 'Tangent & Radius', content: 'A tangent meets a radius at exactly 90°.', tip: 'Always look for the right angle if you see a line touching the edge!' },
        { title: 'Two Tangents', content: 'Two tangents from the same external point to a circle are equal in length.' },
        { title: 'Angles in a Semicircle', content: 'The angle in a semicircle is always 90°.', tip: 'If the hypotenuse is the diameter, the opposite angle is 90°.' }
      ],
      higher: [
        { title: 'Angles at Center/Circumference', content: 'The angle at the center is TWICE the angle at the circumference.', tip: 'Look for an "arrowhead" shape.' },
        { title: 'Cyclic Quadrilaterals', content: 'Opposite angles in a cyclic quadrilateral (all corners on the circle) add up to 180°.' },
        { title: 'Alternate Segment Theorem', content: 'The angle between a tangent and its chord is equal to the angle in the alternate segment.', tip: 'This is usually the hardest theorem to spot!' },
        { title: 'Same Segment', content: 'Angles in the same segment (from the same chord) are equal.', tip: 'Look for the "bowtie" or "butterfly" shape!' },
        { title: 'Radius bisects Chord', content: 'A radius that is perpendicular to a chord bisects the chord (cuts it in half).' }
      ],
    },
    generateQuestion: () => {
      return makeMCQ('Angle at circumference is 40°. What is the angle at the center?', '80°', ['20°', '40°', '180°'], 'Center is double.', '40 × 2 = 80°.');
    }
  },

  'probability-trees': {
    title: 'Probability Trees',
    emoji: '🌲',
    color: '#ffe600',
    category: 'Statistics',
    description: 'Calculate probabilities of multiple events using tree diagrams.',
    hubPath: '/gcse/maths',
    backLabel: 'Back to Maths',
    lessons: {
      foundation: [
        { title: 'The Branches', content: 'Each set of branches from a point must add up to 1.', example: 'P(Rain) = 0.3 → P(No Rain) = 0.7' },
        { title: 'Along the Branches', content: 'To find the probability of one event AND another, MULTIPLY along the branches.', example: '0.5 × 0.5 = 0.25' },
        { title: 'Choosing Outcomes', content: 'Identify the specific end-points that satisfy the question (e.g. "at least one red").' }
      ],
      higher: [
        { title: 'Dependent Events', content: 'The second set of branches changes based on the first outcome (e.g. picking without replacement).', tip: 'The denominator usually decrease by 1!' },
        { title: 'At the End of Branches', content: 'To find the probability of one outcome OR another, ADD the results from the end of the trees.', formula: 'P(A or B) = P(A) + P(B)' },
        { title: 'The "At Least One" Trick', content: 'P(At least one) = 1 − P(None). This is often much faster than adding many branches.', tip: 'Use this for "at least one 6" in three dice rolls.' }
      ],
    },
    generateQuestion: () => {
      return makeMCQ('P(A) = 0.3, P(B) = 0.4. What is P(A and B)?', '0.12', ['0.7', '0.1', '0.5'], 'Multiply them.', '0.3 × 0.4 = 0.12');
    }
  },

  'venn-diagrams': {
    title: 'Venn Diagrams (Prob)',
    emoji: '⭕',
    color: '#ff2d78',
    category: 'Statistics',
    description: 'Using Venn diagrams to solve probability and set theory problems.',
    hubPath: '/gcse/maths',
    backLabel: 'Back to Maths',
    lessons: {
      foundation: [
        { title: 'Intersection (A ∩ B)', content: 'The middle part where both things happen.', example: 'Students who like both Maths and Art.' },
        { title: 'Union (A ∪ B)', content: 'Everything inside both circles. "A or B or both".' },
        { title: 'Complement (A\')', content: 'Everything NOT in A.', tip: 'P(A) + P(A\') = 1.' }
      ],
      higher: [
        { title: 'Conditional Venns', content: 'P(A|B) means "Probability of A GIVEN B". Your new total is only the people in circle B.', tip: 'P(A|B) = P(A ∩ B) / P(B)' },
        { title: 'Three-Circle Venns', content: 'Handle overlapping groups for three categories. Always start from the very center (the intersection of all three) and work outwards.' }
      ],
    },
    generateQuestion: () => {
      return makeMCQ('In a Venn, 5 are in the middle, 10 are in A only, 8 are in B only. How many in A union B?', '23', ['5', '15', '18'], '10 + 5 + 8', 'The union is everything inside both circles: 10 + 5 + 8 = 23.');
    }
  },

  'surds-recurring': {
    title: 'Surds & Recurring Decimals',
    emoji: '√',
    color: '#00d4ff',
    category: 'Number',
    description: 'Simplify surds, rationalise denominators, and convert recurring decimals.',
    hubPath: '/gcse/maths',
    backLabel: 'Back to Maths',
    lessons: {
      foundation: [
        { title: 'Converting Recurring Decimals', content: 'Use algebra: let x = 0.777... then 10x = 7.777... Subtract x to get 9x = 7, so x = 7/9.', tip: 'The number of recurring digits tells you which power of 10 to multiply by.' },
        { title: 'The Dot Notation', content: 'A dot over a number means it repeats forever. Dots over two numbers mean the whole block repeats.', example: '0.12̇3̇ = 0.1232323...' }
      ],
      higher: [
        { title: 'Simplifying Surds', content: 'Find the largest square factor of the number inside the root.', formula: '√ab = √a × √b', example: '√12 = √4 × √3 = 2√3' },
        { title: 'Multiplying Surds', content: 'Multiply the numbers inside the roots together.', example: '√2 × √8 = √16 = 4', tip: 'Always check if your result can be simplified further!' },
        { title: 'Rationalising (Simple)', content: 'Multiply top and bottom by the surd to remove it from the denominator.', formula: '1/√a = √a / a', example: '5/√2 = 5√2 / 2' },
        { title: 'Rationalising (Complex)', content: 'Multiply by the conjugate (reverse the sign).', formula: '1/(a + √b) × (a - √b)/(a - √b)', example: 'Sign swap: + becomes −. Middle terms cancel out!' }
      ],
    },
    generateQuestion: () => {
      const types = [
        () => makeMCQ('Simplify √50', '5√2', ['2√5', '5√5', '10√5'], 'Find square factor 25.', '√50 = √25 × √2 = 5√2'),
        () => makeMCQ('Convert 0.444... to a fraction', '4/9', ['4/10', '2/5', '4/99'], 'Use 10x - x.', '9x = 4 -> x = 4/9')
      ];
      return pick(types)();
    }
  },

  'trigonometry': {
    title: 'Trigonometry',
    emoji: '📐',
    color: '#ff2d78',
    category: 'Geometry',
    description: 'SOH CAH TOA, Sine rule, Cosine rule, and 3D applications.',
    hubPath: '/gcse/maths',
    backLabel: 'Back to Maths',
    lessons: {
      foundation: [
        { title: 'Labeling the Sides', content: 'Hypotenuse (Longest, opposite 90°), Opposite (Across from the angle θ), Adjacent (Next to the angle θ).' },
        { title: 'SOH CAH TOA', content: 'Sin θ = Opp/Hyp, Cos θ = Adj/Hyp, Tan θ = Opp/Adj.', tip: 'Use a mnemonic: Some Old Horses Can Always Hear Their Owners Approach.' },
        { title: 'Finding a Side', content: 'Rearrange the formula and multiply or divide.', example: 'Opp = Hyp × Sin θ' },
        { title: 'Finding an Angle', content: 'Use the inverse functions (sin⁻¹, cos⁻¹, tan⁻¹) on your calculator.', tip: 'Make sure your calculator is in DEGREES mode (D).' }
      ],
      higher: [
        { title: 'The Sine Rule', formula: 'a/Sin A = b/Sin B = c/Sin C', tip: 'Use this when you have "opposite pairs" of sides and angles.' },
        { title: 'The Cosine Rule (Side)', formula: 'a² = b² + c² − 2bc Cos A', tip: 'Use this when you have Side-Angle-Side (SAS).' },
        { title: 'The Cosine Rule (Angle)', formula: 'Cos A = (b² + c² − a²) / 2bc' },
        { title: 'Area of a Triangle', formula: 'Area = ½ab Sin C', tip: 'Works for any triangle, not just right-angled ones!' },
        { title: 'Exact Trig Values', content: 'Learn: Sin 30 = 0.5, Cos 60 = 0.5, Tan 45 = 1.', tip: 'Often tested in non-calculator papers.' }
      ],
    },
    generateQuestion: () => {
      return makeMCQ('In a right triangle, Opp=5, Hyp=10. What is Sin θ?', '0.5', ['2', '0.2', '1'], 'Opp/Hyp', '5/10 = 0.5');
    }
  },

  'simultaneous-equations': {
    title: 'Simultaneous Equations',
    emoji: '📈',
    color: '#00e5a0',
    category: 'Algebra',
    description: 'Solve two equations at the same time using elimination or substitution.',
    hubPath: '/gcse/maths',
    backLabel: 'Back to Maths',
    lessons: {
      foundation: [
        { title: 'Elimination Method', content: 'Multiply one or both equations so one variable has the same coefficient. Then Add or Subtract to get rid of it.', tip: 'Same Signs Subtract (SSS), Different Signs Add.' },
        { title: 'Substitution Method', content: 'Rearrange one equation for one variable (e.g. x = ...) and "plug it" into the other.', example: 'y = 2x, 3x + y = 10 -> 3x + 2x = 10' }
      ],
      higher: [
        { title: 'Linear and Quadratic', content: 'Always use substitution. Express the linear as x = ... or y = ..., then substitute into the quadratic.', tip: 'Usually gives two pairs of answers (x₁, y₁) and (x₂, y₂).' },
        { title: 'Graphical Solutions', content: 'The solution is the coordinates (x, y) where the two lines INTERSECT.', tip: 'Zoom in on the graph to find decimal solutions.' }
      ],
    },
    generateQuestion: () => {
      return makeMCQ('Solve: x + y = 10, x - y = 4. What is x?', '7', ['6', '5', '3'], 'Add the equations.', '2x = 14 -> x = 7');
    }
  },

  'sequences': {
    title: 'Sequences',
    emoji: '🔢',
    color: '#ffe600',
    category: 'Algebra',
    description: 'Linear (Arithmetic) and Quadratic sequences.',
    hubPath: '/gcse/maths',
    backLabel: 'Back to Maths',
    lessons: {
      foundation: [
        { title: 'Linear Sequences (nth term)', content: 'The gap is constant. The formula is always "dn + c" where d is the difference.', example: '5, 8, 11... Gap is 3. nth term = 3n + 2' },
        { title: 'Finding the Difference', content: 'Subtract the 1st term from the 2nd term.', tip: 'If the sequence goes down, the difference is negative!' }
      ],
      higher: [
        { title: 'Quadratic Sequences', content: 'The SECOND difference is constant. The nth term involves n².', formula: 'an² + bn + c', tip: 'The second difference is equal to 2a.' },
        { title: 'Geometric Sequences', content: 'Each term is multiplied by a common ratio.', example: '2, 6, 18, 54... (×3)' },
        { title: 'Fibonacci-style', content: 'Each term is the sum of the two previous terms.', example: '1, 1, 2, 3, 5, 8...' }
      ],
    },
    generateQuestion: () => {
      return makeMCQ('Find nth term of: 4, 7, 10, 13...', '3n + 1', ['4n - 1', '3n + 4', 'n + 3'], 'Gap of 3.', '3n + 1 gives 4 when n=1.');
    }
  },

  'vectors-basic': {
    title: 'Vectors',
    emoji: '↗️',
    color: '#ff6b35',
    category: 'Geometry',
    description: 'Work with column vectors and vector geometry.',
    hubPath: '/gcse/maths',
    backLabel: 'Back to Maths',
    lessons: {
      foundation: [
        { title: 'Column Vectors', content: 'Shows movement: top number is x (left/right), bottom is y (up/down).', example: '[3, -2] means 3 right, 2 down.' },
        { title: 'Adding Vectors', content: 'Add the top numbers and add the bottom numbers separately.', example: '[1, 2] + [3, 4] = [4, 6]' },
        { title: 'Multiplying by a Scalar', content: 'Multiply both components by the number outside.', example: '3 × [2, 1] = [6, 3]' }
      ],
      higher: [
        { title: 'Vector Geometry', content: 'Find paths across a shape by following known vectors. `BA = −AB`.', tip: 'Going against the arrow means the vector becomes negative!' },
        { title: 'Parallel Vectors', content: 'Two vectors are parallel if one is a multiple of the other.', example: '[1, 2] is parallel to [5, 10].' },
        { title: 'Midpoints & Ratios', content: 'Use ratios to find parts of vectors (e.g. "P is 1/3 of the way along AB").' }
      ],
    },
    generateQuestion: () => {
      return makeMCQ('Vector a = [2, 3]. Find 2a.', '[4, 6]', ['[4, 3]', '[2, 6]', '[5, 5]'], 'Multiply both.', '[4, 6]');
    }
  },

  'proportion': {
    title: 'Direct & Inverse Proportion',
    emoji: '⚖️',
    color: '#b14aed',
    category: 'Ratio',
    description: 'Solve problems involving y ∝ x and y ∝ 1/x.',
    hubPath: '/gcse/maths',
    backLabel: 'Back to Maths',
    lessons: {
      foundation: [
        { title: 'Direct Proportion', content: 'One value increases at the same rate as the other. y = kx.', example: '5 apples cost £1, so 10 apples cost £2.' },
        { title: 'Inverse Proportion', content: 'As one value increases, the other DECREASES. y = k/x.', example: 'More builders on a job = less time taken.' }
      ],
      higher: [
        { title: 'Proportion with Powers', content: 'y can be proportional to x², x³ or √x.', formula: 'y = kx²', example: 'Area of circle ∝ r²' },
        { title: 'Finding k', content: 'Substitute values of x and y to find the constant of proportionality (k), then rewrite the formula.', tip: 'This is the first step in almost every proportion exam question!' }
      ],
    },
    generateQuestion: () => {
      return makeMCQ('y ∝ x. When x=2, y=10. What is k?', '5', ['2', '20', '0.2'], 'y = kx -> 10 = 2k', 'k = 5');
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

export function getAllTopics() {
  return Object.entries(TOPICS).map(([slug, data]) => ({
    slug,
    ...data,
  }));
}

export function getTopicsByCategory() {
  const cats = {};
  Object.entries(TOPICS).forEach(([slug, data]) => {
    if (!cats[data.category]) cats[data.category] = [];
    cats[data.category].push({ slug, ...data });
  });
  return cats;
}

export default TOPICS;
