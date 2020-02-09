import React, {Component} from 'react'
import {Card, ListGroup, ListGroupItem} from "react-bootstrap"
import stravaLogo from './../assets/logos/stravaicon.jpg'
import "./Strava.css"

class StravaStatsCard extends Component {

  
  render() {
//    const stravaLogo='/logos/stravaicon.jpg'
    return (
      <Card className="stravaCard">
        <Card.Header as="h6">Strava</Card.Header>
        <Card.Body>
        <img alt="" className="stravaLogo" src={stravaLogo}/><span className="stravaTitle">{this.props.title}</span>
        <ListGroup>

          <ListGroupItem>Rides: {this.props.stats.totalRides}  </ListGroupItem>
          <ListGroupItem>Distance: {this.props.stats.totalDistance+" miles"}  </ListGroupItem>
          <ListGroupItem>Time: {this.props.stats.totalTime+ " hours"}  </ListGroupItem>
          <ListGroupItem>Moving Time: {this.props.stats.totalMovingTime+ " hours"}  </ListGroupItem>
          <ListGroupItem>Elevation: {this.props.stats.totalElevation+" feet"}  </ListGroupItem>

        </ListGroup>

        </Card.Body>
      </Card>
     
    )
  }

}

export default StravaStatsCard
