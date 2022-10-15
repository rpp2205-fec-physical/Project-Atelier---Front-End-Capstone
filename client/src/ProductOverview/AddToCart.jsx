import React from 'react';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.initialize = this.initialize.bind(this);
    this.productData = this.productData.bind(this);
  }

  componentDidMount() {
    this.initialize();
    this.productData()
  }

  initialize() {
    this.props.get('/cart')
      .then(data => {
        console.log('cart get data: ', data)
      });
  }

  addToCart(obj) {
    this.props.post('/cart', obj)
      .then(data => {
        console.log('cart post data: ', data);
      })
  }

  productData() {
    this.props.get('/products')
      .then(data => {
        console.log('cart get product data: ', data);
      })
  }

  render() {
    return (
      <div>
        <label for="sizes">Select Size</label>
        <select name="sizes" class="sizes">
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>
        <label for="quantity">Select Quantity</label>
        <select name="quantity" class="quantity">
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