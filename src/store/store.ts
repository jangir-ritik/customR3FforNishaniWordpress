import { create } from 'zustand';
import { ChainPart, JewelryPartData, ProductStore, Metal, ProductData } from '../types/type';
import options from "../../public/product_array.json";

// export const parseJewelryData = (dataString: string): JewelryPartData => {
//   // Remove brackets and split by comma
//   const cleanString = dataString.replace(/^\[|\]$/g, '').trim();
//   const pairs = cleanString.split(',').map(pair => pair.trim());

//   const data: Record<string, any> = {};

//   pairs.forEach(pair => {
//     const [key, value] = pair.split(':').map(item => item.trim());
//     // Remove quotes and clean the value
//     data[key] = value.replace(/"/g, '').trim();
//   });

//   return {
//     leftChain: {
//       label: data.leftChainLabel,
//       model: data.leftChainModel,
//       price: Number(data.leftChainPrice),
//       plating: data.leftChainPlating

//     },
//     rightChain: {
//       label: data.rightChainLabel,
//       model: data.rightChainModel,
//       price: Number(data.rightChainPrice),
//       plating: data.rightChainPlating
//     },
//     additionalChain: {
//       label: data.additionalChainLabel,
//       model: data.additionalChainModel,
//       price: Number(data.additionalChainPrice),
//       plating: data.additionalChainPlating
//     },
//     lockBottom: {
//       label: data.lockBottomLabel,
//       model: data.lockBottomModel,
//       price: Number(data.lockBottomPrice),
//       plating: data.lockBottomPlating
//     },
//     lockTop: {
//       label: data.lockTopLabel,
//       model: data.lockTopModel,
//       price: Number(data.lockTopPrice),
//       plating: data.lockTopPlating
//     }
//   };
// };

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
  return match ? parseInt(match[1], 10) - 1 : 0; // Subtract 1 since our models are 0-based
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

const useProductStore = create<ProductStore>((set, get) => ({
  productData: null,
  jewelryData: null,
  selectedPart: 'leftChain',
  productType: 'bracelet',
  parts: {
    leftChain: {
      plating: 'gold',
      label: 'Left Chain',
      selectedModel: 0,
      // Use a function to get model count that depends on product type
      get modelCount() {
        return getModelCount(get().productType, 'leftChain');
      },
      get prices() {
        return getModelPrices(get().productType, 'leftChain');
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
      }
    }
  },
  totalPrice: 0,

  setProductType: (type) => set((state) => {
    // When product type changes, we need to reset selected models
    // to prevent out-of-bounds indices
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

    // Update parts based on the jewelry_parts data
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
            plating: value.plating as Metal,
            prices: Array(updatedParts[key as ChainPart].modelCount).fill(value.price)
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

    // Determine product type from the name or set a default
    const productType = data.name.toLowerCase().includes('necklace') ? 'necklace' : 'bracelet';

    const initialTotalPrice = Object.values(updatedParts).reduce((total, partData) => {
      return total + (partData.prices[partData.selectedModel] || 0);
    }, 0);

    const updatedState = {
      productData: {
        ...data,
        productType,
      },
      parts: updatedParts,
      totalPrice: initialTotalPrice
    };

    return updatedState;
  }),
  // setJewelryData: (dataString) => set((state) => {
  //   const jewelryData = parseJewelryData(dataString);
  //   const updatedParts = { ...state.parts };

  //   // Map the parsed jewelry data to the parts state
  //   const mappings = {
  //     leftChain: jewelryData.leftChain,
  //     rightChain: jewelryData.rightChain,
  //     additionalChain: jewelryData.additionalChain,
  //     bottomLock: jewelryData.lockBottom,
  //     topLock: jewelryData.lockTop
  //   };

  //   // Update each part with the corresponding jewelry data
  //   Object.entries(mappings).forEach(([partKey, jewelryPart]) => {
  //     const key = partKey as ChainPart;
  //     if (updatedParts[key] && jewelryPart) {
  //       updatedParts[key] = {
  //         ...updatedParts[key],
  //         label: jewelryPart.label,
  //         selectedModel: parseInt(jewelryPart.model.replace('Model-', '')) - 1,
  //         prices: Array(updatedParts[key].modelCount).fill(jewelryPart.price)
  //       };
  //     }
  //   });

  //   return {
  //     jewelryData,
  //     parts: updatedParts
  //   };
  // }),
  setSelectedPart: (part) => set({ selectedPart: part }),
  setJewelryData: () => {},
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
    // Get the new price for the selected model
    const prices = getModelPrices(state.productType, part);
    const newPrice = prices[modelIndex] || 0;
    
    // Update the part with new model and keep the entire prices array
    const updatedParts = {
      ...state.parts,
      [part]: {
        ...state.parts[part],
        selectedModel: modelIndex,
        prices: prices // Keep the entire prices array
      }
    };

    // Calculate new total price
    const newTotalPrice = Object.values(updatedParts).reduce((total, partData) => {
      return total + (partData.prices[partData.selectedModel] || 0);
    }, 0);

    // Return updated state
    return {
      parts: updatedParts,
      totalPrice: newTotalPrice
    };
  }),

  calculateTotalPrice: () => {
    const state = get();
    return Object.entries(state.parts).reduce((total, [_, part]) => {
      const price = part.prices[part.selectedModel] || 0;
      if (isNaN(price)) {
        console.warn(`Invalid price for part:`, part);
        return total;
      }
      return total + price;
    }, 0);
  },

}));

export default useProductStore;
