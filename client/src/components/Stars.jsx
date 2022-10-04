import './Stars.css';
import React from 'react';

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

const renderStars = (numStars) => {
  const element = [];
  for (let i = 1; i <= 5; i++) {
    if (numStars >= 1) {
      element.push('/assets/star-solid.svg');
      numStars--;
    } else if (numStars > 0) {
      switch (numStars) {
        case 0.25:
          element.push('/assets/star-1quarter.svg');
          numStars -= 0.25;
          break;

        case 0.5:
          element.push('/assets/star-half.svg');
          numStars -= 0.5;
          break;

        case 0.75:
          element.push('/assets/star-3quarter.svg');
          numStars -= 0.75;
          break;

        default:
          console.log("something went wrong with the Stars");
      }
    } else {
      element.push('/assets/star-regular.svg');
    }
  }
  return element;
};

const Stars = (props) => {
  const height = props.height || '15em';
  let rating;
  if (props.stars) {
    rating = parseFloat(props.stars);
  } else if (props.ratings) {
    rating = getAverageRating(props.ratings);
  }
  let numStars = (Math.round(rating * 4) / 4).toFixed(2);

  return (
    <span className="rating">
      {renderStars(numStars).map((path, i) => <img key={i} className="star" src={path} height={height} />)}
    </span>
  );
};

export default Stars;