import React from "react";
import Carousel from "./Carousel.jsx";
import { outfit } from '../lib/outfit';
import { TriggerOutfitLoadContext } from "../contexts/TriggerOutfitLoad";

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
      loadedRelated: true,
      loadedOutfit: false,
    };

    this.loadAllProductData = this.loadAllProductData.bind(this);
    this.throttlePromisified = this.throttlePromisified.bind(this);
    this.loadRelated = this.throttlePromisified(this, this.loadRelated);
    this.loadOutfit = this.throttlePromisified(this, this.loadOutfit);
    this.getRelatedProductData = this.getRelatedProductData.bind(this);
    this.getOutfitProductData = this.getOutfitProductData.bind(this);
    this.triggerOutfitLoad = this.triggerOutfitLoad.bind(this);
  }

  componentDidUpdate() {
    // console.log("DID UPDATE");
    if (!this.state.loadedRelated) {
      this.loadRelated();
    } else if (!this.state.loadedOutfit) {
      this.loadOutfit();
    } else if (
      this.props.product.id &&
      this.props.product.id !== this.state.productId
    ) {
      this.setState(
        {
          productId: this.props.product.id,
          loadedRelated: false,
        },
        () => {
          console.log("RelatedAndOutfit: UPDATING RELATED");
        }
      );
    } else if (outfit.updated) {
      outfit.resetUpdated();
      this.triggerOutfitLoad(() => {
        console.log("RelatedAndOutfit: UPDATING OUTFIT");
      });
    }
  }

  throttlePromisified(that, fn) {
    let isCalled = false;

    return () => {
      if (!isCalled) {
        isCalled = true;
        fn.call(that).then(() => {
          isCalled = false;
        });
      }
    };
  }

  loadAllProductData() {
    if (!this.state.productId) {
      return;
    }
    console.log("RelatedAndOutfit: LOADING PRODUCT DATA...");
    const newState = {};

    this.getRelatedProductData()
      .then((data) => {
        Object.assign(newState, data);
        return this.getOutfitProductData();
      })
      .then((data) => {
        Object.assign(newState, data);
        newState.loaded = true;
        return new Promise((resolve) =>
          this.setState(newState, resolve).bind(this)
        );
      })
      .then(() => {
        console.log("RelatedAndOutfit: DONE LOADING.");
        //this.render();
      })
      .catch((err) => {
        console.log("RelatedAndOutfit: Error during loadAllProductData", err);
      });
  }

  loadRelated() {
    if (!this.state.productId) {
      return Promise.resolve();
    }
    console.log("RelatedAndOutfit: LOADING RELATED PRODUCT DATA...");
    const newState = {};

    return this.getRelatedProductData()
      .then((data) => {
        Object.assign(newState, data);
        newState.loadedRelated = true;
        return new Promise((resolve) =>
          this.setState(newState, resolve).bind(this)
        );
      })
      .then(() => {
        console.log("RelatedAndOutfit: DONE LOADING RELATED PRODUCTS.");
      })
      .catch((err) => {
        console.log("RelatedAndOutfit: Error during loadRelated", err);
      });
  }

  loadOutfit() {
    if (!this.state.outfit) {
      return Promise.resolve();
    }
    console.log("RelatedAndOutfit: LOADING OUTFIT DATA...");
    const newState = {};

    return this.getOutfitProductData()
      .then((data) => {
        Object.assign(newState, data);
        newState.loadedOutfit = true;
        return new Promise((resolve) =>
          this.setState(newState, resolve).bind(this)
        );
      })
      .then(() => {
        console.log("RelatedAndOutfit: DONE LOADING OUTFIT.");
      })
      .catch((err) => {
        console.log("RelatedAndOutfit: Error during loadOutfit", err);
      });
  }

  getRelatedProductData() {
    const get = this.props.get;
    const data = {};

    return get("/products/" + this.state.productId + "/related")
      .then((relatedIDs) => {
        data.relatedIDs = relatedIDs;
        return Promise.all(relatedIDs.map((id) => get("/products/" + id)));
      })
      .then((relatedInfo) => {
        data.relatedInfo = relatedInfo;
        return Promise.all(
          data.relatedIDs.map((id) => get("/products/" + id + "/styles"))
        );
      })
      .then((relatedStyles) => {
        data.relatedStyles = relatedStyles;
        return Promise.all(
          data.relatedIDs.map((id) => get("/reviews/meta?product_id=" + id))
        );
      })
      .then((relatedReviewsMeta) => {
        data.relatedReviewsMeta = relatedReviewsMeta;
        return Promise.resolve(data);
      })
      .catch((err) => {
        console.log("RelatedAndOutfit: Error in getRelatedProductData", err);
      });
  }

  getOutfitProductData(newOutfit) {
    const get = this.props.get;
    const outfit = newOutfit || this.state.outfit;
    const data = {outfit};

    return Promise.all(outfit.map((id) => get("/products/" + id)))
      .then((outfitInfo) => {
        data.outfitInfo = outfitInfo;
        return Promise.all(
          outfit.map((id) => get("/products/" + id + "/styles"))
        );
      })
      .then((outfitStyles) => {
        data.outfitStyles = outfitStyles;
        return Promise.all(
          outfit.map((id) => get("/reviews/meta?product_id=" + id))
        );
      })
      .then((outfitReviewsMeta) => {
        data.outfitReviewsMeta = outfitReviewsMeta;
        return Promise.resolve(data);
      })
      .catch((err) => {
        console.log("RelatedAndOutfit: Error in getOutfitProductData", err);
      });
  }

  triggerOutfitLoad(newState, callback) {
    if (this.state.loadedOutfit) {
      newState.loadedOutfit = false;
      this.setState(
        newState,
        callback
      );
    }
  }

  render() {
    return (
      <TriggerOutfitLoadContext.Provider value={this.triggerOutfitLoad}>
        {!this.state.loadedRelated ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div>
              <h4>Related Products</h4>
              <Carousel
                mainProduct={this.props.product}
                items={this.state.relatedInfo}
                styles={this.state.relatedStyles}
                reviewsMeta={this.state.relatedReviewsMeta}
              />
            </div>
            {this.state.loadedOutfit && this.state.outfit.length ? (
              <div>
                <h4>Your Outfit</h4>
                <Carousel
                  mainProduct={this.props.product}
                  items={this.state.outfitInfo}
                  styles={this.state.outfitStyles}
                  reviewsMeta={this.state.outfitReviewsMeta}
                />
              </div>
            ) : null}
          </div>
        )}
      </TriggerOutfitLoadContext.Provider>
    );
  }
}
