import React, {Component} from 'react'
import RaceList from '../race/RaceList'
import {listByUserSearch} from '../race/api-race.js'
import LastRace from '../race/LastRace'
import EmptyQuery from '../race/EmptyQuery'
import BannerLink from '../bannerlink/BannerLink'
import "./Core.css"

class Home extends Component {
  constructor({match}) {
    super()
    this.state = {
      user: '',
      redirectToSignin: false,
      races: []
    }
    this.match = match
  }
 
  componentDidUpdate(prevProps){
    
 
    const oldQuery = prevProps.location.search;
    const newQuery = this.props.location.search;
    if(oldQuery === newQuery) {
      return;
    }
    this.loadRaces(this.match.params.userId, this.props.location.search)
  }
  

componentDidMount = () => {

this.loadRaces(this.match.params.userId, this.props.location.search)
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
       }
    })
  }

  render() {
    
    if(!this.state.races[0])return(
      <div className="globalCore">
      <BannerLink userId={this.match.params.userId}/>
      <EmptyQuery />
      <RaceList userId={this.match.params.userId} races={this.state.races}/>
      </div>
          )
    
    return (
      <div className="globalCore">
      <BannerLink userId={this.match.params.userId}/>
      <LastRace race={this.state.races[0]}/>
      <RaceList userId={this.match.params.userId} races={this.state.races}/>
      </div>
      
        
    )
  }
}


export default Home
