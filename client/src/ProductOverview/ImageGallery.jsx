import React from 'react';
import './product.css';
import {ExpandOutlined, LeftSquareFilled, RightSquareFilled} from '@ant-design/icons';


class ImageGallery extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			currentImageIndex: 0,
      expanded: false,
      clickedURL: '',
      thumbClick: false
		};
		this.nextSlide = this.nextSlide.bind(this);
		this.previousSlide = this.previousSlide.bind(this);
    this.expand = this.expand.bind(this);
    this.ImageSlide = this.ImageSlide.bind(this);
    this.ImageSlideExpanded = this.ImageSlideExpanded.bind(this);
    this.Thumbnails = this.Thumbnails.bind(this);
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
			currentImageIndex: index,
      thumbClick: false
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
			currentImageIndex: index,
      thumbClick: false
		});
	}

  expand () {
    this.setState({expanded: !this.state.expanded})
    this.props.cToPExpand(!this.state.expanded);
  }


  ArrowL ({ direction, clickFunction }) {
    return( <div
       className={ `slide-arrow ${direction}` }
       onClick={ clickFunction }>
       <LeftSquareFilled />
     </div>
   )}

   ArrowR ({ direction, clickFunction }) {
    return( <div
       className={ `slide-arrow ${direction}` }
       onClick={ clickFunction }>
       <RightSquareFilled />
     </div>
   )}

  ImageSlide( {url} ) {
    const styles = {
      backgroundImage: `url(${url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    };
    return (
      <div className="image-slide" style={styles}>
        <this.Thumbnails />
        {/* <div  style={styles}></div> */}
      </div>
    );
  }

  ImageSlideExpanded( {url} ) {
    const styles = {
      backgroundImage: `url(${url})`,
      // backgroundSize: 'cover',
      backgroundPosition: 'center'
    };
    return (
      <div className="image-slide-expand" style={styles}>
        <this.Thumbnails />
        {/* <div  style={styles}></div> */}
      </div>
    );
  }

  Thumbnails() {
    return (
      <div className="thumbContainer">
        {this.props.Photos.map(photo => {
          return (
            <div>
              <img src={photo.url} className="thumbnail" key={photo.url} alt="thumbnail" onClick={(e) => {this.setState({clickedURL: e.target.src, thumbClick: true})}}></img>
            </div>
          )
        })}
      </div>
    );
  }

	render () {
    if (this.props.Photos.length) {
      const imgUrls =
      this.props.Photos.map(photo => {
        return photo.url;
      })

      if(this.state.thumbClick) {
        if (this.state.expanded) {
          return (
            <div className="carousel">
              <this.ArrowL direction="left" clickFunction={ this.previousSlide } />
              <this.ImageSlideExpanded url={ this.state.clickedURL } alt="outfit"/>
              <ExpandOutlined className="expand" onClick={this.expand}/>
              <this.ArrowR direction="right" clickFunction={ this.nextSlide } />
            </div>
          );
        } else {
          return (
            <div className="carousel">
              {/* <div className="thumbContainer">
                {this.props.Photos.map(photo => {
                  return <img src={photo.url} class="thumbnail"></img>
                })}
              </div> */}
              <this.ArrowL direction="left" clickFunction={ this.previousSlide } />
              <this.ImageSlide url={ this.state.clickedURL } alt="outfit"/>
              <ExpandOutlined className="expand" onClick={this.expand}/>
              <this.ArrowR direction="right" clickFunction={ this.nextSlide } />
            </div>
          );
        }
      } else {
        if (this.state.expanded) {
          return (
            <div className="carousel">
              <this.ArrowL direction="left" clickFunction={ this.previousSlide } />
              <this.ImageSlideExpanded url={ imgUrls[this.state.currentImageIndex] } alt="outfit"/>
              <ExpandOutlined className="expand" onClick={this.expand}/>
              <this.ArrowR direction="right" clickFunction={ this.nextSlide }/>
            </div>
          );
        } else {
          return (
            <div className="carousel">
              {/* <div className="thumbContainer">
                {this.props.Photos.map(photo => {
                  return <img src={photo.url} class="thumbnail"></img>
                })}
              </div> */}
              <this.ArrowL direction="left" clickFunction={ this.previousSlide } />
              <this.ImageSlide url={ imgUrls[this.state.currentImageIndex] } alt="outfit"/>
              <ExpandOutlined className="expand" onClick={this.expand}/>
              <this.ArrowR direction="right" clickFunction={ this.nextSlide } />
            </div>
          );
        }
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