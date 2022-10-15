import React, { useState, useEffect } from 'react';
import './FeatureModal.css';

function parseFeatures(prod1, prod2) {
  // compare features of both products and return an object with combined features
  const features1 = prod1.features;
  const features2 = prod2.features;
  const results = {
    _id: {
      prod1: prod1.id,
      prod2: prod2.id
    }
  };
console.log('PARSING FEATURES: ', features1, features2);
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
  if (!featureData._id) { return true; }
  const changed = prod1.id !== featureData._id.prod1 || prod2.id !== featureData._id.prod2;
  console.log('MODAL: PRODUCT CHANGED: ', changed);
  return prod1.id !== featureData._id.prod1 || prod2.id !== featureData._id.prod2;
}

export default function FeatureModal({ handleClose, show, product1, product2 }) {
  const [featureData, setFeatureData] = useState({});

  if (productsChanged(featureData, product1, product2)) {
    setFeatureData(parseFeatures(product1, product2));
    console.log('PARSED FEATURES: ', featureData);
  }

  const showHideClassName = show ? "modal display-block" : "modal display-none";
  console.log('RelatedAndOutfit: SHOWING MODAL', featureData);
  const features = Object.keys(featureData);
  console.log('KEYS: ', features);


  return <table className='modal'>
    <thead>
      <tr><th colSpan="2" className="table-head column-left">{product1.name}</th><th colSpan="2" className="table-head column-right">{product2.name}</th></tr>
    </thead>
    <tbody>
      {features.map((feature, i) => {
        if (feature === '_id') {
          return null;
        } else {
          return <tr key={i}><td className="column-left">{featureData[feature].product1 || '--'}</td><td colSpan="2" className="column-center">{feature}</td><td className="column-right">{featureData[feature].product2 || '--'}</td></tr>
        }
      })
      }
    </tbody>
  </table>
};