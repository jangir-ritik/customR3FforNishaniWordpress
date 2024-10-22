export type Metal = 'gold' | 'silver';
export type ChainPart = 'leftChain' | 'rightChain' | 'topLock' | 'bottomLock' | 'additionalChain';

export interface Component {
    type: string;
    model: string;
    price: number | null;
}

export interface Product {
    id: string;
    name: string;
    price: number;
}

export interface Categories {
    necklaces: Product[];
    bracelets: Product[];
    hooks: Product[];
}

export interface Metadata {
    lastUpdated: string;
    currency: string;
    priceUnit: string;
}

export interface ProductArrayData {
    categories: Categories;
    metadata: Metadata;
}

export interface Product {
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
    necklaces: Record<string, Product>;
    bracelets: Record<string, Product>;
}

export interface Metadata {
    lastUpdated: string;
    currency: string;
    documentId: string;
    collection: string;
}

export interface ProductPresetsData {
    presetProducts: ProductPresets;
    metadata: Metadata;
}

export interface JewelryPartData {
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

export interface ChainPartState {
    metal: Metal;
    label: string;
    selectedModel: number;
    modelCount: number;
    prices: number[];
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

export interface ProductStore {
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
    totalPrice: number;
}
