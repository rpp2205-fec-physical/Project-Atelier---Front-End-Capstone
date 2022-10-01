import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.initialize = this.initialize.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  initialize() {
    $.ajax({
      method: 'GET',
      url: '/api/products',
      contentType: 'application/json'
    })
  }

  render() {
    <div>
      <h1>Welcome To Project Atelier</h1>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('root'));