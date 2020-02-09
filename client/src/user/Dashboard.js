import React, {Component} from 'react'
import {Card, ListGroup, Button, ButtonGroup, Accordion} from "react-bootstrap"
import {LinkContainer} from 'react-router-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import {Redirect} from 'react-router-dom'
import RaceListNoCard from './../race/RaceListNoCard'
import NewRace from './../race/NewRace'
import EditProfile from './../user/EditProfile'
import {listByUser} from './../race/api-race.js'
import {listBannersByUser} from '../banner/api-banner'
import {listBannerLinksByUser} from '../bannerlink/api-bannerLink'
//import NewBanner from './../banner/NewBanner'
import NewBannerLink from '../bannerlink/NewBannerLink'
//import BannerList from './../banner/BannerList'
import BannerLinkList from './../bannerlink/BannerLinkList'
import "./Users.css"

class Dashboard extends Component {
  constructor({match}) {
    super()
    this.state = {
      user: {},
      redirectToSignin: false,
      races: [],
      banners:[],
      bannerLinks:[],
      loadingRaces:true,
      loadingBanners:true,
      loadingBannerLinks:true
    }
    this.match = match
  }
  init = (userId) => {
    const jwt = auth.isAuthenticated()
    read({
      userId: userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({redirectToSignin: true})
      } else {
        this.setState({user: data})
        this.loadRaces(data._id)
        this.loadBanners(data._id)
       }
    })
  }
  componentWillReceiveProps = (props) => {
    this.init(props.match.params.userId)
  }
  componentDidMount = () => {
    this.init(this.match.params.userId)
  }

  loadRaces = (user) => {
    const jwt = auth.isAuthenticated()
    listByUser({
      userId: user
    }, {
      t: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        
        this.setState({races: data, loadingRaces:false})
      }
    })
  }
  //is this even called? or did we put removeRace somewhere else? Actually, I think we just reload the whole list after delete so this is not needed.
  removeRace = (race) => {
    const updatedRaces = this.state.races
    const index = updatedRaces.indexOf(race)
    updatedRaces.splice(index, 1)
    this.setState({races: updatedRaces})
  }

loadBanners = (user)=>{
this.loadBannerLinks(user)
//this.loadBannerImages(user)
}

 loadBannerLinks = (user) =>{
    const jwt = auth.isAuthenticated()
    listBannerLinksByUser({
      userId: user
    }, {
      t: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({bannerLinks: data, loadingBannerLinks:false})
       }
    })
  }

loadBannerImages = (user) =>{
    const jwt = auth.isAuthenticated()
    listBannersByUser({
      userId: user
    }, {
      t: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({banners: data, loadingBanners:false})
       }
    })
  }


  render() {
//console.log(this.state.bannerLinks)
if(this.state.loadingRaces||this.state.loadingBannerLinks) return null
//if(this.state.loadingRaces||this.state.loadingBanners||this.state.loadingBannerLinks) return null
    const redirectToSignin = this.state.redirectToSignin
    if (redirectToSignin) {
      return <Redirect to='/signin'/>
    }
    return (
      <div className="globalCore">

       <Card>
         <Card.Header>{this.state.user.name}
         <LinkContainer to={"/"}>
          <ButtonGroup size="sm" className="float-right">
            <Button  variant="link">
              <FontAwesomeIcon icon={faArrowLeft}/>
            </Button>
            </ButtonGroup>
            </LinkContainer>
         </Card.Header>
        <ListGroup>
          <ListGroup.Item>{this.state.user.email}</ListGroup.Item>
            <ListGroup.Item>{"Joined: " + (new Date(this.state.user.created)).toDateString()}</ListGroup.Item>
        </ListGroup>
      </Card>
      <Accordion>
      <EditProfile match={this.match}/>
      <NewRace userId={this.state.user._id} reloadRaces={this.loadRaces}/>
      <Card id="editRaces">
      <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="2">Edit Races</Accordion.Toggle>
        </Card.Header>
      <Accordion.Collapse eventKey="2">
        <Card.Body>
      <RaceListNoCard races={this.state.races} edit={true} reloadRaces={this.loadRaces}/>
      </Card.Body>
      </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="3">
          Banners
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              <NewBannerLink reloadBanners={this.loadBanners}/>
              <BannerLinkList banners={this.state.bannerLinks} reloadBanners={this.loadBanners}/>
            </Card.Body>
        </Accordion.Collapse>
        </Card.Header>
      </Card>
      </Accordion>
      </div>
    )
  }
}


export default Dashboard
