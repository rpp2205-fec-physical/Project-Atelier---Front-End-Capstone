import React from 'react';
import ImageGallery from './ImageGallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import AddToCart from './AddToCart.jsx';
import Styles from './Styles.jsx';
import Stars from '../components/Stars.jsx';
import './product.css';
const ClickAnalytics = require('../lib/clickAnalytics.js');
import { get, post, put } from '../lib/request-handlers';
import {SearchOutlined, ShoppingCartOutlined} from '@ant-design/icons';


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
      expanded: false,
      cartNum: 0,
      cartItems: {},
      reviews: 0,
      reInit: 0
    };
    this.initialize = this.initialize.bind(this);
    this.childToParent = this.childToParent.bind(this);
    this.childToParentExpand = this.childToParentExpand.bind(this);
    this.stars= this.stars.bind(this);
    this.get = get;
    this.post = post;
    this.put = put;
    this.reInit = this.reInit.bind(this);
    this.clickAnalytics = this.clickAnalytics.bind(this);
    this.onCartClick = this.onCartClick.bind(this);
  }

  componentDidMount() {
    if (Object.keys(this.props.product).length) {
      this.initialize();
    } else {
      this.reInit();
    }
  }

  componentDidUpdate() {
    if (this.state.reInit > 1 && Object.keys(this.props.product).length) {
      return;
    } else {
      this.reInit();
      this.state.reInit++;
    }
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
        <p className="review" onClick={() => {alert('If we hired another employee we could add a reviews component but for now just trust us - this product is unbelievable!')}}>Read All {this.state.reviews} Reviews</p>
        </div>);
    } else {
      return <Stars stars={0} />;
    }
  }

  onCartClick(e) {
    e.preventDefault();
    let cart = [];
    for (let i = 0; i < this.state.cartItems.length; i++) {
      let item = this.state.cartItems[i];
      let product = {};
      product.productNumber = item.sku_id;
      product.quantity = item.count;
      cart.push(product);
      cart[`Product number: ${item.sku_id}`] = `${item.count} Pieces`;
    }
    alert(`YOU HAVE ${this.state.cartNum} ITEMS IN YOUR CART! : ${JSON.stringify(cart)}`);
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
      let currentEvent = {element: element, widget: 'Product Overview', time: date.toString()};
      this.post('/interactions', currentEvent);
      // this.state.clickAnalytics.push(currentEvent);
    }
    if (document.getElementById("productOverview") !== null) {
      document.getElementById("productOverview").addEventListener("click", eventObj);
      return () => {document.getElementById("productOverview").removeEventListener("click", eventObj);}
    }
  }

  reInit() {
    if (Object.keys(this.props.product).length) {
      const asyncSetState = (newState) => new Promise(resolve => this.setState(newState, resolve))
      this.get('/products')
      .then(data => {
        asyncSetState({
          products: data,
          product: this.props.product
        });
        this.get('/products/' + this.props.product.id + '/styles')
          .then(styles => {
            this.setState({
              styles: styles,
              photos: styles.results[0].photos,
              skus: styles.results[0].skus
            });
            this.get('/reviews/meta?product_id=' + this.props.product.id)
              .then(ratings => {

                asyncSetState({ratings: ratings});
              })
              this.get('/reviews?product_id=' + this.props.product.id)
                .then(reviews => {
                  this.setState({reviews: reviews.count})
                })
          })
          this.get('/cart')
            .then(cart => {
              this.setState({cartNum: Object.keys(cart).length, cartItems: cart})
            })
      })
    }
  }

  initialize() {
      this.get('/products')
        .then(data => {
          this.setState({
            products: data,
          });
          this.get('/products/' + this.props.product.id + '/styles')
            .then(styles => {
              this.setState({
                styles: styles,
                photos: styles.results[0].photos,
                skus: styles.results[0].skus
              });
              this.get('/reviews/meta?product_id=' + this.props.product.id)
                .then(ratings => {
                  const asyncSetState = (newState) => new Promise(resolve => this.setState(newState, resolve))
                  asyncSetState({ratings: ratings});
                })
                this.get('/reviews?product_id=' + this.props.product.id)
                  .then(reviews => {
                    this.setState({reviews: reviews.count})
                  })
            })
            this.get('/cart')
              .then(cart => {
                this.setState({cartNum: Object.keys(cart).length, cartItems: cart})
              })
        })
  }


  render() {
    if (this.props.product) {
      if (this.state.expanded) {
        return (
          <div  id="productOverview" onClick={this.clickAnalytics("productOverview")}>
            <h1 id="title">Welcome To Project Atelier &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;____________<SearchOutlined/>&nbsp;
            <ShoppingCartOutlined onClick={this.onCartClick}/>{this.state.cartNum}</h1>
            <p class="announce"><i>Site-Wide Announcement Message!</i>-- Sale / Discount <b>Offer</b>-<span style={{textDecoration: 'underline'}}>New Product Highlight</span></p>
            <div id="extendo">
              <ImageGallery Style={this.state.styles} Photos={this.state.photos} className="image" cToPExpand={this.childToParentExpand}/>
            </div>
          </div>
        )
      } else {
        return (
          <div  id="productOverview" onClick={this.clickAnalytics("productOverview")}>
            <h1 id="title">Welcome To Project Atelier &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;____________<SearchOutlined/>&nbsp;
            <ShoppingCartOutlined onClick={this.onCartClick}/>{this.state.cartNum}</h1>
            <p class="announce"><i>Site-Wide Announcement Message!</i>&nbsp;-- Sale/Discount <b>Offer</b> -- <span style={{textDecoration: 'underline'}}>New Product Highlight</span></p>
            <div id="container">
              <ImageGallery Style={this.state.styles} Photos={this.state.photos} className="image" cToPExpand={this.childToParentExpand}/>
              <div className="product">
                {this.stars(this.state)}
                <ProductInfo Product={this.props.product} Style={this.state.styles} Price={this.state.price}/>
                <Styles Style={this.state.styles} childToParent={this.childToParent}/>
                <AddToCart get={this.get} post={this.post} put={this.put} Style={this.state.styles} skus={this.state.skus}/>
              </div>
            </div>
          </div>
        )
      }
    } else {
      return (<div>Loading Product Page...</div>)
    }
  }
}

export default Product;