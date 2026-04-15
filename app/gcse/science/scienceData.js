// GCSE Science Topic Data — Biology, Chemistry, Physics
const r = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[r(0, arr.length - 1)];

// Shuffle utility for multiple choice options
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

const TOPICS = {
  // ==============================================================
  // BIOLOGY (Green theme)
  // ==============================================================

  'cell-biology': {
    title: 'Cell Biology',
    emoji: '🔬',
    color: '#00ff94',
    category: 'Biology',
    description: 'Differences between eukaryotic and prokaryotic cells, and microscopy.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'Animal vs Plant Cells', content: 'Both have a nucleus, cytoplasm, cell membrane, mitochondria, and ribosomes. ONLY plant cells have a cell wall, chloroplasts, and a permanent vacuole.' },
        { title: 'Bacterial Cells', content: 'Prokaryotic cells (bacteria) are smaller. They lack a true nucleus; instead they have a single circular strand of DNA and plasmids.' },
      ],
      higher: [
        { title: 'Microscopy', formula: 'Magnification = Image size ÷ Real size', example: 'Image = 10mm, Mag = ×100\nReal size = 10/100 = 0.1mm' },
        { title: 'Cell Cycle & Mitosis', content: 'Cells divide in a series of stages. DNA is doubled, chromosomes are pulled apart, and the cell divides into two identical daughter cells.' },
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => makeMCQ('Which structure is found in BOTH animal and plant cells?', 'Mitochondria', ['Chloroplasts', 'Cell wall', 'Permanent vacuole'], 'The site of aerobic respiration', 'Both cell types need mitochondria for energy release.'),
          () => makeMCQ('What is the function of ribosomes?', 'Protein synthesis', ['Respiration', 'Photosynthesis', 'Storing sap'], 'Where are proteins made?', 'Ribosomes are the site of protein synthesis.'),
        ];
        return pick(types)();
      } else {
        const types = [
          () => makeMCQ('Are bacterial cells eukaryotic or prokaryotic?', 'Prokaryotic', ['Eukaryotic', 'Neither'], 'Think about the nucleus', 'Bacteria are prokaryotes because they lack a membrane-bound nucleus.'),
          () => {
            const mg = pick([100, 200, 500, 1000]);
            const rz = pick([0.01, 0.02, 0.05]);
            return makeMCQ(`If a cell's real size is ${rz} mm and the magnification is x${mg}, what is the image size?`, `${rz * mg} mm`, [`${(rz * mg) / 10} mm`, `${rz * mg * 10} mm`, `${rz} mm`], 'Image = Mag × Real', `Image size = ${mg} × ${rz} = ${rz * mg} mm`);
          }
        ];
        return pick(types)();
      }
    },
  },

  'organisation': {
    title: 'Organisation',
    emoji: '🫀',
    color: '#00ff94',
    category: 'Biology',
    description: 'The digestive system, the heart, and plant tissues.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'Digestive Enzymes', content: 'Amylase breaks down starch to sugars. Protease breaks down proteins to amino acids. Lipase breaks down lipids to fatty acids and glycerol.' },
        { title: 'The Heart', content: 'The heart is a double pump. The right side pumps blood to the lungs; the left side pumps blood to the rest of the body.' },
      ],
      higher: [
        { title: 'Blood Vessels', content: 'Arteries carry blood away (thick walls). Veins carry blood in (valves). Capillaries exchange materials (one cell thick).' },
        { title: 'Plant Transport', content: 'Xylem transports water and minerals up the stem. Phloem transports dissolved sugars (translocation).' },
      ],
    },
    generateQuestion: (tier) => {
      const q = tier === 'foundation' ? [
        () => makeMCQ('Which enzyme breaks down starch (carbohydrates)?', 'Amylase', ['Lipase', 'Protease', 'Bile'], 'Found in saliva', 'Amylase (a carbohydrase) breaks down starch into simple sugars.'),
        () => makeMCQ('What carries oxygen in red blood cells?', 'Haemoglobin', ['Plasma', 'Platelets', 'White blood cells'], 'The red pigment', 'Haemoglobin binds with oxygen to transport it.'),
      ] : [
        () => makeMCQ('Which blood vessel contains valves?', 'Vein', ['Artery', 'Capillary', 'Aorta'], 'Prevents backflow', 'Veins carry blood at lower pressure and require valves to prevent backflow.'),
        () => makeMCQ('What substance does xylem transport?', 'Water and minerals', ['Glucose', 'Amino acids', 'Lipids'], 'From the roots upwards', 'Xylem carries water and mineral ions from the roots to the leaves.'),
      ];
      return pick(q)();
    },
  },

  'infection-and-response': {
    title: 'Infection and Response',
    emoji: '🦠',
    color: '#00ff94',
    category: 'Biology',
    description: 'Pathogens, the immune system, and vaccinations.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'Pathogens', content: 'Microorganisms that cause infectious disease. Can be viruses, bacteria, protists, or fungi.' },
        { title: 'White Blood Cells', content: 'Defend the body by ingesting pathogens (phagocytosis), producing antibodies, and producing antitoxins.' },
      ],
      higher: [
        { title: 'Vaccination', content: 'Injecting small quantities of dead or inactive pathogen. Stimulates white blood cells to produce antibodies. Grants immunity.' },
        { title: 'Antibiotics', content: 'Medicines that help cure bacterial disease by killing infective bacteria inside the body. They CANNOT kill viruses.' },
      ],
    },
    generateQuestion: (tier) => {
      const q = tier === 'foundation' ? [
        () => makeMCQ('Which of these cannot be killed by antibiotics?', 'Viruses', ['Bacteria', 'Fungi', 'Parasites'], 'They reproduce inside cells', 'Antibiotics kill bacteria, but viruses live and reproduce inside host cells.'),
        () => makeMCQ('How do white blood cells specifically target a pathogen?', 'Producing antibodies', ['Producing acid', 'Clotting blood', 'Sweating'], 'Specific shape', 'They produce specific antibodies to bind to the pathogen antigens.'),
      ] : [
        () => makeMCQ('What does a vaccine contain?', 'Dead or inactive pathogens', ['Live virulent pathogens', 'Antibiotics', 'Pure antibodies'], 'To trigger immunity safely', 'Vaccines contain inactive forms of the pathogen to stimulate antibody production without causing the disease.'),
      ];
      return pick(q)();
    },
  },

  'ecology': {
    title: 'Ecology',
    emoji: '🌿',
    color: '#00ff94',
    category: 'Biology',
    description: 'Food chains, carbon cycle, and biodiversity.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'Food Chains', content: 'Producer → Primary Consumer → Secondary Consumer → Predator. Arrows show the direction of energy transfer.' },
        { title: 'Abiotic & Biotic', content: 'Abiotic = Non-living factors (light, temperature). Biotic = Living factors (predators, pathogens).' },
      ],
      higher: [
        { title: 'Carbon Cycle', content: 'Photosynthesis removes CO2. Respiration and combustion release CO2 back into the atmosphere.' },
        { title: 'Biodiversity', content: 'The variety of all the different species of organisms. Higher biodiversity means a more stable ecosystem.' },
      ],
    },
    generateQuestion: (tier) => {
      return pick([
        () => makeMCQ('What do the arrows in a food chain represent?', 'Transfer of energy', ['Movement of animals', 'Direction of wind', 'Water flow'], 'What moves from prey to predator?', 'The arrows show the direction of biomass and energy transfer.'),
        () => makeMCQ('Which is an abiotic factor affecting a community?', 'Light intensity', ['New predators', 'Availability of food', 'Pathogens'], 'Abiotic means non-living', 'Light intensity, temperature, and moisture are abiotic factors.'),
        () => makeMCQ('Which process REMOVES carbon dioxide from the atmosphere?', 'Photosynthesis', ['Respiration', 'Combustion', 'Decomposition'], 'Performed by plants', 'Plants take in CO2 to make glucose via photosynthesis.'),
      ])();
    },
  },

  // ==============================================================
  // CHEMISTRY (Blue theme)
  // ==============================================================

  'atomic-structure-periodic': {
    title: 'Atomic Structure & Periodic Table',
    emoji: '⚛️',
    color: '#00d4ff',
    category: 'Chemistry',
    description: 'Atoms, elements, isotopes, and the periodic table.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'The Atom', content: 'Protons (+1 charge, mass 1), Neutrons (0 charge, mass 1), Electrons (-1 charge, very small mass). Protons & neutrons are in the nucleus.' },
        { title: 'Atomic Number', content: 'The number of protons in an atom. In neutral atoms, the number of electrons equals the number of protons.' },
      ],
      higher: [
        { title: 'Isotopes', content: 'Atoms of the same element with the same number of protons but a DIFFERENT number of neutrons (different mass number).' },
        { title: 'Periodic Table Trends', content: 'Group number = number of outer electrons. Group 1 (alkali metals) get more reactive going down. Group 7 (halogens) get less reactive going down.' },
      ],
    },
    generateQuestion: (tier) => {
      const q = tier === 'foundation' ? [
        () => makeMCQ('What is the electrical charge of a neutron?', '0', ['+1', '-1', '+2'], 'Neutral', 'Neutrons are neutral particles (charge 0).'),
        () => makeMCQ('If Carbon has an atomic number of 6, how many protons does it have?', '6', ['12', '14', '8'], 'Atomic number defines the element', 'The atomic number is exactly the number of protons.'),
      ] : [
        () => makeMCQ('Isotopes of an element have a different number of what?', 'Neutrons', ['Protons', 'Electrons', 'Ions'], 'Different mass', 'Isotopes have identical protons but different neutrons.'),
        () => makeMCQ('Why are Group 1 metals more reactive down the group?', 'Outer electron is further from the nucleus', ['Outer electron is closer', 'They have more protons', 'They form negative ions'], 'Electrostatic attraction', 'The outer electron is further from the positive nucleus and shielded, making it easier to lose.'),
      ];
      return pick(q)();
    },
  },

  'bonding-properties': {
    title: 'Bonding & Properties',
    emoji: '🔗',
    color: '#00d4ff',
    category: 'Chemistry',
    description: 'Ionic, covalent, and metallic bonding, and states of matter.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'Ionic Bonding', content: 'Between metals and non-metals. Electrons are TRANSFERRED. Oppositely charged ions are strongly attracted by electrostatic forces.' },
        { title: 'Covalent Bonding', content: 'Between non-metals. Electrons are SHARED to get a full outer shell.' },
      ],
      higher: [
        { title: 'Giant Covalent Structures', content: 'Diamond: carbon bonded to 4 others, extremely hard, no free electrons. Graphite: bonded to 3, in layers, conducts electricity because of delocalised electrons.' },
        { title: 'Metallic Bonding', content: 'Positive metal ions in a "sea" of delocalised electrons. These free electrons allow metals to conduct heat and electricity.' },
      ],
    },
    generateQuestion: (tier) => {
      const q = tier === 'foundation' ? [
        () => makeMCQ('What happens to electrons in an ionic bond?', 'They are transferred', ['They are shared', 'They form a sea', 'They are destroyed'], 'Metal to non-metal', 'Metals lose electrons, non-metals gain them (transfer).'),
        () => makeMCQ('Covalent bonds occur between which types of elements?', 'Non-metals only', ['Metals only', 'Metals and non-metals', 'Noble gases'], 'Sharing electrons', 'Non-metals share electrons to form covalent bonds.'),
      ] : [
        () => makeMCQ('Why does graphite conduct electricity?', 'It has delocalised electrons', ['It has giant ionic bonding', 'It dissolves in water', 'It has strong covalent bonds'], 'Movement of charge', 'Graphite has 1 delocalised electron per carbon atom, which is free to move and carry charge.'),
        () => makeMCQ('What best describes the structure of a solid metal?', 'Positive ions in a sea of delocalised electrons', ['Negative ions bonded together', 'A lattice of molecules', 'Layers of protons'], 'Metallic bonding', 'Metals consist of a giant structure of positive ions surrounded by delocalised electrons.'),
      ];
      return pick(q)();
    },
  },

  'quantitative-chemistry': {
    title: 'Quantitative Chemistry',
    emoji: '⚖️',
    color: '#00d4ff',
    category: 'Chemistry',
    description: 'Relative formula mass, moles, and concentration.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'Relative Formula Mass (Mr)', content: 'The sum of the relative atomic masses (Ar) of all the atoms shown in the formula.', example: 'CO2: C=12, O=16\nMr = 12 + (2×16) = 44' },
      ],
      higher: [
        { title: 'Moles', formula: 'Moles = Mass / Mr', example: 'Mass = 88g of CO2 (Mr=44)\nMoles = 88 / 44 = 2 moles' },
        { title: 'Concentration', formula: 'Concentration = Mass / Volume\nor Moles / Volume (dm³)', example: 'If volume is in cm³, divide by 1000 to get dm³.' },
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return (() => makeMCQ('What is the Relative Formula Mass (Mr) of Water (H2O)? (Ar: H=1, O=16)', '18', ['17', '33', '10'], '2 lots of H, 1 lot of O', '(2 × 1) + 16 = 18'))();
      } else {
        const mass = pick([44, 88, 132]);
        return (() => makeMCQ(`How many moles in ${mass}g of CO2? (Mr of CO2 = 44)`, `${mass/44}`, [`${mass/22}`, `${mass/88}`, '1'], 'Mass / Mr', `Moles = ${mass} / 44 = ${mass/44}`))();
      }
    },
  },

  'chemistry-of-atmosphere': {
    title: 'Chemistry of the Atmosphere',
    emoji: '☁️',
    color: '#00d4ff',
    category: 'Chemistry',
    description: 'Current atmosphere, how it evolved, and greenhouse gases.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'Today\'s Atmosphere', content: 'Approximately 80% Nitrogen, 20% Oxygen, and small proportions of other gases like argon, CO2, and water vapour.' },
        { title: 'Early Atmosphere', content: 'Formed by intense volcanic activity. Mainly CO2 with little or no oxygen.' },
      ],
      higher: [
        { title: 'Evolution of Atmosphere', content: 'Algae and plants evolved and decreased CO2 by photosynthesis, while increasing Oxygen. CO2 was also locked up in sedimentary rocks and fossil fuels.' },
        { title: 'Greenhouse Effect', content: 'Greenhouse gases (CO2, methane, water vapour) absorb long wavelength radiation reflected off the Earth, keeping the planet warm.' },
      ],
    },
    generateQuestion: (tier) => {
      const q = [
        () => makeMCQ('What is the most abundant gas in the Earth\'s current atmosphere?', 'Nitrogen (~80%)', ['Oxygen (~20%)', 'Carbon Dioxide (~0.04%)', 'Argon (~1%)'], 'It makes up four-fifths', 'Nitrogen is around 80%, Oxygen ~20%.'),
        () => makeMCQ('Which process produced the oxygen in the Earth\'s early atmosphere?', 'Photosynthesis by algae/plants', ['Volcanic eruptions', 'Respiration of animals', 'Evaporation of oceans'], 'Plants!', 'Algae and plants produced O2 via photosynthesis.'),
        () => makeMCQ('Which are ALL greenhouse gases?', 'Water vapour, CO2, Methane', ['Nitrogen, Oxygen, Argon', 'CO2, Helium, Nitrogen', 'Oxygen, Water vapour, Neon'], 'They trap heat', 'CO2, methane, and water vapour are the main greenhouse gases.'),
      ];
      return pick(q)();
    },
  },

  // ==============================================================
  // PHYSICS (Purple theme)
  // ==============================================================

  'energy': {
    title: 'Energy',
    emoji: '⚡',
    color: '#b14aed',
    category: 'Physics',
    description: 'Energy stores, transfers, efficiency, and power.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'Energy Stores', content: 'Kinetic, gravitational, chemical, elastic, magnetic, electrostatic, nuclear, and thermal energy stores.' },
        { title: 'Conservation of Energy', content: 'Energy cannot be created or destroyed, only transferred usefully, stored, or dissipated (wasted as heat).' },
      ],
      higher: [
        { title: 'Kinetic Energy', formula: 'Ek = ½ m v²', example: 'm=2kg, v=3m/s:\nEk = 0.5 × 2 × 3² = 9 J' },
        { title: 'Gravitational Potential Energy', formula: 'Ep = m g h\n(g = 9.8 N/kg)', example: 'm=2kg, h=5m:\nEp = 2 × 9.8 × 5 = 98 J' },
        { title: 'Efficiency', formula: 'Efficiency = Useful output ÷ Total input', example: 'Input=100J, Useful=40J\nEff = 40/100 = 0.4 (or 40%)' },
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return pick([
          () => makeMCQ('What is the Law of Conservation of Energy?', 'Energy cannot be created or destroyed', ['Energy is always lost as heat', 'Energy scales with mass', 'New energy is made in power plants'], 'It only transfers', 'Energy can only be transferred between stores, not created or destroyed.'),
          () => makeMCQ('Which energy store is associated with a stretched rubber band?', 'Elastic potential', ['Kinetic', 'Gravitational', 'Chemical'], 'Think about stretching', 'Stretching or squashing changes the elastic potential store.'),
        ])();
      } else {
        const mass = pick([2, 4, 10]);
        const v = pick([3, 4, 5]);
        return (() => makeMCQ(`Calculate the Kinetic Energy of a ${mass}kg object moving at ${v} m/s`, `${0.5 * mass * v * v} J`, [`${mass * v} J`, `${mass * v * v} J`, `${0.5 * mass * v} J`], 'Ek = 0.5 × m × v^2', `Ek = 0.5 × ${mass} × ${v}² = ${0.5 * mass * v * v} J`))();
      }
    },
  },

  'electricity': {
    title: 'Electricity',
    emoji: '🔌',
    color: '#b14aed',
    category: 'Physics',
    description: 'Current, potential difference, resistance, and circuits.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'V = I R', content: 'Potential difference = Current × Resistance.', formula: 'V = I × R\n(Volts = Amps × Ohms)' },
        { title: 'Series Circuits', content: 'Current (I) is the same everywhere. Potential Difference (V) is shared across components.' },
      ],
      higher: [
        { title: 'Parallel Circuits', content: 'Current (I) splits down different branches. Potential Difference (V) is the SAME across all branches.' },
        { title: 'Mains Electricity (UK)', content: 'AC (alternating current) supply. Frequency is 50 Hz and voltage is about 230 V.' },
        { title: 'Wire Colours', content: 'Live = Brown, Neutral = Blue, Earth = Green/Yellow stripes.' },
      ],
    },
    generateQuestion: (tier) => {
      const q = [
        () => makeMCQ('In V = I × R, what is V measured in?', 'Volts', ['Amps', 'Ohms', 'Joules'], 'Potential difference unit', 'V is Voltage / Potential difference, measured in Volts.'),
        () => makeMCQ('What is the colour of the Earth wire in a UK plug?', 'Green and yellow stripes', ['Brown', 'Blue', 'Black'], 'Safety colour', 'Earth is green and yellow stripes.'),
        () => makeMCQ('In a series circuit, what happens to the current?', 'It is the same everywhere', ['It is shared between components', 'It gets used up', 'It alternates'], 'Series', 'Current has only one path to flow, so it is the same everywhere.'),
        () => {
          const i = r(2,5); const r_val = r(5,12);
          return makeMCQ(`If Current = ${i}A and Resistance = ${r_val}Ω, find the Voltage (V)`, `${i * r_val} V`, [`${i + r_val} V`, `${r_val / i} V`, `${i * r_val * 2} V`], 'V = I × R', `V = ${i} × ${r_val} = ${i * r_val}V`);
        }
      ];
      return pick(q)();
    },
  },

  'particle-model': {
    title: 'Particle Model of Matter',
    emoji: '🧊',
    color: '#b14aed',
    category: 'Physics',
    description: 'Density, states of matter, specific heat capacity and latent heat.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'Density', formula: 'Density = Mass ÷ Volume\n(kg/m³ or g/cm³)', example: 'm=20g, Vol=10cm³\nDensity = 20/10 = 2 g/cm³' },
        { title: 'States of Matter', content: 'Solid (particles vibrate in fixed positions), Liquid (particles slide round each other), Gas (particles move randomly at high speed).' },
      ],
      higher: [
        { title: 'Specific Heat Capacity', content: 'The amount of energy needed to raise the temperature of 1kg of a substance by 1°C.', formula: 'ΔE = m c Δθ' },
        { title: 'Specific Latent Heat', content: 'The amount of energy needed to change the state of 1kg of a substance with NO change in temperature.' },
      ],
    },
    generateQuestion: (tier) => {
      const q = [
        () => makeMCQ('What is the formula for Density?', 'Mass ÷ Volume', ['Volume ÷ Mass', 'Mass × Volume', 'Force ÷ Area'], 'How heavy per space?', 'Density = Mass ÷ Volume.'),
        () => makeMCQ('During a change of state (e.g. melting), what happens to the temperature?', 'It stays the same', ['It increases', 'It decreases', 'It fluctuates'], 'Latent heat', 'Temperature stays constant while the state changes, as energy is used to break bonds.'),
        () => {
          const m = pick([5, 10, 20]); const v = pick([2, 5]);
          return makeMCQ(`A block has mass ${m}g and volume ${v}cm³. What is its density?`, `${m/v} g/cm³`, [`${m*v} g/cm³`, `${v/m} g/cm³`, `${m+v} g/cm³`], 'Density = M / V', `Density = ${m} / ${v} = ${m/v} g/cm³`);
        }
      ];
      return pick(q)();
    },
  },
  
  'atomic-physics': {
    title: 'Atomic Structure & Radioactivity',
    emoji: '☢️',
    color: '#b14aed',
    category: 'Physics',
    description: 'Alpha, beta, and gamma radiation, half-life, and atoms.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'Alpha Radiation (α)', content: 'A helium nucleus (2 protons, 2 neutrons). Very strongly ionising but weakly penetrating. Stopped by a sheet of paper.' },
        { title: 'Beta Radiation (β)', content: 'A high-speed electron. Stopped by a few mm of aluminium.' },
        { title: 'Gamma Radiation (γ)', content: 'An electromagnetic wave. Weakly ionising but very highly penetrating. Stopped only by thick lead or concrete.' },
      ],
      higher: [
        { title: 'Half-Life', content: 'The time it takes for the number of radioactive nuclei in an isotope to halve. It is constant for any specific isotope.' },
        { title: 'Contamination vs Irradiation', content: 'Irradiation: exposing an object to radiation. Contamination: radioactive particles getting ONTO or INTO an object.' },
      ],
    },
    generateQuestion: (tier) => {
      const q = [
        () => makeMCQ('Which type of radiation is completely stopped by a sheet of paper?', 'Alpha', ['Beta', 'Gamma', 'X-ray'], 'The largest, least penetrating particle', 'Alpha particles are large and easily stopped by paper or skin.'),
        () => makeMCQ('What is Beta radiation?', 'A high speed electron', ['A helium nucleus', 'An electromagnetic wave', 'A neutron'], 'Emitted from the nucleus', 'A beta particle is a high-speed electron emitted when a neutron turns into a proton.'),
        () => makeMCQ('What stops Gamma radiation?', 'Thick lead or concrete', ['Paper', 'A few mm of aluminium', 'Skin'], 'Highly penetrating', 'Gamma rays are highly penetrating and require thick dense materials like lead to stop them.'),
      ];
      return pick(q)();
    },
  },

  'chemical-analysis': {
    title: 'Chemical Analysis',
    emoji: '🧪',
    color: '#00d4ff',
    category: 'Chemistry',
    description: 'Purity, formulations, chromatography, and testing for gases.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'Pure Substances', content: 'A pure substance contains only one compound or element. Pure substances melt and boil at specific, sharp temperatures.' },
        { title: 'Formulations', content: 'A mixture that has been designed as a useful product, made by mixing components in carefully measured quantities (e.g. paint, medicines).' },
      ],
      higher: [
        { title: 'Chromatography', content: 'Used to separate mixtures. The mobile phase is the solvent, the stationary phase is the paper. Separation depends on solubility.' },
        { title: 'Testing for Gases', content: 'Chlorine: bleaches damp litmus paper. Oxygen: relights a glowing splint. Carbon dioxide: turns limewater cloudy. Hydrogen: makes a "squeaky pop" with a lit splint.' },
      ],
    },
    generateQuestion: (tier) => {
      return pick([
        () => makeMCQ('How do you test for Oxygen gas?', 'Relights a glowing splint', ['Turns limewater cloudy', 'Bleaches damp litmus paper', 'Makes a squeaky pop'], 'Think of combustion', 'Oxygen supports combustion, so it relights a glowing splint.'),
        () => makeMCQ('What happens to the boiling point of an impure substance?', 'It boils over a range of temperatures', ['It boils at a sharp temperature', 'It never boils', 'It boils at a lower temperature only'], 'Impurities disrupt structure', 'Impurities lower the melting point and cause boiling over a range of temperatures.'),
        () => makeMCQ('In paper chromatography, what is the stationary phase?', 'The paper', ['The solvent', 'The ink', 'The beaker'], 'It doesn\'t move', 'The paper is stationary, while the solvent moves up it.'),
      ])();
    },
  },

  'using-resources': {
    title: 'Using Resources',
    emoji: '♻️',
    color: '#00d4ff',
    category: 'Chemistry',
    description: 'Sustainable development, potable water, and life cycle assessments.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'Potable Water', content: 'Water that is safe to drink. Made by choosing an appropriate source, passing through filter beds, and sterilising (e.g. with chlorine or UV light).' },
        { title: 'Life Cycle Assessment', content: 'Carried out to assess the environmental impact of products in 4 stages: extracting raw materials, manufacturing, usage, and disposal.' },
      ],
      higher: [
        { title: 'Desalination', content: 'Turning salty sea water into potable water. Can be done by distillation or reverse osmosis. Requires a lot of energy.' },
        { title: 'Recycling', content: 'Reduces the use of raw materials, energy consumption, and limits environmental impact. Metals are melted and recast.' },
      ],
    },
    generateQuestion: (tier) => {
      return pick([
        () => makeMCQ('What does "potable water" mean?', 'Safe to drink', ['Pure water containing no dissolved substances', 'Salt water', 'Distilled water'], 'Drinking water', 'Potable water is safe to drink but may still contain low levels of dissolved salts.'),
        () => makeMCQ('Which method requires a lot of energy to purify seawater?', 'Desalination (Distillation)', ['Filtration', 'Sterilisation', 'Sedimentation'], 'Boiling water takes energy', 'Distillation requires boiling massive amounts of water, needing huge energy.'),
        () => makeMCQ('What is the first stage of a Life Cycle Assessment?', 'Extracting raw materials', ['Disposal', 'Manufacturing', 'Usage'], 'Beginning of life', 'You must first extract the materials needed (like mining or drilling).'),
      ])();
    },
  },

  // ==============================================================
  // PHYSICS (Purple theme)
  // ==============================================================

  'magnetism': {
    title: 'Magnetism & Electromagnetism',
    emoji: '🧲',
    color: '#b14aed',
    category: 'Physics',
    description: 'Magnetic fields, electromagnets, and the motor effect.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'Magnetic Poles', content: 'Like poles repel (N-N), unlike poles attract (N-S). The magnetic field goes from North to South.' },
        { title: 'Permanent vs Induced', content: 'Permanent magnets produce their own field. Induced magnets become magnetic when placed in a magnetic field.' },
      ],
      higher: [
        { title: 'Electromagnetism', content: 'When a current flows through a wire, a magnetic field is produced around it. A coil of wire (solenoid) makes the field stronger.' },
        { title: 'The Motor Effect', content: 'When a current-carrying wire is placed in a magnetic field, it experiences a force. Fleming\'s Left Hand Rule applies.' },
      ],
    },
    generateQuestion: (tier) => {
      return pick([
        () => makeMCQ('In a bar magnet, which direction do the magnetic field lines point?', 'From North to South', ['From South to North', 'Towards the center', 'Outwards in all directions'], 'N to S', 'Field lines always point from the North pole to the South pole.'),
        () => makeMCQ('What happens when two North poles are placed near each other?', 'They repel', ['They attract', 'Nothing happens', 'They spark'], 'Like poles', 'Like poles repel, opposite poles attract.'),
        () => makeMCQ('How can you make a solenoid (electromagnet) stronger?', 'Add an iron core', ['Use a wooden core', 'Decrease the current', 'Decrease the number of turns'], 'Iron is magnetic', 'Adding an iron core, increasing current, or adding more turns of wire increases strength.'),
      ])();
    },
  }
};

// Add category groupings
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
