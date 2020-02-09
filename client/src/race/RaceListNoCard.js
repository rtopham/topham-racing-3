import React, {Component} from 'react'
import {Table} from "react-bootstrap"
import RaceRow from './RaceRow'
import "./Race.css"

class RaceListNoCard extends Component {
  state={

    openRace:''
  }

updateOpenRace = (race) =>{

  this.setState({openRace:race})
}


  render() {

    return (
      <React.Fragment>


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
</React.Fragment>     
    )
  }
}

export default RaceListNoCard
