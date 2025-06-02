import React, { useEffect, useCallback } from "react";
import ProductHeader from "./components/common/ProductHeader";
import ProductDescription from "./components/common/ProductDescription";
import ChainCustomizer from "./components/common/ChainCustomizer";
import StyleSelector from "./components/common/StyleSelector";
import MetalSelector from "./components/common/MetalSelector";
import ProductDetails from "./components/common/ProductDetails";
import PriceDisplay from "./components/common/PriceDisplay";
import AddToCartButton from "./components/common/AddToCartButton";
import useProductStore from "./store/store";
import ProductView from "./components/common/ProductView";
import ProductImages from "./components/common/ProductImages";

const App = () => {
  console.log("loading successful");
  const setProductData = useProductStore((state) => state.setProductData);
  const setProductType = useProductStore((state) => state.setProductType);
  const productType = useProductStore((state) => state.productType);
  const totalPrice = useProductStore((state) => state.totalPrice);

  // const productData = useProductStore(state => state.productData);
  const productData = {
    id: "5427",
    name: "Custom Bracelet",
    description:
      "Craft your unique style with our custom bracelets and necklaces, designed to reflect your personal touch. Choose from a selection of elegant chains and signature locks, mix and match to create jewelry as unique as you. Make your mark with timeless pieces tailored just for you!\r\n\r\n<strong>Material : </strong>Sterling Silver 925\r\n<strong>Plating : </strong>Rhodium and Yellow Gold\r\n<strong>Size : </strong>7.5 inch\r\n<strong>AntiTarnish</strong>\r\n\r\n*Please note that slight color variations may occur due to photoshoot conditions and studio lighting settings.",
    price: "8200",
    regular_price: "8200",
    sale_price: "",
    image_url: "https://shop.nishanistudio.com/wp-content/uploads/428130.png",
    gallery_images: [
      {
        id: "4807",
        url: "https://shop.nishanistudio.com/wp-content/uploads/428130.png",
        alt: "",
        caption: "",
      },
      {
        id: 4808,
        url: "https://shop.nishanistudio.com/wp-content/uploads/428142.png",
        alt: "",
        caption: "",
      },
      {
        id: 8380,
        url: "https://shop.nishanistudio.com/wp-content/uploads/nishani-studio-page-banner-V6-scaled.jpg",
        alt: "",
        caption: "",
      },
    ],
    attributes: [],
    variations: [],
    jewelry_parts: {
      leftChain: {
        label: "Box Chain",
        model: "Model-1",
        price: 2200,
        plating: "gold",
      },
      rightChain: {
        label: "Box Chain",
        model: "Model-1",
        price: 2200,
        plating: "gold",
      },
      additionalChain: {
        label: "null",
        model: "null",
        price: 0,
        plating: "null",
      },
      bottomLock: {
        label: "Signature Lock",
        model: "Model-1",
        price: 1900,
        plating: "gold",
      },
      topLock: {
        label: "Signature Lock",
        model: "Model-1",
        price: 1900,
        plating: "gold",
      },
    },
  };

  useEffect(() => {
    try {
      // Find the main element with cms-main class
      const mainElement = document.getElementById("cms-main");
      const headerElement = document.getElementById("cms-header");

      if (mainElement) {
        // Remove the cms-main class
        mainElement.classList.remove("cms-main");

        // Optional: Log success for debugging
        console.log("Successfully removed cms-main class");
      } else {
        console.warn("Main element with cms-main class not found");
      }

      if (headerElement) {
        headerElement.classList.remove("header-shadow");
        headerElement.classList.add("custom-bottom-border");
        console.log("Successfully removed header-shadow class");
      } else {
        console.warn("Header element with header-shadow class not found");
      }
    } catch (error) {
      // Log any errors that occur during the process
      console.error("Error removing cms-main class:", error);
    }

    // Cleanup function (optional)
    return () => {
      try {
        const mainElement = document.getElementById("cms-main");
        if (mainElement && !mainElement.classList.contains("cms-main")) {
          mainElement.classList.add("cms-main");
        }
        const headerElement = document.getElementById("cms-header");
        if (
          headerElement &&
          headerElement.classList.contains("custom-bottom-border")
        ) {
          headerElement.classList.add("header-shadow");
          headerElement.classList.remove("custom-bottom-border");
        }
      } catch (error) {
        console.error("Error in cleanup:", error);
      }
    };
  }, []);

  useEffect(() => {
    if (window.productData) {
      // if (productData) {
      // console.log('Product data from WordPress:', window.productData);
      console.log("Product data from WordPress:", productData);
      setProductData(window.productData);
      // setProductData(productData);
    } else {
      console.error("No product data found.");
    }
  }, [setProductData]);

  const handleProductTypeChange = useCallback(() => {
    setProductType(productType === "necklace" ? "bracelet" : "necklace");
  }, [productType, setProductType]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tdt-product-customization-page">
      {/* <button
        style={{ position: 'absolute', top: '140px', left: 0, padding: 10 }}
        onClick={handleProductTypeChange}
      >
        {productType === 'necklace' ? 'Necklace' : 'Bracelet'}
      </button> */}

      <div className="tdt-product-customization-left-section">
        <div className="tdt-product-3d-view">
          <ProductView productType={productType} />
        </div>
        {/* in mobile, the chain customizer needs to be here */}
        <ChainCustomizer />
        <div className="tdt-product-style-metal-wrapper">
          <StyleSelector />
          <MetalSelector />
        </div>
        {/* <ProductImages gallery_images={productData.gallery_images} /> */}
        <ProductDetails />
      </div>

      <div className="tdt-product-customization-right-section">
        <ProductHeader />
        <ProductDescription />
        {/* in desktop, the chain customizer needs to be here */}
        <ChainCustomizer />
        <div className="tdt-product-style-metal-wrapper">
          <StyleSelector />
          <MetalSelector />
        </div>
        <hr className="tdt-product-details-divider hide-on-mobile" />
        <ProductDetails />
        <hr className="tdt-product-details-divider hide-on-mobile" />
        <div className="tdt-product-price-cart-wrapper">
          <PriceDisplay key={totalPrice} />
          <AddToCartButton />
        </div>
      </div>
    </div>
  );
};

export default App;
