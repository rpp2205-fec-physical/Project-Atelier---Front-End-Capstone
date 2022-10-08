import React from 'react';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    if (this.props.Style.results) {
      console.log('img url: ', this.props.Style.results[0].photos[0].url);

      return (
        <div>
          {this.props.Style.results[0].photos.map(photo => {
            return <img src={photo.url} width="200" height="300" key={photo.url}></img>;
          })}
          {/* <img src={this.props.Style.results[0].photos[0].url} width="250" height="400"></img> */}
        </div>
      )
    } else {
      return (
        <div>
          <h3>Insert Image Gallery Here...</h3>
        </div>
      )
    }
  }
}

export default ImageGallery;