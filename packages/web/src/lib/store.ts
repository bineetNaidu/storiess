import create from 'zustand';

interface IState {
  userId: string | null;
  setUserId: (id: string) => void;
}

export const useStore = create<IState>((set) => ({
  userId: null,
  setUserId: (id) => set({ userId: id }),
}));
