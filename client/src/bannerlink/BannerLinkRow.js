import React, {Component} from 'react'
import DeleteBanner from './DeleteBannerLink'
import "./Banner.css"

class BannerLinkRow extends Component {

render() {
//console.log(process.env.REACT_APP_URL_PREFIX)
//console.log(process.env.NODE_ENV)
//const urlPrefix=(process.env.NODE_ENV==='development')? 'http://192.168.1.130:3001/banners/' : '/banners/'
//const urlPrefix=(process.env.NODE_ENV==='development')? process.env.REACT_APP_URL_PREFIX : '/banners/' 

//console.log(urlPrefix)
//const imgUrl='http://192.168.1.130:3001/banners/'+this.props.banner.filename
const imgUrl= '/banners/'+this.props.banner.filename

const divStyle={
  height: "220px",
  width: "100%",
  backgroundImage: 'url(' + imgUrl + ')',
  backgroundSize: "cover",
  marginBottom: "20px"
}

 return (
        <div style={divStyle}>
        <DeleteBanner userId={this.props.banner.postedBy._id} bannerId={this.props.banner._id} reloadBanners={this.props.reloadBanners}/> 
        </div>
     
    )
  }


}

export default BannerLinkRow
