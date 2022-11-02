import React, { useEffect, useRef } from 'react';
import Card from './ProductCard.jsx';
import { LeftSquareFilled, RightSquareFilled } from '@ant-design/icons';
//import './Carousel.css';

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

function handleScrollLeft(ref) {
  console.log('HANDLE SCROLL LEFT', {...ref.current});
}

function handleScrollRight(ref) {

}

export default function Carousel({ mainProduct, items, styles, reviewsMeta }) {
  const elementRef = useRef();
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  });

  if ( !mainProduct || !items || !styles || !reviewsMeta) {
    return null;
  } else {
    return <div ref={elementRef} className='carousel-container'>
      {items.map((item, i) => (
        <div key={i} className='carousel-item'>
          <Card mainProduct={mainProduct} item={item} style={getDefaultStyle(styles[i])} reviewsMeta={reviewsMeta[i]} />
        </div>
      ))}
      <div className="fade fade-left"/><div className="fade fade-right"/>
      <LeftSquareFilled className="carousel-controls carousel-left" onClick={()=>handleScrollLeft(elementRef)} style={{position:'absolute', left:0, fontSize:'2rem', color:'gray', opacity:'80%'}}/>
      <RightSquareFilled className="carousel-controls carousel-right" style={{position:'absolute', right:0, fontSize:'2rem', color:'gray', opacity:'80%'}}/>
    </div>
  }
}