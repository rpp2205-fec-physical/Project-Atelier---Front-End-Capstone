import React from 'react';
import './product.css';

class Styles extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    let id = e.target.getAttribute('data');
    for (let i = 0; i < this.props.Style.results.length; i++) {
      if (this.props.Style.results[i].style_id.toString() === id.toString()) {
        // console.log('success');
        this.props.childToParent(this.props.Style.results[i]);
      }

    }
  }

  render() {
    if (this.props.Style) {
      if (Array.isArray(this.props.Style.results)) {

        return (
          <div>
            <h4>Styles</h4>
            {this.props.Style.results.map(style => {
            return <img src={style.photos[0].thumbnail_url} key={style.style_id} data={style.style_id} className="style" onClick={this.handleClick}></img>;
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