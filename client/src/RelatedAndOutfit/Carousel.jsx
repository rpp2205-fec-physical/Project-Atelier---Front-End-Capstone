import React from 'react';
import Card from './ProductCard.jsx';
import './Carousel.css';

const getDefaultStyle = (styles) => {
  for (let style of styles.results) {
    if (style['default?']) {
      return style;
    }
  }
  return styles.results[0];
};

export default function Carousel({ mainProduct, items, styles, reviewsMeta }) {
  if ( !mainProduct || !items || !styles || !reviewsMeta) {
    return null;
  } else {
    return <div className='carousel-container'>
      {items.map((item, i) => (
        <div key={i} className='carousel-item'>
          <Card mainProduct={mainProduct} item={item} style={getDefaultStyle(styles[i])} reviewsMeta={reviewsMeta[i]} />
        </div>
      ))}
    </div>
  }
}