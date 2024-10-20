import React from 'react';
import useProductStore from '../../store/store';

function ProductVariantLabel() {
  const { selectedPart, parts, setSelectedPart } = useProductStore();
 
  const partOptions: Array<{ key: keyof typeof parts; label: string }> = [
    { key: 'leftChain', label: 'Left Chain' },
    { key: 'rightChain', label: 'Right Chain' },
    { key: 'topLock', label: 'Front Lock' },
    { key: 'bottomLock', label: 'Back Lock' }
  ];

  return (
    <div className='tdt-product-variant-label'>
      {partOptions.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setSelectedPart(key)}
          className={`tdt-variant-button ${selectedPart === key ? 'tdt-selected' : ''}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default ProductVariantLabel;