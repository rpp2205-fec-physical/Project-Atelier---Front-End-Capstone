import React, { useState, useContext } from 'react';
import { outfit } from '../lib/outfit';
import { TriggerOutfitLoadContext } from '../contexts/TriggerOutfitLoad';

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

const isInOutfit = (id) => {
  return outfit.includes(id);
}

export default function OutfitToggle({ productId, height }) {
  if (!productId) { return null; }
  const triggerOutfitLoad = useContext(TriggerOutfitLoadContext);
  const inOutfit = isInOutfit(productId);
  const [src, setSrc] = useState(inOutfit ? removeFromOutfitIconSrc : addToOutfitIconSrc);
  const handleClick = (action) => {
    return () => {
      // console.log('CLICKED OUTFIT TOGGLE!');
      const newOutfit = outfit[action](productId);
      console.log('Going to Trigger Outfit now', newOutfit);
      triggerOutfitLoad({
        outfit: newOutfit
      }, () => setSrc(action === 'add' ? removeFromOutfitIconSrc : addToOutfitIconSrc));
    };
  };

  const icon = React.createElement("img", {
    className: "outfit-toggle",
    alt: "Add or remove this item from your outfit",
    src: src,
    onClick: handleClick(inOutfit ? "remove" : "add"),
    height: height || "20px"
  });

  return icon;
}