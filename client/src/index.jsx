import React from 'react';
//import './index.css';
import ReactDOM from 'react-dom';
import ReviewContainer from './RatingsReviews/index.jsx';
import Product from './ProductOverview/Product.jsx';
import RelatedAndOutfit from './RelatedAndOutfit/index.jsx';
import $ from 'jquery';
import axios from 'axios';
const Cache = require('../../util/cache.js');
import FeatureModal from './RelatedAndOutfit/FeatureModal.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      outfits: [],
      productToCompare: {},
      showFeatureModal: false
    };
    this.cache = new Cache(600000);

    this.initialize = this.initialize.bind(this);
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.handleClickToCompare = this.handleClickToCompare.bind(this);
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

  handleClickToCompare(product) {
    this.setState({ productToCompare: product, showFeatureModal: !this.state.showFeatureModal });
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
        <Product get={this.get} post={this.post} outfits={this.state.outfits} />
        <RelatedAndOutfit product={this.state.product} outfit={this.state.outfits} get={this.get} handleClickToCompare={this.handleClickToCompare} />
        <ReviewContainer get={this.get} product={this.state.product} />
        {this.state.showFeatureModal ? <FeatureModal handleClose={() => this.setState({ showFeatureModal: false })} show={true} product1={this.state.product} product2={this.state.productToCompare} /> : null}
      </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('root'));