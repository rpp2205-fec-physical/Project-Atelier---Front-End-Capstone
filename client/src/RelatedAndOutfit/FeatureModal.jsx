import React, { useState, useEffect } from 'react';

function parseFeatures(prod1, prod2) {
  // compare features of both products and return an object with combined features
  const features1 = prod1.features;
  const features2 = prod2.features;
  const results = { _id: {
    prod1: prod1.id,
    prod2: prod2.id
  }};

  for (feature of features1) {
    const parsedFeature = results[feature.feature] || {};

    results[feature.feature] = Object.assign(parsedFeature, {product1: feature.value});
  }
  for (feature of features2) {
    const parsedFeature = results[feature.feature] || {};

    results[feature.feature] = Object.assign(parsedFeature, {product2: feature.value});
  }

  return results;
}

function productsChanged(featureData, prod1, prod2) {
  return prod1.id !== featureData._id.prod1 || prod2.id !== featureData._id.prod2;
}

export default function FeatureModal({handleClose, show, product1, product2}) {
  const [featureData, setFeatureData] = useState({});

  useEffect(() => {
    if (featureData._id && productsChanged(featureData, product1, product2)) {
      setFeatureData(parseFeatures(product1, product2));
      console.log('PARSED FEATURES: ', featuresData);
    }
  });

  const showHideClassName = show ? "modal display-block" : "modal display-none";
  console.log('RelatedAndOutfit: SHOWING MODAL', product1, product2);
  const features = Object.keys(featureData);


  return <table className={showHideClassName}>
    <thead>
      <tr><td colSpan={2}>{product1.name}</td><td colSpan={2}>{product2.name}</td></tr>
    </thead>
    <tbody>
      {features.map((feature, i) => {
        <tr key={i}><td>{featuresData[feature].product1}</td><td colSpan={2}>{feature}</td><td>{featuresData[feature].product2}</td></tr>
      })}
    </tbody>
  </table>
};