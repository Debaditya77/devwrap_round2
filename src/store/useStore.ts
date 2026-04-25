import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Node, Edge } from 'reactflow';

interface SkillMapState {
  currentPathId: string | null;
  userGoal: string | null;
  skillLevel: string | null;
  nodes: Node[];
  edges: Edge[];
  user: any | null;
  lastLearnedTimestamps: Record<string, number>;
  setGraphData: (nodes: Node[], edges: Edge[]) => void;
  setUserGoal: (goal: string) => void;
  setSkillLevel: (level: string) => void;
  setCurrentPathId: (id: string | null) => void;
  setUser: (user: any | null) => void;
  markNodeAsCleared: (nodeId: string) => void;
  updateLastLearned: (pathId: string) => void;
  cachedCommunityPaths: any[] | null;
  cachedUserPaths: any[] | null;
  setCachedCommunityPaths: (paths: any[]) => void;
  setCachedUserPaths: (paths: any[]) => void;
}

export const useStore = create<SkillMapState>()(
  persist(
    (set) => ({
      currentPathId: null,
      userGoal: null,
      skillLevel: null,
      nodes: [],
      edges: [],
      user: null,
      lastLearnedTimestamps: {},
      setGraphData: (nodes, edges) => set({ nodes, edges }),
      setUserGoal: (goal) => set({ userGoal: goal }),
      setSkillLevel: (level) => set({ skillLevel: level }),
      setCurrentPathId: (id) => set({ currentPathId: id }),
      setUser: (user) => set({ user }),
      markNodeAsCleared: (nodeId) => set((state) => ({
        nodes: state.nodes.map((node) => 
          node.id === nodeId 
            ? { ...node, data: { ...node.data, status: 'cleared' } }
            : node
        )
      })),
      updateLastLearned: (pathId) => set((state) => ({
        lastLearnedTimestamps: {
          ...state.lastLearnedTimestamps,
          [pathId]: Date.now()
        }
      })),
      cachedCommunityPaths: null,
      cachedUserPaths: null,
      setCachedCommunityPaths: (paths) => set({ cachedCommunityPaths: paths }),
      setCachedUserPaths: (paths) => set({ cachedUserPaths: paths }),
    }),
    {
      name: 'skillmap-offline-storage', // saves to browser localStorage
      partialize: (state) => ({ 
        // We only persist the data that makes the app feel fast
        nodes: state.nodes, 
        edges: state.edges, 
        userGoal: state.userGoal, 
        skillLevel: state.skillLevel,
        currentPathId: state.currentPathId,
        cachedUserPaths: state.cachedUserPaths,
        cachedCommunityPaths: state.cachedCommunityPaths,
        lastLearnedTimestamps: state.lastLearnedTimestamps
      }),
    }
  )
);
