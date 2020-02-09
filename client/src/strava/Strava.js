import React, {Component} from 'react'
import {getStravaByUser, getNewStravaTokens} from './../strava/api-strava.js'
import auth from './../auth/auth-helper'
import {update} from './../user/api-user.js'
import {getStravaToken} from './../user/api-user.js'
import StravaStatsPanel from './StravaStatsPanel.js'
import BannerLink from './../bannerlink/BannerLink'

function StravaWidgets(){
  return(
  
  <div> 
  
  <iframe title="latestRides" height='454' width='930' frameBorder='0' allowtransparency='true' scrolling='no' src='https://www.strava.com/athletes/292385/latest-rides/beab763db7c16d93be7e3428be95f35258a2ce41'></iframe>
  <iframe title="latestActivity" height='160' width='930' frameBorder='0' allowtransparency='true' scrolling='no' src='https://www.strava.com/athletes/292385/activity-summary/beab763db7c16d93be7e3428be95f35258a2ce41'></iframe>
  </div>
  )
  }


class Strava extends Component {
  constructor({match}) {
    super()
    this.state = {
      userStravaToken: '',
      strava_token:'',
      strava_token_expires_at:0,
      strava_refresh_token:'',
      redirectToSignin: false,
      races: [],
stravaStats: {
      ytdStats:{
        totalRides:0,
        totalDistance:0,
        totalTime:"",
        totalMovingTime:"",
        totalElevation:0,
        
     },

     recentStats:{
         totalRides:0,
         totalDistance:0,
         totalTime:"",
         totalMovingTime:"",
         totalElevation:0,
         
      },

     allTimeStats:{
         totalRides:0,
         totalDistance:0,
         totalTime:"",
         totalMovingTime:"",
         totalElevation:0,
      }
    },
    }
    this.match = match
  }
 
componentDidMount = () => {

this.userData= new FormData()
this.init(this.match.params.userId)

  }

init = async (userId) =>{

 getStravaToken({
    userId: userId
  }).then((data) => {
    if (data.error) {
    console.log("No Strava Token Found")
    } else {
//      console.log(data)
      const now = new Date()  
      const secondsSinceEpoch = Math.round(now.getTime() / 1000)  
      if(data.expiresAt>secondsSinceEpoch){
         //No need to refresh Tokens
         this.loadStravaData(data.id,data.token)
      }else{
      this.refreshStravaTokens(data.id,data.refreshToken)
      }


    }
  })

}

refreshStravaTokens= async (stravaId,refreshToken)=>{
let token=''
await getNewStravaTokens({stravaRefreshToken:refreshToken
}).then((data)=>{
  if (data.error){
    console.log ('Not Found')
  } else{

    token=data.access_token
    this.setState({strava_token:data.access_token,strava_token_expires_at:data.expires_at,refresh_token:data.refresh_token})
    this.updateTokensInDatabase(data.access_token,data.expires_at,data.refresh_token)
  }
})
this.loadStravaData(stravaId,token)
}

updateTokensInDatabase = (token,expires_at,refresh_token) => {
  const jwt = auth.isAuthenticated()
  this.userData.set('strava_token',token)
  this.userData.set('strava_token_expires_at',expires_at)
  this.userData.set('strava_refresh_token',refresh_token)

  update({
    userId: this.match.params.userId
  }, {
    t: jwt.token
  }, this.userData).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
      console.log(data.error)
    } else {
//      console.log("Strava Tokens Updated in Database")
    }
  })
}


getTimeString(seconds){
  let hours = (seconds/3600);
  return hours.toLocaleString('en', {maximumFractionDigits:1})
  
  }
  
  getMilesString(meters){
  
      let miles = (meters/ 1609.34);
      return miles.toLocaleString('en', {maximumFractionDigits:1})
      
  
  }
  
  getElevationString(meters){
      
          let feet = (meters * 3.28084);
          return feet.toLocaleString('en', {maximumFractionDigits:0})
          
      
      }

loadStravaData = (stravaId, stravaToken) => {
getStravaByUser({
      stravaId: stravaId,
      stravaToken: stravaToken
    },).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {

        let stravaStats=Object.assign({}, this.state.stravaStats);
        stravaStats.recentStats.totalRides=data.recent_ride_totals.count.toLocaleString('en', {maximumFractionDigits:0});
        stravaStats.recentStats.totalDistance=this.getMilesString(data.recent_ride_totals.distance);
        stravaStats.recentStats.totalTime=this.getTimeString(data.recent_ride_totals.elapsed_time);
        stravaStats.recentStats.totalMovingTime=this.getTimeString(data.recent_ride_totals.moving_time);
        stravaStats.recentStats.totalElevation=this.getElevationString(data.recent_ride_totals.elevation_gain);
        stravaStats.ytdStats.totalRides=data.ytd_ride_totals.count.toLocaleString('en', {maximumFractionDigits:0});
        stravaStats.ytdStats.totalDistance=this.getMilesString(data.ytd_ride_totals.distance);
        stravaStats.ytdStats.totalTime=this.getTimeString(data.ytd_ride_totals.elapsed_time);
        stravaStats.ytdStats.totalMovingTime=this.getTimeString(data.ytd_ride_totals.moving_time);
        stravaStats.ytdStats.totalElevation=this.getElevationString(data.ytd_ride_totals.elevation_gain);
        stravaStats.allTimeStats.totalRides=data.all_ride_totals.count.toLocaleString('en', {maximumFractionDigits:0});
        stravaStats.allTimeStats.totalDistance=this.getMilesString(data.all_ride_totals.distance);
        stravaStats.allTimeStats.totalTime=this.getTimeString(data.all_ride_totals.elapsed_time);
        stravaStats.allTimeStats.totalMovingTime=this.getTimeString(data.all_ride_totals.moving_time);
        stravaStats.allTimeStats.totalElevation=this.getElevationString(data.all_ride_totals.elevation_gain);
        this.setState({stravaStats: stravaStats});
  
        
      }
    })
  }

  

  render() {
    
    if(!this.state.stravaStats)return null; else

    return (
      <div className="globalCore">
      <BannerLink userId={this.match.params.userId}/>
      <StravaStatsPanel title="Recent Stats (last 28 days)" stats={this.state.stravaStats.recentStats}/>
      <StravaStatsPanel title="Year-to-Date Stats" stats={this.state.stravaStats.ytdStats}/>
      <StravaStatsPanel title="All Time Stats (since 2012)" stats={this.state.stravaStats.allTimeStats}/>
      <StravaWidgets/>
      </div>
      
        
    )
  }
}


export default Strava
