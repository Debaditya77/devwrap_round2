import { NextResponse } from 'next/server';

const reactBeginner = {
  nodes: [
    {
      id: "node-1", type: "custom", position: { x: 0, y: 0 },
      data: {
        label: "React Foundations", status: "pending",
        description: "The essential building blocks: JSX, Components, and Props.",
        explainability: "AI Reasoning: Absolute beginners must understand how to construct static components before adding interactivity.",
        resources: [{ title: "React Official Docs: Quick Start", url: "https://react.dev/learn", type: "Documentation" }],
        supportiveResources: [{ title: "React Visual Guide", url: "https://react.dev/learn/thinking-in-react", type: "Documentation" }],
        timeEstimate: "3 days",
        quizzes: {
          beginner: [{ question: "What does JSX stand for?", options: ["JavaScript XML", "Java Syntax Extension", "JSON XML"], correctAnswerIndex: 0 }],
          intermediate: [{ question: "What is the primary rule of JSX?", options: ["Must have one parent element", "Must be written in CSS"], correctAnswerIndex: 0 }],
          advanced: [{ question: "How does React handle JSX under the hood?", options: ["React.createElement calls", "String concatenation"], correctAnswerIndex: 0 }]
        }
      }
    },
    {
      id: "node-2", type: "custom", position: { x: 0, y: 0 },
      data: {
        label: "State & Hooks", status: "pending",
        description: "Adding interactivity with useState.",
        explainability: "AI Reasoning: State is what makes React applications dynamic.",
        resources: [{ title: "State: A Component's Memory", url: "https://react.dev/learn/state-a-components-memory", type: "Documentation" }],
        supportiveResources: [{ title: "useState Explained", url: "https://react.dev/learn/state-a-components-memory", type: "Video" }],
        timeEstimate: "2 days",
        quizzes: {
          beginner: [{ question: "Which hook adds state to a functional component?", options: ["useState", "useEffect"], correctAnswerIndex: 0 }],
          intermediate: [{ question: "Are state updates synchronous?", options: ["No", "Yes"], correctAnswerIndex: 0 }],
          advanced: [{ question: "How do you update state based on previous state?", options: ["Pass a function to setState", "Pass the new value directly"], correctAnswerIndex: 0 }]
        }
      }
    },
    {
      id: "node-3", type: "custom", position: { x: 0, y: 0 },
      data: {
        label: "Handling Events", status: "pending",
        description: "Responding to user interactions.",
        explainability: "AI Reasoning: Web apps need to respond to clicks and typing.",
        resources: [{ title: "Responding to Events", url: "https://react.dev/learn/responding-to-events", type: "Documentation" }],
        supportiveResources: [{ title: "Event Handlers Guide", url: "https://react.dev/learn/responding-to-events", type: "Video" }],
        timeEstimate: "1 day",
        quizzes: {
          beginner: [{ question: "How do you handle a click event in React?", options: ["onClick={handler}", "onclick=\"handler()\""], correctAnswerIndex: 0 }],
          intermediate: [{ question: "What object is passed to event handlers?", options: ["SyntheticEvent", "NativeEvent"], correctAnswerIndex: 0 }],
          advanced: [{ question: "How do you stop event propagation?", options: ["e.stopPropagation()", "e.preventDefault()"], correctAnswerIndex: 0 }]
        }
      }
    },
    {
      id: "node-4", type: "custom", position: { x: 0, y: 0 },
      data: {
        label: "Side Effects", status: "pending",
        description: "Data fetching and DOM manipulation with useEffect.",
        explainability: "AI Reasoning: Most apps need to communicate with external APIs.",
        resources: [{ title: "Synchronizing with Effects", url: "https://react.dev/learn/synchronizing-with-effects", type: "Documentation" }],
        supportiveResources: [{ title: "useEffect Guide", url: "https://react.dev/learn/synchronizing-with-effects", type: "Video" }],
        timeEstimate: "3 days",
        quizzes: {
          beginner: [{ question: "Which hook handles side effects?", options: ["useEffect", "useState"], correctAnswerIndex: 0 }],
          intermediate: [{ question: "What does an empty dependency array mean?", options: ["Runs only once", "Runs on every render"], correctAnswerIndex: 0 }],
          advanced: [{ question: "How do you clean up an effect?", options: ["Return a cleanup function", "Call clearEffect()"], correctAnswerIndex: 0 }]
        }
      }
    }
  ],
  edges: [
    { id: "e1-2", source: "node-1", target: "node-2" },
    { id: "e2-3", source: "node-2", target: "node-3" },
    { id: "e3-4", source: "node-3", target: "node-4" }
  ]
};

