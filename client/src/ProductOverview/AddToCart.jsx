import React from 'react';
import './product.css';
import {StarOutlined} from '@ant-design/icons';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      sku: 0,
      size: 'S',
      quantity: 0,
      count: 0,
      cart: []
    };
    this.initialize = this.initialize.bind(this);
    this.handleSize = this.handleSize.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  initialize() {
    this.props.get('/cart')
      .then(data => {
        console.log('cart get data: ', data)
        console.log('cart state: ', this.state.cart)
      });
  }

  addToCart(e) {
    e.preventDefault();
    let cartObj = {sku_id: this.state.sku};
    const i = this.state.cart.map(item => item.sku_id).indexOf(this.state.sku);
    console.log('item i', i);
    if (i < 0) {
      this.state.cart.push({sku_id: this.state.sku, count: this.state.count});
    } else {
      this.state.cart[i].count += this.state.count;
    }
    console.log(this.state.sku, this.state.quantity, this.state.size)
    const asyncPost = (obj) => new Promise(resolve => {
      this.props.post('/cart', obj)
        .then(data => {
          console.log('cart post data: ', data);
          this.initialize();
        })
    });
    asyncPost(cartObj);
  }

  handleSize(e) {
    e.preventDefault();
    let size = e.target.value;
    const asyncSetState = (newState) => new Promise(resolve => this.setState(newState, resolve)).then(() => {
    });
    asyncSetState({size: size});
    Object.keys(this.props.skus).map(sku => {
      if (this.props.skus[sku].size === this.state.size) {
        asyncSetState({sku: sku, quantity: this.props.skus[sku].quantity})
      }
    })
  }

  handleQuantity() {
    if (this.state.quantity > 0) {
      let result = [];
      for (let i = 1; i <= this.state.quantity; i++) {
        result.push(i);
      }
      return result;
    }
    return <option>Quantity loading...</option>;
  }


  render() {
    if (this.props.skus) {
      return (
        <div>
          <label htmlFor="sizes"></label>
          <select onChange={this.handleSize} name="sizes" className="sizes">
          <option selected disabled>Select Size</option>
            {Object.keys(this.props.skus).map(sku => {
              return <option key={sku} data={this.props.skus[sku].quantity} id={sku} >{this.props.skus[sku].size}</option>
            })}
          </select>
          <label htmlFor="quantity"></label>
          <select onChange={this.handleQuantity} name="quantity" className="quantity">
          <option selected disabled>Select Quantity</option>
            {this.state.quantity > 0 && this.handleQuantity().map(val => {
              return <option key={val} count={val}>{val}</option>
            })}
          </select>
          <button onClick={this.addToCart}>Add To Cart</button>
          <StarOutlined className="outfit"/>
          {/* <FontAwesomeIcon icon="fa-solid fa-person-circle-plus" /> */}
          {/* <FontAwesomeIcon icon="fa-solid fa-circle-x" /> */}
        </div>
      )
    } else {
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
}

export default AddToCart;