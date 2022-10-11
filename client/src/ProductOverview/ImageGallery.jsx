import React from 'react';

// const Arrow = ({ direction, clickFunction, glyph }) => (
//   <div
//     className={ `slide-arrow ${direction}` }
//     onClick={ clickFunction }>
//     { glyph }
//   </div>
// );

// const ImageSlide = ({ url }) => {
//   const styles = {
//     backgroundImage: `url(${url})`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center'
//   };

//   return (
//     <div className="image-slide" style={styles}></div>
//   );
// }

// class ImageGallery extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentImageIndex: 0
//     };
//     this.nextSlide = this.nextSlide.bind(this);
//     this.previousSlide = this.previousSlide.bind(this);
//   }

//   previousSlide () {
//     const lastIndex = this.props.Style.results[0].photos.length - 1;
//     const { currentImageIndex } = this.state;
//     const shouldResetIndex = currentImageIndex === 0;
//     const index =  shouldResetIndex ? lastIndex : currentImageIndex - 1;

//     this.setState({
//       currentImageIndex: index
//     });
//   }

//   nextSlide () {
//     const lastIndex = this.props.Style.results[0].photos.length - 1;
//     const { currentImageIndex } = this.state;
//     const shouldResetIndex = currentImageIndex === lastIndex;
//     const index =  shouldResetIndex ? 0 : currentImageIndex + 1;

//     this.setState({
//       currentImageIndex: index
//     });
//   }

//   render() {
//     if (this.props.Style.results) {
//       console.log('img url: ', this.props.Style.results[0].photos[0].url);

//       return (
//         <div>
//           {/* <img src={this.props.Style.results[0].photos[0].url} width="300" height="450" key="main-image"></img>
//           {this.props.Style.results[0].photos.map(photo => {
//             return <img src={photo.url} width="100" height="150" key={photo.url}></img>;
//           })} */}
//           {/* <img src={this.props.Style.results[0].photos[0].url} width="250" height="400"></img> */}

//           <div className="carousel">
//           <Arrow
//           direction="left"
//           clickFunction={ this.previousSlide }
//           glyph="&#9664;" />
//           {this.props.Style.results[0].photos.map(photo => {
//             return <ImageSlide url={photo.url} key={photo.url}/>
//           })}
//          <Arrow
//           direction="right"
//           clickFunction={ this.nextSlide }
//           glyph="&#9654;" />
//           </div>
//         </div>

//       )
//     } else {
//       return (
//         <div>
//           <h3>Insert Image Gallery Here...</h3>
//         </div>
//       )
//     }
//   }
// }



class ImageGallery extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			currentImageIndex: 0
		};
		this.nextSlide = this.nextSlide.bind(this);
		this.previousSlide = this.previousSlide.bind(this);
	}

	previousSlide () {
    const imgUrls =
    this.props.Style.results[0].photos.map(photo => {
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
    this.props.Style.results[0].photos.map(photo => {
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
    if (this.props.Style.results) {
      const imgUrls =
      this.props.Style.results[0].photos.map(photo => {
        return photo.url;
      })
      return (
        <div className="carousel">
          <Arrow direction="left" clickFunction={ this.previousSlide } glyph="&#9664;" />
          <ImageSlide url={ imgUrls[this.state.currentImageIndex] } />
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
		className={ `slide-arrow.${direction}` }
		onClick={ clickFunction }>
		{ glyph }
	</div>
);

const ImageSlide = ({ url }) => {
	return (
		<div className="image-slide" >
      <img src={url} key={url} width="280" height="400"></img>
    </div>
	);
}



export default ImageGallery;