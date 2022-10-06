import React from 'react';
import ImageGallery from './ImageGallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import AddToCart from './AddToCart.jsx';
import $ from 'jquery';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      styles: {}
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
        // console.log('app data: ', data);
        this.setState({
          products: data
        });
        // console.log('first product: ', this.state.products[0])
      }),
      error: (err => {
        console.log(err);
      })
    })
    .then(data => {
      let url = '/api/products/' + data[0].id + '/styles';
      console.log(url);
      $.ajax({
        method: 'GET',
        url: url,
        contentType: 'application/json',
        success: (styles => {
          // console.log('styles data: ', styles);
          this.setState({
            styles: styles
          });
          console.log('product styles: ', this.state.styles)
        }),
        error: (err => {
          console.log(err);
        })
      })
    })
  }

  render() {
    return (
      <div>
        <ImageGallery Style={this.state.styles}/>
        <ProductInfo Product={this.state.products[0]} Style={this.state.styles}/>
        <AddToCart />
      </div>
    )
  }
}

export default Product;