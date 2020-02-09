import React, {Component} from 'react'
import {Card,ListGroup} from "react-bootstrap"
import icupLogo from './../assets/logos/icup.jpg'
import mwLogo from './../assets/logos/midweek.jpg'
import USACLogo from './../assets/logos/USAC.png'
import USCSLogo from './../assets/logos/uscs.jpg'
import chainRing from './../assets/logos/chainring.jpg'
import "./Race.css"

class LastRace extends Component {

  render() {
    let logo ='';
    switch (this.props.race.series){
      case "Intermountain Cup": logo=icupLogo
      break
      case "Mid-Week": logo=mwLogo
      break
      case "USAC": logo=USACLogo
      break
      case "Utah State Championship Series": logo=USCSLogo
      break
      default:logo=chainRing
      break

    }

    return (
      <Card className="lastRaceCard">
        <Card.Header as="h6">Last Race: {this.props.race.race_date.substring(0,10)}</Card.Header>
        <Card.Body>
        <img alt="Series Logo" className="lastRaceLogo" src={logo}/><span className="raceName">{this.props.race.race_name}</span>
        <ListGroup>

          <ListGroup.Item>Rank: {this.props.race.rank}</ListGroup.Item>
          <ListGroup.Item>Time: {this.props.race.time}</ListGroup.Item>
          <ListGroup.Item>Category: {this.props.race.category}</ListGroup.Item>
        </ListGroup>

        </Card.Body>
      </Card>




      
    )
  }


}

export default LastRace
