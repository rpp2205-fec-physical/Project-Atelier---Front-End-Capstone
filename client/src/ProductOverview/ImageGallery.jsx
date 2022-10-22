import React from 'react';
import './product.css';


class ImageGallery extends React.Component {
	constructor (props) {
		super(props);
    this.props = props;
		this.state = {
			currentImageIndex: 0
		};
		this.nextSlide = this.nextSlide.bind(this);
		this.previousSlide = this.previousSlide.bind(this);
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

	render () {
    if (this.props.Photos.length) {
      const imgUrls =
      this.props.Photos.map(photo => {
        return photo.url;
      })
      return (
        <div className="carousel">
          <Arrow direction="left" clickFunction={ this.previousSlide } glyph="&#9664;" />
          <ImageSlide url={ imgUrls[this.state.currentImageIndex] } alt="outfit"/>
          <Arrow direction="right" clickFunction={ this.nextSlide } glyph="&#9654;" />
        </div>
      );
    } else {
      return (
        <div>
          <h3>Insert Image Gallery Here...</h3>
        </div>
      )
    }
	}
}

const Arrow = ({ direction, clickFunction, glyph }) => (
	<div
		className={ `slide-arrow ${direction}` }
		onClick={ clickFunction }>
		{ glyph }
	</div>
);

const ImageSlide = ({ url }) => {
  const styles = {
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div className="image-slide" style={styles}></div>
  );
}



export default ImageGallery;