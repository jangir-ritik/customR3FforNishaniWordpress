import { create } from 'zustand';
import { ChainPart, JewelryPartData, ProductStore, Metal, ProductData } from '../types/type';
import options from "../../public/product_array.json";

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

const getModelNumber = (value: string): number => {
  const match = value.match(/model-(\d+)/);
  return match ? parseInt(match[1], 10) - 1 : 0;
}

const getModelCount = (productType: string, partType: ChainPart): number => {
  const getCategoryForPart = (part: ChainPart, type: string): string => {
    if (part === 'topLock' || part === 'bottomLock') {
      return 'hooks';
    }
    return type === 'necklace' ? 'necklaces' : 'bracelets';
  };

  const category = getCategoryForPart(partType, productType);
  return options.categories[category]?.length || 0;
};

const getModelPrices = (productType: string, partType: ChainPart): number[] => {
  const category = productType === 'necklace' ? 'necklaces' : 'bracelets';
  if (partType === 'topLock' || partType === 'bottomLock') {
    return options.categories['hooks']?.map(item => item.price) || [];
  }
  return options.categories[category]?.map(item => item.price) || [];
};

const getPartPrice = (productType: string, partType: ChainPart, modelIndex: number): number => {
  let category: string;
  if (partType === 'topLock' || partType === 'bottomLock') {
    category = 'hooks';
  } else {
    category = productType === 'necklace' ? 'necklaces' : 'bracelets';
  }
  return options.categories[category]?.[modelIndex]?.price || 0;
};

const getItemCode = (productType: string, partType: ChainPart, modelIndex: number, plating: Metal): string => {
  let category: string;
  if (partType === 'topLock' || partType === 'bottomLock') {
    category = 'hooks';
  } else {
    category = productType === 'necklace' ? 'necklaces' : 'bracelets';
  }
  return options.categories[category]?.[modelIndex]?.variants?.[plating]?.['item-code'] || '';
};

