import React from 'react';
import './product.css';
import {StarOutlined} from '@ant-design/icons';
import OutfitToggle from '../components/OutfitToggle.jsx';
import { TriggerOutfitLoadContext } from "../contexts/TriggerOutfitLoad";
import { get, post, put } from '../lib/request-handlers';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sku: 0,
      size: 'S',
      quantity: 0,
      count: 0,
      cart: [],
      loadedOutfit: false
    };
    this.initialize = this.initialize.bind(this);
    this.handleSize = this.handleSize.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleCount = this.handleCount.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.triggerOutfitLoad = this.triggerOutfitLoad.bind(this);
    this.get = get;
    this.post = post;
    this.put = put;
  }

  componentDidMount() {
    this.initialize();
  }

  initialize() {
    this.get('/cart')
      .then(data => {
        console.log('cart get data: ', data)
        // console.log('cart state: ', this.state.cart)
      });
  }

  addToCart(e) {
    e.preventDefault();
    // console.log(e.target);
    console.log(this.state.size, this.state.count);
    let cartObj = {sku_id: JSON.parse(this.state.sku), count: JSON.parse(this.state.count)};
    const i = this.state.cart.map(item => JSON.stringify(item.sku_id)).indexOf(this.state.sku);
    // console.log('item i', i);
    if (i < 0) {
      this.state.cart.push({sku_id: JSON.parse(this.state.sku), count: JSON.parse(this.state.count)});
    } else {
      this.state.cart[i].count += JSON.parse(this.state.count);
    }
    // console.log(this.state.sku, this.state.quantity, this.state.size)
    const asyncPost = (obj) => new Promise(resolve => {
      this.post('/cart', obj)
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

  handleCount(e) {
    e.preventDefault();
    let count = e.target.value;
    const asyncSetState = (newState) => new Promise(resolve => this.setState(newState, resolve)).then(() => {
    });
    asyncSetState({count: count});
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

  triggerOutfitLoad(newState, callback) {
    if (this.state.loadedOutfit) {
      // newState.loadedOutfit = false;
      this.setState({loadedOutfit: false});
    }
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
          <select onChange={this.handleCount} name="quantity" className="quantity">
          <option selected disabled>Select Quantity</option>
            {this.state.quantity > 0 && this.handleQuantity().map(val => {
              return <option key={val} count={val}>{val}</option>
            })}
          </select>
          <button onClick={this.addToCart}>Add To Cart</button>
          <OutfitToggle productId={this.props.Style.product_id}/>
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