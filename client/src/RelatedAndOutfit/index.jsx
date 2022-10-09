import React from 'react';
import Grid from '@mui/material/Grid';
import Carousel from './Carousel.jsx';

export default class RelatedAndOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      relatedItems: [],
      outfit: [],
      loaded: false
    };


  }

  componentDidUpdate() {
    if (this.props.product.id) {
      console.log('PRODUCT UPDATED IN RELATED');
    } else {
      console.log('NO PRODUCT UPDATED IN RELATED');
    }
  }

  render() {
    if (!this.loaded) {
      return <div>Loading...</div>
    }
    return <div>
      <div>
        <h4>Related Products</h4>
        <Carousel items={this.state.relatedItems} />
      </div>
      <div>
        <h4>Your Outfit</h4>
        <Carousel items={this.state.outfit} />
      </div>
    </div>;
  }
}