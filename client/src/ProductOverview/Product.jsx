import React from 'react';
import ImageGallery from './ImageGallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import AddToCart from './AddToCart.jsx';
import $ from 'jquery';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.initialize = this.initialize.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  initialize() {
    $.ajax({
      method: 'GET',
      url: '/api/products',
      contentType: 'application/json',
      success: (data => {
        console.log('app data: ', data);
        this.setState({
          products: data
        });
        console.log('first product: ', this.state.products[0])
      }),
      error: (err => {
        console.log(err);
      })
    })
  }

  render() {
    return (
      <div>
        <h2>Product Name</h2>
        <ImageGallery />
        <ProductInfo Product={this.state.products[0]}/>
        <AddToCart />
      </div>
    )
  }
}

export default Product;