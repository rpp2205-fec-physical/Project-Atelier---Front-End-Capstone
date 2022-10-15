import React from 'react';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sku: 0
    };
    this.initialize = this.initialize.bind(this);
    // this.productData = this.productData.bind(this);
  }

  componentDidMount() {
    this.initialize();
    // this.productData();
  }

  initialize() {
    this.props.get('/cart')
      .then(data => {
        console.log('cart get data: ', data)
      });
  }

  addToCart(e) {
    e.preventDefault();
    this.props.post('/cart', obj)
      .then(data => {
        console.log('cart post data: ', data);
      })
  }

  // productData() {
  //   this.props.get('/products')
  //     .then(data => {
  //       console.log('cart get product data: ', data);
  //     })
  // }

  render() {
    return (
      <div>
        <label htmlFor="sizes">Select Size</label>
        <select name="sizes" className="sizes">

          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>
        <label htmlFor="quantity">Select Quantity</label>
        <select name="quantity" className="quantity">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <button onClick={this.addToCart}>Add To Cart</button>
      </div>
    )
  }
}

export default AddToCart;