import React from 'react';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sku: 0
    };
    this.initialize = this.initialize.bind(this);
    this.handleSize = this.handleSize.bind(this);
  }

  componentDidMount() {
    this.initialize();
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

  handleSize(e) {
    e.preventDefault();
    let size = e.target;
    console.log(size);
    console.log(e.target.getAttribute('data'));
  }


  render() {
    if (this.props.skus) {
      // console.log(Object.keys(this.props.skus))
      return (
        <div>
          {/* {Object.keys(this.props.skus).map(sku => {
            console.log(this.props.skus[sku]);
            // return <option key={sku}>{this.props.skus[sku].size}</option>
              <div>
                <label htmlFor="sizes">Select Size</label>
                <select name="sizes" className="sizes">
                   <option key={sku}>{this.props.skus[sku].size}</option>
                </select>
                <label htmlFor="quantity">Select Quantity</label>
                <select name="quantity" className="quantity">
                   <option key={sku}>{this.props.skus[sku].quantity}</option>
                </select>
                <button onClick={this.addToCart}>Add To Cart</button>
              </div>

          })} */}
          <label htmlFor="sizes">Select Size</label>
          <select onSelect={this.handleSize} name="sizes" className="sizes">
            {Object.keys(this.props.skus).map(sku => {
              console.log(this.props.skus[sku]);
              return <option key={sku} data={sku} >{this.props.skus[sku].size}</option>
            })}
          </select>
          <label htmlFor="quantity">Select Quantity</label>
          <select name="quantity" className="quantity">
            <option>1</option>
          </select>
          <button onClick={this.addToCart}>Add To Cart</button>
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