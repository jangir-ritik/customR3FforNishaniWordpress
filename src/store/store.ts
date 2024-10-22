import { create } from 'zustand';

type Metal = 'gold' | 'silver';
type ChainPart = 'leftChain' | 'rightChain' | 'topLock' | 'bottomLock' | 'additionalChain';

// types.ts
interface JewelryPartData {
  leftChain: {
    label: string;
    model: string;
    price: number;
  };
  rightChain: {
    label: string;
    model: string;
    price: number;
  };
  additionalChain: {
    label: string;
    model: string;
    price: number;
  };
  lockBottom: {
    label: string;
    model: string;
    price: number;
  };
  lockTop: {
    label: string;
    model: string;
    price: number;
  };
}

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
  default_attributes: Record<string, string>;
  jewellery_part?: {
    value: string;
  };
  jewelry_parts?: Record<ChainPart, {
    label: string;
    model: string;
    price: number;
  }>;
}

interface ProductStore {
  productData: ProductData | null;
  jewelryData: JewelryPartData | null;
  selectedPart: ChainPart;
  parts: Record<ChainPart, ChainPartState>;
  setProductData: (data: ProductData) => void;
  setJewelryData: (dataString: string) => void;
  setSelectedPart: (part: ChainPart) => void;
  setPartMetal: (part: ChainPart, metal: Metal) => void;
  setPartModel: (part: ChainPart, modelIndex: number) => void;
  calculateTotalPrice: () => number;
}

// utils/parseJewelryData.ts
export const parseJewelryData = (dataString: string): JewelryPartData => {
  // Remove brackets and split by comma
  const cleanString = dataString.replace(/^\[|\]$/g, '').trim();
  const pairs = cleanString.split(',').map(pair => pair.trim());

  const data: Record<string, any> = {};

  pairs.forEach(pair => {
    const [key, value] = pair.split(':').map(item => item.trim());
    // Remove quotes and clean the value
    data[key] = value.replace(/"/g, '').trim();
  });

  return {
    leftChain: {
      label: data.leftChainLabel,
      model: data.leftChainModel,
      price: Number(data.leftChainPrice)
    },
    rightChain: {
      label: data.rightChainLabel,
      model: data.rightChainModel,
      price: Number(data.rightChainPrice)
    },
    additionalChain: {
      label: data.additionalChainLabel,
      model: data.additionalChainModel,
      price: Number(data.additionalChainPrice)
    },
    lockBottom: {
      label: data.lockBottomLabel,
      model: data.lockBottomModel,
      price: Number(data.lockBottomPrice)
    },
    lockTop: {
      label: data.lockTopLabel,
      model: data.lockTopModel,
      price: Number(data.lockTopPrice)
    }
  };
};

// Helper function to extract model number from default attribute value
const getModelNumber = (value: string): number => {
  const match = value.match(/model-(\d+)/);
  return match ? parseInt(match[1], 10) - 1 : 0; // Subtract 1 since our models are 0-based
}

// Helper function to map WordPress attribute names to store chain parts
const mapAttributeToChainPart = (attributeName: string): ChainPart | null => {
  const mapping: Record<string, ChainPart> = {
    'Right Chain': 'rightChain',
    'Left Chain': 'leftChain',
    'Front Lock': 'topLock',
    'Back Lock': 'bottomLock',
    'Additional Chain': 'additionalChain'
  };
  return mapping[attributeName] || null;
}

const useProductStore = create<ProductStore>((set, get) => ({
  productData: null,
  jewelryData: null,
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
    additionalChain: {
      metal: 'silver',
      label: 'Additional Chain',
      selectedModel: 0,
      modelCount: 3,
      prices: [600, 700, 800]
    }
  },

  setJewelryData: (dataString) => set((state) => {
    const jewelryData = parseJewelryData(dataString);
    const updatedParts = { ...state.parts };

    // Map the parsed jewelry data to the parts state
    const mappings = {
      leftChain: jewelryData.leftChain,
      rightChain: jewelryData.rightChain,
      additionalChain: jewelryData.additionalChain,
      bottomLock: jewelryData.lockBottom,
      topLock: jewelryData.lockTop
    };

    // Update each part with the corresponding jewelry data
    Object.entries(mappings).forEach(([partKey, jewelryPart]) => {
      const key = partKey as ChainPart;
      if (updatedParts[key] && jewelryPart) {
        updatedParts[key] = {
          ...updatedParts[key],
          label: jewelryPart.label,
          selectedModel: parseInt(jewelryPart.model.replace('Model-', '')) - 1,
          prices: Array(updatedParts[key].modelCount).fill(jewelryPart.price)
        };
      }
    });

    return {
      jewelryData,
      parts: updatedParts
    };
  }),
  setProductData: (data) => set((state) => {
    const updatedParts = { ...state.parts };

    // Update parts based on the jewelry_parts data
    if (data.jewelry_parts) {
      Object.entries(data.jewelry_parts).forEach(([key, value]) => {
        const partKey = key as ChainPart;
        if (updatedParts[partKey]) {
          const price = parseFloat(value.price);
          updatedParts[partKey] = {
            ...updatedParts[partKey],
            label: value.label,
            selectedModel: parseInt(value.model.replace('Model-', '')) - 1,
            prices: Array(updatedParts[partKey].modelCount).fill(isNaN(price) ? 0 : price)
          };
        }
      });
    }

    // Set default attributes
    if (Array.isArray(data.default_attributes)) {
      data.default_attributes.forEach((attr) => {
        const partKey = mapAttributeToChainPart(attr.name);
        if (partKey && updatedParts[partKey]) {
          updatedParts[partKey].selectedModel = getModelNumber(attr.option);
        }
      });
    }

    return {
      productData: data,
      parts: updatedParts
    };
  }),
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
    return Object.entries(state.parts).reduce((total, [partKey, part]) => {
      const price = part.prices[part.selectedModel];
      if (isNaN(price)) {
        console.warn(`Invalid price for ${partKey}:`, part.prices, part.selectedModel);
        return total;
      }
      return total + price;
    }, 0);
  },
}));

export default useProductStore;
