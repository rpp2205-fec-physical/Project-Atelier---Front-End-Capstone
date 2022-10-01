import React from 'react';
import ImageGallery from './ImageGallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import AddToCart from '.AddToCart.jsx';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    <div>
      <h1>Product Name</h1>
      <ImageGallery />
      <ProductInfo />
      <AddToCart />
    </div>
  }
}

export default Product;