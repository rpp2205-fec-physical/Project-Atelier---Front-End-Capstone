import React from 'react';
import Grid from '@mui/material/Grid';
import Carousel from './Carousel.jsx';
const outfit = require('../components/outfit.js');
export default class RelatedAndOutfit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: null,
      relatedIDs: [],
      relatedInfo: [],
      relatedStyles: [],
      relatedReviewsMeta: [],
      outfit: outfit.get(),
      outfitInfo: [],
      outfitStyles: [],
      outfitReviewsMeta: [],
      loaded: false,
      outfitHidden: true
    };

    this.loadAllProductData = this.loadAllProductData.bind(this);
    this.getRelatedProductData = this.getRelatedProductData.bind(this);
    this.getOutfitProductData = this.getOutfitProductData.bind(this);
  }

  componentDidUpdate() {
    if (!this.state.loaded && this.state.productId) {
      this.loadAllProductData();

    } else if (this.props.product.id && this.props.product.id !== this.state.productId) {
      this.setState({
        productId: this.props.product.id,
        loaded: false
      }, () => { console.log('RelatedAndOutfit: UPDATING PRODUCT') })

    } else if (outfit.updated) {
      outfit.resetUpdated();
      this.setState({
        loaded: false,
        outfitHidden: false
      }, () => { console.log('RelatedAndOutfit: UPDATING OUTFIT') });
    }
  }

  loadAllProductData() {
    if (!this.state.productId) { return; }
    console.log('RelatedAndOutfit: LOADING PRODUCT DATA...');
    const newState = {};

    this.getRelatedProductData()
      .then((data) => {
        Object.assign(newState, data);
        return this.getOutfitProductData();
      })
      .then((data) => {
        Object.assign(newState, data);
        newState.loaded = true;
        return new Promise(resolve => this.setState(newState, resolve).bind(this))
      })
      .then(() => {
        console.log('RelatedAndOutfit: DONE LOADING.');
        //this.render();
      })
      .catch(err => {
        console.log('RelatedAndOutfit: Error during loadAllProductData', err);
      });
  }

  getRelatedProductData() {
    const get = this.props.get;
    const data = {};

    return get('/products/' + this.state.productId + '/related')
      .then(relatedIDs => {
        data.relatedIDs = relatedIDs;
        return Promise.all(relatedIDs.map(id => get('/products/' + id)));
      })
      .then(relatedInfo => {
        data.relatedInfo = relatedInfo;
        return Promise.all(data.relatedIDs.map(id => get('/products/' + id + '/styles')));
      })
      .then(relatedStyles => {
        data.relatedStyles = relatedStyles;
        return Promise.all(data.relatedIDs.map(id => get('/reviews/meta?product_id=' + id)));
      })
      .then(relatedReviewsMeta => {
        data.relatedReviewsMeta = relatedReviewsMeta;
        return data;
      })
      .catch((err) => {
        console.log('RelatedAndOutfit: Error in getRelatedProductData', err);
      });
  }

  getOutfitProductData() {
    const get = this.props.get;
    const data = {};

    return Promise.all(this.state.outfit.map(id => get('/products/' + id)))
      .then(outfitInfo => {
        data.outfitInfo = outfitInfo;
        return Promise.all(this.state.outfit.map(id => get('/products/' + id + '/styles')));
      })
      .then(outfitStyles => {
        data.outfitStyles = outfitStyles;
        return Promise.all(this.state.outfit.map(id => get('/reviews/meta?product_id=' + id)));
      })
      .then(outfitReviewsMeta => {
        data.outfitReviewsMeta = outfitReviewsMeta;
        return data;
      })
      .catch((err) => {
        console.log('RelatedAndOutfit: Error in getOutfitProductData', err);
      });
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading...</div>
    } else {
      return <div>
        <div>
          <h4>Related Products</h4>
          <Carousel mainProduct={this.props.product} items={this.state.relatedInfo} styles={this.state.relatedStyles} reviewsMeta={this.state.relatedReviewsMeta} />
        </div>
        {this.state.outfitHidden ? null : (
          <div>
            <h4>Your Outfit</h4>
            <Carousel mainProduct={this.props.product} items={this.state.outfitInfo} styles={this.state.outfitStyles} reviewsMeta={this.state.outfitReviewsMeta} />
          </div>
        )}
      </div>
    }
  }
}