import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import ReviewContainer from './RatingsReviews/index.jsx';
import Product from './ProductOverview/Product.jsx';
import RelatedAndOutfit from './RelatedAndOutfit/index.jsx';
import axios from 'axios';
const Cache = require('../../util/cache.js');
import FeatureModal from './RelatedAndOutfit/FeatureModal.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      outfit: [],
      isBlurred: false,
      productToCompare: {},
      endpoint: '71698'
    };
    this.cache = new Cache(600000);

    this.initialize = this.initialize.bind(this);
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.setIsBlurred = this.setIsBlurred.bind(this);
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
    return Promise.resolve(
    this.get('/products')
      .then(products => {
        const i = Math.floor(Math.random() * products.length);
        const url = '/products/' + products[i].id;
        const asyncSetState = (newState) => new Promise(resolve => this.setState(newState, resolve))
        asyncSetState({endoint: products[i].id});
        return this.get(url);
      })
      .then(info => {
        this.setState({ product: info });
      }));
  };

  setIsBlurred(isBlurred) {
    this.setState({ isBlurred: !!isBlurred });
  }

  render() {
    const containerClass = 'app'.concat(this.state.isBlurred ? ' is-blurred' : '');
    return (<>
      <div className={containerClass}>
        <Product get={this.get} post={this.post} outfits={this.state.outfits} product={this.state.product} endpoint={this.state.endpoint}/>
        {/* <RelatedAndOutfit product={this.state.product} outfit={this.state.outfits} get={this.get} /> */}
        <ReviewContainer get={this.get} product={this.state.product} />
      </div>
      <FeatureModal product1={this.state.product} setIsBlurred={this.setIsBlurred} get={this.get} />
    </>)
  }

}

ReactDOM.render(<App />, document.getElementById('root'));