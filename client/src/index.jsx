import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import ReviewContainer from './RatingsReviews/index.jsx';
import Product from './ProductOverview/Product.jsx';
import RelatedAndOutfit from './RelatedAndOutfit/index.jsx';
import FeatureModal from './RelatedAndOutfit/FeatureModal.jsx';
import OutfitToggle from './components/OutfitToggle.jsx';

const Cache = require('../../util/cache.js');
import { get, post, put } from '../../util/request-handlers.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      isBlurred: false,
      endpoint: '71698'
    };
    this.cache = new Cache(600000);

    this.initialize = this.initialize.bind(this);
    this.get = get;
    this.post = post;
    this.put = put;
    this.setIsBlurred = this.setIsBlurred.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  initialize() {
    const newState = {};
    this.get('/products')
      .then(products => {
        const i = Math.floor(Math.random() * products.length);
        const url = '/products/' + products[i].id;
        newState.endoint = products[i].id;
        return this.get(url);
      })
      .then(mainProduct => {
        newState.product = mainProduct;
      })
      .then(() => {
        this.setState(newState);
      });
  };

  setIsBlurred(isBlurred) {
    this.setState({ isBlurred: !!isBlurred });
  }

  render() {
    const containerClass = 'app'.concat(this.state.isBlurred ? ' is-blurred' : '');
    return (<>
      <div className={containerClass}>
        <Product get={this.get} post={this.post} /* this prop is no longer needed>>>*/ outfits={{}} product={this.state.product} endpoint={this.state.endpoint} />
        <RelatedAndOutfit product={this.state.product} outfit={this.state.outfit} get={this.get} />
        {/* <ReviewContainer get={this.get} product={this.state.product} /> */}
      </div>
      <FeatureModal product1={this.state.product} setIsBlurred={this.setIsBlurred} get={this.get} />
    </>)
  }

}

ReactDOM.render(<App />, document.getElementById('root'));