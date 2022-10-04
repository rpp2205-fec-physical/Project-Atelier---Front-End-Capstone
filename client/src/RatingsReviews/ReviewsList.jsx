import React from 'react';
import Review from './Review.jsx';




class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

  }

  render() {
    const reviews = this.props.reviews;
    const reviewItems = reviews.map((review) => {
      return <Review />
    })
    return (
      <div>
          {reviews.map((review) => {
            return <Review key={review.review_id.toString()} review={review}/>
          })}
      </div>
    )
  }

}

export default ReviewsList;