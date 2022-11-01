import React, { useState, useRef } from 'react';
import Stars from '../components/Stars.jsx';
import FeatureModal from './FeatureModal.jsx';
import OutfitToggle from '../components/OutfitToggle.jsx';

function price(item, style) {
  const price = item.default_price || style.original_price;
  const salePrice = style.sale_price;

  return <div className='price'>
    {salePrice ? (<div className='sale-price'>{`$${salePrice}`}</div>) : null} <div className='price'>{`$${price}`}</div>
  </div>;
}

function stars(reviewsMeta) {
  if (reviewsMeta.ratings) {
    return <Stars ratings={reviewsMeta.ratings} />;
  } else {
    return <Stars stars={0} />;
  }
}

export default function Card({ mainProduct, item, style, reviewsMeta }) {

  return <div data-id={item.id} className='card' >
    <img className='card-img' src={style.photos[0].thumbnail_url} alt={item.name}/>
    <h5>{item.category}</h5>
    <h4>{item.name}</h4>
    <p>{price(item, style)}</p>
    <p>{stars(reviewsMeta)}</p>
    <OutfitToggle productId={item.id} />
  </div>
}