import React from 'react';
import ReactDOM from 'react-dom';
import ReviewContainer from './RatingsReviews/index.jsx';
import Product from './ProductOverview/Product.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.initialize = this.initialize.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  initialize() {
    // $.ajax({
    //   method: 'GET',
    //   url: '/api/products',
    //   contentType: 'application/json',
    //   success: (data => {
    //     // console.log('app data: ', data);
    //   }),
    //   error: (err => {
    //     console.log(err);
    //   })
    // })
  }

  render() {
    return (
      <div>
        <h1>Welcome To Project Atelier</h1>
        <Product />
        {/* <ReviewContainer /> */}
      </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('root'));