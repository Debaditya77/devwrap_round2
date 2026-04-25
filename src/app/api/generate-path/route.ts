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
        label: "React Foundations",
        status: "pending",
        description: "The essential building blocks: JSX, Components, and Props.",
        explainability: "AI Reasoning: Absolute beginners must understand how to construct static components before adding interactivity.",
        resources: [
          { title: "React Official Docs: Quick Start", url: "https://react.dev/learn", type: "Documentation" },
          { title: "React in 100 Seconds (Fireship)", url: "https://www.youtube.com/watch?v=Tn6-PIqc4UM", type: "Video" }
        ],
        supportiveResources: [
          { title: "React Visual Guide", url: "https://react.dev/learn/thinking-in-react", type: "Documentation" },
          { title: "JSX Simply Explained", url: "https://www.youtube.com/results?search_query=jsx+explained", type: "Video" }
        ],
        timeEstimate: "3 days",
        quizzes: {
          beginner: [
            { question: "What does JSX stand for?", options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Execution"], correctAnswerIndex: 0 },
            { question: "How do you pass data to children?", options: ["Using Props", "Using State"], correctAnswerIndex: 0 }
          ],
          intermediate: [
            { question: "What is the primary rule of JSX?", options: ["Must have one parent element", "Must be written in CSS", "Must use only divs"], correctAnswerIndex: 0 }
          ],
          advanced: [
            { question: "How does React handle JSX under the hood?", options: ["React.createElement calls", "String concatenation", "Direct DOM injection"], correctAnswerIndex: 0 }
          ]
        }
      },
      position: { x: 0, y: 0 }
    }
  ],
  edges: []
};

const reactIntermediate = {
  nodes: [
    {
      id: "node-1",
      type: "custom",
      data: {
        label: "Advanced Hooks",
        status: "pending",
        description: "useEffect, useRef, and custom hooks.",
        explainability: "AI Reasoning: Intermediates need to master side effects and reusable logic.",
        resources: [
          { title: "Synchronizing with Effects", url: "https://react.dev/learn/synchronizing-with-effects", type: "Documentation" }
        ],
        supportiveResources: [
          { title: "useEffect for Beginners", url: "https://www.youtube.com/watch?v=0ZJgIjIuY7U", type: "Video" }
        ],
        timeEstimate: "1 week",
        quizzes: {
          beginner: [
            { question: "What is useEffect used for?", options: ["Side effects", "Styling"], correctAnswerIndex: 0 }
          ],
          intermediate: [
            { question: "What does the dependency array do?", options: ["Controls execution", "Stores data"], correctAnswerIndex: 0 }
          ],
          advanced: [
            { question: "When does useLayoutEffect run compared to useEffect?", options: ["Before paint", "After paint"], correctAnswerIndex: 0 }
          ]
        }
      },
      position: { x: 0, y: 0 }
    }
  ],
  edges: []
};

