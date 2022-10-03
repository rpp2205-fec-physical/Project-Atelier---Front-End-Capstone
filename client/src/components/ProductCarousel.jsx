import React from 'react';
import Carousel from 'react-material-ui-carousel';

import ProductCard from './ProductCard.jsx';

const ProductCarousel = (props) => {
  const products = props.products;

  return (
    <Carousel>
      {products.map((item, i) =>
        <ProductCard key={i} item={item} getStyles={getStyles} getReviewMeta={getReviewMeta} />
      )}
    </Carousel>
  );
};

export default ProductCarousel;