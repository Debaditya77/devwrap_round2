# 🗺️ SkillMap/Invisible_Approach: AI-Powered Adaptive Learning Platform

SkillMap is a cutting-edge, AI-driven learning platform designed to revolutionize how individuals master new technologies. By combining the power of **Google Gemini AI**, **Interactive 3D Visualizations**, and an **Adaptive Difficulty Engine**, SkillMap provides a truly personalized educational journey.

🌐 **[Live Platform on Vercel](https://devwrap-round2.vercel.app/)**
🎥 **[Watch the Demo Video on YouTube](https://youtu.be/4hR9t2by4lc)**

---

## 🌟 Key Features

### 1. 🧠 AI Path Generation
- **Personalized Roadmaps**: Simply enter a learning goal (e.g., "React," "Machine Learning," "Quantum Computing"), and our AI generates a custom-tailored skill path.
- **Goal-Aware Scaling**: The AI analyzes your target and structures the path into logical, sequential nodes from Foundations to Mastery.

### 2. ⚡ Adaptive Difficulty System (Fail-Safe Learning)
- **3-Attempt Quiz Limit**: Every module features a knowledge check. To prevent "guess-clicking," users are limited to 3 attempts.
- **Automatic Level Adjustment**: If a user fails a quiz 3 times, the system intelligently downgrades their skill level (e.g., Advanced → Intermediate → Beginner).
- **Dynamic Content Swapping**: Upon downgrade, the module's questions automatically switch to a simpler set tailored to the new level.
- **Supportive Resource Injection**: Failing a quiz triggers a "Supportive Learning" section, providing simplified guides, visual videos, and cheat sheets to help the user recover.

### 3. 🌐 Community & Collaboration
- **Global Skill Library**: Browse paths created by other learners in the community.
- **One-Click Cloning**: Instantly clone any community path to your personal dashboard to start learning.
- **Smart Sorting**: The community feed automatically prioritizes paths you've recently engaged with, bringing your current focus to the top.

### 4. 📊 Progress Tracking Dashboard
- **Interactive Flow Map**: Built with React Flow, our dashboard allows you to visualize your progress through a sleek, interactive graph.
- **Module Status**: Nodes change color and state (Locked, Pending, Cleared) as you progress through the path.
- **Prerequisite Enforcement**: You cannot skip ahead; modules stay locked until their parent prerequisites are mastered.

### 5. ✨ Premium User Experience
- **Glassmorphism UI**: A stunning, modern interface with vibrant gradients and translucent effects.
- **Micro-Animations**: Powered by Framer Motion for smooth transitions and interactive feedback.
- **Security & Confirmation**: Premium modal-based flows for actions like logging out or path cloning.

---

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS 4.
- **State Management**: Zustand (with Persistence) for seamless offline-first experience.
- **Animations**: Framer Motion.
- **Graph Engine**: React Flow.
- **Backend/Database**: Firebase (Auth & Firestore).
- **AI Intelligence**: Google Gemini AI (via Generative AI SDK).
- **Icons**: Lucide React.

---

## 🛠️ Methodology & How to Use

### Step 1: Initialization
Start by logging in via Google. Your progress is synced across devices using Firebase.

### Step 2: Define Your Goal
Navigate to the **Dashboard** and enter what you want to learn. The AI will brainstorm and construct an interactive graph of interconnected concepts.

### Step 3: Interactive Learning
Click on any unlocked node (Cyan border) to open the **Side Panel**. Here you will find:
- **AI Reasoning**: Why this concept is important for your specific goal.
- **Curated Resources**: High-quality links to documentation and videos.
- **Knowledge Check**: A quiz you must pass to "clear" the node.

### Step 4: Mastering the Path
As you pass quizzes, child nodes will unlock. If you find a topic too difficult, don't worry! After 3 failed quiz attempts, SkillMap will:
1. Adjust your difficulty level.
2. Provide **Supportive Resources** (Simplified guides).
3. Reset the quiz with easier questions.

### Step 5: Community Engagement
Check the **Community** tab to find trending paths. Cloning a path adds it to your collection. The system tracks your "Last Learned" activity to keep your dashboard organized.

---