const reactAdvanced = {
  nodes: [
    {
      id: "node-1",
      type: "custom",
      data: {
        label: "React Server Components",
        status: "pending",
        description: "Deep dive into RSC and streaming.",
        explainability: "AI Reasoning: RSC is the future of React architecture.",
        resources: [
          { title: "Understanding RSC", url: "https://vercel.com/blog/understanding-react-server-components", type: "Article" }
        ],
        supportiveResources: [
          { title: "RSC Basics Explained", url: "https://www.youtube.com/results?search_query=react+server+components+explained", type: "Video" }
        ],
        timeEstimate: "2 weeks",
        quizzes: {
          beginner: [
            { question: "Do Server Components run on the client?", options: ["No", "Yes"], correctAnswerIndex: 0 }
          ],
          intermediate: [
            { question: "What is a major benefit of RSC?", options: ["Reduced bundle size", "Better CSS"], correctAnswerIndex: 0 }
          ],
          advanced: [
            { question: "How does RSC serialization work?", options: ["JSON-like stream", "Base64 strings"], correctAnswerIndex: 0 }
          ]
        }
      },
      position: { x: 0, y: 0 }
    }
  ],
  edges: []
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
        label: "Python Syntax",
        status: "pending",
        description: "Variables, Data Types, and Control Flow.",
        explainability: "AI Reasoning: The absolute core syntax required to write any Python script.",
        resources: [
          { title: "Python Official Tutorial", url: "https://docs.python.org/3/tutorial/index.html", type: "Documentation" }
        ],
        supportiveResources: [
          { title: "Python for Absolute Beginners", url: "https://www.youtube.com/watch?v=kqtD5dpn9C8", type: "Video" }
        ],
        timeEstimate: "1 week",
        quizzes: {
          beginner: [
            { question: "How do you create a list in Python?", options: ["my_list = []", "my_list = {}"], correctAnswerIndex: 0 }
          ],
          intermediate: [
            { question: "Which keyword defines a function?", options: ["def", "func"], correctAnswerIndex: 0 }
          ],
          advanced: [
            { question: "What is a list comprehension?", options: ["A concise way to create lists", "A type of database"], correctAnswerIndex: 0 }
          ]
        }
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
        label: "OOP & APIs",
        status: "pending",
        description: "Classes, Inheritance, and the Requests library.",
        explainability: "AI Reasoning: Intermediate developers must structure code safely.",
        resources: [
          { title: "Real Python: OOP", url: "https://realpython.com/python3-object-oriented-programming/", type: "Article" }
        ],
        supportiveResources: [
          { title: "OOP Simplified", url: "https://www.youtube.com/results?search_query=python+oop+explained", type: "Video" }
        ],
        timeEstimate: "2 weeks",
        quizzes: {
          beginner: [
            { question: "What method initializes an object?", options: ["__init__", "start"], correctAnswerIndex: 0 }
          ],
          intermediate: [
            { question: "Which library is for HTTP requests?", options: ["requests", "axios"], correctAnswerIndex: 0 }
          ],
          advanced: [
            { question: "What is multiple inheritance?", options: ["Inheriting from more than one class", "Inheriting twice"], correctAnswerIndex: 0 }
          ]
        }
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
        label: "Concurrency & ML",
        status: "pending",
        description: "asyncio, multithreading, and PyTorch.",
        explainability: "AI Reasoning: Elite Python devs must handle high-throughput operations.",
        resources: [
          { title: "Asyncio Docs", url: "https://docs.python.org/3/library/asyncio.html", type: "Documentation" }
        ],
        supportiveResources: [
          { title: "Async Explained Simply", url: "https://www.youtube.com/results?search_query=python+asyncio+explained", type: "Video" }
        ],
        timeEstimate: "3 weeks",
        quizzes: {
          beginner: [
            { question: "What does await do?", options: ["Pauses execution", "Stops the app"], correctAnswerIndex: 0 }
          ],
          intermediate: [
            { question: "What is PyTorch for?", options: ["Deep Learning", "Web Design"], correctAnswerIndex: 0 }
          ],
          advanced: [
            { question: "What is the Global Interpreter Lock (GIL)?", options: ["A mutex that protects access to Python objects", "A type of file lock"], correctAnswerIndex: 0 }
          ]
        }
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
  
  return {
    nodes: [
      {
        id: "node-1", type: "custom", position: { x: 0, y: 0 },
        data: {
          label: `Foundations of ${goalCap}`, status: "pending",
          description: `The core principles and building blocks of ${goalCap}.`,
          explainability: `AI Reasoning: Establishing a strong conceptual foundation is the first step in mastering ${goalCap}.`,
          resources: [{ title: `Getting Started with ${goalCap}`, url: `https://www.google.com/search?q=${goal}+getting+started`, type: "Documentation" }],
          supportiveResources: [
            { title: "Visual Beginner's Guide", url: "https://www.youtube.com/results?search_query=" + goal + "+explained+simply", type: "Video" },
            { title: "Simplified Concept Map", url: "https://en.wikipedia.org/wiki/" + goal, type: "Article" }
          ],
          timeEstimate: "1 week",
          quizzes: {
            beginner: [
              { question: `What is ${goalCap} primarily used for?`, options: ["General purpose development", "Making coffee", "Cleaning windows", "None of the above"], correctAnswerIndex: 0 },
              { question: `True or False: ${goalCap} requires a computer to run.`, options: ["True", "False"], correctAnswerIndex: 0 }
            ],
            intermediate: [
              { question: `Which design pattern is commonly used in ${goalCap}?`, options: ["MVC", "XYZ", "ABC", "123"], correctAnswerIndex: 0 },
              { question: `How do you handle asynchronous operations in ${goalCap}?`, options: ["Using Callbacks/Promises", "Wait and see", "Hope for the best", "Sync everything"], correctAnswerIndex: 0 }
            ],
            advanced: [
              { question: `In a high-concurrency environment, how does ${goalCap} manage state?`, options: ["Optimistic Locking", "Global Locks", "No management", "Manual RAM editing"], correctAnswerIndex: 0 },
              { question: `What is the O(n) complexity of the primary search algorithm in ${goalCap}?`, options: ["O(log n)", "O(n^2)", "O(1)", "O(n!)"], correctAnswerIndex: 0 }
            ]
          }
        }
      },
      {
        id: "node-2", type: "custom", position: { x: 0, y: 0 },
        data: {
          label: `Advanced ${goalCap} Implementation`, status: "pending",
          description: `Applying ${goalCap} to solve real-world engineering problems.`,
          explainability: `AI Reasoning: Moving from theory to practice requires understanding implementation trade-offs.`,
          resources: [{ title: `${goalCap} in Production`, url: `https://dev.to/search?q=${goal}+production`, type: "Article" }],
          supportiveResources: [
            { title: "Step-by-Step Workshop", url: "https://www.youtube.com/results?search_query=" + goal + "+project+tutorial", type: "Video" },
            { title: "Cheat Sheet", url: "https://quickref.me/" + goal, type: "Article" }
          ],
          timeEstimate: "2 weeks",
          quizzes: {
            beginner: [
              { question: `What is a basic function in ${goalCap}?`, options: ["A reusable block of code", "A type of variable", "A styling rule", "A database query"], correctAnswerIndex: 0 }
            ],
            intermediate: [
              { question: `How do you optimize performance in a ${goalCap} application?`, options: ["Caching and Indexing", "Adding more comments", "Changing font size", "Buying a new PC"], correctAnswerIndex: 0 }
            ],
            advanced: [
              { question: `Describe the memory management model of ${goalCap}.`, options: ["Heap and Stack allocation", "Random placement", "Direct Disk access", "Manual bit flipping"], correctAnswerIndex: 0 }
            ]
          }
        }
      }
    ],
    edges: [
      { id: "edge-1", source: "node-1", target: "node-2" }
    ]
  };
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { goal, level } = body;
    
    if (!goal) {
      return NextResponse.json({ error: 'Goal is required.' }, { status: 400 });
    }
    
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
