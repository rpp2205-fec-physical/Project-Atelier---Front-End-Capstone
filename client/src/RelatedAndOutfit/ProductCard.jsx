import React from 'react';
import Stars from '../components/Stars.jsx';

export default function Card(props) {
  const { item, style, reviewsMeta } = props;

  function price() {
    const price = item.default_price || style.original_price;
    return price;
  }

  function starsAttr() {
    const attributes = {};

    if (reviewsMeta.ratings){
      return { ratings: reviewsMeta.ratings };
    } else {
      return { stars: 0 };
    }
  }

  return <div className='card'>
    <img className='card-img' src={style.photos[0].thumbnail_url} />
    <h5>{item.category}</h5>
    <h4>{item.name}</h4>
    <p>{price()}</p>
    <Stars attributes={starsAttr()} />
  </div>
}