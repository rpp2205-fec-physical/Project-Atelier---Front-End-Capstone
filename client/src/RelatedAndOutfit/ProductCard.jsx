import React from 'react';
import Stars from '../components/Stars.jsx';

export default function Card(props) {
  const { item, style, reviewsMeta } = props;
  console.log('CARD: ', item, style, reviewsMeta);
  return <div className='card'>
    <img className='card-img' src={style.photos[0].thumbnail_url} />
    {item.category}
    <h4>{item.name}</h4>
    <p>{item.default_price}</p>
    <Stars ratings={reviewsMeta.ratings} />
  </div>
}