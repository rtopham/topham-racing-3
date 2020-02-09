import React, {Component} from 'react'
import {Card, ListGroup, ListGroupItem} from "react-bootstrap"
import icupLogo from './../assets/logos/icup.jpg'
import mwLogo from './../assets/logos/midweek.jpg'
import USACLogo from './../assets/logos/USAC.png'
import chainRing from './../assets/logos/chainringSM.gif'

class AllTime extends Component {

  getTimeString(records){
    var totaltime=0;
    
    records.forEach(race => {

        let hms=race.time;
        let a= hms.split(':');
        let seconds = (+a[0]) * 60 *60 + (+a[1]) * 60 + (+a[2]);
        totaltime=totaltime+seconds;
        
    });
    let hoursprefix='';
    let minutesprefix='';
    let secondsprefix='';
    let hours=Math.floor(totaltime/3600);
    let minutes=Math.floor((totaltime-(hours*3600))/60);
    let seconds=totaltime-hours*3600-minutes*60;
    if(hours<10)hoursprefix="0";
    if(minutes<10)minutesprefix="0";
    if(seconds<10)secondsprefix="0";
    return (hoursprefix+hours +':'+ minutesprefix + minutes + ':' + secondsprefix+ seconds)
  
  }


  render() {
/*    
    const icupLogo  ='/logos/icup.jpg'
    const mwLogo    ='/logos/midweek.jpg'
    const USACLogo  ='/logos/USAC.png'
    const chainRing ='/logos/chainring.jpg'
*/
    return (
      <Card className="statsCard">
        <Card.Header as="h6">Stats</Card.Header>
        <Card.Body>
        <img alt="" className="statsLogo" src={chainRing}/><span className="listGroupTitle">All Time</span>
        <ListGroup>

          <ListGroupItem><img alt="Series Logo" className="statsLogoImage" src={icupLogo}/>&nbsp;ICUP Races: {this.props.alltimeStats.ICUP}</ListGroupItem>
          <ListGroupItem><img alt="Series Logo" className="statsLogoImage" src={mwLogo}/>&nbsp;Mid-Week Races: {this.props.alltimeStats.Midweek}</ListGroupItem>
          <ListGroupItem><img alt="Series Logo" className="statsLogoImage" src={USACLogo}/>&nbsp;USAC Races: {this.props.alltimeStats.USAC}</ListGroupItem>
          <ListGroupItem><img alt="Series Logo" className="statsLogoImage" src={chainRing}/>&nbsp;Other Races: {this.props.alltimeStats.Other}</ListGroupItem>
          <ListGroupItem>Races: {this.props.races.length}</ListGroupItem>
          <ListGroupItem>Podiums: {this.props.alltimeStats.podiums}</ListGroupItem>
          <ListGroupItem>Wins: {this.props.alltimeStats.wins}</ListGroupItem>
          <ListGroupItem>Time: {this.getTimeString(this.props.races)}</ListGroupItem>
        </ListGroup>

        </Card.Body>
      </Card>




      
    )
  }


}

export default AllTime
