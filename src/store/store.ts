import { create } from 'zustand';

type Metal = 'gold' | 'silver';
type ChainPart = 'leftChain' | 'rightChain' | 'topLock' | 'bottomLock';

interface ChainPartState {
  metal: Metal;
  label: string;
  selectedModel: number;
  modelCount: number;
  prices: number[];
}

interface ProductStore {
  selectedPart: ChainPart;
  parts: Record<ChainPart, ChainPartState>;
  setSelectedPart: (part: ChainPart) => void;
  setPartMetal: (part: ChainPart, metal: Metal) => void;
  setPartModel: (part: ChainPart, modelIndex: number) => void;
  calculateTotalPrice: () => number;
}

const useProductStore = create<ProductStore>((set, get) => ({
  selectedPart: 'leftChain',
  parts: {
    leftChain: { 
      metal: 'gold', 
      label: 'Left Chain', 
      selectedModel: 0, 
      modelCount: 6,
      prices: [1500, 1600, 1700, 1800, 1900, 2000]
    },
    rightChain: { 
      metal: 'silver', 
      label: 'Right Chain', 
      selectedModel: 0, 
      modelCount: 6,
      prices: [1500, 1600, 1700, 1800, 1900, 2000]
    },
    topLock: { 
      metal: 'silver', 
      label: 'Front Lock', 
      selectedModel: 0, 
      modelCount: 5,
      prices: [600, 700, 800, 900, 1000]
    },
    bottomLock: { 
      metal: 'gold', 
      label: 'Back Lock', 
      selectedModel: 0, 
      modelCount: 5,
      prices: [600, 700, 800, 900, 1000]
    },
  },
  setSelectedPart: (part) => set({ selectedPart: part }),
  setPartMetal: (part, metal) => set((state) => ({
    parts: {
      ...state.parts,
      [part]: { ...state.parts[part], metal },
    },
  })),
  setPartModel: (part, modelIndex) => set((state) => ({
    parts: {
      ...state.parts,
      [part]: { ...state.parts[part], selectedModel: modelIndex },
    },
  })),
  calculateTotalPrice: () => {
    const state = get();
    return Object.values(state.parts).reduce((total, part) => {
      return total + part.prices[part.selectedModel];
    }, 0);
  },
}));

export default useProductStore;