import React from 'react';

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
            return <img src={style.photos[0].thumbnail_url} height="70" width="70" key={style.style_id}></img>;
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