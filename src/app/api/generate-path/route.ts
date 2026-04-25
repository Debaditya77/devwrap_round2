import { NextResponse } from 'next/server';

// -------------------------------------------------------------
// REACT DATABASES
// -------------------------------------------------------------
const reactBeginner = {
  nodes: [
    {
      id: "node-1",
      type: "custom",
      data: {
        label: "React Foundations (Beginner)",
        status: "pending",
        description: "The essential building blocks: JSX, Components, and Props.",
        explainability: "AI Reasoning: Absolute beginners must understand how to construct static components before adding interactivity.",
        resources: [
          { title: "React Official Docs: Quick Start", url: "https://react.dev/learn", type: "Documentation" },
          { title: "React in 100 Seconds (Fireship)", url: "https://www.youtube.com/watch?v=Tn6-PIqc4UM", type: "Video" }
        ],
        timeEstimate: "3 days",
        quizzes: [
          { question: "What does JSX stand for?", options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Execution"], correctAnswerIndex: 0 },
          { question: "How do you pass data from a parent component to a child component?", options: ["Using State", "Using Props", "Using Context", "Using Redux"], correctAnswerIndex: 1 }
        ]
      },
      position: { x: 0, y: 0 }
    },
    {
      id: "node-2",
      type: "custom",
      data: {
        label: "Basic State (useState)",
        status: "pending",
        description: "Managing basic interactive data.",
        explainability: "AI Reasoning: State allows your app to respond to user clicks, typing, and local interactions.",
        resources: [
          { title: "State: A Component's Memory", url: "https://react.dev/learn/state-a-components-memory", type: "Documentation" }
        ],
        timeEstimate: "4 days",
        quizzes: [
          { question: "Which Hook is used to add state to a function component?", options: ["useEffect", "useContext", "useState", "useMemo"], correctAnswerIndex: 2 },
          { question: "Can you mutate state directly? (e.g., state = 'new value')", options: ["Yes", "No, you must use the setter function", "Only in class components", "Only in Next.js"], correctAnswerIndex: 1 }
        ]
      },
      position: { x: 0, y: 0 }
    }
  ],
  edges: [{ id: "edge-1", source: "node-1", target: "node-2" }]
};

const reactIntermediate = {
  nodes: [
    {
      id: "node-1",
      type: "custom",
      data: {
        label: "Advanced Hooks (Intermediate)",
        status: "pending",
        description: "useEffect, useRef, and custom hooks.",
        explainability: "AI Reasoning: Intermediates need to master side effects, DOM manipulation, and reusable logic.",
        resources: [
          { title: "Synchronizing with Effects", url: "https://react.dev/learn/synchronizing-with-effects", type: "Documentation" },
          { title: "Learn React Hooks (WebDevSimplified)", url: "https://www.youtube.com/watch?v=O6P86uwfdR0", type: "Video" }
        ],
        timeEstimate: "1 week",
        quizzes: [
          { question: "What does the dependency array in useEffect do?", options: ["Nothing", "Controls when the effect runs", "Caches data", "Creates a variable"], correctAnswerIndex: 1 },
          { question: "When should you use a Custom Hook?", options: ["To share stateful logic between components", "To make CSS load faster", "To replace a database", "Never"], correctAnswerIndex: 0 }
        ]
      },
      position: { x: 0, y: 0 }
    },
    {
      id: "node-2",
      type: "custom",
      data: {
        label: "Next.js App Router",
        status: "pending",
        description: "Server-Side Rendering, Routing, and SEO.",
        explainability: "AI Reasoning: Modern React development relies heavily on frameworks like Next.js for production.",
        resources: [
          { title: "Next.js App Router Docs", url: "https://nextjs.org/docs/app", type: "Documentation" },
          { title: "Next.js Full Course (Codevolution)", url: "https://www.youtube.com/watch?v=ZjAqacIC_3c", type: "Video" }
        ],
        timeEstimate: "2 weeks",
        quizzes: [
          { question: "What is a major benefit of Next.js Server-Side Rendering (SSR)?", options: ["It makes the CSS look better", "It improves initial load time and SEO", "It prevents bugs", "It writes code automatically"], correctAnswerIndex: 1 },
          { question: "In the Next.js App Router, what file defines a route UI?", options: ["route.tsx", "index.tsx", "page.tsx", "view.tsx"], correctAnswerIndex: 2 }
        ]
      },
      position: { x: 0, y: 0 }
    },
    {
      id: "node-3",
      type: "custom",
      data: {
        label: "Global State (Zustand)",
        status: "pending",
        description: "Managing global state without prop drilling.",
        explainability: "AI Reasoning: As apps grow, passing props down 10 levels becomes impossible. Global state fixes this.",
        resources: [
          { title: "Zustand Documentation", url: "https://docs.pmnd.rs/zustand/getting-started/introduction", type: "Documentation" }
        ],
        timeEstimate: "1 week",
        quizzes: [
          { question: "What problem does global state management solve?", options: ["Slow CSS loading", "Prop Drilling", "Server-Side Rendering", "Database connection errors"], correctAnswerIndex: 1 },
          { question: "Why is Zustand often preferred over Redux?", options: ["It requires more boilerplate", "It is officially made by Facebook", "It is simpler and requires less boilerplate", "It uses GraphQL"], correctAnswerIndex: 2 }
        ]
      },
      position: { x: 0, y: 0 }
    }
  ],
  edges: [
    { id: "edge-1", source: "node-1", target: "node-2" },
    { id: "edge-2", source: "node-2", target: "node-3" }
  ]
};

const reactAdvanced = {
  nodes: [
    {
      id: "node-1",
      type: "custom",
      data: {
        label: "Enterprise Architecture (Advanced)",
        status: "pending",
        description: "Micro-frontends, Monorepos (Turborepo), and strictly typed systems.",
        explainability: "AI Reasoning: Advanced devs must know how to scale applications for massive teams.",
        resources: [
          { title: "Turborepo Docs", url: "https://turbo.build/repo/docs", type: "Documentation" }
        ],
        timeEstimate: "2 weeks",
        quizzes: [
          { question: "What is the primary benefit of a Monorepo?", options: ["Slower builds", "Code sharing and atomic commits across multiple apps", "Better CSS", "No need for a database"], correctAnswerIndex: 1 },
          { question: "What does Turborepo use to speed up builds?", options: ["Remote Caching", "Magic", "Deleting old code", "Switching to Vue"], correctAnswerIndex: 0 }
        ]
      },
      position: { x: 0, y: 0 }
    },
    {
      id: "node-2",
      type: "custom",
      data: {
        label: "React Server Components (RSC)",
        status: "pending",
        description: "Deep dive into RSC, streaming, and Suspense architecture.",
        explainability: "AI Reasoning: RSC is the future of React. Mastering it is required for elite performance.",
        resources: [
          { title: "Understanding RSC", url: "https://vercel.com/blog/understanding-react-server-components", type: "Article" }
        ],
        timeEstimate: "2 weeks",
        quizzes: [
          { question: "What happens to React Server Components in the final browser bundle?", options: ["They are included entirely", "They have zero bundle size", "They turn into Vue components", "They crash"], correctAnswerIndex: 1 },
          { question: "Which component boundary enables streaming HTML?", options: ["<ErrorBoundary>", "<Suspense>", "<Context>", "<Fragment>"], correctAnswerIndex: 1 }
        ]
      },
      position: { x: 0, y: 0 }
    }
  ],
  edges: [{ id: "edge-1", source: "node-1", target: "node-2" }]
};

// -------------------------------------------------------------
// PYTHON DATABASES
// -------------------------------------------------------------
const pythonBeginner = {
  nodes: [
    {
      id: "node-1",
      type: "custom",
      data: {
        label: "Python Syntax (Beginner)",
        status: "pending",
        description: "Variables, Data Types, and Control Flow.",
        explainability: "AI Reasoning: The absolute core syntax required to write any Python script.",
        resources: [
          { title: "Python Official Tutorial", url: "https://docs.python.org/3/tutorial/index.html", type: "Documentation" },
          { title: "Python for Beginners (Programming with Mosh)", url: "https://www.youtube.com/watch?v=kqtD5dpn9C8", type: "Video" }
        ],
        timeEstimate: "1 week",
        quizzes: [
          { question: "How do you create a list in Python?", options: ["my_list = {}", "my_list = ()", "my_list = []", "my_list = <>"], correctAnswerIndex: 2 },
          { question: "Which keyword is used to define a function?", options: ["func", "def", "function", "create"], correctAnswerIndex: 1 }
        ]
      },
      position: { x: 0, y: 0 }
    }
  ],
  edges: []
};

const pythonIntermediate = {
  nodes: [
    {
      id: "node-1",
      type: "custom",
      data: {
        label: "OOP & APIs (Intermediate)",
        status: "pending",
        description: "Classes, Inheritance, and the Requests library.",
        explainability: "AI Reasoning: Intermediate developers must connect their scripts to the web and structure code safely.",
        resources: [
          { title: "Real Python: OOP", url: "https://realpython.com/python3-object-oriented-programming/", type: "Article" }
        ],
        timeEstimate: "2 weeks",
        quizzes: [
          { question: "What method initializes an object?", options: ["__start__", "init()", "__init__", "constructor()"], correctAnswerIndex: 2 },
          { question: "Which library is standard for making HTTP requests in Python?", options: ["fetch", "axios", "requests", "http"], correctAnswerIndex: 2 }
        ]
      },
      position: { x: 0, y: 0 }
    }
  ],
  edges: []
};

const pythonAdvanced = {
  nodes: [
    {
      id: "node-1",
      type: "custom",
      data: {
        label: "Concurrency & ML (Advanced)",
        status: "pending",
        description: "asyncio, multithreading, and PyTorch.",
        explainability: "AI Reasoning: Elite Python devs must handle high-throughput IO operations and leverage AI pipelines.",
        resources: [
          { title: "Asyncio Docs", url: "https://docs.python.org/3/library/asyncio.html", type: "Documentation" }
        ],
        timeEstimate: "3 weeks",
        quizzes: [
          { question: "What does the 'await' keyword do?", options: ["Deletes a file", "Pauses coroutine execution until an awaitable is done", "Stops the server", "Makes code synchronous"], correctAnswerIndex: 1 },
          { question: "What is PyTorch primarily used for?", options: ["Web Design", "Deep Learning & Tensors", "Database Management", "HTML parsing"], correctAnswerIndex: 1 }
        ]
      },
      position: { x: 0, y: 0 }
    }
  ],
  edges: []
};

// -------------------------------------------------------------
// GENERIC ADAPTIVE ENGINE (MASSIVE OFFLINE UPGRADE)
// -------------------------------------------------------------
const generateGenericGraph = (goal: string, level: string) => {
  const goalCap = goal.charAt(0).toUpperCase() + goal.slice(1);
  const lowerLevel = level.toLowerCase();

  // ADVANCED: 4 Nodes, 4 Difficult Questions per node
  if (lowerLevel.includes('advanced')) {
    return {
      nodes: [
        {
          id: "node-1", type: "custom", position: { x: 0, y: 0 },
          data: {
            label: `Enterprise ${goalCap} Architecture`, status: "pending",
            description: `Designing highly scalable, fault-tolerant systems using ${goalCap}.`,
            explainability: `AI Reasoning: Advanced engineers must master high-availability and distributed architecture.`,
            resources: [{ title: `Advanced ${goalCap} Scaling`, url: `https://dev.to/search?q=${goal}+enterprise+architecture`, type: "Article" }],
            timeEstimate: "2 weeks",
            quizzes: [
              { question: `What is the primary bottleneck when scaling ${goalCap} across multiple availability zones?`, options: ["Network latency", "CSS loading", "Syntax errors", "Variable naming"], correctAnswerIndex: 0 },
              { question: `Which design pattern is most critical for fault tolerance in ${goalCap}?`, options: ["Circuit Breaker", "Singleton", "Factory", "Observer"], correctAnswerIndex: 0 },
              { question: `How do you resolve memory leaks in a long-running ${goalCap} service?`, options: ["Reboot the server daily", "Implement proper garbage collection and heap profiling", "Ignore them", "Increase RAM infinitely"], correctAnswerIndex: 1 },
              { question: `In a microservices architecture, how should ${goalCap} services communicate securely?`, options: ["Plain HTTP", "Shared databases", "mTLS and JWT tokens", "Email"], correctAnswerIndex: 2 }
            ]
          }
        },
        {
          id: "node-2", type: "custom", position: { x: 0, y: 0 },
          data: {
            label: `${goalCap} CI/CD & DevOps`, status: "pending",
            description: `Automating testing, deployment, and infrastructure for ${goalCap}.`,
            explainability: `AI Reasoning: You cannot deploy enterprise apps manually.`,
            resources: [{ title: `${goalCap} Docker & Kubernetes`, url: `https://www.youtube.com/results?search_query=${goal}+kubernetes+docker`, type: "Video" }],
            timeEstimate: "2 weeks",
            quizzes: [
              { question: `What is the safest deployment strategy for ${goalCap} in production?`, options: ["Blue-Green / Canary", "FTP Upload", "Direct to Main", "Live Server"], correctAnswerIndex: 0 },
              { question: `How should secrets be injected into ${goalCap} containers?`, options: ["Hardcoded in repo", "Environment Variables via Vault", "Text files", "Comments"], correctAnswerIndex: 1 },
              { question: `Which metric is most important for automated rollbacks?`, options: ["Error Rate Spikes", "Lines of Code", "Color theme", "Font size"], correctAnswerIndex: 0 },
              { question: `What is immutable infrastructure?`, options: ["Servers that never crash", "Servers that are replaced rather than modified", "Servers without SSH", "Servers running Windows"], correctAnswerIndex: 1 }
            ]
          }
        },
        {
          id: "node-3", type: "custom", position: { x: 0, y: 0 },
          data: {
            label: `Deep Performance Profiling`, status: "pending",
            description: `Analyzing flame graphs and optimizing CPU/IO operations.`,
            explainability: `AI Reasoning: 100ms of latency costs millions at scale.`,
            resources: [{ title: `Optimizing ${goalCap}`, url: `https://www.youtube.com/results?search_query=${goal}+performance+profiling`, type: "Video" }],
            timeEstimate: "1 week",
            quizzes: [
              { question: `What tool is used to visualize stack traces over time?`, options: ["Flame Graphs", "Pie Charts", "Line Graphs", "Bar Charts"], correctAnswerIndex: 0 },
              { question: `Is ${goalCap} generally CPU-bound or IO-bound?`, options: ["CPU-bound", "IO-bound", "It depends entirely on the workload", "Neither"], correctAnswerIndex: 2 },
              { question: `What causes event loop blocking?`, options: ["Async functions", "Synchronous heavy computations", "Promises", "Callbacks"], correctAnswerIndex: 1 },
              { question: `How do you mitigate heavy computations in ${goalCap}?`, options: ["Worker Threads / Background Jobs", "Write less code", "Use a slower CPU", "Disable CSS"], correctAnswerIndex: 0 }
            ]
          }
        },
        {
          id: "node-4", type: "custom", position: { x: 0, y: 0 },
          data: {
            label: `Advanced Security & Zero Trust`, status: "pending",
            description: `Securing ${goalCap} against OWASP Top 10 vulnerabilities.`,
            explainability: `AI Reasoning: Security must be treated as a tier-1 feature.`,
            resources: [{ title: `OWASP and ${goalCap}`, url: `https://owasp.org/`, type: "Documentation" }],
            timeEstimate: "2 weeks",
            quizzes: [
              { question: `What prevents Cross-Site Scripting (XSS) in modern apps?`, options: ["Disabling JS", "Strict Content Security Policy (CSP)", "Using HTTPS", "Using VPNs"], correctAnswerIndex: 1 },
              { question: `How do you prevent SQL Injection?`, options: ["Prepared Statements / Parameterized Queries", "Base64 Encoding", "Firewalls", "Antivirus"], correctAnswerIndex: 0 },
              { question: `What is Zero Trust Architecture?`, options: ["Trusting no user, even inside the VPN", "Trusting everyone", "Trusting only admins", "Trusting APIs"], correctAnswerIndex: 0 },
              { question: `Why is Rate Limiting necessary?`, options: ["To save bandwidth", "To prevent DDoS and Brute Force attacks", "To annoy users", "To speed up the app"], correctAnswerIndex: 1 }
            ]
          }
        }
      ],
      edges: [
        { id: "edge-1", source: "node-1", target: "node-2" },
        { id: "edge-2", source: "node-2", target: "node-3" },
        { id: "edge-3", source: "node-3", target: "node-4" }
      ]
    };
  } 
  
  // INTERMEDIATE: 3 Nodes, 3 Intermediate Questions per node
  else if (lowerLevel.includes('intermediate')) {
    return {
      nodes: [
        {
          id: "node-1", type: "custom", position: { x: 0, y: 0 },
          data: {
            label: `Core Architecture of ${goalCap}`, status: "pending",
            description: `Moving beyond syntax: Design patterns and best practices.`,
            explainability: `AI Reasoning: Intermediate developers must understand how to structure medium-to-large projects.`,
            resources: [{ title: `Best Practices: ${goalCap}`, url: `https://dev.to/search?q=${goal}+best+practices`, type: "Article" }],
            timeEstimate: "1 week",
            quizzes: [
              { question: `What is the main advantage of the MVC pattern?`, options: ["It runs faster", "Separation of Concerns (Data, UI, Logic)", "It requires no database", "It looks better"], correctAnswerIndex: 1 },
              { question: `When using ${goalCap}, why should you avoid global variables?`, options: ["They cause memory leaks and unpredictable state mutations", "They are illegal", "They slow down the internet", "They crash the browser"], correctAnswerIndex: 0 },
              { question: `What is DRY programming?`, options: ["Don't Repeat Yourself", "Do Repeat Yourself", "Data Rendering Yield", "Direct Routing YAML"], correctAnswerIndex: 0 }
            ]
          }
        },
        {
          id: "node-2", type: "custom", position: { x: 0, y: 0 },
          data: {
            label: `State Management & APIs`, status: "pending",
            description: `Connecting ${goalCap} to external data sources.`,
            explainability: `AI Reasoning: Apps are useless without dynamic data from APIs.`,
            resources: [{ title: `API Integration in ${goalCap}`, url: `https://www.youtube.com/results?search_query=${goal}+API+integration`, type: "Video" }],
            timeEstimate: "2 weeks",
            quizzes: [
              { question: `What is a REST API?`, options: ["A fast database", "Representational State Transfer over HTTP", "A type of variable", "A UI library"], correctAnswerIndex: 1 },
              { question: `What HTTP method is used to UPDATE existing data?`, options: ["GET", "POST", "PUT/PATCH", "DELETE"], correctAnswerIndex: 2 },
              { question: `What status code indicates "Not Found"?`, options: ["200", "500", "404", "401"], correctAnswerIndex: 2 }
            ]
          }
        },
        {
          id: "node-3", type: "custom", position: { x: 0, y: 0 },
          data: {
            label: `Testing & Debugging`, status: "pending",
            description: `Writing unit tests and integration tests.`,
            explainability: `AI Reasoning: Code without tests is legacy code the moment it is written.`,
            resources: [{ title: `Testing ${goalCap} Apps`, url: `https://www.youtube.com/results?search_query=${goal}+testing+tutorial`, type: "Video" }],
            timeEstimate: "1 week",
            quizzes: [
              { question: `What is Unit Testing?`, options: ["Testing the whole app at once", "Testing individual functions in isolation", "Testing the database", "Testing CSS"], correctAnswerIndex: 1 },
              { question: `What does TDD stand for?`, options: ["Test Driven Development", "Total Data Destruction", "Two Dimensional Data", "Time Driven Deployment"], correctAnswerIndex: 0 },
              { question: `Why use a debugger instead of print statements?`, options: ["Print statements are faster", "Debuggers allow pausing execution and inspecting scope", "Debuggers write code for you", "There is no difference"], correctAnswerIndex: 1 }
            ]
          }
        }
      ],
      edges: [
        { id: "edge-1", source: "node-1", target: "node-2" },
        { id: "edge-2", source: "node-2", target: "node-3" }
      ]
    };
  }

  // BEGINNER: 2 Nodes, 2 Basic Questions per node
  else {
    return {
      nodes: [
        {
          id: "node-1", type: "custom", position: { x: 0, y: 0 },
          data: {
            label: `Foundations of ${goalCap}`, status: "pending",
            description: `The absolute basics: Syntax, Setup, and Hello World.`,
            explainability: `AI Reasoning: You must crawl before you can walk.`,
            resources: [{ title: `${goalCap} for Absolute Beginners`, url: `https://www.youtube.com/results?search_query=${goal}+for+beginners`, type: "Video" }],
            timeEstimate: "1 week",
            quizzes: [
              { question: `What is the first thing you typically write when learning a new technology?`, options: ["A full enterprise app", "Hello World", "A database schema", "A REST API"], correctAnswerIndex: 1 },
              { question: `Why is reading documentation important?`, options: ["It provides the official rules and syntax", "It generates code for you", "It is legally required", "It isn't important"], correctAnswerIndex: 0 }
            ]
          }
        },
        {
          id: "node-2", type: "custom", position: { x: 0, y: 0 },
          data: {
            label: `Basic Implementation`, status: "pending",
            description: `Writing your first functional program using ${goalCap}.`,
            explainability: `AI Reasoning: Theory must be immediately applied to build muscle memory.`,
            resources: [{ title: `Building your first ${goalCap} App`, url: `https://www.youtube.com/results?search_query=${goal}+first+project`, type: "Video" }],
            timeEstimate: "2 weeks",
            quizzes: [
              { question: `What is a Variable?`, options: ["A static number", "A container for storing data values", "A UI component", "A database table"], correctAnswerIndex: 1 },
              { question: `What is the purpose of a Loop?`, options: ["To stop execution", "To execute a block of code multiple times", "To style the page", "To delete files"], correctAnswerIndex: 1 }
            ]
          }
        }
      ],
      edges: [
        { id: "edge-1", source: "node-1", target: "node-2" }
      ]
    };
  }
};

export async function POST(req: Request) {
  try {
    const { goal, level } = await req.json();
    
    // Artificial delay to simulate AI thinking for the hackathon presentation
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lowerGoal = goal.toLowerCase();
    const lowerLevel = level ? level.toLowerCase() : 'beginner';
    let data;

    // React Branching
    if (lowerGoal.includes('react') || lowerGoal.includes('next')) {
      if (lowerLevel.includes('advanced')) {
        data = reactAdvanced;
      } else if (lowerLevel.includes('intermediate')) {
        data = reactIntermediate;
      } else {
        data = reactBeginner;
      }
    } 
    // Python Branching
    else if (lowerGoal.includes('python') || lowerGoal.includes('data science')) {
      if (lowerLevel.includes('advanced')) {
        data = pythonAdvanced;
      } else if (lowerLevel.includes('intermediate')) {
        data = pythonIntermediate;
      } else {
        data = pythonBeginner;
      }
    } 
    // Generic Adaptive Branching
    else {
      data = generateGenericGraph(goal, level || 'Beginner');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Generation Error:', error);
    return NextResponse.json({ error: 'Failed to process demo graph.' }, { status: 500 });
  }
}
