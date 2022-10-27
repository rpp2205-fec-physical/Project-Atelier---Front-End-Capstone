import React from 'react';
import './product.css';
import {ExpandOutlined} from '@ant-design/icons';


class ImageGallery extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			currentImageIndex: 0,
      expanded: false
		};
		this.nextSlide = this.nextSlide.bind(this);
		this.previousSlide = this.previousSlide.bind(this);
    this.expand = this.expand.bind(this);
	}

	previousSlide () {
    const imgUrls =
    this.props.Photos.map(photo => {
      return photo.url;
    })
		const lastIndex = imgUrls.length - 1;
		const { currentImageIndex } = this.state;
		const shouldResetIndex = currentImageIndex === 0;
		const index =  shouldResetIndex ? lastIndex : currentImageIndex - 1;

		this.setState({
			currentImageIndex: index
		});
	}

	nextSlide () {
    const imgUrls =
    this.props.Photos.map(photo => {
      return photo.url;
    })
		const lastIndex = imgUrls.length - 1;
		const { currentImageIndex } = this.state;
		const shouldResetIndex = currentImageIndex === lastIndex;
		const index =  shouldResetIndex ? 0 : currentImageIndex + 1;

		this.setState({
			currentImageIndex: index
		});
	}

  expand () {
    this.setState({expanded: !this.state.expanded})
    this.props.cToPExpand(!this.state.expanded);
  }

  Arrow ({ direction, clickFunction, glyph }) {
   return( <div
      className={ `slide-arrow ${direction}` }
      onClick={ clickFunction }>
      { glyph }
    </div>
  )}

  ImageSlide( {url} ) {
    const styles = {
      backgroundImage: `url(${url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    };
    return (
      <div className="image-slide" style={styles}></div>
    );
  }

  ImageSlideExpanded( {url} ) {
    const styles = {
      backgroundImage: `url(${url})`,
      // backgroundSize: 'cover',
      backgroundPosition: 'center'
    };
    return (
      <div className="image-slide-expand" style={styles}></div>
    );
  }

	render () {
    if (this.props.Photos.length) {
      const imgUrls =
      this.props.Photos.map(photo => {
        return photo.url;
      })
      if (this.state.expanded) {
        return (
          <div className="carousel">
            <this.Arrow direction="left" clickFunction={ this.previousSlide } glyph="&#9664;" />
            <this.ImageSlideExpanded url={ imgUrls[this.state.currentImageIndex] } alt="outfit"/>
            <ExpandOutlined className="expand" onClick={this.expand}/>
            <this.Arrow direction="right" clickFunction={ this.nextSlide } glyph="&#9654;" />
          </div>
        );
      } else {
        return (
          <div className="carousel">
            <this.Arrow direction="left" clickFunction={ this.previousSlide } glyph="&#9664;" />
            <this.ImageSlide url={ imgUrls[this.state.currentImageIndex] } alt="outfit"/>
            <ExpandOutlined className="expand" onClick={this.expand}/>
            <this.Arrow direction="right" clickFunction={ this.nextSlide } glyph="&#9654;" />
          </div>
        );
      }
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