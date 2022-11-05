import React from 'react';
import './product.css';
import {ExpandOutlined, LeftSquareFilled, RightSquareFilled, ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons';


class ImageGallery extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			currentImageIndex: 0,
      current: '',
      expanded: false,
      clickedURL: '',
      thumbClick: false
		};
		this.nextSlide = this.nextSlide.bind(this);
		this.previousSlide = this.previousSlide.bind(this);
    this.expand = this.expand.bind(this);
    this.ImageSlide = this.ImageSlide.bind(this);
    this.Thumbnails = this.Thumbnails.bind(this);
    this.ArrowL = this.ArrowL.bind(this);
    this.ArrowR = this.ArrowR.bind(this);
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
    let expandClass = this.state.expanded ? `slide-arrow-expand ${direction}` : `slide-arrow ${direction}`;
    return( <div
       className={ expandClass }
       onClick={ clickFunction }>
       <LeftSquareFilled />
     </div>
   )
  }

   ArrowR ({ direction, clickFunction }) {
    let expandClass = this.state.expanded ? `slide-arrow-expand ${direction}` : `slide-arrow ${direction}`;
    return( <div
       className={ expandClass }
       onClick={ clickFunction }>
       <RightSquareFilled />
     </div>
   )
  }

  ImageSlide( {url} ) {
    const pos = { x : 0, y : 0 };
    const saveCursorPosition = function(x, y) {
        pos.x = (x / window.innerWidth).toFixed(2);
        pos.y = (y / window.innerHeight).toFixed(2);
        document.documentElement.style.setProperty('--x', pos.x);
        document.documentElement.style.setProperty('--y', pos.y);
    }
    document.addEventListener('mousemove', e => { saveCursorPosition(e.clientX, e.clientY); })
    const styles = {
      backgroundImage: `url(${url})`,
      // backgroundSize: 'cover',
      backgroundPosition: 'center'
    };
    let imageClass = this.state.expanded ? "image-slide-expand" : "image-slide"
    return (
      <div className={imageClass} style={styles}>
          <this.Thumbnails />
      </div>
    );
  }

  Thumbnails() {
    const imgUrls =
    this.props.Photos.map(photo => {
      return photo.url;
    })
    let thumbSet = (e) => {
      const asyncSetState = (newState) => new Promise(resolve => this.setState(newState, resolve)).then(() => {
        e.target.style.borderBottom = "thin solid";
        e.target.style.borderWidth = "4px";
        e.target.style.borderColor = "skyblue";
        this.state.previous.style.borderStyle = "none";
        this.state.clickedURL.style.borderBottom  = "thin solid";
        this.state.clickedURL.style.borderWidth = "4px";
        this.state.clickedURL.style.borderColor = "skyblue";
      });
      let prev = this.state.current;
      console.log('prev:', prev);
      asyncSetState({clickedURL: e.target.getAttribute('data'), thumbClick: true, previous: prev, current: e.target});
      this.state.previous.style.borderStyle = "none";
    }
    if (this.props.Photos.length > 6) {
      let photos = this.props.Photos.slice(0, 6);
      return (
        <div className="thumbContainer">
          {/* <ArrowUpOutlined class="arrow-up"/> */}
          {photos.map(photo => {
            return (
              <div>
                <img src={photo.thumbnail_url} className="thumbnail" data={photo.url} key={photo.url} alt="thumbnail" onClick={thumbSet}></img>
              </div>
            )
          })}
          {/* <ArrowDownOutlined class="arrow-down"/> */}
        </div>
      );
    } else {
      return (
        <div className="thumbContainer">
          {this.props.Photos.map(photo => {
            return (
              <div>
                <img src={photo.thumbnail_url} className="thumbnail" data={photo.url} key={photo.url} alt="thumbnail" onClick={thumbSet}></img>
              </div>
            )
          })}
        </div>
      );
    }

  }

	render () {
    if (this.props.Photos.length) {
      const imgUrls =
      this.props.Photos.map(photo => {
        return photo.url;
      })

      let expandClass = this.state.expanded ? "expand" : "collapse"
      if(this.state.thumbClick) {
        let index = imgUrls.indexOf(this.state.clickedURL);
        console.log('img index', index);
          return (
            <div className="carousel">
              <this.ArrowL  direction="left"  clickFunction={ this.previousSlide } />
              <this.ImageSlide url={ imgUrls[index] } alt="outfit"/>
              <ExpandOutlined className={expandClass} onClick={this.expand}/>
              <this.ArrowR  direction="right" clickFunction={ this.nextSlide } />
            </div>
          );

      } else {
        return (
          <div className="carousel">
            <this.ArrowL direction="left" clickFunction={ this.previousSlide } />
            <this.ImageSlide url={ imgUrls[this.state.currentImageIndex] } alt="outfit"/>
            <ExpandOutlined className={expandClass} onClick={this.expand}/>
            <this.ArrowR  direction="right" clickFunction={ this.nextSlide } />
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