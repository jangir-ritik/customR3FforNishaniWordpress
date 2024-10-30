export type Metal = 'gold' | 'silver';
export type ChainPart = 'leftChain' | 'rightChain' | 'topLock' | 'bottomLock' | 'additionalChain';
export type ProductType = 'necklace' | 'bracelet';

// New interfaces for variant structure
export interface Variant {
  url: string;
  'item-code': string;
}

export interface Variants {
  gold: Variant;
  silver: Variant;
}

export interface ImageData {
  plating: Metal;
  url: string;
}

// Updated Product interface
export interface Product {
  id: string;
  name: string;
  price: number;
  variants: Variants;
  images: ImageData[];
}

export interface Categories {
  necklaces: Product[];
  bracelets: Product[];
  hooks: Product[];
}

export interface Metadata {
  lastUpdated: string;
  currency: string;
  priceUnit?: string;
}

export interface ProductArrayData {
  categories: Categories;
  metadata: Metadata;
}

export interface Component {
  type: string;
  model: string;
  price: number | null;
  plating: Metal;
}

export interface ProductWithComponents {
  id: string;
  name: string;
  components: {
    chainRight: Component;
    chainLeft: Component;
    additionalChain?: Component;
    bottomLock: Component;
    topLock: Component;
  };
}

export interface ProductPresets {
  necklaces: Record<string, ProductWithComponents>;
  bracelets: Record<string, ProductWithComponents>;
}

export interface ModelCountGetterParams {
  productType: ProductType;
  partType: ChainPart;
}

export interface JewelryPartData {
  leftChain: {
    label: string;
    model: string;
    price: number;
    plating: Metal;
  };
  rightChain: {
    label: string;
    model: string;
    price: number;
    plating: Metal;
  };
  additionalChain: {
    label: string;
    model: string;
    price: number;
    plating: Metal;
  };
  lockBottom: {
    label: string;
    model: string;
    price: number;
    plating: Metal;
  };
  lockTop: {
    label: string;
    model: string;
    price: number;
    plating: Metal;
  };
}

export interface ChainPartState {
  readonly modelCount: number;
  readonly prices: number[];
  plating: Metal;
  label: string;
  selectedModel: number;
}

export interface ProductData {
  id: string;
  name: string;
  description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  image_url: string;
  attributes: Record<string, any>;
  variations: any[];
  default_attributes: Array<{
    name: string;
    option: string;
  }>;
  jewellery_part?: {
    value: string;
  };
  jewelry_parts?: Record<ChainPart, {
    label: string;
    model: string;
    price: number;
    plating: Metal;
  }>;
  productType: 'necklace' | 'bracelet';
}

export interface ProductStore {
  productData: ProductData;
  jewelryData: JewelryPartData | null;
  selectedPart: ChainPart;
  parts: Record<ChainPart, ChainPartState>;
  setProductData: (data: ProductData) => void;
  setJewelryData: (dataString: string) => void;
  setSelectedPart: (part: ChainPart) => void;
  setPartModel: (part: ChainPart, modelIndex: number) => void;
  calculateTotalPrice: () => number;
  totalPrice: number;
  productType: 'necklace' | 'bracelet';
  setProductType: (type: 'necklace' | 'bracelet') => void;
  setPartPrice: (part: ChainPart, price: number) => void;
  setPartPlating: (part: ChainPart, plating: Metal) => void;
  logState: () => void;
}

export interface PartData {
  plating: Metal;
  label: string;
  selectedModel: number;
  modelCount: number;
  prices: number[];
}

export interface ProductState {
  productType: ProductType;
  selectedPart: ChainPart;
  parts: Record<ChainPart, PartData>;
  totalPrice: number;
  productData: ProductData | null;
}

export type CreateProductStore = (
  set: (
    partial: ProductStore | Partial<ProductStore> | ((state: ProductStore) => ProductStore | Partial<ProductStore>),
    replace?: boolean
  ) => void,
  get: () => ProductStore
) => ProductStore;