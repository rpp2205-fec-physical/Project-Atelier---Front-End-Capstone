import React from 'react';
import ImageGallery from './ImageGallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import AddToCart from './AddToCart.jsx';
import Styles from './Styles.jsx';
import Stars from '../components/Stars.jsx';
import $ from 'jquery';
import './product.css';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      styles: {},
      clickedStyle: {}
    };
    this.initialize = this.initialize.bind(this);
    this.childToParent = this.childToParent.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  childToParent(data) {
    console.log(data)
    // this.setState({clickedStyle: data}, () => {
    //   // console.log(data);
    // })
    const asyncSetState = (newState) => new Promise(resolve => this.setState(newState, resolve))
    asyncSetState({clickedStyle: data}).then(() => {console.log('child to parent success: ', this.state.clickedStyle)})
    // console.log('child to parent success: ', this.state.clickedStyle);
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
        <h1 id="title">Welcome To Project Atelier</h1>
        <div id="container">
          <ImageGallery Style={this.state.styles} className="image"/>
          <div className="product">
            <Stars />
            <ProductInfo Product={this.state.products[0]} Style={this.state.styles}/>
            <Styles Style={this.state.styles} childToParent={this.childToParent}/>
            <AddToCart get={this.props.get} post={this.props.post} put={this.props.put} Style={this.state.styles}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Product;