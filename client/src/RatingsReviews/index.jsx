import React from 'react';
import ReviewsList from './ReviewsList.jsx'
import Grid from '@mui/material/Grid';
import axios from 'axios';

class ReviewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      reviews: [
  {
    "review_id": 5,
    "rating": 3,
    "summary": "I'm enjoying wearing these shades",
    "recommend": false,
    "response": null,
    "body": "Comfortable and practical.",
    "date": "2019-04-14T00:00:00.000Z",
    "reviewer_name": "shortandsweeet",
    "helpfulness": 5,
    "photos": [{
        "id": 1,
        "url": "urlplaceholder/review_5_photo_number_1.jpg"
      },
      {
        "id": 2,
        "url": "urlplaceholder/review_5_photo_number_2.jpg"
      },
      // ...
    ]
  },
  {
    "review_id": 9,
    "rating": 5,
    "summary": "Just what I wanted",
    "recommend": true,
    "response": null,
    "body": "Comfortable and practical.",
    "date": "2019-04-14T00:00:00.000Z",
    "reviewer_name": "shortandsweeet",
    "helpfulness": 5,
    "photos": [{
        "id": 1,
        "url": "urlplaceholder/review_5_photo_number_1.jpg"
      },
      {
        "id": 2,
        "url": "urlplaceholder/review_5_photo_number_2.jpg"
      },
      // ...
    ]
  },
  {
    "review_id": 20,
    "rating": 1,
    "summary": "The shades caught on fire when I opened the box",
    "recommend": false,
    "response": null,
    "body": "Comfortable and practical.",
    "date": "2019-04-14T00:00:00.000Z",
    "reviewer_name": "shortandsweeet",
    "helpfulness": 5,
    "photos": [{
        "id": 1,
        "url": "urlplaceholder/review_5_photo_number_1.jpg"
      },
      {
        "id": 2,
        "url": "urlplaceholder/review_5_photo_number_2.jpg"
      },
      // ...
    ]
  }
]

    };
  }

  componentDidMount() {
    let endpoint = "/reviews";
    if(!this.props.product.product_id) {
      // console.log(`Reviews mounted. No product_id received for reviews. Will default to id 71697`);
      this.setState({
        product: { product_id: 71697 }}
        );
    } else {
      // console.log(`Reviews mounted. TODO: get reviews for product ${this.props.product.product_id}`)
    }
    // get reviews and update state
    let id = 71697
    let url = endpoint + "?product_id=" + id
    // console.log(`Will attempt to get reviews for url ${url}`)
    this.props.get(url)
      .then((response) => {
        // console.log(`reviews returned from api: ${response.results}`);
        // console.log(response.results);
        this.setState({
          reviews: response.results
        })
      });


    }



  render() {
    let reviews = this.state.reviews;
    return(
    <div>

      <Grid container spacing={2}>
          <Grid item xs={4} >
          <h4>RATINGS and REVIEWS</h4>
           <h2>3.5 stars</h2>
           110% of reviews recommend this product
           <div>5 stars: bar</div>
           <div>4 stars: bar</div>
           <div>3 stars: bar</div>
           <div>2 stars: bar</div>
           <div>1 stars: bar</div>
           <div>Some product specific rating</div>
           <div>Another product specific rating</div>
          </Grid>

          <Grid item xs={8} >
          <h5>{reviews.length} reviews, sorted by relevance</h5>
          <ReviewsList reviews={reviews}/>
          </Grid>

        </Grid>

    </div>
    )

  }
}

export default ReviewContainer;

