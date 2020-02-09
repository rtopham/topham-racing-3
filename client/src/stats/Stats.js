import React, {Component} from 'react'
import {listByUserSearch} from './../race/api-race.js'
import YearToDate from './../stats/YearToDate'
import AllTime from './../stats/AllTime'
import BannerLink from './../bannerlink/BannerLink'
import "./Stats.css"


class Stats extends Component {
  constructor({match}) {
    super()
    this.state = {
      user: '',
      redirectToSignin: false,
      races: [],
      ytdStats:{
        ICUP: 0,
        Midweek: 0,
        USAC: 0,
        Other: 0,
        podiums: 0,
        wins: 0
      },
      alltimeStats:{
        ICUP: 0,
        Midweek: 0,
        USAC: 0,
        Other: 0,
        podiums: 0,
        wins: 0
      }
    }
    this.match = match
  }
 
componentDidMount = () => {

const currentYear=(new Date()).getFullYear();
this.loadRaces(this.match.params.userId,'')
this.loadYTDRaces(this.match.params.userId,`?race_date=${currentYear}`)

  }

loadRaces = (user, search) => {
listByUserSearch({
      userId: user,
      search: search
    },).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({races: data})
        let alltimeStats={ICUP:0,Midweek:0,USAC:0,Other:0,podiums:0,wins:0}
        data.forEach(race => {
          if(race.series==="Intermountain Cup")alltimeStats.ICUP++
          if(race.series==="Mid-Week")alltimeStats.Midweek++
          if(race.series==="USAC")alltimeStats.USAC++
          if(race.series!=="Intermountain Cup"&&race.series!=="Mid-Week"&&race.series!=="USAC")alltimeStats.Other++
          if(race.rank<=3&&race.rank!==0)alltimeStats.podiums++
          if(race.rank===1)alltimeStats.wins++
    
        })
        this.setState({alltimeStats: alltimeStats})
      }
    })
  }

  loadYTDRaces = (user, search) => {
    listByUserSearch({
          userId: user,
          search: search
        },).then((data) => {
          if (data.error) {
            console.log(data.error)
          } else {
            this.setState({ytdRaces: data})

    let ytdStats={ICUP:0,Midweek:0,USAC:0,Other:0,podiums:0,wins:0}
    data.forEach(race => {
      if(race.series==="Intermountain Cup")ytdStats.ICUP++
      if(race.series==="Mid-Week")ytdStats.Midweek++
      if(race.series==="USAC")ytdStats.USAC++
      if(race.series!=="Intermountain Cup"&&race.series!=="Mid-Week"&&race.series!=="USAC")ytdStats.Other++
      if(race.rank<=3&&race.rank!==0)ytdStats.podiums++
      if(race.rank===1)ytdStats.wins++

    })
    this.setState({ytdStats: ytdStats})

          }
        })
      }
  

  render() {
    
    if(!this.state.races[0])return null; else

    return (
      <div className="globalCore">
      <BannerLink userId={this.match.params.userId}/>
      <YearToDate ytdRaces={this.state.ytdRaces} races={this.state.races} ytdStats={this.state.ytdStats}/>
      <AllTime races={this.state.races} alltimeStats={this.state.alltimeStats}/>
      </div>
      
        
    )
  }
}


export default Stats
