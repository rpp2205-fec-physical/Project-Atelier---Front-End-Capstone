import React, { useState, useContext } from 'react';
import { outfit } from '../lib/outfit';
import { TriggerOutfitLoadContext } from '../contexts/TriggerOutfitLoad';
import postInteraction from '../lib/post-interaction';

const addToOutfitIconSrc = '../../assets/person-circle-plus-solid.svg';
//const removeFromOutfitIconSrc = '../../assets/person-circle-xmark-solid.svg';
const removeFromOutfitIconSrc = '../../assets/circle-xmark-solid.svg';

/******OutfitToggle******
 * a component that shows one icon when the item is in the 'outfit' array
 * and shows a different icon when the product is not in the outfit array
 * required props:
 * - productId of product within context
 *
 * optional props:
 * - height: css string
 * - customClassName: defaults to "outfit-toggle"
*/

const isInOutfit = (id) => {
  return outfit.includes(id);
}

export default function OutfitToggle({ productId, height, customClassName }) {
  if (!productId) { return null; }
  const triggerOutfitLoad = useContext(TriggerOutfitLoadContext);
  const inOutfit = isInOutfit(productId);
  const [src, setSrc] = useState(inOutfit ? removeFromOutfitIconSrc : addToOutfitIconSrc);
  const handleClick = (action) => {
    return () => {
      // console.log('CLICKED OUTFIT TOGGLE!');
      const selector = `.${customClassName || "outfit-toggle"}[dataId="${productId}"]`;
      postInteraction(selector, document.querySelector(selector).parentNode.classList[0]);

      const newOutfit = outfit[action](productId);
      triggerOutfitLoad({
        outfit: newOutfit
      }, () => setSrc(action === 'add' ? removeFromOutfitIconSrc : addToOutfitIconSrc));
    };
  };

  const icon = React.createElement("img", {
    className: customClassName || "outfit-toggle",
    dataId: productId,
    alt: "Add or remove this item from your outfit",
    src: src,
    onClick: handleClick(inOutfit ? "remove" : "add"),
    height: height || "20px"
  });

  return icon;
}