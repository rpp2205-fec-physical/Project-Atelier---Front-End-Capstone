
function parseFeatures(prod1, prod2) {
  // compare features of both products and return an object with combined features
  const features1 = prod1.features;
  const features2 = prod2.features;
  const results = {};

  for (feature in features1) {
    const parsedFeature = results[feature.feature] || {};

    results[feature.feature] = Object.assign(parsedFeature, {product1: feature.value});
  }
  for (feature in features2) {
    const parsedFeature = results[feature.feature] || {};

    results[feature.feature] = Object.assign(parsedFeature, {product2: feature.value});
  }

  return results;
}

export default function FeatureModal = ({handleClose, show, product1, product2}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const featuresData = parseFeatures(product1, product2);
  const features = Object.keys(featuresData);


  return <table className={showHideClassName}>
    <thead>
      <tr><td colSpan={2}>{product1.name</td><td colSpan={2}>{product2.name}</td></tr>
    </thead>
    <tbody>
      {features.map((feature, i) => {
        <tr key={i}><td>{featuresData[feature].product1}</td><td colSpan{2}>{feature}</td><td>{featuresData[feature].product2}</td></tr>
      })}
    </tbody>
  </table>
};