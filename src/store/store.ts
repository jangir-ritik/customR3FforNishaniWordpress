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

interface ProductData {
  id: string;
  name: string;
  description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  image_url: string;
  attributes: Record<string, any>;
  variations: any[];
}

interface ProductStore {
  productData: ProductData | null;
  selectedPart: ChainPart;
  parts: Record<ChainPart, ChainPartState>;
  setProductData: (data: ProductData) => void;
  setSelectedPart: (part: ChainPart) => void;
  setPartMetal: (part: ChainPart, metal: Metal) => void;
  setPartModel: (part: ChainPart, modelIndex: number) => void;
  calculateTotalPrice: () => number;
}

const useProductStore = create<ProductStore>((set, get) => ({
  productData: null,
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
  setProductData: (data) => set({ productData: data }),
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
    const basePrice = state.productData ? parseFloat(state.productData.price) : 0;
    const customizationPrice = Object.values(state.parts).reduce((total, part) => {
      return total + part.prices[part.selectedModel];
    }, 0);
    // return basePrice + customizationPrice;
    return basePrice;

  },
}));

export default useProductStore;