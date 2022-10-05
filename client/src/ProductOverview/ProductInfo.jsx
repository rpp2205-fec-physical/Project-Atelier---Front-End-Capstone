import React from 'react';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h3>{this.props.Product.name}</h3>
      </div>
    )
  }
}

export default ProductInfo;