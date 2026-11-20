export const profile = {
  name: "Ibekwe Somtochukwu",
  shortName: "Ibekwe",
  handle: "dominikdev-glitch",
  role: "Backend & Blockchain Developer",
  experience: "3+ Years Experience",
  location: "Lagos, Nigeria",
  availability: "Open to Remote Opportunities",
  email: "ibekwesomtochukwu11@gmail.com",
  github: "https://github.com/dominikdev-glitch",
  linkedin: "https://www.linkedin.com/in/dominikdev-glitch-06431a250",
  cvUrl: "/assets/aistudio/Ibekwe_Somtochukwu_CV_b0f3e782.pdf",
  cvFilename: "Ibekwe_Somtochukwu_CV.pdf",
};

export const navLinks = [
  { id: "about", title: "About" },
  { id: "work", title: "Focus" },
  { id: "skills", title: "Stack" },
  { id: "projects", title: "Projects" },
];

export const heroHighlights = [
  {
    label: "Networks",
    value: "Ethereum · BSC · Solana · TRON",
  },
  {
    label: "Layer-1 & Systems",
    value: "C++20 · TW-PoS · JSON-RPC · SQLite",
  },
  {
    label: "Backend Core",
    value: "Node.js · Express.js · TypeScript",
  },
  {
    label: "Smart Contracts",
    value: "Solidity · ERC-20 & TRC-20 · Hardhat",
  },
];

export const services = [
  {
    index: "01",
    title: "Backend Architecture",
    description:
      "Scalable REST APIs, JWT authentication pipelines, and clean modular service layers built with Node.js, Express.js, and TypeScript.",
    iconName: "server",
  },
  {
    index: "02",
    title: "Layer-1 & Consensus",
    description:
      "Production systems engineering in C++20 including Time-Weighted Proof-of-Stake consensus, atomic SQLite state machines, and P2P networking.",
    iconName: "blocks",
  },
  {
    index: "03",
    title: "Smart Contracts & Web3",
    description:
      "Solidity contract engineering, Hardhat test suites, and multi-chain token workflows across Ethereum, BNB Smart Chain, Solana, and TRON.",
    iconName: "network",
  },
  {
    index: "04",
    title: "Full-Stack Delivery",
    description:
      "Production Web3 dashboards and cross-platform client apps using React, Next.js, React Native, Tailwind CSS, and Vite.",
    iconName: "layers",
  },
];

export const technologies = [
  { name: "Node.js", badge: "NODE", color: "#68A063" },
  { name: "TypeScript", badge: "TS", color: "#3178C6" },
  { name: "C++20", badge: "C++", color: "#659AD2" },
  { name: "Solidity", badge: "SOL", color: "#915EFF" },
  { name: "Hardhat", badge: "HH", color: "#F7DF1E" },
  { name: "Ethers.js", badge: "ETH", color: "#627EEA" },
  { name: "MongoDB", badge: "MDB", color: "#47A248" },
  { name: "React", badge: "RCT", color: "#61DAFB" },
];

export const techCategories = [
  {
    category: "Backend",
    summary: "API architecture, authentication, and persistent data layers.",
    items: [
      "Node.js",
      "Express.js",
      "TypeScript",
      "JavaScript",
      "REST APIs",
      "JWT",
      "MongoDB",
      "Firebase",
    ],
  },
  {
    category: "Blockchain / Web3",
    summary: "Layer-1 consensus, smart contracts, and multi-chain infrastructure.",
    items: [
      "C++20",
      "Solidity",
      "Hardhat",
      "Ethers.js",
      "Web3.js",
      "ERC-20",
      "TRC-20",
      "JSON-RPC",
      "ECDSA",
      "Ethereum",
      "BNB Smart Chain",
      "Solana",
      "TRON",
    ],
  },
  {
    category: "Frontend",
    summary: "Responsive web dashboards and cross-platform client interfaces.",
    items: ["React", "Next.js", "React Native", "Tailwind CSS", "Vite"],
  },
  {
    category: "Tools",
    summary: "Storage engines, build pipelines, observability, and deployment.",
    items: [
      "SQLite",
      "Git",
      "GitHub",
      "CMake",
      "GitHub Actions",
      "Prometheus",
      "Render",
      "Netlify",
    ],
  },
];

