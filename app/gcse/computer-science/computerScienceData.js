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
    hacks: [
      { title: 'MAR vs MDR', content: 'MAR (Memory Address Register) holds the WHERE (the address). MDR (Memory Data Register) holds the WHAT (the data itself). A comes before D, Address comes before Data.' },
      { title: 'Clock Speed Trap', content: 'Clock speed (GHz) isn\'t everything. A CPU with 4 cores at 2GHz might be faster than a 1 core CPU at 3GHz for complex tasks!' }
    ],
    advanced: [
      { title: 'The Von Neumann Bottleneck', content: 'Since data and instructions share the same bus, the CPU often has to wait for data to arrive from memory. This is called the "bottleneck" and is a major limit on computer speed.' },
      { title: 'Pipelining', content: 'Modern CPUs don\'t just do one FDE cycle at a time. They start fetching the next instruction while the current one is being decoded, like an assembly line.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return pick([
          () => makeMCQ('What is the main purpose of the CPU?', 'To fetch and execute instructions', ['To provide permanent storage', 'To display graphics', 'To connect to the internet'], 'Think brain.', 'The CPU (Central Processing Unit) executes programs by fetching and carrying out instructions.'),
          () => makeMCQ('Which component performs mathematical calculations?', 'ALU', ['CU', 'Cache', 'MAR'], 'Arithmetic...', 'The ALU (Arithmetic Logic Unit) handles all math and logic operations.'),
          () => makeMCQ('What are the three stages of the CPU cycle?', 'Fetch, Decode, Execute', ['Read, Write, Delete', 'Input, Process, Output', 'Start, Run, Stop'], 'F-D-E.', 'The CPU follows the Fetch-Decode-Execute cycle continuously.'),
          () => makeMCQ('What does the Control Unit (CU) do?', 'Coordinates and controls all CPU activity', ['Stores the program counter', 'Performs all calculations', 'Connects to the internet'], 'It controls everything.', 'The CU manages the fetch-execute cycle and directs data flow between components.'),
          () => makeMCQ('Which CPU component stores frequently used data for fast access?', 'Cache', ['RAM', 'ROM', 'Hard Drive'], 'Faster than RAM.', 'Cache is very fast memory inside the CPU that reduces wait times.'),
          () => makeMCQ('What does an embedded system do?', 'Performs one specific task inside a larger device', ['Connects two networks', 'Stores all the OS files', 'Manages user accounts'], 'Think washing machine or microwave.', 'Embedded systems are designed for a single dedicated purpose within a device.'),
        ])();
      } else {
        return pick([
          () => makeMCQ('Which register holds the address of the next instruction to be fetched?', 'Program Counter (PC)', ['Accumulator', 'MDR', 'MAR'], 'It "counts" the program steps.', 'The PC keeps track of the next instruction address in memory.'),
          () => makeMCQ('In the Von Neumann model, where are data and instructions stored?', 'Together in the same memory (RAM)', ['In separate chips', 'Only in the CPU cache', 'On the hard drive'], 'A unified model.', 'The Von Neumann architecture uses a single memory space for both data and instructions.'),
          () => makeMCQ('What is the purpose of the Memory Address Register (MAR)?', 'To hold the memory location of the next data/instruction', ['To store the result of a calculation', 'To hold the data retrieved from RAM', 'To control the clock speed'], 'The Register for the Address.', 'The MAR tells the CPU which memory address it needs to access next.'),
          () => makeMCQ('How does increasing the number of CPU cores improve performance?', 'It allows multiple instructions to be processed simultaneously', ['It increases clock speed', 'It adds more cache memory', 'It reduces power consumption'], 'Parallel processing.', 'Multiple cores allow the CPU to work on several tasks at once.'),
          () => makeMCQ('What does the MDR (Memory Data Register) store?', 'The actual data or instruction fetched from memory', ['The memory address to access', 'The result of the last calculation', 'The number of clock cycles'], 'Data, not address.', 'The MDR holds the actual value retrieved from or to be written to the address in the MAR.'),
          () => makeMCQ('A CPU has a clock speed of 3 GHz. How many cycles does it perform per second?', '3 billion', ['3 million', '3 thousand', '300 million'], 'Giga = billion.', '3 GHz = 3 × 10⁹ = 3 billion clock cycles per second.'),
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
          () => makeMCQ('Which storage type is most durable for a mobile worker?', 'Solid State (SSD)', ['Magnetic (HDD)', 'Optical (DVD)', 'Floppy Disk'], 'No moving parts.', 'SSDs are durable because they have no moving parts to break during movement.'),
          () => makeMCQ('Why do computers need secondary storage?', 'To permanently store data when the computer is off', ['To speed up the processor', 'To run the operating system', 'To connect to the internet'], 'Long-term storage.', 'Secondary storage is non-volatile, keeping data safe when the power is off.'),
          () => makeMCQ('Which type of storage uses lasers to read and write data?', 'Optical (CD/DVD/Blu-Ray)', ['Magnetic (HDD)', 'Solid State (SSD)', 'Flash memory'], 'Light-based.', 'Optical storage uses laser beams to read/write data on disc surfaces.'),
          () => makeMCQ('What does "volatile" mean in the context of memory?', 'Data is lost when power is removed', ['Data cannot be deleted', 'The memory gets hot', 'Data is encrypted'], 'Evaporates without power.', 'Volatile memory like RAM loses all its data the moment power is cut.'),
        ])();
      } else {
        return pick([
          () => makeMCQ('What is Virtual Memory?', 'Using secondary storage (HDD/SSD) as extra RAM', ['Memory stored on the internet', 'A type of fast CPU cache', 'A program that cleans RAM'], 'A "fake" memory.', 'Virtual memory allows the computer to keep running when physical RAM is full by swapping data to the disk.'),
          () => makeMCQ('Which characteristic is most important for a backpacker\'s camera storage?', 'Portability and Durability', ['High cost per GB', 'Magnetic fields', 'Slow read speeds'], 'Small and tough.', 'Storage for mobile devices needs to be small and resistant to knocks and drops.'),
          () => makeMCQ('How does Virtual Memory affect performance?', 'It makes the computer much slower', ['It speeds up the CPU', 'It has no effect', 'It improves graphics quality'], 'Disk vs RAM speed.', 'Virtual memory is much slower than physical RAM because disk access takes longer.'),
          () => makeMCQ('A hospital needs storage for patient records. Which property is MOST important?', 'Reliability', ['Speed', 'Portability', 'Cost'], 'Lives depend on it.', 'Medical data must always be accessible and never corrupted — reliability is paramount.'),
          () => makeMCQ('Which secondary storage type has the fastest read/write speeds?', 'Solid State Drive (SSD)', ['Magnetic Hard Drive (HDD)', 'Blu-Ray disc', 'DVD-ROM'], 'No moving parts = fast.', 'SSDs access data electronically with no mechanical movement, making them the fastest storage type.'),
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
        { title: 'Topologies', content: 'Star: All devices connect to a central switch. Mesh: All devices connect to each other. Star is easy to manage; Mesh is very reliable (no single point of failure).' },
        { title: 'Client-Server vs Peer-to-Peer', content: 'Client-Server: Clients request services from a central server (e.g. web browsing). Peer-to-Peer (P2P): All computers are equal and share resources directly (e.g. file sharing).', tip: 'Client-server is easier to manage and secure; P2P has no single point of failure.' },
        { title: 'NIC & Bluetooth', content: 'NIC (Network Interface Controller): Hardware that allows a device to connect to a network — it contains the device\'s unique MAC address. Bluetooth: Short-range wireless for connecting peripherals (keyboards, headphones, speakers).', tip: 'Every networked device needs a NIC, whether wired or wireless.' },
        { title: 'FTP Protocol', content: 'File Transfer Protocol: Used to upload/download files to/from a server. Commonly used by web developers to upload website files.', tip: 'FTP is NOT secure by default — SFTP adds encryption.' },
        { title: 'IP Addressing: IPv4 vs IPv6', content: 'IPv4: 4 groups of numbers 0-255 (e.g. 192.168.1.1) — about 4.3 billion addresses. IPv6: 8 groups of hexadecimal (e.g. 2001:0db8::1) — virtually unlimited.', tip: 'We are running out of IPv4 addresses, which is why IPv6 was created.' },
        { title: 'DNS Resolution Process', content: '1. You type a URL. 2. Browser checks local cache. 3. Request sent to DNS server. 4. DNS looks up the domain name. 5. Returns the IP address. 6. Browser connects to the web server at that IP.', tip: 'DNS is the internet\'s phonebook — converting human-friendly names to IP addresses.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return pick([
          () => makeMCQ('What is a WAN?', 'A network covering a large geographic area like the internet', ['A network in a single building', 'A network without wires', 'A private home network'], 'Wide Area.', 'A Wide Area Network (WAN) connects smaller networks over long distances.'),
          () => makeMCQ('Which device connects your home network to the internet?', 'Router', ['Switch', 'Mouse', 'Monitor'], 'The gateway.', 'A router routes data between different networks.'),
          () => makeMCQ('Which protocol is used specifically for SECURE web browsing?', 'HTTPS', ['HTTP', 'FTP', 'SMTP'], 'Look for the S.', 'The S in HTTPS stands for Secure, meaning the traffic is encrypted.'),
          () => makeMCQ('What does a switch do in a network?', 'Directs data to specific devices using their MAC address', ['Connects to the internet', 'Provides wireless signals', 'Stores shared files'], 'Targeted delivery.', 'Unlike a hub which broadcasts to all, a switch sends data only to the intended device.'),
          () => makeMCQ('What is a LAN?', 'A network connecting devices in a small area like a school', ['A network spanning a city', 'A wireless network', 'The global internet'], 'Local Area.', 'A LAN connects devices within a limited geographic area using owned infrastructure.'),
          () => makeMCQ('Which protocol is used to SEND emails?', 'SMTP', ['IMAP', 'POP', 'HTTP'], 'Simple Mail TRANSFER Protocol.', 'SMTP (Simple Mail Transfer Protocol) is used for sending outgoing email messages.'),
        ])();
      } else {
        return pick([
          () => makeMCQ('What is the difference between an IP and a MAC address?', 'IP is logical/changeable, MAC is physical/permanent', ['IP is for wireless, MAC is for wired', 'They are the same thing', 'MAC is only for Apple computers'], 'Software vs Hardware address.', 'MAC addresses are burned into the NIC, while IP addresses are assigned by the network.'),
          () => makeMCQ('What is a major benefit of using Layers in network protocols?', 'It allows different parts of a system to be updated independently', ['It makes the internet faster', 'It prevents all viruses', 'It makes hardware cheaper'], 'Modular design.', 'Layering means a change in hardware (like a new cable type) doesn\'t require a change in software (like the browser).'),
          () => makeMCQ('Which email protocol allows you to sync your mailbox across multiple devices?', 'IMAP', ['POP', 'SMTP', 'HTTP'], 'Internet Message Access.', 'IMAP keeps the emails on the server, whereas POP usually downloads and deletes them.'),
          () => makeMCQ('What is the main advantage of a mesh network topology over a star topology?', 'No single point of failure — if one link fails, data routes around it', ['It is cheaper to set up', 'It uses less cable', 'It is easier to manage'], 'Multiple paths.', 'Mesh topology provides redundancy by connecting every node to every other node.'),
          () => makeMCQ('What is the purpose of a DNS server?', 'To convert domain names (URLs) into IP addresses', ['To encrypt web traffic', 'To block malicious websites', 'To assign MAC addresses'], 'The internet\'s phonebook.', 'DNS resolves human-readable URLs like google.com into numerical IP addresses.'),
          () => makeMCQ('What is the difference between client-server and peer-to-peer networks?', 'Client-server has a central server; P2P all devices are equal', ['Client-server is wireless; P2P is wired', 'They are the same', 'P2P requires a router; client-server does not'], 'Central vs distributed.', 'In client-server, the server provides services; in P2P each device can be both client and server.'),
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
        { title: 'User Access Levels', content: 'Restricting what users can see or do. E.g. a student can\'t access teacher files.', tip: 'Reduces the internal threat from employees.' },
        { title: 'Anti-Malware Software', content: 'Software that detects, quarantines, and removes malicious programs. Scans files against a database of known virus signatures.', tip: 'Must be updated regularly or it won\'t recognise new threats!' },
        { title: 'Physical Security', content: 'Locks, CCTV, biometric scanners, security guards. Prevents unauthorised physical access to servers and hardware.', tip: 'The most secure password is useless if someone can walk up to the server and steal the hard drive.' },
        { title: 'Encryption as Prevention', content: 'Scrambling data using a cipher so that intercepted data is unreadable. Only someone with the correct key can decrypt it.', tip: 'HTTPS uses encryption to protect data between your browser and a website.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return pick([
          () => makeMCQ('What is Phishing?', 'Fake emails used to trick people into giving away data', ['A type of computer virus', 'A method of making code faster', 'A way to connect to a server'], 'Fish for data.', 'Phishing is a social engineering attack using deception (emails/texts).'),
          () => makeMCQ('Which type of malware re-disguises itself as a useful program?', 'Trojan', ['Worm', 'Spyware', 'Ransomware'], 'Think of the Greek myth.', 'A Trojan horse looks legitimate but contains a malicious payload.'),
          () => makeMCQ('What does a Firewall do?', 'Blocks unauthorised traffic from entering a network', ['Speeds up the internet', 'Corrects spelling errors', 'Cleans the computer screen'], 'A protective wall.', 'A firewall filters network packets according to security rules.'),
          () => makeMCQ('What is a Brute-Force attack?', 'Trying every possible password combination until one works', ['Stealing a laptop physically', 'Sending fake emails', 'Flooding a server with traffic'], 'Brute force = try everything.', 'Brute-force attacks systematically try every possible password combination.'),
          () => makeMCQ('Which of these is a form of malware?', 'Worm', ['Firewall', 'Encryption', 'Switch'], 'It spreads by itself.', 'A worm is malware that self-replicates and spreads across networks without user action.'),
          () => makeMCQ('Why should you use a strong password?', 'It makes brute-force attacks take much longer', ['It prevents viruses entering your computer', 'It encrypts your data automatically', 'It removes spyware'], 'Harder to guess.', 'A long, complex password exponentially increases the time needed for a brute-force attack.'),
        ])();
      } else {
        return pick([
          () => makeMCQ('How can a company find vulnerabilities in its own network?', 'Penetration Testing', ['SQL Injection', 'Brute force', 'Social engineering'], 'Authorised hacking.', 'Penetration testing involves simulated attacks to identify security weaknesses.'),
          () => makeMCQ('What is an SQL Injection attack?', 'Malicious code typed into a web form to manipulate a database', ['Deleting files from a computer', 'Stealing a laptop', 'Crashing a server with traffic'], 'Injecting database commands.', 'SQLi attacks target databases by exploiting poorly coded input forms.'),
          () => makeMCQ('Why is a DDoS attack harder to stop than a regular DoS?', 'The attack comes from many different locations at once', ['It uses more powerful computers', 'It uses encryption', 'It only targets mobile phones'], 'Distributed.', 'A Distributed Denial of Service (DDoS) uses a "botnet" of many computers, making it hard to block just one attacker.'),
          () => makeMCQ('What is the purpose of physical security measures like CCTV and locks?', 'To prevent unauthorised physical access to hardware', ['To stop SQL injection', 'To speed up the network', 'To encrypt data in transit'], 'Physical threats need physical solutions.', 'Physical security prevents attackers from gaining direct access to servers and infrastructure.'),
          () => makeMCQ('How does anti-malware software detect threats?', 'It compares files against a database of known malware signatures', ['It encrypts all files', 'It blocks all internet traffic', 'It hides user data'], 'Signature matching.', 'Anti-malware scans for patterns matching known malware; it must be updated regularly to recognise new threats.'),
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
          () => makeMCQ('What is the purpose of software drivers?', 'To allow the OS to talk to hardware peripherals', ['To protect against viruses', 'To edit photos', 'To browse the web'], 'Communicate with hardware.', 'Drivers act as translators between the OS and hardware devices.'),
          () => makeMCQ('What is file management in an OS?', 'Organising files into folders, renaming, moving, and deleting', ['Managing the CPU speed', 'Connecting to the internet', 'Controlling user passwords'], 'File organiser.', 'File management allows users and programs to create, read, update, and delete files in a structured way.'),
          () => makeMCQ('What does multitasking mean in an OS context?', 'Running multiple applications at the same time', ['Using multiple monitors', 'Having multiple users logged in', 'Running on multiple computers'], 'Multiple apps at once.', 'The OS manages memory allocation to allow several programs to appear to run simultaneously.'),
        ])();
      } else {
        return pick([
          () => makeMCQ('Why should you NOT defragment an SSD?', 'It has no moving parts and defragging can wear it out', ['It makes the SSD explode', 'It deletes all the files', 'SSD data is already encrypted'], 'No read head.', 'Defragmentation helps HDDs by grouping data for the physical read head; SSDs access all segments instantly.'),
          () => makeMCQ('What is the difference between Lossy and Lossless compression?', 'Lossy deletes data permanently, Lossless keeps it all', ['Lossy is only for text, Lossless is for video', 'There is no difference', 'Lossless is faster but makes files larger'], 'Loss of data.', 'Lossy compression (like JPEG) trades quality for smaller size, while Lossless (like ZIP) preserves exact data.'),
          () => makeMCQ('What role does the OS play in Multitasking?', 'It manages RAM allocation to prevent apps from clashing', ['It speeds up the internet connection', 'It cools down the CPU', 'It provides a better screen resolution'], 'Memory management.', 'The OS manages memory and CPU time to allow multiple programs to appear to run at the same time.'),
          () => makeMCQ('What is the purpose of defragmentation on a magnetic hard drive?', 'To reorganise fragmented files so they are stored contiguously', ['To delete old files', 'To speed up the processor', 'To compress data'], 'Bring pieces together.', 'Over time files become fragmented across a disk; defragmentation groups them so the read head moves less.'),
          () => makeMCQ('What does encryption utility software do?', 'Scrambles data so it cannot be read without the correct key', ['Speeds up file access', 'Removes duplicate files', 'Connects devices to a network'], 'Scrambles data.', 'Encryption converts plaintext into ciphertext using an algorithm and key, protecting data from unauthorised access.'),
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
          () => makeMCQ('What is E-waste?', 'Electronic waste thrown into landfills', ['Emails that are deleted', 'Data that takes up too much RAM', 'Slow internet speeds'], 'Electronic junk.', 'E-waste includes discarded phones, laptops, and batteries containing toxic chemicals.'),
          () => makeMCQ('Which law protects music, films, and software from being copied?', 'Copyright, Designs and Patents Act 1988', ['Data Protection Act', 'Computer Misuse Act', 'Human Rights Act'], 'Intellectual property protection.', 'The Copyright Act protects creators from having their work copied without permission.'),
          () => makeMCQ('What environmental issue is caused by millions of servers running 24/7?', 'High energy consumption', ['Air pollution from screens', 'Water contamination', 'Noise pollution'], 'Data centres use enormous power.', 'Global data centres consume roughly 200 TWh of electricity per year, contributing to carbon emissions.'),
        ])();
      } else {
        return pick([
          () => makeMCQ('What is a major advantage of Open Source software?', 'The source code is available to view and modify', ['It is always faster than proprietary', 'It comes with a personal support team', 'It never has any bugs'], 'Open code.', 'Open Source allows transparency and community improvement of the code.'),
          () => makeMCQ('What is meant by the "Digital Divide"?', 'The gap between those with and without internet/tech access', ['The split between hardware and software', 'A special firewall technology', 'A new type of CPU core'], 'A divide in access.', 'The Digital Divide highlights social inequality caused by a lack of access to technology.'),
          () => makeMCQ('Why is "Stakeholder Conflict" common in surveillance tech?', 'Users want privacy, while companies/govt want data/security', ['Everyone has the same goal', 'The technology is too cheap', 'It only works in one country'], 'Privacy vs Security.', 'There is often a conflict between the user\'s right to privacy and the needs of security or marketing data collection.'),
          () => makeMCQ('What is proprietary software?', 'Software where the source code is kept secret and owned by a company', ['Software with no copyright', 'Software anyone can edit', 'Software given away free'], 'Proprietary = privately owned.', 'Proprietary software (like Microsoft Office) keeps its source code closed; users must pay for licences.'),
          () => makeMCQ('Under the Data Protection Act, data must be stored securely and used for what purpose?', 'Only for the purpose it was originally collected for', ['Any purpose the company chooses', 'Sharing with partners freely', 'For marketing only'], 'Purpose limitation.', 'The DPA 2018 includes a principle of purpose limitation — data must only be used for its stated, original purpose.'),
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
    hacks: [
      { title: 'Abstraction is Hiding', content: 'In an exam, remember: Abstraction is NOT deleting details; it is HIDING irrelevant ones. Like using a TV remote without knowing how the internal circuits work.' },
      { title: 'Validation vs Verification', content: 'Validation: "Is it the right type?" (e.g. is it a number?). Verification: "Is it actually correct?" (e.g. is it the right password?).' }
    ],
    advanced: [
      { title: 'Big O Notation', content: 'Computer scientists use "Big O" to describe how the time or space taken by an algorithm grows as the input size grows. O(1) is constant, O(n) is linear, and O(n²) is quadratic.' },
      { title: 'The Halting Problem', content: 'Alan Turing proved that there are some problems that computers can NEVER solve, such as determining if a general program will ever stop or loop forever.' }
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        const types = [
          () => makeMCQ('What is decomposition?', 'Breaking a problem down into smaller parts', ['Removing unnecessary details', 'Finding patterns', 'Writing code'], 'Think about decomposing organic matter (breaking down).', 'Decomposition breaks complex problems down to make them manageable.'),
          () => makeMCQ('What is abstraction?', 'Removing unnecessary details', ['Breaking problems down', 'Converting data types', 'Finding errors'], 'Subtracting the useless stuff.', 'Abstraction filters out non-essential characteristics.'),
          () => makeMCQ('What is the main goal of algorithmic thinking?', 'Creating a step-by-step set of rules to solve a problem', ['Choosing the right programming language', 'Buying the fastest computer', 'Hiring more programmers'], 'Rules and steps.', 'Algorithmic thinking is about defining the exact steps to reach a solution.'),
          () => makeMCQ('Identifying that "sorting names" and "sorting prices" use similar logic is an example of what?', 'Pattern Recognition', ['Decomposition', 'Abstraction', 'Casting'], 'Finding similarities.', 'Pattern recognition identifies similarities between different problems to reuse solutions.'),
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
          () => makeMCQ('Which type of check ensures an age is between 0 and 120?', 'Range check', ['Presence check', 'Format check', 'Lookup check'], 'Checking a range of values.', 'A range check validates that numerical data falls within a specific minimum and maximum.'),
          () => makeMCQ('What is the difference between validation and verification?', 'Validation checks if data follows rules; verification checks if it is actually correct', ['Verification checks data types; validation checks password length', 'They are the same thing', 'Validation is done by humans; verification by software'], 'Rules vs Truth.', 'Validation follows rules (e.g. is it an email?); verification confirms accuracy (e.g. check the ID card).'),
          () => makeMCQ('Which of these is a feature of maintainable code?', 'Meaningful variable names and indentation', ['Using global variables everywhere', 'Writing code without comments', 'Putting everything on one line'], 'Easy for others to read.', 'Indentation, comments, and clear names make code much easier to maintain over time.'),
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
        { title: 'Identifying Patterns', content: 'Tracing allows you to see if a variable is following a pattern (e.g. doubling every time), which helps you understand the algorithm\'s purpose.' },
        { title: 'Structure Diagrams', content: 'A visual way to break a problem into sub-problems (decomposition). The main task goes at the top, and smaller tasks branch off below — like an upside-down tree.', tip: 'Structure diagrams are essentially "visual decomposition" — a favourite exam question!' },
        { title: 'OCR Exam Reference Language', content: 'The official pseudocode used in OCR exams. Key syntax: for/next, while/endwhile, if/then/endif, switch/case/endswitch, procedure/endprocedure, function/endfunction.', tip: 'You don\'t have to MEMORISE it, but you must be able to READ and UNDERSTAND it in the exam.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return pick([
          () => makeMCQ('What is the main benefit of a trace table?', 'Tracking variable values line by line', ['Translating code into machine code', 'Preventing syntax errors', 'Converting data types'], 'Think about "tracing" the data state.', 'Trace tables let you track exactly what variable holds what value at each line.'),
          () => makeMCQ('Why do we use pseudocode?', 'It is easy to read and language-independent', ['It runs faster on CPUs', 'It automatically compiles to Python', 'It prevents all logic errors'], 'Pseudo means fake/imitation.', 'Pseudocode bridges the gap between English and strict, rigid code syntax.'),
          () => makeMCQ('What symbol is commonly used for assignment in GCSE pseudocode?', '←', ['==', '!=', 'IF'], 'Points the value into the variable.', 'The arrow (←) shows data being assigned to a named variable.'),
          () => makeMCQ('A "dry run" is the process of...', 'Walking through code manually to find errors', ['Running code on a server', 'Deleting unused variables', 'Compiling code into binary'], 'Manually checking.', 'Dry runs involve manually tracing through an algorithm using pen and paper to find logic flaws.'),
          () => makeMCQ('What keyword shows a message to the user in pseudocode?', 'print() or output()', ['input()', 'get()', 'save()'], 'Showing data.', 'Pseudocode uses print or output to display information to the user.'),
        ])();
      } else {
        return pick([
          () => makeMCQ('Which tool is best for finding exactly where a logic error occurs in a loop?', 'Trace table', ['Compiler', 'Syntax highlighter', 'IDE debugger'], 'Step by step tracking.', 'Trace tables track variable values through every iteration of a loop, exposing logic errors.'),
          () => makeMCQ('A structure diagram is a visual way of showing which concept?', 'Decomposition', ['Logic gates', 'Network protocols', 'Memory addresses'], 'Breaking things down.', 'Structure diagrams break a main task into sub-tasks visually.'),
          () => makeMCQ('In a trace table, what should you record for every line of code?', 'The current value of every relevant variable', ['The memory address of each variable', 'The binary translation of the code', 'The name of the programmer'], 'Variable state.', 'Trace tables track the state (value) of variables as they change over time.'),
          () => makeMCQ('How do you trace a WHILE loop correctly?', 'Check the condition *before* entering and *after* each iteration', ['Check it only at the end', 'Only check it once', 'Check it only if an error occurs'], 'Loop conditions.', 'A WHILE loop condition must be checked before every single execution of its body.'),
          () => makeMCQ('What is OCR Exam Reference Language (ERL)?', 'The official pseudocode used in OCR exams', ['A programming language for robots', 'A tool for hacking web servers', 'A type of CPU architecture'], 'Exam pseudocode.', 'OCR ERL is the standardized pseudocode students must understand for their GCSE exams.'),
        ])();
      }
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
        return pick([
          () => makeMCQ('Which search algorithm checks every single item consecutively?', 'Linear search', ['Binary search', 'Bubble sort', 'Merge search'], 'Line by line.', 'Linear search walks down the line, evaluating every single element.'),
          () => makeMCQ('In a list of 10 items, what is the maximum number of steps a linear search would take?', '10', ['5', '1', '100'], 'Worst case scenario.', 'Linear search may have to check every single item if the target is at the end or missing.'),
          () => makeMCQ('Which search works on UNSORTED lists?', 'Linear search', ['Binary search', 'Both linear and binary', 'Neither'], 'No order needed.', 'Linear search does not require data to be in any specific order to work.'),
          () => makeMCQ('On average, how many items does a linear search check?', 'Half the list', ['The whole list', 'Only the first item', 'None'], 'Middle of the road.', 'Statistically, a linear search finds the target roughly halfway through the list on average.'),
          () => makeMCQ('What is the "Worst Case" for a linear search?', 'The item is at the end or not in the list', ['The item is at the start', 'The list is empty', 'The list is already sorted'], 'Furthest distance.', 'The maximum steps occur when the item is at the very last index or not present.'),
        ])();
      } else {
        return pick([
          () => makeMCQ('What is an essential requirement for a Binary Search to work?', 'The data must be sorted', ['The data must be integers', 'The list must be short', 'The data must be unordered'], 'You can’t guess "higher or lower" if it\'s scrambled.', 'Binary search relies on data being sequentially ordered to discard halves safely.'),
          () => makeMCQ('Why is binary search more efficient than linear search?', 'It discards half the remaining data with every step', ['It uses more memory', 'It runs only on supercomputers', 'It doesn\'t need sorted data'], 'Divide and conquer.', 'By splitting the list, binary search dramatically reduces the number of comparisons needed.'),
          () => makeMCQ('How do you calculate the midpoint of a list in binary search?', '(Start + End) DIV 2', ['Start + End', 'End - Start', 'Start * End / 2'], 'Middle index.', 'The midpoint index is found by taking the average of the start and end indices.'),
          () => makeMCQ('A list has 1,000,000 items. Roughly how many steps will binary search take?', '20', ['1,000', '500,000', '1,000,000'], 'Logarithmic growth.', 'Binary search is extremely fast; it takes roughly 20 steps to search a million items.'),
          () => makeMCQ('If you double the size of a list, how many extra steps does binary search take?', '1', ['2', 'It doubles', 'None'], 'One extra split.', 'Because it halves the data, doubling the list size only adds one single extra step to binary search.'),
        ])();
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
        { title: 'Bubble Sort', visualId: 'cs-sorting-lab', content: 'Compares adjacent items and swaps them if out of order. Repeats until a full pass occurs with no swaps.' },
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
          () => makeMCQ('Which sorting algorithm is often the easiest to program?', 'Bubble sort', ['Merge sort', 'Quick sort', 'Insertion sort'], 'Simple swaps.', 'Bubble sort is easy to implement but inefficient for large lists.'),
          () => makeMCQ('Which sort takes each item from an unsorted list and places it in a growing sorted list?', 'Insertion sort', ['Merge sort', 'Bubble sort', 'Binary sort'], 'Pick and place.', 'Insertion sort builds the final sorted array one item at a time.'),
          () => makeMCQ('In Bubble Sort, if no swaps are made during a full pass, what does it mean?', 'The list is fully sorted', ['The list is in reverse order', 'The computer has crashed', 'The list is too long'], 'No changes needed.', 'A pass with zero swaps indicates that every item is already in its correct position.'),
        ];
        return pick(types)();
      } else {
        const types = [
          () => makeMCQ('Which algorithm uses an efficient "Divide and Conquer" approach?', 'Merge sort', ['Bubble sort', 'Insertion sort', 'Binary sort'], 'It literally splits data in half constantly.', 'Merge Sort divides the array down to single elements and merges them in sorted order.'),
          () => makeMCQ('What is a major advantage of Merge Sort over Bubble Sort?', 'It is much faster for large datasets', ['It uses less memory', 'It is easier to code', 'It works on unsorted lists'], 'Speed for big data.', 'Merge Sort has a time complexity of O(n log n), making it far superior to Bubble Sort for large amounts of data.'),
          () => makeMCQ('What is a disadvantage of Merge Sort?', 'It requires extra memory to store sub-lists', ['It is very slow', 'It only works with text', 'It is a linear algorithm'], 'Memory usage.', 'Because it creates sub-lists as it divides, merge sort has a higher memory overhead than in-place sorts.'),
          () => makeMCQ('A Merge Sort is about to start on a list of 8 items. How many sub-lists of size 1 will it create?', '8', ['4', '16', '1'], 'Every item becomes its own list.', 'Merge sort divides the list until every single element is a sub-list of size 1.'),
          () => makeMCQ('Which sorting algorithm is generally considered to have the best "worst-case" performance?', 'Merge sort', ['Bubble sort', 'Insertion sort', 'Selection sort'], 'Consistent speed.', 'Merge sort is consistent in its O(n log n) performance even in worst-case scenarios.'),
          () => makeMCQ('When is an Insertion Sort often more efficient than a Merge Sort?', 'When the list is very small or already mostly sorted', ['When the list is extremely large', 'When the list is completely random', 'When memory is unlimited'], 'Best case for insertion.', 'Insertion sort is highly efficient for small or partially ordered datasets.'),
        ];
        return pick(types)();
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
      if (tier === 'foundation') {
        return pick([
          () => makeMCQ('In a flowchart, what shape represents a Decision?', 'Diamond', ['Rectangle', 'Parallelogram', 'Oval'], 'A bright jewel splits light.', 'Decisions branch off via Yes/No paths so they use diamond shapes.'),
          () => makeMCQ('What does a parallelogram represent in a flowchart?', 'Input/Output', ['Process', 'Start/Stop', 'Decision'], 'Data coming in or out.', 'Parallelograms represent getting input or outputting data.'),
          () => makeMCQ('What shape represents a Process (like a calculation)?', 'Rectangle', ['Diamond', 'Parallelogram', 'Oval'], 'A standard block.', 'Rectangles are used for processing steps, calculations, or assignments.'),
          () => makeMCQ('What shape represents the Start or End of a flowchart?', 'Oval', ['Rectangle', 'Diamond', 'Triangle'], 'Round edges.', 'Ovals (terminators) mark the entry and exit points of the algorithm.'),
          () => makeMCQ('What MUST be written on the lines exiting a Decision diamond?', 'Labels like Yes/No or True/False', ['The variable names', 'The name of the next shape', 'Nothing'], 'Label the paths.', 'Arrows leaving a decision diamond must be labeled so the path is clear.'),
        ])();
      } else {
        return pick([
          () => makeMCQ('How is an infinite loop represented in a flowchart?', 'An arrow that loops back to a previous stage without a break', ['A shape with no exit arrows', 'A flowchart with two ovals', 'A diamond with three exits'], 'Going back in circles.', 'Loops are shown by arrows returning to an earlier point in the sequence.'),
          () => makeMCQ('What is a "Logic Error" in a flowchart?', 'A path that never reaches an End oval or a loop that can never stop', ['Using the wrong shape', 'A typo in the text', 'The flowchart being too small'], 'Flawed logic path.', 'A logic error in a diagram means the flow is broken or incorrect.'),
          () => makeMCQ('Which shape would you use for "X = Y + 5"?', 'Rectangle', ['Diamond', 'Parallelogram', 'Oval'], 'It is a process/calculation.', 'Assignments and calculations are "processes" and go in rectangles.'),
          () => makeMCQ('Which shape would you use for "Input temperature"?', 'Parallelogram', ['Rectangle', 'Diamond', 'Oval'], 'It is an input.', 'Data input and output operations use parallelograms.'),
          () => makeMCQ('A structure diagram is used for...', 'Decomposition', ['Logic gates', 'Network protocols', 'CPU registers'], 'Breaking it down.', 'Structure diagrams break a main task down into sub-tasks visually.'),
        ])();
      }
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
        return pick([
          () => makeMCQ('Which data type stores text like "Hello"?', 'String', ['Integer', 'Boolean', 'Real'], 'Think of a line of characters.', 'A String holds a sequence of characters.'),
          () => makeMCQ('What is a variable?', 'A named memory location that stores changing data', ['A piece of data that never changes', 'A type of loop', 'A logic error'], 'It "varies".', 'Variables act as buckets holding changeable data.'),
          () => makeMCQ('What is the best data type for the value True?', 'Boolean', ['String', 'Integer', 'Float'], 'Yes/No.', 'Boolean values are strictly True or False.'),
          () => makeMCQ('Which data type is best for a whole number like 42?', 'Integer', ['Float', 'String', 'Boolean'], 'Whole number.', 'Integers represent whole numbers without fractional parts.'),
          () => makeMCQ('What is a constant?', 'A named memory location that CANNOT change', ['A variable that changes often', 'A type of function', 'A hardware component'], 'Stays the same.', 'Constants are like variables but their value remains fixed during program execution.'),
          () => makeMCQ('Which operator is used for assignment (setting a value)?', '=', ['==', '!=', '+'], 'Set equal to.', 'The single equals sign assigns a value to a variable.'),
        ])();
      } else {
        return pick([
          () => makeMCQ('What operator calculates the remainder of a division?', 'MOD (Modulo)', ['DIV', '/', '*'], 'Modular arithmetic focuses on remainders.', 'Modulo (often represented as % or MOD) gives the remainder (e.g. 10 MOD 3 = 1).'),
          () => makeMCQ('Which data type is best for the number 3.14?', 'Real / Float', ['Integer', 'String', 'Boolean'], 'It has a decimal point.', 'Real (or Float) numbers support decimal precision.'),
          () => makeMCQ('What is the result of 17 DIV 5?', '3', ['2', '3.4', '4'], 'Integer division.', 'DIV gives the whole number of times a number goes into another.'),
          () => makeMCQ('What is the purpose of concatenation?', 'Joining two strings together', ['Dividing numbers', 'Comparing values', 'Clearing memory'], 'Join them.', 'Concatenation (usually using +) joins strings together (e.g. "Hello" + "World").'),
          () => makeMCQ('What does the comparison operator "!=" mean?', 'Not equal to', ['Equal to', 'Less than', 'Greater than'], 'Difference.', '!= is used to check if two values are different.'),
          () => makeMCQ('Why use constants instead of "magic numbers"?', 'They make code easier to update and understand', ['They make the program run faster', 'They prevent all bugs', 'They save RAM'], 'Better maintenance.', 'Giving a name to a fixed value (like MAX_LIVES = 3) makes code much more readable.'),
        ])();
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
        return pick([
          () => makeMCQ('What programming construct uses IF/ELSE statements?', 'Selection', ['Sequence', 'Iteration', 'Casting'], 'You "select" a pathway.', 'Selection alters the flow to choose specific blocks of code.'),
          () => makeMCQ('What does "Iteration" mean?', 'Looping code', ['Running code from top to bottom', 'Making a decision', 'Finding an error'], 'Iterating refers to repeating.', 'Iteration involves FOR or WHILE loops to repeat actions.'),
          () => makeMCQ('Which loop is best when you know exactly how many times it should run?', 'FOR loop', ['WHILE loop', 'IF statement', 'SWITCH statement'], 'Count-controlled.', 'FOR loops are count-controlled and repeat a specific number of times.'),
          () => makeMCQ('What is "Sequence" in programming?', 'Running code line-by-line from top to bottom', ['Jumping to a random line', 'Repeating code', 'Making a decision'], 'The order.', 'Sequence means the instructions are executed in the order they appear.'),
          () => makeMCQ('A WHILE loop repeats until a condition becomes...', 'False', ['True', 'Zero', 'Null'], 'Loop while true.', 'A WHILE loop keeps running as long as its condition is True.'),
          () => makeMCQ('What happens if a WHILE loop condition never becomes false?', 'An infinite loop occurs', ['The computer crashes instantly', 'The loop runs once then stops', 'The code is deleted'], 'Never-ending.', 'An infinite loop repeats forever because the exit condition is never met.'),
        ])();
      } else {
        return pick([
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
           },
           () => makeMCQ('What does a "Switch/Case" statement provide?', 'A cleaner way to check one variable against many possible values', ['A way to loop forever', 'A method for calculating math', 'A security firewall'], 'Choice based on value.', 'Switch/Case is an alternative to long IF-ELIF chains.'),
           () => makeMCQ('What is a nested selection?', 'An IF statement inside another IF statement', ['A loop inside a loop', 'A function inside a function', 'A variable inside a constant'], 'Nested choices.', 'Nesting allows for multi-layered decision making.'),
           () => makeMCQ('Which keyword exits a loop immediately?', 'break', ['continue', 'stop', 'exit'], 'Break out.', 'The "break" keyword terminates the loop and moves to the code after the loop.'),
           () => makeMCQ('What is the difference between WHILE and DO UNTIL?', 'WHILE checks condition at the start; DO UNTIL checks at the end', ['There is no difference', 'WHILE is faster', 'DO UNTIL uses less RAM'], 'Check first or check last.', 'WHILE loops might never run if the condition is false initially; DO UNTIL always runs at least once.'),
        ])();
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
          () => makeMCQ('Which error is caused by misspelling a keyword like "print"?', 'Syntax error', ['Logic error', 'Runtime error', 'Hardware error'], 'Spelling is part of grammar.', 'Syntax errors occur when the programmer breaks the rules of the programming language.'),
          () => makeMCQ('Which error is like a "wrong recipe" — it finishes but tastes bad?', 'Logic error', ['Syntax error', 'Compiler error', 'Translation error'], 'The logic is wrong.', 'Logic errors are the hardest to spot because the computer thinks it is doing everything right.'),
          () => makeMCQ('Missing a colon (:) at the end of an IF statement in Python is what type of error?', 'Syntax error', ['Logic error', 'Execution error', 'Input error'], 'Missing punctuation.', 'All punctuation required by the language is part of the syntax.'),
        ];
        return pick(types)();
      } else {
        return pick([
          () => makeMCQ('Attempting to divide a number by a variable holding 0 will result in what type of error?', 'Runtime error', ['Syntax error', 'Logic error', 'Boolean error'], 'It crashes during execution.', 'Math exceptions trigger runtime errors when evaluating impossible calculations live.'),
          () => makeMCQ('What is the main difference between syntax and logic errors?', 'Syntax errors prevent running; logic errors allow running but produce wrong output', ['Logic errors are found by compilers', 'Syntax errors are harder to find', 'There is no difference'], 'Stop vs Continue.', 'Syntax errors are caught by the translator; logic errors must be found by the programmer through testing.'),
          () => makeMCQ('What type of error occurs if a program tries to access a file that has been deleted?', 'Runtime error', ['Syntax error', 'Logic error', 'Formatting error'], 'Crashes while running.', 'Problems with external resources (files, networks) usually cause runtime errors.'),
          () => makeMCQ('Which IDE tool is most helpful for finding logic errors?', 'Trace Table / Debugger', ['Syntax highlighter', 'Auto-complete', 'File manager'], 'Step-through logic.', 'Debuggers allow you to watch variables change line-by-line, exposing logic flaws.'),
          () => makeMCQ('A loop that runs 11 times instead of 10 because of an "off-by-one" error is a...', 'Logic error', ['Syntax error', 'Runtime error', 'Hardware error'], 'The code runs, but the count is wrong.', 'Off-by-one errors are classic examples of flawed logic.'),
        ])();
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
        return pick([
          () => makeMCQ('In computing, what number do array indexes usually start at?', '0', ['1', '-1', 'It depends on the array length'], 'Zero-indexed.', 'Most programming languages start indices at 0 (e.g., array[0] is the 1st element).'),
          () => makeMCQ('Which data structure stores multiple items of the SAME type under one name?', 'Array', ['Variable', 'Constant', 'Float'], 'A list or collection.', 'Arrays are used to store multiple related items (e.g. scores, names) efficiently.'),
          () => makeMCQ('What is the index of the last item in an array of length 10?', '9', ['10', '0', '11'], '0 to N-1.', 'Since we start at 0, the 10th item is at index 9.'),
          () => makeMCQ('Which structure can store different data types (e.g. Name and Age) together?', 'Record', ['Array', 'Integer', 'Boolean'], 'A row of info.', 'Records (or Structs) group related but different types of data into one entity.'),
          () => makeMCQ('What happens if you try to access index 5 in an array of length 3?', 'Index out of bounds error', ['It returns the first item', 'It returns 0', 'The computer deletes the array'], 'Searching for nothing.', 'Accessing an index that doesn\'t exist causes a crash or error.'),
        ])();
      } else {
        return pick([
          () => makeMCQ('What is typically used to traverse through all elements of an array?', 'A FOR loop or WHILE loop', ['An IF statement', 'An SQL query', 'A Logic Gate'], 'You need to iterate.', 'Loops provide controlled iteration to process every index in an array.'),
          () => makeMCQ('How do you access the value in the 2nd row and 3rd column of a 2D array named "grid"?', 'grid[1][2]', ['grid[2][3]', 'grid(1,2)', 'grid[3,2]'], '0-indexed: row 2 is index 1, col 3 is index 2.', '2D arrays use two indices: grid[rowIndex][columnIndex].'),
          () => makeMCQ('What is an advantage of using a 2D array over multiple 1D arrays?', 'It is easier to represent data in a grid/table format', ['It uses less RAM', 'It runs faster on the CPU', 'It prevents syntax errors'], 'Table structure.', '2D arrays are ideal for maps, game boards, or spreadsheet-like data.'),
          () => makeMCQ('Why is an array considered a "Static" data structure in many languages?', 'Its size cannot be changed once it is created', ['It is stored on the hard drive', 'It only stores numbers', 'It is never deleted'], 'Fixed size.', 'Static structures have a fixed memory allocation determined at the start.'),
          () => makeMCQ('A record is a collection of related...', 'Fields', ['Indices', 'Algorithms', 'Gates'], 'Think of a database row.', 'Each piece of data in a record is called a "field".'),
        ])();
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
        { title: 'Logic Gates', visualId: 'cs-logic-gate-lab', content: 'AND: Output is True ONLY if both inputs are True. OR: Output is True if AT LEAST ONE input is True. NOT: Reverses the input.' },
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
          },
          () => makeMCQ('How many rows are in a truth table for a 2-input logic gate?', '4', ['2', '8', '16'], '2 to the power of inputs.', 'With 2 inputs (A and B), there are 4 combinations: 00, 01, 10, 11.'),
          () => makeMCQ('Which component in a CPU is made of billions of logic gates?', 'Transistors', ['Hard Drive', 'RAM', 'Monitor'], 'The tiny switches.', 'Transistors are the physical building blocks of all logic circuits.'),
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
           },
           () => makeMCQ('In Boolean algebra, what symbol represents the OR operation?', '+', ['.', '*', 'NOT'], 'Like addition.', 'The + symbol is used for OR, while . or * is used for AND.'),
           () => makeMCQ('How many rows would a truth table for 3 inputs (A, B, C) have?', '8', ['6', '4', '16'], '2³ = 8.', 'Every extra input doubles the number of rows in a truth table.'),
           () => makeMCQ('Which logic circuit is used to perform binary addition?', 'Full Adder', ['Subtractor', 'Multiplier', 'Register'], 'Adds things.', 'An Adder circuit uses XOR and AND gates to add binary digits.'),
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
      if (tier === 'foundation') {
        return pick([
          () => makeMCQ('What symbol usually means "Not Equal To" in code?', '!=', ['==', '>=', '='], 'An exclamation of difference.', '!= is the standard logical operator for checking inequality.'),
          () => makeMCQ('Which operator checks if one value is strictly LARGER than another?', '>', ['<', '==', '>='], 'Points to the smaller.', 'The greater-than symbol (>) compares two numerical values.'),
          () => makeMCQ('What is the result of (10 > 5)?', 'True', ['False', '10', '5'], 'Logic check.', '10 is indeed greater than 5, so the expression evaluates to True.'),
        ])();
      } else {
        return pick([
          () => makeMCQ('Evaluate the expression: (score >= 50 AND lives > 0) where score=40 and lives=3.', 'False', ['True', '90', 'Error'], 'Both must be true.', 'score >= 50 is False, so the entire AND expression is False.'),
          () => makeMCQ('Which operator means "Equal To" for comparisons?', '==', ['=', '!=', '==='], 'Double equals.', 'A single = is for assignment; double == is for checking equality.'),
          () => makeMCQ('Evaluate: NOT (5 == 5)', 'False', ['True', '0', 'Null'], 'Flip the result.', '5 == 5 is True; NOT True is False.'),
        ])();
      }
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
          () => makeMCQ('What does "FROM" specify in an SQL query?', 'The name of the table to look in', ['The columns to show', 'The sorting order', 'The primary key'], 'Where data comes FROM.', 'FROM tells the database which table the data should be retrieved from.'),
          () => makeMCQ('Which field uniquely identifies every record in a table?', 'Primary Key', ['Foreign Key', 'User ID', 'Field Name'], 'The main key.', 'The primary key must be unique for every single row in a database table.'),
          () => makeMCQ('What is "Data Redundancy"?', 'Storing the same data multiple times unnecessarily', ['Deleting important data', 'Encrypting data', 'Backing up data'], 'Repeating data.', 'Redundancy wastes space and can lead to errors when updating records.'),
        ];
        return pick(types)();
      } else {
        return pick([
          () => makeMCQ('If an SQL query reads `WHERE Price > 50 OR Stock < 10`, what gets returned?', 'Items over 50 OR items running low', ['Only items meeting both rules', 'All items', 'An error'], 'It is an either-or inclusive filter.', 'The OR operator pulls any record mapping to at least one condition.'),
          () => makeMCQ('What is the correct order for an SQL query?', 'SELECT, FROM, WHERE', ['FROM, SELECT, WHERE', 'WHERE, FROM, SELECT', 'SELECT, WHERE, FROM'], 'S-F-W.', 'The standard structure is SELECT [columns] FROM [table] WHERE [condition].'),
          () => makeMCQ('Which SQL keyword is used to sort results?', 'ORDER BY', ['SORT BY', 'ARRANGE', 'GROUP'], 'Put in order.', 'ORDER BY sorts the output in ASC (ascending) or DESC (descending) order.'),
          () => makeMCQ('What does the LIKE operator do in SQL?', 'Searches for a pattern in a column', ['Checks if two columns are identical', 'Finds similar tables', 'Compares numbers'], 'Pattern matching.', 'LIKE is used with wildcards (e.g. %) to find partial text matches.'),
          () => makeMCQ('Which command would delete all records where "Status" is "Old"?', 'DELETE FROM table WHERE Status = "Old"', ['REMOVE FROM table Status = "Old"', 'DELETE Status = "Old"', 'DROP Status = "Old"'], 'Delete from where.', 'DELETE FROM requires a WHERE clause to avoid wiping the entire table.'),
        ])();
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
        { title: 'Binary to Denary', visualId: 'cs-binary-lab', content: 'Denary is base 10 (0-9). Binary is base 2 (0-1). Use a table: 128, 64, 32, 16, 8, 4, 2, 1.', example: '1010 = 8 + 2 = 10' },
        { title: 'Hexadecimal', content: 'Base 16 (0-F). A=10, B=11, C=12, D=13, E=14, F=15. Much easier for humans to read than binary.', tip: 'One Hex digit equals exactly four bits (one nibble).' },
        { title: 'Binary Conversion (Hex)', content: 'Split the byte into two nibbles. Convert each nibble to hex then join.', example: '1011 0011 -> 11 (B) 3 -> B3' },
        { title: 'File Size Calculations', content: 'Image: colour depth × width (px) × height (px). Sound: sample rate × duration (s) × bit depth. Text: bits per character × number of characters.', tip: 'Always check your units — convert bits to bytes by dividing by 8!' }
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
        return pick([
          () => {
            const d = r(5, 50);
            return makeMCQ(`Convert denary ${d} to an 8-bit binary number`, d.toString(2).padStart(8, '0'), [r(1, 128).toString(2).padStart(8, '0')], 'Use the 128, 64, 32... table.', `Denary ${d} is ${d.toString(2)} in binary.`);
          },
          () => makeMCQ('How many bits are in a byte?', '8', ['4', '16', '1024'], 'A fundamental unit.', 'There are exactly 8 bits in one byte.'),
          () => makeMCQ('What is a nibble?', '4 bits', ['8 bits', '2 bits', '16 bits'], 'Half a byte.', 'A nibble is a 4-bit aggregation, or half an octet (byte).'),
          () => makeMCQ('Which number system uses the digits 0-9 and letters A-F?', 'Hexadecimal', ['Binary', 'Denary', 'Octal'], 'Base 16.', 'Hexadecimal uses 16 symbols to represent values.'),
          () => makeMCQ('In Hexadecimal, what value does the letter "A" represent?', '10', ['1', '15', '11'], 'After 9 comes A.', 'Hex uses A for 10, B for 11, up to F for 15.'),
          () => makeMCQ('Which unit is larger than a Megabyte (MB)?', 'Gigabyte (GB)', ['Kilobyte (KB)', 'Bit', 'Byte'], 'K-M-G-T.', 'The order of units is Kilobyte, Megabyte, Gigabyte, Terabyte.'),
        ])();
      } else {
        return pick([
          () => {
            const b = r(10, 30);
            return makeMCQ(`Perform a Logical Shift Left by 2 on binary ${b.toString(2).padStart(4, '0')}. What is the new denary value?`, b * 4, [b * 2, b + 2, b / 2], 'Shift Left 1 = ×2, Shift Left 2 = ×4.', `${b} × 4 = ${b * 4}`);
          },
          () => makeMCQ('What occurs in binary addition when the result is too large for the allocated bits?', 'Overflow error', ['Underflow error', 'Syntax error', 'Logic error'], 'It spills over.', 'An overflow error occurs when the CPU tries to store a result larger than its register width.'),
          () => makeMCQ('Perform a Logical Shift Right by 1 on binary 1010 (denary 10). What is the new denary value?', '5', ['20', '11', '0'], 'Shift Right 1 = Divide by 2.', '1010 shifted right becomes 0101, which is 5 in denary.'),
          () => makeMCQ('What is the binary result of 1 + 1?', '0 carry 1', ['1', '2', '10'], '1 + 1 = 10 in binary.', 'In base 2, 1+1 equals 0 with a carry bit moved to the next column.'),
          () => makeMCQ('Why do programmers use Hexadecimal instead of Binary?', 'It is easier for humans to read and less prone to errors', ['It makes the computer run faster', 'It uses less memory', 'It is more secure'], 'Human readability.', 'Hexadecimal is a shorter, more readable shorthand for binary patterns.'),
          () => makeMCQ('Convert the Hexadecimal value "1A" to denary.', '26', ['11', '10', '16'], '1×16 + 10.', '1A = (1 × 16) + (10 × 1) = 16 + 10 = 26.'),
        ])();
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
      if (tier === 'foundation') {
        return pick([
          () => makeMCQ('Why is Unicode preferred over ASCII for modern systems?', 'It can represent characters from all world languages', ['It uses less memory', 'It is faster to process', 'It only uses 7 bits'], 'Think globally.', 'Unicode provides a much larger range of codes for global symbols and languages.'),
          () => makeMCQ('What is a "Pixel"?', 'A single point of color in a digital image', ['A type of computer cable', 'A sound recording', 'A text character'], 'Picture Element.', 'Pixel stands for Picture Element; it is the smallest unit of a digital image.'),
          () => makeMCQ('Which character set uses 7 bits to represent 128 characters?', 'ASCII', ['Unicode', 'Binary', 'Hex'], 'The original standard.', 'Standard ASCII uses 7 bits to represent English letters, numbers, and symbols.'),
          () => makeMCQ('Increasing the resolution of an image will...', 'Improve quality but increase file size', ['Make the file smaller', 'Reduce the number of colors', 'Delete metadata'], 'More pixels = more data.', 'Resolution is the density of pixels; more pixels mean a clearer image but more storage needed.'),
          () => makeMCQ('What is "Color Depth"?', 'The number of bits used to represent the color of each pixel', ['The width of an image', 'The date an image was taken', 'The brightness of the screen'], 'Depth of information.', 'Color depth determines how many unique colors can be displayed in an image.'),
        ])();
      } else {
        return pick([
          () => makeMCQ('What is "Metadata" in an image file?', 'Data about the data (e.g. dimensions, date)', ['The actual colors of the pixels', 'A hidden virus', 'The background music'], 'Contextual info.', 'Metadata provides the instructions for how the bitstream should be interpreted.'),
          () => makeMCQ('How many colors can be represented with a 4-bit color depth?', '16', ['4', '8', '32'], '2 to the power of 4.', 'The formula is 2^n, so 2^4 = 16 colors.'),
          () => makeMCQ('What does "Sampling Rate" mean in digital audio?', 'How many times per second the amplitude of the sound is measured', ['The volume of the recording', 'The length of the audio file', 'The type of speakers used'], 'Frequency of measurement.', 'Sample rate is measured in Hertz (Hz) and determines audio fidelity.'),
          () => makeMCQ('Which factor most directly affects the quality and file size of a sound file?', 'Sample rate and bit depth', ['The name of the artist', 'The color of the icon', 'The volume level'], 'Data frequency and precision.', 'Higher sample rates and bit depths capture more detail but require more storage.'),
          () => makeMCQ('Calculate the size of an 8-bit image that is 10x10 pixels.', '800 bits', ['100 bits', '10 bits', '80 bits'], 'Depth x Width x Height.', '8 bits x 10px x 10px = 800 bits total.'),
        ])();
      }
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
        { title: 'File Operations: Read/Write', content: '`writeLine()` overwrites part of the file. `append()` adds to the end. `readLine()` reads one line at a time.', tip: 'Reading a whole file at once can crash a program if the file is massive!' },
        { title: 'Random Number Generation', content: 'Generating unpredictable numbers in a range. In OCR ERL: random(1,6) gives a random integer between 1 and 6 inclusive.', example: 'dice = random(1,6)\nprint(dice)', tip: 'Used in games, simulations, and security (e.g. CAPTCHA codes).' },
        { title: 'Records (Data Structures)', content: 'A record stores a collection of related fields, each of which can be a DIFFERENT data type. Like a row in a database table.', example: 'Student record: Name (String), Age (Integer), Passed (Boolean)', tip: 'Arrays store same type; Records store mixed types grouped by entity.' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return pick([
          () => makeMCQ('What is the main difference between a Procedure and a Function?', 'A Function returns a value; a Procedure doesn\'t', ['Procedures are longer', 'Functions are only for math', 'Functions are from AQA, Procedures are from OCR'], 'The return trip.', 'Functions are designed to evaluate and send a result back to the caller.'),
          () => makeMCQ('Why do we use sub-programs?', 'To make code easier to read, test, and reuse', ['To make the computer run faster', 'To hide the code from hackers', 'To save power'], 'Better organization.', 'Breaking code into named blocks makes it much more manageable and maintainable.'),
          () => makeMCQ('In file handling, what MUST you do when you are finished with a file?', 'Close it', ['Delete it', 'Rename it', 'Copy it'], 'Clean up.', 'Closing a file frees up system memory and ensures all changes are saved.'),
          () => makeMCQ('What does "open" do in file handling?', 'Links a file on the disk to a variable in the program', ['Deletes the file', 'Prints the file', 'Translates the file'], 'Create a link.', 'The open() command prepares a file for reading or writing.'),
        ])();
      } else {
        return pick([
          () => makeMCQ('What is typically meant by "variable scope"?', 'Where in the code a variable is accessible', ['The size of the variable in bytes', 'The data type of the variable', 'How fast the variable loads'], 'Vision/Accessibility.', 'Scope defines whether a variable is local to a function or globally available.'),
          () => makeMCQ('What is a "local variable"?', 'A variable that can only be used within the sub-program where it was declared', ['A variable stored on the hard drive', 'A variable used by everyone', 'A variable that never changes'], 'Local to the block.', 'Local variables are destroyed once the sub-program finishes execution.'),
          () => makeMCQ('What is a parameter?', 'A variable named in the sub-program definition to receive data', ['The result of a function', 'The name of a file', 'A type of loop'], 'Input placeholder.', 'Parameters act as placeholders for the data (arguments) passed into a sub-program.'),
          () => makeMCQ('What is the difference between writing to a file and appending to a file?', 'Writing overwrites the file; appending adds to the end', ['Appending is faster', 'Writing is only for text', 'There is no difference'], 'Overwrite vs Add.', 'Append keeps existing data, whereas a standard write operation usually clears the file first.'),
          () => makeMCQ('Which file mode would you use to add a new score to a high-score list without deleting old ones?', 'Append', ['Read', 'Write', 'Close'], 'Add to the bottom.', 'Append mode specifically adds data to the end of an existing file.'),
        ])();
      }
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
        { title: 'Logic Errors vs Syntax Errors', content: 'Syntax errors break the "grammar" (won\'t run). Logic errors make the "brain" do the wrong thing (runs but result is wrong).', tip: 'Tracing helps find logic errors.' },
        { title: 'Authentication', content: 'Confirming a user is who they claim to be. Methods include username/password, biometrics (fingerprint, face), two-factor authentication (2FA), and email verification.', tip: '2FA combines something you KNOW (password) with something you HAVE (phone code).' },
        { title: 'Creating a Test Plan', content: 'A structured document listing: Test number, Description, Test data, Expected result, Actual result, Pass/Fail. Covers Normal, Boundary, and Invalid data for every input.', tip: 'A good test plan should be written BEFORE you start coding!' }
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return pick([
          () => makeMCQ('If a system accepts age 1-120, what type of test data is "120"?', 'Boundary', ['Normal', 'Invalid', 'Runtime'], 'On the edge.', 'Boundary data tests the extreme limits of acceptable ranges.'),
          () => makeMCQ('What is "Maintainability"?', 'Writing code that is easy for humans to read and fix', ['Ensuring the computer doesn\'t overheat', 'Storing data in a database', 'Connecting to a server'], 'Keeping it working.', 'Maintainable code uses comments and structure to aid future developers.'),
          () => makeMCQ('What is iterative testing?', 'Testing code as it is being developed, block by block', ['Testing only at the very end', 'Testing on different computers', 'Letting users test the code'], 'Repeat as you go.', 'Iterative testing happens during development to catch bugs early.'),
          () => makeMCQ('Which type of test data should a program REJECT?', 'Invalid data', ['Normal data', 'Boundary data', 'Valid data'], 'Bad inputs.', 'Invalid data is anything the program is NOT designed to process (e.g. text in an age box).'),
          () => makeMCQ('What is the purpose of a test plan?', 'To list exactly what will be tested and the expected results', ['To design the user interface', 'To write the code', 'To hire programmers'], 'Structured testing.', 'A test plan ensures every part of the system is checked systematically.'),
        ])();
      } else {
        return pick([
          () => makeMCQ('What is "Authentication"?', 'Verifying that a user is who they claim to be', ['Encrypting data', 'Speeding up the CPU', 'Cleaning the screen'], 'Prove identity.', 'Methods like passwords and biometrics are used for authentication.'),
          () => makeMCQ('Which of these is a way to make code more maintainable?', 'Using indentation, comments, and sub-programs', ['Using global variables for everything', 'Writing the whole program on one line', 'Using cryptic variable names like "x1"'], 'Easy to follow.', 'Good structure and documentation are the keys to maintainability.'),
          () => makeMCQ('What is the difference between validation and verification?', 'Validation follows rules; verification checks if it is actually correct', ['They are the same', 'Verification is for passwords only', 'Validation is for numbers only'], 'Rules vs Truth.', 'Validation checks if an input is sensible; verification checks if it matches reality.'),
          () => makeMCQ('Which type of data is "50" for a range of 1-100?', 'Normal', ['Boundary', 'Invalid', 'Syntax'], 'Typical input.', 'Normal data is valid data that falls comfortably within the expected range.'),
          () => makeMCQ('What does "Defensive Design" mean?', 'Anticipating and preventing potential user errors or attacks', ['Making the computer physically strong', 'Encrypting the whole internet', 'Deleting all user inputs'], 'Expect the unexpected.', 'Defensive design includes input validation and authentication to protect the program.'),
        ])();
      }
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
        { title: 'Translators', content: 'High-level code must be translated into Machine Code to run. Two types: Compiler and Interpreter.' },
        { title: 'Why Use High-Level?', content: 'High-level languages are easier to write, debug, and maintain. They are also portable — the same code can run on different hardware.', tip: 'Python, Java, and C# are all high-level languages used in industry.' },
      ],
      higher: [
        { title: 'Compiler', content: 'Translates whole code into an executable file once. Fast to run, hides source code, but takes long to compile initially.', tip: 'Good for finished projects.' },
        { title: 'Interpreter', content: 'Translates line-by-line while running. Stops at first error. Slower to run but great for debugging.', tip: 'Python is an interpreted language.' },
        { title: 'Assembler', content: 'A specific translator that converts Assembly Language into Machine Code.', tip: 'One assembly line = exactly one machine code instruction.' },
        { title: 'IDE Features', content: 'Editor (with syntax highlighting), Error Diagnostics, Runtime Environment, and Debugger.', tip: 'Syntax highlighting makes it easier to spot spelling mistakes!' },
        { title: 'Compiler vs Interpreter', content: 'Compiler: whole program translated once → fast to run, hard to debug. Interpreter: translated line-by-line → slow to run, easy to debug. Compiler output can be distributed without revealing source code.', tip: 'Exam tip: Compiler = finished product. Interpreter = development/testing.' },
      ],
    },
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return pick([
          () => makeMCQ('Which translator is best for finding errors during development?', 'Interpreter', ['Compiler', 'Assembler', 'Defragmenter'], 'Line by line.', 'Interpreters stop at errors immediately, making debugging faster during coding.'),
          () => makeMCQ('One line of high-level code usually translates into...', 'Many lines of machine code', ['Zero lines', 'Exactly one line', 'A GUI'], 'Abstract vs Concrete.', 'High-level languages are abstracted; one command performs many low-level CPU operations.'),
          () => makeMCQ('Which of these is a high-level programming language?', 'Python', ['Assembly', 'Machine Code', 'Binary'], 'Humans can read it.', 'Python is a high-level language with English-like syntax.'),
          () => makeMCQ('What must happen to high-level code before a CPU can run it?', 'It must be translated into machine code', ['It must be compressed', 'It must be encrypted', 'It must be deleted'], 'CPUs only understand binary.', 'A translator (compiler or interpreter) converts high-level code to machine code.'),
          () => makeMCQ('Which translator converts Assembly Language into Machine Code?', 'Assembler', ['Compiler', 'Interpreter', 'Editor'], 'Assemble the mnemonics.', 'A specific translator called an assembler is used for low-level assembly language.'),
          () => makeMCQ('What is an example of a low-level language?', 'Machine Code', ['Python', 'Java', 'C++'], 'Closest to the hardware.', 'Machine code (binary) is the lowest level language computers understand.'),
        ])();
      } else {
        return pick([
          () => makeMCQ('What is an advantage of a compiler over an interpreter?', 'The compiled program runs faster', ['It is easier to debug', 'It translates one line at a time', 'It requires no source code'], 'Pre-translated = fast.', 'A compiled executable runs directly without re-translating each time.'),
          () => makeMCQ('Which IDE feature highlights code problems before running?', 'Error diagnostics', ['Run-time environment', 'Editor', 'Compiler output'], 'Spot problems early.', 'Error diagnostics (like red underlines) flag syntax issues while you type.'),
          () => makeMCQ('What does an assembler do?', 'Converts assembly language to machine code', ['Converts Python to Java', 'Compresses files', 'Manages memory'], 'Assembly → Machine code.', 'An assembler is a specific type of translator for low-level assembly language.'),
          () => makeMCQ('Why are high-level languages considered "portable"?', 'They can be translated to run on many different types of CPU', ['They are small enough to fit on a USB stick', 'They only work on laptops', 'They don\'t need a translator'], 'Not tied to hardware.', 'High-level code can be re-compiled or interpreted for different processor architectures.'),
          () => makeMCQ('Which of these is a common feature of an Integrated Development Environment (IDE)?', 'Debugger and Syntax Highlighting', ['Internet browser', 'Social media integration', 'Anti-virus software'], 'Developer tools.', 'IDEs provide a suite of tools like editors, debuggers, and runtime environments to help programmers.'),
          () => makeMCQ('What is a disadvantage of a compiler?', 'It takes a long time to translate the whole program initially', ['The resulting program is very slow', 'It exposes the source code to everyone', 'It cannot find syntax errors'], 'Wait for it.', 'Compiling a large project can take minutes or even hours, unlike an interpreter which starts instantly.'),
        ])();
      }
    },
  },

  // ==============================================================
  // NEW: COMPRESSION (1.2.5)
  // ==============================================================

  'compression': {
    title: 'Data Compression',
    emoji: '🗜️',
    color: '#7d47ff',
    category: 'Computer Systems',
    description: 'Lossy vs lossless compression and when to use each.',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'Why Compress?', content: 'Compression reduces file size. This saves storage space, reduces upload/download time, and allows more files to fit on a device.', tip: 'Streaming music and video relies heavily on compression!' },
        { title: 'Lossy Compression', content: 'Permanently removes data to make the file smaller. The original file cannot be fully restored. Quality is reduced.', example: 'JPEG images, MP3 audio. A 10MB WAV audio file becomes ~1MB as MP3.' },
        { title: 'Lossless Compression', content: 'Reduces file size WITHOUT losing any data. The original file can be perfectly restored.', example: 'ZIP files, PNG images. Used when exact data must be preserved (e.g. text documents, medical scans).', tip: 'Lossless = No data Lost. Lossy = data Lost permanently.' },
        { title: 'Which to Choose?', content: 'Use Lossy when: small file size is priority and small quality loss is acceptable (e.g. streaming). Use Lossless when: exact data is critical (e.g. legal documents, software).', tip: 'A surgeon cannot use a lossy-compressed brain scan — they need every pixel!' },
        { title: 'Common Formats', content: 'Lossy: JPEG (images), MP3 (audio), MP4 (video). Lossless: PNG (images), FLAC (audio), ZIP/RAR (any files).', tip: 'PNG is lossless — that\'s why logos and screenshots use PNG not JPEG.' },
      ],
      higher: [
        { title: 'Run-Length Encoding (RLE)', content: 'A basic lossless algorithm. Consecutive repeated values are stored as a count + value instead of repeating the data.', example: 'AAAAABBBCC → 5A3B2C (saves space when many repeats exist).', tip: 'RLE works brilliantly on simple images like icons but poorly on photos.' },
        { title: 'Effect on Quality', content: 'Lossy: each save degrades quality further ("generation loss"). Lossless: no quality change, ever. This is why you should edit images in lossless formats, then export as JPEG only at the end.', tip: 'Screenshotting a JPEG then re-saving it compounds lossy artifacts!' },
        { title: 'Trade-offs Summary', content: 'Lossy: smaller file, faster transfer, reduced quality, data permanently gone. Lossless: larger file, slower transfer, perfect quality, fully restorable.', tip: 'In the exam, always justify your choice with a specific scenario.' },
      ],
    },
    hacks: [
      { title: 'Loss = Lossy', content: 'Lossy has "loss" in the name — data is LOST permanently. Lossless = LESS loss = no data lost. The clue is in the word!' },
      { title: 'The Surgeon Test', content: 'Ask "would a surgeon be happy?" If the scenario involves critical data (medical, legal, code), answer is ALWAYS Lossless. If it\'s just streaming music, Lossy is fine.' },
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return pick([
          () => makeMCQ('What is the key difference between lossy and lossless compression?', 'Lossy permanently removes data; lossless preserves all data', ['Lossy is faster to decompress', 'Lossless makes bigger files than the original', 'They are the same thing'], 'One loses data permanently.', 'Lossy discards data for smaller size; lossless keeps everything and can restore the original perfectly.'),
          () => makeMCQ('Which compression type is best for a legal document that must be preserved exactly?', 'Lossless', ['Lossy', 'No compression', 'Either — it makes no difference'], 'Exact data is critical.', 'Lossless compression guarantees the original can be fully restored, essential for critical documents.'),
          () => makeMCQ('Which file format is an example of LOSSY compression?', 'JPEG', ['PNG', 'ZIP', 'FLAC'], 'Common image format for photos.', 'JPEG discards some image data to achieve smaller file sizes — it is lossy.'),
          () => makeMCQ('Why is compression useful for streaming video?', 'It reduces file size so video loads faster over the internet', ['It improves video quality', 'It adds captions automatically', 'It prevents hacking'], 'Smaller = faster to stream.', 'Compression reduces the data that needs to be transferred, enabling smooth streaming.'),
          () => makeMCQ('What is a major benefit of compression?', 'Files take up less storage space', ['Files are automatically encrypted', 'Computers run faster', 'The internet becomes free'], 'Space and time.', 'Compressed files save storage and take less time to transfer over networks.'),
          () => makeMCQ('Which of these is a LOSSLESS format for images?', 'PNG', ['JPEG', 'MP3', 'MP4'], 'P-N-G.', 'PNG is a lossless image format often used for web graphics and logos.'),
        ])();
      } else {
        return pick([
          () => makeMCQ('A graphic designer saves a logo as JPEG repeatedly. What problem will occur?', 'Quality degrades with each save due to generation loss', ['The file gets larger each time', 'Colours become more accurate', 'Nothing — JPEG is lossless'], 'Each lossy save removes more data.', 'Re-saving a lossy-compressed image repeatedly compounds artifacts, degrading quality progressively.'),
          () => makeMCQ('Run-Length Encoding stores "AAAAAABBB" as "6A3B". What type of compression is this?', 'Lossless', ['Lossy', 'Encryption', 'Fragmentation'], 'No data is removed, just represented efficiently.', 'RLE is a lossless technique — the original data can be fully reconstructed from 6A3B.'),
          () => makeMCQ('Why would lossless compression produce a larger file than lossy compression?', 'It retains all original data, leaving less room for reduction', ['It encrypts the data', 'It adds metadata', 'It duplicates the file'], 'No data removed = less potential to shrink.', 'Lossless algorithms cannot discard any data, limiting how much they can compress.'),
          () => makeMCQ('In what scenario is LOSSY compression almost always acceptable?', 'Streaming high-definition video', ['Storing medical X-rays', 'Backing up a database', 'Sending a text document'], 'Streaming vs Archiving.', 'For streaming, a slight loss in quality is a fair trade for smooth, buffer-free playback.'),
          () => makeMCQ('How does Run-Length Encoding (RLE) work?', 'It stores a count and a value for repeated data', ['It deletes every second letter', 'It replaces words with numbers', 'It encrypts the file header'], 'Count + Value.', 'RLE is effective on data with many consecutive repeats (e.g. 00000 -> 5x0).'),
        ])();
      }
    },
  },

  // ==============================================================
  // NEW: OCR EXAM REFERENCE LANGUAGE (2.1.2 + 2.2.1)
  // ==============================================================
  'ocr-exam-reference-language': {
    title: 'OCR Exam Reference Language',
    emoji: '📋',
    color: '#00d4ff',
    category: 'Programming Concepts',
    description: 'The official pseudocode syntax used in all OCR CS exam papers.',
    hubPath: '/gcse/computer-science',
    backLabel: 'Back to Computer Science',
    lessons: {
      foundation: [
        { title: 'What is OCR ERL?', content: 'OCR Exam Reference Language is the official pseudocode that OCR uses in ALL their computer science exam papers. You must be able to READ it confidently.', tip: 'You don\'t have to write perfectly — the exam allows minor syntax errors if the logic is correct.' },
        { title: 'Variables & Assignment', content: 'In OCR ERL, = is used for assignment:\n  x = 5\n  name = "Alice"\n  const PI = 3.14\n  global score = 0', tip: 'const declares a constant. global makes a variable accessible everywhere.' },
        { title: 'Input & Output', content: 'input() gets data from the user. print() shows output:\n  name = input("Enter name: ")\n  print("Hello " + name)', tip: 'Always check what data type input() returns — it\'s always a String, so cast if needed!' },
        { title: 'IF Statements', content: 'if condition then\n    // do something\nelseif condition then\n    // do something else\nelse\n    // default\nendif', tip: 'Note the keyword is "elseif" (one word), not "else if".' },
        { title: 'FOR Loops', content: 'for i = 0 to 9\n    print(i)\nnext i\n\nUse "step" to change increment:\nfor i = 0 to 10 step 2\n    print(i)\nnext i', tip: 'The loop is INCLUSIVE — "for i = 0 to 9" runs 10 times (0,1,2...9).' },
      ],
      higher: [
        { title: 'WHILE & DO UNTIL Loops', content: 'while condition\n    // loop body\nendwhile\n\ndo\n    // loop body\nuntil condition\n\nKey difference: DO UNTIL always runs at least ONCE; WHILE checks condition first.', tip: 'WHILE: check then do. DO UNTIL: do then check.' },
        { title: 'SWITCH / CASE', content: 'switch variable :\n    case "A":\n        print("Excellent")\n    case "B":\n        print("Good")\n    default:\n        print("Keep trying")\nendswitch', tip: 'Switch is cleaner than many elseif statements when checking one variable against many values.' },
        { title: 'Procedures & Functions', content: 'procedure greet(name)\n    print("Hello " + name)\nendprocedure\n\nfunction square(n)\n    return n * n\nendfunction\n\nCall them:\n  greet("Alice")\n  result = square(5)', tip: 'Functions RETURN a value. Procedures do NOT.' },
        { title: 'Arrays in OCR ERL', content: 'array scores[5]  // 1D, 5 elements (index 0-4)\narray grid[3,3]  // 2D, 3x3\nscores[0] = 95\ngrid[1,2] = "X"', tip: 'Arrays are 0-indexed in OCR ERL.' },
        { title: 'String Operations', content: '.length — number of characters\n.upper — convert to uppercase\n.lower — convert to lowercase\n.substring(start, length) — extract part\n\nExample:\n  word = "Computer"\n  word.length → 8\n  word.upper → "COMPUTER"\n  word.substring(0,4) → "Comp"', tip: 'substring is 0-indexed — substring(0,4) starts at index 0 and takes 4 characters.' },
        { title: 'File Handling in ERL', content: 'myFile = open("data.txt")\nwhile NOT myFile.endOfFile()\n    print(myFile.readLine())\nendwhile\nmyFile.close()\n\nWriting:\n  myFile.writeLine("new data")', tip: 'Always close() a file after use — this saves your changes!' },
      ],
    },
    hacks: [
      { title: 'ERL is Forgiving', content: 'OCR markers accept minor syntax errors in ERL — what matters is the LOGIC. Write confidently even if you\'re unsure of exact syntax. Using Python or Java syntax is also accepted in many questions!' },
      { title: 'WHILE vs DO UNTIL', content: 'WHILE: "While the door is closed, keep knocking." (May never knock if door is open)\nDO UNTIL: "Knock, then check if it opened." (Always knocks at least once)' },
    ],
    generateQuestion: (tier) => {
      if (tier === 'foundation') {
        return pick([
          () => makeMCQ('In OCR ERL, which keyword is used to declare a constant?', 'const', ['constant', 'var', 'fixed'], 'It is an abbreviation.', 'const declares a constant in OCR Exam Reference Language: const PI = 3.14'),
          () => makeMCQ('In OCR ERL, a for loop "for i = 0 to 4" runs how many times?', '5 times (0,1,2,3,4)', ['4 times', '6 times', '3 times'], 'The range is INCLUSIVE.', 'OCR ERL for loops are inclusive of both endpoints — 0 to 4 includes 0,1,2,3,4.'),
          () => makeMCQ('Which OCR ERL function gets data typed by the user?', 'input()', ['get()', 'scan()', 'read()'], 'Think of getting input.', 'input() captures keyboard input from the user in OCR Exam Reference Language.'),
          () => makeMCQ('In OCR ERL, what keyword closes an IF statement?', 'endif', ['end', 'fi', 'close'], 'It "ends" the "if".', 'OCR ERL uses endif to close an if block, similar to endwhile, endfunction etc.'),
          () => makeMCQ('What is the OCR ERL command to show a message?', 'print()', ['output()', 'show()', 'display()'], 'Standard output.', 'print() is the command used to output text in the reference language.'),
          () => makeMCQ('Which keyword declares a variable that can be accessed by all sub-programs?', 'global', ['public', 'universal', 'open'], 'Available everywhere.', 'global declares a variable with global scope in OCR ERL.'),
        ])();
      } else {
        return pick([
          () => makeMCQ('What is the key difference between a WHILE loop and a DO UNTIL loop in OCR ERL?', 'DO UNTIL always executes at least once; WHILE may not execute at all', ['WHILE is faster', 'DO UNTIL is count-controlled', 'They are identical'], 'Check first, or do first?', 'WHILE checks the condition before entering — if false immediately, the body never runs. DO UNTIL always runs once then checks.'),
          () => makeMCQ('In OCR ERL, what does "word.substring(2, 3)" return for word = "Computer"?', '"mpu"', ['"Com"', '"pute"', '"ter"'], '0-indexed, 3 characters from index 2.', 'substring(start, length): start=2 (\'m\'), length=3 gives "mpu" from "Computer".'),
          () => makeMCQ('What is the correct OCR ERL syntax to define a function that squares a number?', 'function square(n)\n    return n*n\nendfunction', ['def square(n): return n*n', 'square = function(n) n*n end', 'proc square(n) n*n endproc'], 'function...endfunction with return.', 'OCR ERL functions use the function/endfunction block and must include a return statement.'),
          () => makeMCQ('In OCR ERL, what does "array scores[5]" create?', 'A 1D array with 5 elements (indices 0 to 4)', ['A 2D 5×5 array', 'An array starting at index 1', 'A sorted list of 5 items'], 'Arrays are 0-indexed.', 'array scores[5] creates a 1D array with indices 0,1,2,3,4 — 5 elements total.'),
          () => makeMCQ('How do you extract the first 4 characters of a string "Program" in OCR ERL?', 'word.substring(0, 4)', ['word.substring(1, 4)', 'word.left(4)', 'word.slice(0, 3)'], 'Start at 0, take 4.', 'substring(0, 4) starts at the beginning (index 0) and takes four characters.'),
          () => makeMCQ('Which operator is used for "Not Equal To" in OCR ERL?', '!=', ['<>', 'NOT ==', 'NOT ='], 'Difference.', 'OCR ERL uses != for the inequality comparison operator.'),
        ])();
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
