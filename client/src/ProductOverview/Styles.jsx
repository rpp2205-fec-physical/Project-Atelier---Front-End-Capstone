import React from 'react';
import './product.css';

class Styles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: '',
      count: 0,
      previous: '',
      clicked: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.myRef = React.createRef();
  }

  updateStyle() {
    if (Object.keys(this.props.Style).length && this.props.Style.results[0] && this.state.count < 1) {
      const asyncSetState = (newState) => new Promise(resolve => this.setState(newState, resolve)).then(() => {
        // this.state.clicked.style.borderStyle = "solid";
        // this.state.clicked.style.borderWidth = "4px";
        // this.state.clicked.style.borderColor = "skyblue";
      });
      asyncSetState({style: this.props.Style.results[0].name, clicked: this.props.Style.results[0]});
      this.state.count++;
    }
  }

  componentDidUpdate () {
    this.updateStyle();
  }

  handleClick(e) {
    e.preventDefault();
    const asyncSetState = (newState) => new Promise(resolve => this.setState(newState, resolve)).then(() => {
      this.state.previous.style.borderStyle = "none";
      this.state.clicked.style.borderStyle = "solid";
      this.state.clicked.style.borderWidth = "4px";
      this.state.clicked.style.borderColor = "skyblue";
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
              return <img src={style.photos[0].thumbnail_url} ref={this.myRef} key={style.style_id} data={style.style_id} className="style" onClick={this.handleClick} alt={style.name}></img>;
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