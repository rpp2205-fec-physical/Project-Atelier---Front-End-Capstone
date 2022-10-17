import React, { useState, useEffect, useRef } from 'react';
import './FeatureModal.css';

function parseFeatures(prod1, prod2) {
  // compare features of both products and return an object with combined features
  const features1 = prod1.features;
  const features2 = prod2.features;
  if (!features1 || !features2) { return {}; }
  const results = {
    _id: {
      prod1: prod1.id,
      prod2: prod2.id
    }
  };
  //console.log('PARSING FEATURES: ', features1, features2);
  for (let feature of features1) {
    const parsedFeature = results[feature.feature] || {};

    results[feature.feature] = Object.assign(parsedFeature, { product1: feature.value });
  }
  for (let feature of features2) {
    const parsedFeature = results[feature.feature] || {};

    results[feature.feature] = Object.assign(parsedFeature, { product2: feature.value });
  }

  return results;
}

function productsChanged(featureData, prod1 = {}, prod2 = {}) {
  if (!prod1.id || !prod2.id) { return false; }
  if (!featureData._id) { return true; }

  return prod1.id !== featureData._id.prod1 || prod2.id !== featureData._id.prod2;
}

function isChild(node, targetTag, targetClass) {
  const parent = node.parentNode || node.srcElement || node.target;
  if (!parent) {
    //console.log('isChild: NO PARENT FOUND', node);
    return false;
  }
  const parentTag = parent.tagName && parent.tagName.toUpperCase();
  //console.log('isChild: SEARCHING PARENT', parentTag, parent.classList);
  if (!parentTag || parentTag === 'HTML') { return false; }
  if (parentTag === targetTag.toUpperCase() && parent.classList.contains(targetClass)) {
    return parent;
  } else {
    return isChild(parent, targetTag, targetClass);
  }
}

function getProductCardElement(e) {
  const targetTag = 'div';
  const targetClass = 'card';
  //console.log('ELEMENT', e);
  if (e.path) {
    for (let element of e.path) {
      if (element.localName == targetTag) {
        if (element.classList.contains(targetClass)) {
          return element;
        }
      }
    }
    return false;
  } else {
    return isChild(e, targetTag, targetClass);
  }
}

function placeModal(cardNode, setPosition) {
  const top = Math.floor(cardNode.offsetTop + (2 * (cardNode.offsetHeight / 3))) - 10;
  const left = Math.floor(cardNode.offsetLeft);

  setPosition({top, left});
}

export default function FeatureModal({ product1, get }) {
  const [productToCompare, setProductToCompare] = useState(null);
  const [featureData, setFeatureData] = useState({});
  const [isHidden, setIsHidden] = useState(true);
  const [position, setPosition] = useState({top: '200px', left: '200px'});
  const modalRef = useRef();
  const clickedOutside = (e) => {
    //console.log('HANDLE CLICK', e);
    //console.log('CHECK REF', modalRef);
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsHidden(true);
    }
  };
  const handleClick = (e) => {
    const cardElement = getProductCardElement(e);
    //console.log('---> handleClick', cardElement);
    if (cardElement) {
      //console.log('FOUND CARD ELEMENT', {cardElement})
      const productId = cardElement.getAttribute('data-id');

      get('/products/'.concat(productId))
        .then((data) => {
          placeModal(cardElement, setPosition);
          setProductToCompare(data);
          setIsHidden(false);
        });
    } else if (!isHidden && clickedOutside(e)) {
      setIsHidden(true);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  if (productToCompare === null || isHidden) { return null; }
  if (productsChanged(featureData, product1, productToCompare)) {
    setFeatureData(parseFeatures(product1, productToCompare));
    //console.log('PARSED FEATURES: ', featureData);
    return null;
  }

  const features = Object.keys(featureData);
  //console.log('GOT FEATURES', features);
  const tableClass = 'modal-table ' + (isHidden ? 'display-none' : 'display-table');
  const styles = {
    position: 'fixed',
    top: position.top.toString().concat('px'),
    left: position.left.toString().concat('px'),
    opacity: '85%',
    backgroundColor: 'lightgrey',
    width: 'auto',
    minWidth: '320px'
  }

  return <div className="modal" style={styles} ref={modalRef}><table className={tableClass}>
    <thead>
      <tr><th colSpan="2" className="table-head column-left">{product1.name}</th><th colSpan="2" className="table-head column-right">{productToCompare.name}</th></tr>
    </thead>
    <tbody>
      {features.map((feature, i) => {
        if (feature !== '_id') {
          return <tr key={i}><td className="column-left">{featureData[feature].product1 || '--'}</td><td colSpan="2" className="column-center">{feature}</td><td className="column-right">{featureData[feature].product2 || '--'}</td></tr>
        } else {
          return null;
        }
      })}
    </tbody>
  </table></div>
};