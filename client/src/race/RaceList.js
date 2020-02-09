import React, {Component} from 'react'
import {Card, Table} from "react-bootstrap"
import {Link} from 'react-router-dom'
import RaceRow from './RaceRow'
import {getStravaRaceData, getNewStravaTokens} from './../strava/api-strava.js'
import auth from './../auth/auth-helper'
import {update} from './../user/api-user.js'
import {getStravaToken} from './../user/api-user.js'

import "./Race.css"

class RaceList extends Component {
  state={

    openRace:''
  }

componentDidMount=()=>{

  this.userData= new FormData()
}

clickStrava = (e) =>{
    e.preventDefault();
    let raceDate=e.target.dataset.raceDate
//    console.log(e.target.dataset.raceDate)
    getStravaToken({
      userId: this.props.userId
    }).then((data) => {
      if (data.error) {
      console.log("No Strava Token Found")
      } else {

        const now = new Date()  
        const secondsSinceEpoch = Math.round(now.getTime() / 1000)  
        if(data.expiresAt>secondsSinceEpoch){
//          console.log("No need to refresh Tokens")
          this.loadStravaRaceData(data.id,data.token,raceDate)
//this.refreshStravaTokens(data.id,data.refreshToken,raceDate)
       }else{
       this.refreshStravaTokens(data.id,data.refreshToken,raceDate)
       }
        
      }
    })

}

refreshStravaTokens= async (stravaId,refreshToken,raceDate)=>{
  let token=''
  await getNewStravaTokens({stravaRefreshToken:refreshToken
  }).then((data)=>{
    if (data.error){
      console.log ('Not Found')
    } else{
//      console.log(data)
      token=data.access_token
//      this.setState({strava_token:data.access_token,strava_token_expires_at:data.expires_at,refresh_token:data.refresh_token})
      this.updateTokensInDatabase(data.access_token,data.expires_at,data.refresh_token)
    }
  })
  console.log("this should happen later")
  
  this.loadStravaRaceData(stravaId,token,raceDate)
  }
  
  updateTokensInDatabase = (token,expires_at,refresh_token) => {
    const jwt = auth.isAuthenticated()
    this.userData.set('strava_token',token)
    this.userData.set('strava_token_expires_at',expires_at)
    this.userData.set('strava_refresh_token',refresh_token)
  
    update({
      userId: this.props.userId
    }, {
      t: jwt.token
    }, this.userData).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
        console.log(data.error)
      } else {
//        console.log("Strava Tokens Updated in Database")
      }
    })
  }


updateOpenRace = (race) =>{

  this.setState({openRace:race})
}

 loadStravaRaceData=(stravaId, stravaToken, raceDate) =>{
  getStravaRaceData({
    stravaId: stravaId,
    stravaToken: stravaToken,
    raceDate: raceDate
  },).then((data) => {
    if (data.error) {
      console.log(data.error)
    } else {

    let raceID=0;
    let sufferScore=0;
    let loopCount=data.length;
    if (data.length>3) loopCount=3;
    
          for(var i=0; i<loopCount; i++){
            if(data[i].suffer_score>sufferScore){
              sufferScore=data[i].suffer_score;
              raceID=data[i].id;
            }
     
          }  

          window.open(`https://www.strava.com/activities/${raceID}`);  
    }
  })
} 

  render() {
    const currentYear=(new Date()).getFullYear();

    return (
      <React.Fragment>
<Card className="editRace">
  <Card.Header><span className="RaceHistoryTitle">Race History</span>
  {!this.props.edit&&(
  <span className="float-right"> 
  <Link className="linkSpace" to={`/races/${this.props.userId}`}>All</Link>
  <Link className="linkSpace" to={`/races/${this.props.userId}?race_date=${currentYear}`}>Current Season</Link>
  <Link className="linkSpace" to={`/races/${this.props.userId}?race_date=${currentYear-1}`}>Last Season</Link>
  <Link className="linkSpace" to={`/races/${this.props.userId}?series=Intermountain Cup`}>ICUP</Link>
  <Link className="linkSpace" to={`/races/${this.props.userId}?series=Mid-Week`}>Mid-Week</Link>
  <Link className="linkSpace" to={`/races/${this.props.userId}?series=USAC`}>USAC</Link>
  <Link className="linkSpace" to={`/races/${this.props.userId}?series_ne=Intermountain Cup&series_ne=Mid-Week&series_ne=USAC`}>Other</Link>
  <Link className="linkSpace" to={`/races/${this.props.userId}?rank_gte=1&rank_lte=3`}>Podiums</Link>
  <Link className="linkSpace" to={`/races/${this.props.userId}?rank=1`}>Wins</Link>
</span>)}
  </Card.Header>

      <Table size="sm" striped bordered hover>
      <thead>
    <tr>
      <th>Series</th>
      <th>Name</th>
      <th className ="centerthis">Date</th>
      <th className ="centerthis">Category</th>
      <th className ="centerthis">Time</th>
      <th className ="centerthis">Rank</th>
    </tr>
  </thead>  
 <tbody>
      
        {this.props.races.map((item, i) => {
          const open = item===this.state.openRace? true:false
            return<RaceRow open={open} race={item} key={i} updateOpenRace={this.updateOpenRace} reloadRaces={this.props.reloadRaces} edit={this.props.edit} onRemove={this.props.removeUpdate} strava={this.clickStrava}/>
                             
          })

        }

</tbody>
      </Table>
      </Card>
      </React.Fragment>

      
    )
  }
}

export default RaceList