const useProductStore = create<ProductStore>((set, get) => ({
  productData: window.productData || {},
  jewelryData: null,
  selectedPart: 'leftChain',
  productType: 'necklace',
  parts: {
    leftChain: {
      plating: 'gold',
      label: 'Left Chain',
      selectedModel: 0,
      get modelCount() {
        return getModelCount(get().productType, 'leftChain');
      },
      get prices() {
        return getModelPrices(get().productType, 'leftChain');
      },
      get itemCode() {
        return getItemCode(get().productType, 'leftChain', this.selectedModel, this.plating);
      }
    },
    rightChain: {
      plating: 'silver',
      label: 'Right Chain',
      selectedModel: 0,
      get modelCount() {
        return getModelCount(get().productType, 'rightChain');
      },
      get prices() {
        return getModelPrices(get().productType, 'rightChain');
      },
      get itemCode() {
        return getItemCode(get().productType, 'rightChain', this.selectedModel, this.plating);
      }
    },
    topLock: {
      plating: 'silver',
      label: 'Front Lock',
      selectedModel: 0,
      get modelCount() {
        return getModelCount(get().productType, 'topLock');
      },
      get prices() {
        return getModelPrices(get().productType, 'topLock');
      },
      get itemCode() {
        return getItemCode(get().productType, 'topLock', this.selectedModel, this.plating);
      }
    },
    bottomLock: {
      plating: 'gold',
      label: 'Back Lock',
      selectedModel: 0,
      get modelCount() {
        return getModelCount(get().productType, 'bottomLock');
      },
      get prices() {
        return getModelPrices(get().productType, 'bottomLock');
      },
      get itemCode() {
        return getItemCode(get().productType, 'bottomLock', this.selectedModel, this.plating);
      }
    },
    additionalChain: {
      plating: 'silver',
      label: 'Additional Chain',
      selectedModel: 0,
      get modelCount() {
        return getModelCount(get().productType, 'additionalChain');
      },
      get prices() {
        return getModelPrices(get().productType, 'additionalChain');
      },
      get itemCode() {
        return getItemCode(get().productType, 'additionalChain', this.selectedModel, this.plating);
      }
    }
  },
  totalPrice: 0,

  setProductType: (type) => set((state) => {
    const updatedParts = Object.entries(state.parts).reduce((acc, [key, part]) => {
      const partKey = key as ChainPart;
      const newModelCount = getModelCount(type, partKey);
      acc[partKey] = {
        ...part,
        selectedModel: part.selectedModel >= newModelCount ? 0 : part.selectedModel
      };
      return acc;
    }, {} as ProductStore['parts']);

    return {
      productType: type,
      parts: updatedParts
    };
  }),

  setPartPrice: (part: ChainPart, price: number) => set((state) => ({
    parts: {
      ...state.parts,
      [part]: {
        ...state.parts[part],
        price
      }
    }
  })),

  setProductData: (data) => set((state) => {
    const updatedParts = { ...state.parts };

    if (data.jewelry_parts) {
      const mapping = {
        leftChain: data.jewelry_parts.leftChain,
        rightChain: data.jewelry_parts.rightChain,
        additionalChain: data.jewelry_parts.additionalChain,
        topLock: data.jewelry_parts.topLock,
        bottomLock: data.jewelry_parts.bottomLock
      };

      Object.entries(mapping).forEach(([key, value]) => {
        if (value && updatedParts[key as ChainPart]) {
          const modelNumber = parseInt(value.model.replace('Model-', '')) - 1;
          updatedParts[key as ChainPart] = {
            ...updatedParts[key as ChainPart],
            label: value.label,
            selectedModel: modelNumber,
            plating: value.plating as Metal
          };
        }
      });
    }

    if (Array.isArray(data.default_attributes)) {
      data.default_attributes.forEach((attr) => {
        const partKey = mapAttributeToChainPart(attr.name);
        if (partKey && updatedParts[partKey]) {
          updatedParts[partKey].selectedModel = getModelNumber(attr.option);
        }
      });
    }

    const productType = data.name.toLowerCase().includes('necklace') ? 'necklace' : 'bracelet';
    const initialTotalPrice = Object.entries(updatedParts).reduce((total, [partKey, partData]) => {
      return total + getPartPrice(productType, partKey as ChainPart, partData.selectedModel);
    }, 0);

    return {
      productData: {
        ...data,
        productType,
      },
      productType,
      parts: updatedParts,
      totalPrice: initialTotalPrice
    };
  }),

  setJewelryData: () => {},

  setSelectedPart: (part) => set({ selectedPart: part }),

  setPartPlating: (part, plating) => set((state) => ({
    parts: {
      ...state.parts,
      [part]: {
        ...state.parts[part],
        plating
      }
    }
  })),

  setPartModel: (part, modelIndex) => set((state) => {
    const updatedParts = {
      ...state.parts,
      [part]: {
        ...state.parts[part],
        selectedModel: modelIndex,
      }
    };

    const newTotalPrice = Object.entries(updatedParts).reduce((total, [partKey, partData]) => {
      const price = getPartPrice(state.productType, partKey as ChainPart, partData.selectedModel);
      return total + price;
    }, 0);

    return {
      parts: updatedParts,
      totalPrice: newTotalPrice
    };
  }),

  calculateTotalPrice: () => {
    const state = get();
    return Object.entries(state.parts).reduce((total, [partKey, part]) => {
      const price = getPartPrice(state.productType, partKey as ChainPart, part.selectedModel);
      return total + price;
    }, 0);
  },

  getSelectedItemCodes: () => {
    const state = get();
    return Object.entries(state.parts).reduce((codes, [partKey, part]) => {
      codes[partKey as ChainPart] = getItemCode(
        state.productType,
        partKey as ChainPart,
        part.selectedModel,
        part.plating
      );
      return codes;
    }, {} as Record<ChainPart, string>);
  },

  logState: () => {
    const state = get();
    console.log('Current state:', JSON.stringify(state, null, 2));
  },
}));

export default useProductStore;