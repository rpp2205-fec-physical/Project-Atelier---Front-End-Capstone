import React from 'react';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.Product) {
      if (this.props.Price !== null) {
        return (
          <div>
            <h3>Category > {this.props.Product.category}</h3>
            <h1>{this.props.Product.name}</h1>
            <h3><span style={{textDecoration: 'line-through', color: 'red'}}>${this.props.Product.default_price}</span> ${this.props.Price}</h3>
            <h4>{this.props.Product.slogan}</h4>
            <p>{this.props.Product.description}</p>
          </div>
        )
      } else {
        return (
          <div>
            <h3>Category > {this.props.Product.category}</h3>
            <h1>{this.props.Product.name}</h1>
            <h3>${this.props.Product.default_price}</h3>
            <h4>{this.props.Product.slogan}</h4>
            <p>{this.props.Product.description}</p>
          </div>
        )
      }
    } else {
      return (
        <div>
          <h3>Product is loading...</h3>
        </div>
      )
    }
  }
}

export default ProductInfo;