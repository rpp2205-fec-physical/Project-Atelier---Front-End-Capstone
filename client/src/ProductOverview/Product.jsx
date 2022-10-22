import React from 'react';
import ImageGallery from './ImageGallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import AddToCart from './AddToCart.jsx';
import Styles from './Styles.jsx';
import Stars from '../components/Stars.jsx';
import $ from 'jquery';
import './product.css';


class Product extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      products: [],
      styles: {},
      clickedStyle: {},
      photos: [],
      skus: {},
      ratings: {},
      loaded: false
    };
    this.initialize = this.initialize.bind(this);
    this.childToParent = this.childToParent.bind(this);
    this.stars= this.stars.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate() {
    // if (!this.state.loaded) {
    //   if (Object.keys(this.props.product).length) {
    //     return Promise.resolve(

    //       this.props.get('/products/' + this.props.endpoint + '/styles')
    //         .then(styles => {
    //           console.log('does it get to styles?', styles)
    //           this.setState({
    //             styles: styles,
    //             photos: styles.results[0].photos,
    //             skus: styles.results[0].skus,
    //             loaded: true
    //           });
    //         })

    //     )
    //   }
    // }
  }

  childToParent(data) {
    const asyncSetState = (newState) => new Promise(resolve => this.setState(newState, resolve))
    asyncSetState({clickedStyle: data, photos: data.photos, skus: data.skus})
  }

  stars(reviews) {
    console.log('stars reviews: ', reviews)
    if (reviews.ratings.ratings) {
      return <Stars ratings={reviews.ratings.ratings} />;
    } else {
      return <Stars stars={0} />;
    }
  }


  initialize() {

    this.props.get('/products')
      .then(data => {
        this.setState({
          products: data
        });
        this.props.get('/products/' + data[0].id + '/styles')
          .then(styles => {
            this.setState({
              styles: styles,
              photos: styles.results[0].photos,
              skus: styles.results[0].skus
            });
            this.props.get('/reviews/meta?product_id=' + data[0].id)
              .then(reviews => {
                console.log('reviews data: ', reviews);
                const asyncSetState = (newState) => new Promise(resolve => this.setState(newState, resolve))
                asyncSetState({ratings: reviews});
                console.log('async ratings', this.state.ratings)
              })
          })
      })

  }

  render() {
    return (
      <div>
        <h1 id="title">Welcome To Project Atelier</h1>
        <div id="container">
          <ImageGallery Style={this.state.styles} Photos={this.state.photos} className="image"/>
          <div className="product">
            {this.stars(this.state)}
            <ProductInfo Product={this.state.products[0]} Style={this.state.styles}/>
            <Styles Style={this.state.styles} childToParent={this.childToParent}/>
            <AddToCart get={this.props.get} post={this.props.post} put={this.props.put} Style={this.state.styles} skus={this.state.skus}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Product;