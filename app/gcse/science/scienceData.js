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
        { title: 'Organelle Functions', content: 'Nucleus (controls cell), Mitochondria (respiration), Ribosomes (protein synthesis), Chloroplasts (photosynthesis), Cell Wall (strength), Vacuole (sap).' },
        { title: 'Cell Specialisation', content: 'Cells are adapted for their function. E.g., sperm cells have a tail for swimming, nerve cells are long to carry signals, root hair cells have large surface area.' },
        { title: 'Light Microscopes', content: 'Use light and lenses to form an enlarged image of a specimen. Can see individual cells and large sub-cellular structures like nuclei.' },
        { title: 'Electron Microscopes', content: 'Use electrons to form an image. Have higher magnification and resolution than light microscopes. Can see tiny sub-cellular structures like ribosomes and mitochondria.' }
      ],
      higher: [
        { title: 'Microscopy', formula: 'Magnification = Image size ÷ Real size', example: 'Image = 10mm, Mag = ×100\nReal size = 10/100 = 0.1mm', tip: 'Always ensure your units (mm, μm) match before dividing!' },
        { title: 'Cell Cycle & Mitosis', content: 'Stage 1: Cell grows and DNA replicates. Stage 2 (Mitosis): Chromosomes pull apart. Stage 3: Cytoplasm divides into two identical daughter cells.', tip: 'Mitosis is used for growth, repair, and asexual reproduction.' },
        { title: 'Binary Fission', content: 'How bacteria multiply by simple division. They can divide once every 20 minutes if conditions are right.', formula: 'Total cells = 2ⁿ (n = number of divisions)' },
        { title: 'Stem Cells', content: 'Undifferentiated cells that can become any type of cell. Found in human embryos and adult bone marrow.', tip: 'Plant stem cells are found in meristems and can differentiate throughout the plant\'s life.' },
        { title: 'Therapeutic Cloning', content: 'Creating an embryo with the same genes as the patient. Stem cells from it won\'t be rejected by the patient\'s body.', tip: 'Ethical issues: many people object to the use of human embryos.' },
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
          },
          () => makeMCQ('What happens in Stage 1 of the cell cycle?', 'DNA replicates and the cell grows', ['Chromosomes pull apart', 'Cytoplasm divides', 'Cell dies'], 'Preparation.', 'The cell must replicate its DNA and increase sub-cellular structures before it can divide.')
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
        { title: 'Sampling', content: 'Quadrats used for slow/fixed organisms. Transects used to see how distribution changes along a line.', tip: 'Random sampling is vital to avoid bias.' },
        { title: 'Adaptations', content: 'Structural (physical features), Behavioural (actions), and Functional (biological processes) that help organisms survive.' }
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

  'bioenergetics': {
    title: 'Bioenergetics',
    emoji: '☀️',
    color: '#00ff94',
    category: 'Biology',
    description: 'Photosynthesis and respiration processes.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'Photosynthesis', content: 'Green plants and algae use light energy to make food (glucose).', formula: 'CO2 + Water (+ Light) → Glucose + Oxygen' },
        { title: 'Limiting Factors', content: 'Factors that slow down photosynthesis: Temperature, Light Intensity, and CO2 Concentration.', tip: 'If you increase light and rate stops increasing, light is no longer the limit.' },
        { title: 'Glucose Uses', content: 'Stored as insoluble starch, used in respiration, made into cellulose for cell walls, and made into proteins.' },
        { title: 'Aerobic Respiration', content: 'Releasing energy from glucose using oxygen. Happens in the mitochondria.', formula: 'Glucose + Oxygen → CO2 + Water (+ Energy)' },
        { title: 'Anaerobic Respiration', content: 'Releasing energy from glucose WITHOUT oxygen. Happens in the cytoplasm.', formula: 'Glucose → Lactic Acid (+ low energy)' }
      ],
      higher: [
        { title: 'Inverse Square Law', content: 'Light intensity is inversely proportional to the square of the distance from the source.', formula: 'I ∝ 1 / d²' },
        { title: 'Metabolism', content: 'The sum of all the reactions in a cell or the body. Controlled by enzymes and using energy from respiration.' },
        { title: 'Anaerobic (Yeast)', content: 'In yeast, anaerobic respiration is called fermentation.', formula: 'Glucose → Ethanol + CO2', tip: 'Used in bread making and alcohol production.' },
        { title: 'The Heart Rate Response', content: 'During exercise, breath volume and heart rate increase to pump more oxygen and glucose to the muscles for respiration.' },
        { title: 'Oxygen Debt', content: 'The amount of extra oxygen needed after exercise to react with built-up lactic acid and remove it from cells.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return pick([
          () => makeMCQ('What are the products of photosynthesis?', 'Glucose and Oxygen', ['Carbon Dioxide and Water', 'Vinegar and Salt', 'Oxygen and Nitrogen'], 'Food and Air.', 'Plants use light to produce glucose and oxygen.'),
          () => makeMCQ('Where does aerobic respiration take place?', 'Mitochondria', ['Nucleus', 'Ribosomes', 'Cell Wall'], 'The powerhouse.', 'Mitochondria are the site of aerobic respiration.')
        ])();
      } else {
        return pick([
          () => makeMCQ('If you double the distance from a light source, what happens to light intensity?', 'It quarters (decreases by 4x)', ['It halves', 'It stays the same', 'It doubles'], 'Inverse Square Law.', 'According to 1/d², doubling distance makes intensity 1/4 (0.25x).'),
          () => makeMCQ('What is "Oxygen Debt"?', 'The extra oxygen needed to break down lactic acid after exercise', ['The amount of CO2 stored in lungs', 'The oxygen used during sleep', 'The oxygen plants give off at night'], 'Paying back the muscles.', 'Oxygen debt is the amount of oxygen required to oxidise lactic acid in the liver.')
        ])();
      }
    },
  },

  'homeostasis': {
    title: 'Homeostasis & Response',
    emoji: '🧠',
    color: '#00ff94',
    category: 'Biology',
    description: 'The nervous system, hormones, and blood glucose control.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'What is Homeostasis?', content: 'The regulation of internal conditions (e.g. temperature, water, blood glucose) to maintain a stable environment in response to changes.' },
        { title: 'Control Systems', content: 'All control systems include: 1. Receptors (detect stimulus). 2. Coordination Centres (process info). 3. Effectors (bring about response).' },
        { title: 'The Nervous System', content: 'Enables humans to react to their surroundings. CNS = Brain and Spinal Cord. Neurones carry electrical impulses.' },
        { title: 'Reflex Actions', content: 'Automatic and rapid responses that do NOT involve the conscious part of the brain. They protect from danger.', tip: 'Reflex Arc: Stimulus → Receptor → Sensory → Relay → Motor → Effector.' },
        { title: 'The Endocrine System', content: 'Glands that secrete hormones (chemical messengers) into the blood.' }
      ],
      higher: [
        { title: 'Blood Glucose Control', content: 'Pancreas produces INSULIN when glucose is high. Glucose moves into cells and liver (as glycogen).', tip: 'Diabetes Type 1: Pancreas fails. Type 2: Cells stop responding.' },
        { title: 'Glucagon (Higher Only)', content: 'Pancreas produces GLUCAGON when glucose is low. Liver converts glycogen back into glucose.', tip: 'Glucagon makes glucose "gone" from the liver into the blood!' },
        { title: 'Human Hormones', content: 'Adrenaline (from Adrenals) for "Fight or Flight". Thyroxine (from Thyroid) to regulate metabolism rate.' },
        { title: 'Reproductive Hormones', content: 'Oestrogen (main female hormone) and Testosterone (main male hormone).', tip: 'FSH causes egg maturation. LH causes ovulation. Progesterone maintains uterus lining.' },
        { title: 'IVF & Contraception', content: 'Hormonal methods (Pill, Patch) vs Barrier methods (Condoms). IVF involves fertility drugs and external fertilisation.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return pick([
          () => makeMCQ('What is the Central Nervous System (CNS) made of?', 'Brain and Spinal Cord', ['Heart and Lungs', 'Muscles and Bones', 'Nerves only'], 'Center of the body.', 'The CNS consists of the brain and the spinal cord.'),
          () => makeMCQ('What is homeostasis?', 'Maintaining a stable internal environment', ['Changing constant body temperature', 'Stopping all chemical reactions', 'Moving the body'], 'Stay the same.', 'Homeostasis keeps internal conditions constant.')
        ])();
      } else {
        return pick([
          () => makeMCQ('Which hormone is released by the pancreas when blood sugar is too high?', 'Insulin', ['Glucagon', 'Adrenaline', 'Oestrogen'], 'Moves sugar into cells.', 'Insulin causes glucose to be removed from the blood and stored.'),
          () => makeMCQ('What is the role of FSH in the menstrual cycle?', 'Causes the egg to mature in the ovary', ['Causes the egg to be released', 'Maintains the womb lining', 'Stops all periods'], 'Follicle Stimulating.', 'FSH stimulates the follicle containing the egg to mature.')
        ])();
      }
    },
  },

  'inheritance': {
    title: 'Inheritance & Evolution',
    emoji: '🧬',
    color: '#00ff94',
    category: 'Biology',
    description: 'DNA, genetic crosses, variation, and natural selection.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'DNA & Genes', content: 'DNA is a double helix molecule. A gene is a small section of DNA that codes for a specific protein.' },
        { title: 'Sexual vs Asexual', content: 'Sexual: 2 parents, fusion of gametes, leads to variation. Asexual: 1 parent, no gametes, results in identical clones.' },
        { title: 'Genetic Crosses', content: 'Alleles are different versions of a gene. Dominant (capital letter) vs Recessive (lowercase).', example: 'Bb x Bb cross often results in a 3:1 ratio of phenotypes.' },
        { title: 'Variation', content: 'Differences in characteristics. Genetic (inherited) vs Environmental (lifestyle/conditions).' },
        { title: 'Natural Selection', content: 'Organisms with characteristics best suited to the environment are more likely to survive and breed.', tip: 'Theory proposed by Charles Darwin.' }
      ],
      higher: [
        { title: 'Meiosis', content: 'Cell division to produce gametes (sperm/egg). It halves the chromosome number and creates 4 non-identical cells.' },
        { title: 'Genome', content: 'The entire genetic material of an organism.', tip: 'The human genome project helps us understand genetic diseases and human migration.' },
        { title: 'Punnett Squares', content: 'Used to predict the probability of offspring inheriting certain traits.', tip: 'A Heterozygous person has two different alleles (e.g. Tt).' },
        { title: 'Evolutionary Trees', content: 'Models used to show how different species are related through a common ancestor.', tip: 'Based on DNA analysis and fossil evidence.' },
        { title: 'Selective Breeding', content: 'Humans breeding plants/animals for specific traits (e.g. high milk yield, large flowers). Leads to reduction in genetic variation.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return pick([
          () => makeMCQ('What is a "Gene"?', 'A section of DNA that codes for a protein', ['The whole set of DNA', 'A type of cell', 'A chemical used in plants'], 'Part of the ladder.', 'A gene is a code for a specific characteristic.'),
          () => makeMCQ('Who proposed the theory of Evolution by natural selection?', 'Charles Darwin', ['Issac Newton', 'Albert Einstein', 'Marie Curie'], 'The Beagle voyage.', 'Darwin published "On the Origin of Species" in 1859.')
        ])();
      } else {
        return pick([
          () => makeMCQ('What is the main difference between Mitosis and Meiosis?', 'Meiosis produces 4 non-identical gametes, Mitosis produces 2 identical clones', ['There is no difference', 'Mitosis is for sex cells only', 'Meiosis happens in the brain'], 'Clones vs Variety.', 'Meiosis creates genetic variety for sexual reproduction.'),
          () => makeMCQ('If both parents are heterozygous (Bb) for brown eyes (B dominant), what is the chance of a blue-eyed child (bb)?', '25% (1 in 4)', ['50% (2 in 4)', '75% (3 in 4)', '100%'], 'Punnett square.', 'In a Bb x Bb cross, the genotypes are BB, Bb, Bb, bb. Blue is bb (1/4).')
        ])();
      }
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
        { title: 'Plum Pudding Model', content: 'Initially atoms were thought to be spheres of positive charge with tiny negative electrons stuck in them.', tip: 'Disproved by Rutherford\'s alpha particle scattering experiment.' },
        { title: 'The Nuclear Model', content: 'Scientists realised the atom has a tiny, dense, positive nucleus where most mass is concentrated, with electrons orbiting it.' }
      ],
      higher: [
        { title: 'Isotopes', content: 'Atoms of the same element with the same number of protons but a DIFFERENT number of neutrons (different mass number).' },
        { title: 'Periodic Table Trends', content: 'Group number = number of outer electrons. Group 1 (alkali metals) get more reactive going down. Group 7 (halogens) get less reactive going down.' },
        { title: 'History of Periodic Table', content: 'Mendeleev left GAPS for yet-to-be-discovered elements and switched items based on properties rather than just atomic mass.', tip: 'Early tables were incomplete and ordered by atomic weight.' },
        { title: 'Noble Gases (Group 0)', content: 'Unreactive non-metals with a full outer shell of electrons. Boiling points increase as you go down the group.' },
        { title: 'Electronic Structure', content: 'Electrons orbit in shells. The 1st shell holds 2, the 2nd and 3rd hold 8.', example: 'Sodium (11) is 2, 8, 1.' }
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
        { title: 'Polymers', content: 'Very large molecules where atoms are linked by strong covalent bonds. Intermolecular forces are relatively strong so they are solids at room temp.' },
        { title: 'States of Matter', content: 'Solid, Liquid, and Gas. Changes of state (melting, boiling) happen at specific temperatures.', tip: 'Physical changes, not chemical ones!' }
      ],
      higher: [
        { title: 'Giant Covalent Structures', content: 'Diamond: carbon bonded to 4 others, extremely hard, no free electrons. Graphite: bonded to 3, in layers, conducts electricity because of delocalised electrons.' },
        { title: 'Metallic Bonding', content: 'Positive metal ions in a "sea" of delocalised electrons. These free electrons allow metals to conduct heat and electricity.' },
        { title: 'Alloys', content: 'A mixture of two or more elements, at least one of which is a metal. Harder than pure metals because different sized atoms distort the layers, making them harder to slide.' },
        { title: 'Graphene', content: 'A single layer of graphite just one atom thick. Incredibly strong and conducts electricity.', tip: 'Potential uses in future electronics and materials.' },
        { title: 'Nanoparticles', content: 'Particles 1–100nm in size. Have a high surface area to volume ratio, giving them unique properties.', tip: 'Used in sunscreens, catalysts, and medicine.' }
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
        { title: 'Conservation of Mass', content: 'No atoms are lost or made during a chemical reaction. The mass of products equals the mass of reactants.' },
        { title: 'Exceptions?', content: 'If mass seems to change, it is usually because a GAS has entered or left the reaction.', tip: 'Mass decreases if a gas is released. Mass increases if a gas from air reacts.' },
        { title: 'Concentrations', content: 'A measure of how much solute is dissolved in a volume of solvent. `Conc = Mass / Volume`.' }
      ],
      higher: [
        { title: 'Moles', formula: 'Moles = Mass / Mr', example: 'Mass = 88g of CO2 (Mr=44)\nMoles = 88 / 44 = 2 moles' },
        { title: 'Avogadro Constant', content: 'One mole of any substance contains 6.02 x 10²³ particles.', tip: 'Mass of 1 mole is the Mr in grams.' },
        { title: 'Limiting Reactants', content: 'The reactant that is completely used up. It sets the limit on how much product can be made.', tip: 'Other reactants are said to be in excess.' },
        { title: 'Percentage Yield', content: 'Amount of product produced compared to the maximum theoretical amount.', formula: 'Yield = (Actual / Theoretical) x 100' },
        { title: 'Atom Economy', content: 'A measure of the amount of starting materials that end up as useful products.', formula: 'Economy = (Mr useful / Mr reactants) x 100' }
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
        const mass = (c.mr * multiplier).toFixed(1);
        return makeMCQ(`How many moles in ${mass}g of ${c.n}? (Mr of ${c.n} = ${c.mr})`, `${multiplier}`, [`${multiplier * 2}`, `${multiplier / 2}`, '10'], 'Mass / Mr', `Moles = ${mass} / ${c.mr} = ${multiplier}`);
      }
    },
  },

  'chemical-changes': {
    title: 'Chemical Changes',
    emoji: '⚗️',
    color: '#00d4ff',
    category: 'Chemistry',
    description: 'Reacting metals, acids, and electrolysis.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'Reactivity Series', content: 'Metals are ordered by reactivity (Potassium, Sodium, Lithium... Gold). Reactive metals lose electrons easily to form positive ions.' },
        { title: 'Metal Extraction', content: 'Carbon can displace metals less reactive than itself from their ores (e.g. Iron). Metals more reactive than carbon must be extracted using electrolysis.' },
        { title: 'Acids & Alkalis', content: 'Acids (pH 1-6) produce H⁺ ions. Alkalis (pH 8-14) produce OH⁻ ions. Neutral is pH 7.' },
        { title: 'Neutralisation', formula: 'Acid + Base → Salt + Water', example: 'HCl + NaOH → NaCl + H2O' },
        { title: 'Making Salts', content: 'Reacting an acid with a metal, metal oxide, or metal carbonate. If carbonate is used, CO2 gas is also produced.' }
      ],
      higher: [
        { title: 'Oxidation & Reduction', content: 'Oxidation = Gain of oxygen or LOSS of electrons. Reduction = Loss of oxygen or GAIN of electrons (OIL RIG).', tip: 'Displacement reactions are always redox reactions.' },
        { title: 'Electrolysis', content: 'Using electricity to split ionic compounds. Positive ions (cations) go to the negative electrode (cathode). Negative ions (anions) go to the positive electrode (anode).' },
        { title: 'Electrolysing Solutions', content: 'In water, Hydrogen is produced at the cathode IF the metal is more reactive than hydrogen.', tip: 'Oxygen is produced at the anode unless halide ions (Cl, Br, I) are present.' },
        { title: 'Half Equations', content: 'Show what happens at each electrode in terms of electrons.', example: 'At cathode: Na⁺ + e⁻ → Na. At anode: 2Cl⁻ → Cl2 + 2e⁻.' },
        { title: 'Aluminium Extraction', content: 'Aluminium oxide is mixed with cryolite to lower its melting point, saving huge amounts of energy during electrolysis.' }
      ],
    },
    generateQuestion: (tier) => {
      return pick([
        () => makeMCQ('What is Oxidation?', 'Loss of electrons', ['Gain of electrons', 'Loss of oxygen', 'No change'], 'OIL RIG.', 'Oxidation is Loss, Reduction is Gain (of electrons).'),
        () => makeMCQ('If a metal is more reactive than carbon, how is it extracted?', 'Electrolysis', ['Heating with carbon', 'Filtering', 'Evaporation'], 'Needs more energy.', 'Metals like Potassium and Aluminium require electrolysis for extraction.'),
        () => makeMCQ('What are the products of Acid + Carbonate?', 'Salt + Water + Carbon Dioxide', ['Salt + Water', 'Salt + Hydrogen', 'Acid + Base'], 'Carbonates make gas.', 'Carbonates always release CO2 when reacting with acids.')
      ])();
    },
  },

  'energy-changes': {
    title: 'Energy Changes',
    emoji: '🔥',
    color: '#00d4ff',
    category: 'Chemistry',
    description: 'Exothermic and endothermic reactions.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'Exothermic Reactions', content: 'Give out energy to the surroundings, so the temperature of the surroundings increases.', example: 'Combustion, neutralisation, hand warmers.' },
        { title: 'Endothermic Reactions', content: 'Take in energy from the surroundings, so the temperature of the surroundings decreases.', example: 'Thermal decomposition, sports injury ice packs.' },
        { title: 'Activation Energy', content: 'The minimum amount of energy that particles must have to react when they collide.' },
        { title: 'Reaction Profiles', content: 'Diagrams showing the energy level of reactants vs products. In EXOthermic, products have LOWER energy than reactants.' }
      ],
      higher: [
        { title: 'Bond Energies', content: 'Energy is NEEDED to break bonds (Endo). Energy is RELEASED when bonds are made (Exo).', tip: 'Overall energy change = Energy in - Energy out.' },
        { title: 'Fuel Cells', content: 'Hydrogen and Oxygen react to produce electricity and water. They are potentially 100% efficient and produce no pollutants.', tip: 'Used on space missions to provide power and drinking water!' },
        { title: 'Chemical Cells', content: 'Reacting two different metals in an electrolyte produces a potential difference (voltage).', tip: 'The greater the difference in reactivity, the higher the voltage.' }
      ],
    },
    generateQuestion: (tier) => {
      const q = [
        () => makeMCQ('Which reaction gives out heat to the surroundings?', 'Exothermic', ['Endothermic', 'Neutral', 'Isothermic'], 'Heat exit.', 'Exo- means out (like exit), thermic means heat.'),
        () => makeMCQ('Breaking chemical bonds is an...', 'Endothermic process', ['Exothermic process', 'Isotope process'], 'Needs energy to snap.', 'Supplying energy to break bonds is endothermic.'),
      ];
      return pick(q)();
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
        { title: 'Ocean Formation', content: 'As the Earth cooled, water vapour condensed to form oceans. CO2 dissolved in the water and carbonates were precipitated as sediments.', tip: 'This was the first major step in reducing CO2 levels.' },
        { title: 'Greenhouse Gases', content: 'Methane, CO2, and Water Vapour. They help maintain temperatures on Earth high enough to support life.' },
        { title: 'Climate Change', content: 'Caused by human activities like burning fossil fuels (CO2) and cattle farming (Methane). Leads to melting ice caps and extreme weather.' }
      ],
      higher: [
        { title: 'Evolution of Atmosphere', content: 'Algae and plants evolved and decreased CO2 by photosynthesis, while increasing Oxygen. CO2 was also locked up in sedimentary rocks and fossil fuels.' },
        { title: 'The Greenhouse Effect', content: 'Gases let short wavelength radiation pass through, but absorb reflected long wavelength (thermal) radiation from the Earth.', tip: 'This traps heat energy in the atmosphere.' },
        { title: 'Climate Change Evidence', content: 'Scientists believe global warming is caused by humans based on peer-reviewed evidence. But it is complex, leading to simplified/biased media models.', tip: 'Avoid using words like "certainty" in exams; use "high probability".' },
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

  'rates-of-change': {
    title: 'Rates & Organic',
    emoji: '⌛',
    color: '#00d4ff',
    category: 'Chemistry',
    description: 'Factors affecting rate and basics of crude oil.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'Calculating Rates', content: 'Rate = Amount of Reactant used ÷ Time\nor Amount of Product formed ÷ Time.' },
        { title: 'Collision Theory', content: 'Chemical reactions only happen when particles collide with enough energy (Activation Energy).' },
        { title: 'Factors of Rate', content: 'Concentration/Pressure, Surface Area, Temperature, and Catalysts. Higher = Faster collisions.' },
        { title: 'Organic: Crude Oil', content: 'A finite resource found in rocks. It is the remains of ancient biomass (mainly plankton) buried in mud.' },
        { title: 'Alkanes', content: 'Most of the hydrocarbons in crude oil are alkanes. CnH2n+2. Methane (C1), Ethane (C2), Propane (C3), Butane (C4).', tip: 'Monkeys Eat Peanut Butter!' }
      ],
      higher: [
        { title: 'Catalysts', content: 'Speeds up a reaction by providing an alternative pathway with a LOWER activation energy. They are NOT used up in the reaction.' },
        { title: 'Fractional Distillation', content: 'Separating crude oil into useful fractions based on their boiling points.', tip: 'Heavy fractions have high boiling points and condensed at the bottom.' },
        { title: 'Cracking Hydrocarbons', content: 'Breaking down long-chain hydrocarbons into shorter, more useful ones (alkanes and alkenes). Use heat and a catalyst.' },
        { title: 'Alkenes', content: 'Hydrocarbons with a double carbon-carbon bond (C=C). More reactive than alkanes. Test with bromine water: it turns from orange to colorless.', tip: 'Alkenes are Used to make polymers (plastics).' },
        { title: 'Equilibrium (Higher Only)', content: 'In a closed system, a reversible reaction reaches a state where forward and backward reactions happen at the same rate.', tip: 'Le Chatelier’s principle: the system will shift to counteract any change.' }
      ],
    },
    generateQuestion: (tier) => {
      const q = [
        () => makeMCQ('What happens to the rate of reaction if you increase temperature?', 'It increases', ['It decreases', 'It stays the same', 'It stops'], 'Particles move faster.', 'Higher temperature means more frequent and more energetic collisions.'),
        () => makeMCQ('What is the general formula for Alkanes?', 'CnH2n+2', ['CnH2n', 'CnHn', 'C2H4'], 'Single bonds.', 'Alkanes follow CnH(2n+2).'),
        () => makeMCQ('What is used to test for an ALKENE?', 'Bromine water', ['Limewater', 'Glowing splint', 'Iodine'], 'Orange to colorless.', 'Alkenes turn bromine water colorless (decolorise it).')
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
        { title: 'Energy Resources', content: 'Renewable (wind, solar, tidal) vs Non-renewable (coal, oil, gas, nuclear).', tip: 'Renewables never run out but can be unreliable (e.g. no wind).' },
        { title: 'Power', content: 'The rate at which energy is transferred or work is done. `Power = Energy / Time`. Measured in WATTS (W).', tip: '1 Watt = 1 Joule per second.' }
      ],
      higher: [
        { title: 'Kinetic Energy', formula: 'Ek = ½ m v²', example: 'm=2kg, v=3m/s:\nEk = 0.5 × 2 × 3² = 9 J' },
        { title: 'Gravitational Potential Energy', formula: 'Ep = m g h\n(g = 9.8 N/kg)', example: 'm=2kg, h=5m:\nEp = 2 × 9.8 × 5 = 98 J' },
        { title: 'Work Done', formula: 'Work = Force × Distance', example: 'F=10N, d=5m\nWork = 50 J' },
        { title: 'Efficiency', formula: 'Efficiency = Useful output ÷ Total input', example: 'Input=100J, Useful=40J\nEff = 40/100 = 0.4 (or 40%)' },
        { title: 'Heating and SHC', content: 'Raising the temp of an object requires more energy if it has a high Specific Heat Capacity (SHC).', formula: '∆E = m c ∆θ', tip: 'Water has a very high SHC, which is why it is used in central heating.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => makeMCQ('What is the Law of Conservation of Energy?', 'Energy cannot be created or destroyed', ['Energy is always lost as heat', 'Energy scales with mass', 'New energy is made in power plants'], 'It only transfers', 'Energy can only be transferred between stores, not created or destroyed.'),
          () => makeMCQ('What unit is Power measured in?', 'Watts', ['Joules', 'Newtons', 'Volts'], 'W.', 'Power is the rate of energy transfer, measured in Watts.'),
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
        { title: 'The Basics: V = I R', visualId: 'sci-circuit-symbols', content: 'Potential difference = Current × Resistance.', formula: 'V = I × R\n(Volts = Amps × Ohms)' },
        { title: 'Circuit Symbols', content: 'Ammeter (measures current), Voltmeter (measures voltage), Resistor (controls current), Switch (turns circuit on/off).', tip: 'Ammeters are ALWAYS in series; Voltmeters are ALWAYS in parallel.' },
        { title: 'Series Circuits', content: 'Current (I) is the same everywhere. Potential Difference (V) is shared across components.' },
        { title: 'Resistance Factors', content: 'Resistance increases with the length of a wire and decreases with thickness.', tip: 'Think of water flowing through a pipe!' },
        { title: 'Plugs & Fuses', content: 'Plugs have an earth wire for safety. Fuses melt if the current is too high, breaking the circuit.', tip: 'Choose a fuse slightly higher than the normal working current.' }
      ],
      higher: [
        { title: 'Parallel Circuits', content: 'Current (I) splits down different branches. Potential Difference (V) is the SAME across all branches.' },
        { title: 'LDRs and Thermistors', content: 'LDR resistance falls in light. Thermistor resistance falls when hot.', tip: 'LDR = Bright light, Low resistance. Thermistor = High temp, Low resistance.' },
        { title: 'Mains Electricity (UK)', content: 'AC (alternating current) supply. Frequency is 50 Hz and voltage is about 230 V.' },
        { title: 'Static Electricity', content: 'Occurs when insulating materials are rubbed together. Electrons move from one to the other.', tip: 'Unbalanced charges produce electric fields.' },
        { title: 'The National Grid', content: 'A system of cables and transformers. Step-up transformers increase voltage (reducing current/heat loss). Step-down transformers decrease voltage for homes.' }
      ],
    },
    generateQuestion: (tier) => {
      const types = [
        () => makeMCQ('In V = I × R, what is V measured in?', 'Volts', ['Amps', 'Ohms', 'Joules'], 'Potential difference unit', 'V is Voltage / Potential difference, measured in Volts.'),
        () => makeMCQ('What color is the Earth wire in a UK plug?', 'Green and Yellow stripes', ['Brown', 'Blue', 'Red'], 'Safety colors.', 'The Earth wire is always green and yellow stripes.'),
        () => {
          const i = r(1, 5); const res = r(2, 12);
          return makeMCQ(`If Current = ${i}A and Resistance = ${res}Ω, find the Voltage (V)`, `${i * res} V`, [`${i + res} V`, `${res / i} V`, '230 V'], 'V = I × R', `V = ${i} × ${res} = ${i * res}V`);
        },
      ];
      return pick(types)();
    },
  },

  'forces-motion': {
    title: 'Forces & Motion',
    emoji: '🏃',
    color: '#b14aed',
    category: 'Physics',
    description: 'Speed, acceleration, and Newton\'s laws.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'Scalar vs Vector', content: 'Scalars have magnitude (size) only (e.g. speed, distance). Vectors have magnitude AND direction (e.g. velocity, force).' },
        { title: 'Weight vs Mass', content: 'Mass (kg) is the amount of matter. Weight (N) is the force of gravity on that mass.', formula: 'W = m × g (g=9.8 on Earth)' },
        { title: 'Velocity', content: 'Speed in a given direction.', example: '60 mph North is a velocity; 60 mph is a speed.' },
        { title: 'Newton\'s First Law', content: 'An object remains at rest or constant velocity unless an external force acts on it.', tip: 'If forces are balanced, the object doesn\'t change its motion.' },
        { title: 'Distance-Time Graphs', content: 'Gradient = Speed. Flat line = Stationary. Steeper line = Moving faster.' }
      ],
      higher: [
        { title: 'Acceleration', formula: 'a = ∆v / t', example: 'v changes from 0 to 10 in 2s:\na = 10 / 2 = 5 m/s²' },
        { title: 'Velocity-Time Graphs', content: 'Gradient = Acceleration. Area under the graph = Distance travelled.', tip: 'A flat line on a V-T graph means constant velocity (not stationary!).' },
        { title: 'Newton\'s Second Law', formula: 'F = m × a', example: 'm=10kg, a=2m/s²\nF = 20 N' },
        { title: 'Terminal Velocity', content: 'The constant speed reached by a falling object when weight is balanced by air resistance.', tip: 'Acceleration is zero at terminal velocity.' },
        { title: 'Momentum', formula: 'p = m × v', tip: 'Momentum is always conserved in a collision (in a closed system).' }
      ],
    },
    generateQuestion: (tier) => {
      const q = [
        () => makeMCQ('What is the difference between speed and velocity?', 'Velocity has a direction, speed doesn\'t', ['Speed is faster than velocity', 'They are the same', 'Velocity is only for cars'], 'Scalar vs Vector.', 'Velocity is a vector quantity (magnitude and direction).'),
        () => makeMCQ('What is the formula for Weight?', 'W = m × g', ['W = m ÷ g', 'W = F × d', 'W = m × a'], 'Force of gravity.', 'Weight = Mass × Gravity.'),
        () => makeMCQ('In a Distance-Time graph, what does the gradient represent?', 'Speed', ['Acceleration', 'Time', 'Force'], 'Steepness.', 'The gradient of a D-T graph equals the speed.')
      ];
      return pick(q)();
    },
  },

  'waves': {
    title: 'Waves',
    emoji: '🌊',
    color: '#b14aed',
    category: 'Physics',
    description: 'Transverse, longitudinal, and the EM spectrum.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'Wave Types', content: 'Transverse: Oscillations are perpendicular to energy transfer (e.g. Light, Water). Longitudinal: Oscillations are parallel to energy transfer (e.g. Sound).' },
        { title: 'Wave Properties', content: 'Amplitude (height), Wavelength (peak to peak), Frequency (waves per second).', tip: 'Period = 1 ÷ Frequency.' },
        { title: 'Wave Speed', formula: 'Speed = Frequency × Wavelength\n(v = f × λ)', tip: 'Units: f (Hz), λ (m).' },
        { title: 'Reflection', content: 'Angle of incidence = Angle of reflection.', tip: 'Smooth surfaces like mirrors give specular reflection.' }
      ],
      higher: [
        { title: 'Electromagnetic (EM) Spectrum', content: 'Waves that do not need a medium to travel. All travel at 3 x 10⁸ m/s in vacuum.', tip: 'Radio, Micro, Infra, Visible, UV, X-ray, Gamma (increasing frequency).' },
        { title: 'Refraction', content: 'Waves change direction when they enter a medium of different density because their SPEED changes.', tip: 'Denser medium = Slower speed = Bends TOWARDS the normal.' },
        { title: 'EM Wave Hazards', content: 'UV (eye damage, skin cancer), X-rays & Gamma (ionising radiation, mutation of genes).', tip: 'Benefits: UV (tan), X-rays (medical imaging), Gamma (treating cancer).' },
        { title: 'Lenses', content: 'Convex (converges light, used for farsightedness) vs Concave (diverges light, used for nearsightedness).', tip: 'Magnification = Image height / Object height.' }
      ],
    },
    generateQuestion: (tier) => {
      return pick([
        () => makeMCQ('Which type of wave is a sound wave?', 'Longitudinal', ['Transverse', 'Electromagnetic', 'Gamma'], 'Pushes and pulls.', 'Sound is longitudinal; light is transverse.'),
        () => makeMCQ('What is the formula for wave speed?', 'v = f × λ', ['v = f ÷ λ', 'v = a × t', 'v = d ÷ t'], 'Hz * m.', 'Wave speed = Frequency × Wavelength.'),
        () => makeMCQ('Which EM wave has the highest frequency?', 'Gamma rays', ['Radio waves', 'Visible light', 'Microwaves'], 'Most energy.', 'Gamma rays are at the high-frequency end of the spectrum.')
      ])();
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
    }
  },

  'space-physics': {
    title: 'Space Physics (Higher)',
    emoji: '🚀',
    color: '#b14aed',
    category: 'Physics',
    description: 'The solar system, life cycle of stars, and red-shift.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'The Solar System', content: 'One Star (Sun), eight planets, dwarf planets, moons (natural satellites), and artificial satellites.' },
        { title: 'Our Galaxy', content: 'The Sun is one of billions of stars in the Milky Way galaxy.' }
      ],
      higher: [
        { title: 'Life Cycle of Stars', content: 'Protostar → Main Sequence → then either (Red Giant → White Dwarf → Black Dwarf) or (Red Super Giant → Supernova → Neutron Star or Black Hole).', tip: 'All stars start from a cloud of dust and gas called a NEBULA.' },
        { title: 'Fission & Fusion', content: 'Fusion: Joining nuclei (stars). Fission: Splitting nuclei (power plants). Fusion produces the energy in stars.', tip: 'Main sequence stars are in equilibrium between gravity pulling in and radiation pressure pushing out.' },
        { title: 'Circular Orbits', content: 'Gravity provides the force that keeps planets and satellites in orbit. If speed changes, the radius of the orbit must change to stay stable.' },
        { title: 'Red-Shift', content: 'The increase in wavelength of light from distant galaxies. Shows that galaxies are moving away from us and the universe is expanding.', tip: 'The further away the galaxy, the faster it is moving and the larger the red-shift.' },
        { title: 'The Big Bang', content: 'The theory that the universe began from a very small, hot, and dense region. Supported by red-shift and cosmic microwave background radiation.' }
      ],
    },
    generateQuestion: (tier) => {
      const q = [
        () => makeMCQ('What provide the energy in stars?', 'Nuclear Fusion', ['Nuclear Fission', 'Burning coal', 'Friction'], 'Joining hydrogen', 'Nuclear fusion of hydrogen into helium releases energy in stars.'),
        () => makeMCQ('What happens to stars much larger than our Sun at the end of their life?', 'They explode in a Supernova', ['They become black dwarfs', 'They just fade away', 'They turn into planets'], 'Big finish.', 'Large stars end in a supernova, leaving a neutron star or black hole.'),
        () => makeMCQ('What is Red-Shift evidence for?', 'The expansion of the universe', ['The universe is shrinking', 'Stars are cooling down', 'Planets are forming'], 'Moving away.', 'Red-shift shows galaxies are moving away, supporting the Big Bang theory.')
      ];
      return pick(q)();
    }
  },

  'organic-chemistry-advanced': {
    title: 'Advanced Organic (Higher)',
    emoji: '🧪',
    color: '#00d4ff',
    category: 'Chemistry',
    description: 'Alcohols, carboxylic acids, esters, and addition polymers.',
    hubPath: '/gcse/science',
    backLabel: 'Back to Science',
    lessons: {
      foundation: [
        { title: 'Alcohols', content: 'Contain the -OH group. Ethanol is the best known. Used as fuels and solvents.', formula: 'CnH2n+1OH' },
        { title: 'Carboxylic Acids', content: 'Contain the -COOH group. Vinegar contains ethanoic acid. They are weak acids (pH 3-5).' }
      ],
      higher: [
        { title: 'Addition Polymerisation', content: 'Alkenes (monomers) join together to form a long chain (polymer). The double bond breaks to link them.', tip: 'Poly(ethene) is made from ethene.' },
        { title: 'Condensation Polymerisation', content: 'Monomers join and a small molecule (like water) is lost as a byproduct.', example: 'Polyester is a condensation polymer.' },
        { title: 'Esters', content: 'Formed by reacting an alcohol with a carboxylic acid.', formula: 'Acid + Alcohol → Ester + Water', tip: 'Esters smell fruity and are used in perfumes and sweets.' },
        { title: 'DNA & Proteins', content: 'DNA is a natural polymer made of four different monomers called nucleotides. Proteins are polymers made of amino acids.' }
      ],
    },
    generateQuestion: (tier) => {
      const q = [
        () => makeMCQ('Which functional group do Alcohols contain?', '-OH', ['-COOH', '-C=C-', '-C-O-C'], 'Hydroxyl', 'Alcohols have the -OH functional group.'),
        () => makeMCQ('What is the byproduct of condensation polymerisation?', 'A small molecule like water', ['Heat', 'Oxygen', 'A metal'], 'Lost something.', 'Condensation polymerisation releases a small molecule, usually water or HCl.'),
      ];
      return pick(q)();
    }
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
