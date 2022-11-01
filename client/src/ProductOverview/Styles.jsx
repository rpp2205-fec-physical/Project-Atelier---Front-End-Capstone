import React from 'react';
import './product.css';

class Styles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: 'Forest Green & Black',
      previous: '<img src="https://images.unsplash.com/photo-1514866726862-0f081731e63f?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=300&amp;q=80" data="444223" class="style" alt="Dark Grey &amp; Black" style="border-style: none;">',
      clicked: '<img src="https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=300&amp;q=80" data="444218" class="style" alt="Forest Green &amp; Black  style="border-style: solid">'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const asyncSetState = (newState) => new Promise(resolve => this.setState(newState, resolve)).then(() => {
      this.state.previous.style.borderStyle = "none";
      this.state.clicked.style.borderStyle = "solid";
    });
    let prev = this.state.clicked;
    asyncSetState({previous: prev, clicked: e.target})
    let id = e.target.getAttribute('data');
    for (let i = 0; i < this.props.Style.results.length; i++) {
      if (this.props.Style.results[i].style_id.toString() === id.toString()) {
        this.setState({style: this.props.Style.results[i].name})
        this.props.childToParent(this.props.Style.results[i]);
      }
    }
  }


  render() {
    if (this.props.Style && this.state.clicked) {
      if (Array.isArray(this.props.Style.results)) {
        return (
          <div>
            <h4>Styles > {this.state.style}</h4>
            {this.props.Style.results.map(style => {
              return <img src={style.photos[0].thumbnail_url} key={style.style_id} data={style.style_id} className="style" onClick={this.handleClick} alt={style.name}></img>;
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