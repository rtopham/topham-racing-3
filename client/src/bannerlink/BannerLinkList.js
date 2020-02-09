import React, {Component} from 'react'
import BannerLinkRow from './BannerLinkRow'

class BannerLinkList extends Component {

render() {

return (
      
        this.props.banners.map((item, i) => {

          return<BannerLinkRow className="modal-container" banner={item} key={i} reloadBanners={this.props.reloadBanners} />
                             
          })
      
    )
  }
}

export default BannerLinkList
