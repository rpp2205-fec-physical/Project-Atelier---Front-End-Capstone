import React from 'react';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.initialize = this.initialize.bind(this);
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

  addToCart(obj) {
    this.props.post('/cart', obj)
      .then(data => {
        console.log('cart post data: ', data);
      })
  }

  render() {
    return (
      <div>
        <h3>Insert Cart Here...</h3>
      </div>
    )
  }
}

export default AddToCart;