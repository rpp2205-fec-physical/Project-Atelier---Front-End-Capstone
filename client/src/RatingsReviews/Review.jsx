import React from 'react';


class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let review = this.props.review;
    return (
    <div>
      {review.rating} stars from {review.reviewer_name}, {review.date}
      <h3>Review: "{review.summary}"</h3>
      <p>
        {review.body}
      </p>
      Helpful? Yes ({review.helpfulness}) | Report
      <p>-------------------</p>
    </div>
    );

  }
}

export default Review;
// {
//   "review_id": 5,
//   "rating": 3,
//   "summary": "I'm enjoying wearing these shades",
//   "recommend": false,
//   "response": null,
//   "body": "Comfortable and practical.",
//   "date": "2019-04-14T00:00:00.000Z",
//   "reviewer_name": "shortandsweeet",
//   "helpfulness": 5,
//   "photos": [{
//       "id": 1,
//       "url": "urlplaceholder/review_5_photo_number_1.jpg"
//     },
//     {
//       "id": 2,
//       "url": "urlplaceholder/review_5_photo_number_2.jpg"
//     },
//     // ...
//   ]
// },