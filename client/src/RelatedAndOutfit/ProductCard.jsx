import React, { useState } from 'react';
import Stars from '../components/Stars.jsx';
import FeatureModal from './FeatureModal.jsx';

export default function Card({ mainProduct, item, style, reviewsMeta }) {
  const [showModal, setShowModal] = useState(false);

  function price() {
    const price = item.default_price || style.original_price;
    const salePrice = style.sale_price;

    return <div className='price'>
      {salePrice ? (<div className='sale-price'>{`$${salePrice}`}</div>) : null} <div className='price'>{`$${price}`}</div>
    </div>;
  }

  function stars() {
    if (reviewsMeta.ratings) {
      return <Stars ratings={reviewsMeta.ratings} />;
    } else {
      return <Stars stars={0} />;
    }
  }

  function handleToggleModal(e) {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }

  return <><div className='card' onClick={handleToggleModal}>
    <img className='card-img' src={style.photos[0].thumbnail_url} />
    <h5>{item.category}</h5>
    <h4>{item.name}</h4>
    {price()}
    {stars()}
  </div>
  {showModal ? <FeatureModal handleClose={handleToggleModal} show={true} product1={mainProduct} product2={item} /> : null}
  </>
}