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
  // COMPUTER SYSTEMS (Component 1)
  // ==============================================================

  'systems-architecture': {
    title: 'Systems Architecture',
    emoji: '🏗️',
    color: '#7d47ff',
    category: 'Computer Systems',
    description: 'CPU architecture, Von Neumann model, and performance factors.',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'The Purpose of the CPU', content: 'The Central Processing Unit (CPU) is the brain of the computer. It fetches, decodes, and executes instructions stored in memory.' },
        { title: 'The Fetch-Execute Cycle', content: '1. Fetch: Get instruction from RAM. 2. Decode: Work out what it means. 3. Execute: Carry out the instruction. Repeat.', tip: 'This cycle happens billions of times per second!' },
        { title: 'CPU Components: ALU', content: 'The Arithmetic Logic Unit (ALU) performs all calculations (e.g. 5+3) and logical comparisons (e.g. Is A > B?).' },
        { title: 'CPU Components: CU', content: 'The Control Unit (CU) coordinates the activity of the CPU. It manages the fetch-execute cycle and controls the flow of data.' },
        { title: 'CPU Components: Cache', content: 'Very fast memory inside the CPU. It stores frequently used data so the CPU doesn\'t have to wait for RAM.', tip: 'More cache usually means a faster computer!' }
      ],
      higher: [
        { title: 'Von Neumann Architecture', visualId: 'cs-von-neumann', content: 'The standard model for computers where data and instructions are stored together in the same memory.' },
        { title: 'Registers: MAR & MDR', content: 'MAR (Memory Address Register) holds the address of data to be fetched. MDR (Memory Data Register) holds the actual data or instruction.', tip: 'Remember: MAR for WHERE, MDR for WHAT.' },
        { title: 'Registers: PC & Accumulator', content: 'PC (Program Counter) holds the address of the NEXT instruction. The Accumulator stores the results of ALU calculations.' },
        { title: 'CPU Performance: Clock Speed', content: 'Measured in Hertz (Hz). Higher clock speed means more instructions executed per second (GHz = billions per second).' },
        { title: 'CPU Performance: Cores', content: 'Multiple cores allow a CPU to process multiple instructions at the same time (parallel processing).', tip: 'Doubling cores doesn\'t always double speed, as tasks must be split up!' },
        { title: 'Embedded Systems', content: 'Computers built into larger devices (e.g. washing machines, microwaves). They are usually designed for one specific task and are very reliable.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return pick([
          () => makeMCQ('What is the main purpose of the CPU?', 'To fetch and execute instructions', ['To provide permanent storage', 'To display graphics', 'To connect to the internet'], 'Think brain.', 'The CPU (Central Processing Unit) executes programs by fetching and carrying out instructions.'),
          () => makeMCQ('Which component performs mathematical calculations?', 'ALU', ['CU', 'Cache', 'MAR'], 'Arithmetic...', 'The ALU (Arithmetic Logic Unit) handles all math and logic operations.'),
          () => makeMCQ('What are the three stages of the CPU cycle?', 'Fetch, Decode, Execute', ['Read, Write, Delete', 'Input, Process, Output', 'Start, Run, Stop'], 'F-D-E.', 'The CPU follows the Fetch-Decode-Execute cycle continuously.')
        ])();
      } else {
        return pick([
          () => makeMCQ('Which register holds the address of the next instruction to be fetched?', 'Program Counter (PC)', ['Accumulator', 'MDR', 'MAR'], 'It "counts" the program steps.', 'The PC keeps track of the next instruction address in memory.'),
          () => makeMCQ('In the Von Neumann model, where are data and instructions stored?', 'Together in the same memory (RAM)', ['In separate chips', 'Only in the CPU cache', 'On the hard drive'], 'A unified model.', 'The Von Neumann architecture uses a single memory space for both data and instructions.'),
          () => makeMCQ('What is the purpose of the Memory Address Register (MAR)?', 'To hold the memory location of the next data/instruction', ['To store the result of a calculation', 'To hold the data retrieved from RAM', 'To control the clock speed'], 'The Register for the Address.', 'The MAR tells the CPU which memory address it needs to access next.')
        ])();
      }
    },
  },

  'memory-storage': {
    title: 'Memory & Storage',
    emoji: '💾',
    color: '#7d47ff',
    category: 'Computer Systems',
    description: 'RAM, ROM, and secondary storage technologies.',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'Primary Storage: RAM', content: 'Random Access Memory. It is VOALTILE (loses data when power is off). It stores the OS, programs, and data currently in use.' },
        { title: 'Primary Storage: ROM', content: 'Read Only Memory. It is NON-VOLATILE. It stores the "Bootstrap" (startup) instructions to turn on the computer.' },
        { title: 'Need for Secondary Storage', content: 'We need secondary storage because RAM is volatile. It allows for long-term, non-volatile storage of files and programs.' },
        { title: 'Magnetic Storage', content: 'Uses magnetic platters (e.g. Hard Disk Drives). High capacity and low cost, but slow and can be damaged by movement.' },
        { title: 'Optical Storage', content: 'Uses lasers to read/write data on discs (e.g. CD, DVD, Blu-Ray). Portable and cheap, but low capacity and easily scratched.' },
        { title: 'Solid State Storage', content: 'Uses flash memory (e.g. SSDs, USB sticks). Very fast, durable (no moving parts), but more expensive than magnetic.', tip: 'SSDs are increasingly replacing HDDs in laptops because they are faster and consume less power.' }
      ],
      higher: [
        { title: 'Virtual Memory', content: 'Part of the hard drive used as "extra RAM" when RAM is full. It allows more programs to run but significantly slows down the computer as secondary storage is slow.' },
        { title: 'Storage Characteristics', content: 'When picking storage, consider: Capacity, Speed, Portability, Durability, Reliability, and Cost.', tip: 'A photographer needs high *Capacity* and *Portability*, whereas a server needs high *Reliability*.' },
        { title: 'Flash Memory', content: 'Technology used in SSDs and SD cards. It uses electronic circuits to trap electrons, meaning it has no moving parts.', tip: 'Has a limited number of read/write cycles compared to magnetic storage.' },
        { title: 'The Cloud', content: 'Storing data on remote servers accessed via the internet. Benefits: access from anywhere, easy sharing. Drawbacks: need internet, security risks (hacking).' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return pick([
          () => makeMCQ('Which type of memory is volatile (loses data when power is off)?', 'RAM', ['ROM', 'SSD', 'Hard Drive'], 'Temporary workspace.', 'RAM is volatile memory used to store active data.'),
          () => makeMCQ('What is stored in ROM?', 'Startup (Bootstrap) instructions', ['Current open files', 'Photos and videos', 'The desktop wallpaper'], 'Permanent instructions.', 'ROM stores the non-volatile instructions needed to start the computer.'),
          () => makeMCQ('Which storage type is most durable for a mobile worker?', 'Solid State (SSD)', ['Magnetic (HDD)', 'Optical (DVD)', 'Floppy Disk'], 'No moving parts.', 'SSDs are durable because they have no moving parts to break during movement.')
        ])();
      } else {
        return pick([
          () => makeMCQ('What is Virtual Memory?', 'Using secondary storage (HDD/SSD) as extra RAM', ['Memory stored on the internet', 'A type of fast CPU cache', 'A program that cleans RAM'], 'A "fake" memory.', 'Virtual memory allows the computer to keep running when physical RAM is full by swapping data to the disk.'),
          () => makeMCQ('Which characteristic is most important for a backpacker\'s camera storage?', 'Portability and Durability', ['High cost per GB', 'Magnetic fields', 'Slow read speeds'], 'Small and tough.', 'Storage for mobile devices needs to be small and resistant to knocks and drops.'),
          () => makeMCQ('How does Virtual Memory affect performance?', 'It makes the computer much slower', ['It speeds up the CPU', 'It has no effect', 'It improves graphics quality'], 'Disk vs RAM speed.', 'Virtual memory is much slower than physical RAM because disk access takes longer.')
        ])();
      }
    },
  },

  'networks-protocols': {
    title: 'Networks & Protocols',
    emoji: '🌐',
    color: '#7d47ff',
    category: 'Computer Systems',
    description: 'LAN vs WAN, network hardware, and communication rules (protocols).',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'LAN vs WAN', content: 'LAN (Local Area Network): Small area like a home or school. WAN (Wide Area Network): Large area like the internet, usually using third-party cables.' },
        { title: 'Network Hardware: Router', content: 'Connects different networks together (e.g. your home LAN to the Internet WAN).' },
        { title: 'Network Hardware: Switch', content: 'Connects devices on a LAN. It reads the "MAC Address" to send data only to the specific device that needs it.' },
        { title: 'Wireless Access Point (WAP)', content: 'Allows devices to connect wirelessly to a wired network using Wi-Fi.' },
        { title: 'Ethernet vs Wi-Fi', content: 'Ethernet (Wired) is faster and more secure. Wi-Fi (Wireless) is more convenient and portable but has less range and more interference.' }
      ],
      higher: [
        { title: 'Factors affecting performance', content: 'Number of users (congestion), Bandwidth (max data rate), Latency (delay), and Interference (walls, other signals).' },
        { title: 'TCP/IP Model (Layers)', content: 'Data is handled in layers. 1. Application, 2. Transport, 3. Network, 4. Data Link.', tip: 'Layers allow developers to change one part (e.g. new Wi-Fi) without rewriting everything.' },
        { title: 'Common Protocols: HTTP/S', content: 'HyperText Transfer Protocol. HTTPS is the SECURE version using encryption for web pages.' },
        { title: 'Email Protocols', content: 'POP (Post Office Protocol): Downloads email then deletes from server. IMAP: Keeps email synced on the server. SMTP: Used to SEND emails.' },
        { title: 'IP vs MAC Addressing', content: 'IP Address: Logical address that changes depending on network. MAC Address: Physical address unique to the hardware (cannot be changed).' },
        { title: 'Topologies', content: 'Star: All devices connect to a central switch. Mesh: All devices connect to each other. Star is easy to manage; Mesh is very reliable (no single point of failure).' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return pick([
          () => makeMCQ('What is a WAN?', 'A network covering a large geographic area like the internet', ['A network in a single building', 'A network without wires', 'A private home network'], 'Wide Area.', 'A Wide Area Network (WAN) connects smaller networks over long distances.'),
          () => makeMCQ('Which device connects your home network to the internet?', 'Router', ['Switch', 'Mouse', 'Monitor'], 'The gateway.', 'A router routes data between different networks.'),
          () => makeMCQ('Which protocol is used specifically for SECURE web browsing?', 'HTTPS', ['HTTP', 'FTP', 'SMTP'], 'Look for the S.', 'The S in HTTPS stands for Secure, meaning the traffic is encrypted.')
        ])();
      } else {
        return pick([
          () => makeMCQ('What is the difference between an IP and a MAC address?', 'IP is logical/changeable, MAC is physical/permanent', ['IP is for wireless, MAC is for wired', 'They are the same thing', 'MAC is only for Apple computers'], 'Software vs Hardware address.', 'MAC addresses are burned into the NIC, while IP addresses are assigned by the network.'),
          () => makeMCQ('What is a major benefit of using Layers in network protocols?', 'It allows different parts of a system to be updated independently', ['It makes the internet faster', 'It prevents all viruses', 'It makes hardware cheaper'], 'Modular design.', 'Layering means a change in hardware (like a new cable type) doesn\'t require a change in software (like the browser).'),
          () => makeMCQ('Which email protocol allows you to sync your mailbox across multiple devices?', 'IMAP', ['POP', 'SMTP', 'HTTP'], 'Internet Message Access.', 'IMAP keeps the emails on the server, whereas POP usually downloads and deletes them.')
        ])();
      }
    },
  },

  'network-security': {
    title: 'Network Security',
    emoji: '🛡️',
    color: '#7d47ff',
    category: 'Computer Systems',
    description: 'Threats to systems and how to prevent them.',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'Malware', content: 'Malicious Software. Viruses (attach to files), Worms (self-replicate), Trojans (disguised as useful programs).' },
        { title: 'Social Engineering: Phishing', content: 'Sending fake emails to trick users into giving away passwords or bank details.', tip: 'Always check the sender\'s email address for spelling mistakes!' },
        { title: 'Brute-Force Attacks', content: 'Trying every possible password combination until one works.', tip: 'Long, complex passwords make this take much longer.' },
        { title: 'Prevention: Firewalls', content: 'A barrier between a trusted and untrusted network. It monitors incoming/outgoing traffic and blocks suspicious packets.' },
        { title: 'Prevention: Passwords', content: 'The simplest protection. Should be long, use symbols/numbers, and be changed regularly.' }
      ],
      higher: [
        { title: 'SQL Injection', content: 'Typing code into a web form to trick a database into revealing sensitive information.', tip: 'Can be prevented by "Input Sanitisation".' },
        { title: 'DoS (Denial of Service)', content: 'Flooding a server with useless traffic to crash it or stop real users from accessing it.', tip: 'DDoS stands for DISTRIBUTED DoS, where many computers attack at once.' },
        { title: 'Penetration Testing', content: 'Authorised hacking. A ethical hacker tries to find holes in a system so the company can fix them.', tip: 'Black box (no info given) vs White box (full info given).' },
        { title: 'Data Interception', content: 'Hackers "listening in" on data traveling over a network (especially public Wi-Fi). Prevented by ENCRYPTION.' },
        { title: 'User Access Levels', content: 'Restricting what users can see or do. E.g. a student can\'t access teacher files.', tip: 'Reduces the internal threat from employees.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return pick([
          () => makeMCQ('What is Phishing?', 'Fake emails used to trick people into giving away data', ['A type of computer virus', 'A method of making code faster', 'A way to connect to a server'], 'Fish for data.', 'Phishing is a social engineering attack using deception (emails/texts).'),
          () => makeMCQ('Which type of malware re-disguises itself as a useful program?', 'Trojan', ['Worm', 'Spyware', 'Ransomware'], 'Think of the Greek myth.', 'A Trojan horse looks legitimate but contains a malicious payload.'),
          () => makeMCQ('What does a Firewall do?', 'Blocks unauthorised traffic from entering a network', ['Speeds up the internet', 'Corrects spelling errors', 'Cleans the computer screen'], 'A protective wall.', 'A firewall filters network packets according to security rules.')
        ])();
      } else {
        return pick([
          () => makeMCQ('How can a company find vulnerabilities in its own network?', 'Penetration Testing', ['SQL Injection', 'Brute force', 'Social engineering'], 'Authorised hacking.', 'Penetration testing involves simulated attacks to identify security weaknesses.'),
          () => makeMCQ('What is an SQL Injection attack?', 'Malicious code typed into a web form to manipulate a database', ['Deleting files from a computer', 'Stealing a laptop', 'Crashing a server with traffic'], 'Injecting database commands.', 'SQLi attacks target databases by exploiting poorly coded input forms.'),
          () => makeMCQ('Why is a DDoS attack harder to stop than a regular DoS?', 'The attack comes from many different locations at once', ['It uses more powerful computers', 'It uses encryption', 'It only targets mobile phones'], 'Distributed.', 'A Distributed Denial of Service (DDoS) uses a "botnet" of many computers, making it hard to block just one attacker.')
        ])();
      }
    },
  },

  'systems-software': {
    title: 'Systems Software',
    emoji: '⚙️',
    color: '#7d47ff',
    category: 'Computer Systems',
    description: 'Operating Systems and Utility software.',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'Operating System (OS)', content: 'Software that manages the hardware and provides a user interface (e.g. Windows, macOS, Android).' },
        { title: 'UI: The Interface', content: 'Allows the human to interact with the computer. GUI (Graphical User Interface) uses Icons/Windows. CLI (Command Line Interface) uses text commands.' },
        { title: 'User Management', content: 'Handles logins, passwords, and access rights for different users on the same machine.' },
        { title: 'File Management', content: 'Allows users to create, delete, move, and rename files/folders in a hierarchical structure.' }
      ],
      higher: [
        { title: 'Memory Management', content: 'Allocates RAM to running programs. It ensures different apps don\'t overwrite each other\'s data.', tip: 'This allows for MULTITASKING (running multiple apps at once).' },
        { title: 'Peripheral Management', content: 'Uses "Device Drivers" to communicate with hardware like printers or cameras.', tip: 'A driver is a tiny bit of software that translates OS commands for the hardware.' },
        { title: 'Utility: Encryption', content: 'Scrambles data so it can\'t be read without a key. Useful for sending files securely.' },
        { title: 'Utility: Defragmentation', content: 'Rearranges files on a magnetic hard drive so they are stored together. This speeds up access.', tip: 'Do NOT defrag an SSD! It doesn\'t help and can wear it out faster.' },
        { title: 'Utility: Compression', content: 'Reduces file size (e.g. .zip, .mp3). Lossy (removes data permanently) vs Lossless (temporary reduction, no data lost).' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return pick([
          () => makeMCQ('Which of these is a function of an Operating System?', 'User Management', ['Writing a book', 'Editing a video', 'Sending a text'], 'Managing the computer.', 'The OS manages users, hardware, memory, and files.'),
          () => makeMCQ('Which type of interface uses text only?', 'CLI (Command Line Interface)', ['GUI', 'Voice UI', 'Touch screen'], 'Write commands.', 'A Command Line Interface (CLI) is text-based and used by advanced users.'),
          () => makeMCQ('What is the purpose of software drivers?', 'To allow the OS to talk to hardware peripherals', ['To protect against viruses', 'To edit photos', 'To browse the web'], 'Communicate with hardware.', 'Drivers act as translators between the OS and hardware devices.')
        ])();
      } else {
        return pick([
          () => makeMCQ('Why should you NOT defragment an SSD?', 'It has no moving parts and defragging can wear it out', ['It makes the SSD explode', 'It deletes all the files', 'SSD data is already encrypted'], 'No read head.', 'Defragmentation helps HDDs by grouping data for the physical read head; SSDs access all segments instantly.'),
          () => makeMCQ('What is the difference between Lossy and Lossless compression?', 'Lossy deletes data permanently, Lossless keeps it all', ['Lossy is only for text, Lossless is for video', 'There is no difference', 'Lossless is faster but makes files larger'], 'Loss of data.', 'Lossy compression (like JPEG) trades quality for smaller size, while Lossless (like ZIP) preserves exact data.'),
          () => makeMCQ('What role does the OS play in Multitasking?', 'It manages RAM allocation to prevent apps from clashing', ['It speeds up the internet connection', 'It cools down the CPU', 'It provides a better screen resolution'], 'Memory management.', 'The OS manages memory and CPU time to allow multiple programs to appear to run at the same time.')
        ])();
      }
    },
  },

  'ethical-legal': {
    title: 'Ethical & Legal Impacts',
    emoji: '⚖️',
    color: '#7d47ff',
    category: 'Computer Systems',
    description: 'Privacy, legislation, and environmental issues in tech.',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'Environmental Issues', content: 'Mining raw materials (lithium), "E-waste" in landfills, and high energy consumption by servers.', tip: 'Buying refurbished tech and recycling old phones helps!' },
        { title: 'The Data Protection Act 2018', content: 'Governs how personal data is collected and used by companies. Data must be kept secure and used fairly.' },
        { title: 'Computer Misuse Act 1990', content: 'Makes "hacking" (unauthorised access) and planting viruses illegal.', tip: 'Even just guessing someone\'s password to log in as them is a crime under this act!' },
        { title: 'Copyright Designs and Patents Act', content: 'Protects intellectual property. It is illegal to copy music, movies, or software without permission.' }
      ],
      higher: [
        { title: 'Privacy Issues', content: 'The trade-off between convenience and security. Smart speakers and tracking cookies raise concerns about how much tech knows about us.' },
        { title: 'Open Source vs Proprietary', content: 'Open Source: Free, anyone can see/edit code (e.g. Linux). Proprietary: Paid, code is secret/protected (e.g. Windows).', tip: 'Open source is often more secure as "many eyes" can find bugs.' },
        { title: 'The Digital Divide', content: 'The gap between people with access to high-speed internet/tech and those without. Affects education and job opportunities.' },
        { title: 'Cultural Issues', content: 'How tech impacts the way we live and communicate. The "always on" culture and the impact of social media on mental health.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return pick([
          () => makeMCQ('Which law protects your personal data held by companies?', 'Data Protection Act 2018', ['Computer Misuse Act', 'Copyright Act', 'Health and Safety Act'], 'Look for "Data".', 'The Data Protection Act ensures your info is handled lawfully.'),
          () => makeMCQ('Which law makes hacking and creating viruses illegal?', 'Computer Misuse Act 1990', ['Data Protection Act', 'Patent Law', 'Privacy Act'], 'Hacking is a misuse.', 'The Computer Misuse Act criminalises unauthorised access to computer material.'),
          () => makeMCQ('What is E-waste?', 'Electronic waste thrown into landfills', ['Emails that are deleted', 'Data that takes up too much RAM', 'Slow internet speeds'], 'Electronic junk.', 'E-waste includes discarded phones, laptops, and batteries containing toxic chemicals.')
        ])();
      } else {
        return pick([
          () => makeMCQ('What is a major advantage of Open Source software?', 'The source code is available to view and modify', ['It is always faster than proprietary', 'It comes with a personal support team', 'It never has any bugs'], 'Open code.', 'Open Source allows transparency and community improvement of the code.'),
          () => makeMCQ('What is meant by the "Digital Divide"?', 'The gap between those with and without internet/tech access', ['The split between hardware and software', 'A special firewall technology', 'A new type of CPU core'], 'A divide in access.', 'The Digital Divide highlights social inequality caused by a lack of access to technology.'),
          () => makeMCQ('Why is "Stakeholder Conflict" common in surveillance tech?', 'Users want privacy, while companies/govt want data/security', ['Everyone has the same goal', 'The technology is too cheap', 'It only works in one country'], 'Privacy vs Security.', 'There is often a conflict between the user\'s right to privacy and the needs of security or marketing data collection.')
        ])();
      }
    },
  },

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
        { title: 'Algorithmic Thinking', content: 'Creating a step-by-step set of rules to solve any problem of a similar type.' },
        { title: 'Problem Solving Flow', content: 'Usually: 1. Decompose the problem, 2. Use Abstraction to simplify, 3. Find Patterns, 4. Write the Algorithm.', tip: 'Logical steps lead to better code!' }
      ],
      higher: [
        { title: 'Input Sanitisation', content: 'Cleaning data inputs to prevent security attacks like SQL injection. This involves removing special characters like ; or --.' },
        { title: 'Input Validation', content: 'Checking that data is in the correct format before it is processed (e.g. checking an age is between 0 and 120).', example: 'Range checks, Presence checks, and Format checks.' },
        { title: 'Verification', content: 'Checking that data is actually correct, usually by asking the user to enter it twice (e.g. new passwords) or looking at source documents.' },
        { title: 'Casting', content: 'Changing a variable from one data type to another.', example: 'int("5") converts a String to an Integer.' },
        { title: 'Defensive Programming', content: 'Writing code that anticipates and handles errors or malicious inputs before they crash the system.', tip: 'Includes input validation, documentation, and error handling.' },
        { title: 'Maintainability', content: 'Writing code that is easy for others to understand. Use: Indentation, Comments, and Meaningful Variable names.', tip: 'Good luck reading code named `x = a + y` in 6 months!' }
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
        { title: 'Dry Runs', content: 'A dry run is stepping through an algorithm manually to trace its execution and understand its behaviour before coding.' },
        { title: 'Standard Pseudocode Symbols', content: 'Commonly used symbols include ← for assignment, == for comparison, and indenting for loops/if-statements.' },
        { title: 'Input & Output', content: 'In pseudocode, we use `input()` to get data from the user and `print()` or `output()` to show data on the screen.' },
        { title: 'Predicting Outputs', content: 'To predict what a program does, read it line by line and keep track of what the user inputs at each stage.' }
      ],
      higher: [
        { title: 'Trace Tables', content: 'Trace tables track the value of variables step-by-step as an algorithm executes. This helps spot exactly where logic goes wrong.' },
        { title: 'Logic Error Detection', content: 'If a trace table reveals that a variable has an unexpected value at a certain point, you have found a logic error.', tip: 'A powerful tool for debugging complex loops.' },
        { title: 'Counting Executions', content: 'Use trace tables to count how many times a loop runs. This is vital for checking if an algorithm is efficient.' },
        { title: 'Tracing While Loops', content: 'When tracing a WHILE loop, always check the condition *before* entering the loop and *after* each iteration.' },
        { title: 'Identifying Patterns', content: 'Tracing allows you to see if a variable is following a pattern (e.g. doubling every time), which helps you understand the algorithm\'s purpose.' }
      ],
    },
    generateQuestion: (tier) => {
      const q1 = () => makeMCQ('What is the main benefit of a trace table?', 'Tracking variable values line by line', ['Translating code into machine code', 'Preventing syntax errors', 'Converting data types'], 'Think about "tracing" the data state.', 'Trace tables let you track exactly what variable holds what value at each line.');
      const q2 = () => makeMCQ('Why do we use pseudocode?', 'It is easy to read and language-independent', ['It runs faster on CPUs', 'It automatically compiles to Python', 'It prevents all logic errors'], 'Pseudo means fake/imitation.', 'Pseudocode bridges the gap between English and strict, rigid code syntax.');
      const q3 = () => makeMCQ('What symbol is commonly used for assignment in GCSE pseudocode?', '←', ['==', '!=', 'IF'], 'Points the value into the variable.', 'The arrow (←) shows data being assigned to a named variable.');
      return pick([q1, q2, q3])();
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
        { title: 'How it works', content: '1. Start at index 0. 2. Is it the target? 3. If no, move to next. 4. If yes, stop. 5. If end reached, not found.' },
        { title: 'Use Cases', content: 'Use linear search for small lists or when you don\'t know if the data is sorted.', tip: 'On average, it checks half the items in the list.' },
        { title: 'Predicting Steps', content: 'If the target is the 5th item, linear search takes exactly 5 steps (comparisons).' },
        { title: 'Worst Case', content: 'The worst case for linear search is when the item is at the very end or not in the list at all.', tip: 'In a list of N items, the worst case is N steps.' }
      ],
      higher: [
        { title: 'Binary Search', content: 'Continually splits a SORTED list in half. Much faster than linear search for large datasets.', tip: 'Data MUST be in order first!' },
        { title: 'The Process', content: '1. Compare middle item. 2. Too small? Discard left. 3. Too big? Discard right. 4. Repat with the remaining half.' },
        { title: 'Efficiency', content: 'Linear search is O(n) - time increases group-wise. Binary search is O(log n) - much more efficient.', tip: 'In a list of 1,000,000 items, Binary takes max 20 steps, Linear could take 1,000,000!' },
        { title: 'Finding the Midpoint', content: 'Midpoint = (Start + End) DIV 2. If the list has 7 items (0-6), the midpoint is (0+6)/2 = 3.', tip: 'If the list has an even number, we usually pick the first of the middle two.' },
        { title: 'Comparing Efficiency', content: 'Binary search is significantly faster as the list size grows. If you double the list size, binary only takes ONE extra step.' }
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
        { title: 'Which to use?', content: 'Bubble is easy to code but inefficient. Insertion is better for small data.' },
        { title: 'Bubble Sort Pros/Cons', content: 'Pro: Easy to understand and code. Con: Very slow and inefficient for large data.', tip: 'Most of the time is spent swapping items.' },
        { title: 'Insertion Sort Pros/Cons', content: 'Pro: Faster than bubble sort for small/mostly sorted lists. Con: Still inefficient for very large random datasets.' }
      ],
      higher: [
        { title: 'Merge Sort', content: 'A "Divide and Conquer" algorithm. Splits list down to individual items, then merges them back together in order.' },
        { title: 'Algorithm Efficiency', content: 'Merge Sort is O(n log n). This is much faster than Bubble Sort\'s O(n²) for large lists.' },
        { title: 'Recursion', content: 'Merge sort often uses recursion (a function calling itself) to handle the repeated splitting of the list.' },
        { title: 'Merge Sort Steps', content: '1. Divide: Split list until size is 1. 2. Conquer: Sort and merge sub-lists until only one ordered list remains.' },
        { title: 'Memory Requirements', content: 'Merge sort requires more memory than bubble/insertion because it creates many sub-lists during the process.', tip: 'This is a trade-off: more memory for more speed!' }
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
        { title: 'Flowchart Symbols', visualId: 'cs-flowchart', content: 'Oval = Start/End. Parallelogram = Input/Output. Rectangle = Process. Diamond = Decision (Requires Yes/No lines).' },
        { title: 'Flowchart Rules', content: 'Arrows should always show the flow of control. Points of entry/exit must be clearly marked with Ovals.' },
        { title: 'Selection in Flowcharts', content: 'Use Diamonds for questions (e.g. Is X > 10?). One arrow enters, and two exit (labeled Yes and No).', tip: 'Always label your Decision exits!' }
      ],
      higher: [
        { title: 'Translating Real Scenarios', content: 'Flowcharts visually represent selection (diamonds) and iteration (arrows looping back up to a previous stage) to map complex systems.' },
        { title: 'Iteration in Flowcharts', content: 'To represent a loop, draw an arrow from the end of a process back up to a decision diamond or a previous stage.' },
        { title: 'Logic Errors in Diagrams', content: 'Ensure your flowchart doesn\'t have "dead ends" or infinite loops unless intended. Every path should lead to an "End" oval.', tip: 'Dry-run your flowchart using a pencil to follow the paths.' }
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
        { title: 'Data Types', content: 'Integer (Whole), Real/Float (Decimal), Boolean (True/False), Character (one symbol), String (Text).' },
        { title: 'Choosing Data Types', content: 'Always pick the most efficient data type. Use Boolean for Yes/No to save memory.', tip: 'Using the correct type prevents logic errors during calculation.' },
        { title: 'Assignment', content: 'The process of setting or changing the value stored in a variable using the `=` symbol (or `←` in pseudocode).' }
      ],
      higher: [
        { title: 'Arithmetic Operators', content: '+, -, *, /. Also MOD (remainder) and DIV (integer division).', example: '10 MOD 3 = 1\n10 DIV 3 = 3' },
        { title: 'String Manipulation', content: '.length (counts letters), .upper (UPPERCASE), .lower (lowercase), .substring(start, length).' },
        { title: 'Logical Operators', content: '== (Equal to), != (Not equal), < (Less than), > (Greater than).', tip: 'Assignment is one "=" symbol, comparison is two "==" symbols.' },
        { title: 'Concatenation', content: 'Joining two or more strings together to create a new string.', example: '"Hello" + " " + "World" = "Hello World"' },
        { title: 'Constants in Practice', content: 'Using constants (e.g. `MAX_PLAYERS = 5`) instead of "magic numbers" makes code more readable and maintainable.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => makeMCQ('Which data type stores text like "Hello"?', 'String', ['Integer', 'Boolean', 'Real'], 'Think of a line of characters.', 'A String holds a sequence of characters.'),
          () => makeMCQ('What is a variable?', 'A named memory location that stores changing data', ['A piece of data that never changes', 'A type of loop', 'A logic error'], 'It "varies".', 'Variables act as buckets holding changeable data.'),
          () => makeMCQ('What is the best data type for the value True?', 'Boolean', ['String', 'Integer', 'Float'], 'Yes/No.', 'Boolean values are strictly True or False.')
        ];
        return pick(types)();
      } else {
        const types = [
          () => makeMCQ('What operator calculates the remainder of a division?', 'MOD (Modulo)', ['DIV', '/', '*'], 'Modular arithmetic focuses on remainders.', 'Modulo (often represented as % or MOD) gives the remainder (e.g. 10 MOD 3 = 1).'),
          () => makeMCQ('Which data type is best for the number 3.14?', 'Real / Float', ['Integer', 'String', 'Boolean'], 'It has a decimal point.', 'Real (or Float) numbers support decimal precision.'),
          () => makeMCQ('What is the result of 17 DIV 5?', '3', ['2', '3.4', '4'], 'Integer division.', 'DIV gives the whole number of times a number goes into another.')
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
        { title: 'Sequence', content: 'Running instructions one after another in order from top to bottom. Every line is executed once.' },
        { title: 'Selection', content: 'Using IF, ELSE, and ELIF statements to branch the code based on a condition.', example: 'IF score >= 50: print("Pass") ELSE: print("Fail")' },
        { title: 'Count-Controlled Iteration', content: 'FOR loops repeat a set number of times. Use this when you know exactly how many loops you need.' },
        { title: 'Condition-Controlled Iteration', content: 'WHILE loops repeat until a condition is no longer true. Use this when the number of loops is unknown.' },
        { title: 'The Loop Condition', content: 'All WHILE loops must have a condition that eventually becomes false, otherwise you get an "Infinite Loop".', tip: 'Always update your loop variable inside the loop!' }
      ],
      higher: [
        { title: 'Nested Selection', content: 'An IF statement inside another IF statement. This allows for complex logic paths.', tip: 'Indentation is crucial for knowing which ELSE belongs to which IF!' },
        { title: 'Nested Iteration', content: 'A loop inside another loop. If the outer loop runs X times and inner runs Y times, the inner code runs X*Y times.', example: 'Useful for 2D grids and patterns.' },
        { title: 'Break & Continue', content: '`Break` exits a loop immediately. `Continue` skips the rest of the current loop and starts the next iteration.', tip: 'Use sparingly as they can make code harder to follow.' },
        { title: 'Switch/Case', content: 'A cleaner alternative to many ELIF statements when checking a single variable against many values.' },
        { title: 'Boolean Expressions in Loops', content: 'Combining complex rules in a loop: `WHILE health > 0 AND found == False`. The loop stops if *either* becomes false.' }
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
        { title: 'Arrays (1D)', content: 'An array stores multiple items of the SAME data type under one identifier/name. You access items using an Index, which usually starts at 0.' },
        { title: 'Array Length', content: 'The number of elements stored in an array. Most languages provide a .length or len() function.', example: 'animals = ["cat", "dog"]. length is 2.' },
        { title: 'Indexing', content: 'Array[0] is the first item, Array[1] is the second, and so on.', tip: 'In an array of length N, the last index is N-1.' },
        { title: 'Static vs Dynamic', content: 'Static arrays cannot change size once created. Dynamic arrays (like Lists in Python) can grow or shrink.', tip: 'Static arrays are more memory-efficient but less flexible.' },
        { title: 'Record Structures', content: 'A collection of related data called "fields", each of which can be a different data type.', example: 'A "Student" record might have Name (String), Age (Int), and Grade (Char).' }
      ],
      higher: [
        { title: 'Traversing 1D Arrays', content: 'Using a FOR loop to visit every index. `FOR i = 0 TO len(arr)-1: print(arr[i])`.', tip: 'Essential for searching through data.' },
        { title: '2D Arrays (Grids)', content: 'An array of arrays. Imagine a table with rows and columns. Access using `array[row][column]`.' },
        { title: 'Traversing 2D Arrays', content: 'Requires NESTED loops. The outer loop iterates through rows, and the inner loop iterates through the columns of each row.' },
        { title: 'Efficiency of Shifting', content: 'Adding or deleting an item from the middle of an array requires shifting all other items, which can be slow for large datasets.' },
        { title: 'Linked Lists (Overview)', content: 'A data structure where each item (node) points to the next one in memory. Unlike arrays, items don\'t have to be next to each other.' }
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
        { title: 'Truth Tables', content: 'Mathematical tables showing all possible input combinations (0s and 1s) and the resulting output for a logic circuit.' },
        { title: 'Transistors', content: 'Computer chips contain billions of tiny switches called transistors. These form the basis of all logic gates.' },
        { title: 'Binary in Logic', content: '1 represents True (High voltage) and 0 represents False (Low voltage). All computer logic is built from these two states.' }
      ],
      higher: [
        { title: 'Logic Diagrams', content: 'Constructing entire circuits or reading long Boolean expressions like "A AND (B OR NOT C)". Work from brackets outwards.' },
        { title: 'Boolean Algebra', content: 'Writing logic using symbols. `.` is AND, `+` is OR, and a line over a letter is NOT.', example: `A . (B + C)` },
        { title: 'Combining Truth Tables', content: 'For a circuit with 3 inputs (A, B, C), the truth table will have 8 rows (2³).', tip: 'Keep your table organised to avoid missing combinations!' },
        { title: 'Logic and Hardware', content: 'Logic gates are combined to form complex circuits like "Adders" (which add numbers) and "Latches" (which store data).' }
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
        { title: 'Searching Text', content: 'Use LIKE with % to find partial matches.', example: 'WHERE Name LIKE "A%" finds all names starting with A.' },
        { title: 'Relational Databases', content: 'A database where tables are linked together using Primary and Foreign Keys.' },
        { title: 'Flat File Databases', content: 'A simple database stored in one table. Harder to manage for large datasets due to redundancy.' }
      ],
      higher: [
        { title: 'Complex Queries', content: 'Use AND/OR to combine multiple WHERE conditions.', example: 'WHERE Price > 10 AND Stock < 5' },
        { title: 'Updating Data', content: 'UPDATE table SET column = value WHERE condition.', tip: 'Always include the WHERE clause or you\'ll update every row!' },
        { title: 'Inserting & Deleting', content: 'INSERT INTO table VALUES (...). DELETE FROM table WHERE condition.' },
        { title: 'Sorting Results', content: 'ORDER BY column ASC/DESC allows you to sort your output.', example: 'SELECT * FROM games ORDER BY price DESC' },
        { title: 'Data Redundancy', content: 'Storing the same piece of data multiple times. Databases aim to reduce this to save space and prevent errors.' },
        { title: 'Primary Keys', content: 'A unique identifier for each record in a table (e.g. StudentID). No two records can have the same primary key.' }
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

  'data-representation-numbers': {
    title: 'Data Representation: Numbers',
    emoji: '🔢',
    color: '#ff2d78',
    category: 'Logic & Data',
    description: 'Units, Binary, Hexadecimal, Addition, and Shifts.',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'Units of Data', content: 'Bit (0 or 1), Nibble (4 bits), Byte (8 bits), Kilobyte (1000 bytes/bits according to some but 1024 binary), Megabyte, Gigabyte, Terabyte.', tip: 'GCSE usually uses the multiplier 1000 for simplicity (KB, MB, GB).' },
        { title: 'Binary to Denary', content: 'Denary is base 10 (0-9). Binary is base 2 (0-1). Use a table: 128, 64, 32, 16, 8, 4, 2, 1.', example: '1010 = 8 + 2 = 10' },
        { title: 'Hexadecimal', content: 'Base 16 (0-F). A=10, B=11, C=12, D=13, E=14, F=15. Much easier for humans to read than binary.', tip: 'One Hex digit equals exactly four bits (one nibble).' },
        { title: 'Binary Conversion (Hex)', content: 'Split the byte into two nibbles. Convert each nibble to hex then join.', example: '1011 0011 -> 11 (B) 3 -> B3' }
      ],
      higher: [
        { title: 'Binary Addition', content: '0+0=0, 0+1=1, 1+1=0 carry 1, 1+1+1=1 carry 1.', tip: 'Always start from the right (LSB).' },
        { title: 'Overflow Error', content: 'When the result of an addition is too large for the number of bits allocated (e.g. 9 bits result in an 8-bit space).', tip: 'Causes the computer to store a wrong, smaller value.' },
        { title: 'Binary Shifts', content: 'Logical Shift Left (LSL) multiplies by 2. Logical Shift Right (LSR) divides by 2.', example: '0010 (2) Shift Left 1 = 0100 (4)' },
        { title: 'Precision Loss', content: 'Shifting right can cause bits to "fall off" the end, resulting in loss of data and accuracy.', tip: 'Shifting 0011 (3) right loses the 1, giving 0001 (1).' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const d = r(5, 50);
        return makeMCQ(`Convert denary ${d} to an 8-bit binary number`, d.toString(2).padStart(8, '0'), [r(1, 128).toString(2).padStart(8, '0')], 'Use the 128, 64, 32... table.', `Denary ${d} is ${d.toString(2)} in binary.`);
      } else {
        const b = r(10, 30);
        return makeMCQ(`Perform a Logical Shift Left by 2 on binary ${b.toString(2).padStart(4, '0')}. What is the new denary value?`, b * 4, [b * 2, b + 2, b / 2], 'Shift Left 1 = ×2, Shift Left 2 = ×4.', `${b} × 4 = ${b * 4}`);
      }
    },
  },

  'data-representation-media': {
    title: 'Characters, Images & Sound',
    emoji: '🖼️',
    color: '#ff2d78',
    category: 'Logic & Data',
    description: 'How computers store text, pictures, and audio.',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'Characters: ASCII', content: '7-bit code (128 characters). Every letter/number has a unique binary code.', example: 'A = 65, B = 66, etc.' },
        { title: 'Characters: Unicode', content: 'A much larger character set (16 or 32 bit). Can represent every language and emojis.', tip: 'ASCII is a "subset" of Unicode—the first 128 items are the same!' },
        { title: 'Images: Pixels', content: 'Pictures are made of tiny squares called "Picture Elements" (Pixels). Each pixel has a binary color code.' },
        { title: 'Resolution', content: 'The number of pixels in a given area. Higher resolution = clearer image but larger file size.' }
      ],
      higher: [
        { title: 'Metadata', content: 'Data about data. Stored inside the file (e.g. width, height, resolution, file type, date taken).', tip: 'Essential for the computer to know how to display the image correctly.' },
        { title: 'Color Depth (Bit Depth)', content: 'The number of bits used per pixel. 1-bit = 2 colors. 8-bit = 256 colors.', formula: 'Number of colors = 2ⁿ where n is bit depth.' },
        { title: 'Sound Sampling', content: 'Sound is an analogue wave. Computers "sample" the amplitude at regular intervals to convert it to digital.', tip: 'Higher sample rate = better quality but larger file.' },
        { title: 'Sound File Size Factors', content: 'Sample Rate (Hz), Bit Depth (Resolution), and Duration (Seconds).', formula: 'Size = Rate × Depth × Duration' }
      ],
    },
    generateQuestion: (tier) => {
      const q1 = () => makeMCQ('Why is Unicode preferred over ASCII for modern systems?', 'It can represent characters from all world languages', ['It uses less memory', 'It is faster to process', 'It only uses 7 bits'], 'Think globally.', 'Unicode provides a much larger range of codes for global symbols and languages.');
      const q2 = () => makeMCQ('What is "Metadata" in an image file?', 'Data about the data (e.g. dimensions, date)', ['The actual colors of the pixels', 'A hidden virus', 'The background music'], 'Contextual info.', 'Metadata provides the instructions for how the bitstream should be interpreted.');
      return pick([q1, q2])();
    },
  },

  'subprograms-file-handling': {
    title: 'Sub-programs & Files',
    emoji: '📂',
    color: '#00ff94',
    category: 'Programming Concepts',
    description: 'Procedures, functions, scope, and persistent storage.',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'What are Sub-programs?', content: 'Blocks of code called by name. Procedures perform tasks. Functions perform tasks AND RETURN A VALUE.', example: 'print() is a procedure; random() is a function.' },
        { title: 'Why use them?', content: 'Reduce code duplication, make code easier to test, and improve readability.', tip: 'If you use the same code twice, put it in a sub-program!' },
        { title: 'File Handling: Open/Close', content: 'Files must be "Opened" before use and "Closed" after to save changes and free memory.', tip: 'Always use a variable to track the open file (the "file handle").' }
      ],
      higher: [
        { title: 'Parameters & Arguments', content: 'Parameters are values passed into sub-programs. Arguments are the actual values sent when calling.', example: 'def add(a, b): # a and b are parameters\nadd(5, 3) # 5 and 3 are arguments' },
        { title: 'Local vs Global Scope', content: 'Local: Variable only exists inside the sub-program. Global: Variable exists everywhere.', tip: 'Avoid using global variables where possible as they make code harder to debug.' },
        { title: 'File Operations: Read/Write', content: '`writeLine()` overwrites part of the file. `append()` adds to the end. `readLine()` reads one line at a time.', tip: 'Reading a whole file at once can crash a program if the file is massive!' }
      ],
    },
    generateQuestion: (tier) => {
      const q1 = () => makeMCQ('What is the main difference between a Procedure and a Function?', 'A Function returns a value; a Procedure doesn\'t', ['Procedures are longer', 'Functions are only for math', 'Functions are from AQA, Procedures are from OCR'], 'The return trip.', 'Functions are designed to evaluate and send a result back to the caller.');
      const q2 = () => makeMCQ('What is typically meant by "variable scope"?', 'Where in the code a variable is accessible', ['The size of the variable in bytes', 'The data type of the variable', 'How fast the variable loads'], 'Vision/Accessibility.', 'Scope defines whether a variable is local to a function or globally available.');
      return pick([q1, q2])();
    },
  },

  'robust-programming-testing': {
    title: 'Robust Programs & Testing',
    emoji: '🧪',
    color: '#00ff94',
    category: 'Algorithms & Thinking',
    description: 'Defensive design, validation, and comprehensive testing.',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'Defensive Design', content: 'Anticipating what a user might do to break your code and planning for it.', tip: 'Assume the user is a toddler who presses random buttons!' },
        { title: 'Testing', content: 'Checking code works as expected. Iterative (done during coding) vs Final (done at the end).', tip: 'Testing finds bugs; it doesn\'t prove the code is "perfect".' },
        { title: 'Test Data Types', content: 'Normal (Valid), Boundary (Edge of valid range), and Invalid (Should be rejected).', example: 'Range 1-100: Normal(50), Boundary(1, 100), Invalid(-5, 101, "abc").' }
      ],
      higher: [
        { title: 'Maintainability', content: 'Ensuring others (or you in 6 months) can understand your code. Use comments, indentation, and sub-programs.', tip: 'Constant names like `MAX_LIVES` are better than magic numbers like `3`.' },
        { title: 'Validation vs Verification', content: 'Validation: Does it follow rules? (e.g. is it an email?). Verification: Is it actually the right data? (e.g. check ID card).', tip: 'You can validate that "abc@def" is an email, but verifying it means checking it exists.' },
        { title: 'Logic Errors vs Syntax Errors', content: 'Syntax errors break the "grammar" (won\'t run). Logic errors make the "brain" do the wrong thing (runs but result is wrong).', tip: 'Tracing helps find logic errors.' }
      ],
    },
    generateQuestion: (tier) => {
      const q1 = () => makeMCQ('If a system accepts age 1-120, what type of test data is "120"?', 'Boundary', ['Normal', 'Invalid', 'Runtime'], 'On the edge.', 'Boundary data tests the extreme limits of acceptable ranges.');
      const q2 = () => makeMCQ('What is "Maintainability"?', 'Writing code that is easy for humans to read and fix', ['Ensuring the computer doesn\'t overheat', 'Storing data in a database', 'Connecting to a server'], 'Keeping it working.', 'Maintainable code uses comments and structure to aid future developers.');
      return pick([q1, q2])();
    },
  },

  'programming-languages-ide': {
    title: 'Languages & IDEs',
    emoji: '💻',
    color: '#00ff94',
    category: 'Programming Concepts',
    description: 'High/Low level languages and translator software.',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'High-Level Languages', content: 'Languages humans can read (e.g. Python, Java). Easy to write/debug. One line translates to many machine code lines.', tip: 'Portable: can run on many different types of CPUs.' },
        { title: 'Low-Level Languages', content: 'Machine Code (binary) and Assembly. Hard for humans but gives direct control over hardware.', tip: 'Assembly uses "mnemonics" like ADD, SUB, MOV.' },
        { title: 'Translators', content: 'High-level code must be translated into Machine Code to run. Two types: Compiler and Interpreter.' }
      ],
      higher: [
        { title: 'Compiler', content: 'Translates whole code into an executable file once. Fast to run, hides source code, but takes long to compile initially.', tip: 'Good for finished projects.' },
        { title: 'Interpreter', content: 'Translates line-by-line while running. Stops at first error. Slower to run but great for debugging.', tip: 'Python is an interpreted language.' },
        { title: 'Assembler', content: 'A specific translator that converts Assembly Language into Machine Code.', tip: 'One assembly line = exactly one machine code instruction.' },
        { title: 'IDE Features', content: 'Editor (with syntax highlighting), Error Diagnostics, Runtime Environment, and Debugger.', tip: 'Syntax highlighting makes it easier to spot spelling mistakes!' }
      ],
    },
    generateQuestion: (tier) => {
      const q1 = () => makeMCQ('Which translator is best for finding errors during development?', 'Interpreter', ['Compiler', 'Assembler', 'Defragmenter'], 'Line by line.', 'Interpreters stop at errors immediately, making debugging faster during coding.');
      const q2 = () => makeMCQ('One line of high-level code usually translates into...', 'Many lines of machine code', ['Zero lines', 'Exactly one line', 'A GUI'], 'Abstract vs Concrete.', 'High-level languages are abstracted; one command performs many low-level CPU operations.');
      return pick([q1, q2])();
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