export const experiences = [
  {
    index: "01",
    title: "Layer-1 Blockchain & Multi-Chain Systems",
    subtitle: "C++20 · Solidity · Ethereum · BSC · Solana · TRON",
    timeframe: "Protocol & Web3",
    points: [
      "Solo-architected and shipped MERMAI — a production-ready Layer-1 blockchain in C++20 (7,800+ LOC across 79 source files) with 17/17 integration tests passing.",
      "Built multi-chain token creation and deployment platforms across Ethereum, BNB Smart Chain, Solana, and TRON, plus launched a live token reaching ~$32k market cap.",
      "Writing and testing Solidity smart contracts with Hardhat for ERC-20 and TRC-20 standards integrated with Ethers.js and RPC endpoints.",
    ],
  },
  {
    index: "02",
    title: "Backend APIs & Distributed Infrastructure",
    subtitle: "Node.js · Express.js · TypeScript · SQLite · MongoDB · Firebase",
    timeframe: "Core Systems",
    points: [
      "Architecting scalable REST and JSON-RPC APIs (40+ endpoints on MERMAI) with structured validation, JWT/Firebase Auth, and clean modular layers.",
      "Engineered atomic state machines, automatic rollback, peer reputation scoring, rate limiting, and eclipse attack defenses.",
      "Instrumenting services with Prometheus observability, automated CI/CD via GitHub Actions, and persistent data stores across SQLite, MongoDB, and Firebase.",
    ],
  },
  {
    index: "03",
    title: "Full-Stack Web3 Applications",
    subtitle: "React · Next.js · React Native · Tailwind CSS · Vite",
    timeframe: "End-to-End Delivery",
    points: [
      "Building clean, responsive Web3 interfaces and cross-platform clients that connect seamlessly to backend APIs and smart contracts.",
      "Deploying and maintaining production services across Render, Netlify, Git, and GitHub.",
    ],
  },
];

export const projects = [
  {
    id: "mermai-blockchain",
    name: "MERMAI Blockchain Network",
    category: "Layer-1 Blockchain",
    stack: ["C++20", "TW-PoS", "SQLite", "JSON-RPC", "NIST P-256"],
    networks: "7,800+ LOC · 17/17 Tests Passing",
    description:
      "Production-ready Layer-1 blockchain solo-architected from scratch in C++20 with Time-Weighted Proof-of-Stake consensus, atomic state management, 40+ JSON-RPC endpoints, and hardware biometric auth.",
    architecture: [
      "Engineered Time-Weighted Proof-of-Stake (TW-PoS) consensus with equivocation detection, automatic 50% slashing penalty, and 2/3+ checkpoint voting finality.",
      "Built atomic SQLite state machine with UTXO + Account hybrid model (7,800+ lines C++20 across 79 source files), automatic rollback, and state snapshots for fast sync.",
      "Implemented P2P networking, peer reputation scoring, rate limiting, eclipse attack defense, Prometheus observability, and NIST P-256 hardware biometric auth.",
    ],
    source_code_link: "https://github.com/dominikdev-glitch/mermai-blockchain",
  },
  {
    id: "nikwake",
    name: "NikWake",
    category: "Backend & Automation",
    stack: ["TypeScript", "Node.js", "Vite", "Firebase Auth", "Firestore"],
    networks: "Scheduled HTTP Bot · Render Ready",
    description:
      "Website wake and uptime scheduler bot that sends configurable HTTP GET probes (1m–1h cadences) to keep web services warm with latency and streak tracking.",
    architecture: [
      "Node.js scheduler engine running 30-second due-check loops with configurable retries and accepted HTTP status ranges.",
      "Security guards blocking non-HTTP schemes, credential-bearing URLs, and private network SSRF targets.",
      "Protected dashboard powered by Firebase Authentication ID tokens and Firebase Admin verification.",
    ],
    source_code_link: "https://github.com/dominikdev-glitch/nikwake",
  },
  {
    id: "shrcode",
    name: "ShrCode",
    category: "Code & File Sharing",
    stack: ["TypeScript", "React", "Firebase", "Vite"],
    networks: "Direct & Code-Based Transfer",
    description:
      "Streamlined developer sharing platform for sending, receiving, and inspecting code snippets, text, and links across devices via direct share workflows and room codes.",
    architecture: [
      "Dedicated SendCode, ReceiveCode, DirectShare, and CodeDetail workflows built with TypeScript and React.",
      "Cloud-backed transfer state and real-time retrieval powered by Firebase services.",
      "Clean modular component structure deployed live at shrcode.netlify.app for friction-free cross-device sharing.",
    ],
    source_code_link: "https://github.com/dominikdev-glitch/ShrCode",
    live_link: "https://shrcode.netlify.app",
  },
];
