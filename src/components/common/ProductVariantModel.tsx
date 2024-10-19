// import React from 'react'
// import Image from 'next/image'
// import useProductStore from '@/app/store/store'

// function ProductVariantModel() {
//     const selectedChainPart = useProductStore(state => state.selectedChainPart)
//     const selectedChainPartModel = useProductStore(state => state.selectedChainPartModel)
//     const setSelectedChainPartModel = useProductStore(state => state.setSelectedChainPartModel)
//     const chainPartModels = useProductStore(state => state.chainPartModels)
//     const chainParts = useProductStore(state => state.chainParts)

//     const handleChainPartModelClick = (index: number) => {
//         setSelectedChainPartModel(index === selectedChainPartModel ? null : index)
//     }

//     return (
//         <div className="product-variant-model-container">
//             {chainParts[selectedChainPart]?.label === 'Left Chain' && (
//                 <div className="product-variant-model-left-chain">
//                     {chainPartModels.map((model, index) => (
//                         <div 
//                             key={index} 
//                             className={`left-chain-model ${selectedChainPartModel === index ? 'selected' : 'default'}`}
//                             onClick={() => handleChainPartModelClick(index)}
//                         >
//                             <Image src={model} alt={`left-chain-model-${index + 1}`} width={100} height={100} />
//                         </div>
//                     ))}
//                 </div>
//             )}
//             {chainParts[selectedChainPart]?.label === 'Front Lock' && (
//                 <p>This is the front lock of the product.</p>
//             )}
//             {/* Add more conditions for other chain types */}
//         </div>
//     )
// }

// export default ProductVariantModel

import React from 'react'

function ProductVariantModel() {
  return (
    <div>ProductVariantModel</div>
  )
}

export default ProductVariantModel