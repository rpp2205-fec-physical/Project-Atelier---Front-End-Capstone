import './Stars.css';
import React from 'react';
import Rating from '@mui/material/Rating';

/**
 ****** STARS COMPONENT ******
 *
 *    example: <Stars stars="3.45" />
 *
 *    PROPS:
 *      'stars'   : a number : a readOnly Stars component will be returned showing that many stars
 *      'ratings' : an object : the average rating will be computed and a readOnly component will be returned
 *
 * - TODO: If a handler function is passed as a prop, returns a user-selectable Stars component
 *
 */

const getAverageRating = (ratings) => {
  let stars = 1;
  let totalRatings = 0;
  let sum = 0;

  while (stars <= 5) {
    sum += stars * ratings[stars];
    totalRatings += ratings[stars];

    stars++;
  }

  return sum / totalRatings;
};

const Stars = (props) => {
  if (props.stars) {
    const rating = parseFloat(props.stars);
  } else if (props.ratings) {
    const rating = getAverageRating(props.ratings);
  }

  return (<>
    <Rating value={rating} precision={0.25} readOnly />
  </>);
};

export default Stars;