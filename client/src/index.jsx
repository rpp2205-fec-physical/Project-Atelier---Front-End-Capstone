import React from 'react';
import ReactDOM from 'react-dom';
import ReviewContainer from './RatingsReviews/index.jsx';
import Product from './ProductOverview/Product.jsx';
import RelatedItems from './RelatedItems/index.jsx';
import $ from 'jquery';
import axios from 'axios';
const Cache = require('../../util/cache.js');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      outfits: []
    };
    this.cache = new Cache(600000);

    this.initialize = this.initialize.bind(this);
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  get(endpoint) {
    const cached = this.cache.get(endpoint);

    if (cached) {
      return Promise.resolve(cached);
    } else {
      return axios.get('/api' + endpoint)
        .then(response => {
          this.cache.store(endpoint, response.data);
          return response.data;
        })
        .catch(err => {
          console.log("'GET' ERROR: ", err);
          return null;
        });
    }
  }

  post(endpoint, data) {
    return axios.post('/api' + endpoint, data);
  }

  put(endpoint, data) {
    return axios.put('/api' + endpoint, data);
  }

  initialize() {
    this.get('/products')
      .then(products => {
        const url = '/products/' + products[0].id;
        return this.get(url);
      })
      .then(info => {
        this.setState({ product: info });
      });
  };


  render() {
    return (
      <div>
        <h1>Welcome To Project Atelier</h1>
        <Product get={this.get} post = {this.post} outfits={this.state.outfits}/>
        <ReviewContainer get={this.get} product={this.state.product}/>
        <RelatedItems outfit={this.props.outfit} get={this.get} />
      </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('root'));