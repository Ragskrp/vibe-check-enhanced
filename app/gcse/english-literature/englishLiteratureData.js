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
  // SHAKESPEARE
  // ==============================================================
  'macbeth': {
    title: 'Macbeth',
    emoji: '👑',
    color: '#ff2d78',
    category: 'Shakespeare',
    description: 'Analyzing themes of ambition, guilt, and the supernatural.',
    lessons: {
      foundation: [
        { title: 'The Plot Overview', content: 'Macbeth, a Scottish general, receives a prophecy from three witches that he will become King. Driven by ambition and his wife, he kills King Duncan.' },
        { title: 'Key Characters', content: 'Macbeth (ambitious but guilt-ridden), Lady Macbeth (manipulative at first, then broken by guilt), The Witches (supernatural catalysts).' },
        { title: 'Imagery of Blood', content: 'Blood represents guilt in the play. "Will all great Neptune\'s ocean wash this blood clean from my hand?"', tip: 'Look for where blood is mentioned after a murder.' },
        { title: 'The Theme of Ambition', content: 'Ambition is Macbeth\'s "fatal flaw" (hamartia). It leads him to greatness but also to his eventual downfall.' }
      ],
      higher: [
        { title: 'AO2: Structural Hubris', content: 'How Macbeth\'s confidence grows after the second set of prophecies, leading to his overconfidence (hubris).', tip: 'Analyze how he misinterprets the "no man of woman born" prophecy.' },
        { title: 'AO2: Lady Macbeth\'s Descent', content: 'Analyze the contrast between her early strength ("unsex me here") and her later madness ("out, damned spot").', tip: 'How does her language change from verse to prose?' },
        { title: 'AO3: The Supernatural Context', content: 'King James I\'s obsession with witches and the "Divine Right of Kings". Macbeth killing a king was seen as a crime against God.', tip: 'Mention the "Great Chain of Being" in your exam.' },
        { title: 'Kingship vs Tyranny', content: 'Contrast Duncan and Edward the Confessor (good kings) with Macbeth (a tyrant). What makes a ruler "holy" vs "evil"?' }
      ],
    },
    generateQuestion: () => {
      const types = [
        () => makeMCQ('Who said "Out, damned spot!"?', 'Lady Macbeth', ['Macbeth', 'Banquo', 'The Witches'], 'She is sleepwalking.', 'Lady Macbeth says this while trying to "wash" imaginary blood from her hands in Act 5.'),
        () => makeMCQ('What is Macbeth\'s "fatal flaw"?', 'Ambition', ['Cowardice', 'Greed', 'Laziness'], 'His desire for power.', 'Ambition (unvaulting ambition) is the driving force that leads to his ruin.')
      ];
      return pick(types)();
    },
  },

  'romeo-and-juliet': {
    title: 'Romeo & Juliet',
    emoji: '⚔️',
    color: '#ff2d78',
    category: 'Shakespeare',
    description: 'Love, conflict, and fate in Verona.',
    lessons: {
      foundation: [
        { title: 'The Feud', content: 'The ancient grudge between the Capulets and Montagues. "Two households, both alike in dignity..."', tip: 'Look at how the feud starts with servants, showing it affects everyone.' },
        { title: 'Romeo and Juliet', content: '"Star-crossed lovers." Their love is intense, sudden, and ultimately tragic.', example: '"My only love sprung from my only hate!"' },
        { title: 'Key Characters', content: 'Tybalt (fiery Montague-hater), Mercutio (playful and sharp-tongued), The Nurse, Friar Lawrence.' },
        { title: 'The Ending', content: 'The deaths of Romeo and Juliet finally bring the feud to an end, showing the high cost of hate.' }
      ],
      higher: [
        { title: 'AO2: The Role of Fate', content: 'Is their death an accident or destiny? Reference "star-crossed" and the series of unfortunate timings.', tip: 'Analyze how the "Prologue" gives away the ending to build tension.' },
        { title: 'AO2: Light and Dark Imagery', content: 'Juliet is the "sun", Romeo is "day in night". Their love exists in the darkness but is snuffed out by the light of day (social reality).', tip: 'Look for "oxymorons" used by Romeo early in the play.' },
        { title: 'AO3: Masculinity and Honor', content: 'Analyze Mercutio and Tybalt\'s obsession with honor and how it forces Romeo to fight.', tip: 'Compare Romeo\'s "effeminate" love with Tybalt\'s "rat-catcher" aggression.' },
        { title: 'Religious Language', content: 'Their first meeting uses metaphors of saints, pilgrims, and shrines. Their love is presented as something holy or transcendent.' }
      ],
    },
    generateQuestion: () => makeMCQ('Who said "A plague o\' both your houses!"?', 'Mercutio', ['Romeo', 'Tybalt', 'Juliet'], 'He dies in Act 3.', 'Mercutio says this as he dies, blaming the feud for his death.')
  },

  'the-tempest': {
    title: 'The Tempest',
    emoji: '🌀',
    color: '#ff2d78',
    category: 'Shakespeare',
    description: 'Colonialism, magic, and forgiveness on a remote island.',
    lessons: {
      foundation: [
        { title: 'Prospero', content: 'The rightful Duke of Milan who was usurped by his brother and stranded on an island. He uses magic to control everything and everyone.' },
        { title: 'The Shipwreck', content: 'Prospero uses a magic storm (the Tempest) to bring his enemies to the island so he can get his revenge.' },
        { title: 'Caliban and Ariel', content: 'Prospero’s two servants. Caliban is the native of the island (earthly/wild); Ariel is a spirit (airy/magical).' },
        { title: 'Forgiveness', content: 'In the end, Prospero chooses to forgive his enemies rather than kill them. "The rarer action is in virtue than in vengeance."' }
      ],
      higher: [
        { title: 'AO3: Post-Colonial Analysis', content: 'How Caliban represents the indigenous people colonized by Europeans (Prospero). "You taught me language; and my profit on\'t is, I know how to curse."', tip: 'Analyze the ownership of the island.' },
        { title: 'Nature vs Nurture', content: 'Prospero calls Caliban a "born devil, on whose nature nurture can never stick." Is Caliban evil by birth or because of how he was treated?' },
        { title: 'AO2: The Power of Magic', content: 'Magic as an allegory for the theater. Prospero is like a director, controlling the "actors" on his island stage.', tip: 'Reference the famous "We are such stuff as dreams are made on" speech.' },
        { title: 'Usurpation and Order', content: 'How the breaking of the "Great Chain of Being" (Antonio stealing the dukedom) is restored by the end of the play.' }
      ],
    },
    generateQuestion: () => makeMCQ('Who is the native inhabitant of the island before Prospero arrives?', 'Caliban', ['Ariel', 'Ferdinand', 'Miranda'], 'He claims the island is his.', 'Caliban is the son of Sycorax and the original inhabitant of the island.')
  },

  // ==============================================================
  // 19TH CENTURY NOVEL
  // ==============================================================
  'christmas-carol': {
    title: 'A Christmas Carol',
    emoji: '👻',
    color: '#b14aed',
    category: '19th Century Novel',
    description: 'Redemption, social conscience, and the spirit of Christmas.',
    lessons: {
      foundation: [
        { title: 'Scrooge', content: 'A "squeezing, wrenching, grasping, scraping, clutching, covetous, old sinner!" At first, he is "as solitary as an oyster."', tip: 'Note the contrast at the end: "as light as a feather".' },
        { title: 'The Three Ghosts', content: 'Christmas Past (Memory), Present (Empathy), and Yet to Come (Fear/Consequence).', tip: 'Each ghost teaches Scrooge a different lesson.' },
        { title: 'The Cratchits', content: 'Tiny Tim and Bob Cratchit represent the "deserving poor." They are happy despite their poverty because they have love.' },
        { title: 'Marley\'s Ghost', content: '"I wear the chain I forged in life." A warning to Scrooge of the afterlife consequences of selfishness.' }
      ],
      higher: [
        { title: 'AO3: Dickens’ Social Commentary', content: 'Dickens used the novella to attack the "Poor Laws" and the idea that the poor should be left to suffer or die to "reduce the surplus population."', tip: 'Mention the Malthusian theory of population in your answer.' },
        { title: 'AO2: Ignorance and Want', content: 'The two children hidden under the Ghost of Christmas Present\'s robes. "Beware them both... but most of all beware this boy (Ignorance)."', tip: 'They represent the systemic issues causing poverty.' },
        { title: 'Structure: Staves', content: 'The book is written in "Staves" like a song. This reinforces the "Carol" title and the joyful transformation of Scrooge.', tip: 'Each stave represents a specific phase of redemption.' },
        { title: 'Metamorphosis', content: 'Analyze how Scrooge\'s language shifts from "humbug" to "I am as giddy as a drunken man!"', tip: 'The physical changes in his environment reflect his internal change.' }
      ],
    },
    generateQuestion: () => makeMCQ('What does "surplus population" refer to?', 'The idea that there were too many poor people', ['The number of ghosts', 'Wealthy people', 'The amount of food around'], 'A cold, economic view.', 'The phrase targets the Malthusian view that poverty was a necessary check on population growth.')
  },

  'jekyll-and-hyde': {
    title: 'Dr Jekyll & Mr Hyde',
    emoji: '🧪',
    color: '#b14aed',
    category: '19th Century Novel',
    description: 'The duality of man and Victorian morality.',
    lessons: {
      foundation: [
        { title: 'The Plot Summary', content: 'Dr Jekyll creates a potion to separate his good and evil sides, inadvertently creating the monstrous Mr Hyde.' },
        { title: 'The Theme of Duality', content: 'The idea that every human has "two natures" - a civilized, respectable side and a repressed, animalistic side.' },
        { title: 'Mr Hyde\'s Description', content: 'Hyde is described as "deformed", "dwarfish", and "troglodytic". He triggers an instinctive hatred in everyone he meets.' },
        { title: 'Victorian Reputation', content: 'Being "respectable" was everything in Victorian London. Jekyll is terrified of his secret being discovered.' }
      ],
      higher: [
        { title: 'Freudian Analysis', content: 'Linking Jekyll to the "Ego" and Hyde to the "Id" (primitive desires).', tip: 'Hyde represents the parts of our personality we hide from society.' },
        { title: 'AO2: The Narrative Structure', content: 'The story is a "mystery" told through different perspectives (Utterson, Lanyon, and finally Jekyll himself).', tip: 'Why does Stevenson delay Jekyll\'s confession until the very last chapter?' },
        { title: 'AO3: Scientific Anxiety', content: 'Darwin\'s "Origin of Species" created a fear that humans could "de-evolve" back into animals. Hyde is often described in animalistic terms.', tip: 'Use the term "Atavism"—the fear of regressing to a primitive state.' },
        { title: 'Setting as Symbolism', content: 'Contrast Jekyll\'s grand house with the "sinister" back door that Hyde uses. They represent the two faces of London.' }
      ],
    },
    generateQuestion: () => makeMCQ('Which character is the "detective" figure in the novel?', 'Gabriel Utterson', ['Dr Lanyon', 'Mr Poole', 'Sir Danvers Carew'], 'He is a lawyer.', 'Mr Utterson is the rational, law-abiding friend who investigates the mystery of Hyde.')
  },

  'frankenstein': {
    title: 'Frankenstein',
    emoji: '🧟',
    color: '#b14aed',
    category: '19th Century Novel',
    description: 'Science, nature, and the dangers of playing God.',
    lessons: {
      foundation: [
        { title: 'Victor Frankenstein', content: 'A scientist who uncovers the secret to creating life. He creates a monster out of dead body parts.' },
        { title: 'The Creature', content: 'Victor\'s creation. It starts out innocent and wants love, but turns violent after being rejected by Victor and society.' },
        { title: 'The Frame Narrative', content: 'The story is told through letters from Robert Walton (an explorer) who finds Victor in the Arctic.', tip: 'This adds mystery and multiple perspectives.' },
        { title: 'Responsibility', content: 'Victor fails to take responsibility for his creation, leading to the deaths of his loved ones.' }
      ],
      higher: [
        { title: 'AO3: Promethean Hubris', content: 'The subtitle is "The Modern Prometheus." Victor is like the Greek god who stole fire, suffering eternally for "playing God."', tip: 'Relate this to the scientific advancements of the 19th century.' },
        { title: 'The Noble Savage', content: 'Rousseau\'s theory that humans are born good but corrupted by society. The Creature learns to be "evil" because of human cruelty.', tip: 'Analyze the Creature\'s education in the hovel.' },
        { title: 'AO2: The Sublime Nature', content: 'Shelley uses the grandeur of the Alps and the Arctic to show nature\'s power compared to man\'s fragility.', tip: 'Victor often retreats into nature to heal, but the monster follows him there.' },
        { title: 'Duality: Victor and Monster', content: 'The idea that the Monster is Victor\'s "shadow self" or a literal manifestation of his own isolation and ambition.' }
      ],
    },
    generateQuestion: () => makeMCQ('What is the subtitle of the novel Frankenstein?', 'The Modern Prometheus', ['The New Adam', 'A Tale of Two Cities', 'The Alchemist'], 'Named after a Greek myth.', 'The subtitle "The Modern Prometheus" links Victor to the myth of a creator who suffers for his knowledge.')
  },

  // ==============================================================
  // MODERN TEXTS
  // ==============================================================
  'an-inspector-calls': {
    title: 'An Inspector Calls',
    emoji: '🕵️',
    color: '#00d4ff',
    category: 'Modern Drama',
    description: 'Social responsibility and the divide between classes.',
    lessons: {
      foundation: [
        { title: 'The Setup', content: 'The wealthy Birling family are celebrating an engagement when Inspector Goole arrives to investigate the suicide of Eva Smith.' },
        { title: 'Social Responsibility', content: 'The Inspector\'s main message: "We are members of one body. We are responsible for each other."', tip: 'This is the core "moral" of the play.' },
        { title: 'The Birlings', content: 'Mr Birling (Capitalist/Selfish), Mrs Birling (Arrogant), Sheila and Eric (Guilty/Changeable).' },
        { title: 'Dramatic Irony', content: 'Mr Birling makes several wrong predictions (e.g., the Titanic is "unsinkable", there will be "no war").', tip: 'This makes the audience realize he is unreliable early on.' }
      ],
      higher: [
        { title: 'AO3: Priestley\'s Message', content: 'Priestley was a Socialist. He wrote the play in 1945 (after WWII) but set it in 1912 to show how society needed to change.', tip: 'Explain how the Inspector acts as Priestley\'s "mouthpiece".' },
        { title: 'Mouthpiece of the Poor', content: 'Eva Smith represents all working-class people ("millions and millions of Eva Smiths"). She never appears on stage, making her a universal symbol.', tip: 'She is a silent victim of the class system.' },
        { title: 'The Generation Gap', content: 'Analyze how Sheila and Eric accept responsibility, while Mr and Mrs Birling remain unchanged and defiant.', tip: 'The "younger generation" represents hope for the future.' },
        { title: 'AO2: Structure: The Final Twist', content: 'The phone ringing at the end. Is the Inspector a ghost? Time traveler? Or a personification of conscience?', tip: 'Use the term "Anagnorisis"—the moment of realization/discovery.' }
      ],
    },
    generateQuestion: () => makeMCQ('In what year is the play SET?', '1912', ['1945', '1918', '1939'], 'Before WWI.', 'The play was written in 1945 but set in 1912 to exploit dramatic irony about the future.')
  },

  'animal-farm': {
    title: 'Animal Farm',
    emoji: '🐷',
    color: '#00d4ff',
    category: 'Modern Prose',
    description: 'Corruption of power and the Russian Revolution allegory.',
    lessons: {
      foundation: [
        { title: 'The Plot', content: 'Animals on Manor Farm overthrow their human owner, Mr. Jones, and establish "Animalism" where everyone is equal. Slowly, the pigs take over control.' },
        { title: 'The Seven Commandments', content: 'The rules of the farm. The most famous: "All animals are equal, but some animals are more equal than others."', tip: 'Notice how the pigs change the rules to suit themselves.' },
        { title: 'Key Characters', content: 'Napoleon (Ruthless pig/Stalin), Snowball (Innovative pig/Trotsky), Boxer (Hardworking horse/The People).' },
        { title: 'Squealer', content: 'The "propaganda" pig who manipulates the animals with clever words and lies.' }
      ],
      higher: [
        { title: 'AO3: Russian Revolution Allegory', content: 'Napoleon represents Joseph Stalin and his transformation from a revolutionary to a dictator.', tip: 'Old Major represents Karl Marx/Lenin and the original vision of equality.' },
        { title: 'AO2: The corruption of language', content: 'How Squealer uses "spin" and false statistics to make the animals believe they are better off, even when they are starving.', tip: 'Analyze the re-writing of the Commandments.' },
        { title: 'Boxer\'s Death', content: 'The ultimate betrayal. The most loyal worker is sold to the knacker (slaughterhouse) for whiskey money.', tip: 'Shows the cruelty of totalitarian regimes.' },
        { title: 'Cyclical Ending', content: 'The farm returns to its original state, but with pigs in place of humans. "The creatures outside looked from pig to man, and from man to pig... but already it was impossible to say which was which."' }
      ],
    },
    generateQuestion: () => makeMCQ('Who does Napoleon represent?', 'Stalin', ['Lenin', 'Trotsky', 'The Tsar'], 'The ruthless leader.', 'Napoleon is a direct allegory for the Soviet dictator Joseph Stalin.')
  },

  'blood-brothers': {
    title: 'Blood Brothers',
    emoji: '🩸',
    color: '#00d4ff',
    category: 'Modern Drama',
    description: 'Class, superstition, and the tragic fate of twins.',
    lessons: {
      foundation: [
        { title: 'The Premise', content: 'Mrs. Johnstone, a struggling mother, gives away one of her twin boys (Edward) to the wealthy Mrs. Lyons.' },
        { title: 'Mickey and Edward', content: 'The twins grow up in very different worlds. Mickey is working-class; Edward is middle-class. They become "blood brothers" without knowing the truth.' },
        { title: 'Class Divide', content: 'The play shows how Edward has every advantage (education, money) while Mickey suffers from unemployment and crime.' },
        { title: 'The Ending', content: 'The twins die at the hands of each other/the police, fulfilling the narrator\'s prediction of tragedy.' }
      ],
      higher: [
        { title: 'Nature vs Nurture', content: 'The central question: Did Mickey and Edward end up the way they did because of their genes (nature) or their upbringing (nurture)?', tip: 'Willy Russell argues nurture/class is the stronger force.' },
        { title: 'AO2: The Narrator\'s Role', content: 'The Narrator acts as a "Greek Chorus," reminding the audience of the inevitable tragedy and the power of superstition.', tip: 'He often breaks the "fourth wall" to question the audience.' },
        { title: 'Mrs. Lyons vs Mrs. Johnstone', content: 'Analyze Mrs. Lyons’ descent into paranoia and madness compared to Mrs. Johnstone’s resilience and warmth.', tip: 'Consider the "Marilyn Monroe" motif used throughout.' },
        { title: 'AO3: Social Context: 1980s Britain', content: 'The play reflects the high unemployment and industrial decline of Liverpool under Margaret Thatcher.', tip: 'Relate Mickey\'s job loss to the "right to work" themes.' }
      ],
    },
    generateQuestion: () => makeMCQ('What represents the superstition that haunts Mrs. Johnstone?', 'Shoes on the table', ['Black cats', 'Broken mirrors', 'Spilled salt'], 'Mrs. Lyons makes it up.', 'Mrs. Lyons uses the superstition of "shoes on a table" to manipulate Mrs. Johnstone.')
  },

  // ==============================================================
  // POETRY CLUSTERS
  // ==============================================================
  'power-and-conflict': {
    title: 'Power & Conflict (Cluster)',
    emoji: '💣',
    color: '#ff6b35',
    category: 'Poetry',
    description: 'Comparing poems about war, nature, and identity.',
    lessons: {
      foundation: [
        { title: 'Ozymandias', content: 'A poem by Shelley about a ruined statue of a great king. Themes: Power of nature vs power of man.' },
        { title: 'The Charge of the Light Brigade', content: 'Tennyson\'s poem about a disastrous battle. Focuses on duty, honor, and the "blunder" of leaders.' },
        { title: 'London', content: 'Blake\'s description of a city suffering from poverty and "mind-forged manacles".' },
        { title: 'Exposure', content: 'Owen\'s poem about soldiers dying from the cold, rather than the enemy. "But nothing happens."' }
      ],
      higher: [
        { title: 'AO2: Comparing Techniques', content: 'Focus on how poets use structure (e.g., iambic pentameter in Ozymandias vs the chaotic rhythm of Bayonet Charge).', tip: 'Always compare the "feel" of the poems.' },
        { title: 'AO2: The Sublime in Nature', content: 'How poets like Wordsworth (The Prelude) show nature as something magnificent but also terrifying.', tip: 'Nature is the ultimate power in the anthology.' },
        { title: 'AO3: Identity and Place', content: 'Analyze "The Emigree" and "Checking Out Me History" - how do poets use language to regain their lost identity?', tip: 'Look for non-standard English or metaphors of light/dark.' },
        { title: 'Poetic Form', content: 'Sonnets, Blank Verse, Free Verse. Why did the poet choose that specific container for their ideas?', tip: 'A rigid form often reflects a rigid society or strict rules.' }
      ],
    },
    generateQuestion: () => makeMCQ('Who wrote the poem "London"?', 'William Blake', ['William Wordsworth', 'Percy Shelley', 'John Keats'], 'A Romantic poet.', 'William Blake wrote London as part of his "Songs of Experience".')
  },

  'love-and-relationships': {
    title: 'Love & Relationships (Cluster)',
    emoji: '❤️',
    color: '#ff6b35',
    category: 'Poetry',
    description: 'Comparing poems about family, romantic love, and loss.',
    lessons: {
      foundation: [
        { title: 'When We Two Parted', content: 'Byron\'s poem about a secret, painful breakup. Focuses on "silence and tears."', tip: 'Note the cold imagery used to describe his lover\'s cheek.' },
        { title: 'Follower', content: 'Heaney\'s description of his father plowing a field. Themes of admiration and the passing of time.' },
        { title: 'Mother, Any Distance', content: 'Armitage\'s poem about moving away from home. The "tape measure" represents the connection that can\'t be broken.' },
        { title: 'Letters from Yorkshire', content: 'A poem about the connection between a city-dweller and a gardener, linked through letters and nature.' }
      ],
      higher: [
        { title: 'AO2: Physical vs Emotional Distance', content: 'Compare how Armitage and Heaney use physical tasks (moving houses, plowing) to represent emotional bonds.', tip: 'Look for extended metaphors.' },
        { title: 'Romantic vs Familial Love', content: 'Analyze the intensity of romantic love in "Porphyria\'s Lover" (destructive/obsessive) vs the quiet love in "Walking Away."', tip: 'Both explore the difficulty of letting go.' },
        { title: 'AO2: Form and Obsession', content: 'Brownings "Porphyria\'s Lover" is a dramatic monologue with a rigid rhyme scheme, reflecting the narrator\'s insanity.', tip: 'His control over the poem reflects his desire for control over Porphyria.' },
        { title: 'AO2: Natural Imagery', content: 'Poets often use nature (seasons, animals) to describe love. "Winter Swans" uses birds to show two people coming back together after a fight.' }
      ],
    },
    generateQuestion: () => makeMCQ('In "Follower", what role did the father have?', 'Farmer', ['Fisherman', 'Doctor', 'Teacher'], 'Work in a field.', 'The father was a skilled farmer who "shouldered a globe" of soil.')
  },

  // ==============================================================
  // POETRY: DEEP DIVES (P&C)
  // ==============================================================
  'ozymandias': {
    title: 'Poem: Ozymandias',
    emoji: '🗿',
    color: '#ff6b35',
    category: 'P&C Poetry',
    description: 'Analysis of Shelley\'s poem on the arrogance of power.',
    lessons: {
      foundation: [
        { title: 'The Statue', content: 'A "shattered visage" lies in the desert. It is a ruined monument to a king that once thought he was immortal.' },
        { title: 'The Inscription', content: '"My name is Ozymandias, King of Kings; Look on my Works, ye Mighty, and despair!"', tip: 'Compare this proud boast with the "lone and level sands" that remain.' },
        { title: 'Shelley\'s Purpose', content: 'Percy Bysshe Shelley was a radical who disliked monarchy. The poem is a warning that all political power eventually fades.' }
      ],
      higher: [
        { title: 'AO2: The Sonnet Form', content: 'Shelley uses a corrupted sonnet form (mixing Petrarchan and Shakespearean) to mirror how Ozymandias\' power has decayed.', tip: 'The structure itself is "shattering" over time.' },
        { title: 'AO2: Enjambment and Caesura', content: 'The broken lines and pauses reflect the fragmented nature of the statue.', tip: '"Nothing beside remains. Round the decay..." The full stop creates a dead end.' },
        { title: 'The Three Voices', content: 'The narrator, the traveler, and the inscription. This distance emphasizes how forgotten Ozymandias really is.' }
      ],
    },
    generateQuestion: () => makeMCQ('What does the "shattered visage" refer to?', 'The statue\'s face', ['The desert floor', 'The traveler\'s shoes', 'The king\'s crown'], 'Visage means face.', 'The "shattered visage" is the broken face of the statue found half-sunk in the sand.')
  },

  'london-poem': {
    title: 'Poem: London',
    emoji: '🏙️',
    color: '#ff6b35',
    category: 'P&C Poetry',
    description: 'Blake\'s exploration of urban suffering and control.',
    lessons: {
      foundation: [
        { title: 'The Setting', content: 'Blake walks through the "chartered" (controlled) streets of London near the "chartered" Thames river.' },
        { title: 'Universal Suffering', content: 'He sees "marks of weakness, marks of woe" in every face. Everyone is trapped in poverty and despair.' },
        { title: 'Child Labor', content: 'The "Chimney-sweeper’s cry" and the "hapless Soldier’s sigh" show how society exploits the vulnerable.' }
      ],
      higher: [
        { title: 'AO2: Mind-Forged Manacles', content: 'The most famous metaphor. It suggests people are trapped by their own beliefs and the ideas forced upon them by the state and church.', tip: '"Manacles" are handcuffs.' },
        { title: 'AO3: Attacking Institutions', content: 'Blake criticizes the "Blackning Church" (corruption) and the "Palace" (monarchy) for allowing the poor to suffer.', tip: 'Relate the "blackning" to the literal soot of the Industrial Revolution.' },
        { title: 'The Cycle of Corruption', content: 'The poem ends with the "Marriage hearse," showing how even love and birth (the "new-born Infant") are tainted by the plague of poverty.' }
      ],
    },
    generateQuestion: () => makeMCQ('What does the word "chartered" imply in the poem?', 'Controlled or owned', ['Free and open', 'Beautiful and clean', 'Full of people'], 'Think of a map or a legal document.', '"Chartered" suggests every part of the city, even the river, is mapped out and owned by the wealthy.')
  },

  // ==============================================================
  // POETRY: DEEP DIVES (L&R)
  // ==============================================================
  'when-we-two-parted': {
    title: 'Poem: When We Two Parted',
    emoji: '💔',
    color: '#ff6b35',
    category: 'L&R Poetry',
    description: 'Byron\'s poem of secret grief and betrayal.',
    lessons: {
      foundation: [
        { title: 'The Breakup', content: 'A secret affair has ended. The narrator is grieving in "silence and tears." He feels betrayed because the woman\'s reputation is now damaged.' },
        { title: 'Cold Imagery', content: '"Pale grew thy cheek and cold, / Colder thy kiss." The loss of love is described through physical coldness and death-like language.' }
      ],
      higher: [
        { title: 'AO2: Shifting Tense', content: 'The poem moves between past, present, and future, showing that his grief is eternal and unchanging.', tip: 'Analyze the cyclical use of "silence and tears" in the first and last stanzas.' },
        { title: 'AO2: The Knell', content: '"A knell in mine ear." A knell is a bell rung at a funeral. Her name now sounds like death to him.', tip: 'This reflects his secret heartbreak that he cannot speak aloud.' }
      ],
    },
    generateQuestion: () => makeMCQ('Why does the narrator have to grieve in "silence"?', 'The relationship was a secret', ['He lost his voice', 'He is in a library', 'He doesn\'t like the woman'], 'A secret affair.', 'Because the affair was secret, he cannot publicly mourn the end of the relationship.')
  },

  'the-farmers-bride': {
    title: 'Poem: The Farmer\'s Bride',
    emoji: '👰',
    color: '#ff6b35',
    category: 'L&R Poetry',
    description: 'Charlotte Mew\'s exploration of emotional distance and fear.',
    lessons: {
      foundation: [
        { title: 'The Marriage', content: 'A farmer marries a young girl, but she is terrified of him and men in general. She runs away and has to be "fetched" back.' },
        { title: 'The "Fay" Bride', content: 'She is described like a wild animal (a hare, a mouse) or a fairy. She is natural and wild, while the marriage is like a cage.' }
      ],
      higher: [
        { title: 'AO3: Patriarchal Control', content: 'The Farmer treats her like property or livestock. "I chose a maid," as if he were at a market.', tip: 'Compare her treatment to the animals on the farm.' },
        { title: 'AO2: The Unrequited Desire', content: 'Analyze the final stanza with its desperate repetition: "The brown of her – her eyes, her hair, her hair!" It shows his growing obsession and her continued isolation.', tip: 'The exclamation marks at the end highlight his mounting frustration.' }
      ],
    },
    generateQuestion: () => makeMCQ('What animal is the bride frequently compared to?', 'A hare or mouse', ['A dog', 'A horse', 'A cow'], 'Small and scared.', 'Charlotte Mew uses animal metaphors like "shy as a leveret" (young hare) to show the bride\'s fear and wildness.')
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
