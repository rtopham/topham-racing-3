import React, {Component} from 'react'
import {Card, Button,FormGroup} from "react-bootstrap"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faImage, faExclamation} from '@fortawesome/free-solid-svg-icons'
import {create} from './api-bannerLink.js'
import auth from '../auth/auth-helper.js'
import "./Banner.css"

class NewBannerLink extends Component {
  state = {
    photo: '',
    error: '',
    user: {}
  }

  componentDidMount = () => {
    this.bannerLinkData = new FormData()
    this.setState({user: auth.isAuthenticated().user})
  }
  clickUploadBanner = () => {
    const jwt = auth.isAuthenticated()
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, this.bannerLinkData).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({photo: ''})
        this.props.reloadBanners(data.postedBy._id)
      }
    })
  }
  handleChange = name => event => {
    const value = name === 'photo'
      ? event.target.files[0]
      : event.target.value
    this.bannerLinkData.set(name, value)
    this.setState({ [name]: value })
  }
  render() {

    return (<div className="NewBanner">
      <Card>
      <Card.Header>
    <Card.Title>Upload New Banner Link</Card.Title>
            
      </Card.Header>    
      <Card.Body>
        <FormGroup className="NewPhoto">
        <input accept="image/*" onChange={this.handleChange('photo')} id="icon-button-file-2" type="file" />
        <label htmlFor="icon-button-file-2">
        <Button variant="link" className="upload-photo-buttons" as="span">
        <FontAwesomeIcon size="2x" icon={faImage}/>
        </Button>
        
        </label>
        
{/*
        <input accept="image/*" onChange={this.handleChange('photo')} id="icon-button-file-2" type="file" />
        <label htmlFor="icon-button-file-2">

        <span><Button as="span">
        <FontAwesomeIcon icon={faCamera}/> 
          </Button></span>
           </label>
*/}          
       
        
        <span className="NewBannerFileName" >{this.state.photo ? this.state.photo.name : ''}</span>

        </FormGroup>
        <FormGroup>
        { this.state.error && (<span>
          <FontAwesomeIcon icon={faExclamation}/>{this.state.error}</span>)
        }
        </FormGroup>
      </Card.Body>
      <Card.Footer>
        <Button color="primary" disabled={this.state.photo===''} onClick={this.clickUploadBanner} className="">Upload</Button>
        </Card.Footer>
    </Card>
  </div>)
  }
}

export default NewBannerLink