const pythonBeginner = {
  nodes: [
    {
      id: "node-1", type: "custom", position: { x: 0, y: 0 },
      data: {
        label: "Python Syntax & Types", status: "pending",
        description: "Variables, Data Types, and Operators.",
        explainability: "AI Reasoning: The absolute core syntax required to write any Python script.",
        resources: [{ title: "Python Official Tutorial", url: "https://docs.python.org/3/tutorial/index.html", type: "Documentation" }],
        supportiveResources: [{ title: "Python Basics", url: "https://www.youtube.com/watch?v=kqtD5dpn9C8", type: "Video" }],
        timeEstimate: "3 days",
        quizzes: {
          beginner: [{ question: "How do you declare a variable?", options: ["x = 5", "var x = 5"], correctAnswerIndex: 0 }],
          intermediate: [{ question: "What type is 3.14?", options: ["float", "int"], correctAnswerIndex: 0 }],
          advanced: [{ question: "Are Python variables statically typed?", options: ["No, they are dynamically typed", "Yes"], correctAnswerIndex: 0 }]
        }
      }
    },
    {
      id: "node-2", type: "custom", position: { x: 0, y: 0 },
      data: {
        label: "Control Flow & Functions", status: "pending",
        description: "If statements, loops, and def.",
        explainability: "AI Reasoning: Logic branching is necessary for any program.",
        resources: [{ title: "Control Flow Tools", url: "https://docs.python.org/3/tutorial/controlflow.html", type: "Documentation" }],
        supportiveResources: [{ title: "Loops Explained", url: "https://docs.python.org/3/tutorial/controlflow.html", type: "Video" }],
        timeEstimate: "4 days",
        quizzes: {
          beginner: [{ question: "Which keyword defines a function?", options: ["def", "function"], correctAnswerIndex: 0 }],
          intermediate: [{ question: "How do you loop 5 times?", options: ["for i in range(5):", "loop(5):"], correctAnswerIndex: 0 }],
          advanced: [{ question: "What is list comprehension?", options: ["A concise way to create lists", "A memory profiler"], correctAnswerIndex: 0 }]
        }
      }
    }
  ],
  edges: [
    { id: "e1-2", source: "node-1", target: "node-2" }
  ]
};

const pythonIntermediate = {
  nodes: [
    {
      id: "node-1", type: "custom", position: { x: 0, y: 0 },
      data: {
        label: "OOP & APIs", status: "pending",
        description: "Classes, Inheritance, and the Requests library.",
        explainability: "AI Reasoning: Intermediate developers must structure code safely.",
        resources: [{ title: "Real Python: OOP", url: "https://realpython.com/python3-object-oriented-programming/", type: "Article" }],
        supportiveResources: [{ title: "OOP Simplified", url: "https://www.youtube.com/results?search_query=python+oop+explained", type: "Video" }],
        timeEstimate: "2 weeks",
        quizzes: {
          beginner: [{ question: "What method initializes an object?", options: ["__init__", "start"], correctAnswerIndex: 0 }],
          intermediate: [{ question: "Which library is for HTTP requests?", options: ["requests", "axios"], correctAnswerIndex: 0 }],
          advanced: [{ question: "What is multiple inheritance?", options: ["Inheriting from more than one class", "Inheriting twice"], correctAnswerIndex: 0 }]
        }
      }
    }
  ],
  edges: []
};

