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
  console.log('PARSEFEATURES', features1, features2);
  for (let feature of features1) {
    console.log('FEATURE: ', feature);
    const parsedFeature = results[feature.feature] || {};

    results[feature.feature] = Object.assign(parsedFeature, { product1: feature.value });
  }
  for (let feature of features2) {
    const parsedFeature = results[feature.feature] || {};

    results[feature.feature] = Object.assign(parsedFeature, { product2: feature.value });
  }

  return results;
}

function productsChanged(featureData, prod1, prod2) {
  if (!prod1.id || !prod2.id) { return false; }
  if (!featureData._id) { return true; }
  const changed = prod1.id !== featureData._id.prod1 || prod2.id !== featureData._id.prod2;
  console.log('MODAL: PRODUCT CHANGED: ', changed);
  return prod1.id !== featureData._id.prod1 || prod2.id !== featureData._id.prod2;
}

function isChildOfProductCard(node) {
  const targetName = 'div.'
  for (let element of node.path) {
    if (element.localName === 'div') {
      if (element.classList.contains('card')) {
        return true;
      }
    }
  }
  return false;
}

export default function FeatureModal({ product1, product2 }) {
  const [featureData, setFeatureData] = useState({});
  const [isHidden, setIsHidden] = useState(false);
  const modalRef = useRef();

  const clickedOutside = (e) => {
    console.log('HANDLE CLICK', e);
    console.log('CHECK REF', modalRef);
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsHidden(true);
    }
  };

  const handleClick = (e) => {
    console.log('---> handleClick', isChildOfProductCard(e));
    if (isHidden && isChildOfProductCard(e)) {
      setIsHidden(false);
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

  if (productsChanged(featureData, product1, product2)) {
    setFeatureData(parseFeatures(product1, product2));
    console.log('PARSED FEATURES: ', featureData);
    return null;
  }

  const features = Object.keys(featureData);
  console.log('GOT FEATURES', features);
  const tableClass = 'modal ' + (isHidden ? 'display-none' : 'display-initial');

  return <table className={tableClass}>
    <thead>
      <tr><th colSpan="2" className="table-head column-left">{product1.name}</th><th colSpan="2" className="table-head column-right">{product2.name}</th></tr>
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
  </table>
};