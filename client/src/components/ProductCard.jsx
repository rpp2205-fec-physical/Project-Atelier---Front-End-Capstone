import React from 'react';
import Stars from './Stars.jsx';
import { Card, CardContent, CardMedia, CardActionArea, Typography } from '@mui/material';

const ProductCard = (props) => {
  const item = props.item;
  const styles = props.getStyles(item.id);
  let defaultStyle;
  const ratings = props.getReviewMeta(item.id).ratings;

  for (style of styles.results) {
    if (style['default?']) {
      defaultStyle = style;
      break;
    }
  }

  if (!defaultStyle) {
    defaultStyle = styles.results[0];
  }

  return (
    <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={defaultStyle.photos[0].url}
          alt={defaultStyle.name}
        />
        <CardContent>
          <Typography variant="overline" component="div">
            {item.catagory}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {defaultStyle.original_price}
          </Typography>
          <Stars ratings={ratings} />
        </CardContent>
      </CardActionArea>
  );
};

export default ProductCard;