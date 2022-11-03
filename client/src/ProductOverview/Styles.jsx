import React from 'react';
import './product.css';

class Styles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: '',
      count: 0,
      previous: '',
      clicked: '',
      firstOutline: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    // this.componentDidUpdate = this.componentDidUpdate.bind(this);
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
    const asyncSetState = (newState) => new Promise(resolve => this.setState(newState, resolve)).then(() => {
      this.state.clicked.style.borderStyle = "solid";
      this.state.clicked.style.borderWidth = "5px";
      this.state.clicked.style.borderColor = "skyblue";
    });
    if (this.props.Style.results && !this.state.firstOutline) {
      let id = this.props.Style.results[0].style_id.toString();
      if (document.getElementById(id) !== null) {
        asyncSetState({clicked: document.getElementById(id), firstOutline: !this.state.firstOutline})
      }
    }
  }

  handleClick(e) {
    e.preventDefault();
    const asyncSetState = (newState) => new Promise(resolve => this.setState(newState, resolve)).then(() => {
      this.state.previous.style.borderStyle = "none";
      this.state.clicked.style.borderStyle = "solid";
      this.state.clicked.style.borderWidth = "5px";
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
    if (this.props.Style) {
      if (Array.isArray(this.props.Style.results)) {
        return (
          <div>
            <h4>Styles > {this.state.style}</h4>
            {this.props.Style.results.map(style => {
              return <img src={style.photos[0].thumbnail_url} id={style.style_id} key={style.style_id} data={style.style_id} className="style" onClick={this.handleClick} alt={style.name}></img>;
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