import React from 'react';
import ImageGallery from './ImageGallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import AddToCart from './AddToCart.jsx';
import Styles from './Styles.jsx';
import Stars from '../components/Stars.jsx';
import './product.css';
const ClickAnalytics = require('../lib/clickAnalytics.js');
import { get, post, put } from '../lib/request-handlers';


class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      styles: {},
      clickedStyle: {},
      photos: [],
      skus: {},
      ratings: {},
      loaded: false,
      clickAnalytics: [],
      price: null,
      expanded: false
    };
    this.initialize = this.initialize.bind(this);
    this.childToParent = this.childToParent.bind(this);
    this.childToParentExpand = this.childToParentExpand.bind(this);
    this.stars= this.stars.bind(this);
    this.get = get;
    this.post = post;
    this.put = put;
    // this.clickAnalytics = this.clickAnalytics.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  childToParent(data) {
    const asyncSetState = (newState) => new Promise(resolve => this.setState(newState, resolve))
    asyncSetState({clickedStyle: data, photos: data.photos, skus: data.skus, price: data.sale_price})
  }

  childToParentExpand(data) {
    const asyncSetState = (newState) => new Promise(resolve => this.setState(newState, resolve))
    asyncSetState({expanded: data})
  }

  stars(reviews) {
    if (reviews.ratings.ratings) {
      return (<div>
        <Stars ratings={reviews.ratings.ratings} />
        <p className="review">Read All 22 Reviews</p>
        </div>);
    } else {
      return <Stars stars={0} />;
    }
  }

  clickAnalytics() {
    let eventObj = (e) => {
      let stringifyObj = (object, depth=0, max_depth=2) => {
        if (depth > max_depth)
            return 'Object';
        const obj = {};
        for (let key in object) {
            let value = object[key];
            if (value instanceof Node)
                value = {id: value.id};
            else if (value instanceof Window)
                value = 'Window';
            else if (value instanceof Object)
                value = stringifyObj(value, depth+1, max_depth);

            obj[key] = value;
        }
        return depth ? obj : JSON.stringify(obj);
    }
      let date = new Date();
      let element = stringifyObj(e.target, 2).outerHTML;
      let currentEvent = {element: element, widget: 'Product Overview', time: date};
      this.post('/interactions', currentEvent);
      // this.state.clickAnalytics.push(currentEvent);
    }
    if (document.getElementById("productOverview") !== null) {
      document.getElementById("productOverview").addEventListener("click", eventObj);
      return () => {document.getElementById("productOverview").removeEventListener("click", eventObj);}
    }
  }

  initialize() {
    this.get('/products')
      .then(data => {
        this.setState({
          products: data
        });
        this.get('/products/' + data[0].id + '/styles')
          .then(styles => {
            this.setState({
              styles: styles,
              photos: styles.results[0].photos,
              skus: styles.results[0].skus
            });
            this.get('/reviews/meta?product_id=' + data[0].id)
              .then(reviews => {
                const asyncSetState = (newState) => new Promise(resolve => this.setState(newState, resolve))
                asyncSetState({ratings: reviews});
              })
          })
      })
  }

  render() {
    if (this.state.expanded) {
      return (
        <div  id="productOverview" onClick={this.clickAnalytics("productOverview")}>
          <h1 id="title">Welcome To Project Atelier</h1>
          <div id="extendo">
            <ImageGallery Style={this.state.styles} Photos={this.state.photos} className="image" cToPExpand={this.childToParentExpand}/>
          </div>
        </div>
      )
    } else {
      return (
        <div  id="productOverview" onClick={this.clickAnalytics("productOverview")}>
          <h1 id="title">Welcome To Project Atelier</h1>
          <div id="container">
            <ImageGallery Style={this.state.styles} Photos={this.state.photos} className="image" cToPExpand={this.childToParentExpand}/>
            <div className="product">
              {this.stars(this.state)}
              <ProductInfo Product={this.state.products[0]} Style={this.state.styles} Price={this.state.price}/>
              <Styles Style={this.state.styles} childToParent={this.childToParent}/>
              <AddToCart get={this.get} post={this.post} put={this.put} Style={this.state.styles} skus={this.state.skus}/>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Product;