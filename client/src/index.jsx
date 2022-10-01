import React from 'react';
import ReactDOM from 'react-dom';
import ReviewContainer from './RatingsReviews/index.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <h1>Project Atelier</h1>
        <ReviewContainer />
      </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('root'));