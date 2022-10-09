import React from 'react';
import Grid from '@mui/material/Grid';
import Carousel from './Carousel.jsx';

class ReviewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      relatedItems: [],
      outfit: []
    };


  }

  render() {
    return <div>
      <div>
        <h4>Related Items</h4>
        <Carousel items={this.state.relatedItems} />
      </div>
      <div>
        <h4>My Outfit</h4>
        <Carousel items={this.state.outfit} />
      </div>
    </div>;
  }
}