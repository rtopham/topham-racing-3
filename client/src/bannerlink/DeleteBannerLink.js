import React, {Component} from 'react'
import {Button, Tooltip, OverlayTrigger} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import auth from '../auth/auth-helper'
import {remove} from './api-bannerLink.js'
import DeleteBannerLinkModal from './DeleteBannerLinkModal'

class DeleteBannerLink extends Component {

  state = {
     open: false
  }

  clickButton = () => {
    this.setState({open: true})
  }
  deleteBanner = () => {

    const jwt = auth.isAuthenticated()
    remove({
      bannerId: this.props.bannerId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({open: false})
        this.props.reloadBanners(this.props.userId)
      }
    })
  }
  handleRequestClose = () => {
    this.setState({open: false})
  }
  render() {
  
    const deleteBannertip = (
      <Tooltip id="tooltip">
        <strong>Delete this Banner</strong>
      </Tooltip>
    );

    
    if (this.state.open){
      return <DeleteBannerLinkModal handleRequestClose={this.handleRequestClose} handleDelete={this.deleteBanner}/>
    }
    else return (
     <OverlayTrigger placement="left" overlay={deleteBannertip}>
      <Button variant="link" className="float-right" size="small" onClick={this.clickButton}>
      <FontAwesomeIcon icon={faTrash}/>
        </Button>
      </OverlayTrigger>
    )

  }
}

export default DeleteBannerLink
