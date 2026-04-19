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
        { title: 'Bacterial Cells', content: 'Prokaryotic cells (bacteria) are much smaller. They lack a true nucleus; instead they have a single circular strand of DNA and small rings called plasmids.' },
        { title: 'Organelle Functions', content: 'Nucleus (controls cell), Mitochondria (respiration), Ribosomes (protein synthesis), Chloroplasts (photosynthesis).' },
        { title: 'Cell Specialisation', content: 'Cells are adapted for their function. E.g., sperm cells have a tail for swimming, nerve cells are long to carry signals.' },
        { title: 'Light Microscopes', content: 'Use light and lenses to form an enlarged image of a specimen. Can see individual cells and large sub-cellular structures like nuclei.' },
        { title: 'Electron Microscopes', content: 'Use electrons to form an image. Have higher magnification and resolution than light microscopes. Can see tiny sub-cellular structures like ribosomes and mitochondria.' }
      ],
      higher: [
        { title: 'Microscopy', formula: 'Magnification = Image size ÷ Real size', example: 'Image = 10mm, Mag = ×100\nReal size = 10/100 = 0.1mm', tip: 'Always ensure your units (mm, μm) match before dividing!' },
        { title: 'Cell Cycle & Mitosis', content: 'Stage 1: Cell grows and DNA replicates. Stage 2 (Mitosis): Chromosomes pull apart. Stage 3: Cytoplasm divides into two identical daughter cells.' },
        { title: 'Binary Fission', content: 'How bacteria multiply. They can divide once every 20 minutes if conditions are right.', formula: 'Total cells = 2ⁿ (n = number of divisions)' },
        { title: 'Stem Cells', content: 'Undifferentiated cells that can become any type of cell. Found in human embryos and adult bone marrow.', tip: 'Plant stem cells are found in meristems and can differentiate throughout the plant\'s life.' },
        { title: 'Diffusion & Osmosis', content: 'Diffusion: movement of particles from high to low concentration. Osmosis: diffusion of water through a semi-permeable membrane.' },
        { title: 'Active Transport', content: 'Moves substances against the concentration gradient (low to high). Requires ENERGY from respiration.', example: 'Root hair cells absorbing minerals; glucose absorption in the gut.' },
        { title: 'Exchanging Substances', content: 'Specialized exchange surfaces (alveoli in lungs, villi in small intestine) have large surface areas, thin membranes, and good blood supply for efficiency.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => makeMCQ('Which structure is found in BOTH animal and plant cells?', 'Mitochondria', ['Chloroplasts', 'Cell wall', 'Permanent vacuole'], 'The site of aerobic respiration', 'Both cell types need mitochondria for energy release.'),
          () => makeMCQ('What is the function of ribosomes?', 'Protein synthesis', ['Respiration', 'Photosynthesis', 'Storing sap'], 'Where are proteins made?', 'Ribosomes are the site of protein synthesis.'),
          () => {
             const organelle = pick(['Mitochondria', 'Ribosome', 'Nucleus', 'Cell Membrane']);
             const func = organelle === 'Mitochondria' ? 'release energy' : organelle === 'Ribosome' ? 'make protein' : organelle === 'Nucleus' ? 'hold DNA' : 'control what enters/leaves';
             return makeMCQ(`What is the main function of the ${organelle}?`, func, ['photosynthesis', 'making sugar', 'storing water', 'moving the cell'].filter(x => x !== func), `Think about ${organelle}'s role.`, `The ${organelle} is used to ${func}.`);
          }
        ];
        return pick(types)();
      } else {
        const types = [
          () => makeMCQ('Are bacterial cells eukaryotic or prokaryotic?', 'Prokaryotic', ['Eukaryotic', 'Neither'], 'Think about the nucleus', 'Bacteria are prokaryotes because they lack a membrane-bound nucleus.'),
          () => {
            const mg = pick([100, 200, 400, 1000, 1500]);
            const rz = pick([0.01, 0.02, 0.05, 0.005]);
            const units = pick(['mm', 'μm']);
            const val = units === 'mm' ? rz : rz * 1000;
            return makeMCQ(`If a cell's real size is ${val}${units} and the magnification is x${mg}, what is the image size?`, `${(val * mg).toFixed(2)}${units}`, [`${(val * mg * 10).toFixed(2)}${units}`, `${(val * mg / 10).toFixed(2)}${units}`, `${val}${units}`], 'Image = Mag × Real', `Image size = ${mg} × ${val} = ${(val * mg).toFixed(2)}${units}`);
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
        { title: 'Digestive Enzymes', content: 'Amylase (Carbohydrase) → Sugars. Protease → Amino Acids. Lipase → Glycerol and Fatty Acids.' },
        { title: 'The Heart', content: 'A double pump. Right side pumps to lungs (deoxygenated), left side pumps to body (oxygenated). Left ventricle has thicker walls for higher pressure.' },
        { title: 'Blood Components', content: 'Red blood cells (carry oxygen), White blood cells (fight infection), Platelets (clotting), Plasma (liquid transport).' },
        { title: 'Enzyme Action', content: 'The Lock and Key Theory: The active site of an enzyme is a specific shape and only fits one substrate.', tip: 'High temperatures or pH changes can denature enzymes!' },
        { title: 'The Heart Rate', content: 'Controlled by a group of cells in the right atrium wall that act as a pacemaker.', tip: 'Artificial pacemakers are used to correct irregularities in heart rate.' },
        { title: 'Coronary Heart Disease', content: 'Layers of fatty material build up inside coronary arteries, narrowing them. This reduces blood flow and oxygen to the heart muscle.', tip: 'Stents and statins are common medical treatments.' }
      ],
      higher: [
        { title: 'Blood Vessels', content: 'Arteries: thick walls, elastic (high pressure). Veins: thin walls, have VALVES (low pressure). Capillaries: one cell thick for diffusion.' },
        { title: 'Plant Transport (Xylem)', content: 'Transports water and minerals ONE WAY from roots to leaves. Made of dead hollow cells strengthened with lignin.', tip: 'Powered by the transpiration stream.' },
        { title: 'Plant Transport (Phloem)', content: 'Transports dissolved sugars (food) in BOTH directions. This process is called TRANSLOCATION.', example: 'Sugars move from leaves to growing fruits or storage organs.' },
        { title: 'Transpiration', content: 'The loss of water vapour through the stomata of leaves. Factors: light intensity, temperature, air flow, and humidity.', tip: 'Potometers can be used to measure the rate of transpiration.' },
        { title: 'Bile', content: 'Made in the liver, stored in the gall bladder. It neutralises stomach acid and EMULSIFIES fats to increase their surface area for lipase.' },
        { title: 'Food Tests', content: 'Benedict’s (Sugar: Blue → Red), Iodine (Starch: Orange → Black), Biuret (Protein: Blue → Purple), Sudan III (Lipids: Red layer).', tip: 'Remember you must heat the Benedict\'s solution!' },
        { title: 'Metabolism', content: 'The sum of all the reactions in a cell or the body. Energy from respiration is used for enzyme-controlled processes of synthesis.' }
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
        { title: 'Pathogens', content: 'Microorganisms that cause infectious disease. Examples: Viruses, Bacteria, Protists, and Fungi.' },
        { title: 'White Blood Cells', content: 'Defend by: 1. Ingesting pathogens (phagocytosis). 2. Producing antibodies. 3. Producing antitoxins.' },
        { title: 'Viral Diseases', content: 'Measles, HIV, and Tobacco Mosaic Virus (TMV) are important examples for GCSE.', tip: 'Viruses replicate INSIDE cells, making them hard to treat.' },
        { title: 'Bacterial Diseases', content: 'Salmonella and Gonorrhoea. Treated with antibiotics which kill the bacteria.' },
        { title: 'Preventing Infection', content: 'Hand washing, destroying vectors (like mosquitoes), isolation of the sick, and vaccination are key methods to stop spread.' },
        { title: 'Physical Barriers', content: 'Skin (barrier), Nose (mucus/hairs), Trachea/Bronchi (cilia/mucus), Stomach (hydrochloric acid).' }
      ],
      higher: [
        { title: 'Vaccination', content: 'Introducing small quantities of dead or inactive pathogens to stimulate antibody production. If the real pathogen enters, white blood cells respond rapidly.' },
        { title: 'Monoclonal Antibodies', content: 'Antibodies produced from a single clone of cells. Used in pregnancy tests and for targeting specific cancer cells.', tip: 'They are specific to one binding site on an antigen.' },
        { title: 'Antibiotic Resistance', content: 'Mutations mean some bacteria survive treatment. They replicate, spreading the resistant strain.', tip: 'Crucial to finish the full course of antibiotics!' },
        { title: 'Drug Discovery', content: 'Drugs traditionally come from plants (e.g. Digitalis from foxgloves, Aspirin from willow) and fungi (Penicillin). New drugs are tested for toxicity, efficacy, and dose.' },
        { title: 'Plant Defences', content: 'Physical (cell walls), Chemical (antibacterial chemicals), and Mechanical (thorns or hairs) to deter herbivores and pathogens.' }
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
        { title: 'Food Chains', content: 'Producer → Primary Consumer → Secondary Consumer. Arrows show the direction of ENERGY and BIOMASS transfer.' },
        { title: 'Abiotic & Biotic', content: 'Abiotic (Non-living): light, temp, water. Biotic (Living): food availability, predators, new pathogens.', tip: 'Stable communities have a balance between all factors.' },
        { title: 'Competition', content: 'Plants compete for light, space, water, and minerals. Animals compete for food, territory, and mates.' },
        { title: 'Sampling', content: 'Quadrats used for slow/fixed organisms. Transects used to see how distribution changes along a line.', tip: 'Random sampling is vital to avoid bias.' }
      ],
      higher: [
        { title: 'Carbon Cycle', content: 'CO2 removed by photosynthesis. CO2 returned by respiration, decomposition, and combustion of fossil fuels.' },
        { title: 'Water Cycle', content: 'Evaporation, condensation, precipitation, and transpiration work together to move water globally.' },
        { title: 'Trophic Levels', content: 'Level 1: Producers. Level 2: Herbivores. Level 3: Carnivores. Level 4: Top predators (Apex).', tip: 'Pyramids of biomass always get narrower at the top!' },
        { title: 'Energy Transfer', content: 'Only about 10% of biomass is transferred to the next level. Lost via waste, movement, and maintaining body temp.', formula: 'Efficiency = (Output biom / Input biom) x 100' },
        { title: 'Biodiversity', content: 'High biodiversity ensures stability. Threatened by pollution, global warming, and deforestation.' },
        { title: 'Human Impact', content: 'Land use (farming, mining, waste) reduces habitat. Peat bog destruction releases CO2 and reduces biodiversity.', tip: 'Conservation efforts include breeding programs and protected habitats.' },
        { title: 'Environmental Change', content: 'Temperature, water availability, and atmospheric gases can change the distribution of species.', example: 'Bird migration patterns shifting due to global warming.' }
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
        { title: 'The Atom', visualId: 'sci-atomic-model', content: 'Protons (+1 charge, mass 1), Neutrons (0 charge, mass 1), Electrons (-1 charge, very small mass). Protons & neutrons are in the nucleus.' },
        { title: 'Atomic Number', content: 'The number of protons in an atom. In neutral atoms, the number of electrons equals the number of protons.' },
        { title: 'Mass Number', content: 'The total number of protons and neutrons in the nucleus of an atom.', formula: 'Mass = Protons + Neutrons' },
        { title: 'Plum Pudding Model', content: 'Initially atoms were thought to be spheres of positive charge with tiny negative electrons stuck in them.', tip: 'Disproved by Rutherford\'s alpha particle scattering experiment.' }
      ],
      higher: [
        { title: 'Isotopes', content: 'Atoms of the same element with the same number of protons but a DIFFERENT number of neutrons (different mass number).' },
        { title: 'Periodic Table Trends', content: 'Group number = number of outer electrons. Group 1 (alkali metals) get more reactive going down. Group 7 (halogens) get less reactive going down.' },
        { title: 'History of Periodic Table', content: 'Mendeleev left GAPS for yet-to-be-discovered elements and switched items based on properties rather than just atomic mass.', tip: 'Early tables were incomplete and ordered by atomic weight.' },
        { title: 'Noble Gases (Group 0)', content: 'Unreactive non-metals with a full outer shell of electrons. Boiling points increase as you go down the group.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => makeMCQ('What is the electrical charge of a neutron?', '0', ['+1', '-1', '+2'], 'Neutral', 'Neutrons are neutral particles (charge 0).'),
          () => {
             const protons = r(1, 20);
             return makeMCQ(`If an atom has an atomic number of ${protons}, how many protons does it have?`, `${protons}`, [`${protons * 2}`, `${protons + 2}`, '0'], 'Atomic number = Protons', `By definition, the atomic number (${protons}) is the number of protons.`);
          },
          () => {
             const particle = pick(['Proton', 'Electron', 'Neutron']);
             const charge = particle === 'Proton' ? '+1' : particle === 'Electron' ? '-1' : '0';
             return makeMCQ(`What is the relative charge of a ${particle}?`, charge, ['+1', '-1', '0', '+2'].filter(x => x !== charge), 'Check the lesson card table.', `A ${particle} has a relative charge of ${charge}.`);
          }
        ];
        return pick(types)();
      } else {
        const types = [
          () => makeMCQ('Isotopes of an element have a different number of what?', 'Neutrons', ['Protons', 'Electrons', 'Ions'], 'Different mass', 'Isotopes have identical protons but different neutrons.'),
          () => {
             const group = pick(['1', '7']);
             const trend = group === '1' ? 'More reactive' : 'Less reactive';
             return makeMCQ(`How does reactivity change as you go DOWN Group ${group}?`, trend, ['No change', trend === 'More reactive' ? 'Less reactive' : 'More reactive'], 'Think about distance from nucleus.', `Group ${group} getting further from the nucleus makes them ${trend} as you go down.`);
          }
        ];
        return pick(types)();
      }
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
        { title: 'Small Molecules', content: 'Low melting/boiling points because of weak intermolecular forces between molecules.', tip: 'The covalent bonds INSIDE the molecule are strong, but the forces BETWEEN them are weak.' },
        { title: 'Polymers', content: 'Very large molecules where atoms are linked by strong covalent bonds. Intermolecular forces are relatively strong so they are solids at room temp.' }
      ],
      higher: [
        { title: 'Giant Covalent Structures', content: 'Diamond: carbon bonded to 4 others, extremely hard, no free electrons. Graphite: bonded to 3, in layers, conducts electricity because of delocalised electrons.' },
        { title: 'Metallic Bonding', content: 'Positive metal ions in a "sea" of delocalised electrons. These free electrons allow metals to conduct heat and electricity.' },
        { title: 'Alloys', content: 'A mixture of two or more elements, at least one of which is a metal. Harder than pure metals because different sized atoms distort the layers, making them harder to slide.' },
        { title: 'Fullerenes & Nanotubes', content: 'Molecules of carbon with hollow shapes. Graphene is a single layer of graphite one atom thick.', tip: 'Buckminsterfullerene (C60) was the first fullerene to be discovered.' }
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
        const types = [
          () => {
             const compound = pick([
               { n: 'Relative Formula Mass (Mr) of H2O', a: '18', h: 'H=1, O=16', e: '(2*1)+16=18' },
               { n: 'Relative Formula Mass (Mr) of CO2', a: '44', h: 'C=12, O=16', e: '12+(2*16)=44' },
               { n: 'Relative Formula Mass (Mr) of NaCl', a: '58.5', h: 'Na=23, Cl=35.5', e: '23+35.5=58.5' },
               { n: 'Relative Formula Mass (Mr) of CH4', a: '16', h: 'C=12, H=1', e: '12+(4*1)=16' }
             ]);
             return makeMCQ(`Calculate the ${compound.n}. (Ar: ${compound.h})`, compound.a, ['15', '32', '64', '20'].filter(x => x !== compound.a), 'Sum the atomic masses.', compound.e);
          }
        ];
        return pick(types)();
      } else {
        const compounds = [{n:'CO2', mr:44}, {n:'H2O', mr:18}, {n:'NaCl', mr:58.5}, {n:'O2', mr:32}];
        const c = pick(compounds);
        const multiplier = r(1, 5);
        const mass = c.mr * multiplier;
        return makeMCQ(`How many moles in ${mass}g of ${c.n}? (Mr of ${c.n} = ${c.mr})`, `${multiplier}`, [`${multiplier * 2}`, `${multiplier / 2}`, '10'], 'Mass / Mr', `Moles = ${mass} / ${c.mr} = ${multiplier}`);
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
        { title: 'Ocean Formation', content: 'As the Earth cooled, water vapour condensed to form oceans. CO2 dissolved in the water and carbonates were precipitated as sediments.', tip: 'This was the first major step in reducing CO2 levels.' }
      ],
      higher: [
        { title: 'Evolution of Atmosphere', content: 'Algae and plants evolved and decreased CO2 by photosynthesis, while increasing Oxygen. CO2 was also locked up in sedimentary rocks and fossil fuels.' },
        { title: 'Greenhouse Effect', content: 'Greenhouse gases (CO2, methane, water vapour) absorb long wavelength radiation reflected off the Earth, keeping the planet warm.' },
        { title: 'Carbon Footprint', content: 'The total amount of carbon dioxide and other greenhouse gases emitted over the full life cycle of a product, service, or event.' },
        { title: 'Atmospheric Pollutants', content: 'Combustion of fuels releases CO2, water vapour, carbon monoxide, sulfur dioxide, and oxides of nitrogen.', tip: 'Carbon monoxide is toxic, colorless, and odorless—making it very dangerous!' }
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
        { title: 'Dissipated Energy', content: 'Wasted energy that spreads out into the surroundings, usually as thermal energy stores.', tip: 'Lubrication and thermal insulation help reduce dissipation.' },
        { title: 'Energy Resources', content: 'Renewable (wind, solar, tidal) vs Non-renewable (coal, oil, gas, nuclear).', tip: 'Renewables never run out but can be unreliable (e.g. no wind).' }
      ],
      higher: [
        { title: 'Kinetic Energy', formula: 'Ek = ½ m v²', example: 'm=2kg, v=3m/s:\nEk = 0.5 × 2 × 3² = 9 J' },
        { title: 'Gravitational Potential Energy', formula: 'Ep = m g h\n(g = 9.8 N/kg)', example: 'm=2kg, h=5m:\nEp = 2 × 9.8 × 5 = 98 J' },
        { title: 'Efficiency', formula: 'Efficiency = Useful output ÷ Total input', example: 'Input=100J, Useful=40J\nEff = 40/100 = 0.4 (or 40%)' },
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => makeMCQ('What is the Law of Conservation of Energy?', 'Energy cannot be created or destroyed', ['Energy is always lost as heat', 'Energy scales with mass', 'New energy is made in power plants'], 'It only transfers', 'Energy can only be transferred between stores, not created or destroyed.'),
          () => {
             const store = pick(['stretched spring', 'battery', 'hot coffee', 'moving car', 'object on high shelf']);
             const ans = store === 'stretched spring' ? 'Elastic' : store === 'battery' ? 'Chemical' : store === 'hot coffee' ? 'Thermal' : store === 'moving car' ? 'Kinetic' : 'Gravitational';
             return makeMCQ(`Which energy store is increased in a ${store}?`, ans, ['Nuclear', 'Magnetic', 'Electrostatic'].filter(x => x !== ans), 'Think of the property.', `${store} primarily stores ${ans} energy.`);
          }
        ];
        return pick(types)();
      } else {
        const types = [
           () => {
             const mass = r(2, 20);
             const v = r(2, 6);
             const ans = 0.5 * mass * v * v;
             return makeMCQ(`Calculate the Kinetic Energy of a ${mass}kg object moving at ${v} m/s`, `${ans} J`, [`${mass * v} J`, `${mass * v * v} J`, `${ans * 2} J`], 'Ek = 0.5 × m × v^2', `Ek = 0.5 × ${mass} × ${v}² = ${ans} J`);
           },
           () => {
             const mass = r(1, 10);
             const height = r(2, 10);
             const g = 9.8;
             const ans = (mass * g * height).toFixed(1);
             return makeMCQ(`Find the Gravitational Potential Energy (GPE) for a ${mass}kg weight lifted ${height}m. (g=9.8)`, `${ans} J`, [`${(mass*height).toFixed(1)} J`, `${(mass*g).toFixed(1)} J`, '100 J'], 'GPE = m * g * h', `Ep = ${mass} × 9.8 × ${height} = ${ans} J`);
           }
        ];
        return pick(types)();
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
        { title: 'V = I R', visualId: 'sci-circuit-symbols', content: 'Potential difference = Current × Resistance.', formula: 'V = I × R\n(Volts = Amps × Ohms)' },
        { title: 'Series Circuits', content: 'Current (I) is the same everywhere. Potential Difference (V) is shared across components.' },
        { title: 'Resistance Factors', content: 'Resistance increases with the length of a wire and decreases with thickness.', tip: 'Think of water flowing through a pipe!' },
        { title: 'LDRs and Thermistors', content: 'LDR resistance falls in light. Thermistor resistance falls when hot.', tip: 'LDR = Bright light, Low resistance. Thermistor = High temp, Low resistance.' }
      ],
      higher: [
        { title: 'Parallel Circuits', content: 'Current (I) splits down different branches. Potential Difference (V) is the SAME across all branches.' },
        { title: 'Mains Electricity (UK)', content: 'AC (alternating current) supply. Frequency is 50 Hz and voltage is about 230 V.' },
        { title: 'Wire Colours', content: 'Live = Brown, Neutral = Blue, Earth = Green/Yellow stripes.' },
      ],
    },
    generateQuestion: (tier) => {
      const types = [
        () => makeMCQ('In V = I × R, what is V measured in?', 'Volts', ['Amps', 'Ohms', 'Joules'], 'Potential difference unit', 'V is Voltage / Potential difference, measured in Volts.'),
        () => {
          const i = r(1, 5); const res = r(2, 12);
          return makeMCQ(`If Current = ${i}A and Resistance = ${res}Ω, find the Voltage (V)`, `${i * res} V`, [`${i + res} V`, `${res / i} V`, '230 V'], 'V = I × R', `V = ${i} × ${res} = ${i * res}V`);
        },
        () => {
           const v = r(10, 200); const i = r(1, 10);
           return makeMCQ(`If Voltage = ${v}V and Current = ${i}A, calculate Resistance`, `${(v / i).toFixed(1)} Ω`, [`${(v * i).toFixed(1)} Ω`, `${(i / v).toFixed(2)} Ω`, '50 Ω'], 'R = V / I', `R = ${v} / ${i} = ${(v / i).toFixed(1)} Ω`);
        }
      ];
      return pick(types)();
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
        { title: 'Alpha Radiation (α)', visualId: 'sci-radiation-penetration', content: 'A helium nucleus (2 protons, 2 neutrons). Very strongly ionising but weakly penetrating. Stopped by a sheet of paper.' },
        { title: 'Beta Radiation (β)', content: 'A high-speed electron. Stopped by a few mm of aluminium.' },
        { title: 'Gamma Radiation (γ)', content: 'An electromagnetic wave. Weakly ionising but very highly penetrating. Stopped only by thick lead or concrete.' },
      ],
      higher: [
        { title: 'Half-Life', content: 'The time it takes for the number of radioactive nuclei in an isotope to halve. It is constant for any specific isotope.' },
        { title: 'Contamination vs Irradiation', content: 'Irradiation: exposing an object to radiation. Contamination: radioactive particles getting ONTO or INTO an object.' },
      ],
    },
    generateQuestion: (tier) => {
      const types = [
        () => makeMCQ('Which type of radiation is completely stopped by a sheet of paper?', 'Alpha', ['Beta', 'Gamma', 'X-ray'], 'The largest, least penetrating particle', 'Alpha particles are large and easily stopped by paper or skin.'),
        () => {
           const source = r(100, 1000);
           return makeMCQ(`A radioactive source has an activity of ${source} Bq. After 1 half-life, what is the activity?`, `${source / 2} Bq`, [`${source} Bq`, `${source / 4} Bq`, `${source * 2} Bq`], 'Half-life means dividing by 2.', `After one half-life, half the nuclei have decayed, so activity is ${source / 2} Bq.`);
        },
        () => {
           const type = pick(['Alpha', 'Beta', 'Gamma']);
           const stopped = type === 'Alpha' ? 'Paper' : type === 'Beta' ? 'Aluminium' : 'Lead/Concrete';
           return makeMCQ(`What is the minimum material needed to stop ${type} radiation?`, stopped, ['Paper', 'Aluminium', 'Lead/Concrete', 'Air'].filter(x => x !== stopped), `Think about penetration of ${type}.`, `${type} is stopped by ${stopped}.`);
        }
      ];
      return pick(types)();
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
