import React from 'react';
import Card from './ProductCard.jsx';

const getDefaultStyle = (styles) => {
  console.log('GETTING DEFAULT STYLE', styles);
  for (let style of styles.results) {
    if (style['default?']) {
      console.log('GOT DEFAULT STYLE', style);
      return style;
    }
  }
  console.log("DIDNT FIND A DEFAULT!!!", styles.results[0]);
  return styles.results[0];
};

export default function Carousel(props) {
  const { items, styles, reviewsMeta } = props;
  if (!items || !styles || !reviewsMeta) {
    console.log('CAROUSEL: ', items, styles, reviewsMeta);
    console.error('FAILED TO GET');
    return null;
  } else {
    console.log('CAROUSEL RENDERING : ', items, styles, reviewsMeta);
    return <div className='carousel-container'>
      {items.map((item, i) => (
        <div key={i} className='carousel-item'>
          <Card item={item} style={getDefaultStyle(styles[i])} reviewsMeta={reviewsMeta} />
        </div>
      ))}
    </div>
  }
}