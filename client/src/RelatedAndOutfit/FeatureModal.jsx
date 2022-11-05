import React, { useState, useEffect, useRef } from "react";
import "./FeatureModal.css";
import postInteraction from '../lib/post-interaction';

function parseFeatures(prod1, prod2) {
  /* to compare features of both products and return an object with combined features */
  const features1 = prod1.features;
  const features2 = prod2.features;
  if (!features1 || !features2) {
    return {};
  }
  const results = {
    _id: {
      prod1: prod1.id,
      prod2: prod2.id,
    },
  };

  for (let prod of features1) {
    results[prod.feature] = {
      product1: prod.value,
      classLeft: 'column-left',
      classMiddle: 'column-middle',
      classRight: 'column-right',
    };
  }
  for (let prod of features2) {
    const parsedFeature = results[prod.feature] || {};
    let className = '';
    if (parsedFeature.product1 && prod.value) {
      if (parsedFeature.product1 === prod.value) {
        className = 'feature-match';
      } else {
        className = 'feature-diff';
      }
    }
    results[prod.feature] = Object.assign(parsedFeature, {
      product2: prod.value,
      classLeft: 'column-left '.concat(className),
      classMiddle: 'column-middle '.concat(className),
      classRight: 'column-right '.concat(className),
    });
    console.log('PARSING FEATURE', results[prod.feature]);
  }

  return results;
}

function productsChanged(featureData, prod1 = {}, prod2 = {}) {
  if (!prod1.id || !prod2.id) {
    return false;
  }
  if (!featureData._id) {
    return true;
  }

  return (
    prod1.id !== featureData._id.prod1 || prod2.id !== featureData._id.prod2
  );
}

function isChild(node, targetTag, targetClass) {
  const parent = node.parentNode || node.srcElement || node.target;
  if (!parent) {
    return false;
  }
  const parentTag = parent.tagName && parent.tagName.toUpperCase();
  //console.log('isChild: SEARCHING PARENT', parentTag, parent.classList);
  if (!parentTag || parentTag === "HTML") {
    return false;
  }
  if (
    parentTag === targetTag.toUpperCase() &&
    parent.classList.contains(targetClass)
  ) {
    return parent;
  } else {
    return isChild(parent, targetTag, targetClass);
  }
}

function getProductCardElement(e) {
  const targetTag = "div";
  const targetClass = "card";
  const ignoreClasses = ['outfit-toggle'];

  for (let className of ignoreClasses) {
    if (e.target.classList.contains(className)) {
      return false;
    }
  }

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

function getModalPosition(cardNode) {
  // console.log('CARD NODE', {cardNode}, modalRef);
  // const top = Math.floor(cardNode.offsetTop + 2 * (cardNode.offsetHeight / 3));
  // const left = Math.floor(cardNode.offsetLeft);
  if (!cardNode) {
    // console.log('Error, cardNode undefined');
    return { top: 0, left: 0 };
  }
  const cardRect = cardNode.getBoundingClientRect();

  const cardWidth = cardRect.width || (cardRect.right - cardRect.left);
  const modalWidth = 320;
  const top = cardRect.top + window.scrollY;
  let left = cardRect.left + window.scrollX - ((modalWidth / 2) - (cardWidth / 2));
  if (left < 0) { left = 0 }

  return { top, left };
}

export default function FeatureModal({ product1, setIsBlurred, get }) {
  const [productToCompare, setProductToCompare] = useState(null);
  const [featureData, setFeatureData] = useState({});
  const [isHidden, setIsHidden] = useState(true);
  const [position, setPosition] = useState({ top: "200px", left: "200px" });
  const modalRef = useRef();
  const clickedOutside = (e) => {
    //console.log('HANDLE CLICK', e);
    //console.log('CHECK REF', modalRef);
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      return true;
    }
    return false;
  };
  const handleClick = (e) => {
    const cardElement = getProductCardElement(e);
    //console.log('---> handleClick', cardElement);
    if (cardElement) {
      //console.log('FOUND CARD ELEMENT', {cardElement})
      const productId = cardElement.getAttribute("data-id");

      get("/products/".concat(productId)).then((data) => {
        setIsBlurred(true);
        setProductToCompare(data);
        setPosition(getModalPosition(cardElement));
        // getModalPosition(cardElement, modalRef, setPosition);
        setIsHidden(false);
      });

      postInteraction(`.card[data-id="${productId}"]`, 'RelatedAndOutfit');
    } else if (!isHidden && clickedOutside(e)) {
      setIsBlurred(false);
      setIsHidden(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  if (productToCompare === null || isHidden) {
    return null;
  }
  if (productsChanged(featureData, product1, productToCompare)) {
    setFeatureData(parseFeatures(product1, productToCompare));
    //console.log('PARSED FEATURES: ', featureData);
    return null;
  }

  //console.log('GOT FEATURES', features);
  const tableClass =
    "modal-table " + (isHidden ? "display-none" : "display-table");
  const styles = {
    position: "absolute",
    top: position.top.toString().concat("px"),
    left: position.left.toString().concat("px"),
    backgroundColor: "rgba(180, 180, 180, 0.55)",
    backdropFilter: "blur(10px)",
    width: "auto",
    minWidth: "320px",
    borderRadius: "0.5rem",
    border: "2px solid rgba(8, 8, 8, 0.85)",
    borderStyle: "groove",
    borderColor: "black",
  };

  return (
    <div className="modal" style={styles} ref={modalRef}>
      <div className="wrapper">
        <div className="column-left modal-header">{product1.name}</div>
        <div className="column-middle modal-header"></div>
        <div className="column-right modal-header">{productToCompare.name}</div>
        {Object.keys(featureData).map((feature, i) => {
          if (feature !== "_id") {
            return (<>
              <div className={featureData[feature].classLeft}>{featureData[feature].product1 || "--"}</div>
              <div className={featureData[feature].classMiddle}>{feature}</div>
              <div className={featureData[feature].classRight}>{featureData[feature].product2 || "--"}</div>
              </>);
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}
