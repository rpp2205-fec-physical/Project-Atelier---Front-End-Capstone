import React from 'react';
const outfit = require('./outfit.js');

const addToOutfitIconSrc = '../../assets/person-circle-plus-solid.svg';
const removeFromOutfitIconSrc = '../../assets/person-circle-xmark-solid.svg';

/******OutfitToggle******
 * a component that shows one icon when the item is in the 'outfit' array
 * and shows a different icon when the product is not in the outfit array
 * required props:
 * - productId of product within context
 *
 * optional props:
 * - height: css string
*/

export default function OutfitToggle({ productId, height }) {
  if (!productId) { return null; }
  const handleClick = (action) => {
    if (action === 'add' || action === 'remove') {
      return () => { outfit[action](productId); };
    }
  };
  const inOutfit = outfit.includes(productId);

  return <>
    <img src={inOutfit ? removeFromOutfitIconSrc : addToOutfitIconSrc} onClick={handleClick(inOutfit ? 'remove' : 'add')} height={height || '18px'} />
  </>
}