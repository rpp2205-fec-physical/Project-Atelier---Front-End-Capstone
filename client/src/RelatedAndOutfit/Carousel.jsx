import React, { useEffect } from 'react';
import Card from './ProductCard.jsx';
import './Carousel.css';

function getDefaultStyle(styles) {
  for (let style of styles.results) {
    if (style['default?']) {
      return style;
    }
  }
  return styles.results[0];
};

function handleResize(e) {
  console.log('HANDLE RESIZE');
}

export default function Carousel({ mainProduct, items, styles, reviewsMeta, handleClickToCompare }) {
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  });

  if ( !mainProduct || !items || !styles || !reviewsMeta) {
    return null;
  } else {
    return <div className='carousel-container'>
      {items.map((item, i) => (
        <div key={i} className='carousel-item'>
          <Card mainProduct={mainProduct} item={item} style={getDefaultStyle(styles[i])} reviewsMeta={reviewsMeta[i]} handleClickToCompare={handleClickToCompare} />
        </div>
      ))}
    </div>
  }
}