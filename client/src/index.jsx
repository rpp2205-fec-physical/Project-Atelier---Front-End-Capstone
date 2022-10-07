import React from 'react';
import ReactDOM from 'react-dom';
import ReviewContainer from './RatingsReviews/index.jsx';
import Product from './ProductOverview/Product.jsx';
import $ from 'jquery';
import axios from 'axios';
const Cache = require('../../util/cache.js');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    // initialize
  }

  render() {
    return (
      <div>
        <h1>Welcome To Project Atelier</h1>
        <Product />
        <ReviewContainer />
      </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('root'));