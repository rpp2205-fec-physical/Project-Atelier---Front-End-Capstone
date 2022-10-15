import React from 'react';
import './product.css';

class Styles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.Style) {
      if (Array.isArray(this.props.Style.results)) {

        return (
          <div>
            <h4>Styles</h4>
            {this.props.Style.results.map(style => {
            return <img src={style.photos[0].thumbnail_url} key={style.style_id} class="style"></img>;
          })}
          </div>
        )
      } else {
        return (
          <div>
            <h3>Styles are loading...</h3>
          </div>
        )
      }
    } else {
      return (
        <div>
          <h3>Styles are loading...</h3>
        </div>
      )

    }
  }
}

export default Styles;