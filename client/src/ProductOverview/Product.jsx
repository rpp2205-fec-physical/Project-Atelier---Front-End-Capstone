import React from 'react';
import ImageGallery from './ImageGallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import AddToCart from './AddToCart.jsx';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h2>Product Name</h2>
        <ImageGallery />
        <ProductInfo />
        <AddToCart />
      </div>
    )
  }
}

export default Product;