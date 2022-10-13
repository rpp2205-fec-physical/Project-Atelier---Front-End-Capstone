import React from 'react';
import Grid from '@mui/material/Grid';
import Carousel from './Carousel.jsx';

export default class RelatedAndOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      productId: null,
      relatedIDs: [],
      relatedInfo: [],
      relatedStyles: [],
      relatedReviewsMeta: [],
      outfitIDs: props.outfit,
      outfitInfo: [],
      outfitStyles: [],
      outfitReviewsMeta: [],
      loaded: false,
      outfitHidden: true
    };
    //this.oldSetState = this.setState;
    //this.setState = state => new Promise(resolve => this.oldSetState(state, resolve));
    //this.setState = this.setState.bind(this);
    this.loadAllProductData = this.loadAllProductData.bind(this);
  }

  componentDidUpdate() {
    if (!this.state.loaded && this.state.productId) {
      this.loadAllProductData();
    } else if (this.props.product.id && this.props.product.id !== this.state.productId) {
      console.log('RelatedAndOutfit: UPDATED RELATED');
      this.setState({
        productId: this.props.product.id,
        loaded: false
      })
      // .catch(err => {
      //   console.log('SETSTATE ERROR: ', err);
      // });
    } else if (this.props.outfit.length !== this.state.outfitIDs.length) {
      console.log('RelatedAndOutfit: UPDATED OUTFIT');
      this.setState({
        outfitIDs: this.props.outfit,
        loaded: false,
        outfitHidden: this.props.outfit.length ? false : true
      });
    }
  }

  loadAllProductData() {
    if (!this.state.productId) { return; }
    console.log('RelatedAndOutfit: LOADING PRODUCT DATA...');
    const get = this.props.get;
    const newState = {};

    get('/products/' + this.state.productId + '/related')
      .then(relatedIDs => {
        newState.relatedIDs = relatedIDs;
        return Promise.all(relatedIDs.map(id => get('/products/' + id)));
      })
      .then(relatedInfo => {
        newState.relatedInfo = relatedInfo;
        return Promise.all(newState.relatedIDs.map(id => get('/products/' + id + '/styles')));
      })
      .then(relatedStyles => {
        newState.relatedStyles = relatedStyles;
        return Promise.all(newState.relatedIDs.map(id => get('/reviews/meta?product_id=' + id)));
      })
      .then(relatedReviewsMeta => {
        newState.relatedReviewsMeta = relatedReviewsMeta;
        return Promise.all(this.state.outfitIDs.map(id => get('/products/' + id)));
      })
      .then(outfitInfo => {
        newState.outfitInfo = outfitInfo;
        return Promise.all(this.state.outfitIDs.map(id => get('/products/' + id + '/styles')));
      })
      .then(outfitStyles => {
        newState.outfitStyles = outfitStyles;
        return Promise.all(this.state.outfitIDs.map(id => get('/reviews/meta?product_id=' + id)));
      })
      .then(outfitReviewsMeta => {
        newState.outfitReviewsMeta = outfitReviewsMeta;
        newState.loaded = true;
        return new Promise(resolve => this.setState(newState, resolve).bind(this));
      })
      .then(() => {
        console.log('RelatedAndOutfit: DONE LOADING.');
        //this.render();
      })
      .catch(err => {
        console.log('RelatedAndOutfit: Error during loadAllProductData', err);
      });
  }

  loadRelatedProductData() {
    // might refactor later
  }

  loadOutfitProductData() {
    // might refactor later
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading...</div>
    } else {
      return <div>
        <div>
          <h4>Related Products</h4>
          <Carousel mainProduct={this.props.product} items={this.state.relatedInfo} styles={this.state.relatedStyles} reviewsMeta={this.state.relatedReviewsMeta} handleClickToCompare={this.props.handleClickToCompare} />
        </div>
        {this.state.outfitHidden ? null : (
          <div>
            <h4>Your Outfit</h4>
            <Carousel mainProduct={this.props.product} items={this.state.outfitInfo} styles={this.state.outfitStyles} reviewsMeta={this.state.outfitReviewsMeta} handleClickToCompare={this.props.handleClickToCompare} />
          </div>
        )}
      </div>
    }
  }
}