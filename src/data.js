export const data = {
  personal: {
    name: "Srijan Kundu Chowdhury",
    title: "Software Engineer",
    taglines: [
      "Full-Stack Developer",
      "Competitive Programmer",
      "AI/NLP Engineer",
      "Problem Solver",
      "Open Source Enthusiast"
    ],
    bio: "Software Engineer with 2+ years building scalable applications, internal platforms, and data-driven solutions. Passionate about AI-powered tools, real-time systems, and squeezing performance out of every line of code.",
    location: "Howrah, West Bengal, India",
    email: "srijankunduchowdhury@gmail.com",
    phone: "+91 8282827419",
    links: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      linktree: "https://linktr.ee"
    }
  },

  stats: [
    { label: "LeetCode Problems", value: "1500+", sub: "Global Top 2.7%" },
    { label: "CP Rating", value: "1983", sub: "LeetCode Knight" },
    { label: "Business Users", value: "200+", sub: "Analytics Portal" },
    { label: "Tickets/Month", value: "500+", sub: "Flicket Platform" },
  ],

  experience: [
    {
      company: "mjunction services limited",
      role: "Software Developer Engineer",
      period: "July 2024 – Present",
      location: "Kolkata",
      type: "Full-time",
      color: "#00ff88",
      stack: ["Python", "Flask", "JavaScript", "PostgreSQL", "NLP", "MongoDB"],
      highlights: [
        "Built self-service analytics portal with AG Grid serving 200+ business users on 1M+ record datasets",
        "Launched 'Flicket' — full-stack internal ticketing platform handling 500+ tickets/month with role-based workflows",
        "Designed live auction tracking system with real-time updates every 20 seconds integrated into Angular platform",
        "Architected NLP-powered data extraction app using LLaMA 3.1, reducing reporting TAT by 30%",
        "Delivered bidding validation platform for Asian Cricket Council within 1 week",
        "Achieved 70% response accuracy with LangChain embeddings + FAISS vector search"
      ]
    },
    {
      company: "Scrollit",
      role: "React.js Developer Intern",
      period: "June 2023",
      location: "Remote",
      type: "Internship",
      color: "#00d4ff",
      stack: ["React.js", "JavaScript", "Node.js"],
      highlights: [
        "Reduced page load time by 30% optimizing frontend for e-commerce platform",
        "Architected Augmented Reality product visualization features for interactive previews"
      ]
    },
    {
      company: "Oasis Infobyte",
      role: "React.js Developer Intern",
      period: "May 2023",
      location: "Remote",
      type: "Internship",
      color: "#7c3aed",
      stack: ["React.js", "Node.js", "Rapid API", "News API"],
      highlights: [
        "Delivered full-stack news aggregation app fetching real-time news across 7+ categories",
        "Implemented infinite scrolling, dynamic loading, and optimized API fetching for large feeds"
      ]
    }
  ],

  projects: [
    {
      name: "Trevia",
      description: "Full-stack multi-vendor e-commerce platform with separate user and seller workflows, role-based auth via Clerk, and async background jobs via Inngest.",
      stack: ["Next.js", "MongoDB", "Clerk", "Inngest", "REST APIs"],
      color: "#00ff88",
      gradient: "linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)",
      links: { live: "#", github: "#" },
      featured: true,
      year: "2025"
    },
    {
      name: "BAATCHEET V2",
      description: "Real-time full-stack chat platform with JWT auth, Socket.io for live messaging, typing indicators, message receipts, and Cloudinary image uploads.",
      stack: ["React", "Socket.io", "Node.js", "MongoDB", "Tailwind"],
      color: "#00d4ff",
      gradient: "linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)",
      links: { live: "#", github: "#" },
      featured: true,
      year: "2026"
    },
    {
      name: "MYTUBE",
      description: "YouTube-style video streaming app using React.js and YouTube v3 RapidAPI with categorized content, channel pages, and related video recommendations.",
      stack: ["React.js", "Material-UI", "Rapid API", "Axios"],
      color: "#7c3aed",
      gradient: "linear-gradient(135deg, #7c3aed 0%, #ff6b35 100%)",
      links: { live: "#", github: "#" },
      featured: false,
      year: "2023"
    },
    {
      name: "CHAT-GENIUS-X",
      description: "Generative AI web app using React.js and Hugging Face Inference API for real-time conversational responses through dynamic API integration.",
      stack: ["React.js", "Hugging Face", "HTML", "CSS"],
      color: "#ff6b35",
      gradient: "linear-gradient(135deg, #ff6b35 0%, #00ff88 100%)",
      links: { github: "#" },
      featured: false,
      year: "2023"
    },
    {
      name: "DISCUSSION",
      description: " DISCUSSION is a web application that displays latest news of several (7) categories with date, source and author name from different news channels/ resources.",
      stack: ["React.js", "Javascript", "HTML", "CSS"],
      color: "#9c1b42",
      gradient: "linear-gradient(135deg, #2b1566 0%, #00ff88 100%)",
      links: { github: "#" },
      featured: false,
      year: "2023"
    }
  ],

  skills: {
    "Languages": ["C++", "Python", "JavaScript", "HTML/CSS"],
    "Frontend": ["React.js", "Next.js", "Tailwind CSS", "Material-UI", "Bootstrap"],
    "Backend": ["Flask", "FastAPI", "Node.js", "Express.js"],
    "AI / NLP": ["LLMs", "LangChain", "FAISS", "PandasAI", "Ollama", "Hugging Face"],
    "Databases": ["PostgreSQL", "MongoDB", "MySQL"],
    "Data": ["Pandas", "NumPy", "Plotly", "Streamlit"],
    "Cloud & Tools": ["Amazon S3", "Cloudinary", "GitHub", "VS Code"]
  },

  competitive: [
    { platform: "LeetCode", rating: "1983", badge: "Knight", problems: "1500+", rank: "Top 2.7%", color: "#FFA116" },
    { platform: "CodeChef", rating: "1822", badge: "4★", problems: null, rank: "Global 5K", color: "#5B4638" },
    { platform: "GeeksForGeeks", rating: "3130", badge: "4★", problems: "1100+", rank: "Institute Rank 11", color: "#2F8D46" },
    { platform: "CodeStudio", rating: "3584", badge: "Master", problems: "1200+", rank: "Top 1%", color: "#F7941D" },
    { platform: "Codeforces", rating: "1327", badge: "Pupil", problems: null, rank: null, color: "#1890FF" },
  ],

  achievements: [
    "Global Rank 701 / 32K+ — Codeforces Round 863",
    "Global Rank 123 / 4000+ — CodeChef Starters 72",
    "Global Rank 30 / 2200+ — CodeStudio Weekend Contest 97",
    "Global Rank 290 — INFINITY2K23 at IIIT Pune",
    "AIR 722, College Rank 11 — Coding Ninjas Codekaze",
    "JEE Main 2021 — 94 Percentile (AIR 55K / 9.5L)",
    "WBJEE 2020 — Rank 2505 (Top 2.5%)",
    "Google CodeJam Farewell 2023 — Global Rank 1989"
  ],

  education: {
    college: "Jadavpur University",
    degree: "Bachelor of Engineering",
    cgpa: "8.07",
    period: "2020 – 2024",
    school: "Mohiary Kundu Chaudhury Institution",
    class12: "94.2%",
    class10: "95.14%"
  }
}