const pythonAdvanced = {
  nodes: [
    {
      id: "node-1", type: "custom", position: { x: 0, y: 0 },
      data: {
        label: "Concurrency & ML", status: "pending",
        description: "asyncio, multithreading, and PyTorch.",
        explainability: "AI Reasoning: Elite Python devs must handle high-throughput operations.",
        resources: [{ title: "Asyncio Docs", url: "https://docs.python.org/3/library/asyncio.html", type: "Documentation" }],
        supportiveResources: [{ title: "Async Explained Simply", url: "https://www.youtube.com/results?search_query=python+asyncio+explained", type: "Video" }],
        timeEstimate: "3 weeks",
        quizzes: {
          beginner: [{ question: "What does await do?", options: ["Pauses execution", "Stops the app"], correctAnswerIndex: 0 }],
          intermediate: [{ question: "What is PyTorch for?", options: ["Deep Learning", "Web Design"], correctAnswerIndex: 0 }],
          advanced: [{ question: "What is the Global Interpreter Lock (GIL)?", options: ["A mutex that protects access to Python objects", "A type of file lock"], correctAnswerIndex: 0 }]
        }
      }
    }
  ],
  edges: []
};

const generateGenericGraph = (goal: string, level: string) => {
  const goalCap = goal.charAt(0).toUpperCase() + goal.slice(1);
  return {
    nodes: [
      {
        id: "node-1", type: "custom", position: { x: 0, y: 0 },
        data: {
          label: `Foundations of ${goalCap}`, status: "pending",
          description: `The core principles and building blocks of ${goalCap}.`,
          explainability: `AI Reasoning: Establishing a strong conceptual foundation is the first step.`,
          resources: [{ title: `Getting Started with ${goalCap}`, url: `https://www.google.com/search?q=${goal}+getting+started`, type: "Documentation" }],
          supportiveResources: [{ title: "Visual Guide", url: "https://www.youtube.com/results?search_query=" + goal, type: "Video" }],
          timeEstimate: "1 week",
          quizzes: {
            beginner: [{ question: `What is ${goalCap} primarily used for?`, options: ["Development", "Cleaning"], correctAnswerIndex: 0 }],
            intermediate: [{ question: `Which design pattern is used in ${goalCap}?`, options: ["MVC", "XYZ"], correctAnswerIndex: 0 }],
            advanced: [{ question: `How does ${goalCap} manage state?`, options: ["Optimistic Locking", "Global Locks"], correctAnswerIndex: 0 }]
          }
        }
      },
      {
        id: "node-2", type: "custom", position: { x: 0, y: 0 },
        data: {
          label: `Advanced ${goalCap}`, status: "pending",
          description: `Applying ${goalCap} to real-world problems.`,
          explainability: `AI Reasoning: Practice is required to master ${goalCap}.`,
          resources: [{ title: `${goalCap} in Production`, url: `https://dev.to/search?q=${goal}+production`, type: "Article" }],
          supportiveResources: [{ title: "Workshop", url: "https://www.youtube.com/results?search_query=" + goal + "+project", type: "Video" }],
          timeEstimate: "2 weeks",
          quizzes: {
            beginner: [{ question: `What is a basic function in ${goalCap}?`, options: ["Reusable code", "Variable"], correctAnswerIndex: 0 }],
            intermediate: [{ question: `How do you optimize performance?`, options: ["Caching", "Buying RAM"], correctAnswerIndex: 0 }],
            advanced: [{ question: `Describe the memory model.`, options: ["Heap/Stack", "Random"], correctAnswerIndex: 0 }]
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
    if (!goal) return NextResponse.json({ error: 'Goal is required.' }, { status: 400 });
    
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lowerGoal = goal.toLowerCase();
    const lowerLevel = level ? level.toLowerCase() : 'beginner';
    let data;

    if (lowerGoal.includes('react') || lowerGoal.includes('next')) {
      data = reactBeginner; // We force all React paths to Beginner for now so they have 4 modules for testing
    } else if (lowerGoal.includes('python') || lowerGoal.includes('data science')) {
      data = pythonBeginner; // We force all Python paths to Beginner so they have 2 modules
    } else {
      data = generateGenericGraph(goal, level || 'Beginner');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Generation Error:', error);
    return NextResponse.json({ error: 'Failed to process demo graph.' }, { status: 500 });
  }
}
